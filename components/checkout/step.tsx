'use client';

interface StepSectionProps {
  title: string;
  isActive: boolean;
  canEdit?: boolean;
  onEdit?: () => void;
  children: React.ReactNode;
}

export default function StepSection({
  title,
  isActive,
  canEdit,
  onEdit,
  children,
}: StepSectionProps) {
  return (
    <div
      className={`py-3 ${
        isActive ? 'text-gray-900' : 'text-gray-400'
      } border-b border-teal-400 last:border-b-0`}
    >
      <div className='flex justify-between'>
        <p className='font-semibold'>{title}</p>
        {canEdit && !isActive && (
          <button
            aria-label='Editar step'
            className='text-teal-400 underline text-sm cursor-pointer'
            onClick={onEdit}
          >
            Editar
          </button>
        )}
      </div>

      {isActive && children}
    </div>
  );
}
