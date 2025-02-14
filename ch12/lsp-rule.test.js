const { makeRect, setW, setH, area, perimeter, minimallyIncreaseArea, makeSquare } = require('./lsp-rule');


describe("Rectangle", () => {
  test("calculates proper area after change in size", () => {
    expect(area(setW(setH(makeRect(1, 1), 3), 4))).toBe(12);
  });

  test("calculates proper area and perimeter", () => {
    expect(area(makeRect(5, 5))).toBe(25);
    expect(perimeter(makeRect(4, 5))).toBe(18);
    expect(area(setW(setH(makeRect(1, 1), 3), 4))).toBe(12);
  });

  test("minimally increases area", () => {
    expect(area(minimallyIncreaseArea(makeRect(3, 4)))).toBe(15);
    expect(area(minimallyIncreaseArea(makeRect(5, 4)))).toBe(24);
    expect(area(minimallyIncreaseArea(makeRect(4, 4)))).toBe(20);
  });

  test("calculates area and perimeter of square", () => {
    expect(area(makeSquare(6))).toBe(36);
    expect(perimeter(makeSquare(5))).toBe(20);
    expect(area(setW( setH( makeSquare(1) ,3), 4))).toBe(12);
    
  });

  test("minimally increases area of square", () => {
    expect(area(minimallyIncreaseArea(makeSquare(5)))).toBe(30);
  });
});