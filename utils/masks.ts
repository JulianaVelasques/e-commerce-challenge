export const applyMask = (
  value: string,
  mask: 'cpf' | 'cnpj' | 'creditCard' | 'expirationDate'
) => {
  const onlyNumbers = value.replace(/\D/g, '');

  switch (mask) {
    case 'cpf':
      return onlyNumbers
        .replace(/^(\d{3})(\d{3})(\d{3})(\d{2})$/, '$1.$2.$3-$4')
        .slice(0, 14);
    case 'cnpj':
      return onlyNumbers
        .replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/, '$1.$2.$3/$4-$5')
        .slice(0, 18);
    case 'creditCard':
      return onlyNumbers
        .replace(/(\d{4})/g, '$1 ')
        .trim()
        .slice(0, 19);
    case 'expirationDate':
      return onlyNumbers.replace(/^(\d{2})(\d{0,4})$/, '$1/$2').slice(0, 7);
    default:
      return value;
  }
};
