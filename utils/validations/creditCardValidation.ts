// Função para validar o Algoritmo de Luhn (números de cartão válidos)
export const isValidCreditCard = (cardNumber: string): boolean => {
  let sum = 0;
  let alternate = false;
  const digits = cardNumber.replace(/\D/g, '').split('').reverse().map(Number);

  for (const digit of digits) {
    let n = digit;
    if (alternate) {
      n *= 2;
      if (n > 9) n -= 9;
    }
    sum += n;
    alternate = !alternate;
  }

  return sum % 10 === 0;
};
