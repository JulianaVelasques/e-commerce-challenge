'use client';

export default function TransactionStatus({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-[0.7rem] font-bold w-18 ${
        status === 'authorized'
          ? 'bg-green-200 text-green-900'
          : 'bg-red-200 text-red-900'
      }`}
    >
      {status === 'authorized' ? <>Autorizado</> : null}
      {status === 'failed' ? <>Falhou</> : null}
    </span>
  );
}
