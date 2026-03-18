import { motion, useScroll, useTransform } from 'motion/react';
import { Link } from 'react-router';
import { ArrowRight, Beer, Pizza, Award, MapPin, Phone, Clock } from 'lucide-react';
import { useEffect, useState, useRef } from 'react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { menuData, testimonials } from '../data';

export function Home() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getTimeBasedGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Lunch Special';
    if (hour < 17) return 'Afternoon Delight';
    return 'Dinner Feast';
  };

  return (
    <div className="relative min-h-screen pb-20 md:pb-0">
      {/* Hero Section */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ opacity, scale }}
          className="absolute inset-0"
        >
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1765933613028-63223082b4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMGNoZWVzZSUyMHB1bGx8ZW58MXx8fHwxNzcxOTY4MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="Delicious pepperoni pizza"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80" />
        </motion.div>

        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-block px-4 py-2 rounded-full bg-[#FBC02D]/20 backdrop-blur-sm border border-[#FBC02D]/40 mb-6">
                <span className="text-[#FBC02D]">Established 30+ Years • Largo, FL</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                Largo's Favorite Slice
                <br />
                <span className="text-[#D32F2F]">for 30 Years</span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8">
                Enriching the lives of our community one pizza at a time
              </p>

              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="inline-block"
              >
                <Link 
                  to={"https://order.toasttab.com/online/your-pizza-shop-1200-8th-ave-sw-2nd"}
                >
                  <motion.button
                    className="group relative px-8 py-4 bg-[#D32F2F] text-white rounded-full overflow-hidden"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-[#B71C1C]"
                      initial={{ y: '100%' }}
                      whileHover={{ y: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                    <span className="relative flex items-center gap-2 text-lg">
                      Order Now - {getTimeBasedGreeting()}
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
              </motion.div>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-[#FBC02D]" />
                  <span>(727) 581-1101</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[#FBC02D]" />
                  <span>1200 Eighth AVE SW, Largo</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Floating Quick Order Card */}
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="hidden lg:block absolute bottom-12 right-12 bg-card/95 backdrop-blur-lg rounded-2xl p-6 shadow-2xl border border-border max-w-sm"
        >
          <h3 className="text-xl font-bold mb-4">Quick Order</h3>
          <div className="space-y-3">
            <Link to={"https://order.toasttab.com/online/your-pizza-shop-1200-8th-ave-sw-2nd"} className="block p-3 rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#D32F2F]/10 flex items-center justify-center">
                  <Pizza className="w-6 h-6 text-[#D32F2F]" />
                </div>
                <div>
                  <p className="font-semibold">Browse Menu</p>
                  <p className="text-sm text-muted-foreground">Full selection</p>
                </div>
              </div>
            </Link>

            {/* This is the Build your Pizza link that is being commented out for now */}
            {/* <Link to="/builder" className="block p-3 rounded-lg hover:bg-accent transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-[#388E3C]/10 flex items-center justify-center">
                  <Pizza className="w-6 h-6 text-[#388E3C]" />
                </div>
                <div>
                  <p className="font-semibold">Build Your Own</p>
                  <p className="text-sm text-muted-foreground">Customize pizza</p>
                </div>
              </div>
            </Link> */}
          </div>
        </motion.div>
      </section>

      {/* Featured Pizza of the Month */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-2 rounded-full bg-[#D32F2F]/10 text-[#D32F2F] mb-4">
                Pizza of the Month
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Sweet Chili BBQ Pizza</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Pulled pork, pineapples, red onions, and our signature sweet chili BBQ sauce
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                className="relative"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative overflow-hidden rounded-3xl shadow-2xl">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1671572579989-fa11cbd86eef?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYnElMjBwdWxsZWQlMjBwb3JrJTIwcGl6emElMjBwaW5lYXBwbGV8ZW58MXx8fHwxNzcxOTY4MDg2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Sweet Chili BBQ Pizza"
                    className="w-full h-96 object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-[#D32F2F] text-white px-4 py-2 rounded-full">
                    $16.99
                  </div>
                </div>
              </motion.div>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D32F2F]/10 flex items-center justify-center flex-shrink-0">
                    <Award className="w-6 h-6 text-[#D32F2F]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Award-Winning Flavor</h3>
                    <p className="text-muted-foreground">
                      Our most popular specialty pizza, combining sweet and savory in perfect harmony
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#388E3C]/10 flex items-center justify-center flex-shrink-0">
                    <Pizza className="w-6 h-6 text-[#388E3C]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Fresh Ingredients</h3>
                    <p className="text-muted-foreground">
                      Made with locally sourced pork, fresh pineapples, and our house-made BBQ sauce
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#FBC02D]/10 flex items-center justify-center flex-shrink-0">
                    <Beer className="w-6 h-6 text-[#FBC02D]" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Perfect Pairing</h3>
                    <p className="text-muted-foreground">
                      Best enjoyed with our Cigar City Jai Alai IPA or Founders Porter
                    </p>
                  </div>
                </div>

                <Link to={"https://order.toasttab.com/online/your-pizza-shop-1200-8th-ave-sw-2nd"}>
                  <motion.button
                    className="w-full md:w-auto px-8 py-4 bg-[#D32F2F] text-white rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Order Now
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Categories */}
      <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              What Are You Craving?
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <Link to={"https://order.toasttab.com/online/your-pizza-shop-1200-8th-ave-sw-2nd"}>
                <motion.div
                  className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1765933613028-63223082b4ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZXBwZXJvbmklMjBwaXp6YSUyMGNoZWVzZSUyMHB1bGx8ZW58MXx8fHwxNzcxOTY4MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Pizzas"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-[#D32F2F]/80 transition-all" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">Pizzas</h3>
                    <p className="text-white/80 text-sm">Classic to specialty</p>
                  </div>
                </motion.div>
              </Link>

              <Link to={"https://order.toasttab.com/online/your-pizza-shop-1200-8th-ave-sw-2nd"}>
                <motion.div
                  className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1627627045944-a6171e94783a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmFmdCUyMGJlZXIlMjB0YXAlMjBiYXJ8ZW58MXx8fHwxNzcxOTA1Mjk4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="18 Beers on Tap"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-[#FBC02D]/80 transition-all" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">18 Taps</h3>
                    <p className="text-white/80 text-sm">Craft beer selection</p>
                  </div>
                </motion.div>
              </Link>

              <Link to={"https://order.toasttab.com/online/your-pizza-shop-1200-8th-ave-sw-2nd"}>
                <motion.div
                  className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1608039755401-742074f0548d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlja2VuJTIwd2luZ3MlMjBidWZmYWxvJTIwc2F1Y2V8ZW58MXx8fHwxNzcxOTEzMTgzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Wings"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-[#D32F2F]/80 transition-all" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">Wings</h3>
                    <p className="text-white/80 text-sm">Buffalo to BBQ</p>
                  </div>
                </motion.div>
              </Link>
                {/* Link to building your own Pizza */}
              {/* <Link to="/builder">
                <motion.div
                  className="relative group overflow-hidden rounded-2xl h-64 cursor-pointer"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1641505397101-ddd9741b739a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGNoZWYlMjB0b3NzaW5nJTIwZG91Z2h8ZW58MXx8fHwxNzcxOTY4MDg1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Custom Pizza"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20 group-hover:from-[#388E3C]/80 transition-all" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-2xl font-bold text-white">Build Your Own</h3>
                    <p className="text-white/80 text-sm">Create your perfect pizza</p>
                  </div>
                </motion.div>
              </Link> */}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6 bg-card">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
              What Our Community Says
            </h2>
            <p className="text-center text-muted-foreground mb-12">
              30 years of making Largo families happy
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="bg-background rounded-2xl p-6 shadow-lg"
                >
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <span key={i} className="text-[#FBC02D] text-xl">★</span>
                    ))}
                  </div>
                  <p className="text-foreground mb-4 italic">"{testimonial.text}"</p>
                  <div>
                    <p className="font-bold">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      {/* <section className="py-20 px-6 bg-background">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                A Largo Tradition Since 1994
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                For over 30 years, we've been proud to serve the Largo community with authentic, 
                delicious pizza and a welcoming atmosphere. From Taylor Park to the Disc Golf course, 
                we're your neighborhood pizza spot.
              </p>
              <p className="text-lg text-muted-foreground mb-8">
                Our mission is simple: enriching the lives of our community one pizza at a time. 
                Whether you're grabbing a quick slice after a round of disc golf or bringing the 
                family in for dinner, we're here to make your day better.
              </p>
              <div className="grid grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#D32F2F] mb-2">30+</div>
                  <div className="text-sm text-muted-foreground">Years Serving</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#FBC02D] mb-2">18</div>
                  <div className="text-sm text-muted-foreground">Beers on Tap</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-[#388E3C] mb-2">100%</div>
                  <div className="text-sm text-muted-foreground">Fresh Daily</div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <MapPin className="w-6 h-6 text-[#D32F2F]" />
                  <h3 className="text-xl font-bold">Location</h3>
                </div>
                <p className="text-muted-foreground">
                  1200 Eighth AVE SW<br />
                  Largo, FL 33770
                </p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Phone className="w-6 h-6 text-[#D32F2F]" />
                  <h3 className="text-xl font-bold">Call Us</h3>
                </div>
                <p className="text-muted-foreground">(727) 581-1101</p>
              </div>

              <div className="bg-card rounded-2xl p-6 border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <Clock className="w-6 h-6 text-[#D32F2F]" />
                  <h3 className="text-xl font-bold">Hours</h3>
                </div>
                <p className="text-muted-foreground">
                  Mon-Thu: 11am - 10pm<br />
                  Fri-Sat: 11am - 11pm<br />
                  Sunday: 12pm - 9pm
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section> */}

      {/* Badges Section */}
      <section className="py-12 px-6 bg-[#D32F2F] text-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap items-center justify-center gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="flex items-center gap-3"
            >
              <Award className="w-8 h-8" />
              <span className="text-lg">Established 30+ Years</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <Beer className="w-8 h-8" />
              <span className="text-lg">18 Beers on Tap</span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3"
            >
              <Pizza className="w-8 h-8" />
              <span className="text-lg">Gluten-Free Available</span>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}