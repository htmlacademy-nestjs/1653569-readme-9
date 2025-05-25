export abstract class Entity {
  private _id: string | undefined = undefined;

  public get id(): string | undefined {
    return this._id;
  }

  public set id(value: string | undefined) {
    this._id = value;
  }
}
