// Place your playground code here.

const initialCapacity = 16;

export default class ResizableArray {
  constructor() {
    this._size = 0;
    this._capacity = initialCapacity;
    this._array = new Array(this._capacity);
  }

  getSize() {
    return this._size;
  }

  getCapacity() {
    return this._capacity;
  }

  isEmpty() {
    return this._size === 0;
  }

  at(index) {
    if (index < 0 || index >= this._size) {
      throw new Error('index is out of bounds');
    }
    return this._array[index];
  }

  push(item) {
    return this.insert(this._size, item);
  }

  insert(index, item) {
    if (index < 0 || index > this._size) {
      throw new Error('index is out of bounds');
    }

    const subarr = this._array.slice(index, this._size);
    this._array[index] = item;
    for (let i = 0; i < subarr.length; i++) {
      this._array[index + 1 + i] = subarr[i];
    }

    this._size += 1;
    if (this._size === this._capacity) {
      this._resize(this._capacity * 2);
    }

    return this._size;
  }

  prepend(item) {
    return this.insert(0, item);
  }

  pop() {
    return this.delete(this._size - 1);
  }

  delete(index) {
    if (this.isEmpty()) {
      throw new Error('array is empty');
    }
    if (index < 0 || index >= this._size) {
      throw new Error('index is out of bounds');
    }

    const subarr = this._array.slice(index + 1, this._size);
    for (let i = 0; i < subarr.length; i++) {
      this._array[index + i] = subarr[i];
    }

    const item = this._array[this._size - 1];
    this._array[this._size - 1] = undefined;
    this._size -= 1;

    const isResizeNeeded = this._size <= this._capacity / 4 && this._capacity > initialCapacity;
    if (isResizeNeeded) {
      this._resize(this._capacity / 2);
    }

    return item;
  }

  remove(item) {
    let found = false;
    let lastRemovalIdx = 0;
    let countOfRemovals = 0;
    do {
      found = false;
      for (let i = lastRemovalIdx; i < this._size; i++) {
        if (this._array[i] === item) {
          found = true;
          lastRemovalIdx = i;
          countOfRemovals += 1;
          this.delete(i);
          break;
        }
      }
    } while (found);
    return countOfRemovals;
  }

  find(item) {
    return this._array.indexOf(item);
  }

  toArray() {
    // filter 'undefined' values
    const filteredArray = this._array.filter(Boolean);
    return filteredArray;
  }

  toString() {
    // filter 'undefined' values
    const filteredArray = this._array.filter(Boolean);
    return filteredArray.toString();
  }

  _resize(newCapacity) {
    this._capacity = newCapacity;
    const newArray = new Array(this._capacity);
    for (let i = 0; i < this._size; i++) {
      newArray[i] = this._array[i];
    }
    this._array = newArray;
  }
}
