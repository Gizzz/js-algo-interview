/**
 * Queue implementation using fixed sized array (as circular buffer)
 *
 * About circular buffer: https://en.wikipedia.org/wiki/Circular_buffer
 */

const defaultQueueSize = 4

export default class QueueViaFixedArray {
  constructor(size = defaultQueueSize) {
    this._capacity = size + 1
    this._readIdx = 0
    this._writeIdx = 0
    this._array = new Array(this._capacity)
  }

  // enqueue(value) - adds item at end of available storage
  enqueue(value) {
    if (this.isFull()) {
      throw new Error('queue is full')
    }
    this._array[this._writeIdx] = value
    this._writeIdx = (this._writeIdx + 1) % this._capacity
  }

  // dequeue() - returns value and removes least recently added element
  dequeue() {
    if (this.isEmpty()) {
      throw new Error('queue is empty')
    }

    const value = this._array[this._readIdx]
    this._readIdx = (this._readIdx + 1) % this._capacity
    return value
  }

  // empty()
  isEmpty() {
    return this._readIdx === this._writeIdx
  }

  // full()
  isFull() {
    return (this._writeIdx + 1) % this._capacity === this._readIdx
  }

  toArray() {
    let readIdxCopy = this._readIdx
    const res = []
    while (readIdxCopy !== this._writeIdx) {
      res.push(this._array[readIdxCopy])
      readIdxCopy = (readIdxCopy + 1) % this._capacity
    }
    return res
  }
}
