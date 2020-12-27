/**
 * Singly-linked list with no tail
 */

class ListNode {
  constructor(value) {
    this.data = value
    this.next = null
  }
}

export default class LinkedList {
  constructor() {
    this._size = 0
    this.head = null
  }

  // size() - returns number of data elements in list
  getSize() {
    return this._size
  }

  // empty() - returns true if empty
  isEmpty() {
    return this._size === 0
  }

  // value_at(index) - returns the value of the nth item (starting at 0 for first)
  valueAt(index) {
    if (this.head === null) {
      throw new Error('list is empty')
    }
    if (index < 0 || index > this._size - 1) {
      throw new Error('index is out of bounds')
    }

    let curr = this.head
    for (let i = 0; i < index; i++) {
      curr = curr.next
    }
    return curr.data
  }

  // push_front(value) - adds an item to the front of the list
  pushFront(value) {
    const node = new ListNode(value)
    node.next = this.head
    this.head = node
    this._size += 1
  }

  // pop_front() - remove front item and return its value
  popFront() {
    if (this.head === null) {
      throw new Error('list is empty')
    }

    const data = this.head.data
    this.head = this.head.next
    this._size -= 1
    return data
  }

  // push_back(value) - adds an item at the end
  pushBack(value) {
    if (this.head === null) {
      const node = new ListNode(value)
      this.head = node
      this._size += 1
      return
    }

    let curr = this.head
    while (curr.next !== null) {
      curr = curr.next
    }
    const tail = curr

    const node = new ListNode(value)
    this._size += 1
    tail.next = node
  }

  // pop_back() - removes end item and returns its value
  popBack() {
    if (this.head === null) {
      throw new Error('list is empty')
    }

    let curr = this.head
    let prev = null
    while (curr.next !== null) {
      prev = curr
      curr = curr.next
    }
    const tail = curr

    const data = tail.data
    if (prev === null) {
      this.head = null
    } else {
      prev.next = null
    }
    this._size -= 1
    return data
  }

  // front() - get value of front item (peek)
  peekFront() {
    if (this.head === null) {
      throw new Error('list is empty')
    }

    return this.head.data
  }

  // back() - get value of end item (peek)
  peekBack() {
    if (this.head === null) {
      throw new Error('list is empty')
    }

    let curr = this.head
    while (curr.next !== null) {
      curr = curr.next
    }
    const tail = curr
    return tail.data
  }

  // insert(index, value) - insert value at index,
  //   so current item at that index is pointed to by new item at index
  insert(index, value) {
    if (index < 0 || index > this._size) {
      throw new Error('index is out of bounds')
    }

    if (index === this._size) {
      this.pushBack(value)
      return
    }

    let curr = this.head
    for (let i = 0; i < index; i++) {
      curr = curr.next
    }

    const node = new ListNode(curr.data)
    node.next = curr.next
    curr.data = value
    curr.next = node
    this._size += 1
  }

  // erase(index) - removes node at given index
  erase(index) {
    this._checkEmpty(this.head)
    this._checkIndex(index, 0, this._size - 1)

    let curr = this.head
    let prev = null
    for (let i = 0; i < index; i++) {
      prev = curr
      curr = curr.next
    }

    if (prev === null) {
      this.head = curr.next
    } else {
      prev.next = curr.next
    }
    this._size -= 1
  }

  // value_n_from_end(n) - returns the value of the node at nth position from the end of the list
  valueNFromEnd(n) {
    this._checkEmpty(this.head)
    this._checkIndex(n, 0, this._size - 1)

    const index = this._size - 1 - n
    return this.valueAt(index)
  }

  // reverse() - reverses the list
  reverse() {
    // if (this._size < 2) {
    //   return
    // }

    let curr = this.head
    let prev = null
    while (curr !== null) {
      const next = curr.next
      curr.next = prev
      prev = curr
      curr = next
    }
    this.head = prev
  }

  // remove_value(value) - removes the first item in the list with this value
  removeValue(value) {
    const index = this.findIndex(value)
    if (index === -1) {
      return
    }

    this.erase(index)
  }

  // find(value) - find value in list
  findIndex(value) {
    let curr = this.head
    let index = 0
    while (curr !== null) {
      if (curr.data === value) {
        return index
      }
      curr = curr.next
      index += 1
    }
    return -1
  }

  // --- optional methods ---
  //
  // ?addBefore(node, key) - add key before node
  // ?addAfter(node, key) - add key after node

  _checkEmpty(head) {
    if (head === null) {
      throw new Error('list is empty')
    }
  }

  _checkIndex(index, start, end) {
    if (index < start || index > end) {
      throw new Error('index is out of bounds')
    }
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
