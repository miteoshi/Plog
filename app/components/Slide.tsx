"use client";

import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { useEffect, useRef } from "react";
import BeamsBackground from "./BeamsBackground";
import type { SlideContent } from "../type";

interface SlideProps {
  content: SlideContent;
  id: number;
  totalSlides: number;
}


export default function Slide({ content, id, totalSlides }: SlideProps) {
  const router = useRouter();
  const pathname = usePathname();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const pathSegments = pathname.split("/").filter(Boolean);

  const handleNavigation = (newPath: string | number) => {
    if (typeof newPath === "string") {
      router.replace(newPath);
    } else {
      const newUrl = `${pathname.split("/").slice(0, -1).join("/")}/${newPath}`;
      router.replace(newUrl);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "ArrowRight" && id < totalSlides) {
      handleNavigation(id + 1);
    } else if (event.key === "ArrowLeft" && id > 1) {
      handleNavigation(id - 1);
    }
  };

    const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
      touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
      touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      if (touchStartX.current === null || touchEndX.current === null) return;
      const swipeDistance = touchStartX.current - touchEndX.current;
      const minSwipeDistance = 50;

      if (swipeDistance > minSwipeDistance && id < totalSlides) {
        handleNavigation(id + 1);
      } else if (swipeDistance < -minSwipeDistance && id > 1) {
        handleNavigation(id - 1);
      }

      touchStartX.current = null;
      touchEndX.current = null;
    };

    const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
      const { clientX, currentTarget } = e;
      const halfWidth = currentTarget.clientWidth / 2;
      if (clientX < halfWidth && id > 1) {
        handleNavigation(id - 1);
      } else if (clientX >= halfWidth && id < totalSlides) {
        handleNavigation(id + 1);
      }
    };


  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative w-full h-[calc(100vh-48px)] flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 z-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >

      <BeamsBackground>
        <SlideContentRenderer content={content} />
      </BeamsBackground>

      <div className="absolute bottom-4 left-4 text-sm opacity-50 p-2">
        {id}/{totalSlides}
      </div>
      </div>
    </div>
  );
}

// Renders different slide types
function SlideContentRenderer({ content }: { content: SlideContent }) {
  switch (content.type) {
    case "ParagraphList":
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="max-w-2xl text-left">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              {content.title}
            </h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
              {content.paragraph}
            </p>
            <ul className="list-disc pl-4 sm:pl-6 mt-4 sm:space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
              {content.list?.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
            {content.links && <SlideLinks links={content.links} />}
          </div>
        </div>
      );

    case "SingleParagraph":
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <div className="max-w-xl text-center">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
              {content.title}
            </h2>
            <p className="text-lg sm:text-xl text-gray-400">
              {content.paragraph}
            </p>
            <p className="text-sm sm:text-sm text-gray-500 mt-5">
              {content.subparagraph}
            </p>
            {content.links && <SlideLinks links={content.links} />}
          </div>
        </div>
      );

    case "GifParagraph":
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <Image
            unoptimized
            src={
              content.gif ||
              "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
            }
            alt="GIF"
            width={500}
            height={300}
            priority
            className="mb-4 mx-auto rounded-lg shadow-lg"
          />
          <p className="max-w-2xl text-left text-base sm:text-lg md:text-xl lg:text-2xl">
            {content.paragraph}
          </p>
          {content.links && <SlideLinks links={content.links} />}
        </div>
      );

    case "GifParagraphList":
return (
  <div className="flex flex-col items-center justify-center min-h-screen p-6">
    {/* Image container with fixed dimensions to prevent layout shifts */}
    <div className="flex-shrink-0">
      <Image
        src={
          content.gif || "https://media.giphy.com/media/JIX9t2j0ZTN9S/giphy.gif"
        }
        alt="GIF"
        width={400}
        height={250}
        priority
        className="rounded-lg shadow-lg mt-5 object-cover"
      />
    </div>

    {/* Text container that adapts based on screen size */}
    <div className="max-w-2xl text-left mt-6">
      <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-2">
        {content.paragraph}
      </p>
      <ul className="list-disc pl-5 text-base sm:text-lg md:text-xl">
        {content.list?.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      {content.links && <SlideLinks links={content.links} />}
    </div>
  </div>
);


    case "ImageText":
      return (
        <div className="flex flex-col md:flex-row-reverse items-center justify-center min-h-screen p-6 space-y-6 md:space-y-0 md:space-x-12">
          <Image
            src={content.image || "https://via.placeholder.com/500"}
            alt="Image"
            width={500}
            height={300}
            priority
            className="w-full md:w-auto rounded-lg shadow-lg"
          />
          <div className="max-w-2xl text-left">
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl">
              {content.paragraph}
            </p>
            {content.links && <SlideLinks links={content.links} />}
          </div>
        </div>
      );

    default:
      return <div>Invalid slide type</div>;
  }
}

// Renders internal & external links
function SlideLinks({ links }: { links: { label: string; href: string }[] }) {
  return (
    <div className="mt-4">
      {links.map((link, index) =>
        link.href.startsWith("http") ? (
          <a
            key={index}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md sm:text-lg text-gray-400 mt-4"
          >
            {link.label}
          </a>
        ) : (
          <Link
            key={index}
            href={link.href}
            rel="noopener noreferrer"
            target="_blank"
            className="text-md sm:text-lg text-gray-400 mt-4"
          >
            {link.label}
          </Link>
        )
      )}
    </div>
  );
}
