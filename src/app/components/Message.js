import clsx from "clsx";

export const Message = ({ message }) => {
  const { role, content } = message;
  const isUser = role === "user";
  return (
    <article
      className={clsx(
        "w-full text-base px-3 py-4 flex items-center justify-end gap-3 text-white border-b border-b-white",
        isUser ? "bg-blue-900" : "bg-blue-600 flex-row-reverse"
      )}
    >
      {content}
      <span className="min-w-12 h-12 bg-black text-xl flex justify-center rounded-lg items-center font-semibold">
        {isUser ? "U" : "S"}
      </span>
    </article>
  );
};
