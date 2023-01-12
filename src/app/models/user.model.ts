import {RoleModel} from "./role.model";

export class UserModel{

  constructor(public id: number,
              public username: string,
              public password: string,
              public name: string,
              public phone: string,
              public email: string,
              public roles: RoleModel[]){}
}
