import GraphViaAdjMatrix from '../GraphViaAdjMatrix'

describe('GraphViaAdjList', () => {
  it('should create empty graph', () => {
    const graph = new GraphViaAdjMatrix()
    expect(Object.keys(graph._adjMatrix).length).toBe(0)
  })

  it('addVertex', () => {
    const graph = new GraphViaAdjMatrix()
    expect(Object.keys(graph._adjMatrix).length).toBe(0)

    graph.addVertex()
    expect(graph._adjMatrix.length).toBe(1)
    expect(graph._adjMatrix[0].length).toBe(1)
    expect(graph._adjMatrix[0][0]).toBe(0)

    const newMatrix_1 = [
      [0, 0],
      [0, 0],
    ]
    graph.addVertex()
    expect(graph._adjMatrix).toEqual(newMatrix_1)

    graph.addEdge(0, 0)
    graph.addEdge(1, 1)
    const newMatrix_2 = [
      [1, 0],
      [0, 1],
    ]
    expect(graph._adjMatrix).toEqual(newMatrix_2)
  })

  it('addEdge', () => {
    const graph = new GraphViaAdjMatrix()
    const startVtx = 0
    const endVtx = 1
    expect(() => graph.addEdge(startVtx, endVtx)).toThrow('Start vertex is not in graph.')

    graph.addVertex()
    expect(() => graph.addEdge(startVtx, endVtx)).toThrow('End vertex is not in graph.')

    graph.addVertex()
    expect(graph._adjMatrix[startVtx][endVtx]).toBe(0)
    graph.addEdge(startVtx, endVtx)
    expect(graph._adjMatrix[startVtx][endVtx]).toBe(1)

    expect(() => graph.addEdge(startVtx, endVtx)).toThrow('Edge is already added.')
  })

  it('traverseInBfsOrder', () => {
    const graph_1 = new GraphViaAdjMatrix()
    expect(() => graph_1.traverseInBfsOrder(0)).toThrow('Source vertex is not in graph.')

    graph_1.addVertex(0)
    const result_1_1 = graph_1.traverseInBfsOrder(0)
    expect(result_1_1).toEqual([0])

    graph_1.addVertex(1)
    graph_1.addVertex(2)
    const result_1_2 = graph_1.traverseInBfsOrder(0)
    expect(result_1_2).toEqual([0])

    graph_1.addEdge(0, 1)
    graph_1.addEdge(0, 2)
    const result_1_3 = graph_1.traverseInBfsOrder(0)
    expect(result_1_3).toEqual([0, 1, 2])

    const result_1_4 = graph_1.traverseInBfsOrder(1)
    expect(result_1_4).toEqual([1])
    const result_1_5 = graph_1.traverseInBfsOrder(2)
    expect(result_1_5).toEqual([2])

    // picture of this graph is in '../../images/bfs.png'
    const graph_2 = new GraphViaAdjMatrix()
    for (let i = 0; i < 8; i++) {
      graph_2.addVertex()
    }
    const charToNum = {
      a: 0,
      s: 1,
      d: 2,
      f: 3,
      z: 4,
      x: 5,
      c: 6,
      v: 7,
    }
    graph_2.addEdge(charToNum.a, charToNum.z)
    graph_2.addEdge(charToNum.z, charToNum.a)
    graph_2.addEdge(charToNum.a, charToNum.s)
    graph_2.addEdge(charToNum.s, charToNum.a)
    graph_2.addEdge(charToNum.s, charToNum.x)
    graph_2.addEdge(charToNum.x, charToNum.s)
    graph_2.addEdge(charToNum.x, charToNum.d)
    graph_2.addEdge(charToNum.d, charToNum.x)
    graph_2.addEdge(charToNum.x, charToNum.c)
    graph_2.addEdge(charToNum.c, charToNum.x)
    graph_2.addEdge(charToNum.d, charToNum.f)
    graph_2.addEdge(charToNum.f, charToNum.d)
    graph_2.addEdge(charToNum.d, charToNum.c)
    graph_2.addEdge(charToNum.c, charToNum.d)
    graph_2.addEdge(charToNum.c, charToNum.f)
    graph_2.addEdge(charToNum.f, charToNum.c)
    graph_2.addEdge(charToNum.c, charToNum.v)
    graph_2.addEdge(charToNum.v, charToNum.c)
    graph_2.addEdge(charToNum.f, charToNum.v)
    graph_2.addEdge(charToNum.v, charToNum.f)

    const result_2_1 = graph_2.traverseInBfsOrder(charToNum.s)
    expect(result_2_1).toEqual([
      charToNum.s,
      charToNum.a,
      charToNum.x,
      charToNum.z,
      charToNum.d,
      charToNum.c,
      charToNum.f,
      charToNum.v,
    ])
  })
})
