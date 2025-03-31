'use client';

import { useForm } from 'react-hook-form';
import { useCheckout } from '@/contexts/checkout/checkoutContext';
import FormField from '@/components/checkout/formField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, checkoutSchema } from '@/utils/validations/form';
import StepSection from './step';
import InfoSection from '../ui/infoSection';
import NextStepButton from './nextButton';

interface CheckoutFormProps {
  onSubmit: (data: FormData) => void;
  loading: boolean;
}

const steps = [
  {
    name: 'identification',
    fields: ['firstName', 'lastName', 'documentType', 'documentNumber'],
  },
  { name: 'address', fields: ['street', 'number', 'city', 'state'] },
  { name: 'payment', fields: ['cardNumber', 'cardHolder', 'cvv'] },
];

export default function CheckoutForm({ onSubmit, loading }: CheckoutFormProps) {
  const { step, lastCompletedStep, handleEdit, handleNext } = useCheckout();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    getValues,
  } = useForm<FormData>({
    resolver: zodResolver(checkoutSchema), // integração com o zod
    mode: 'onChange',
    defaultValues: {
      documentType: 'cpf',
      installments: 1,
    },
  });

  const formData = watch();
  const documentType = watch('documentType');

  const isStepValid = (currentStep: number) => {
    // Obtém os valores atuais do formulário
    const values = getValues();

    // Valida os dados com o schema do Zod
    const parse = checkoutSchema.safeParse(values);

    // Verifica se há erro no passo atual
    const error = parse.error?.issues.find((i) =>
      steps[currentStep].fields.some((field) => i.path.includes(field))
    );

    return !error;
  };

  const isStepComplete = (currentStep: number) => {
    switch (currentStep) {
      case 0:
        return (
          formData.firstName &&
          formData.lastName &&
          formData.documentType &&
          formData.documentNumber &&
          isStepValid(currentStep)
        );
      case 1:
        return (
          formData.city &&
          formData.street &&
          formData.number &&
          formData.neighborhood &&
          formData.state &&
          formData.country &&
          isStepValid(currentStep)
        );
      case 2:
        return (
          formData.cardNumber &&
          formData.cardHolder &&
          formData.cvv &&
          formData.expirationDate &&
          isStepValid(currentStep)
        );
      default:
        return false;
    }
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
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Passo 1 - Identificação */}
      <StepSection
        title='Identificação'
        isActive={step === 0}
        canEdit={lastCompletedStep >= 0}
        onEdit={() => handleEdit(0)}
      >
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2 mt-3'>
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

        <label
          htmlFor='documentType'
          className='block font-medium mt-0.5 text-xs md:text-sm'
        >
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
          className='mt-[-0.5rem]'
        />

        <NextStepButton onClick={handleNext} disabled={!isStepComplete(0)} />
      </StepSection>

      {/* Passo 2 - Endereço */}
      <StepSection
        title='Endereço'
        isActive={step === 1}
        canEdit={lastCompletedStep >= 1}
        onEdit={() => handleEdit(1)}
      >
        <div className='grid grid-cols-1 md:grid-cols-5 gap-2'>
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

        <div className='grid grid-cols-1 md:grid-cols-5 gap-2'>
          <FormField
            type='text'
            placeholder='Bairro'
            name='neighborhood'
            register={register}
            error={errors.neighborhood}
            className='md:col-span-2'
          />
          <FormField
            type='text'
            placeholder='Cidade'
            name='city'
            register={register}
            error={errors.city}
            className='md:col-span-1'
          />
          <FormField
            type='text'
            placeholder='Estado'
            name='state'
            register={register}
            error={errors.state}
            className='md:col-span-1'
          />
          <FormField
            type='text'
            placeholder='País'
            name='country'
            register={register}
            error={errors.country}
            className='md:col-span-1'
          />
        </div>
        <NextStepButton onClick={handleNext} disabled={!isStepComplete(1)} />
      </StepSection>

      {/* Passo 3 - Pagamento */}
      <StepSection
        title='Pagamento'
        isActive={step === 2}
        canEdit={lastCompletedStep >= 2}
        onEdit={() => handleEdit(2)}
      >
        <div className='grid grid-cols-2 md:grid-cols-4 gap-2'>
          <FormField
            type='text'
            placeholder='Número do Cartão'
            name='cardNumber'
            register={register}
            mask='creditCard'
            error={errors.cardNumber}
            className='col-span-2'
          />

          <FormField
            type='text'
            placeholder='Nome do Cartão'
            name='cardHolder'
            register={register}
            error={errors.cardHolder}
            className='col-span-2'
          />

          <FormField
            type='text'
            placeholder='Código de segurança'
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
            className='col-span-2'
          />
        </div>
        <NextStepButton onClick={handleNext} disabled={!isStepComplete(2)} />
      </StepSection>

      {/* Revisão */}
      <StepSection title='Revisão' isActive={step === 3}>
        <div className='mx-2 pt-5 text-[0.8rem]'>
          <InfoSection
            title='Confira suas informações'
            data={[
              {
                label: 'Nome completo',
                value: `${formData.firstName} ${formData.lastName}`,
              },
              {
                label: 'Documento',
                value: `${formData.documentType.toUpperCase()} - ${
                  formData.documentNumber
                }`,
              },
              {
                label: 'Endereço',
                value: `${formData.street}, ${formData.number}, ${formData.neighborhood}, ${formData.city} - ${formData.state}, ${formData.country}`,
              },
              {
                label: 'Cartão de crédito',
                value: `${formData.cardNumber} - ${formData.cardHolder}`,
              },
              {
                label: 'Parcelamento',
                value: `${formData.installments}x sem juros`,
              },
            ]}
          />
        </div>

        <div className='flex justify-end mt-5 mb-2'>
          <button
            aria-label='Finalizar compra'
            type='submit'
            disabled={loading}
            className='bg-teal-400 text-white p-2 rounded cursor-pointer'
          >
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </div>
      </StepSection>
    </form>
  );
}
