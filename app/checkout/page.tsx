'use client';

import { useState } from 'react';

export default function Checkout() {
  const [step, setStep] = useState(1);

  return (
    <div className='flex justify-center flex-col px-20 py-5'>
      <h1 className='text-center font-bold text-2xl'>Checkout</h1>

      <div className='grid grid-cols-3 pt-3'>
        <div className='col-span-2'>
          {/* Identificação */}
          <div className='py-3'>
            <button className='font-semibold' onClick={() => setStep(1)}>
              Identificação
            </button>
            {step === 1 && <div>form de Identificação aqui</div>}
          </div>
          <hr />
          {/* Endereço */}
          <div className='py-3'>
            <button className='font-semibold' onClick={() => setStep(2)}>
              Endereço
            </button>
            {step === 2 && <div>form de Endereço aqui</div>}
          </div>

          <hr />

          {/* Pagamentos */}
          <div className='py-3'>
            <button className='font-semibold' onClick={() => setStep(3)}>
              Pagamentos
            </button>
            {step === 3 && <div>form de Pagamentos aqui</div>}
          </div>

          <hr />

          {/* Revisão do pedido */}
          <div className='py-3'>
            <button className='font-semibold' onClick={() => setStep(4)}>
              Revisão do pedido
            </button>
            {step === 4 && <div>form de Revisão do pedido aqui</div>}
          </div>
        </div>

        <div>
          <h2 className='font-bold'>Na sua sacola</h2>
        </div>
      </div>
    </div>
  );
}
