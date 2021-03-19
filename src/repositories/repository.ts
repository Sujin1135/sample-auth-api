import { Model } from "sequelize/types";

export class Repository {
  protected async _getPlain<T extends Model>(promise: Promise<T | null>) {
    return promise.then((res) => res?.get({ plain: true }));
  }
}