"use client";

import React, { useState } from "react";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import Image from "next/legacy/image";

type Props = {
  id: number;
  imageURI: string;
};

const PersonalPortfolioCard = (props: Props) => {
  const [isHovered, setIsHovered] = useState(false);

  const imageStyle = isHovered ? { filter: "grayscale(1)" } : {};

  return (
    <div className="relative">
      <Image
        src={props.imageURI}
        alt="image"
        width={1000}
        height={1000}
        objectFit="cover"
        className="rounded"
        style={imageStyle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
      {isHovered && (
        <>
          <ModeEditOutlineOutlinedIcon
            sx={{ color: "#3798E3", fontSize: 25 }}
            className="border-2 border-[#3798E3] rounded-full p-[.12rem] absolute top-2 right-2 cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          />
          <DeleteOutlineIcon 
          sx={{ color: "red", fontSize: 25 }}
          className="p-[.12rem] absolute bottom-4 left-2 cursor-pointer"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}/>
        </>
      )}
    </div>
  );
};

export default PersonalPortfolioCard;
