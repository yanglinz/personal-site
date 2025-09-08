import {
  GlobalFnClock,
  LoxCallable,
  LoxClass,
  LoxFunction,
  ReturnValue,
} from "./Callable";
import { Environment } from "./Environment";
import { RuntimeError } from "./Errors";
import {
  Expr,
  ExprAssign,
  ExprBinary,
  ExprCall,
  ExprGet,
  ExprGrouping,
  ExprLiteral,
  ExprLiteralValue,
  ExprLogical,
  ExprSet,
  ExprSuper,
  ExprThis,
  ExprUnary,
  ExprVariable,
} from "./Expr";
import { LoxClassInstance } from "./Instance";
import { LoxInstance } from "./Lox";
import { Token, TokenType } from "./Scanner";
import {
  Stmt,
  StmtBlock,
  StmtClass,
  StmtExpression,
  StmtFunction,
  StmtIf,
  StmtPrint,
  StmtReturn,
  StmtVar,
  StmtWhile,
} from "./Stmt";
import { Visitor } from "./Visitor";

export class Interpreter extends Visitor {
  private lox: LoxInstance;
  private environment: Environment;
  private globals: Environment;
  private locals: Map<Expr, number>;

  constructor(lox: LoxInstance) {
    super();
    this.lox = lox;
    this.environment = new Environment();
    this.globals = this.environment;
    this.locals = new Map();

    this.globals.define("clock", new GlobalFnClock());
  }

  interpret(statements: Stmt[]) {
    const lastIndex = statements.length - 1;
    try {
      for (const [i, s] of statements.entries()) {
        if (i === lastIndex) {
          // Return the output of the last statement for ease of testing
          return this.execute(s);
        } else {
          this.execute(s);
        }
      }
    } catch (error) {
      if (error instanceof RuntimeError) {
        this.lox.runtimeError(error);
      } else {
        throw error;
      }
    }
  }

  evaluate(expr: Expr): ExprLiteralValue {
    return expr.accept(this);
  }

  resolve(expr: Expr, depth: number): void {
    this.locals.set(expr, depth);
  }

  private execute(statement: Stmt): ExprLiteralValue {
    return statement.accept(this);
  }

  executeBlock(statements: Stmt[], environment: Environment): void {
    const previous = this.environment;
    try {
      this.environment = environment;
      for (const statement of statements) {
        this.execute(statement);
      }
    } finally {
      this.environment = previous;
    }
  }

  visitBlockStmt(stmt: StmtBlock): void {
    this.executeBlock(stmt.statements, new Environment(this.environment));
  }

  visitClassStmt(stmt: StmtClass): void {
    let superclass = null;
    if (stmt.superclass) {
      superclass = this.evaluate(stmt.superclass);
      if (!(superclass instanceof LoxClass)) {
        throw new RuntimeError(
          stmt.superclass.name,
          "Superclass must be a class."
        );
      }
    }

    this.environment.define(stmt.name.lexeme, null);

    if (stmt.superclass) {
      this.environment = new Environment(this.environment);
      this.environment.define("super", superclass);
    }

    const methods = new Map();
    for (const method of stmt.methods) {
      const isInitializer = method.name.lexeme === "init";
      const func = new LoxFunction(method, this.environment, isInitializer);
      methods.set(method.name.lexeme, func);
    }

    const klass = new LoxClass(stmt.name.lexeme, superclass, methods);

    if (superclass) {
      this.environment = this.environment.enclosing;
    }

    this.environment.assign(stmt.name, klass);
    return null;
  }

  visitExpressionStmt(stmt: StmtExpression): ExprLiteralValue {
    return this.evaluate(stmt.expression);
  }

  visitFunctionStmt(stmt: StmtFunction): void {
    const func = new LoxFunction(stmt, this.environment, false);
    this.environment.define(stmt.name.lexeme, func);
  }

  visitIfStmt(stmt: StmtIf): void {
    if (this.isTruthy(this.evaluate(stmt.condition))) {
      this.execute(stmt.thenBranch);
    } else if (stmt.elseBranch != null) {
      this.execute(stmt.elseBranch);
    }
    return null;
  }

  visitPrintStmt(stmt: StmtPrint): void {
    const value = this.evaluate(stmt.expression);

    // TODO: Implement generic stringify method
    let message = value as string;
    if (value instanceof LoxClass || value instanceof LoxClassInstance) {
      message = value.toString();
    }
    this.lox.print(message);
  }

  visitReturnStmt(stmt: StmtReturn): void {
    let value = null;
    if (stmt.value != null) {
      value = this.evaluate(stmt.value);
    }

    throw new ReturnValue(value);
  }

  visitVarStmt(stmt: StmtVar): void {
    let value = null;
    if (stmt.initializer != null) {
      value = this.evaluate(stmt.initializer);
    }

    this.environment.define(stmt.name.lexeme, value);
  }

  visitWhileStmt(stmt: StmtWhile): void {
    while (this.isTruthy(this.evaluate(stmt.condition))) {
      this.execute(stmt.body);
    }
  }

  visitAssignExpr(expr: ExprAssign): ExprLiteralValue {
    const value = this.evaluate(expr.value);

    const distance = this.locals.get(expr);
    if (distance != null) {
      this.environment.assignAt(distance, expr.name, value);
    } else {
      this.globals.assign(expr.name, value);
    }

    return value;
  }

