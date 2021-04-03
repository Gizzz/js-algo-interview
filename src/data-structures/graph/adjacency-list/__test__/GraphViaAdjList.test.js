import GraphViaAdjList from '../GraphViaAdjList'

describe('GraphViaAdjList', () => {
  it('should create empty graph', () => {
    const graph = new GraphViaAdjList()
    expect(Object.keys(graph._adjList).length).toBe(0)
  })

  it('addVertex', () => {
    const graph = new GraphViaAdjList()
    const newVertexKey = 'A'
    expect(graph._adjList[newVertexKey]).toBe(undefined)

    graph.addVertex(newVertexKey)
    expect(graph._adjList[newVertexKey]).toEqual([])

    expect(() => graph.addVertex(newVertexKey)).toThrow('Vertex is already added to graph.')
  })

  it('addEdge', () => {
    const graph = new GraphViaAdjList()
    const startVtx = 'A'
    const endVtx = 'B'
    expect(() => graph.addEdge(startVtx, endVtx)).toThrow('Start vertex is not in graph.')

    graph.addVertex(startVtx)
    expect(() => graph.addEdge(startVtx, endVtx)).toThrow('End vertex is not in graph.')

    graph.addVertex(endVtx)
    graph.addEdge(startVtx, endVtx)
    expect(graph._adjList[startVtx].includes(endVtx)).toBe(true)

    expect(() => graph.addEdge(startVtx, endVtx)).toThrow('Edge is already added.')
  })

  it('traverseInBfsOrder', () => {
    const graph_1 = new GraphViaAdjList()
    expect(() => graph_1.traverseInBfsOrder('A')).toThrow('Source vertex is not in graph.')

    graph_1.addVertex('A')
    const result_1_1 = graph_1.traverseInBfsOrder('A')
    expect(result_1_1).toEqual(['A'])

    graph_1.addVertex('B')
    graph_1.addVertex('C')
    graph_1.addVertex('D')
    const result_1_2 = graph_1.traverseInBfsOrder('A')
    expect(result_1_2).toEqual(['A'])

    graph_1.addEdge('A', 'B')
    graph_1.addEdge('A', 'C')
    graph_1.addEdge('A', 'D')
    const result_1_3 = graph_1.traverseInBfsOrder('A')
    expect(result_1_3).toEqual(['A', 'B', 'C', 'D'])

    const result_1_4 = graph_1.traverseInBfsOrder('B')
    expect(result_1_4).toEqual(['B'])
    const result_1_5 = graph_1.traverseInBfsOrder('C')
    expect(result_1_5).toEqual(['C'])

    // picture of this graph is in '../../images/bfs.png'
    const graph_2 = new GraphViaAdjList()
    graph_2.addVertex('a')
    graph_2.addVertex('s')
    graph_2.addVertex('d')
    graph_2.addVertex('f')
    graph_2.addVertex('z')
    graph_2.addVertex('x')
    graph_2.addVertex('c')
    graph_2.addVertex('v')
    //
    graph_2.addEdge('a', 'z')
    graph_2.addEdge('z', 'a')
    graph_2.addEdge('a', 's')
    graph_2.addEdge('s', 'a')
    graph_2.addEdge('s', 'x')
    graph_2.addEdge('x', 's')
    graph_2.addEdge('x', 'd')
    graph_2.addEdge('d', 'x')
    graph_2.addEdge('x', 'c')
    graph_2.addEdge('c', 'x')
    graph_2.addEdge('d', 'f')
    graph_2.addEdge('f', 'd')
    graph_2.addEdge('d', 'c')
    graph_2.addEdge('c', 'd')
    graph_2.addEdge('c', 'f')
    graph_2.addEdge('f', 'c')
    graph_2.addEdge('c', 'v')
    graph_2.addEdge('v', 'c')
    graph_2.addEdge('f', 'v')
    graph_2.addEdge('v', 'f')

    const result_2_1 = graph_2.traverseInBfsOrder('s')
    expect(result_2_1).toEqual(['s', 'a', 'x', 'z', 'd', 'c', 'f', 'v'])
  })

  it('calcShortestPathsViaBfs', () => {
    /* eslint-disable dot-notation */
    const graph_1 = new GraphViaAdjList()
    expect(() => graph_1.calcShortestPathsViaBfs()).toThrow('`sourceVtx` param is not provided.')
    expect(() => graph_1.calcShortestPathsViaBfs('A')).toThrow('Source vertex is not in graph.')

    graph_1.addVertex('A')
    const [prev_1_1, dist_1_1] = graph_1.calcShortestPathsViaBfs('A')
    expect(prev_1_1['A']).toEqual(null)
    expect(dist_1_1['A']).toEqual(0)

    graph_1.addVertex('B')
    const [prev_1_2, dist_1_2] = graph_1.calcShortestPathsViaBfs('A')
    expect(prev_1_2['A']).toEqual(null)
    expect(dist_1_2['A']).toEqual(0)
    expect(prev_1_2['B']).toEqual(undefined)
    expect(dist_1_2['B']).toEqual(undefined)

    graph_1.addEdge('A', 'B')
    const [prev_1_3, dist_1_3] = graph_1.calcShortestPathsViaBfs('A')
    expect(prev_1_3['A']).toEqual(null)
    expect(dist_1_3['A']).toEqual(0)
    expect(prev_1_3['B']).toEqual('A')
    expect(dist_1_3['B']).toEqual(1)

    // picture of this graph is in '../../images/bfs.png'
    const graph_2 = new GraphViaAdjList()
    graph_2.addVertex('a')
    graph_2.addVertex('s')
    graph_2.addVertex('d')
    graph_2.addVertex('f')
    graph_2.addVertex('z')
    graph_2.addVertex('x')
    graph_2.addVertex('c')
    graph_2.addVertex('v')
    //
    graph_2.addEdge('a', 'z')
    graph_2.addEdge('z', 'a')
    graph_2.addEdge('a', 's')
    graph_2.addEdge('s', 'a')
    graph_2.addEdge('s', 'x')
    graph_2.addEdge('x', 's')
    graph_2.addEdge('x', 'd')
    graph_2.addEdge('d', 'x')
    graph_2.addEdge('x', 'c')
    graph_2.addEdge('c', 'x')
    graph_2.addEdge('d', 'f')
    graph_2.addEdge('f', 'd')
    graph_2.addEdge('d', 'c')
    graph_2.addEdge('c', 'd')
    graph_2.addEdge('c', 'f')
    graph_2.addEdge('f', 'c')
    graph_2.addEdge('c', 'v')
    graph_2.addEdge('v', 'c')
    graph_2.addEdge('f', 'v')
    graph_2.addEdge('v', 'f')

    const [prev_2, dist_2] = graph_2.calcShortestPathsViaBfs('s')
    expect(prev_2['s']).toEqual(null)
    expect(dist_2['s']).toEqual(0)
    expect(prev_2['a']).toEqual('s')
    expect(dist_2['a']).toEqual(1)
    expect(prev_2['x']).toEqual('s')
    expect(dist_2['x']).toEqual(1)
    expect(prev_2['z']).toEqual('a')
    expect(dist_2['z']).toEqual(2)
    expect(prev_2['d']).toEqual('x')
    expect(dist_2['d']).toEqual(2)
    expect(prev_2['c']).toEqual('x')
    expect(dist_2['c']).toEqual(2)
    expect(prev_2['f']).toEqual('d')
    expect(dist_2['f']).toEqual(3)
    expect(prev_2['v']).toEqual('c')
    expect(dist_2['v']).toEqual(3)
    /* eslint-enable dot-notation */
  })

  it('traverseInDfsOrderRecursively', () => {
    const graph_1 = new GraphViaAdjList()
    const result_1_1 = graph_1.traverseInDfsOrderRecursively()
    expect(result_1_1).toEqual([])

    graph_1.addVertex('A')
    const result_1_2 = graph_1.traverseInDfsOrderRecursively()
    expect(result_1_2).toEqual(['A'])

    graph_1.addVertex('B')
    graph_1.addVertex('C')
    graph_1.addVertex('D')
    const result_1_3 = graph_1.traverseInDfsOrderRecursively()
    expect(result_1_3).toEqual(['A', 'B', 'C', 'D'])

    graph_1.addEdge('A', 'B')
    graph_1.addEdge('B', 'D')
    graph_1.addEdge('A', 'C')
    const result_1_4 = graph_1.traverseInDfsOrderRecursively()
    expect(result_1_4).toEqual(['A', 'B', 'D', 'C'])

    // picture of this graph is in '../../images/dfs.png'
    const graph_2 = new GraphViaAdjList()
    graph_2.addVertex('a')
    graph_2.addVertex('b')
    graph_2.addVertex('c')
    graph_2.addVertex('d')
    graph_2.addVertex('e')
    graph_2.addVertex('f')
    //
    graph_2.addEdge('a', 'b')
    graph_2.addEdge('a', 'd')
    graph_2.addEdge('b', 'e')
    graph_2.addEdge('c', 'f')
    graph_2.addEdge('c', 'e')
    graph_2.addEdge('d', 'b')
    graph_2.addEdge('e', 'd')
    graph_2.addEdge('f', 'f')

    const result_2_1 = graph_2.traverseInDfsOrderRecursively()
    expect(result_2_1).toEqual(['a', 'b', 'e', 'd', 'c', 'f'])
  })

  it('traverseInDfsOrderIteratively', () => {
    const graph_1 = new GraphViaAdjList()
    const result_1_1 = graph_1.traverseInDfsOrderIteratively()
    expect(result_1_1).toEqual([])

    graph_1.addVertex('A')
    const result_1_2 = graph_1.traverseInDfsOrderIteratively()
    expect(result_1_2).toEqual(['A'])

    graph_1.addVertex('B')
    graph_1.addVertex('C')
    graph_1.addVertex('D')
    const result_1_3 = graph_1.traverseInDfsOrderIteratively()
    expect(result_1_3).toEqual(['A', 'B', 'C', 'D'])

    graph_1.addEdge('A', 'B')
    graph_1.addEdge('B', 'D')
    graph_1.addEdge('A', 'C')
    const result_1_4 = graph_1.traverseInDfsOrderIteratively()
    expect(result_1_4).toEqual(['A', 'C', 'B', 'D'])

    // picture of this graph is in '../../images/dfs.png'
    const graph_2 = new GraphViaAdjList()
    graph_2.addVertex('a')
    graph_2.addVertex('b')
    graph_2.addVertex('c')
    graph_2.addVertex('d')
    graph_2.addVertex('e')
    graph_2.addVertex('f')
    //
    graph_2.addEdge('a', 'b')
    graph_2.addEdge('a', 'd')
    graph_2.addEdge('b', 'e')
    graph_2.addEdge('c', 'f')
    graph_2.addEdge('c', 'e')
    graph_2.addEdge('d', 'b')
    graph_2.addEdge('e', 'd')
    graph_2.addEdge('f', 'f')

    const result_2_1 = graph_2.traverseInDfsOrderIteratively()
    expect(result_2_1).toEqual(['a', 'd', 'b', 'e', 'c', 'f'])
  })

  it('traverseInTopologicallySortedOrder', () => {
    const graph_1 = new GraphViaAdjList()
    const result_1_1 = graph_1.traverseInTopologicallySortedOrder()
    expect(result_1_1).toEqual([])

    graph_1.addVertex('A')
    const result_1_2 = graph_1.traverseInTopologicallySortedOrder()
    expect(result_1_2).toEqual(['A'])

    graph_1.addVertex('B')
    const result_1_3 = graph_1.traverseInTopologicallySortedOrder()
    expect(result_1_3).toEqual(['B', 'A'])

    graph_1.addEdge('A', 'B')
    const result_1_4 = graph_1.traverseInTopologicallySortedOrder()
    expect(result_1_4).toEqual(['A', 'B'])

    graph_1.addVertex('C')
    graph_1.addEdge('A', 'C')
    const result_1_5 = graph_1.traverseInTopologicallySortedOrder()
    expect(result_1_5).toEqual(['A', 'C', 'B'])

    graph_1.addVertex('D')
    graph_1.addEdge('B', 'D')
    const result_1_6 = graph_1.traverseInTopologicallySortedOrder()
    expect(result_1_6).toEqual(['A', 'C', 'B', 'D'])

    graph_1.addEdge('B', 'C')
    const result_1_7 = graph_1.traverseInTopologicallySortedOrder()
    expect(result_1_7).toEqual(['A', 'B', 'C', 'D'])

    graph_1.addEdge('D', 'A')
    expect(() => graph_1.traverseInTopologicallySortedOrder()).toThrow('Back edge detected.')

    // picture of this graph is in '../../images/topological-sort.png'
    const graph_2 = new GraphViaAdjList()
    graph_2.addVertex('A')
    graph_2.addVertex('B')
    graph_2.addVertex('C')
    graph_2.addVertex('D')
    graph_2.addVertex('E')
    graph_2.addVertex('F')
    graph_2.addVertex('G')
    graph_2.addVertex('H')
    graph_2.addVertex('I')
    //
    graph_2.addEdge('G', 'H')
    graph_2.addEdge('A', 'H')
    graph_2.addEdge('A', 'B')
    graph_2.addEdge('B', 'C')
    graph_2.addEdge('C', 'F')
    graph_2.addEdge('D', 'C')
    graph_2.addEdge('D', 'E')
    graph_2.addEdge('E', 'F')

    const result_2_1 = graph_2.traverseInTopologicallySortedOrder()
    expect(result_2_1).toEqual(['I', 'G', 'D', 'E', 'A', 'B', 'C', 'F', 'H'])
  })

  it('classifyEdges', () => {
    const graph_1 = new GraphViaAdjList()
    const edges_1_1 = graph_1.classifyEdges()
    expect(edges_1_1).toEqual({})

    graph_1.addVertex('A')
    graph_1.addVertex('B')
    const edges_1_2 = graph_1.classifyEdges()
    expect(edges_1_2).toEqual({})

    graph_1.addEdge('A', 'B')
    const edges_1_3 = graph_1.classifyEdges()
    expect(edges_1_3).toEqual({ 'A->B': 'tree' })

    graph_1.addVertex('C')
    graph_1.addVertex('D')
    graph_1.addEdge('B', 'C')
    graph_1.addEdge('C', 'A')
    graph_1.addEdge('A', 'D')
    graph_1.addEdge('B', 'D')
    graph_1.addEdge('D', 'C')
    const edges_1_4 = graph_1.classifyEdges()
    expect(Object.keys(edges_1_4).length).toBe(6)
    expect(edges_1_4['A->B']).toBe('tree')
    expect(edges_1_4['B->C']).toBe('tree')
    expect(edges_1_4['B->D']).toBe('tree')
    expect(edges_1_4['C->A']).toBe('back')
    expect(edges_1_4['A->D']).toBe('forward')
    expect(edges_1_4['D->C']).toBe('cross')

    // picture of this graph is in '../../images/dfs.png'
    const graph_2 = new GraphViaAdjList()
    graph_2.addVertex('a')
    graph_2.addVertex('b')
    graph_2.addVertex('c')
    graph_2.addVertex('d')
    graph_2.addVertex('e')
    graph_2.addVertex('f')
    //
    graph_2.addEdge('a', 'b')
    graph_2.addEdge('a', 'd')
    graph_2.addEdge('b', 'e')
    graph_2.addEdge('c', 'f')
    graph_2.addEdge('c', 'e')
    graph_2.addEdge('d', 'b')
    graph_2.addEdge('e', 'd')
    graph_2.addEdge('f', 'f')

    const edges_2 = graph_2.classifyEdges()
    expect(Object.keys(edges_2).length).toBe(8)
    expect(edges_2['a->b']).toBe('tree')
    expect(edges_2['b->e']).toBe('tree')
    expect(edges_2['e->d']).toBe('tree')
    expect(edges_2['d->b']).toBe('back')
    expect(edges_2['a->d']).toBe('forward')
    expect(edges_2['c->f']).toBe('tree')
    expect(edges_2['f->f']).toBe('back')
    expect(edges_2['c->e']).toBe('cross')
  })
})
