import { useForm } from 'react-hook-form';
import { useCheckout } from '@/components/checkout/checkoutContext';
import FormField from '@/components/checkout/formField';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormData, checkoutSchema } from '@/utils/validations/form';
import StepSection from './step';

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
        <div className='grid grid-cols-2 gap-2'>
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
          <label htmlFor='documentType' className='block font-medium mt-3'>
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

        <NextStepButton onClick={handleNext} disabled={!isStepComplete(0)} />
      </StepSection>
      <hr className='opacity-40' />
      {/* Passo 2 - Endereço */}
      <StepSection
        title='Endereço'
        isActive={step === 1}
        canEdit={lastCompletedStep >= 1}
        onEdit={() => handleEdit(1)}
      >
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
        <NextStepButton onClick={handleNext} disabled={!isStepComplete(1)} />
      </StepSection>
      <hr className='opacity-40' />
      {/* Passo 3 - Pagamento */}
      <StepSection
        title='Pagamento'
        isActive={step === 2}
        canEdit={lastCompletedStep >= 2}
        onEdit={() => handleEdit(2)}
      >
        <div className='grid grid-cols-2 gap-2'>
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
        <NextStepButton onClick={handleNext} disabled={!isStepComplete(2)} />
      </StepSection>

      <hr className='opacity-40' />

      {/* Revisão */}
      <StepSection title='Revisão' isActive={step === 3}>
        <div className='mx-8 pt-5 px-5 text-[0.8rem]'>
          <p className='font-bold uppercase'>Identificação</p>
          <hr className='opacity-20' />
          <p>
            Nome completo: {formData.firstName} {formData.lastName}
          </p>
          <p>
            Documento:{' '}
            <span className='uppercase'>{formData.documentType}</span> -{' '}
            {formData.documentNumber}
          </p>

          <p className='font-bold uppercase mt-2'>Endereço de entrega</p>
          <hr className='opacity-20' />
          <p>
            {formData.street}, {formData.number} - {formData.neighborhood} -{' '}
            {formData.city}/{formData.country}
          </p>

          <p className='font-bold uppercase mt-2'>Informações deagamento</p>
          <hr className='opacity-20' />
          <p>
            Cartão de crédito: {formData.cardNumber} - {formData.cardHolder}
          </p>
          <p>{formData.installments}x sem juros </p>
        </div>

        <div className='flex justify-end mt-5 mb-2'>
          <button
            type='submit'
            disabled={loading}
            className='bg-green-500 text-white p-2 rounded'
          >
            {loading ? 'Processando...' : 'Finalizar Compra'}
          </button>
        </div>
      </StepSection>
    </form>
  );
}

interface NextStepButtonProps {
  onClick: () => void;
  disabled: boolean;
}

function NextStepButton({ onClick, disabled }: NextStepButtonProps) {
  return (
    <div className='flex justify-end mt-5 mb-2'>
      <button
        onClick={onClick}
        disabled={disabled}
        className='bg-blue-500 text-white p-2 mt-2 rounded cursor-pointer disabled:opacity-50'
      >
        Salvar e Continuar
      </button>
    </div>
  );
}
