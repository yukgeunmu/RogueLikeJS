export class Reword {
  constructor(name, value, level) {
    this._name = name;
    this._value = value;
    this._level = level;
  }

  get name() {
    return this._name;
  }

  set name(string) {
    this._name = string;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
  }

  get level() {
    return this._level;
  }

  set level(value) {
    this._level = value;
  }
  
}
