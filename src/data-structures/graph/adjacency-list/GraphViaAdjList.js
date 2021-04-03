import Queue from '../../queue/link-list-based/QueueViaLinkedList'
import Stack from '../../stack/Stack'

export default class GraphViaAdjList {
  constructor() {
    this._adjList = {}
  }

  addVertex(vertexKey) {
    if (this._adjList[vertexKey] !== undefined) {
      throw new Error('Vertex is already added to graph.')
    }
    this._adjList[vertexKey] = []
  }

  addEdge(startVtx, endVtx) {
    if (this._adjList[startVtx] === undefined) {
      throw new Error('Start vertex is not in graph.')
    }
    if (this._adjList[endVtx] === undefined) {
      throw new Error('End vertex is not in graph.')
    }
    if (this._adjList[startVtx].includes(endVtx)) {
      throw new Error('Edge is already added.')
    }
    this._adjList[startVtx].push(endVtx)
  }

  traverseInBfsOrder(sourceVtx) {
    if (this._adjList[sourceVtx] === undefined) {
      throw new Error('Source vertex is not in graph.')
    }

    const q = new Queue()
    q.enqueue(sourceVtx)
    const visited = new Map()
    while (q.isEmpty() === false) {
      const currVtx = q.dequeue()
      visited.set(currVtx, true)
      const neighbors = this._adjList[currVtx]
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

  calcShortestPathsViaBfs(sourceVtx) {
    if (sourceVtx === undefined) {
      throw new Error('`sourceVtx` param is not provided.')
    }
    if (this._adjList[sourceVtx] === undefined) {
      throw new Error('Source vertex is not in graph.')
    }

    // previos vertex in path to vertex;
    // if UNDEFINED - vertex not visited,
    // if NULL - vertex has no previous vertex (case for source vertex)
    const prev = {}
    prev[sourceVtx] = null
    // distance to vertex; if UNDEFINED - distance is infinity (vertex not reachable)
    const dist = {}
    dist[sourceVtx] = 0

    const q = new Queue()
    q.enqueue(sourceVtx)
    while (q.isEmpty() === false) {
      const currVtx = q.dequeue()
      const neighbors = this._adjList[currVtx]
      neighbors.forEach(neighbor => {
        if (prev[neighbor] === undefined) {
          prev[neighbor] = currVtx
          dist[neighbor] = dist[currVtx] + 1
          q.enqueue(neighbor)
        }
      })
    }

    return [prev, dist]
  }

  traverseInDfsOrderRecursively() {
    const visited = new Map()
    const vertices = this._getVertices()
    vertices.forEach(vertex => {
      if (!visited.has(vertex)) {
        this._dfsVisitRecursively(vertex, visited)
      }
    })

    const result = []
    // eslint-disable-next-line no-restricted-syntax
    for (const vtx of visited.keys()) {
      result.push(vtx)
    }
    return result
  }

  _dfsVisitRecursively(vertex, visited) {
    visited.set(vertex, true)
    const neighbors = this._adjList[vertex]
    neighbors.forEach(neighbor => {
      if (!visited.has(neighbor)) {
        this._dfsVisitRecursively(neighbor, visited)
      }
    })
  }

  traverseInDfsOrderIteratively() {
    const visited = new Map()
    const vertices = this._getVertices()
    vertices.forEach(vertex => {
      if (!visited.has(vertex)) {
        this._dfsVisitIteratively(vertex, visited)
      }
    })

    const result = []
    // eslint-disable-next-line no-restricted-syntax
    for (const vtx of visited.keys()) {
      result.push(vtx)
    }
    return result
  }

  _dfsVisitIteratively(vertex, visited) {
    const stack = new Stack()
    stack.push(vertex)
    while (!stack.isEmpty()) {
      const currVtx = stack.pop()
      if (visited.has(currVtx)) {
        continue
      }
      visited.set(currVtx, true)
      const neighbors = this._adjList[currVtx]
      neighbors.forEach(neighbor => {
        if (!visited.has(neighbor)) {
          stack.push(neighbor)
        }
      })
    }
  }

  traverseInTopologicallySortedOrder() {
    const result = {
      startTimes: {},
      finishTimes: {},
      order: [],
      ticks: 0,
    }

    const vertices = this._getVertices()
    vertices.forEach(vertex => {
      const isVertexVisited = result.startTimes[vertex] !== undefined
      if (!isVertexVisited) {
        this._dfsVisitForTopologicalSort(vertex, result)
      }
    })

    return result.order.reverse()
  }

  _dfsVisitForTopologicalSort(vertex, result) {
    // needed to mutate `result` param:
    /* eslint-disable no-param-reassign */
    result.ticks += 1
    result.startTimes[vertex] = result.ticks

    const neighbors = this._adjList[vertex]
    neighbors.forEach(neighbor => {
      const isNeighborVisited = result.startTimes[neighbor] !== undefined
      const isNeighborFinished = result.finishTimes[neighbor] !== undefined
      if (!isNeighborVisited) {
        this._dfsVisitForTopologicalSort(neighbor, result)
      } else if (!isNeighborFinished) {
        throw new Error('Back edge detected.')
      }
    })

    result.ticks += 1
    result.finishTimes[vertex] = result.ticks
    result.order.push(vertex)
    /* eslint-enable no-param-reassign */
  }

  /**
   * @returns all vertices in graph
   */
  _getVertices() {
    const result = []
    Object
      .keys(this._adjList)
      .forEach(key => result.push(key))
    return result
  }
}
