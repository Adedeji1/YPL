import { motion } from 'motion/react';
import { CheckCircle, Home, Package } from 'lucide-react';
import { Link } from 'react-router';
import { useEffect, useState } from 'react';
import logo from './asset/Pizza-Logo.webp';

export function Success() {
  const [pizzaOpen, setPizzaOpen] = useState(false);

  useEffect(() => {
    // Trigger pizza box opening animation
    const timer = setTimeout(() => {
      setPizzaOpen(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen py-24 px-6 flex items-center justify-center bg-gradient-to-b from-background to-[#D32F2F]/5">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-card rounded-3xl p-12 shadow-2xl text-center"
        >
          {/* Success Icon with Animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 10, delay: 0.2 }}
            className="w-32 h-32 bg-[#388E3C] rounded-full flex items-center justify-center mx-auto mb-8"
          >
            <CheckCircle className="w-16 h-16 text-white" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-5xl font-bold mb-4"
          >
            Order Confirmed!
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-muted-foreground mb-8"
          >
            Your delicious pizza is being prepared with love
          </motion.p>

          {/* Pizza Box Animation */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative w-64 h-64 mx-auto mb-8"
          >
            {/* Pizza Box */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-[#F5DEB3] to-[#D2B48C] rounded-lg shadow-2xl"
              style={{
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Box Top */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-[#F5DEB3] to-[#D2B48C] rounded-lg border-4 border-[#8B4513] origin-top flex items-center justify-center"
                animate={{
                  rotateX: pizzaOpen ? -120 : 0,
                }}
                transition={{ duration: 0.8, delay: 0.5 }}
                style={{
                  transformStyle: 'preserve-3d',
                  backfaceVisibility: 'hidden',
                }}
              >
                <img src={logo} alt="Your Pizza Shop" className="w-32 h-32" />
              </motion.div>

              {/* Pizza Inside */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: pizzaOpen ? 1 : 0,
                  opacity: pizzaOpen ? 1 : 0,
                }}
                transition={{ duration: 0.5, delay: 1.3 }}
                className="absolute inset-4 rounded-full bg-gradient-radial from-[#FFE5B4] via-[#D32F2F] to-[#8B0000] shadow-lg"
              >
                {/* Pepperoni slices */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1.5 + i * 0.1, type: 'spring' }}
                    className="absolute w-8 h-8 bg-[#8B0000] rounded-full border-2 border-[#D32F2F]"
                    style={{
                      top: `${30 + Math.cos((i * Math.PI) / 4) * 40}%`,
                      left: `${30 + Math.sin((i * Math.PI) / 4) * 40}%`,
                    }}
                  />
                ))}
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Order Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-background rounded-2xl p-6 mb-8"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#D32F2F]/10 flex items-center justify-center">
                  <Package className="w-6 h-6 text-[#D32F2F]" />
                </div>
                <div className="text-left">
                  <p className="font-bold">Estimated Delivery</p>
                  <p className="text-sm text-muted-foreground">30-45 minutes</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Order #</p>
                <p className="font-bold text-[#D32F2F]">{Math.floor(Math.random() * 10000)}</p>
              </div>
            </div>

            <div className="border-t border-border pt-4">
              <p className="text-sm text-muted-foreground mb-2">Delivering to:</p>
              <p className="font-bold">Your Location</p>
              <p className="text-sm text-muted-foreground">Largo, FL</p>
            </div>
          </motion.div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/" className="flex-1">
              <motion.button
                className="w-full bg-[#D32F2F] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Home className="w-5 h-5" />
                Back to Home
              </motion.button>
            </Link>
            <Link to="/menu" className="flex-1">
              <motion.button
                className="w-full bg-card border-2 border-border py-4 rounded-full font-bold hover:bg-accent transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Order Again
              </motion.button>
            </Link>
          </div>

          {/* Thank You Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-8 text-muted-foreground italic"
          >
            "Thank you for supporting our family business for 30+ years!"
          </motion.p>
        </motion.div>

        {/* Confetti Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 rounded-full"
              style={{
                background: ['#D32F2F', '#388E3C', '#FBC02D'][i % 3],
                left: `${Math.random() * 100}%`,
                top: '-5%',
              }}
              animate={{
                y: ['0vh', '110vh'],
                x: [0, Math.random() * 100 - 50],
                rotate: [0, Math.random() * 360],
                opacity: [1, 0],
              }}
              transition={{
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5,
                ease: 'linear',
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}