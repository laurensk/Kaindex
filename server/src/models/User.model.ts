export class User {
  uuid: string;
  name: string;
  login: string;
  admin: boolean;
  active: boolean;

  constructor(uuid: string, name: string, login: string, admin: boolean, active: boolean) {
    this.uuid = uuid;
    this.name = name;
    this.login = login;
    this.admin = admin;
    this.active = active;
  }
}
