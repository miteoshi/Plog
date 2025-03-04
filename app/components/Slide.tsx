"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

interface SlideProps {
  content: React.ReactNode;
  id: number;
  totalSlides: number;
}

export default function Slide({ content, id, totalSlides }: SlideProps) {
  const router = useRouter();
  const pathname = usePathname();
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  // Extract correct base path
  const pathSegments = pathname.split("/").filter(Boolean); // Remove empty segments
  const basePath = `/${pathSegments[0]}`; // Always use the first segment (e.g., /me or /docker)

  const handleNavigation = (newId: number) => {
    router.push(`${basePath}/${newId}`);
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
  }, [id]);

  return (
    <div
      className="relative w-full h-[calc(100vh-48px)]"
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="w-full h-full flex flex-col justify-center items-start relative z-10">
        {content}
      </div>
      <div className="absolute bottom-4 left-4 text-sm opacity-50 p-2">
        {id}/{totalSlides}
      </div>
    </div>
  );
}
