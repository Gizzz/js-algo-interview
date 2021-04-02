import Queue from '../../queue/link-list-based/QueueViaLinkedList'

export default class GraphViaAdjMatrix {
  constructor() {
    // `_adjMatrix` edge adressing:
    // row - start vertex
    // col - end vertex,
    // e.g. `_adjMatrix[1][2]` - edge from vertex 1 to vergex 2
    //
    // vertecies are numbered from zero to `matrixSize - 1`
    //
    // `_adjMatrix[x][y] === 0` - no edge between x and y
    // `_adjMatrix[x][y] === 1` - there is an edge between x and y
    this._adjMatrix = []
  }

  addVertex() {
    // for adj. matrix based graph 'add vertex' means increase
    // both dimensions of matrix (rows & cols) and copy edge values to new matrix

    const newSize = this._adjMatrix.length + 1
    const newMatrix = []
    for (let i = 0; i < newSize; i++) {
      const row = new Array(newSize).fill(0)
      newMatrix.push(row)
    }

    const currSize = this._adjMatrix.length
    for (let i = 0; i < currSize; i++) {
      for (let j = 0; j < currSize; j++) {
        newMatrix[i][j] = this._adjMatrix[i][j]
      }
    }
    this._adjMatrix = newMatrix
  }

  addEdge(startVtx, endVtx) {
    const matrixSize = this._adjMatrix.length
    if (startVtx < 0 || startVtx >= matrixSize) {
      throw new Error('Start vertex is not in graph.')
    }
    if (endVtx < 0 || endVtx >= matrixSize) {
      throw new Error('End vertex is not in graph.')
    }
    if (this._adjMatrix[startVtx][endVtx] === 1) {
      throw new Error('Edge is already added.')
    }
    this._adjMatrix[startVtx][endVtx] = 1
  }

  traverseInBfsOrder(sourceVtx) {
    const matrixSize = this._adjMatrix.length
    if (sourceVtx < 0 || sourceVtx >= matrixSize) {
      throw new Error('Source vertex is not in graph.')
    }

    const q = new Queue()
    q.enqueue(sourceVtx)
    const visited = new Map()
    while (q.isEmpty() === false) {
      const currVtx = q.dequeue()
      visited.set(currVtx, true)
      const neighbors = this._getNeighbors(currVtx)
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          q.enqueue(neighbor)
        }
      })
    }

    const result = []
    // eslint-disable-next-line no-restricted-syntax
    for (const vtx of visited.keys()) {
      result.push(vtx)
    }
    return result
  }

  _getNeighbors(vertex) {
    const vertexRow = this._adjMatrix[vertex]
    const result = []
    for (let i = 0; i < this._adjMatrix.length; i++) {
      if (vertexRow[i] === 1) {
        result.push(i)
      }
    }
    return result
  }
}
