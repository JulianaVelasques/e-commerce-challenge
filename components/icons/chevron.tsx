'use client';

export default function ChevronIcon({
  direction = 'down',
  className = 'w-6 h-6 text-gray-500',
}: {
  direction?: 'up' | 'down';
  className?: string;
}) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      strokeWidth='2'
      strokeLinecap='round'
      strokeLinejoin='round'
      className={className}
    >
      {direction === 'down' ? (
        <path d='m6 9l6 6l6-6' />
      ) : (
        <path d='m6 15l6-6l6 6' />
      )}
    </svg>
  );
}
