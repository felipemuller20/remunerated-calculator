"use client";

import { useState, type FormEvent } from "react";
import {
  calculateBathroomEarnings,
  type CalculationInput,
  type CalculationResult,
} from "@/lib/calculation";

type FormValues = {
  monthlySalary: string;
  visitsPerWorkday: string;
  minutesPerVisit: string;
};

type FieldErrors = Partial<Record<keyof FormValues, string>>;

const initialValues: FormValues = {
  monthlySalary: "",
  visitsPerWorkday: "",
  minutesPerVisit: "",
};

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
});

function validateForm(values: FormValues): {
  input: CalculationInput | null;
  errors: FieldErrors;
} {
  const errors: FieldErrors = {};

  const monthlySalary = Number(values.monthlySalary);
  const visitsPerWorkday = Number(values.visitsPerWorkday);
  const minutesPerVisit = Number(values.minutesPerVisit);

  if (values.monthlySalary.trim() === "") {
    errors.monthlySalary = "Informe seu salário mensal.";
  } else if (!Number.isFinite(monthlySalary) || monthlySalary < 0) {
    errors.monthlySalary = "Use um valor igual ou maior que zero.";
  }

  if (values.visitsPerWorkday.trim() === "") {
    errors.visitsPerWorkday = "Informe quantas vezes você vai ao banheiro.";
  } else if (!Number.isInteger(visitsPerWorkday) || visitsPerWorkday < 0) {
    errors.visitsPerWorkday = "Use um número inteiro igual ou maior que zero.";
  }

  if (values.minutesPerVisit.trim() === "") {
    errors.minutesPerVisit = "Informe quantos minutos dura cada ida.";
  } else if (!Number.isInteger(minutesPerVisit) || minutesPerVisit < 0) {
    errors.minutesPerVisit = "Use um número inteiro igual ou maior que zero.";
  }

  if (Object.keys(errors).length > 0) {
    return { input: null, errors };
  }

  return {
    input: { monthlySalary, visitsPerWorkday, minutesPerVisit },
    errors,
  };
}

export default function Calculator() {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  function handleChange(field: keyof FormValues, value: string) {
    const nextValues = { ...values, [field]: value };
    setValues(nextValues);
    setResult(null);

    if (hasSubmitted) {
      setErrors(validateForm(nextValues).errors);
    }
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setHasSubmitted(true);

    const validation = validateForm(values);
    setErrors(validation.errors);

    if (validation.input) {
      setResult(calculateBathroomEarnings(validation.input));
    } else {
      setResult(null);
    }
  }

  return (
    <section className="calculator-card" aria-labelledby="calculator-heading">
      <div className="card-heading">
        <div>
          <p className="section-kicker">Faça as contas</p>
          <h2 id="calculator-heading">Seu expediente no trono</h2>
        </div>
        <span className="stamp" aria-hidden="true">
          $$$
        </span>
      </div>

      <form className="calculator-form" noValidate onSubmit={handleSubmit}>
        <div className="field-group">
          <label htmlFor="monthly-salary">Qual é o seu salário mensal?</label>
          <div className="input-with-prefix">
            <span aria-hidden="true">R$</span>
            <input
              id="monthly-salary"
              name="monthlySalary"
              type="number"
              min="0"
              step="0.01"
              inputMode="decimal"
              placeholder="Ex.: 3.500,00"
              value={values.monthlySalary}
              aria-invalid={Boolean(errors.monthlySalary)}
              aria-describedby={`salary-hint${errors.monthlySalary ? " salary-error" : ""}`}
              onChange={(event) => handleChange("monthlySalary", event.target.value)}
            />
          </div>
          <p className="field-hint" id="salary-hint">
            Pode ser bruto ou líquido — você escolhe.
          </p>
          {errors.monthlySalary && (
            <p className="field-error" id="salary-error" role="alert">
              {errors.monthlySalary}
            </p>
          )}
        </div>

        <div className="field-row">
          <div className="field-group">
            <label htmlFor="visits-per-day">Idas ao banheiro por dia</label>
            <input
              id="visits-per-day"
              name="visitsPerWorkday"
              type="number"
              min="0"
              step="1"
              inputMode="numeric"
              placeholder="Ex.: 3"
              value={values.visitsPerWorkday}
              aria-invalid={Boolean(errors.visitsPerWorkday)}
              aria-describedby={errors.visitsPerWorkday ? "visits-error" : undefined}
              onChange={(event) => handleChange("visitsPerWorkday", event.target.value)}
            />
            {errors.visitsPerWorkday && (
              <p className="field-error" id="visits-error" role="alert">
                {errors.visitsPerWorkday}
              </p>
            )}
          </div>

          <div className="field-group">
            <label htmlFor="minutes-per-visit">Minutos por ida</label>
            <div className="input-with-suffix">
              <input
                id="minutes-per-visit"
                name="minutesPerVisit"
                type="number"
                min="0"
                step="1"
                inputMode="numeric"
                placeholder="Ex.: 10"
                value={values.minutesPerVisit}
                aria-invalid={Boolean(errors.minutesPerVisit)}
                aria-describedby={errors.minutesPerVisit ? "minutes-error" : undefined}
                onChange={(event) => handleChange("minutesPerVisit", event.target.value)}
              />
              <span aria-hidden="true">min</span>
            </div>
            {errors.minutesPerVisit && (
              <p className="field-error" id="minutes-error" role="alert">
                {errors.minutesPerVisit}
              </p>
            )}
          </div>
        </div>

        <button className="calculate-button" type="submit">
          Calcular minha cagada <span aria-hidden="true">↗</span>
        </button>
      </form>

      {result && (
        <section className="results" aria-labelledby="results-heading" aria-live="polite">
          <div className="results-heading">
            <div>
              <p className="section-kicker">Olha só</p>
              <h2 id="results-heading">Seu tempo vale dinheiro</h2>
            </div>
            <span className="results-emoji" aria-hidden="true">
              🧻
            </span>
          </div>

          <div className="result-grid">
            <ResultCard label="Por dia" value={result.daily} />
            <ResultCard label="Por semana" value={result.weekly} />
            <ResultCard label="Por mês" value={result.monthly} featured />
          </div>

          <p className="calculation-note">
            Estimativa baseada em 8h por dia, 5 dias úteis por semana e 22 dias úteis por mês.
          </p>
        </section>
      )}
    </section>
  );
}

function ResultCard({
  label,
  value,
  featured = false,
}: {
  label: string;
  value: number;
  featured?: boolean;
}) {
  return (
    <article className={`result-card${featured ? " result-card-featured" : ""}`}>
      <p>{label}</p>
      <strong data-testid={`result-${label.toLowerCase().replace(" ", "-")}`}>
        {currencyFormatter.format(value)}
      </strong>
      {featured && <span>O seu extra secreto</span>}
    </article>
  );
}
