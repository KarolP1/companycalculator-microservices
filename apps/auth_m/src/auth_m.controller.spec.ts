import { Test, TestingModule } from '@nestjs/testing';
import { AuthMController } from './auth_m.controller';
import { AuthMService } from './auth_m.service';

describe('AuthMController', () => {
  let authMController: AuthMController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthMController],
      providers: [AuthMService],
    }).compile();

    authMController = app.get<AuthMController>(AuthMController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(authMController.getHello()).toBe('Hello World!');
    });
  });
});
