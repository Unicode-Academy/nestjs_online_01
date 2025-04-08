import * as bcrypt from 'bcrypt';
export default class Hash {
  private static saltRounds = 10;
  static make(password: string) {
    return bcrypt.hashSync(password, this.saltRounds);
  }

  static verify(password: string, hash: string) {
    return bcrypt.compareSync(password, hash);
  }
}
