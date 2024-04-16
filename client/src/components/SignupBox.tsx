"use client";

import React, { useState } from "react";
import Box from "@mui/material/Box";
import CompanyForm from "./BrandSignup/CompanyForm";
import MapBox from "./MapBox";
import ContactForm from "./BrandSignup/ContactForm";
import SocialMediaSelect from "./BrandSignup/SocialMediaSelect";
import ConfirmForm from "./BrandSignup/ConfirmForm";
import ToDashboard from "./ToDashboard";
import { brandSignUp } from "./../actions/brand"

import { useSession } from "next-auth/react";

/* 
  This is the parent component
  This component will control and manage steps and data 
*/

// Step 1: Company Form Info
// Step 2: Contact Form Info
// Step 3: Social Media Selector Info
// Step 4: Confirm Form Data
// Step 5: Redirect to dashboard
interface BrandForm {
  user: string;
  companyName: string;
  industry: string;
  contactPersonName: string;
  contactEmail: string;
  contactPhoneNumber: string;
  location: string;
  preferences: string[];
}

const brandFormData: BrandForm = {
  //TODO: grab userID after initial user signup page
  user: "",
  companyName: "",
  industry: "",
  contactPersonName: "",
  contactEmail: "",
  contactPhoneNumber: "",
  location: "",
  preferences: [],
};

const SignUpBox = async () => {
  const [step, setStep] = useState<number>(0);
  const [formData, setFormData] = useState<BrandForm>(brandFormData);

  const session = useSession();

  // Method to handle the next step
  const handleNextStep = () => {
    setStep((prevStep) => Math.min(prevStep + 1, steps.length - 1));
  };

  // Method to handle the prev step
  const handlePrevStep = () => {
    setStep((prevStep) => Math.max(prevStep - 1, 0));
  };

  // Method to handle the Form Change event
  const handleFormChange = (event: any) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Method to handle the preference change event
  const handlePreferenceChange = (selected: string) => {
    setFormData((prevData) => {
      const preferences = prevData.preferences.includes(selected)
        ? prevData.preferences.filter((preference) => preference !== selected)
        : [...prevData.preferences, selected];
      return { ...prevData, preferences };
    });
  };

  //TODO: Method to submit form
  const handleSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setFormData((prevData) => ({
      ...prevData,
      user: session.data?.user
    }))
    // const { userID, companyName, industry, contactPersonName, contactEmail, contactPhoneNumber, location, preferences } = formData;

    console.log("HELLO", formData);

    try {
      const brandSignUpResponse = await brandSignUp(formData);

      if (brandSignUpResponse && !brandSignUpResponse.error) {
        console.log("REGISTERED BRAND!");
      }
    } catch {
      console.log("Error!");
    }

    return;
  };

  // Steps through rendering the form
  const steps = [
    <CompanyForm
      key="CompanyForm"
      formData={formData}
      handleFormChange={handleFormChange}
      handleNextStep={handleNextStep}
    />,
    <MapBox
      key="MapBox"
      formData={formData}
      handleFormChange={handleFormChange}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <ContactForm
      key="ContactForm"
      formData={formData}
      handleFormChange={handleFormChange}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <SocialMediaSelect
      key="SocialMediaSelect"
      formData={formData}
      handlePreferenceChange={handlePreferenceChange}
      handleNextStep={handleNextStep}
      handlePrevStep={handlePrevStep}
    />,
    <ConfirmForm
      key="ConfirmForm"
      formData={formData}
      handleFormChange={handleFormChange}
      handlePrevStep={handlePrevStep}
      handleNextStep={handleNextStep}
    />,
    <ToDashboard key="ToDashboard" handleNextStep={handleNextStep} />,
  ];

  return (
    <div className="flex justify-center items-center h-auto pt-52">
        <Box
          component="form"
          className="p-5 bg-base-200 rounded-box"
          sx={{ width: "900px", height: "600px", border: "1px solid black" }}
          onSubmit={(e) => handleSubmitForm(e)}
        >
          {/* Render Form Parts Here */}
          {steps[step]}
        </Box>
    </div>
  );
};

export default SignUpBox;