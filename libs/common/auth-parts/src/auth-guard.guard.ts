import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      response.status(401).send('Unauthorized: No token provided');
      return false;
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      response.status(401).send('Unauthorized: Invalid token format');
      return false;
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');
      request.user = decoded; // ← możesz teraz używać `req.user` w kontrolerach
      return true;
    } catch (err) {
      response.status(401).send('Unauthorized: Invalid or expired token');
      return false;
    }
  }
}
