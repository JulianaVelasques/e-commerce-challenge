'use client';

import { useState } from 'react';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    documentType: 'cpf',
    documentNumber: '',
    city: '',
    street: '',
    number: '',
    neighborhood: '',
    state: '',
    country: '',
    cardNumber: '',
    cardHolder: '',
    cvv: '',
    expirationDate: '',
    installments: 1,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Verifica se a etapa está completa para liberar o próximo passo
  const isStepComplete = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName && formData.lastName && formData.documentNumber
        );
      case 2:
        return formData.city && formData.street && formData.number;
      case 3:
        return (
          formData.cardNumber &&
          formData.cardHolder &&
          formData.cvv &&
          formData.expirationDate
        );
      default:
        return false;
    }
  };

  // Avança para a próxima etapa
  const handleNext = () => {
    if (isStepComplete(step)) {
      setStep(step + 1);
    }
  };

  // Envia os dados para a API mock
  const handleSubmit = async () => {
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

    const result = await response.json();
    console.log('Transação enviada:', result);
  };

  return (
    <div className='flex justify-center flex-col px-20 py-5'>
      <h1 className='text-center font-bold text-2xl'>Checkout</h1>

      <div className='grid grid-cols-3 pt-3'>
        <div className='col-span-2 pr-3'>
          {/* Identificação */}
          <div className={`py-3 ${step === 1 ? 'opacity-100' : 'opacity-40'}`}>
            <button className='font-semibold' onClick={() => setStep(1)}>
              Identificação
            </button>
            {step === 1 && (
              <div className='mt-2 space-y-2'>
                <div className='flex gap-3'>
                  <input
                    type='text'
                    name='firstName'
                    placeholder='Nome'
                    value={formData.firstName}
                    onChange={handleChange}
                    className='border p-2 w-full'
                  />
                  <input
                    type='text'
                    name='lastName'
                    placeholder='Sobrenome'
                    value={formData.lastName}
                    onChange={handleChange}
                    className='border p-2 w-full'
                  />
                </div>

                <div>
                  <label className='block font-medium'>Documento:</label>
                  <div className='flex items-center gap-4 mt-1'>
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='documentType'
                        value='cpf'
                        checked={formData.documentType === 'cpf'}
                        onChange={handleChange}
                        className='mr-1'
                      />
                      CPF
                    </label>
                    <label className='flex items-center'>
                      <input
                        type='radio'
                        name='documentType'
                        value='cnpj'
                        checked={formData.documentType === 'cnpj'}
                        onChange={handleChange}
                        className='mr-1'
                      />
                      CNPJ
                    </label>
                  </div>
                  <input
                    type='text'
                    name='documentNumber'
                    value={formData.documentNumber}
                    onChange={handleChange}
                    placeholder='Número do documento'
                    className='border p-2 w-full rounded mt-2 '
                  />
                </div>

                <div className='flex justify-end mt-5 mb-2'>
                  <button
                    onClick={handleNext}
                    disabled={!isStepComplete(1)}
                    className='bg-blue-500 text-white p-2 mt-2 rounded disabled:opacity-50'
                  >
                    Salvar e Continuar
                  </button>
                </div>
              </div>
            )}
          </div>
          <hr className='opacity-40' />

          {/* Endereço */}
          <div className={`py-3 ${step === 2 ? 'opacity-100' : 'opacity-40'}`}>
            <button className='font-semibold' onClick={() => setStep(2)}>
              Endereço
            </button>
            {step === 2 && (
              <div className='mt-2 space-y-2'>
                <input
                  type='text'
                  name='street'
                  placeholder='Rua'
                  value={formData.street}
                  onChange={handleChange}
                  className='border p-2 w-full'
                />
                <input
                  type='text'
                  name='number'
                  placeholder='Número'
                  value={formData.number}
                  onChange={handleChange}
                  className='border p-2 w-full'
                />
                <input
                  type='text'
                  name='neighborhood'
                  placeholder='Bairro'
                  value={formData.neighborhood}
                  onChange={handleChange}
                  className='border p-2 w-full'
                />
                <input
                  type='text'
                  name='city'
                  placeholder='Cidade'
                  value={formData.city}
                  onChange={handleChange}
                  className='border p-2 w-full'
                />
                <input
                  type='text'
                  name='state'
                  placeholder='Estado'
                  value={formData.state}
                  onChange={handleChange}
                  className='border p-2 w-full'
                />
                <button
                  onClick={handleNext}
                  disabled={!isStepComplete(2)}
                  className='bg-blue-500 text-white p-2 mt-2 rounded disabled:opacity-50'
                >
                  Salvar e Continuar
                </button>
              </div>
            )}
          </div>

          <hr className='opacity-40' />

          {/* Pagamentos */}
          <div className={`py-3 ${step === 3 ? 'opacity-100' : 'opacity-40'}`}>
            <button className='font-semibold' onClick={() => setStep(3)}>
              Pagamentos
            </button>
            {step === 3 && (
              <div className='mt-2 space-y-2'>
                <input
                  type='text'
                  name='cardNumber'
                  placeholder='Número do Cartão'
                  value={formData.cardNumber}
                  onChange={handleChange}
                  className='border p-2 w-full'
                />
                <input
                  type='text'
                  name='cardHolder'
                  placeholder='Nome no Cartão'
                  value={formData.cardHolder}
                  onChange={handleChange}
                  className='border p-2 w-full'
                />
                <input
                  type='text'
                  name='cvv'
                  placeholder='CVV'
                  value={formData.cvv}
                  onChange={handleChange}
                  className='border p-2 w-full'
                />
                <input
                  type='text'
                  name='expirationDate'
                  placeholder='MM/YYYY'
                  value={formData.expirationDate}
                  onChange={handleChange}
                  className='border p-2 w-full'
                />
                <button
                  onClick={handleNext}
                  disabled={!isStepComplete(3)}
                  className='bg-blue-500 text-white p-2 mt-2 rounded disabled:opacity-50'
                >
                  Salvar e Continuar
                </button>
              </div>
            )}
          </div>

          <hr className='opacity-40' />

          {/* Revisão do pedido */}
          <div className={`py-3 ${step === 2 ? 'opacity-100' : 'opacity-40'}`}>
            <button className='font-semibold' onClick={() => setStep(4)}>
              Revisão do pedido
            </button>
            {step === 4 && (
              <div className='mt-4'>
                <h2 className='text-lg font-semibold'>Revisão de Pedido</h2>
                <pre className='bg-gray-100 p-2 rounded'>
                  {JSON.stringify(formData, null, 2)}
                </pre>
                <button
                  onClick={handleSubmit}
                  className='bg-green-500 text-white p-2 mt-2 rounded'
                >
                  Confirmar Pedido
                </button>
              </div>
            )}
          </div>
        </div>

        <div>
          <h2 className='font-bold'>Na sua sacola</h2>
        </div>
      </div>
    </div>
  );
}
