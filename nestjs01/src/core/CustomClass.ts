import { Injectable } from '@nestjs/common';

@Injectable()
export default class CustomClass {
  constructor() {
    console.log('Custom class created');
  }
  something() {
    console.log('something');
  }
}
