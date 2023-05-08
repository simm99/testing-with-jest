const Stack = require('./stack');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('should throw an error when popping from an empty stack', () => {
    expect(() => stack.pop()).toThrowError('Stack is empty');
  });
});
