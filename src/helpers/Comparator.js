export default class Comparator {
  constructor(compareFn = Comparator.defaultCompareFn) {
    this._compareFn = compareFn
  }

  static defaultCompareFn(a, b) {
    if (a === b) {
      return 0
    }
    return a < b ? -1 : 1
  }

  eq(a, b) {
    return this._compareFn(a, b) === 0
  }

  gt(a, b) {
    return this._compareFn(a, b) === 1
  }

  lt(a, b) {
    return this._compareFn(a, b) === -1
  }

  gte(a, b) {
    return this.gt(a, b) || this.eq(a, b)
  }

  lte(a, b) {
    return this.lt(a, b) || this.eq(a, b)
  }
}
