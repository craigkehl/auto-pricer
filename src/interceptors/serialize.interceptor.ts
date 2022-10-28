import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ClassConstructor, plainToInstance } from 'class-transformer';

export function Serialize<T>(dto: ClassConstructor<T>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
  constructor(private dto: any) {}
  intercept(context: ExecutionContext, handler: CallHandler): Observable<any> {
    // Run something before a request is handled by the req handler
    // console.log('Running pre-handler\n', context);

    return handler.handle().pipe(
      map((data: any) => {
        // Run something before the res is sent
        // console.log("I'm runing before res is sent out", data);
        return plainToInstance(this.dto, data, {
          excludeExtraneousValues: true,
        });
      }),
    );
  }
}
