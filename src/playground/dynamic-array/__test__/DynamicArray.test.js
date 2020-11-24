import DynamicArray from '../DynamicArray';

describe('DynamicArray', () => {
  it('should create empty array', () => {
    const dynArr = new DynamicArray();
    expect(dynArr).not.toBe(null);
    expect(dynArr.getSize()).toBe(0);
    expect(dynArr.getCapacity()).toBe(16);
  });

  it('should double capacity when array is full', () => {
    const dynArr = new DynamicArray();
    expect(dynArr.getCapacity()).toBe(16);

    for (let i = 0; i < 15; i++) {
      dynArr.push(i + 1);
    }

    expect(dynArr.getCapacity()).toBe(16);
    dynArr.push(16);
    expect(dynArr.getCapacity()).toBe(32);
  });

  it('should shrink capacity if too few elements in array', () => {
    const dynArr = new DynamicArray();
    expect(dynArr.getCapacity()).toBe(16);

    for (let i = 0; i < 16; i++) {
      dynArr.push(i + 1);
    }
    expect(dynArr.getCapacity()).toBe(32);

    for (let i = 0; i < 7; i++) {
      dynArr.pop();
    }
    expect(dynArr.getCapacity()).toBe(32);

    dynArr.pop();
    expect(dynArr.getCapacity()).toBe(16);

    // should not resize lower than initialCapacity (16 items)
    //
    for (let i = 0; i < 8; i++) {
      dynArr.pop();
    }
    expect(dynArr.getCapacity()).toBe(16);

    expect(() => dynArr.pop()).toThrow('array is empty');
  });

  it('getSize', () => {
    const dynArr = new DynamicArray();
    expect(dynArr.getSize()).toBe(0);

    dynArr.push(1);
    expect(dynArr.getSize()).toBe(1);

    dynArr.push(2);
    dynArr.push(3);
    expect(dynArr.getSize()).toBe(3);
  });

  it('getCapacity', () => {
    const dynArr = new DynamicArray();
    expect(dynArr.getCapacity()).toBe(16);
  });

  it('isEmpty', () => {
    const dynArr = new DynamicArray();
    expect(dynArr.isEmpty()).toBe(true);

    dynArr.push(1);
    expect(dynArr.isEmpty()).toBe(false);

    dynArr.pop();
    expect(dynArr.isEmpty()).toBe(true);
  });

  it('at', () => {
    const dynArr = new DynamicArray();
    dynArr.push(1);
    dynArr.push(2);
    dynArr.push(3);

    expect(dynArr.at(0)).toBe(1);
    expect(dynArr.at(1)).toBe(2);
    expect(dynArr.at(2)).toBe(3);

    expect(() => dynArr.at(-1)).toThrow('index is out of bounds');
    expect(() => dynArr.at(3)).toThrow('index is out of bounds');
  });

  it('push', () => {
    const dynArr = new DynamicArray();

    dynArr.push(1);
    expect(dynArr.toString()).toBe('1');

    dynArr.push(2);
    dynArr.push(3);
    expect(dynArr.toString()).toBe('1,2,3');
  });

  it('insert', () => {
    const dynArr = new DynamicArray();
    dynArr.push(1);
    dynArr.push(2);
    dynArr.push(3);

    expect(() => dynArr.at(-1)).toThrow('index is out of bounds');
    expect(() => dynArr.at(3)).toThrow('index is out of bounds');

    dynArr.insert(0, 0.5);
    expect(dynArr.toString()).toBe('0.5,1,2,3');

    dynArr.insert(2, 1.5);
    expect(dynArr.toString()).toBe('0.5,1,1.5,2,3');

    dynArr.insert(5, 3.5);
    expect(dynArr.toString()).toBe('0.5,1,1.5,2,3,3.5');
  });

  it('prepend', () => {
    const dynArr = new DynamicArray();

    dynArr.prepend(1);
    expect(dynArr.toString()).toBe('1');

    dynArr.prepend(2);
    expect(dynArr.toString()).toBe('2,1');

    dynArr.prepend(3);
    expect(dynArr.toString()).toBe('3,2,1');
  });

  it('pop', () => {
    const dynArr = new DynamicArray();
    expect(() => dynArr.pop()).toThrow('array is empty');

    dynArr.push(1);
    dynArr.push(2);
    dynArr.push(3);

    const res1 = dynArr.pop();
    expect(res1).toBe(3);
    const res2 = dynArr.pop();
    expect(res2).toBe(2);
    const res3 = dynArr.pop();
    expect(res3).toBe(1);

    expect(() => dynArr.pop()).toThrow('array is empty');
  });

  it('delete', () => {
    const dynArr = new DynamicArray();
    expect(() => dynArr.delete(0)).toThrow('array is empty');

    dynArr.push(1);
    dynArr.push(2);
    dynArr.push(3);

    dynArr.delete(0);
    expect(dynArr.toString()).toBe('2,3');

    dynArr.delete(1);
    expect(dynArr.toString()).toBe('2');

    dynArr.delete(0);
    expect(dynArr.toString()).toBe('');

    expect(() => dynArr.delete(0)).toThrow('array is empty');
  });

  it('remove', () => {
    const dynArr = new DynamicArray();
    dynArr.push(1);
    dynArr.push(2);
    dynArr.push(2);
    dynArr.push(3);
    dynArr.push(2);

    dynArr.remove(1);
    expect(dynArr.toString()).toBe('2,2,3,2');

    dynArr.remove(2);
    expect(dynArr.toString()).toBe('3');

    dynArr.remove(3);
    expect(dynArr.toString()).toBe('');
  });

  it('find', () => {
    const dynArr = new DynamicArray();
    dynArr.push(1);
    dynArr.push(2);
    dynArr.push(3);

    expect(dynArr.find(2)).toBe(1);
    expect(dynArr.find(4)).toBe(-1);
  });
});
