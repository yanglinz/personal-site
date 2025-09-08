import { Expr } from "./Expr";
import { Stmt } from "./Stmt";

export type VisitorOutput = any;

export class Visitor {
  visitAssignExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitBinaryExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitCallExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitGetExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitGroupingExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitLiteralExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitLogicalExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitSetExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitSuperExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitThisExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitUnaryExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitVariableExpr(_: Expr): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitExpressionStmt(_: Stmt): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitFunctionStmt(_: Stmt): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitIfStmt(_: Stmt): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitPrintStmt(_: Stmt): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitReturnStmt(_: Stmt): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitVarStmt(_: Stmt): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitWhileStmt(_: Stmt): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitBlockStmt(_: Stmt): VisitorOutput {
    throw new Error("NotImplementedError");
  }

  visitClassStmt(_: Stmt): VisitorOutput {
    throw new Error("NotImplementedError");
  }
}
