import { FieldError, UseFormRegister } from 'react-hook-form';
import { z, ZodType } from 'zod';
import { isValidCreditCard } from './creditCardValidation';

export const checkoutSchema: ZodType<FormData> = z
  .object({
    firstName: z.string().min(3, 'Nome deve conter no mínimo 3 caracteres'),
    lastName: z.string().min(3, 'Sobrenome deve conter no mínimo 3 caracteres'),
    documentType: z.enum(['cpf', 'cnpj'], {
      required_error: 'O tipo de documento é obrigatório.',
    }),
    documentNumber: z.string().min(1, 'Número do documento é obrigatório.'),
    city: z.string().min(1, 'Cidade é obrigatória'),
    street: z.string().min(1, 'Rua é obrigatória'),
    number: z.string().min(1, 'Número é obrigatório'),
    neighborhood: z.string().min(1, 'Bairro é obrigatório'),
    state: z.string().min(1, 'Estado é obrigatório'),
    country: z.string().min(1, 'País é obrigatório'),
    cardNumber: z
      .string()
      .min(13, 'Número do cartão deve ter entre 13 e 19 dígitos.')
      .max(19, 'Número do cartão deve ter entre 13 e 19 dígitos.')
      .refine((val) => isValidCreditCard(val), {
        message: 'Número do cartão de crédito inválido.',
      }),

    cardHolder: z
      .string()
      .min(5, 'Nome do titular deve ter pelo menos 5 caracteres.')
      .refine((val) => /^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/.test(val), {
        message: 'Nome do titular deve conter apenas letras.',
      })
      .refine((val) => val.trim().split(/\s+/).length > 1, {
        message: 'Informe nome e sobrenome.',
      }),

    cvv: z
      .string()
      .min(3, 'O CVV deve ter pelo menos 3 dígitos.')
      .max(4, 'O CVV pode ter no máximo 4 dígitos.')
      .refine((val) => /^\d+$/.test(val), {
        message: 'O CVV deve conter apenas números.',
      }),

    expirationDate: z
      .string()
      .max(7, 'Formato de data inválido. Use MM/AAAA.')
      .regex(
        /^(0[1-9]|1[0-2])\/\d{4}$/,
        'Formato de data inválido. Use MM/AAAA.'
      )
      .refine(
        (val) => {
          const [month, year] = val.split('/');
          const currentYear = new Date().getFullYear();
          const currentMonth = new Date().getMonth() + 1;
          const expYear = Number(year);
          const expMonth = Number(month);

          if (
            expYear < currentYear ||
            (expYear === currentYear && expMonth < currentMonth)
          ) {
            return false; // Data de expiração já passou
          }
          return true;
        },
        { message: 'O cartão está expirado.' }
      ),
    //   installments: z.coerce.number().min(1),
  })
  .superRefine((values, ctx) => {
    const { documentType, documentNumber } = values;

    const numericValue = documentNumber.replace(/\D/g, ''); // Remove caracteres não numéricos

    if (documentType === 'cpf' && numericValue.length !== 11) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'O CPF deve ter 11 dígitos.',
        path: ['documentNumber'],
      });
    } else if (documentType === 'cnpj' && numericValue.length !== 14) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'O CNPJ deve ter 14 dígitos.',
        path: ['documentNumber'],
      });
    }
  });

export type FormSchema = z.infer<typeof checkoutSchema>;

export type FormData = {
  firstName: string;
  lastName: string;
  documentType: string;
  documentNumber: string;
  city: string;
  street: string;
  number: string;
  neighborhood: string;
  state: string;
  country: string;
  cardNumber: string;
  cardHolder: string;
  cvv: string;
  expirationDate: string;
  //   installments: number;
};

export type FormFieldProps = {
  type: string;
  placeholder: string;
  name: ValidFieldNames;
  register: UseFormRegister<FormData>;
  error: FieldError | undefined;
  //   valueAsNumber?: boolean;
};

export type ValidFieldNames =
  | 'firstName'
  | 'lastName'
  | 'documentType'
  | 'documentNumber'
  | 'city'
  | 'street'
  | 'number'
  | 'neighborhood'
  | 'state'
  | 'country'
  | 'cardNumber'
  | 'cardHolder'
  | 'cvv'
  | 'expirationDate';
//   | 'installments';
