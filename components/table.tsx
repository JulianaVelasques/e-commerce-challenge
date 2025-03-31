'use client';

interface TableProps {
  headers: string[];
  data: (string | number)[][];
}

export default function Table({ headers, data }: TableProps) {
  return (
    <div className='overflow-x-auto rounded-lg text-xs md:text-sm'>
      <table className='min-w-full'>
        <thead className='bg-gray-50 font-semibold text-[0.7rem]'>
          <tr>
            {headers.map((header, index) => (
              <th
                key={index}
                className='px-4 py-2 text-left tracking-wider text-gray-500 uppercase'
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className='even:bg-gray-50 odd:bg-white even:border even:border-gray-100'
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={`px-4 py-2 text-left text-gray-700 ${
                    cellIndex === 0 ? 'font-bold' : ''
                  }`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
