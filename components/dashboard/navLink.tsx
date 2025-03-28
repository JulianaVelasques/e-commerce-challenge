import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { name: 'Home', href: '/dashboard' },
  { name: 'Transactions', href: '/dashboard/transactions' },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <>
      {links.map((link) => {
        return (
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md p-3 text-sm font-medium hover:bg-blue-950 hover:text-sky-100 md:flex-none md:justify-start md:p-2 md:px-3
              ${pathname === link.href ? 'bg-blue-950 text-sky-100' : ''}`}
          >
            <p className='hidden md:block'>{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
