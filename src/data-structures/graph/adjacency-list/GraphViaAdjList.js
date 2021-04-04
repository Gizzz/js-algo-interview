import Queue from '../../queue/link-list-based/QueueViaLinkedList'
import Stack from '../../stack/Stack'
import MinPriorityQueue from '../../priority-queue/MinPriorityQueue'

export default class GraphViaAdjList {
  constructor() {
    this._adjList = {}
    // maps edge to its weight
    this._weights = {}
  }

  addVertex(vertexKey) {
    if (this._adjList[vertexKey] !== undefined) {
      throw new Error('Vertex is already added to graph.')
    }
    this._adjList[vertexKey] = []
  }

  addEdge(startVtx, endVtx, weight = 1) {
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
    this._weights[`${startVtx}->${endVtx}`] = weight
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
    if (this._adjList[sourceVtx] === undefined) {
      throw new Error('Source vertex is not in graph.')
    }

    // previos vertex in path to vertex;
    // if UNDEFINED - vertex not visited,
    // if NULL - vertex has no previous vertex (case for source vertex)
    const prev = {}
    prev[sourceVtx] = null
    // distance to vertex; if UNDEFINED - distance is infinity (vertex is not reachable)
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

  classifyEdges() {
    const result = {
      edges: {},
      startTimes: {},
      finishTimes: {},
      ticks: 0,
    }

    const vertices = this._getVertices()
    vertices.forEach(vertex => {
      const isVertexVisited = result.startTimes[vertex] !== undefined
      if (!isVertexVisited) {
        this._dfsVisitForClassifyEdges(vertex, result)
      }
    })
    return result.edges
  }

  _dfsVisitForClassifyEdges(vertex, result) {
    // needed to mutate `result` param:
    /* eslint-disable no-param-reassign */
    result.ticks += 1
    result.startTimes[vertex] = result.ticks

    const neighbors = this._adjList[vertex]
    neighbors.forEach(neighbor => {
      const isNeighborVisited = result.startTimes[neighbor] !== undefined
      const isNeighborFinished = result.finishTimes[neighbor] !== undefined
      const isNeighborStartedAfterVertex = result.startTimes[neighbor] > result.startTimes[vertex]
      if (!isNeighborVisited) {
        result.edges[`${vertex}->${neighbor}`] = 'tree'
        this._dfsVisitForClassifyEdges(neighbor, result)
      } else if (!isNeighborFinished) {
        result.edges[`${vertex}->${neighbor}`] = 'back'
      } else if (isNeighborStartedAfterVertex) {
        result.edges[`${vertex}->${neighbor}`] = 'forward'
      } else {
        result.edges[`${vertex}->${neighbor}`] = 'cross'
      }
    })

    result.ticks += 1
    result.finishTimes[vertex] = result.ticks
    /* eslint-enable no-param-reassign */
  }

  /**
   * Implements Kosaraju's algorithm
   */
  findStronglyConnectedComponents() {
    const finishTimesStack = new Stack()
    const visited = new Map()
    const vertices = this._getVertices()
    vertices.forEach(vertex => {
      if (!visited.has(vertex)) {
        this._dfsVisit_populateStack(vertex, visited, finishTimesStack)
      }
    })

    this._reverseEdges()
    const components = []
    visited.clear()
    while (!finishTimesStack.isEmpty()) {
      const vertex = finishTimesStack.pop()
      if (visited.has(vertex)) {
        continue
      }
      const component = []
      this._dfsVisit_populateComponent(vertex, visited, component)
      components.push(component)
    }
    // reverse back to original edges
    this._reverseEdges()
    return components
  }

  _dfsVisit_populateStack(vertex, visited, finishTimesStack) {
    visited.set(vertex, true)
    const neighbors = this._adjList[vertex]
    neighbors.forEach(neighbor => {
      if (!visited.has(neighbor)) {
        this._dfsVisit_populateStack(neighbor, visited, finishTimesStack)
      }
    })
    finishTimesStack.push(vertex)
  }

  _dfsVisit_populateComponent(vertex, visited, component) {
    visited.set(vertex, true)
    component.push(vertex)
    const neighbors = this._adjList[vertex]
    neighbors.forEach(neighbor => {
      if (!visited.has(neighbor)) {
        this._dfsVisit_populateComponent(neighbor, visited, component)
      }
    })
  }

  _reverseEdges() {
    const newAdjList = {}
    const vertices = this._getVertices()
    vertices.forEach(vertex => {
      newAdjList[vertex] = []
    })
    vertices.forEach(vertex => {
      const neighbors = this._adjList[vertex]
      neighbors.forEach(neighbor => {
        newAdjList[neighbor].push(vertex)
      })
    })
    this._adjList = newAdjList
  }

  calcShortestPathsViaDijkstra(sourceVtx) {
    if (this._adjList[sourceVtx] === undefined) {
      throw new Error('Source vertex is not in graph.')
    }

    // previos vertex in path to vertex;
    // if UNDEFINED - vertex not visited,
    // if NULL - vertex has no previous vertex (case for source vertex)
    const prev = {}
    prev[sourceVtx] = null
    // distance to vertex; if UNDEFINED - distance is infinity (vertex is not reachable)
    const dist = {}
    dist[sourceVtx] = 0

    const vertexToId = {} // del
    const minPq = new MinPriorityQueue()
    const srcInsertionResult = minPq.insertWithPriority(sourceVtx, 0)
    vertexToId[sourceVtx] = srcInsertionResult.id // del
    while (!minPq.isEmpty()) {
      const currVtx = minPq.extractHighestPriorityItem()
      const neighbors = this._adjList[currVtx]
      neighbors.forEach(neighbor => {
        const isNeighborVisited = prev[neighbor] !== undefined
        const oldDistance = dist[neighbor] === undefined ? Infinity : dist[neighbor]
        const newDistance = dist[currVtx] + this._weights[`${currVtx}->${neighbor}`]
        if (!isNeighborVisited) {
          prev[neighbor] = currVtx
          dist[neighbor] = newDistance
          const insertionResult = minPq.insertWithPriority(neighbor, newDistance)
          vertexToId[neighbor] = insertionResult.id // del
        } else if (newDistance < oldDistance) {
          prev[neighbor] = currVtx
          dist[neighbor] = newDistance
          const neighborId = vertexToId[neighbor] // del
          minPq.changePriority(neighborId, newDistance)
        }
      })
    }
    return [prev, dist]
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
