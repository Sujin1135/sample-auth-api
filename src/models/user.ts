import { sequelize } from "../instances/sequelize";
import { Model, STRING } from 'sequelize';

export interface UserAddModel {
  email: string;
  password: string;
}

export interface UserModel extends Model<UserModel, UserAddModel> {
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
}

export interface UserViewModel {
  email: string;
  password: string;
}

export const User = sequelize.define<UserModel, UserAddModel>('User', {
  email: {
    type: STRING,
    primaryKey: true,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  freezeTableName: true,
});
