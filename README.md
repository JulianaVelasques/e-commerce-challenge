<h1 align="center"> 🛒 Sistema de Checkout</h1>
<h4 align="center">
  🚀 A frontend system checkout
</h4>

<p align="center">
  
  <img alt="Repository size" src="https://img.shields.io/github/repo-size/JulianaVelasques/e-commerce-challenge">
  
  <a href="https://github.com/JulianaVelasques/e-commerce-challenge/commits/main">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/JulianaVelasques/e-commerce-challenge">
  </a>

  <a href="https://github.com/JulianaVelasques/e-commerce-challenge/issues">
    <img alt="Repository issues" src="https://img.shields.io/github/issues/JulianaVelasques/e-commerce-challenge">
  </a>

  <img alt="License" src="https://img.shields.io/badge/license-MIT-brightgreen">
</p>

<p align="center">
  <a href="#page_with_curl-about">About</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#construction-folder-structure">Folder Structure</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#wrench-built-with">Built With</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-getting-started">Getting Started</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-how-to-contribute">How to Contribute</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#grin-notes">Notes</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#woman_technologist-author">Author</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-license">License</a>
</p>
 
## :page_with_curl: About
O presente é uma solução para o desafio técnico da Malga para a vaga de desenvolvedor frontend.

### The Challenge
O desafio consiste na criação das seguintes páginas para um sistema de Checkout para um e-commerce
gigante no Brasil. As páginas solicitadas são as seguintes:
1. Página de Checkout
2. Página de Listagem de Transação
3. Página de Detalhes de Transação

## :construction: Folder Structure
```bash
├── app/                 # Rotas e páginas (Next.js App Router)
│   ├── api/             # Rotas da API (server-side)
│   │   ├── transactions/
│   │   │   ├── [id]/route.ts
│   │   │   ├── route.ts
│   ├── checkout/        # Páginas relacionadas ao checkout
│   ├── dashboard/       # Páginas do dashboard
├── components/          # Componentes reutilizáveis
│   ├── ui/              # Componentes de UI genéricos
│   ├── checkout/        # Componentes específicos do checkout
│   ├── dashboard/       # Componentes específicos do dashboard
│   ├── icons/           # Componentes com ícones react + tailwind
├── context/checkout/    # Context Providers (ex: CheckoutContext)
├── utils/               # Funções utilitárias (ex: formatação, máscaras, validações)
├── types/               # Definições de tipos (ex: Transaction.ts)
├── mocks/               # Dados mockados para testes
```
## :wrench: Built With
- [Next.js](https://nextjs.org/): Framework React para aplicações web
- [TypeScript](https://www.typescriptlang.org/) – Tipagem estática para JavaScript
- [TailwindCSS](https://tailwindcss.com/) – Estilização rápida e eficiente
- [Zod](https://zod.dev/) + [ReactHookForm](https://www.react-hook-form.com/) – Validação de formulários e dados

## 🚀 Getting Started
- Pré- requisito:
  - Node.js (versão 18 ou superior)
  - PNPM (gerenciador de pacotes)
- Instale as dependência:
```bash
pnpm install
```
- Para iniciar o servidor em modo de desenvolvimento:
```bash
pnpm dev
```
O projeto estará disponível em http://localhost:3000.

## 🤔 How to Contribute

- Clone the project: `git clone git@github.com:JulianaVelasques/e-commerce-challenge.git`;
- Create your branch with your feature: `git checkout -b my-feature`;
- Commit your feature: `git commit -m 'feat: My new feature'`;
- Push to your branch: `git push -u origin my-feature`.

After merging your pull request, you can delete your branch.

## :grin: Notes
### 🧪 Testando o Fluxo da Aplicação

Ao acessar a página inicial, você encontrará um card com dois botões:

- Transactions → Redireciona para a página de transações.

- Checkout → Leva ao processo de finalização de compra.

🏦 Transactions

Nesta página, você verá uma tabela listando as transações registradas. A interface inclui:
- ✔ Paginação para navegar entre diferentes transações.
- ✔ Campo de pesquisa para filtrar transações pelo ID.
- ✔ Detalhamento da transação – Clique no botão "Visualizar" para acessar a página com mais informações sobre a transação selecionada.

🛍 Checkout

A página de checkout conta com um formulário no estilo stepper, permitindo que o usuário preencha os dados de forma progressiva, sem se sentir sobrecarregado. O formulário inclui:
- ✔ Validações e máscaras para garantir a correta inserção dos dados.
- ✔ Simulação de resposta da API → Ao finalizar a compra, a API retorna aleatoriamente um status "Failed" ou "Authorized".
- ✔ Feedback visual → Um alerta aparece no canto superior direito informando o status da transação.

|💡 Dica: Para testar diferentes respostas da API, clique em "Finalizar Compra" mais de uma vez e observe as variações no status da transação.

🐞 Bug conhecido:
- Atualmente, há um problema na validação do campo "documentNumber". A validação definida no .superRefine só é aplicada após a primeira tentativa de envio do formulário. Isso ocorre porque o react-hook-form em conjunto com o Zod apenas executa a validação completa quando o handleSubmit é chamado.
- No caso deste formulário, a validação do documentNumber depende do valor do documentType, pois diferentes tipos de documentos exigem formatos distintos. Como o Zod não permite acessar valores de outros campos diretamente dentro de refine, o uso de .superRefine se tornou necessário para validar ambos os campos juntos. No entanto, isso faz com que a validação mais específica ocorra apenas após a primeira submissão. Se você não colocar os dados corretamente no campo "documentNumber" e tentar enviar, form não irá enviar, então deve voltar no step de "Identificação" e verá que o campo está com erro, após preencher adequadamente, o formulário poderá ser enviado.
- Preciso ajustar isso no futuro, mas por enquanto está aí o 🐞 


## :woman_technologist: Author
- LinkedIn - [Juliana Velasques Balta dos Santos](https://www.linkedin.com/in/julianavelasquesbalta/)
  
## :memo: License

This project is under the MIT license. See the [LICENSE](LICENSE.md) file for more details.

---

Made with ♥ by <tr>
    <td align="center"><a href="https://github.com/JulianaVelasques"><b>Juliana Velasques</b></a><br /></td>
<tr>
