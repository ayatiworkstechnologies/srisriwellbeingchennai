"use client";

import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";
import { products } from "./productsData";

export default function ProductGrid() {
  return (
    <section className="section-padding bg-white pt-0">
      <div className="container-width">
        {/* Banner Image */}
        <RevealOnScroll>
          <div className="relative w-full h-[300px] md:h-[450px] mb-16 rounded-3xl overflow-hidden shadow-xl">
            <Image
              src="https://static.wixstatic.com/media/dd33b5_203a1d0fd4c74417989b7a4f0b32d157~mv2.png/v1/fill/w_1200,h_600,al_c,q_90/Relax%20scroll%20image.png"
              alt="Products Collection Banner"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8 md:p-12">
               <h2 className="text-3xl md:text-4xl font-serif text-white max-w-lg">
                 Traditional Wisdom, Modern Purity.
               </h2>
            </div>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product, index) => (
            <RevealOnScroll key={product.id} delay={index * 0.1}>
              <div className="group cursor-pointer rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#d0a93d]/30 flex flex-col h-full">
                <div className="relative mb-6 aspect-square w-full overflow-hidden rounded-xl bg-[#f9f6f0]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1 text-xs font-medium text-[#c29a2f]">
                    {product.category}
                  </div>
                </div>
                <h3 className="mb-2 font-serif text-xl font-medium text-[#3b2218]">
                  {product.name}
                </h3>
                <p className="text-sm text-[#5c4a41]/80 leading-relaxed flex-grow">
                  {product.description}
                </p>
                <div className="mt-6 flex items-center text-sm font-medium text-[#c29a2f] transition-colors group-hover:text-[#a07c22]">
                  Explore Product
                  <svg className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
