const { cycle } = require('./utils'); // cycle, union 함수는 유틸리티에서 가져온다고 가정

function makeDriver(name, route, rumors) {
  return {
    name,
    routeArray: route,
    route: cycle(route),
    rumors: new Set(rumors),
    currentIndex: 0
  };
}

function moveDriver(driver) {
  const nextIndex = (driver.currentIndex + 1) % driver.routeArray.length;
  return {
    ...driver,
    currentIndex: nextIndex
  };
}

function moveDrivers(world) {
  return world.map(moveDriver);
}

function getStops(world) {
  const stops = {};
  for (const driver of world) {
    const stop = driver.routeArray[driver.currentIndex];
    if (!stops[stop]) {
      stops[stop] = [];
    }
    stops[stop].push(driver);
  }
  return stops;
}

function mergeRumors(drivers) {
  const allRumors = new Set(drivers.flatMap(driver => [...driver.rumors]));
  return drivers.map(driver => ({
    ...driver,
    rumors: allRumors
  }));
}

function spreadRumors(world) {
  const stopsWithDrivers = getStops(world);
  return Object.values(stopsWithDrivers).flatMap(mergeRumors);
}

function drive(world) {
  return spreadRumors(moveDrivers(world));
}

function driveTillAllRumorsSpread(world) {
  let time = 1;

  while (time <= 480) {
    world = drive(world);

    // 모든 드라이버의 루머가 동일한지 확인
    const firstDriverRumors = Array.from(world[0].rumors);
    const allRumorsEqual = world.every(driver => {
      const driverRumors = Array.from(driver.rumors);
      return driverRumors.length === firstDriverRumors.length &&
             driverRumors.every(rumor => firstDriverRumors.includes(rumor));
    });

    if (allRumorsEqual) {
      return time;
    }

    time++;
  }

  return 'never';
}




module.exports = {
  makeDriver,
  moveDriver,
  moveDrivers,
  getStops,
  mergeRumors,
  spreadRumors,
  drive,
  driveTillAllRumorsSpread
};