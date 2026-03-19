import { Link, useLocation } from 'react-router';
import { Menu, Sun, Moon, } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import logo from './asset/Pizza-Logo.webp';
import { Sheet, SheetTrigger, SheetContent, SheetClose} from './ui/sheet';

export function Navigation() {
  // const { totalItems, animate } = useCart();
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
               <Link
                to="/catering"
                className={`hover:text-[#D32F2F] transition-colors ${
                  isActive('/catering') ? 'text-[#D32F2F]' : 'text-foreground'
                }`}
              >
                Catering
              </Link>
              <Link
                to="/career"
                className={`hover:text-[#D32F2F] transition-colors ${
                  isActive('/career') ? 'text-[#D32F2F]' : 'text-foreground'
                }`}
              >
                Career
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

      <nav className="md:hidden sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="logo" className="w-10 h-10" />
            <span className="font-bold text-[#D32F2F]">Pizza Shop</span>
          </Link>

          {/* RIGHT SIDE (FIXED POSITIONING) */}
          <div className="flex items-center gap-2">

            {/* Theme Toggle (FIXED POSITION) */}
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-md hover:bg-accent"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            {/* Hamburger */}
            <Sheet>
              <SheetTrigger asChild>
                <button className="p-2 rounded-md hover:bg-accent">
                  <Menu className="w-6 h-6" />
                </button>
              </SheetTrigger>

              {/* ✅ TRANSPARENT GLASS BACKGROUND */}
              <SheetContent
                side="right"
                className="w-[280px] p-10 bg-white/10 backdrop-blur-lg border-l border-white/20"
              >
                
                {/* Menu Items */}
                <div className="flex flex-col gap-6 mt-10">

                  <SheetClose asChild>
                    <Link to="/" className="text-lg font-medium hover:text-[#D32F2F]">
                      Home
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link
                      to="https://order.toasttab.com/online/your-pizza-shop-1200-8th-ave-sw-2nd"
                      className="text-lg font-medium hover:text-[#D32F2F]"
                    >
                      Menu
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/about" className="text-lg font-medium hover:text-[#D32F2F]">
                      About
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/contact" className="text-lg font-medium hover:text-[#D32F2F]">
                      Contact
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/catering" className="text-lg font-medium hover:text-[#D32F2F]">
                      Catering
                    </Link>
                  </SheetClose>

                  <SheetClose asChild>
                    <Link to="/career" className="text-lg font-medium hover:text-[#D32F2F]">
                      Career
                    </Link>
                  </SheetClose>

                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
}