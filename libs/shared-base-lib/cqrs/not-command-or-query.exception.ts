import { BadRequestException } from '@nestjs/common';

export class NotCommandOrQueryException extends BadRequestException {
  constructor(cq: any) {
    super(
      `The object is neither a Command nor a Query: ${cq.constructor.name}`,
    );
  }
}
