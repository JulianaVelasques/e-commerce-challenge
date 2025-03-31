'use client';

import Link from 'next/link';
import NavLinks from './navLink';

// export default function SideBar() {
//   return (
//     <div className='flex h-full flex-col px-3 py-4 border-gray-200 text-white shadow-2xl border-r-1 bg-gray-950 md:px-2'>
//       <Link
//         className='flex h-10 mb-2 items-center justify-center rounded-md bg-teal-400 p-4 md:h-20'
//         href='/transactions'
//       >
//         <p className='bg-pink-400 text-center font-bold rounded p-2 md:text-base md:w-40'>
//           CompanyLogo
//         </p>
//       </Link>
//       <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
//         <NavLinks />
//         <div className='hidden h-auto w-full grow rounded-md md:block'></div>
//       </div>
//     </div>
//   );
// }

export default function SideBar() {
  return (
    <div className='fixed top-0 left-0 w-full flex flex-row items-center bg-gray-950 p-3 shadow-lg md:relative md:flex-col md:h-full md:w-64 md:border-r md:border-gray-200'>
      {/* Logo */}
      <Link
        href='/transactions'
        className='flex h-10 items-center justify-center rounded-md bg-teal-400 p-4 md:h-20'
      >
        <p className='bg-pink-400 text-white text-center font-bold rounded p-2 md:text-base md:w-40'>
          CompanyLogo
        </p>
      </Link>

      {/* NavLinks para desktop e mobile */}
      <div className='flex flex-grow justify-end md:w-full md:mt-3 md:flex-col md:justify-start md:space-y-2'>
        <NavLinks />
      </div>
    </div>
  );
}
