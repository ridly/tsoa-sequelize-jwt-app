import {Sequelize} from 'sequelize-typescript';

export const sequelize =  new Sequelize({
    database: process.env.DATABASE || 'example',
    dialect: process.env.DIALECT || 'postgres',
    username: process.env.DB_USER || 'username',
    password: process.env.DB_PASS || 'password',
});
