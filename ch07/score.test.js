const score = require('./score');


// Jest를 이용한 테스트 케이스
test("한 핀도 쓰러뜨리지 못하면 0점", () => {
  expect(score(new Array(20).fill(0))).toBe(0);
});

test("20 프레임동안 매 프레임마다 한 핀씩 쓰러뜨리면 20점", () => {
  expect(score(new Array(20).fill(1))).toBe(20);
});

test("첫 프레임에서 5핀 / 5핀 스페어 후 다음 프레임 7핀 공략하면 24점", () => {
  const rolls = [5, 5, 7, ...Array(17).fill(0)];
  expect(score(rolls)).toBe(24);
});


test("원 스트라이트", () => {
  const rolls = [10, 2, 3, ...Array(16).fill(0)];
  expect(score(rolls)).toBe(20);
});

test("퍼펙트 게임", () => {
  const rolls = Array(12).fill(10);
  expect(score(rolls)).toBe(300);
});