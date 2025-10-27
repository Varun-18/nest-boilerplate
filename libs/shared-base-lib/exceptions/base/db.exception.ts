import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class DatabaseException extends BaseException {
  constructor(
    error: unknown,
    operation?: string,
    includeStack = process.env.NODE_ENV !== 'production',
  ) {
    const isProd = process.env.NODE_ENV === 'production';

    // Parse DB error (handles both Error objects and plain messages)
    const dbMessage =
      error instanceof Error
        ? error.message
        : typeof error === 'string'
          ? error
          : 'Unknown database error';

    const message = isProd
      ? 'A database error occurred. Please try again later.'
      : `Database operation failed${operation ? ` during ${operation}` : ''}: ${dbMessage}`;

    super(message, HttpStatus.INTERNAL_SERVER_ERROR, includeStack);
  }
}
