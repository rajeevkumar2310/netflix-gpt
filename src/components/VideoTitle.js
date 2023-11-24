import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className="w-screen aspect-video pt-[20%] px-24 absolute text-white bg-gradient-to-r from-black">
      <h1 className="font-bold text-4xl">{title}</h1>
      <p className="py-6 text-lg w-1/4">{overview}</p>
      <div>
        <button className="px-10 py-2 m-2 rounded-sm text-black bg-white hover:bg-opacity-80">
          Play
        </button>
        <button className="px-6 py-2 m-2 rounded-sm bg-gray-700 text-white hover:bg-opacity-80">
          More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
