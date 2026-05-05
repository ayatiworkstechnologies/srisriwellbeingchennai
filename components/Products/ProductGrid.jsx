"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import RevealOnScroll from "../Main/RevealOnScroll";
import { products } from "./productsData";
import { FiX } from "react-icons/fi";

export default function ProductGrid() {
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProduct]);

  return (
    <section className="section-padding bg-white pt-0 relative">
      <div className="container-width p-5">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {products.map((product, index) => (
            <RevealOnScroll key={product.id} delay={index * 0.1}>
              <div
                onClick={() => setSelectedProduct(product)}
                className="group cursor-pointer rounded-2xl border border-black/5 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:border-[#d0a93d]/30 flex flex-col h-full"
              >
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
                  View Product
                  <svg
                    className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity"
          onClick={() => setSelectedProduct(null)}
        >
          <div
            className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative shadow-2xl animate-fadeUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 backdrop-blur-md hover:bg-black/20 text-white transition-colors"
              aria-label="Close modal"
            >
              <FiX className="text-xl" />
            </button>

            {/* Image Side */}
            <div className="w-full md:w-1/2 relative min-h-[300px] md:min-h-full bg-[#f9f6f0]">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.name}
                fill
                className="object-cover"
              />
              <div className="absolute top-6 left-6 rounded-full bg-white/90 backdrop-blur-sm px-4 py-1.5 text-sm font-medium text-[#c29a2f] shadow-sm">
                {selectedProduct.category}
              </div>
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center overflow-y-auto">
              <h3 className="text-3xl md:text-4xl font-serif text-[#3b2218] mb-4">
                {selectedProduct.name}
              </h3>
              <div className="w-12 h-[3px] rounded-full bg-gradient-to-r from-[#e7d58f] to-[#c79f31] mb-6" />

              <p className="text-[#5c4a41] leading-relaxed text-lg mb-8">
                {selectedProduct.description}
              </p>

              <div className="space-y-4 mb-8">
                <div>
                  <h4 className="text-sm font-semibold text-[#1f1a17] uppercase tracking-wider mb-2">
                    Key Benefits
                  </h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-[#5c4a41]">
                      <span className="text-[#c79f31] mt-0.5">•</span>
                      Formulated with 100% authentic Ayurvedic herbs.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[#5c4a41]">
                      <span className="text-[#c79f31] mt-0.5">•</span>
                      Supports holistic healing and natural balance.
                    </li>
                    <li className="flex items-start gap-2 text-sm text-[#5c4a41]">
                      <span className="text-[#c79f31] mt-0.5">•</span>
                      Free from artificial additives and harsh chemicals.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="mt-auto pt-6 border-t border-[#f2eee9]">
                <button className="w-full py-4 rounded-full bg-[#3b2218] text-white font-medium hover:bg-[#c29a2f] transition-all duration-300 shadow-[0_4px_15px_rgba(59,34,24,0.2)] hover:shadow-[0_8px_25px_rgba(194,154,47,0.3)]">
                  Enquire Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
