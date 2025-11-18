import { CellType, tick } from './wator';

describe("Wator tick multimethod", () => {

  afterEach(() => {
    // Math.random mock을 초기화
    jest.restoreAllMocks();
  });

  test("WATER usually remains WATER", () => {
    // Math.random() = 0.0 -> evolve하지 않음
    jest.spyOn(Math, "random").mockReturnValue(0.0);

    const result = tick.call({ cell: CellType.WATER });

    expect(result.cell).toBe(CellType.WATER);
  });

  test("WATER occasionally becomes FISH", () => {
    // Math.random() = 1.0 -> fish로 evlove 함
    jest.spyOn(Math, "random").mockReturnValue(1.0);

    const result = tick.call({ cell: CellType.WATER });

    expect(result.cell).toBe(CellType.FISH);
  });
});
