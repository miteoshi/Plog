import BeamsBackground from "./components/BeamsBackground";
export const me = [
  <div key="1" className="w-full mx-auto text-center px-4 sm:px-6">
    <BeamsBackground className="flex flex-col items-center justify-center min-h-screen p-6">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-white">
        Piyush Joshi
      </h1>
      <p className="text-md sm:text-lg text-gray-400 mt-4">
        From Mumbai, India
      </p>

      <div className="flex justify-center space-x-4 mt-2">
        <a
          href="mailto:piyushjb72@hotmail.com"
          className="text-gray-200 no-underline"
        >
          Mail
        </a>
        <a
          href="https://www.linkedin.com/in/piyush-j-oshi/"
          className="text-gray-200 no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/miteoshi"
          className="text-gray-200 no-underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>
      <a
        href="/about/1"
        className="w-fit block mx-auto mt-5 text-gray-500 no-underline"
      >
        {"<- Back to home"}
      </a>
    </BeamsBackground>
  </div>,

  // Slide 2: Objective
  <div key="2" className="w-full max-w-screen-md mx-auto px-4 sm:px-6">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">Objective</h1>
    <p className="text-base sm:text-lg text-gray-700 leading-relaxed">
      Seeking an opportunity to work with a dynamic organization that powers the
      digital revolution. Logical and organized individual with a strong
      foundation in web and app development. Aspiring to start a career as an
      entry-level professional with a renowned IT company.
    </p>
  </div>,

  // Slide 3: Work Experience - O.S. Infotech
  <div key="3" className="w-full max-w-screen-md mx-auto px-4 sm:px-6">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
      Work Experience - O.S. Infotech
    </h1>
    <p className="text-base sm:text-lg text-gray-700">
      Web Developer Intern (Sep 2022 - Oct 2022)
    </p>
    <ul className="list-disc pl-4 sm:pl-6 mt-4 sm:space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
      <li>Designed a relational database using MySQL.</li>
      <li>Implemented frontend in HTML using EJS and Bootstrap.</li>
      <li>Built backend in Node.js with Express.js framework.</li>
      <li>Followed MVC architecture for development.</li>
    </ul>
  </div>,

  // Slide 4: Work Experience - Lokal Kitchen
  <div key="4" className="w-full max-w-screen-md mx-auto px-4 sm:px-6">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">
      Work Experience - Lokal Kitchen
    </h1>
    <p className="text-base sm:text-lg text-gray-700">
      React Native Developer Intern (May 2022 - Jul 2022)
    </p>
    <ul className="list-disc pl-4 sm:pl-6 mt-4 sm:space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
      <li>Assisted lead developer in building apps from scratch.</li>
      <li>
        Designed app architecture and handled user location and authentication.
      </li>
      <li>Integrated Dunzo Tracking and Google Geolocation APIs.</li>
    </ul>
  </div>,

  // Slide 5: Education
  <div key="5" className="w-full max-w-screen-md mx-auto px-4 sm:px-6">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">Education</h1>
    <ul className="list-disc pl-4 sm:pl-6 sm:space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
      <li>Kendriya Vidyalaya ONGC Panvel - Secondary (9 CGPA) (2016-2017)</li>
      <li>
        Kendriya Vidyalaya ONGC Panvel - Senior Secondary (75%) (2018-2019)
      </li>
      <li>
        Pillai College of Engineering - B.Tech in Computer Engineering (80.36%)
        (2019-2023)
      </li>
    </ul>
  </div>,

  // Slide 6: Projects
  <div key="6" className="w-full max-w-screen-md mx-auto px-4 sm:px-6">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">Projects</h1>
    <ul className="list-disc pl-4 sm:pl-6 sm:space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
      <li>
        Word Map (React Native, 2023) - Location-sharing app that converts
        locations into three unique words.
      </li>
      <li>
        CVRP for Disaster Relief (React, MongoDB, Flask, 2022) - Route planner
        for trucks in disaster relief.
      </li>
      <li>
        News DApp (Firebase, Solidity, 2021) - Web app to verify news integrity.
      </li>
      <li>
        Maid App (React Native, Firebase, 2020) - Mobile app for hiring maids
        online.
      </li>
    </ul>
  </div>,

  // Slide 7: Certifications
  <div key="7" className="w-full max-w-screen-md mx-auto px-4 sm:px-6">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">Certifications</h1>
    <ul className="list-disc pl-4 sm:pl-6 sm:space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
      <li>
        University of Michigan - Retrieving, Processing and Visualizing Data
        with Python
      </li>
      <li>IBM - Network Security and Database Vulnerabilities</li>
      <li>Johns Hopkins University - The Data Scientist’s Toolbox</li>
      <li>University of Michigan - Introduction to HTML5</li>
    </ul>
  </div>,

  // Slide 8: Skills
  <div key="8" className="w-full max-w-screen-md mx-auto px-4 sm:px-6">
    <h1 className="text-3xl sm:text-4xl font-bold mb-4">Skills</h1>
    <ul className="list-disc pl-4 sm:pl-6 sm:space-y-2 text-base sm:text-lg text-gray-700 leading-relaxed">
      <li>Frontend: ReactJS, React Native, TypeScript, HTML, CSS</li>
      <li>Backend: Node.js, Express.js, GraphQL</li>
      <li>Databases: MongoDB, SQL, Firebase</li>
      <li>Programming: JavaScript, Python, Java, C</li>
      <li>Others: Docker, Git, API Integration</li>
    </ul>
  </div>,
];
