export const transactions = [
  {
    id: '123',
    status: 'authorized',
    amount: 1500,
    customer: {
      firstName: 'João',
      lastName: 'Silva',
      document: { type: 'cpf', number: '123.456.789-00' },
      address: {
        city: 'São Paulo',
        street: 'Rua das Flores',
        number: '123',
        country: 'Brasil',
        state: 'SP',
        neighborhood: 'Centro',
      },
    },
    items: [{ name: 'Produto A', quantity: 1, amount: 1500 }],
    paymentMethod: {
      type: 'card',
      card: {
        firstDigits: '1234',
        lastDigits: '5678',
        holderName: 'João Silva',
        expirationDate: '12/2026',
        installments: 3,
      },
    },
  },
  {
    id: '321',
    status: 'failed',
    amount: 550,
    customer: {
      firstName: 'Juliana',
      lastName: 'Silva',
      document: { type: 'cpf', number: '123.456.789-00' },
      address: {
        city: 'São Paulo',
        street: 'Rua das Flores',
        number: '123',
        country: 'Brasil',
        state: 'SP',
        neighborhood: 'Centro',
      },
    },
    items: [
      { name: 'Produto B', quantity: 2, amount: 500 },
      { name: 'Produto C', quantity: 1, amount: 50 },
    ],
    paymentMethod: {
      type: 'card',
      card: {
        firstDigits: '1234',
        lastDigits: '5678',
        holderName: 'Juliana Silva',
        expirationDate: '12/2030',
        installments: 2,
      },
    },
  },
  {
    id: '456',
    status: 'authorized',
    amount: 150,
    customer: {
      firstName: 'Fernando',
      lastName: 'Santos',
      document: { type: 'cpf', number: '123.456.789-00' },
      address: {
        city: 'Curitiba',
        street: 'Rua das Flores',
        number: '123',
        country: 'Brasil',
        state: 'PR',
        neighborhood: 'Centro',
      },
    },
    items: [{ name: 'Produto D', quantity: 1, amount: 150 }],
    paymentMethod: {
      type: 'card',
      card: {
        firstDigits: '1234',
        lastDigits: '5678',
        holderName: 'Fernando Santos',
        expirationDate: '12/2028',
        installments: 1,
      },
    },
  },
];
