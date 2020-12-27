export default class Stack {
  constructor() {
    this._array = []
  }

  // push
  push(value) {
    this._array.push(value)
  }

  // pop
  pop() {
    if (this.getSize() === 0) {
      throw new Error('stack is empty')
    }
    return this._array.pop()
  }

  // peek
  peek() {
    if (this.getSize() === 0) {
      return undefined
    }

    return this._array[this.getSize() - 1]
  }

  // empty
  isEmpty() {
    return this.getSize() === 0
  }

  // size
  getSize() {
    return this._array.length
  }
}
