"use client";

import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/lazy";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/legacy/image";

import { creatorContentInfo } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

type Props = {
  contentId?: number;
  uri: string;
  mediaType: string;
};

const PersonalPortfolioCard = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClient, setIsClient] = useState(false);

  const imageStyle = isHovered ? { filter: "grayscale(1)" } : {};
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <div className="relative">
      {props.uri && isClient ? (
        props.mediaType === "image" ? (
          <Image
            src={props.uri}
            alt="personal content"
            width={500}
            height={400}
            objectFit="cover"
            className="rounded"
            style={imageStyle}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        ) : (
          <div className="w-[17.35rem] h-[13.88rem] max-w-full max-h-full rounded overflow-hidden">
            <ReactPlayer
              url={props.uri}
              light={true}
              width="100%"
              height="100%"
              playIcon={<></>}
            />
          </div>
        )
      ) : (
        <div className="">Media not available</div>
      )}
      {isHovered && (
        <>
          <ModeEditOutlineOutlinedIcon
            sx={{ color: "#3798E3", fontSize: 25 }}
            className="border-2 border-[#3798E3] rounded-full p-[.12rem] absolute top-2 right-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => {
              dispatch(creatorContentInfo({ currentContent: props }));
              (
                document.getElementById(
                  `edit_content_modal`
                ) as HTMLDialogElement
              ).showModal();
            }}
          />
          <DeleteOutlineIcon
            sx={{ color: "#FF0000" }}
            onClick={() => {
              dispatch(
                creatorContentInfo({
                  currentContent: {
                    contentId: props.contentId,
                  },
                })
              );
              (
                document.getElementById(
                  "delete_content_modal"
                ) as HTMLDialogElement
              ).showModal();
            }}
            className="p-[.12rem] absolute bottom-4 left-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
        </>
      )}
    </div>
  );
};

export default PersonalPortfolioCard;
