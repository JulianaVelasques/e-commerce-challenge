'use client';

import Breadcrumb from '@/components/dashboard/breadcrumb';
import SideBar from '@/components/dashboard/sidebar';

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex h-screen flex-col md:flex-row md:overflow-hidden'>
      <div className='w-full flex-none md:w-64'>
        <SideBar />
      </div>
      <div className='flex-grow p-5 bg-gray-50 mt-15 md:m-0 md:overflow-y-auto'>
        <Breadcrumb />
        {children}
      </div>
    </div>
  );
}
