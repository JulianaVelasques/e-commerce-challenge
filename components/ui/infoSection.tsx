'use client';

interface InfoSectionProps {
  title: string;
  data: { label: string; value: string | number }[];
}

export default function InfoSection({ title, data }: InfoSectionProps) {
  return (
    <div className='bg-white shadow-md rounded-lg p-4 mb-4'>
      <h2 className='text-sm font-semibold mb-4 md:text-base'>{title}</h2>
      {data.map((item, index) => (
        <div
          key={index}
          className='flex justify-between py-2 border-b border-gray-100 text-xs md:text-sm last:border-0'
        >
          <p className='font-bold text-gray-700'>{item.label}</p>
          <p className='text-gray-500 truncate max-w-[8rem] sm:max-w-none'>
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
}
