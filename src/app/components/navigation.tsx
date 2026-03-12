import { Link, useLocation } from 'react-router';
import { motion } from 'motion/react';
import { ShoppingCart, Menu, Utensils, User, Sun, Moon } from 'lucide-react';
import { useCart } from '../cart-context';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import logo from './asset/Pizza-Logo.webp';

export function Navigation() {
  const { totalItems, animate } = useCart();
  const location = useLocation();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Your Pizza Shop Logo" className="w-16 h-16" />
              <div>
                <h1 className="text-2xl font-bold text-[#D32F2F]">Your Pizza Shop</h1>
                <p className="text-xs text-muted-foreground">Established 30+ Years • Largo, FL</p>
              </div>
            </Link>

            <div className="flex items-center gap-8">
              <Link
                to="/"
                className={`hover:text-[#D32F2F] transition-colors ${
                  isActive('/') ? 'text-[#D32F2F]' : 'text-foreground'
                }`}
              >
                Home
              </Link>
              <Link
                to={"https://order.toasttab.com/online/your-pizza-shop-1200-8th-ave-sw-2nd"}
                className={`hover:text-[#D32F2F] transition-colors ${
                  isActive('/menu') ? 'text-[#D32F2F]' : 'text-foreground'
                }`}
              >
                Menu
              </Link>
              <Link
                to="/about"
                className={`hover:text-[#D32F2F] transition-colors ${
                  isActive('/about') ? 'text-[#D32F2F]' : 'text-foreground'
                }`}
              >
                About
              </Link>
              <Link
                to="/contact"
                className={`hover:text-[#D32F2F] transition-colors ${
                  isActive('/contact') ? 'text-[#D32F2F]' : 'text-foreground'
                }`}
              >
                Contact
              </Link>
              {/* <Link
                to="/builder"
                className={`hover:text-[#D32F2F] transition-colors ${
                  isActive('/builder') ? 'text-[#D32F2F]' : 'text-foreground'
                }`}
              >
                Build Your Pizza
              </Link> */}

              <button
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="p-2 rounded-full hover:bg-accent transition-colors"
                aria-label="Toggle theme"
              >
                {mounted && theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>

              {/* <Link to="/checkout" className="relative">
                <motion.div
                  animate={animate ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <ShoppingCart className="w-6 h-6" />
                  {totalItems > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 bg-[#D32F2F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    >
                      {totalItems}
                    </motion.span>
                  )}
                </motion.div>
              </Link> */}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border">
        <div className="flex items-center justify-around py-3">
          <Link to="/menu" className="flex flex-col items-center gap-1">
            <Menu className={`w-6 h-6 ${isActive('/menu') ? 'text-[#D32F2F]' : 'text-foreground'}`} />
            <span className={`text-xs ${isActive('/menu') ? 'text-[#D32F2F]' : 'text-foreground'}`}>
              Menu
            </span>
          </Link>

          <Link to="/builder" className="flex flex-col items-center gap-1">
            <Utensils className={`w-6 h-6 ${isActive('/builder') ? 'text-[#D32F2F]' : 'text-foreground'}`} />
            <span className={`text-xs ${isActive('/builder') ? 'text-[#D32F2F]' : 'text-foreground'}`}>
              Build
            </span>
          </Link>

          <Link to="/" className="flex flex-col items-center gap-1 -mt-8">
            <div className="w-16 h-16 rounded-full bg-white border-4 border-card flex items-center justify-center shadow-lg">
              <img src={logo} alt="Your Pizza Shop" className="w-14 h-14 rounded-full" />
            </div>
          </Link>

          <Link to="/checkout" className="flex flex-col items-center gap-1 relative">
            <motion.div
              animate={animate ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <ShoppingCart className={`w-6 h-6 ${isActive('/checkout') ? 'text-[#D32F2F]' : 'text-foreground'}`} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-[#D32F2F] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </motion.div>
            <span className={`text-xs ${isActive('/checkout') ? 'text-[#D32F2F]' : 'text-foreground'}`}>
              Cart
            </span>
          </Link>

          <button
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className="flex flex-col items-center gap-1"
          >
            {mounted && theme === 'dark' ? (
              <Sun className="w-6 h-6 text-foreground" />
            ) : (
              <Moon className="w-6 h-6 text-foreground" />
            )}
            <span className="text-xs text-foreground">Theme</span>
          </button>
        </div>
      </nav>
    </>
  );
}