'use client';

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
      <div className='flex-grow p-2 md:overflow-y-auto md:p-12'>{children}</div>
    </div>
  );
}
