# Cagada remunerada

Calculadora pessoal e bem-humorada que estima quanto do salário corresponde ao tempo no banheiro durante o expediente. A aplicação roda inteiramente no navegador: não tem backend, login, chamadas de rede ou armazenamento dos dados.

## Requisitos

- Node.js 24 LTS (`.nvmrc` aponta para 24.21.0)
- npm

## Desenvolvimento

```bash
nvm install
nvm use
npm install
npm run dev
```

Se você não usa nvm, instale o Node.js 24.21.0 por seu gerenciador de versões preferido antes de instalar as dependências.

Abra <http://localhost:3000>.

## Verificações

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

O build estático é gerado na pasta `out/`.

## Base da estimativa

A calculadora considera uma jornada de 8 horas por dia, 5 dias úteis por semana e 22 dias úteis por mês. O valor por minuto é o salário mensal dividido por `22 × 8 × 60`; o total diário multiplica esse valor pelas idas ao banheiro e pelos minutos de cada ida. Os valores semanal e mensal correspondem a 5 e 22 dias, respectivamente.
