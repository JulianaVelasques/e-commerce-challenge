export interface Transaction {
  id: string;
  status: 'authorized' | 'failed';
  amount: number;
  customer: {
    firstName: string;
    lastName: string;
    document: {
      type: 'cpf' | 'cnpj';
      number: string;
    };
    address: {
      city: string;
      street: string;
      number: string;
      country: string;
      state: string;
      neighborhood: string;
    };
  };
  items: { name: string; quantity: number; amount: number }[];
  paymentMethod: {
    type: 'card';
    card: {
      firstDigits: string;
      lastDigits: string;
      holderName: string;
      expirationDate: string; // formato DD/YYYY
      installments: number;
    };
  };
}
