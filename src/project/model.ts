import {Table, Column, Model} from 'sequelize-typescript';
 
@Table({tableName: 'project'})
export class Project extends Model<Project> {
 
  @Column
  name!: string;
}
