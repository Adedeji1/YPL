import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { toppingCategories, pizzaSizes, sauceOptions, cheeseOptions } from '../data';
import { useCart } from '../cart-context';
import { useNavigate } from 'react-router';
import useIsLargeScreen from '../../../hooks/screenSize';

interface PizzaConfig {
  size: 'small' | 'medium' | 'large' | null;
  sauce: string | null;
  cheese: string | null;
  toppings: string[];
}

export function PizzaBuilder() {
  const [step, setStep] = useState(1);
  const [config, setConfig] = useState<PizzaConfig>({
    size: null,
    sauce: null,
    cheese: null,
    toppings: [],
  });
  const [showUpsell, setShowUpsell] = useState(false);
  const { addItem } = useCart();
  const navigate = useNavigate();
  // Render Annimations based on screen Size
  const isLargeScreen = useIsLargeScreen();

  // helpers to conditionally apply motion props only on large screens
  const animProps = (p: Record<string, any>) => (isLargeScreen ? p : {});
  const hoverProps = (p: any) => (isLargeScreen ? p : undefined);

  const calculatePrice = () => {
    let price = 0;
    
    const sizeObj = pizzaSizes.find(s => s.id === config.size);
    if (sizeObj) price += sizeObj.basePrice;

    // Add topping prices based on size
    const toppingPrice = config.size === 'small' ? 1.75 : config.size === 'medium' ? 2.50 : 1.75;
    
    config.toppings.forEach((toppingId) => {
      const topping = [
        ...toppingCategories.meats, 
        ...toppingCategories.veggies, 
        ...toppingCategories.premium
      ].find(t => t.id === toppingId);
      if (topping) price += topping.price;
    });

    // Extra cheese surcharge
    if (config.cheese === 'extra') price += 2.50;

    return price;
  };

  const toggleTopping = (toppingId: string) => {
    setConfig((prev) => ({
      ...prev,
      toppings: prev.toppings.includes(toppingId)
        ? prev.toppings.filter((t) => t !== toppingId)
        : [...prev.toppings, toppingId],
    }));
  };

  const canProceed = () => {
    if (step === 1) return config.size !== null;
    if (step === 2) return config.sauce !== null;
    if (step === 3) return config.cheese !== null;
    return true;
  };

  const handleAddToCart = () => {
    const toppingNames = config.toppings.map((id) => {
      const topping = [
        ...toppingCategories.meats, 
        ...toppingCategories.veggies, 
        ...toppingCategories.premium
      ].find(t => t.id === id);
      return topping?.name || '';
    });

    const sauceName = sauceOptions.find(s => s.id === config.sauce)?.name || config.sauce;
    const cheeseName = cheeseOptions.find(c => c.id === config.cheese)?.name || config.cheese;
    const sizeName = pizzaSizes.find(s => s.id === config.size)?.name || config.size;

    addItem({
      id: `custom-pizza-${Date.now()}`,
      name: `Build Your Own Pizza (${sizeName})`,
      price: calculatePrice(),
      customizations: [
        `Sauce: ${sauceName}`,
        `Cheese: ${cheeseName}`,
        ...toppingNames,
      ],
    });

    setShowUpsell(true);
  };

  const handleFinish = () => {
    navigate('/checkout');
  };

  const getSauceColor = (sauceId: string) => {
    const colors: Record<string, string> = {
      'red': '#D32F2F',
      'white': '#F5F5DC',
      'bbq': '#8B4513',
      'buffalo': '#FF6600',
      'garlic-oil': '#FFD700',
    };
    return colors[sauceId] || '#D32F2F';
  };

  return (
    <div className="min-h-screen py-6 px-6 pb-20 md:pb-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        {isLargeScreen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="hidden lg:block top-24 text-center mb-6"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Build Your Pizza</h1>
            <p className="text-xl text-muted-foreground">
              Create your perfect pizza, just the way you like it
            </p>
          </motion.div>
        )}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Pizza Visual */}
          <motion.div
            {...animProps({ initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } })}
            className="hidden lg:block sticky top-12 h-fit"
          >
            <div className="bg-card rounded-3xl p-6 shadow-2xl">
              <h2 className="text-xl font-bold mb-4">Your Pizza</h2>
              
              {/* Pizza Visualization */}
              <div className="relative w-full aspect-square max-w-md mx-auto">
                {/* Base/Dough */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-gradient-radial from-[#F5DEB3] to-[#D2B48C] shadow-lg"
                  {...animProps({
                    initial: { scale: 0 },
                    animate: { scale: config.size ? 1 : 0.3, opacity: config.size ? 1 : 0.3 },
                    transition: { type: 'spring', damping: 15 },
                  })}
                />

                {/* Sauce Layer */}
                {isLargeScreen ? (
                  <AnimatePresence>
                    {config.sauce && (
                      <motion.div
                        className="absolute inset-8 rounded-full shadow-inner"
                        style={{
                          backgroundColor: getSauceColor(config.sauce),
                          opacity: 0.9,
                        }}
                        {...animProps({ initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 0.9 }, exit: { scale: 0, opacity: 0 }, transition: { type: 'spring', damping: 15 } })}
                      />
                    )}
                  </AnimatePresence>
                ) : (
                  config.sauce && (
                    <div
                      className="absolute inset-8 rounded-full shadow-inner"
                      style={{
                        backgroundColor: getSauceColor(config.sauce),
                        opacity: 0.9,
                      }}
                    />
                  )
                )}

                {/* Cheese Layer */}
                {isLargeScreen ? (
                  <AnimatePresence>
                    {config.cheese && config.cheese !== 'none' && (
                      <motion.div
                        className="absolute inset-12 rounded-full"
                        style={{
                          background: 'radial-gradient(circle, #FFF9E6 0%, #FFE5B4 100%)',
                          opacity: 0.85,
                        }}
                        {...animProps({ initial: { scale: 0, opacity: 0 }, animate: { scale: 1, opacity: 0.85 }, exit: { scale: 0, opacity: 0 }, transition: { type: 'spring', damping: 15, delay: 0.1 } })}
                      />
                    )}
                  </AnimatePresence>
                ) : (
                  config.cheese && config.cheese !== 'none' && (
                    <div
                      className="absolute inset-12 rounded-full"
                      style={{
                        background: 'radial-gradient(circle, #FFF9E6 0%, #FFE5B4 100%)',
                        opacity: 0.85,
                      }}
                    />
                  )
                )}

                {/* Toppings */}
                {isLargeScreen ? (
                  <AnimatePresence mode="popLayout">
                    {config.toppings.map((topping, index) => {
                      const angle = (index * (360 / Math.max(config.toppings.length, 1))) * (Math.PI / 180);
                      const radius = 80;
                      const x = Math.cos(angle) * radius;
                      const y = Math.sin(angle) * radius;

                      return (
                        <motion.div
                          key={topping}
                          className="absolute w-12 h-12 rounded-full bg-[#D32F2F] shadow-md border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                          {...animProps({ initial: { scale: 0, x: 0, y: -100, opacity: 0 }, animate: { scale: 1, x, y, opacity: 1 }, exit: { scale: 0, opacity: 0 }, transition: { type: 'spring', damping: 12, stiffness: 200, delay: index * 0.05 } })}
                          style={{
                            left: '50%',
                            top: '50%',
                            marginLeft: '-24px',
                            marginTop: '-24px',
                          }}
                        >
                          🍕
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                ) : (
                  config.toppings.map((topping, index) => {
                    const angle = (index * (360 / Math.max(config.toppings.length, 1))) * (Math.PI / 180);
                    const radius = 80;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    return (
                      <div
                        key={topping}
                        className="absolute w-12 h-12 rounded-full bg-[#D32F2F] shadow-md border-2 border-white flex items-center justify-center text-white text-xs font-bold"
                        style={{
                          left: `calc(50% + ${x}px)`,
                          top: `calc(50% + ${y}px)`,
                          marginLeft: '-24px',
                          marginTop: '-24px',
                        }}
                      >
                        🍕
                      </div>
                    );
                  })
                )}
              </div>

              {/* Price Display */}
              <div className="mt-4 p-4 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] rounded-2xl text-white text-center">
                <p className="text-xs opacity-90 mb-1">Total Price</p>
                <p className="text-3xl font-bold">${calculatePrice().toFixed(2)}</p>
              </div>

              {/* Order Summary */}
              {config.size && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-3 space-y-1 text-xs"
                >
                  <p><span className="text-muted-foreground">Size:</span> <span className="font-semibold">{config.size}</span></p>
                  {config.sauce && <p><span className="text-muted-foreground">Sauce:</span> <span className="font-semibold">{config.sauce}</span></p>}
                  {config.cheese && <p><span className="text-muted-foreground">Cheese:</span> <span className="font-semibold">{config.cheese}</span></p>}
                  {config.toppings.length > 0 && (
                    <p><span className="text-muted-foreground">Toppings:</span> <span className="font-semibold">{config.toppings.length}</span></p>
                  )}
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Builder Steps */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-4">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                      step === s
                        ? 'bg-[#D32F2F] text-white scale-110'
                        : step > s
                        ? 'bg-[#388E3C] text-white'
                        : 'bg-card text-muted-foreground'
                    }`}
                  >
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-[#388E3C]' : 'bg-border'}`} />
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Size */}
              {step === 1 && (
                <motion.div
                  key="step1"
                  {...animProps({ initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } })}
                  className="space-y-3"
                >
                  <h2 className="text-2xl font-bold">Choose Your Size</h2>
                  <div className="grid gap-2">
                    {pizzaSizes.map((size) => (
                      <motion.button
                        key={size.id}
                        onClick={() => setConfig({ ...config, size: size.id as any })}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${
                          config.size === size.id
                            ? 'border-[#D32F2F] bg-[#D32F2F]/5'
                            : 'border-border hover:border-[#D32F2F]/50'
                        }`}
                        whileHover={hoverProps({ scale: 1.02 })}
                        whileTap={hoverProps({ scale: 0.98 })}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-bold mb-0.5">{size.name}</h3>
                            <p className="text-xs text-muted-foreground">Serves {size.servings} people</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xl font-bold text-[#D32F2F]">${size.basePrice.toFixed(2)}</p>
                            {config.size === size.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="mt-2 w-8 h-8 bg-[#D32F2F] rounded-full flex items-center justify-center ml-auto"
                              >
                                <Check className="w-5 h-5 text-white" />
                              </motion.div>
                            )}
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2: Sauce */}
              {step === 2 && (
                <motion.div
                  key="step2"
                  {...animProps({ initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } })}
                  className="space-y-3"
                >
                  <h2 className="text-2xl font-bold">Pick Your Sauce</h2>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {sauceOptions.map((sauce) => (
                      <motion.button
                        key={sauce.id}
                        onClick={() => setConfig({ ...config, sauce: sauce.id })}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          config.sauce === sauce.id
                            ? 'border-[#D32F2F] bg-[#D32F2F]/5'
                            : 'border-border hover:border-[#D32F2F]/50'
                        }`}
                        whileHover={hoverProps({ scale: 1.02 })}
                        whileTap={hoverProps({ scale: 0.98 })}
                      >
                        <div className="w-12 h-12 rounded-full mb-3" style={{ backgroundColor: getSauceColor(sauce.id) }} />
                        <h3 className="text-lg font-bold mb-1">{sauce.name}</h3>
                        {config.sauce === sauce.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-2 w-8 h-8 bg-[#D32F2F] rounded-full flex items-center justify-center"
                          >
                            <Check className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 3: Cheese */}
              {step === 3 && (
                <motion.div
                  key="step3"
                  {...animProps({ initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } })}
                  className="space-y-3"
                >
                  <h2 className="text-2xl font-bold">Select Your Cheese</h2>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {cheeseOptions.map((cheese) => (
                      <motion.button
                        key={cheese.id}
                        onClick={() => setConfig({ ...config, cheese: cheese.id })}
                        className={`p-4 rounded-2xl border-2 text-left transition-all ${
                          config.cheese === cheese.id
                            ? 'border-[#D32F2F] bg-[#D32F2F]/5'
                            : 'border-border hover:border-[#D32F2F]/50'
                        }`}
                        whileHover={hoverProps({ scale: 1.02 })}
                        whileTap={hoverProps({ scale: 0.98 })}
                      >
                        <h3 className="text-lg font-bold mb-1">{cheese.name}</h3>
                        {config.cheese === cheese.id && (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="mt-2 w-8 h-8 bg-[#D32F2F] rounded-full flex items-center justify-center"
                          >
                            <Check className="w-5 h-5 text-white" />
                          </motion.div>
                        )}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 4: Toppings */}
              {step === 4 && (
                <motion.div
                  key="step4"
                  {...animProps({ initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 }, exit: { opacity: 0, x: -50 } })}
                  className="space-y-4"
                >
                  <h2 className="text-2xl font-bold">Add Toppings</h2>

                  {/* Meats */}
                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <span className="w-2 h-6 bg-[#D32F2F] rounded-full" />
                      Meats
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {toppingCategories.meats.map((topping) => (
                        <ToppingButton
                          key={topping.id}
                          topping={topping}
                          isSelected={config.toppings.includes(topping.id)}
                          onToggle={() => toggleTopping(topping.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Veggies */}
                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <span className="w-2 h-6 bg-[#388E3C] rounded-full" />
                      Vegetables
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {toppingCategories.veggies.map((topping) => (
                        <ToppingButton
                          key={topping.id}
                          topping={topping}
                          isSelected={config.toppings.includes(topping.id)}
                          onToggle={() => toggleTopping(topping.id)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Extra Cheese */}
                  <div>
                    <h3 className="text-lg font-bold mb-2 flex items-center gap-2">
                      <span className="w-2 h-6 bg-[#FBC02D] rounded-full" />
                      Extra Cheese
                    </h3>
                    <div className="grid sm:grid-cols-2 gap-2">
                      {toppingCategories.premium.map((topping) => (
                        <ToppingButton
                          key={topping.id}
                          topping={topping}
                          isSelected={config.toppings.includes(topping.id)}
                          onToggle={() => toggleTopping(topping.id)}
                        />
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-4">
              {step > 1 && (
                <motion.button
                  onClick={() => setStep(step - 1)}
                  className="flex-1 py-4 bg-card border-2 border-border rounded-full font-bold flex items-center justify-center gap-2"
                  whileHover={hoverProps({ scale: 1.02 })}
                  whileTap={hoverProps({ scale: 0.98 })}
                >
                  <ArrowLeft className="w-5 h-5" />
                  Back
                </motion.button>
              )}
              
              {step < 4 ? (
                <motion.button
                  onClick={() => setStep(step + 1)}
                  disabled={!canProceed()}
                  className={`flex-1 py-4 rounded-full font-bold flex items-center justify-center gap-2 ${
                    canProceed()
                      ? 'bg-[#D32F2F] text-white'
                      : 'bg-muted text-muted-foreground cursor-not-allowed'
                  }`}
                  whileHover={canProceed() ? hoverProps({ scale: 1.02 }) : undefined}
                  whileTap={canProceed() ? hoverProps({ scale: 0.98 }) : undefined}
                >
                  Next
                  <ArrowRight className="w-5 h-5" />
                </motion.button>
              ) : (
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 py-4 bg-[#D32F2F] text-white rounded-full font-bold"
                  whileHover={hoverProps({ scale: 1.02 })}
                  whileTap={hoverProps({ scale: 0.98 })}
                >
                  Add to Cart - ${calculatePrice().toFixed(2)}
                </motion.button>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Upsell Modal */}
      <AnimatePresence>
        {showUpsell && (
          <motion.div
            {...animProps({ initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 } })}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
          >
            <motion.div
              {...animProps({ initial: { scale: 0.9, y: 50 }, animate: { scale: 1, y: 0 }, exit: { scale: 0.9, y: 50 } })}
              className="bg-card rounded-3xl p-8 max-w-lg w-full shadow-2xl"
            >
              <h2 className="text-3xl font-bold mb-4">Make it a Combo?</h2>
              <p className="text-muted-foreground mb-6">
                Add a side and dessert to complete your meal!
              </p>

              <div className="space-y-4 mb-6">
                <motion.button
                  onClick={() => {
                    addItem({ id: 'greek-salad', name: 'Greek Salad', price: 7.99 });
                    setShowUpsell(false);
                    handleFinish();
                  }}
                  className="w-full p-4 bg-background rounded-xl text-left hover:bg-accent transition-colors"
                  whileHover={hoverProps({ scale: 1.02 })}
                >
                  <p className="font-bold">+ Greek Salad</p>
                  <p className="text-sm text-muted-foreground">Add $7.99</p>
                </motion.button>

                <motion.button
                  onClick={() => {
                    addItem({ id: 'snickers-cake', name: 'Caramel Snickers Cake', price: 6.99 });
                    setShowUpsell(false);
                    handleFinish();
                  }}
                  className="w-full p-4 bg-background rounded-xl text-left hover:bg-accent transition-colors"
                  whileHover={hoverProps({ scale: 1.02 })}
                >
                  <p className="font-bold">+ Caramel Snickers Cake</p>
                  <p className="text-sm text-muted-foreground">Add $6.99</p>
                </motion.button>
              </div>

              <motion.button
                onClick={handleFinish}
                className="w-full py-4 bg-[#D32F2F] text-white rounded-full font-bold"
                whileHover={hoverProps({ scale: 1.02 })}
                whileTap={hoverProps({ scale: 0.98 })}
              >
                No Thanks, Go to Cart
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ToppingButton({ topping, isSelected, onToggle }: { topping: any; isSelected: boolean; onToggle: () => void }) {
  return (
    <motion.button
      onClick={onToggle}
      className={`p-4 rounded-xl border-2 text-left transition-all ${
        isSelected
          ? 'border-[#D32F2F] bg-[#D32F2F]/5'
          : 'border-border hover:border-[#D32F2F]/50'
      }`}
      // whileHover={hoverProps({ scale: 1.02 })}
      // whileTap={hoverProps({ scale: 0.98 })}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="font-bold">{topping.name}</p>
          <p className="text-sm text-[#D32F2F]">+${topping.price.toFixed(2)}</p>
        </div>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${
          isSelected ? 'bg-[#D32F2F] border-[#D32F2F]' : 'border-border'
        }`}>
          {isSelected && <Check className="w-5 h-5 text-white" />}
        </div>
      </div>
    </motion.button>
  );
}