import React from "react";
import { useSelector } from "react-redux";
import useGetTrailerVideo from "../customhooks/useGetTrailerVideo";

const VideoBackground = ({ movieID }) => {
  const trailerVideo = useSelector((store) => store.movies?.trailerVideo);
  useGetTrailerVideo(movieID);

  return (
    <div>
      <iframe
        className="h-screen w-full md:h-full md:w-screen md:aspect-video"
        src={
          "https://www.youtube.com/embed/" +
          trailerVideo?.key +
          "?&autoplay=1&mute=1"
        }
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      ></iframe>
    </div>
  );
};

export default VideoBackground;
