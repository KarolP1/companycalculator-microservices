import { Logger } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';

const logger = new Logger('ErrorHandler');

export function handleMicroserviceError<T>(obs: Observable<T>): Observable<T> {
    return new Observable((subscriber) => {
        obs.subscribe({
            next: (value) => subscriber.next(value),
            error: (err) => {
                logger.error('Microservice Error:', err);
                subscriber.error(transformError(err));
            },
            complete: () => subscriber.complete(),
        });
    });
}

function transformError(err: any) {
    const isProd = process.env.NODE_ENV === 'production';

    if (err instanceof Error) {
        return {
            status: 'error',
            message: err.message,
            ...(isProd ? {} : { stack: err.stack }),
        };
    }

    return {
        status: 'error',
        message: 'Unexpected error occurred',
        ...(isProd ? {} : { originalError: err }),
    };
}