import LinkedListWithTail from '../../linked-list/LinkedListWithTail'

export default class QueueViaLinkedList {
  constructor() {
    this._list = new LinkedListWithTail()
  }

  // empty()
  isEmpty() {
    return this._list.isEmpty()
  }

  // enqueue(value) - adds value at position at tail
  enqueue(value) {
    this._list.pushBack(value)
  }

  // dequeue() - returns value and removes least recently added element (front)
  dequeue() {
    if (this._list.isEmpty()) {
      throw new Error('queue is empty')
    }
    return this._list.popFront()
  }

  toArray() {
    return this._list.toArray()
  }
}
