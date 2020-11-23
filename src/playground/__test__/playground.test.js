import ResizableArray from '../playground';

describe('ResizableArray', () => {
  it('should create empty array', () => {
    const resArr = new ResizableArray();
    expect(resArr).not.toBe(null);
    expect(resArr.getSize()).toBe(0);
    expect(resArr.getCapacity()).toBe(16);
  });

  it('should double capacity when array is full', () => {
    const resArr = new ResizableArray();
    expect(resArr.getCapacity()).toBe(16);

    for (let i = 0; i < 15; i++) {
      resArr.push(i + 1);
    }

    expect(resArr.getCapacity()).toBe(16);
    resArr.push(16);
    expect(resArr.getCapacity()).toBe(32);
  });

  it('should shrink capacity if too few elements in array', () => {
    const resArr = new ResizableArray();
    expect(resArr.getCapacity()).toBe(16);

    for (let i = 0; i < 16; i++) {
      resArr.push(i + 1);
    }
    expect(resArr.getCapacity()).toBe(32);

    for (let i = 0; i < 7; i++) {
      resArr.pop();
    }
    expect(resArr.getCapacity()).toBe(32);

    resArr.pop();
    expect(resArr.getCapacity()).toBe(16);

    // should not resize lower than initialCapacity (16 items)
    //
    for (let i = 0; i < 8; i++) {
      resArr.pop();
    }
    expect(resArr.getCapacity()).toBe(16);

    expect(() => resArr.pop()).toThrow('array is empty');
  });

  it('getSize', () => {
    const resArr = new ResizableArray();
    expect(resArr.getSize()).toBe(0);

    resArr.push(1);
    expect(resArr.getSize()).toBe(1);

    resArr.push(2);
    resArr.push(3);
    expect(resArr.getSize()).toBe(3);
  });

  it('getCapacity', () => {
    const resArr = new ResizableArray();
    expect(resArr.getCapacity()).toBe(16);
  });

  it('isEmpty', () => {
    const resArr = new ResizableArray();
    expect(resArr.isEmpty()).toBe(true);

    resArr.push(1);
    expect(resArr.isEmpty()).toBe(false);

    resArr.pop();
    expect(resArr.isEmpty()).toBe(true);
  });

  it('at', () => {
    const resArr = new ResizableArray();
    resArr.push(1);
    resArr.push(2);
    resArr.push(3);

    expect(resArr.at(0)).toBe(1);
    expect(resArr.at(1)).toBe(2);
    expect(resArr.at(2)).toBe(3);

    expect(() => resArr.at(-1)).toThrow('index is out of bounds');
    expect(() => resArr.at(3)).toThrow('index is out of bounds');
  });

  it('push', () => {
    const resArr = new ResizableArray();

    resArr.push(1);
    expect(resArr.toString()).toBe('1');

    resArr.push(2);
    resArr.push(3);
    expect(resArr.toString()).toBe('1,2,3');
  });

  it('insert', () => {
    const resArr = new ResizableArray();
    resArr.push(1);
    resArr.push(2);
    resArr.push(3);

    expect(() => resArr.at(-1)).toThrow('index is out of bounds');
    expect(() => resArr.at(3)).toThrow('index is out of bounds');

    resArr.insert(0, 0.5);
    expect(resArr.toString()).toBe('0.5,1,2,3');

    resArr.insert(2, 1.5);
    expect(resArr.toString()).toBe('0.5,1,1.5,2,3');

    resArr.insert(5, 3.5);
    expect(resArr.toString()).toBe('0.5,1,1.5,2,3,3.5');
  });

  it('prepend', () => {
    const resArr = new ResizableArray();

    resArr.prepend(1);
    expect(resArr.toString()).toBe('1');

    resArr.prepend(2);
    expect(resArr.toString()).toBe('2,1');

    resArr.prepend(3);
    expect(resArr.toString()).toBe('3,2,1');
  });

  it('pop', () => {
    const resArr = new ResizableArray();
    expect(() => resArr.pop()).toThrow('array is empty');

    resArr.push(1);
    resArr.push(2);
    resArr.push(3);

    const res1 = resArr.pop();
    expect(res1).toBe(3);
    const res2 = resArr.pop();
    expect(res2).toBe(2);
    const res3 = resArr.pop();
    expect(res3).toBe(1);

    expect(() => resArr.pop()).toThrow('array is empty');
  });

  it('delete', () => {
    const resArr = new ResizableArray();
    expect(() => resArr.delete(0)).toThrow('array is empty');

    resArr.push(1);
    resArr.push(2);
    resArr.push(3);

    resArr.delete(0);
    expect(resArr.toString()).toBe('2,3');

    resArr.delete(1);
    expect(resArr.toString()).toBe('2');

    resArr.delete(0);
    expect(resArr.toString()).toBe('');

    expect(() => resArr.delete(0)).toThrow('array is empty');
  });

  it('remove', () => {
    const resArr = new ResizableArray();
    resArr.push(1);
    resArr.push(2);
    resArr.push(2);
    resArr.push(3);
    resArr.push(2);

    resArr.remove(1);
    expect(resArr.toString()).toBe('2,2,3,2');

    resArr.remove(2);
    expect(resArr.toString()).toBe('3');

    resArr.remove(3);
    expect(resArr.toString()).toBe('');
  });

  it('find', () => {
    const resArr = new ResizableArray();
    resArr.push(1);
    resArr.push(2);
    resArr.push(3);

    expect(resArr.find(2)).toBe(1);
    expect(resArr.find(4)).toBe(-1);
  });
});
