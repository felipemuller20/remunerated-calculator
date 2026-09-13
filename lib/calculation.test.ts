import { describe, expect, it } from "vitest";
import { calculateBathroomEarnings } from "@/lib/calculation";

describe("calculateBathroomEarnings", () => {
  it("calcula os valores diário, semanal e mensal com a base definida", () => {
    expect(
      calculateBathroomEarnings({
        monthlySalary: 3520,
        visitsPerWorkday: 2,
        minutesPerVisit: 15,
      }),
    ).toEqual({ daily: 10, weekly: 50, monthly: 220 });
  });

  it("retorna zero quando qualquer fator de tempo ou salário é zero", () => {
    expect(
      calculateBathroomEarnings({
        monthlySalary: 0,
        visitsPerWorkday: 2,
        minutesPerVisit: 15,
      }),
    ).toEqual({ daily: 0, weekly: 0, monthly: 0 });

    expect(
      calculateBathroomEarnings({
        monthlySalary: 3520,
        visitsPerWorkday: 0,
        minutesPerVisit: 15,
      }),
    ).toEqual({ daily: 0, weekly: 0, monthly: 0 });
  });

  it.each([
    { monthlySalary: -1, visitsPerWorkday: 1, minutesPerVisit: 1 },
    { monthlySalary: Number.NaN, visitsPerWorkday: 1, minutesPerVisit: 1 },
    { monthlySalary: 1000, visitsPerWorkday: -1, minutesPerVisit: 1 },
    { monthlySalary: 1000, visitsPerWorkday: 1.5, minutesPerVisit: 1 },
    { monthlySalary: 1000, visitsPerWorkday: 1, minutesPerVisit: -1 },
    { monthlySalary: 1000, visitsPerWorkday: 1, minutesPerVisit: 1.5 },
  ])("rejeita entradas fora das regras: %o", (input) => {
    expect(() => calculateBathroomEarnings(input)).toThrow(RangeError);
  });
});
