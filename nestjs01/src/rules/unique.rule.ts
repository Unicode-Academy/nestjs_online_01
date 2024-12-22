import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class Unique implements ValidatorConstraintInterface {
  async validate(text: string) {
    if (text !== 'hoangan.web@gmail.com') {
      return true;
    }
    return false;
  }
}
