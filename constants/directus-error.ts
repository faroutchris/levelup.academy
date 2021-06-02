class DirectusError extends Error {
  code: string;

  constructor(error: GenericErrorResponse) {
    super(error.message);
    this.code = error.extensions.code;
    this.name = 'DirectusApiError';
  }
}

export default DirectusError;
