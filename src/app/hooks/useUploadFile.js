import { useState } from "react";

const useUploadFile = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const deleteFile = (id) => {
    setSelectedFiles((currentFiles) => {
      const files = currentFiles.filter((file) => file.id !== id);
      return files;
    });
  };

  const resetFiles = () => {
    setSelectedFiles([]);
  };

  const getFilesDataArray = async (files) => {
    return Array.from(files).map((file, index) => {
      return {
        file,
        id: Date.now() + index,
      };
    });
  };

  const handleFilesChange = async (event) => {
    const files = event?.target?.files;

    if (files && files.length > 0) {
      setIsLoading(true);
      const filesDataArray = await getFilesDataArray(files);
      setSelectedFiles((currentImages) => [
        ...currentImages,
        ...filesDataArray,
      ]);
      setIsLoading(false);
    }
  };

  return {
    selectedFiles,
    isLoading,
    handleFilesChange,
    deleteFile,
    resetFiles,
    setSelectedFiles,
  };
};

export { useUploadFile };
