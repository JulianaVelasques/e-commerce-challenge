'use client';

import { FormData, FormSchema, checkoutSchema } from '@/utils/validations/form';
import { SubmitHandler, useForm } from 'react-hook-form';
import FormField from '@/components/formField';
import { zodResolver } from '@hookform/resolvers/zod';
import CheckoutCart from '@/components/checkout/checkoutListItems';
import { useCheckout } from '@/components/checkout/checkoutContext';

export default function Checkout() {
  const { step, setStep, handleNext } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(checkoutSchema), // integração com o zod
    mode: 'onBlur',
    defaultValues: {
      documentType: 'cpf',
      installments: 1,
    },
  });

  const formData = watch();
  const documentType = watch('documentType');

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
            installments: formData.installments,
          },
        },
      }),
    });

    const result = await response.json();
    console.log('Transação enviada:', result);
  };

  const documentTypeOptions = [
    { value: 'cpf', label: 'CPF' },
    { value: 'cnpj', label: 'CNPJ' },
  ];

  const installmentsOptions = [
    { value: 1, label: '1x' },
    { value: 2, label: '2x' },
    { value: 3, label: '3x' },
  ];

  return (
    <div className='flex justify-center flex-col px-50 py-10'>
      <h1 className='text-center font-bold text-2xl'>Checkout</h1>

      <div className='grid grid-cols-4 pt-15'>
        <div className='col-span-3 pr-15'>
          <form onSubmit={handleSubmit(onSubmitForm)}>
            {/* Identificação */}
            <div className={`${step === 1 ? 'opacity-100' : 'opacity-40'}`}>
              <button className='font-semibold' onClick={() => setStep(1)}>
                Identificação
              </button>
              {step === 1 && (
                <div className='mt-2 space-y-2'>
                  <div className='grid grid-cols-2 gap-5'>
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
                    <FormField
                      type='radio'
                      name='documentType'
                      register={register}
                      error={errors.documentType}
                      options={documentTypeOptions}
                    />

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
                      className='bg-blue-500 text-white p-2 mt-2 rounded cursor-pointer disabled:opacity-50'
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
                  <div className='grid grid-cols-5 gap-2'>
                    <FormField
                      type='text'
                      placeholder='Rua'
                      name='street'
                      register={register}
                      error={errors.street}
                      className='col-span-4'
                    />
                    <FormField
                      type='text'
                      placeholder='Número'
                      name='number'
                      register={register}
                      error={errors.number}
                      className='col-span-1'
                    />
                  </div>

                  <div className='grid grid-cols-5 gap-2'>
                    <FormField
                      type='text'
                      placeholder='Bairro'
                      name='neighborhood'
                      register={register}
                      error={errors.neighborhood}
                      className='col-span-2'
                    />
                    <FormField
                      type='text'
                      placeholder='Cidade'
                      name='city'
                      register={register}
                      error={errors.city}
                      className='col-span-1'
                    />
                    <FormField
                      type='text'
                      placeholder='Estado'
                      name='state'
                      register={register}
                      error={errors.state}
                      className='col-span-1'
                    />
                    <FormField
                      type='text'
                      placeholder='País'
                      name='country'
                      register={register}
                      error={errors.country}
                      className='col-span-1'
                    />
                  </div>

                  <div className='flex justify-end mt-5 mb-2'>
                    <button
                      onClick={handleNext}
                      disabled={!isStepComplete(2)}
                      className='bg-blue-500 text-white p-2 mt-2 rounded cursor-pointer disabled:opacity-50'
                    >
                      Salvar e Continuar
                    </button>
                  </div>
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
                  <div className='grid grid-cols-2'>
                    <FormField
                      type='text'
                      placeholder='Número do Cartão'
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

                    <FormField
                      type='select'
                      name='installments'
                      register={register}
                      error={errors.installments}
                      options={installmentsOptions}
                    />
                  </div>
                  <div className='flex justify-end mt-5 mb-2'>
                    <button
                      onClick={handleNext}
                      disabled={!isStepComplete(3)}
                      className='bg-blue-500 text-white p-2 mt-2 rounded cursor-pointer disabled:opacity-50'
                    >
                      Salvar e Continuar
                    </button>
                  </div>
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
                    className='bg-green-500 text-white p-2 mt-2 cursor-pointer rounded'
                  >
                    Confirmar Pedido
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
        <CheckoutCart />
      </div>
    </div>
  );
}
