export type CalculationInput = {
  monthlySalary: number;
  visitsPerWorkday: number;
  minutesPerVisit: number;
};

export type CalculationResult = {
  daily: number;
  weekly: number;
  monthly: number;
};

export const WORKDAYS_PER_WEEK = 5;
export const WORKDAYS_PER_MONTH = 22;
export const WORK_HOURS_PER_DAY = 8;
const MINUTES_PER_HOUR = 60;

export function calculateBathroomEarnings({
  monthlySalary,
  visitsPerWorkday,
  minutesPerVisit,
}: CalculationInput): CalculationResult {
  if (!Number.isFinite(monthlySalary) || monthlySalary < 0) {
    throw new RangeError("O salário mensal precisa ser um número válido e não negativo.");
  }

  if (!Number.isInteger(visitsPerWorkday) || visitsPerWorkday < 0) {
    throw new RangeError("As idas por dia precisam ser um número inteiro não negativo.");
  }

  if (!Number.isInteger(minutesPerVisit) || minutesPerVisit < 0) {
    throw new RangeError("Os minutos por ida precisam ser um número inteiro não negativo.");
  }

  const monthlyMinutesWorked =
    WORKDAYS_PER_MONTH * WORK_HOURS_PER_DAY * MINUTES_PER_HOUR;
  const bathroomMinutesPerDay = visitsPerWorkday * minutesPerVisit;
  const valuePerMinute = monthlySalary / monthlyMinutesWorked;
  const daily = bathroomMinutesPerDay * valuePerMinute;

  return {
    daily,
    weekly: daily * WORKDAYS_PER_WEEK,
    monthly: daily * WORKDAYS_PER_MONTH,
  };
}
