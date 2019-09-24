export class TestUtils {
  static createSpyObjWithoutMethods<T>(baseName: string): T {
    return jasmine.createSpyObj(baseName, ['toString']);
  }
}
