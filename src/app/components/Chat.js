"use client";

import { useState } from "react";
import { InputMessage } from "./InputMessage";
import { Message } from "./Message";

export const Chat = () => {
  const [messages, setMessages] = useState([]);

  const getFormData = (messages) => {
    const formData = new FormData();

    files?.forEach((file, index) => {
      formData.append(`files[${index}]`, file.file);
      formData.append(`files[${index}].name`, file.file.name);
      formData.append(`files[${index}].type`, file.file.type);
    });
    formData.append("messages", JSON.stringify(messages));
    return formData;
  };

  const sendMessageToAssistant = async (formData) => {
    try {
      return fetch("/api/openai", {
        method: "POST",
        body: formData,
      }).then((res) => res.json());
    } catch (error) {
      console.log(error);
    }
  };

  const getAnswerSystem = async (formData) => {
    const { answer } = await sendMessageToAssistant(formData);
    return answer;
  };

  const initialMessage = (message, role) => {
    setMessages((currentMessages) => [
      ...currentMessages,
      { role, content: message },
    ]);
  };

  const setAnswerAssistantMessage = (answer) => {
    setMessages((currentMessage) => {
      const lastMessage = currentMessage.at(-1);
      lastMessage.content = answer;
      return [...currentMessage];
    });
  };

  const sendMessage = async (message, files) => {
    initialMessage(message, "user");
    initialMessage(null, "assistant");
    const formData = getFormData(
      [...messages, { role: "user", content: message }],
      files
    );
    const answer = await getAnswerSystem(formData);
    setAnswerAssistantMessage(answer);
  };

  return (
    <section className="bg-black box-border relative h-screen py-6">
      <div className="h-full max-w-5xl border border-gray-400 flex flex-col w-full m-auto rounded-xl bg-gray-800 overflow-hidden">
        <div className="flex-1 relative">
          <div className=" absolute inset-0 overflow-y-scroll">
            {messages.map((message, index) => {
              return <Message key={index} message={message} />;
            })}
          </div>
        </div>
        <InputMessage sendMessage={sendMessage} />
      </div>
    </section>
  );
};
