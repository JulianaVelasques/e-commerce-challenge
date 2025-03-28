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
  options,
  className = '',
}: FormFieldProps & {
  mask?: 'cpf' | 'cnpj' | 'creditCard' | 'expirationDate';
}) => {
  const { onChange, ...rest } = register(name);

  // Função para renderizar o campo de input
  const renderInput = () => (
    <input
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
  );

  // Função para renderizar o campo de select
  const renderSelect = () => (
    <select {...rest} className='border p-2 rounded mt-2'>
      {options?.map((option) => (
        <option
          key={option.value}
          value={option.value}
          onChange={(e) => {
            onChange(e);
          }}
        >
          {option.label}
        </option>
      ))}
    </select>
  );

  // Função para renderizar o campo de radio
  const renderRadio = () => (
    <div className='flex items-center gap-2'>
      {options?.map((option) => (
        <label key={option.value} className='flex items-center'>
          <input
            type='radio'
            value={option.value}
            onChange={(e) => {
              onChange(e);
            }}
            {...rest}
            className='mr-1'
          />
          {option.label}
        </label>
      ))}
    </div>
  );

  return (
    <div className={`flex flex-col ${className}`}>
      {type === 'radio'
        ? renderRadio()
        : type === 'select'
        ? renderSelect()
        : renderInput()}
      {error && (
        <span className='text-[10px] text-red-500'>{error?.message}</span>
      )}
    </div>
  );
};

export default FormField;
