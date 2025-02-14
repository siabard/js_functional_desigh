// defmulti를 클래스를 이용해 처리한다.

// Base class for formatters
class Formatter {
  constructor(type) {
    this.type = type;
  }

  // The format method will be implemented by subclasses
  format(statementData) {
    throw new Error('Method "format" should be implemented by subclass');
  }
}

module.exports = { Formatter };