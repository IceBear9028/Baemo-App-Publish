type DynamicObject = {
  [key: string]: any;
};

export class DynamicObjectHandler {
  private obj: DynamicObject;

  constructor(initialObject: DynamicObject = {}) {
    this.obj = initialObject;
  }

  addValue(key: string, value: any): DynamicObject {
    this.obj[key] = value;
    return this.obj;
  }

  getObject(): DynamicObject {
    return this.obj;
  }
}
