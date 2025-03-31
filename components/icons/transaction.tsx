'use client';

export function TransactionIcon({
  className = 'w-5 h-5 text-gray-500',
}: {
  className?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 48 48'
      fill='none'
      stroke='currentColor'
      strokeWidth='4'
      strokeLinejoin='round'
      className={className}
    >
      <rect width='30' height='36' x='9' y='8' rx='2' />
      <path
        strokeLinecap='round'
        d='M18 4v6m12-6v6m-14 9h16m-16 8h12m-12 8h8'
      />
    </svg>
  );
}
