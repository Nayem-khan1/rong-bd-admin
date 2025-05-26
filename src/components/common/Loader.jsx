import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white dark:bg-gray-900">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
        <div className="absolute inset-2 bg-blue-500 rounded-full opacity-20 blur-md"></div>
      </div>
    </div>
  );
};

export default Loader;
