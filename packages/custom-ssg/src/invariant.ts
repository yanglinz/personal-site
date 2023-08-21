class InvariantError extends Error {}

export function invariant(cond: boolean, message: string) {
  if (!cond) {
    throw new InvariantError(message);
  }
}