  visitBinaryExpr(expr: ExprBinary): ExprLiteralValue {
    const right = this.evaluate(expr.right);
    const left = this.evaluate(expr.left);

    const type = expr.operator.type;
    if (type === TokenType.MINUS) {
      this.checkNumberOperands(expr.operator, left, right);
      return (left as number) - (right as number);
    } else if (type === TokenType.SLASH) {
      this.checkNumberOperands(expr.operator, left, right);
      return (left as number) / (right as number);
    } else if (type === TokenType.STAR) {
      this.checkNumberOperands(expr.operator, left, right);
      return (left as number) * (right as number);
    } else if (type === TokenType.PLUS) {
      if (typeof left === "number" && typeof right === "number") {
        return left + right;
      } else if (typeof left === "string" && typeof right === "string") {
        return left + right;
      }
    } else if (type === TokenType.GREATER) {
      this.checkNumberOperands(expr.operator, left, right);
      return left > right;
    } else if (type === TokenType.GREATER_EQUAL) {
      this.checkNumberOperands(expr.operator, left, right);
      return left >= right;
    } else if (type === TokenType.LESS) {
      this.checkNumberOperands(expr.operator, left, right);
      return left < right;
    } else if (type === TokenType.LESS_EQUAL) {
      this.checkNumberOperands(expr.operator, left, right);
      return left <= right;
    } else if (type === TokenType.BANG_EQUAL) {
      return !this.isEqual(left, right);
    } else if (type === TokenType.EQUAL_EQUAL) {
      return this.isEqual(left, right);
    }

    // Unreachable
    return null;
  }

  visitCallExpr(expr: ExprCall) {
    const callee = this.evaluate(expr.callee);

    const args = [];
    for (const a of expr.args) {
      args.push(this.evaluate(a));
    }

    if (!(callee instanceof LoxCallable)) {
      throw new RuntimeError(
        expr.paren,
        "Can only call functions and classes."
      );
    }

    const func = callee as LoxCallable;
    if (args.length != func.arity) {
      throw new RuntimeError(
        expr.paren,
        `Expected ${func.arity} arguments but got ${args.length}.`
      );
    }

    return func.call(this, args);
  }

  visitGetExpr(expr: ExprGet) {
    const object = this.evaluate(expr.object);
    if (object instanceof LoxClassInstance) {
      return (object as LoxClassInstance).get(expr.name);
    }

    throw new RuntimeError(expr.name, "Only instance have properties.");
  }

  visitGroupingExpr(expr: ExprGrouping): ExprLiteralValue {
    return this.evaluate(expr.expression);
  }

  visitLiteralExpr(expr: ExprLiteral): ExprLiteralValue {
    return expr.value;
  }

  visitLogicalExpr(expr: ExprLogical): ExprLiteralValue {
    const left = this.evaluate(expr.left);

    if (expr.operator.type == TokenType.OR) {
      if (this.isTruthy(left)) return left;
    } else {
      if (!this.isTruthy(left)) return left;
    }

    return this.evaluate(expr.right);
  }

  visitSetExpr(expr: ExprSet): ExprLiteralValue {
    const object = this.evaluate(expr.object);

    if (!(object instanceof LoxClassInstance)) {
      throw new RuntimeError(expr.name, "Only instances have fields.");
    }

    const value = this.evaluate(expr.value);
    (object as LoxClassInstance).set(expr.name, value);
    return value;
  }

  visitSuperExpr(expr: ExprSuper): ExprLiteralValue {
    const distance: number = this.locals.get(expr);
    const superclass = this.environment.getAt(distance, "super");

    const object = this.environment.getAt(distance - 1, "this");
    const method = (superclass as LoxClass).findMethod(expr.method.lexeme);

    if (!method) {
      throw new RuntimeError(
        expr.method,
        "Undefined property '" + expr.method.lexeme + "'."
      );
    }

    return method.bind(object as LoxClassInstance);
  }

  visitThisExpr(expr: ExprThis) {
    return this.lookUpVariable(expr.keyword, expr);
  }

  visitUnaryExpr(expr: ExprUnary): ExprLiteralValue {
    const right = this.evaluate(expr.right);

    const type = expr.operator.type;
    if (type === TokenType.MINUS) {
      this.checkNumberOperand(expr.operator, right);
      return -1 * (right as number);
    } else if (type === TokenType.BANG) {
      return !this.isTruthy(right);
    }

    // Unreachable
    return null;
  }

  private checkNumberOperand(operator: Token, operand: ExprLiteralValue): void {
    if (typeof operand === "number") return;
    throw new RuntimeError(operator, "Operand must be a number.");
  }

  private checkNumberOperands(
    operator: Token,
    left: ExprLiteralValue,
    right: ExprLiteralValue
  ): void {
    if (typeof left === "number" && typeof right === "number") return;
    throw new RuntimeError(operator, "Operand must be a number.");
  }

  visitVariableExpr(expr: ExprVariable): ExprLiteralValue {
    return this.lookUpVariable(expr.name, expr);
  }

  private lookUpVariable(name: Token, expr: Expr): ExprLiteralValue {
    const distance = this.locals.get(expr);
    if (distance != null) {
      return this.environment.getAt(distance, name.lexeme);
    } else {
      return this.globals.get(name);
    }
  }

  private isTruthy(object: ExprLiteralValue): boolean {
    if (object == null) return false;
    if (typeof object === "boolean") return object;
    if (typeof object === "number") return !(object === 0);
    return true;
  }

  private isEqual(a: ExprLiteralValue, b: ExprLiteralValue): boolean {
    if (a === null && b === null) return true;
    if (a === null) return false;

    return a == b;
  }
}
