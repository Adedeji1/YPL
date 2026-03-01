import { Outlet } from 'react-router';
import { CartProvider } from '../cart-context';
import { Navigation } from './navigation';
import { ThemeProvider } from 'next-themes';

export function Root() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <CartProvider>
        <div className="min-h-screen bg-background">
          <Navigation />
          <Outlet />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}
