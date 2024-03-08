import React, { useEffect, useRef, useState } from "react";
import { IconUpload } from "./IconUpload";
import { useUploadFile } from "@/app/hooks/useUploadFile";
import { Files } from "./Files";

const InputMessage = ({ sendMessage }) => {
  const [message, setMessage] = useState("");
  const textarea = useRef(null);
  const { selectedFiles, handleFilesChange, deleteFile, resetFiles } =
    useUploadFile();

  const handleChange = (event) => {
    const value = event.target.value;
    setMessage(value);
  };

  const handleSendMessage = () => {
    if (message) {
      sendMessage(message, selectedFiles);
      setMessage("");
      textarea.current.focus();
      resetFiles();
    }
  };
  // console.log(selectedFiles, "selectedFiles");
  const handleKeyDown = (event) => {
    // Check if Enter key is pressed without the Shift key
    if (event.key === "Enter" && !event.shiftKey) {
      // Prevent default behavior (new line)
      event.preventDefault();
      // Call function to send message (you can define this)
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (textarea.current) {
      textarea.current.focus();
    }
  }, [textarea.current]);

  return (
    <div className="w-full p-4">
      <div className="bg-slate-500 flex overflow-hidden box-border text-white rounded-lg">
        <div className="flex flex-col flex-1">
          {Boolean(selectedFiles.length) && (
            <Files deleteFile={deleteFile} files={selectedFiles} />
          )}
          <div className="flex items-center">
            <label className="p-2 bg-slate-500 relative flex justify-center items-center cursor-pointer">
              <IconUpload />
              <input
                onChange={handleFilesChange}
                multiple
                type="file"
                className="w-0 h-0 absolute"
              />
            </label>
            <textarea
              value={message}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              ref={textarea}
              className="w-full max-h-8 flex items-center py-1 resize-none bg-transparent outline-none border-none"
            />
          </div>
        </div>
        <div>
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-sm p-3 box-border w-32 h-full text-white"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export { InputMessage };
