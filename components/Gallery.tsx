"use client";

import Image from "next/image";
import db from "@/app/db/gallery.json";
import { useState, useRef, useEffect } from "react";

type gallery = {
  img: string;
  location: string;
};

const Gallery = () => {
  const [selectedImg, setSelectedImg] = useState<number>(0);
  const [imgPop, setImgPop] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  // Handle popup visibility transition
  useEffect(() => {
    if (imgPop) {
      setTimeout(() => setIsVisible(true), 10); // small delay for fade-in
      document.body.style.overflow = "hidden";
    } else {
      setIsVisible(false); // triggers fade-out
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [imgPop]);

  // Detect click outside popup
  const handleBackgroundClick = (event: React.MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setIsVisible(false); // start fade-out
    }
  };

  // Close popup after fade-out finishes
  const handleTransitionEnd = () => {
    if (!isVisible) {
      setImgPop(false);
    }
  };

  // Navigate gallery
  const swipeImg = (moveType: string) => {
    if (moveType === "prv") {
      setSelectedImg((prev) => (prev === 0 ? db.gallery.length - 1 : prev - 1));
    }
    if (moveType === "nxt") {
      setSelectedImg((prev) => (prev === db.gallery.length - 1 ? 0 : prev + 1));
    }
  };

  return (
    <>
    <section className="relative z-10 px-4 sm:px-6 lg:px-8 py-12">
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Main Gallery Section with Background */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/img/gallery_background.jpeg" 
            alt="Gallery Background"
            fill
            className="object-cover"
            priority
          />
          {/* Gradient overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 px-4 sm:px-6 lg:px-8">
          {/* Image Grid */}
          <div className="mt-4 flex flex-wrap items-center justify-center gap-0 pb-20">
            {db.gallery.map((loc: gallery, i: number) => (
              <div
                key={i}
                onClick={() => {
                  setSelectedImg(i);
                  setImgPop(true);
                }}
                className="w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)] xl:w-[calc(25%-12px)] 2xl:w-[calc(20%-13px)] cursor-pointer group"
              >
                <div className="relative overflow-hidden rounded-lg shadow-2xl transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-3xl">
                  <Image
                    src={`/gallery/${loc.img}`}
                    alt={loc.location}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {/* Image overlay */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-all duration-300"></div>
                  {/* Location label */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <p className="text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      {loc.location}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Popup Modal (unchanged) */}
      {imgPop && (
        <div
          onClick={handleBackgroundClick}
          onTransitionEnd={handleTransitionEnd}
          className={`fixed inset-0 bg-black bg-opacity-85 z-50 flex justify-center items-center transition-opacity duration-300 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          <div
            ref={popupRef}
            className="relative flex flex-col items-center gap-4"
          >
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute top-1 right-2 text-white text-4xl z-10 hover:text-red-600"
            >
              &times;
            </button>

            {/* Prev Arrow */}
            <button
              onClick={() => swipeImg("prv")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 hover:text-blue-500"
            >
              &#8592;
            </button>

            {/* Image Display */}
            <div className="relative w-full max-w-[90vw] h-[60vh] flex flex-col items-center justify-center">
              <Image
                src={`/gallery/${db.gallery[selectedImg].img}`}
                alt={db.gallery[selectedImg].location}
                fill
                sizes="90vw"
                className="object-contain max-w-screen-xl max-h-[90vh] w-auto h-auto rounded shadow-lg relative"
              />

              <h3 className="text-white text-2xl mt-4 uppercase font-semibold text-center">
                {db.gallery[selectedImg].location}
              </h3>
            </div>

            {/* Next Arrow */}
            <button
              onClick={() => swipeImg("nxt")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl z-10 hover:text-blue-500"
            >
              &#8594;
            </button>

            {/* Thumbnails */}
            <div className="hidden lg:flex gap-2 mt-6">
              {db.gallery.map((loc: gallery, i: number) => (
                <Image
                  key={i}
                  src={`/gallery/${loc.img}`}
                  alt={loc.location}
                  width={80}
                  height={80}
                  onClick={() => setSelectedImg(i)}
                  className={`cursor-pointer border ${
                    selectedImg === i
                      ? "border-white"
                      : "border-transparent"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}
      </div>
      </section>
    </>
  );
};

export default Gallery;