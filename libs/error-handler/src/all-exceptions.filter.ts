import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    Logger,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger: Logger;

    constructor(loggerContext = 'MicroserviceError') {
        this.logger = new Logger(loggerContext);
        this.logger.log('AllExceptionsFilter initialized');
    }

    catch(exception: any, host: ArgumentsHost) {
        this.logger.error('Exception caught in microservice', exception);

        return {
            status: 'error',
            message: exception?.message || 'Unexpected error',
        };
    }
}