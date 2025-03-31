'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Breadcrumb() {
  const pathname = usePathname();
  const pathSegments = pathname.split('/').filter(Boolean);

  return (
    <nav className='text-sm text-gray-600 mb-4'>
      <ul className='flex items-center space-x-2'>
        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join('/')}`;
          const formattedSegment =
            segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={href} className='flex items-center space-x-2'>
              <span>/</span>
              {index === pathSegments.length - 1 ? (
                <span className='text-gray-800 font-semibold'>
                  {formattedSegment}
                </span>
              ) : (
                <Link href={href} className='text-gray-500 hover:underline'>
                  {formattedSegment}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
