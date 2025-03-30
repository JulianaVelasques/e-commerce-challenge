'use client';

import { FormData, FormSchema } from '@/utils/validations/form';
import { SubmitHandler } from 'react-hook-form';
import CheckoutCart from '@/components/checkout/checkoutListItems';
import CheckoutForm from '@/components/checkout/checkoutForm';
import { useState } from 'react';
import Alert from '@/components/alerts';

export default function Checkout() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Envia os dados para a API mock
  const handleCheckoutSubmit: SubmitHandler<FormSchema> = async (
    formData: FormData
  ) => {
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: 100, // Simulação
          customer: {
            firstName: formData.firstName,
            lastName: formData.lastName,
            document: {
              type: formData.documentType,
              number: formData.documentNumber,
            },
            address: {
              city: formData.city,
              street: formData.street,
              number: formData.number,
              country: formData.country,
              state: formData.state,
              neighborhood: formData.neighborhood,
            },
          },
          paymentMethod: {
            type: 'card',
            card: {
              number: formData.cardNumber,
              holderName: formData.cardHolder,
              cvv: formData.cvv,
              expirationDate: formData.expirationDate,
              installments: formData.installments,
            },
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao processar o pagamento.');
      }

      const result = await response.json();

      if (result.status == 'failed') {
        setError('Por favor, aguarde um instante e tente novamente.');
      } else {
        setSuccessMessage('Pedido confirmado com sucesso!');
      }

      console.log('Resposta da API:', result);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Algo deu errado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='flex justify-center flex-col px-50 py-10'>
      <h1 className='text-center font-bold text-3xl text-gray-900 sm:text-2xl'>
        Checkout
      </h1>

      <div className='grid grid-cols-4 pt-15'>
        <div className='col-span-3 mr-15 shadow-xl p-5 rounded-xl'>
          <CheckoutForm onSubmit={handleCheckoutSubmit} loading={loading} />
        </div>

        <CheckoutCart />
      </div>

      {/* Alerta no canto inferior direito */}
      {(error || successMessage) && (
        <div className='fixed bottom-5 right-5 w-96 z-50'>
          {error && (
            <Alert
              type='danger'
              title='Ish, ocorreu um problema!'
              message={error}
            />
          )}
          {successMessage && (
            <Alert
              type='success'
              title='Deu tudo certo!'
              message={successMessage}
            />
          )}
        </div>
      )}
    </div>
  );
}
