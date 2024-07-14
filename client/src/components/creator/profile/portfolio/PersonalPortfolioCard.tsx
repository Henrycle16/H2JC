"use client";

import React, { useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import Image from "next/legacy/image";

import { creatorContentInfo } from "@/redux/slices/creatorPortfolio-slice";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";

type Props = {
  contentId?: number;
  uri: string;
};

const PersonalPortfolioCard = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageStyle = isHovered ? { filter: "grayscale(1)" } : {};
  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className="relative">
      {props.uri ? (
        <Image
          src={props.uri}
          alt="personal content"
          width={666}
          height={1000}
          objectFit="cover"
          className="rounded"
          style={imageStyle}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        />
      ) : (
        <div className="">Image not available</div>
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
