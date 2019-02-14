import {Table, Column, Model} from 'sequelize-typescript';
 
@Table({tableName: 'auth_user'})
export class User extends Model<User> {
 
  name!: string;
  
  @Column
// tslint:disable-next-line: variable-name
  first_name!: string;

  @Column
// tslint:disable-next-line: variable-name
last_name!: string;

  @Column
// tslint:disable-next-line: variable-name
email!: string;

  @Column
  password!: string;

  @Column
// tslint:disable-next-line: variable-name
registration_key!: string;

  @Column
// tslint:disable-next-line: variable-name
reset_password_key!: string;

  @Column
// tslint:disable-next-line: variable-name
registration_id!: string;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IJWToken {
  token: string;
  first_name: string;
  last_name: string;
  email: string;
}
