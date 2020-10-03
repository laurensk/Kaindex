export class User {
  uuid: string;
  login: string;
  admin: boolean;
  active: boolean;
  creationDate: Date;
  lastLoginDate: Date;

  constructor(uuid: string, login: string, admin: boolean, active: boolean, creationDate: Date, lastLoginDate: Date) {
    this.uuid = uuid;
    this.login = login;
    this.admin = admin;
    this.active = active;
    this.creationDate = creationDate;
    this.lastLoginDate = lastLoginDate;
  }
}
