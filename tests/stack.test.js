const Stack = require('./stack');

describe('Stack', () => {
  let stack;

  beforeEach(() => {
    stack = new Stack();
  });

  it('should return the last element pushed to the stack', () => {
    stack.push('foo');
    stack.push('bar');
    stack.push('baz');
    expect(stack.peek()).toEqual('baz');
  });
});