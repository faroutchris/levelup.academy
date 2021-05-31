class StrapiApiError extends Error {
  id: string;

  constructor(data) {
    const errorData = data.message[0].messages[0];
    super(errorData.message);
    this.id = errorData.id;
    this.name = 'StrapiApiError';
  }
}

export default StrapiApiError;
