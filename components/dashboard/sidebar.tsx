import Link from 'next/link';
import NavLinks from './navLink';

const SideBar = () => {
  return (
    <div className='flex h-full flex-col px-3 py-4 border-gray-200 text-white shadow-2xl border-r-1 bg-gray-950 md:px-2'>
      <Link
        className='flex h-10 mb-2 items-center justify-center rounded-md bg-teal-400 p-4 md:h-20'
        href='/transactions'
      >
        <p className='bg-pink-400 text-center font-bold md:w-40 rounded p-2'>
          CompanyLogo
        </p>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md md:block'></div>
      </div>
    </div>
  );
};

export default SideBar;
