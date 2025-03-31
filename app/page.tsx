'use client';

import Link from 'next/link';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8 sm:p-20 text-center'>
      <main className='bg-white shadow-lg rounded-xl p-8 sm:p-12 max-w-md w-full'>
        <h1 className='text-lg font-bold text-gray-800 mb-4 md:text-2xl'>
          Bem-vindo à resolução do desafio!
        </h1>
        <p className='text-gray-600 mb-6 text-sm md:text-base'>
          Qual página quer ver primeiro?
        </p>

        <div className='flex flex-col gap-4'>
          <Link
            href='/dashboard/transactions'
            className='w-full px-4 py-2 bg-teal-400 text-white rounded-lg hover:bg-gray-900 transition text-sm md:text-base'
          >
            Acessar Transactions
          </Link>

          <Link
            href='/checkout'
            className='w-full px-4 py-2 bg-pink-400 text-white rounded-lg hover:bg-gray-900 transition text-sm md:text-base'
          >
            Ir para o Checkout
          </Link>
        </div>
      </main>

      <footer className='mt-12 text-gray-500 text-sm'>
        Made by:{' '}
        <span className='font-semibold'>
          Juliana Velasques Balta dos Santos
        </span>
      </footer>
    </div>
  );
}
