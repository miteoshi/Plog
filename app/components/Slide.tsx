"use client";

import { useRouter, usePathname } from "next/navigation";

import { useEffect, useRef, useState } from "react";
import BeamsBackground from "./BeamsBackground";
import type { SlideContent } from "../type";
import { Para,} from "./Para";
import { Opener } from "./Opener";
import { ImagePara,} from "./ImagePara";
import { ParaSideImage } from "./ParaSideImage";
import { CodePara, } from "./CodePara";



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
  const [isNavigationEnabled, setIsNavigationEnabled] = useState(true);
  const [showInfo, setShowInfo] = useState(false);

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
    if (!isNavigationEnabled) return;
    if (event.key === "ArrowRight" && id < totalSlides) {
      handleNavigation(id + 1);
    } else if (event.key === "ArrowLeft" && id > 1) {
      handleNavigation(id - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isNavigationEnabled) return;
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isNavigationEnabled) return;
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!isNavigationEnabled) return;
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
    if (!isNavigationEnabled) return;
    const { clientX, currentTarget } = e;
    const halfWidth = currentTarget.clientWidth / 2;
    if (clientX < halfWidth && id > 1) {
      handleNavigation(id - 1);
    } else if (clientX >= halfWidth && id < totalSlides) {
      handleNavigation(id + 1);
    }
  };

  const toggleNavigation = () => {
      setIsNavigationEnabled((prev) => !prev);
      if (isNavigationEnabled) {
        setShowInfo(true);
        setTimeout(() => setShowInfo(false), 3000); // Hide after 3 seconds
      }
    };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isNavigationEnabled]);

  return (
    <div className="relative w-full h-[calc(100vh-48px)] flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 z-10"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        <SlideContentRenderer content={content} />

        {/* Info Box (Appears when swipe is disabled) */}
        {showInfo && (
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-white text-black px-4 py-2 rounded-md text-sm transition-opacity duration-500 animate-fade">
            Now you can copy the content
          </div>
        )}

        {id !== 1 && (
          <div className="pb-2 flex ml-3 items-center">
            <span className="text-sm text-gray-500">
              {id}/{totalSlides}
            </span>
            <button
              className="text-sm px-3 ml-3 py-1 text-gray-500 rounded-full bg-gray-800/40 hover:bg-gray-700/70 hover:text-gray-200 transition"
              onClick={(e) => {
                e.stopPropagation();
                toggleNavigation();
              }}
            >
              {isNavigationEnabled ? "🔒 Lock Slide" : "🔓 Unlock"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Renders different slide types
function SlideContentRenderer({ content }: { content: SlideContent }) {
 
  switch (content.type) {
    case "ImagePara":
      return <ImagePara content={content} />;

    case "Opener":
      
      return (
        <BeamsBackground>
          <Opener content={content} />
        </BeamsBackground>
      );

    case "Para":
      return <Para content={content} />;

    case "ParaSideImage":
      return <ParaSideImage content={content} />;
    case "CodePara":
      return  <CodePara content={content} />;
    default:
      return <div>Invalid slide type</div>;
  }
}
