import { Sequelize } from 'sequelize';

const db = 'authapp';
const username = 'root';
const password = 'Test1135!';

export const sequelize = new Sequelize(db, username, password, {
    dialect: "mysql",
    port: 3306,
});

sequelize.authenticate();
