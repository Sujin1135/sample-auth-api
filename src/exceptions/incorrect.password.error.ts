class IncorrectPasswordError extends Error {
  code: Number;

  constructor(code = 404, message = 'The password do not matched.') {
    super(message);

    this.code = code;
  }
}

export default IncorrectPasswordError;