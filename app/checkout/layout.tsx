'use client';

import { CheckoutProvider } from '@/components/checkout/checkoutContext';

export default function CheckoutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CheckoutProvider>{children}</CheckoutProvider>;
}
