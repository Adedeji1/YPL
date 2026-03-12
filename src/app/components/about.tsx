import React from 'react';
import PizzaImg from './asset/IMG_6070.PNG';

export function About() {
  return (
    <section className="flex bg-white py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-3xl mb-14 items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            About Your Pizza Shop
          </h1>

          <p className="mt-4 text-lg text-gray-600">
            A neighborhood pizzeria built on community, passion, and great food.
          </p>
        </div>


        {/* Story Section */}
        <div className="grid gap-16 lg:grid-cols-2 items-center">

          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              Our Story
            </h2>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Since opening our doors in 1992, Your Pizza Shop has been a place
              where friends, families, and neighbors come together over
              incredible food and genuine hospitality. What started as a dream
              to create the best neighborhood pizza shop in Largo has grown into
              a local favorite that continues to serve the community with pride.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              From the beginning, our goal has always been simple: create a
              welcoming place where great food and great company meet. Every
              pizza is handcrafted using fresh ingredients and our signature
              blend of mozzarella and provolone cheese, creating the rich flavor
              and perfect melt our customers love.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              But what truly makes Your Pizza Shop special isn’t just the food —
              it’s the people. Our team is passionate about delivering
              exceptional service and making every guest feel like part of the
              family.
            </p>
          </div>


          {/* Image */}
          <div className="relative">
            <img
              src={PizzaImg}
              alt="Fresh pizza being prepared"
              className="rounded-2xl shadow-lg"
            />
          </div>
        </div>


        {/* Values */}
        <div className="mt-24">

          <h2 className="text-2xl font-semibold text-gray-900 mb-10">
            What We Believe In
          </h2>

          <div className="grid gap-10 md:grid-cols-3">

            <div className="p-6 border rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900">
                Community First
              </h3>
              <p className="mt-3 text-gray-600">
                We’re proud to be part of the Largo community. Our restaurant is
                more than just a place to eat — it’s a gathering place for
                friends, families, and neighbors.
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900">
                Quality Ingredients
              </h3>
              <p className="mt-3 text-gray-600">
                Every dish we serve is made with care using fresh ingredients
                and our signature mozzarella and provolone cheese blend for the
                perfect flavor.
              </p>
            </div>

            <div className="p-6 border rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900">
                Genuine Hospitality
              </h3>
              <p className="mt-3 text-gray-600">
                Our team believes great service is just as important as great
                food. From the moment you walk in, we want you to feel at home.
              </p>
            </div>

          </div>
        </div>


        {/* Mission */}
        <div className="mt-24 bg-gray-50 rounded-2xl p-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-900">
            Our Mission
          </h2>

          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Enriching the lives of our community through excellent hospitality
            while serving delicious food from exceptional people — one pizza at
            a time.
          </p>
        </div>

      </div>
    </section>
  )
}