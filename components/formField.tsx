'use client';

import { FormFieldProps } from '@/utils/validations/form';
import { applyMask } from '@/utils/masks';

const FormField = ({
  type,
  placeholder,
  name,
  register,
  error,
  mask,
}: FormFieldProps & {
  mask?: 'cpf' | 'cnpj' | 'creditCard' | 'expirationDate';
}) => {
  const { onChange, ...rest } = register(name);

  return (
    <div className='flex flex-col'>
      <input
        required
        type={type}
        placeholder={placeholder}
        className='border p-2 rounded mt-2'
        {...rest}
        onChange={(e) => {
          if (mask) {
            e.target.value = applyMask(e.target.value, mask);
          }
          onChange(e);
        }}
      />
      {error && <span className='text-red-500'>{error.message}</span>}
    </div>
  );
};

export default FormField;
