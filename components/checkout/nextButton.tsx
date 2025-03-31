'use client';

interface NextStepButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export default function NextStepButton({
  onClick,
  disabled,
}: NextStepButtonProps) {
  return (
    <div className='flex justify-end mt-5 mb-2'>
      <button
        onClick={onClick}
        disabled={disabled}
        className={`bg-pink-400 text-white p-2 mt-2 rounded cursor-pointer text-xs md:text-sm ${
          !disabled && 'hover:bg-teal-400'
        } transition disabled:opacity-50`}
      >
        Salvar e Continuar
      </button>
    </div>
  );
}
