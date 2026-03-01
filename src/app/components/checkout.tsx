import { motion } from 'motion/react';
import { Trash2, Plus, Minus, ArrowRight } from 'lucide-react';
import { useCart } from '../cart-context';
import { Link, useNavigate } from 'react-router';

export function Checkout() {
  const { items, removeItem, updateQuantity, totalPrice, totalItems, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    clearCart();
    navigate('/success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen py-24 px-6 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-32 h-32 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-6xl">🍕</span>
          </div>
          <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
          <p className="text-muted-foreground mb-8">
            Add some delicious pizzas to get started!
          </p>
          <Link to="/menu">
            <motion.button
              className="bg-[#D32F2F] text-white px-8 py-4 rounded-full font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Browse Menu
            </motion.button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-6 pb-32 md:pb-12">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Your Cart</h1>
          <p className="text-xl text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your order
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-2xl p-6 shadow-lg"
              >
                <div className="flex gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                    {item.customizations && item.customizations.length > 0 && (
                      <div className="text-sm text-muted-foreground mb-3 space-y-1">
                        {item.customizations.map((custom, i) => (
                          <p key={i}>{custom}</p>
                        ))}
                      </div>
                    )}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2 bg-background rounded-full p-1">
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-card hover:bg-accent flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Minus className="w-4 h-4" />
                        </motion.button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <motion.button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-card hover:bg-accent flex items-center justify-center"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Plus className="w-4 h-4" />
                        </motion.button>
                      </div>
                      <p className="text-2xl font-bold text-[#D32F2F]">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <motion.button
                    onClick={() => removeItem(item.id)}
                    className="w-10 h-10 rounded-full hover:bg-destructive/10 flex items-center justify-center transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 className="w-5 h-5 text-destructive" />
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24 h-fit"
          >
            <div className="bg-card rounded-2xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax (7%)</span>
                  <span>${(totalPrice * 0.07).toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Delivery Fee</span>
                  <span>$3.99</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold text-[#D32F2F]">
                      ${(totalPrice + totalPrice * 0.07 + 3.99).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <motion.button
                onClick={handleCheckout}
                className="w-full bg-[#D32F2F] text-white py-4 rounded-full font-bold flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Proceed to Checkout
                <ArrowRight className="w-5 h-5" />
              </motion.button>

              <p className="text-center text-sm text-muted-foreground mt-4">
                Secure checkout powered by our 30 years of trust
              </p>
            </div>

            {/* Promo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 bg-[#388E3C]/10 border border-[#388E3C]/20 rounded-2xl p-6"
            >
              <h3 className="font-bold mb-2 flex items-center gap-2">
                <span className="text-[#388E3C]">🎉</span>
                Special Offer
              </h3>
              <p className="text-sm text-muted-foreground">
                Add $10 more to get free delivery!
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
