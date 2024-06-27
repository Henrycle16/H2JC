"use client";

import { useState } from "react";
import FileUpload from "../FileUpload";

// TODO: Add logic to reset form fields after successfully submitting form

const AddPersonal = () => {

  const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    (document.getElementById(`add_content_modal`) as HTMLDialogElement).close();
  };

  return (
    <dialog id="add_content_modal" className="modal">
      <div className="modal-box bg-white text-[#061119] min-w-[60rem] pt-10 pl-14 pr-10 pb-8">
        {/* Header Text */}
        <div className="">
          <h1 className="text-[#184465] font-semibold text-2xl">
            Add New Personal Content
          </h1>
          <p className="pb-4 pt-2 text-sm">
            Display your personal content for brands to see. You can either paste a URL or upload your content.
          </p>
        </div>
        {/* Form */}
        <form method="dialog" onSubmit={onFormSubmit}>
          {/* Input Fields Container */}
          <div className="w-full flex flex-col">
            <label
              htmlFor="url"
              className="text-[#4A4A4A] block font-bold pr-5"
            >
              Paste a link to your social media post or video
            </label>
            <input
              type="url"
              id="url"
              name="url"
              className="mt-1 py-3 px-3 pl-6 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:border-[#3798E3] sm:text-sm"
              placeholder="URL Link"
            />
          </div>

          <div className="flex justify-center items-center gap-3 mt-10">
            <span className="border-t border-gray-300 flex-1"></span>
            <span className="font-bold">OR</span>
            <span className="border-t border-gray-300 flex-1"></span>
          </div>

          <div className="flex flex-col mt-10">
            <p className="text-[#4A4A4A] block font-bold pr-5">
              Upload your photo or video
            </p>
            <div>
                <FileUpload />
            </div>
          </div>

          {/* Action Buttons -- if there is a button in form, it will close the modal */}
          <div className="flex justify-end mt-10">
            <button
              type="submit"
              className="bg-[#3798E3] text-white font-bold py-3 px-6 capitalize rounded-md hover:bg-[#2C7AB6]"
            >
              Save
            </button>
          </div>
          <button
            onClick={() => {
              (
                document.getElementById(
                  `add_content_modal`
                ) as HTMLDialogElement
              ).close();
              // TODO: Add logic to show unsaved changes modal if there are any changes
              // (document.getElementById(`unsaved_modal`) as HTMLDialogElement).showModal();
            }}
            type="button"
            className="btn btn-lg btn-circle btn-ghost outline-none absolute right-4 top-2 text-lg"
          >
            ✕
          </button>
        </form>
      </div>
    </dialog>
  );
};

export default AddPersonal;