export default function TransactionStatus({ status }: { status: string }) {
  return (
    <span
      className={`inline-flex items-center justify-center rounded-full px-2 py-1 text-xs w-18 ${
        status === 'authorized'
          ? 'bg-green-500 text-white'
          : 'bg-red-500 text-white'
      }`}
    >
      {status === 'authorized' ? <>Autorizado</> : null}
      {status === 'failed' ? <>Falhou</> : null}
    </span>
  );
}
