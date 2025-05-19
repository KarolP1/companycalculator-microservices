import { Module } from '@nestjs/common';
import { AuthPartsService } from './auth-parts.service';

@Module({
  providers: [AuthPartsService],
  exports: [AuthPartsService],
})
export class AuthPartsModule { }
