import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Leaf, Beer as BeerIcon, Info } from 'lucide-react';
import { menuData } from '../data';
import { useCart } from '../cart-context';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Link, useSearchParams } from 'react-router';

interface Beer {
  id: string;
  name: string;
  type: string;
  abv: number;
  ibu: number;
  pairing: string;
}

export function Menu() {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedBeer, setSelectedBeer] = useState<Beer | null>(null);
  const { addItem } = useCart();

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'pizza', name: 'Pizzas' },
    { id: 'subs', name: 'Subs' },
    { id: 'wings', name: 'Wings' },
    { id: 'friedChicken', name: 'Fried Chicken' },
    { id: 'pasta', name: 'Pasta' },
    { id: 'salads', name: 'Salads' },
    { id: 'appetizers', name: 'Appetizers' },
    { id: 'desserts', name: 'Desserts' },
    { id: 'beer', name: '18 Taps' },
  ];

  const shouldShowCategory = (categoryId: string) => {
    if (selectedCategory === 'all' && categoryId !== 'beer') return true;
    return selectedCategory === categoryId;
  };

  return (
    <div className="min-h-screen py-24 px-6 pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Menu</h1>
          <p className="text-xl text-muted-foreground">
            Fresh ingredients, authentic recipes, and 30 years of perfection
          </p>
        </motion.div>

        {/* Category Filter */}
        <div className="mb-12">
          <div className="flex overflow-x-auto pb-4 gap-3 scrollbar-hide">
            {categories.map((category) => (
              <motion.button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`px-6 py-3 rounded-full transition-all whitespace-nowrap flex-shrink-0 ${
                  selectedCategory === category.id
                    ? 'bg-[#D32F2F] text-white'
                    : 'bg-card hover:bg-accent'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category.name}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-16"
          >
            {/* Pizzas */}
            {shouldShowCategory('pizza') && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#D32F2F] rounded-full" />
                  Pizzas
                </h2>
                <p className="text-muted-foreground mb-6">
                  All pizzas available in Small 10", Medium 14", or Large 18". Gluten-free crust available.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.pizzas.map((pizza, index) => (
                    <PizzaCard key={pizza.id} pizza={pizza} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* Subs */}
            {shouldShowCategory('subs') && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#D32F2F] rounded-full" />
                  Subs
                </h2>
                <p className="text-muted-foreground mb-6">
                  All subs served on fresh-baked bread with your choice of toppings.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.subs.map((item, index) => (
                    <MenuItem key={item.id} item={item} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* Wings */}
            {shouldShowCategory('wings') && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#D32F2F] rounded-full" />
                  Wings
                </h2>
                <p className="text-muted-foreground mb-6">
                  Served Mild, Hot, BBQ, Teriyaki, BBQ Blackened, or Teriyaki Blackened. Comes with celery and ranch or blue cheese.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.wings.map((item, index) => (
                    <MenuItem key={item.id} item={item} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* Fried Chicken */}
            {shouldShowCategory('friedChicken') && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#FBC02D] rounded-full" />
                  Fried Chicken
                </h2>
                <p className="text-muted-foreground mb-6">
                  All dinners served with Jo Jo's, coleslaw or potato salad, and dinner roll. Buckets for the family!
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.friedChicken.map((item, index) => (
                    <MenuItem key={item.id} item={item} index={index} />
                  ))}
                </div>
              </section>
            )}

            {/* Pasta */}
            {shouldShowCategory('pasta') && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#D32F2F] rounded-full" />
                  Pasta
                </h2>
                <p className="text-muted-foreground mb-6">
                  Served with bread and garlic bread. Made with our signature marinara sauce.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.pasta.map((item, index) => (
                    <MenuItem key={item.id} item={item} index={index} isVegetarian={item.isVegetarian} />
                  ))}
                </div>
              </section>
            )}

            {/* Salads */}
            {shouldShowCategory('salads') && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#388E3C] rounded-full" />
                  Salads
                </h2>
                <p className="text-muted-foreground mb-6">
                  Fresh daily with your choice of dressing: Ranch, Italian, Greek, Balsamic, Caesar, or Blue Cheese.
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.salads.map((item, index) => (
                    <MenuItem key={item.id} item={item} index={index} isVegetarian={item.isVegetarian} />
                  ))}
                </div>
              </section>
            )}

            {/* Appetizers */}
            {shouldShowCategory('appetizers') && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#FBC02D] rounded-full" />
                  Appetizers
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.appetizers.map((item, index) => (
                    <MenuItem key={item.id} item={item} index={index} isVegetarian={item.isVegetarian} />
                  ))}
                </div>
              </section>
            )}

            {/* Desserts */}
            {shouldShowCategory('desserts') && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#D32F2F] rounded-full" />
                  Desserts
                </h2>
                <p className="text-muted-foreground mb-6">
                  Finish your meal with one of our delicious homemade desserts!
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.desserts.map((item, index) => (
                    <MenuItem key={item.id} item={item} index={index} isVegetarian={item.isVegetarian} />
                  ))}
                </div>
              </section>
            )}

            {/* Beer Section */}
            {selectedCategory === 'beer' && (
              <section>
                <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                  <span className="w-2 h-8 bg-[#FBC02D] rounded-full" />
                  18 Beers on Tap
                </h2>
                <p className="text-muted-foreground mb-6">
                  Rotating selection of craft beers, local favorites, and classic brews. Ask about our current tap list!
                </p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {menuData.beers.map((beer, index) => (
                    <motion.div
                      key={beer.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all cursor-pointer"
                      onClick={() => setSelectedBeer(beer)}
                      whileHover={{ scale: 1.02 }}
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-[#FBC02D]/10 flex items-center justify-center">
                            <BeerIcon className="w-6 h-6 text-[#FBC02D]" />
                          </div>
                          <div>
                            <h3 className="font-bold">{beer.name}</h3>
                            <p className="text-sm text-muted-foreground">{beer.type}</p>
                          </div>
                        </div>
                        <Info className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div className="flex gap-4 text-sm">
                        <span className="text-muted-foreground">ABV: {beer.abv}%</span>
                        <span className="text-muted-foreground">IBU: {beer.ibu}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </section>
            )}
          </motion.div>
        </AnimatePresence>

        {/* CTA to Pizza Builder */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] rounded-3xl p-12 text-center text-white"
        >
          <h2 className="text-4xl font-bold mb-4">Can't Find What You Want?</h2>
          <p className="text-xl mb-8 opacity-90">Build your perfect pizza with our interactive builder</p>
          <Link to="/builder">
            <motion.button
              className="bg-white text-[#D32F2F] px-8 py-4 rounded-full text-lg font-bold"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Create Your Own Pizza
            </motion.button>
          </Link>
        </motion.div>
      </div>

      {/* Beer Modal */}
      <AnimatePresence>
        {selectedBeer && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setSelectedBeer(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card rounded-3xl p-8 max-w-lg w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full bg-[#FBC02D]/10 flex items-center justify-center">
                    <BeerIcon className="w-8 h-8 text-[#FBC02D]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedBeer.name}</h2>
                    <p className="text-muted-foreground">{selectedBeer.type}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedBeer(null)}
                  className="p-2 hover:bg-accent rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between items-center p-4 bg-background rounded-xl">
                  <span className="text-muted-foreground">Alcohol by Volume</span>
                  <span className="text-xl font-bold text-[#FBC02D]">{selectedBeer.abv}%</span>
                </div>
                <div className="flex justify-between items-center p-4 bg-background rounded-xl">
                  <span className="text-muted-foreground">International Bitterness Units</span>
                  <span className="text-xl font-bold text-[#FBC02D]">{selectedBeer.ibu}</span>
                </div>
              </div>

              <div className="bg-[#388E3C]/10 rounded-xl p-4 border border-[#388E3C]/20">
                <h3 className="font-bold mb-2 flex items-center gap-2">
                  <span className="text-[#388E3C]">🍕</span>
                  Perfect Pizza Pairing
                </h3>
                <p className="text-muted-foreground">{selectedBeer.pairing}</p>
              </div>

              <motion.button
                onClick={() => setSelectedBeer(null)}
                className="w-full mt-6 bg-[#FBC02D] text-[#121212] py-3 rounded-full font-bold"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Got It!
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PizzaCard({ pizza, index }: { pizza: any; index: number }) {
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-card rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
    >
      <div className="relative h-56 overflow-hidden">
        <ImageWithFallback
          src={`https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400`}
          alt={pizza.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {pizza.featured && (
          <div className="absolute top-4 left-4 bg-[#FBC02D] text-[#121212] px-3 py-1 rounded-full text-sm font-bold">
            Featured
          </div>
        )}
        {pizza.isVegetarian && (
          <div className="absolute top-4 right-4 bg-[#388E3C] text-white p-2 rounded-full">
            <Leaf className="w-4 h-4" />
          </div>
        )}
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2">{pizza.name}</h3>
        <p className="text-muted-foreground text-sm mb-4">{pizza.description}</p>
        
        {/* Size selector */}
        <div className="flex gap-2 mb-4">
          {pizza.prices?.map((priceObj: any, idx: number) => (
            <button
              key={idx}
              onClick={() => setSelectedSize(idx)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all ${
                selectedSize === idx
                  ? 'bg-[#D32F2F] text-white'
                  : 'bg-accent hover:bg-accent/80'
              }`}
            >
              {priceObj.size}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold text-[#D32F2F]">
              ${pizza.prices?.[selectedSize]?.price.toFixed(2)}
            </span>
            <p className="text-xs text-muted-foreground">
              {pizza.prices?.[selectedSize]?.size}
            </p>
          </div>
          <motion.button
            onClick={() =>
              addItem({
                id: `${pizza.id}-${pizza.prices?.[selectedSize]?.size}`,
                name: `${pizza.name} (${pizza.prices?.[selectedSize]?.size})`,
                price: pizza.prices?.[selectedSize]?.price || 0,
              })
            }
            className="bg-[#D32F2F] text-white p-3 rounded-full hover:bg-[#B71C1C] transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Plus className="w-5 h-5" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

function MenuItem({ item, index, isVegetarian }: { item: any; index: number; isVegetarian?: boolean }) {
  const { addItem } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className="bg-card rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all"
    >
      <div className="flex items-start justify-between mb-3">
        <h3 className="text-xl font-bold flex-1">{item.name}</h3>
        {isVegetarian && (
          <div className="bg-[#388E3C]/10 text-[#388E3C] p-2 rounded-full">
            <Leaf className="w-4 h-4" />
          </div>
        )}
      </div>
      <p className="text-muted-foreground text-sm mb-4">{item.description}</p>
      <div className="flex items-center justify-between">
        <span className="text-2xl font-bold text-[#D32F2F]">${item.price?.toFixed(2)}</span>
        <motion.button
          onClick={() => addItem({ id: item.id, name: item.name, price: item.price || 0 })}
          className="bg-[#D32F2F] text-white p-3 rounded-full hover:bg-[#B71C1C] transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Plus className="w-5 h-5" />
        </motion.button>
      </div>
    </motion.div>
  );
}
