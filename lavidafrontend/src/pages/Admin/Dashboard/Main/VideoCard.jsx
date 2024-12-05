import React from "react";

const VideoCard = ({ image, title, date, comments }) => {
  return (
    <>
      <div className="flex items-center mt-5 w-[90%">
        <div>
          <img src={image} alt="Card Image" className="h-[3rem]" />
        </div>
        <div className="ml-4">
          <h2 className="text-lg text-white">{title}</h2>
          <p className="mb-3 text-gray-500">{date}</p>
        </div>
        <div className="flex-grow mb-5 flex justify-end items-center">
          <div className="text-lg text-white">{comments}</div>
        </div>
      </div>
    </>
  );
};

export default VideoCard;
