import React from 'react';
import Lottie from 'react-lottie-player';
import animationData from '../../src/Assets/animations/Animation - policeman.json';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <div className="herosection overflow-hidden relative">
      {/* Login and Register Links */}
      <div className="absolute top-8 right-16 flex items-center gap-4">
        <a
          href="/login"
          className="text-blue-600 text-lg font-semibold hover:underline"
        >
          Login
        </a>
        <a
          href="/register"
          className="text-blue-600 text-lg font-semibold hover:underline "
        >
          Register
        </a>
      </div>

      {/* Background Blur Effects */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-blue-500 to-indigo-500 opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-right justify-center gap-20 py-20 sm:py-36 lg:py-77">
        {/* Left Section: Animation */}
        <div className="-mt-14 lg:w-1/2 flex justify-center ">
          <Lottie
            loop
            animationData={animationData}
            play
            style={{ width: '400px', height: '400px' }}
          />
        </div>

        {/* Right Section: Text Content */}
        <div className="mt-6 text-center lg:text-left lg:w-2/3">
          <div className="ml-28 hidden sm:mb-5 sm:flex sm:justify-center lg:justify-start">
            <div className="relative rounded-full px-3 py-1 text-sm/7 text-gray-600 ring-1 ring-gray-900/11 hover:ring-gray-900/20 ml-20">
              Introducing the next-gen crime management service.
            </div>
          </div>
          <h1 className="ml-28 text-balance text-5xl font-bold tracking-tight text-gray-900 sm:text-7xl">
            CRIME-SECURE
          </h1>
          <p className="ml-24 mt-3 text-lg font-medium text-gray-500 sm:text-xl/7">
            Justice at Your Fingertips – Streamlined, Secure, and Swift.
          </p>
          <div className="-ml-12 mt-10 flex items-center justify-center gap-x-7">
            <Link to="/login"
              className="-ml-12 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Get started
            </Link>
            <a href="#learn" className="text-sm/6 font-semibold text-gray-900">
              Learn more <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;