/**
 * Singly-linked list with tail pointer
 */

class ListNode {
  constructor(value) {
    this.data = value
    this.next = null
  }
}

export default class LinkedListWithTail {
  constructor() {
    this.head = null
    this.tail = null
  }

  // empty() - returns true if empty
  isEmpty() {
    return this.head === null
  }

  // push_back(value) - adds an item at the end
  pushBack(value) {
    if (this.head === null) {
      const node = new ListNode(value)
      this.head = node
      this.tail = node
      return
    }

    const node = new ListNode(value)
    this.tail.next = node
    this.tail = node
  }

  // pop_front() - remove front item and return its value
  popFront() {
    if (this.head === null) {
      throw new Error('list is empty')
    }

    const data = this.head.data
    this.head = this.head.next
    if (this.head === null) {
      this.tail = null
    }
    return data
  }

  toArray() {
    const values = []
    let curr = this.head
    while (curr !== null) {
      values.push(curr.data)
      curr = curr.next
    }
    return values
  }
}
