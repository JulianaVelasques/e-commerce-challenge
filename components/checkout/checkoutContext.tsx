import { createContext, useContext, useState } from 'react';

interface CheckoutContextProps {
  products: Product[];
  shipping: number;
  subtotal: number;
  total: number;
  step: number;
  setStep: (step: number) => void;
  handleNext: () => void;
}

interface Product {
  name: string;
  quantity: number;
  amount: number;
}

const products: Product[] = [
  {
    name: 'Super produto',
    quantity: 1,
    amount: 200,
  },
  {
    name: 'Produto bom',
    quantity: 2,
    amount: 100,
  },
];

const CheckoutContext = createContext<CheckoutContextProps | undefined>(
  undefined
);

export function CheckoutProvider({ children }: { children: React.ReactNode }) {
  const [step, setStep] = useState(1);
  const handleNext = () => setStep((prev) => prev + 1);

  const subtotal = products.reduce(
    (acc, product) => acc + product.quantity * product.amount,
    0
  );
  const shipping = 15;
  const total = subtotal + shipping;

  return (
    <CheckoutContext.Provider
      value={{ products, subtotal, shipping, total, step, setStep, handleNext }}
    >
      {children}
    </CheckoutContext.Provider>
  );
}

// Forçar o uso correto do contexto
export function useCheckout() {
  const context = useContext(CheckoutContext);
  if (!context)
    throw new Error('useCheckout must be used within a CheckoutProvider');
  return context;
}
