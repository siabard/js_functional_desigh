const {
  makeDriver,
  drive,
  getStops,
  mergeRumors,
  driveTillAllRumorsSpread
} = require('./gossiping');

describe('Gossiping Bus Drivers', () => {
  test('drives one bus at one stop', () => {
    const driver = makeDriver('d1', ['s1'], new Set(['r1']));
    const world = [driver];
    const newWorld = drive(world);

    expect(newWorld.length).toBe(1);
    expect(newWorld[0].routeArray[0]).toBe('s1');
  });

  test('drives one bus at two stops', () => {
    const driver = makeDriver('d1', ['s1', 's2'], new Set(['r1']));
    const world = [driver];
    const newWorld = drive(world);
  
    expect(newWorld.length).toBe(1);
    expect(newWorld[0].routeArray[newWorld[0].currentIndex]).toBe('s2');
  });

  test('drives two buses at some stops', () => {
    const d1 = makeDriver('d1', ['s1', 's2'], new Set(['r1']));
    const d2 = makeDriver('d2', ['s1', 's3', 's2'], new Set(['r2']));
    const world = [d1, d2];
    const newWorld1 = drive(world);
    const newWorld2 = drive(newWorld1);
  
    // 첫 번째 이동
    expect(newWorld1.length).toBe(2);
    expect(newWorld1[0].routeArray[newWorld1[0].currentIndex]).toBe('s2');
    expect(newWorld1[1].routeArray[newWorld1[1].currentIndex]).toBe('s3');
  
    // 두 번째 이동
    expect(newWorld2.length).toBe(2);
    expect(newWorld2[0].routeArray[newWorld2[0].currentIndex]).toBe('s1');
    expect(newWorld2[1].routeArray[newWorld2[1].currentIndex]).toBe('s2');
  });

    
  test('gets stops', () => {
    const drivers = [
      { name: 'd1', routeArray: ['s1'], currentIndex: 0 },
      { name: 'd2', routeArray: ['s1'], currentIndex: 0 },
      { name: 'd3', routeArray: ['s2'], currentIndex: 0 }
    ];
  
    const expected = {
      s1: [
        { name: 'd1', routeArray: ['s1'], currentIndex: 0 },
        { name: 'd2', routeArray: ['s1'], currentIndex: 0 }
      ],
      s2: [{ name: 'd3', routeArray: ['s2'], currentIndex: 0 }]
    };
  
    expect(getStops(drivers)).toEqual(expected);
  });

  test('merges rumors', () => {
    const drivers = [
      { name: 'd1', rumors: new Set(['r1']) },
      { name: 'd2', rumors: new Set(['r2']) }
    ];

    const expected = [
      { name: 'd1', rumors: new Set(['r1', 'r2']) },
      { name: 'd2', rumors: new Set(['r1', 'r2']) }
    ];

    expect(mergeRumors(drivers)).toEqual(expected);
  });

  test('shares gossip when drivers are at same stop', () => {
    const d1 = makeDriver('d1', ['s1', 's2'], new Set(['r1']));
    const d2 = makeDriver('d2', ['s1', 's2'], new Set(['r2']));
    const world = [d1, d2];
    const newWorld = drive(world);

    expect(newWorld.length).toBe(2);
    expect(newWorld[0].rumors).toEqual(new Set(['r1', 'r2']));
    expect(newWorld[1].rumors).toEqual(new Set(['r1', 'r2']));
  });
  test('passes acceptance test 1', () => {
    const world = [
      makeDriver('d1', [3, 1, 2, 3], new Set([1])),
      makeDriver('d2', [3, 2, 3, 1], new Set([2])),
      makeDriver('d3', [4, 2, 3, 4, 5], new Set([3]))
    ];
  
    expect(driveTillAllRumorsSpread(world)).toBe(6);
  });
  
  test('passes acceptance test 2', () => {
  const world = [
    makeDriver('d1', [2, 1, 2], new Set([1])),
    makeDriver('d2', [5, 2, 8], new Set([2]))
  ];

  expect(driveTillAllRumorsSpread(world)).toBe('never');
  });
  
});