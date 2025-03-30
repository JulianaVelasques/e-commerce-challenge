import { useCheckout } from '@/components/checkout/checkoutContext';

export default function CheckoutCart() {
  const { products, subtotal, shipping, total } = useCheckout();

  return (
    <div>
      <h2 className='text-xl font-bold text-gray-900 mb-3'>Pedido</h2>

      <div className='flex justify-between text-gray-500'>
        <p>Subtotal</p>
        <p>R$ {subtotal.toFixed(2)}</p>
      </div>

      <div className='flex justify-between text-gray-500'>
        <p>Frete</p>
        <p>R$ {shipping.toFixed(2)}</p>
      </div>

      <div className='font-bold text-gray-900 flex justify-between my-3'>
        <p>Total</p>
        <p>R$ {total.toFixed(2)}</p>
      </div>

      <hr className='opacity-30' />

      <div className='mt-4'>
        <p className='text-amber-700 font-bold text-sm'>
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

            <div className='text-sm'>
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
  );
}
