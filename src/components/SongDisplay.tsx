import { states } from "@/functions/objects";
import { useState } from "react";

type DisplayProps = {
  song: string;
  artist: string;
  album: string;
  img_link: string;
};
export default function Display({ song, artist, album, img_link }: DisplayProps) {
  return (

    <div className="
      flex
      flex-col
      gap-6
      p-7
    ">
      <div className="flex flex-col bg-card border border-card-line shadow-2xs rounded-xl">
        <div className="p-4  ">
          <div className="
          flex
          flex-col
          items-center
          gap-6
          md:flex-row
          md:gap-8
          rounded-2xl
        ">
            <div>
              <img
                className="size-24 shadow-xl rounded-lg"
                alt={`Album art for ${album}`}
                src={img_link} /
              >
            </div>
            <div className="grid">
              <span className="text-xl font-medium">{song}</span>
              <span className="text-md font-medium text-sky-500">{artist}</span>
              <span className="
              flex
              gap-2
              font-medium
              text-gray-600
              dark:text-gray-400
            ">{album}</span>
              {false &&
                (
                  <span className="flex gap-2 font-medium text-gray-600 dark:text-gray-400">
                    <span>No. 4</span>
                    <span>·</span>
                    <span>2025</span>
                  </span>
                )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
