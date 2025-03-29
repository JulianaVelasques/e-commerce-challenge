import Link from 'next/link';
import NavLinks from './navLink';

const SideBar = () => {
  return (
    <div className='flex h-full flex-col px-3 py-4 border-gray-100 border-r-2 md:px-2'>
      <Link
        className='flex h-10 mb-2 items-center justify-center rounded-md bg-pink-400 p-4 md:h-20'
        href='/'
      >
        <p className='text-white text-center font-bold md:w-40'>CompanyLogo</p>
      </Link>
      <div className='flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2'>
        <NavLinks />
        <div className='hidden h-auto w-full grow rounded-md md:block'></div>
        <form>
          <button className='flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium cursor-pointer hover:bg-blue-950 hover:text-sky-100 md:flex-none md:justify-start md:p-2 md:px-3'>
            <div className='hidden md:block'>Sign Out</div>
          </button>
        </form>
      </div>
    </div>
  );
};

export default SideBar;
