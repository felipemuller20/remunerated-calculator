import Calculator from "@/app/components/Calculator";

export default function Home() {
  return (
    <main className="page-shell">
      <div className="page-content">
        <header className="hero">
          <div className="hero-icon" aria-hidden="true">
            🚽
          </div>
          <p className="eyebrow">A pausa mais rentável do seu expediente</p>
          <h1>
            Cagada <span>remunerada</span>
          </h1>
          <p className="hero-copy">
            Descubra quanto do seu salário vai direto para o trono. O RH não precisa saber.
          </p>
        </header>

        <Calculator />

        <footer className="page-footer">
          <span aria-hidden="true">✳</span> Uma estimativa de banheiro, sem valor contábil.
        </footer>
      </div>
    </main>
  );
}
