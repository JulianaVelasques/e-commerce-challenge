'use client';

import { useState } from 'react';
import { FormData, FormSchema, checkoutSchema } from '@/utils/validations/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '@/components/formField';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Checkout() {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(checkoutSchema), // integração com o zod
  });

  const formData = watch();
  const documentType = watch('documentType'); // Pega o tipo selecionado pelo usuário

  const isStepComplete = (currentStep: number) => {
    switch (currentStep) {
      case 1:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.documentType &&
          formData.documentNumber
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
    setStep(step + 1);
  };

  // Envia os dados para a API mock
  const onSubmitForm: SubmitHandler<FormSchema> = async (
    formData: FormData
  ) => {
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
            // installments: formData.installments,
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
          <form onSubmit={handleSubmit(onSubmitForm)}>
            {/* Identificação */}
            <div
              className={`py-3 ${step === 1 ? 'opacity-100' : 'opacity-40'}`}
            >
              <button className='font-semibold' onClick={() => setStep(1)}>
                Identificação
              </button>
              {step === 1 && (
                <div className='mt-2 space-y-2'>
                  <div className='flex'>
                    <FormField
                      type='text'
                      placeholder='Nome'
                      name='firstName'
                      register={register}
                      error={errors.firstName}
                    />

                    <FormField
                      type='text'
                      placeholder='Sobrenome'
                      name='lastName'
                      register={register}
                      error={errors.lastName}
                    />
                  </div>

                  <div>
                    <label htmlFor='documentType' className='block font-medium'>
                      Documento:
                    </label>
                    <div className='flex items-center gap-4 mt-1'>
                      <label className='flex items-center'>
                        <input
                          type='radio'
                          value='cpf'
                          {...register('documentType')}
                          className='mr-1'
                        />
                        CPF
                      </label>
                      <label className='flex items-center'>
                        <input
                          type='radio'
                          value='cnpj'
                          {...register('documentType')}
                          className='mr-1'
                        />
                        CNPJ
                      </label>
                    </div>

                    <FormField
                      type='text'
                      placeholder={documentType === 'cnpj' ? 'CNPJ' : 'CPF'}
                      name='documentNumber'
                      register={register}
                      error={errors.documentNumber}
                      mask={documentType === 'cnpj' ? 'cnpj' : 'cpf'}
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
            <div
              className={`py-3 ${step === 2 ? 'opacity-100' : 'opacity-40'}`}
            >
              <button className='font-semibold' onClick={() => setStep(2)}>
                Endereço
              </button>
              {step === 2 && (
                <div className='mt-2 space-y-2'>
                  <FormField
                    type='text'
                    placeholder='Rua'
                    name='street'
                    register={register}
                    error={errors.street}
                  />

                  <FormField
                    type='text'
                    placeholder='Número'
                    name='number'
                    register={register}
                    error={errors.number}
                  />

                  <FormField
                    type='text'
                    placeholder='Bairro'
                    name='neighborhood'
                    register={register}
                    error={errors.neighborhood}
                  />

                  <FormField
                    type='text'
                    placeholder='Cidade'
                    name='city'
                    register={register}
                    error={errors.city}
                  />

                  <FormField
                    type='text'
                    placeholder='País'
                    name='country'
                    register={register}
                    error={errors.country}
                  />

                  <FormField
                    type='text'
                    placeholder='Estado'
                    name='state'
                    register={register}
                    error={errors.state}
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
            <div
              className={`py-3 ${step === 3 ? 'opacity-100' : 'opacity-40'}`}
            >
              <button className='font-semibold' onClick={() => setStep(3)}>
                Pagamentos
              </button>
              {step === 3 && (
                <div className='mt-2 space-y-2'>
                  <FormField
                    type='text'
                    placeholder='Número do cartão'
                    name='cardNumber'
                    register={register}
                    mask='creditCard'
                    error={errors.cardNumber}
                  />

                  <FormField
                    type='text'
                    placeholder='Nome do Cartão'
                    name='cardHolder'
                    register={register}
                    error={errors.cardHolder}
                  />

                  <FormField
                    type='text'
                    placeholder='CVV'
                    name='cvv'
                    register={register}
                    error={errors.cvv}
                  />

                  <FormField
                    type='text'
                    placeholder='MM/YYYY'
                    name='expirationDate'
                    register={register}
                    mask='expirationDate'
                    error={errors.expirationDate}
                  />

                  {/* Falta um select para o intallments */}

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
            <div
              className={`py-3 ${step === 4 ? 'opacity-100' : 'opacity-40'}`}
            >
              <button className='font-semibold' onClick={() => setStep(4)}>
                Revisão do pedido
              </button>
              {step === 4 && (
                <div className='mt-4'>
                  <h2 className='text-lg font-semibold'>Revisão de Pedido</h2>
                  <pre className='bg-gray-100 p-2 rounded'>
                    {JSON.stringify(watch(), null, 2)}
                  </pre>
                  <button
                    type='submit'
                    className='bg-green-500 text-white p-2 mt-2 rounded'
                  >
                    Confirmar Pedido
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>

        <div>
          <h2 className='font-bold'>Na sua sacola</h2>
        </div>
      </div>
    </div>
  );
}
