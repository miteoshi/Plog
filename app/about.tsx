import BeamsBackground from "./components/BeamsBackground";
import Link from "next/link";

export const about = [
  // Slide 1: Title Slide
  <div key="1" className="w-full mx-auto text-center px-4 sm:px-6">
    <BeamsBackground className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
        Plog
      </h1>
      <p className="text-lg sm:text-xl text-gray-400">
        A minimalistic blog site.
      </p>
      <p className="text-sm sm:text-sm text-gray-500 mt-5">
        Use arrow keys or tap left/right to navigate slides.
      </p>
    </BeamsBackground>
  </div>,
  <div key="1" className="w-full mx-auto text-center px-4 sm:px-6">
    <BeamsBackground className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-3xl sm:text-5xl lg:text-5xl font-bold mb-4 text-white">
        Piyush Joshi
      </h1>
      <a href="/me/1" className="text-md sm:text-lg text-gray-400 mt-4">
        {"Get to know me ->"}
      </a>

      <div className="flex justify-center space-x-4 mt-2">
        <a href="mailto:piyushjb72@hotmail.com" className="text-gray-200">
          Mail
        </a>
        <a
          href="https://www.linkedin.com/in/piyush-j-oshi/"
          className="text-gray-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/miteoshi"
          className="text-gray-200"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
    </BeamsBackground>
  </div>,
];
