'use client';

import { createContext, useContext, useState } from 'react';

interface CheckoutContextProps {
  products: Product[];
  shipping: number;
  subtotal: number;
  total: number;
  step: number;
  lastCompletedStep: number;
  handleNext: () => void;
  handleEdit: (step: number) => void;
  setStep: (step: number) => void;
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
  const [step, setStep] = useState(0);
  const [lastCompletedStep, setLastCompletedStep] = useState(0);

  const handleNext = () => {
    if (step === lastCompletedStep + 1) {
      setLastCompletedStep(step); // Marca este step como concluído
    }
    setStep(step + 1);
  };

  const handleEdit = (targetStep: number) => {
    if (targetStep <= lastCompletedStep) {
      setStep(targetStep);
    }
  };

  const subtotal = products.reduce(
    (acc, product) => acc + product.quantity * product.amount,
    0
  );
  const shipping = 15;
  const total = subtotal + shipping;

  return (
    <CheckoutContext.Provider
      value={{
        products,
        subtotal,
        shipping,
        total,
        step,
        lastCompletedStep,
        handleNext,
        handleEdit,
        setStep,
      }}
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
