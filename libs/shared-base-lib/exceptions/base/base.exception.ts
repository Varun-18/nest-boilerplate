import { HttpException, HttpStatus } from '@nestjs/common';

interface ExceptionResponse {
  statusCode: number;
  message: string;
  stack?: string;
}

export class BaseException extends HttpException {
  public readonly statusCode: number;
  public readonly message: string;
  public readonly stack?: string;

  constructor(
    message: string,
    statusCode: HttpStatus = HttpStatus.INTERNAL_SERVER_ERROR,
    includeStack = process.env.NODE_ENV !== 'production',
  ) {
    const response: ExceptionResponse = {
      statusCode,
      message,
      ...(includeStack && new Error().stack
        ? { stack: new Error().stack }
        : {}),
    };

    super(response, statusCode);

    this.statusCode = statusCode;
    this.message = message;

    if (includeStack) {
      this.stack = new Error().stack;
    }
  }

  /**
   * Returns a consistent error response object
   * for logging, RPC, or HTTP layers.
   */
  public toJSON(): ExceptionResponse {
    const json: ExceptionResponse = {
      statusCode: this.statusCode,
      message: this.message,
    };
    if (this.stack && process.env.NODE_ENV !== 'production') {
      json.stack = this.stack;
    }
    return json;
  }
}
