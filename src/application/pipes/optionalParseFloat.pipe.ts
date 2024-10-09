import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class OptionalParseFloatPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) {
    if (!value) {
      return null;
    }

    const val = parseFloat(value);

    if (isNaN(val)) {
      return new BadRequestException(`${value}`);
    }

    return val;
  }
}
