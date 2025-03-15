"use client";

import { useRouter, usePathname } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import BeamsBackground from "./BeamsBackground";
import type { SlideContent } from "../type";
import { Para } from "./Para";
import { Opener } from "./Opener";
import { ImagePara } from "./ImagePara";
import { ParaSideImage } from "./ParaSideImage";
import { CodePara } from "./CodePara";

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

  const basePath = useMemo(
    () => pathname.split("/").slice(0, -1).join("/"),
    [pathname]
  );

  const handleNavigation = (newPath: number) => {
    const newSlideId =
      newPath > totalSlides ? 1 : newPath < 1 ? totalSlides : newPath;
    router.replace(`${basePath}/${newSlideId}`);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (!isNavigationEnabled) return;
    switch (event.key) {
      case "ArrowRight":
        handleNavigation(id + 1);
        break;
      case "ArrowLeft":
        handleNavigation(id - 1);
        break;
    }
  };

  const handleTouch = (
    e: React.TouchEvent<HTMLDivElement>,
    isStart: boolean
  ) => {
    if (e.target instanceof HTMLAnchorElement || !isNavigationEnabled) return;
    (isStart ? touchStartX : touchEndX).current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (
      !isNavigationEnabled ||
      touchStartX.current === null ||
      touchEndX.current === null
    )
      return;
    const swipeDistance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 150;

    if (swipeDistance > minSwipeDistance) handleNavigation(id + 1);
    else if (swipeDistance < -minSwipeDistance) handleNavigation(id - 1);

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLAnchorElement || !isNavigationEnabled) return;
    const { clientX, currentTarget } = e;
    const halfWidth = currentTarget.clientWidth / 2;
    handleNavigation(clientX < halfWidth ? id - 1 : id + 1);
  };

  const toggleNavigation = () => {
    setIsNavigationEnabled((prev) => !prev);
    if (isNavigationEnabled) {
      setShowInfo(true);
      setTimeout(() => setShowInfo(false), 3000);
    }
  };

  useEffect(() => {
    if (id < totalSlides) {
      router.prefetch(`${basePath}/${id + 1}`);
    }
  }, [id, totalSlides, router, basePath]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [id, isNavigationEnabled]);

  const MemoizedSlideContent = useMemo(
    () => <SlideContentRenderer content={content} />,
    [content]
  );

  return (
    <div className="relative w-full h-[calc(100vh-48px)] flex flex-col justify-center items-center">
      <div
        className="absolute inset-0 z-10"
        onTouchStart={(e) => handleTouch(e, true)}
        onTouchMove={(e) => handleTouch(e, false)}
        onTouchEnd={handleTouchEnd}
        onClick={handleClick}
      >
        {MemoizedSlideContent}

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
      return <CodePara content={content} />;
    default:
      return <div>Invalid slide type</div>;
  }
}
