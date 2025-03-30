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
    <div className={`py-3 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
      <div className='flex justify-between px-2 '>
        <p className='font-semibold'>{title}</p>
        {canEdit && !isActive && (
          <button
            className='text-blue-800 underline text-sm cursor-pointer'
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
