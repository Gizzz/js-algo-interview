/**
 * Implementation of BST with no duplicates and no parent pointer.
 * Iteration is preferred over recursion to prevent the stack growth.
 */

import Queue from '../queue/link-list-based/QueueViaLinkedList'

class BstNode {
  constructor(key) {
    this.key = key
    this.left = null
    this.right = null
  }
}

export default class BinarySearchTree {
  constructor() {
    this.root = null
    this._nodeCount = 0
  }

  getNodeCount() {
    return this._nodeCount
  }

  /**
   * returns node with specified key or NULL
   */
  findNode(key) {
    let curr = this.root
    while (curr !== null) {
      if (curr.key === key) {
        break
      } else if (key < curr.key) {
        curr = curr.left
      } else {
        curr = curr.right
      }
    }
    return curr
  }

  insert(key) {
    const node = new BstNode(key)
    if (this.root === null) {
      this.root = node
    } else {
      let curr = this.root
      // eslint-disable-next-line no-constant-condition
      while (true) {
        if (curr.key === key) {
          throw new Error('no duplicate keys allowed')
        } else if (key < curr.key) {
          if (curr.left === null) {
            curr.left = node
            break
          }
          curr = curr.left
        } else {
          if (curr.right === null) {
            curr.right = node
            break
          }
          curr = curr.right
        }
      }
    }

    this._nodeCount += 1
    return node
  }

  delete(key) {
    let node = this.root
    let parent = null
    while (node !== null) {
      if (key === node.key) {
        break
      } else if (key < node.key) {
        parent = node
        node = node.left
      } else {
        parent = node
        node = node.right
      }
    }

    if (node === null) {
      throw new Error('key do not exist')
    }

    const hasZeroChildren = node.left === null && node.right === null
    const hasOneChild = !hasZeroChildren && (node.left === null || node.right === null)
    const hasTwoChildren = node.left !== null && node.right !== null
    if (hasZeroChildren) {
      if (node === this.root) {
        this.root = null
      } else {
        if (parent.left === node) {
          parent.left = null
        } else if (parent.right === node) {
          parent.right = null
        } else {
          throw new Error('node should be left or right child')
        }
      }
    } else if (hasOneChild) {
      const child = node.left !== null ? node.left : node.right
      if (node === this.root) {
        this.root = child
      } else {
        const isLeftChild = parent.left === node
        if (isLeftChild) {
          parent.left = child
        } else {
          parent.right = child
        }
      }
    } else if (hasTwoChildren) {
      const successor = this.nextLarger(key)
      const parentOfSuccessor = this._findParent(successor.key)
      node.key = successor.key
      successor.key = key
      this._deleteByRef(successor, parentOfSuccessor)
    } else {
      throw new Error('unexpected count of children')
    }

    this._nodeCount -= 1
    return node
  }

  /**
   * returns parent node for node with specified key or NULL
   */
  _findParent(key) {
    let curr = this.root
    let parent = null
    while (curr !== null) {
      if (key === curr.key) {
        break
      } else if (key < curr.key) {
        parent = curr
        curr = curr.left
      } else {
        parent = curr
        curr = curr.right
      }
    }
    return parent
  }

  /**
   * helper for 'delete' function,
   * handles case for deleting node with two children
   */
  _deleteByRef(node, parent) {
    // below is needed to update parent's left and right props:
    /* eslint-disable no-param-reassign */

    if (node === this.root && parent !== null) {
      throw new Error('parent of root should be null')
    }
    if (node !== this.root && parent === null) {
      throw new Error('parent of non-root node is null')
    }

    const hasZeroChildren = node.left === null && node.right === null
    const hasOneChild = !hasZeroChildren && (node.left === null || node.right === null)
    if (hasZeroChildren) {
      if (node === this.root) {
        this.root = null
      } else {
        if (parent.left === node) {
          parent.left = null
        } else if (parent.right === node) {
          parent.right = null
        } else {
          throw new Error('node should be left or right child')
        }
      }
    } else if (hasOneChild) {
      const child = node.left !== null ? node.left : node.right
      if (node === this.root) {
        this.root = child
      } else {
        const isLeftChild = parent.left === node
        if (isLeftChild) {
          parent.left = child
        } else {
          parent.right = child
        }
      }
    } else {
      throw new Error('node should have zero or one child')
    }
    // NOTE: this._nodesCount is updated in 'delete' function

    /* eslint-enable no-param-reassign */
  }

  /**
   * returns successor node or null
   */
  nextLarger(key) {
    let node = this.root
    let closestGreaterAncestor = null
    while (node !== null) {
      if (key === node.key) {
        break
      } else if (key < node.key) {
        closestGreaterAncestor = node
        node = node.left
      } else {
        node = node.right
      }
    }

    if (node === null) {
      return null
    }

    if (node.right !== null) {
      const minNode = this.findMinNode(node.right)
      return minNode
    }
    return closestGreaterAncestor
  }

  /**
   * returns min node in subtree or null
   */
  findMinNode(subtreeRoot) {
    if (subtreeRoot === null) {
      return null
    }

    let node = subtreeRoot
    while (node.left !== null) {
      node = node.left
    }
    return node
  }

  /**
   * returns max node in subtree or null
   */
  findMaxNode(subtreeRoot) {
    if (subtreeRoot === null) {
      return null
    }

    let node = subtreeRoot
    while (node.right !== null) {
      node = node.right
    }
    return node
  }

  // nextSmaller
  // is_binary_search_tree
  // BFS
  // DFS (preorder, inorder, postorder)
  //   print_values // prints the values in the tree, from min to max (inorder DFS with callback)
  // height(node)
  // size(node)
  // rank(x) - count of nodes with 'key <= x'
  // range(x, y) - returns list of nodes with keys between x and y

  toString() {
    if (this.root === null) {
      return 'tree is empty'
    }

    let queue = new Queue()
    queue.enqueue(this.root)
    let resultStr = ''
    while (!queue.isEmpty()) {
      const nodesOnLevel = queue.toArray()
      if (nodesOnLevel.every((node) => node === null)) {
        break
      }

      let nodesOnLevelStr = ''
      nodesOnLevel.forEach((node) => {
        const nodeStr = node === null ? 'X' : String(node.key)
        if (nodesOnLevelStr !== '') {
          nodesOnLevelStr += ' '
        }
        nodesOnLevelStr += nodeStr
      })
      if (resultStr !== '') {
        resultStr += '\n'
      }
      resultStr += nodesOnLevelStr

      queue = new Queue()
      nodesOnLevel.forEach((node) => {
        queue.enqueue(node ? node.left : null)
        queue.enqueue(node ? node.right : null)
      })
    }
    return resultStr
  }
}
