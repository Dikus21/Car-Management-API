class ErrorTemplate extends Error {
  statusCode: number;
  isTemplate: boolean;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isTemplate = true;
  }
}

export default ErrorTemplate;
