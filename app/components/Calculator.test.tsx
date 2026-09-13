import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Calculator from "@/app/components/Calculator";

describe("Calculator", () => {
  it("shows validation messages when submitted without values", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.click(screen.getByRole("button", { name: /calcular minha cagada/i }));

    expect(screen.getByText("Informe seu salário mensal.")).toBeInTheDocument();
    expect(screen.getByText("Informe quantas vezes você vai ao banheiro.")).toBeInTheDocument();
    expect(screen.getByText("Informe quantos minutos dura cada ida.")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Seu tempo vale dinheiro" })).not.toBeInTheDocument();
  });

  it("calculates and displays the three periods", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.type(screen.getByLabelText("Qual é o seu salário mensal?"), "3520");
    await user.type(screen.getByLabelText("Idas ao banheiro por dia"), "2");
    await user.type(screen.getByLabelText("Minutos por ida"), "15");
    await user.click(screen.getByRole("button", { name: /calcular minha cagada/i }));

    const results = screen.getByRole("region", { name: "Seu tempo vale dinheiro" });
    expect(within(results).getByTestId("result-por-dia")).toHaveTextContent("10,00");
    expect(within(results).getByTestId("result-por-semana")).toHaveTextContent("50,00");
    expect(within(results).getByTestId("result-por-mês")).toHaveTextContent("220,00");
    expect(within(results).getByText(/8h por dia, 5 dias úteis por semana e 22 dias úteis por mês/i)).toBeInTheDocument();
  });

  it("clears old results as soon as a field is edited", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.type(screen.getByLabelText("Qual é o seu salário mensal?"), "3520");
    await user.type(screen.getByLabelText("Idas ao banheiro por dia"), "2");
    await user.type(screen.getByLabelText("Minutos por ida"), "15");
    await user.click(screen.getByRole("button", { name: /calcular minha cagada/i }));
    expect(screen.getByRole("heading", { name: "Seu tempo vale dinheiro" })).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Minutos por ida"));

    expect(screen.queryByRole("heading", { name: "Seu tempo vale dinheiro" })).not.toBeInTheDocument();
  });

  it("rejects fractional visits and accepts zero values", async () => {
    const user = userEvent.setup();
    render(<Calculator />);

    await user.type(screen.getByLabelText("Qual é o seu salário mensal?"), "0");
    await user.type(screen.getByLabelText("Idas ao banheiro por dia"), "1.5");
    await user.type(screen.getByLabelText("Minutos por ida"), "0");
    await user.click(screen.getByRole("button", { name: /calcular minha cagada/i }));
    expect(screen.getByText("Use um número inteiro igual ou maior que zero.")).toBeInTheDocument();

    await user.clear(screen.getByLabelText("Idas ao banheiro por dia"));
    await user.type(screen.getByLabelText("Idas ao banheiro por dia"), "0");
    await user.click(screen.getByRole("button", { name: /calcular minha cagada/i }));
    expect(screen.getByTestId("result-por-dia")).toHaveTextContent("0,00");
  });
});
