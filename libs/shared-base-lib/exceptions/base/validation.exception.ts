import { HttpStatus } from '@nestjs/common';
import { BaseException } from './base.exception';

export class ValidationException extends BaseException {
  constructor(errors: string[]) {
    super(`Validation failed: ${errors.join(', ')}`, HttpStatus.BAD_REQUEST);
  }
}
