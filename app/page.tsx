import Link from 'next/link';

export default function Home() {
  return (
    <div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
      <main className='flex flex-col gap-[32px] row-start-2 items-center sm:items-start'>
        <h1>Bem vindo ao ínicio do teste!</h1>

        <div>O que gostaria ver? Adm transactions ou Checkout page?</div>

        <Link href='/checkout'>
          <button className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition'>
            Ir para o Checkout
          </button>
        </Link>
      </main>
      <footer className='row-start-3 flex gap-[24px] flex-wrap items-center justify-center'>
        <p>Made by: Juliana Velasques Balta dos Santos</p>
      </footer>
    </div>
  );
}
