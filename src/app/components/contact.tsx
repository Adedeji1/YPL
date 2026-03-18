import { motion, useScroll, useTransform } from 'motion/react';
import React from 'react';
import { ArrowRight, Beer, Pizza, Award, MapPin, Phone, Clock } from 'lucide-react';

export function Contact () {
  return (
     <section className="py-20 px-6 bg-background">
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
          </section>
    
  );
};