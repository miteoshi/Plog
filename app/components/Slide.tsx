"use client";

import { useRouter, usePathname } from "next/navigation";

import { useEffect, useRef } from "react";
import BeamsBackground from "./BeamsBackground";
import type { SlideContent } from "../type";
import { Para,} from "./Para";
import { Opener } from "./Opener";
import { ImagePara,} from "./ImagePara";
import { ParaSideImage } from "./ParaSideImage";
import { CodePara, } from "./CodePara";
import { Menu } from "./Menu";


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
       
          <SlideContentRenderer content={content} />
        

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
    case "Menu":
      return <Menu content={content} />;
    default:
      return <div>Invalid slide type</div>;
  }
}
