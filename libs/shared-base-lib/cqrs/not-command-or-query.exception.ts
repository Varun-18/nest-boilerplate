import { BadRequestException } from '@nestjs/common';

export class NotCommandOrQueryException extends BadRequestException {
  constructor(cq: any) {
    super(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      `The object is neither a Command nor a Query: ${cq.constructor.name}`,
    );
  }
}
