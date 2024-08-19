import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}

  @Get()
  getHello() {
    return { reply: 'Hello NestJS! - Help State Backend' };
  }

  // health methods here
}
