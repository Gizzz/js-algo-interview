import Queue from '../../queue/link-list-based/QueueViaLinkedList'

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
    if (sourceVtx === undefined) {
      throw new Error('`sourceVtx` param is not provided.')
    }
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
}
