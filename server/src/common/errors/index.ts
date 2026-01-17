export class NotImplementedError extends Error {
  constructor(message: string = 'This functionality is not implemented yet.') {
    super(message);
    this.name = 'NotImplementedError';
    Object.setPrototypeOf(this, NotImplementedError.prototype);
  }
}
