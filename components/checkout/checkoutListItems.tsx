'use client';

import { useState } from 'react';
import { useCheckout } from '@/contexts/checkout/checkoutContext';
import ChevronIcon from '../icons/chevron';

export default function CheckoutCart() {
  const { products, subtotal, shipping, total } = useCheckout();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className='shadow p-3 rounded-xl w-full md:shadow-none md:p-0'>
      {/* Só exibe o botão de resumo no mobile */}
      <div className='md:hidden'>
        <button
          aria-label='Expandir para visualizar o resumo dos pedidos'
          className='flex items-center justify-between w-full px-2 py-2'
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <p className='text-teal-400 font-bold text-sm'>Resumo do Pedido</p>
          <div className='flex items-center gap-2'>
            <p className='font-bold text-gray-900 text-sm'>
              R$ {total.toFixed(2)}
            </p>
            {isExpanded ? (
              <ChevronIcon direction='up' className='w-4 h-4' />
            ) : (
              <ChevronIcon direction='down' className='w-4 h-4' />
            )}
          </div>
        </button>
      </div>

      {/* Conteúdo do carrinho: sempre visível em telas grandes, só aparece no mobile se expandido */}
      <div
        className={`mt-1 px-3 ${
          isExpanded ? 'block' : 'hidden'
        } md:block md:mt-5 md:px-0`}
      >
        <h2 className='font-bold text-gray-900 mb-3 text-sm md:text-lg'>
          Pedido
        </h2>

        <div className='flex justify-between text-gray-500 text-xs md:text-sm'>
          <p>Subtotal</p>
          <p>R$ {subtotal.toFixed(2)}</p>
        </div>

        <div className='flex justify-between text-gray-500  text-xs md:text-sm'>
          <p>Frete</p>
          <p>R$ {shipping.toFixed(2)}</p>
        </div>

        <div className='font-bold text-gray-900 flex justify-between my-3 text-xs md:text-base'>
          <p>Total</p>
          <p>R$ {total.toFixed(2)}</p>
        </div>

        <hr className='opacity-30' />

        <div className='mt-4'>
          <p className='text-pink-400 font-bold text-xs md:text-sm'>
            Seus produtos te aguardam
          </p>

          {products.map((product) => (
            <div key={product.name} className='flex items-center gap-5 mt-3'>
              <svg
                className='w-10 h-10 text-gray-600'
                aria-hidden='true'
                xmlns='http://www.w3.org/2000/svg'
                fill='currentColor'
                viewBox='0 0 20 18'
              >
                <path d='M18 0H2a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2Zm-5.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm4.376 10.481A1 1 0 0 1 16 15H4a1 1 0 0 1-.895-1.447l3.5-7A1 1 0 0 1 7.468 6a.965.965 0 0 1 .9.5l2.775 4.757 1.546-1.887a1 1 0 0 1 1.618.1l2.541 4a1 1 0 0 1 .028 1.011Z' />
              </svg>

              <div className='text-xs md:text-sm'>
                <p className='font-medium'>{product.name}</p>
                <p className='text-gray-500'>Quantidade: {product.quantity}</p>
                <p className='text-gray-500'>
                  R$ {(product.quantity * product.amount).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
