import Image from "next/image";

const ButtonDelete = ({ handleClick }) => {
  return (
    <button
      onClick={handleClick}
      className="rounded-full w-4 h-4 flex justify-center items-center p-1 bg-white z-50 text-gray-500 absolute -top-1 -right-1"
    >
      x
    </button>
  );
};

const File = ({ file, id, deleteFile }) => {
  const type = file.type;
  const name = file.name;
  const isImage = type.includes("image");
  const url = URL.createObjectURL(file);
  const handleDlete = () => {
    deleteFile(id);
  };
  return (
    <div className="relative">
      <ButtonDelete handleClick={handleDlete} />
      {isImage ? (
        <div className="relative w-14 h-14 rounded-md">
          <Image src={url} alt={"preview"} fill className="object-fill" />
        </div>
      ) : (
        <div className="p-2 rounded-md border border-white">
          <div className="flex flex-col justify-between max-w-24">
            <span className="text-ellipsis whitespace-nowrap w-full overflow-hidden text-sm text-white">
              {name}
            </span>
            <span className="text-ellipsis whitespace-nowrap max-w-full overflow-hidden text-sm text-white">
              {type || "File"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const Files = ({ files, deleteFile }) => {
  return (
    <div className="flex flex-wrap gap-3 px-3 pt-3">
      {files.map((file) => {
        return (
          <File
            key={file.id}
            file={file.file}
            deleteFile={deleteFile}
            id={file.id}
          />
        );
      })}
    </div>
  );
};

export { Files };
