"use client";

import { Button } from "@mui/material";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MapboxMap from "./MapBox";

interface LocationBoxProps {
  handleLocationChange: (location: string) => void;
  handleNextStep: () => void;
  handlePrevStep: () => void;
  handleFormChange: (event: any) => void;
  formData: any;
}

const LocationBox = ({
  formData,
  handleLocationChange,
  handleFormChange,
  handleNextStep,
  handlePrevStep,
}: LocationBoxProps) => {
  return (
    <div className="grid grid-cols-9 grid-rows-9 gap-4 w-full h-full">
      {/* Back Button */}
      <div className="col-start-1 col-span-1 row-start-1 row-span-1 justify-end">
        <Button
          onClick={handlePrevStep}
          variant="text"
          startIcon={<ArrowBackIcon />}
          className="col-span-1"
          sx={{ padding: "12px 24px" }}
        >
          back
        </Button>
      </div>

      {/* Location Box */}
      <div className="col-start-3 col-span-5 row-start-2 row-span-1 justify-center items-center">
        <label className="form-control w-full">
          <div className="label">
            <span className="label-text font-bold text-lg">
              {" "}
              Where are you located?{" "}
            </span>
          </div>
        </label>
      </div>

      {/* Map */}
      <div className="col-start-3 col-span-5 row-start-2 row-span-5 pt-12">
        <MapboxMap isFormData= {formData.location} handleLocationChange={handleLocationChange} />
      </div>

      {/* Next Button */}
      <div className="col-start-8 col-span-1 row-start-8 row-span-1 justify-end pt-5">
        <Button
          disabled={!formData.location }
          onClick={handleNextStep}
          type="submit"
          variant="contained"
          endIcon={<ArrowForwardIcon />}
          className="col-span-1"
          sx={{ padding: "12px 24px" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default LocationBox;