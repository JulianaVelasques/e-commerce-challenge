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
    <div className='relative z-0 w-full group mt-3'>
      <input
        type={type}
        id={name}
        className='block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-1 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer'
        placeholder=' '
        {...rest}
        onChange={(e) => {
          if (mask) {
            e.target.value = applyMask(e.target.value, mask);
          }
          onChange(e);
        }}
        required
      />
      <label
        htmlFor={name}
        className='peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6'
      >
        {placeholder}
      </label>
    </div>
  );

  // Função para renderizar o campo de select AJUSTAR A COR DESSE
  const renderSelect = () => (
    <select
      {...rest}
      className='block w-full my-2 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500'
    >
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
    <div className='flex items-center gap-2 text-gray-900'>
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
      {error ? (
        <span className='text-[10px] text-red-500'>{error?.message}</span>
      ) : (
        <span className='h-[15px]'></span>
      )}
    </div>
  );
};

export default FormField;
