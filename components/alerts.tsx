'use client';

interface AlertProps {
  type: 'info' | 'danger' | 'success' | 'warning' | 'dark';
  title: string;
  message: string;
  onClose?: () => void;
}

export default function Alert({ type, title, message, onClose }: AlertProps) {
  let alertClasses = '';

  switch (type) {
    case 'info':
      alertClasses = 'text-blue-800 bg-blue-50';
      break;
    case 'danger':
      alertClasses = 'text-red-800 bg-red-50';
      break;
    case 'success':
      alertClasses = 'text-green-800 bg-green-50';
      break;
    case 'warning':
      alertClasses = 'text-yellow-800 bg-yellow-50';
      break;
    case 'dark':
      alertClasses = 'text-gray-800 bg-gray-50';
      break;
  }

  return (
    <div
      className={`p-4 mb-4 text-xs md:text-sm rounded-lg ${alertClasses}`}
      role='alert'
    >
      {onClose && (
        <button
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
          onClick={onClose}
        >
          ✕
        </button>
      )}
      <span className='font-bold'>{title}</span> {message}
    </div>
  );
}
