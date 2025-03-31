'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TransactionIcon } from '../icons/transaction';
import { CartIcon } from '../icons/checkoutCart';

const links = [
  {
    name: 'Lorem Ipsum',
    href: '',
    icon: <TransactionIcon className='w-5 h-5 text-white' />,
  },
  {
    name: 'Transactions',
    href: '/dashboard/transactions',
    icon: <TransactionIcon className='w-5 h-5 text-white' />,
  },
  {
    name: 'Página de Checkout',
    href: '/checkout',
    icon: <CartIcon className='w-5 h-5 text-white' />,
  },
];

// export default function NavLinks() {
//   const pathname = usePathname();

//   return (
//     <>
//       {links.map((link) => {
//         return (
//           <Link
//             key={link.name}
//             href={link.href}
//             className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-teal-500 hover:text-white md:flex-none md:justify-start md:p-2 md:px-3
//               ${pathname === link.href ? 'bg-teal-400 text-white' : ''}`}
//           >
//             {link.icon}
//             <p className='block'>{link.name}</p>
//           </Link>
//         );
//       })}
//     </>
//   );
// }

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <div className='flex flex-row space-x-4 md:flex-col md:space-x-0 md:space-y-2'>
      {links.map((link) => (
        <Link
          key={link.name}
          href={link.href}
          className={`flex items-center gap-2 rounded-md p-2 text-sm font-medium text-white hover:bg-teal-500
            ${pathname === link.href ? 'bg-teal-400' : ''}`}
        >
          {link.icon}
          <p className='hidden md:block'>{link.name}</p>{' '}
          {/* Esconde texto no mobile */}
        </Link>
      ))}
    </div>
  );
}
