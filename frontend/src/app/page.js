'use client';
import Header from "@/components/Header";
import Message from "@/components/Message";
import axios from "axios";
import { useState, useEffect, useRef } from "react";

export default function Home() {

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [isDisabled, setIsDisabled] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsDisabled(true);

    const userQuery = userInput;
    setUserInput('');

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        sender: "You",
        content: userQuery,
        type: "message"
      },
    ]);

    axios.post('http://127.0.0.1:8000/api/query', { query: userQuery }).then((response) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "RAG",
          content: response.data.answer,
          type: "message"
        },
      ]);
      setIsDisabled(false);
    }).catch((error) => {
      var form = document.getElementById("messagingForm");
      form.remove();

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          sender: "RAG",
          content: "An error occurred while fetching the response. Please try again.",
          type: "error"
        },
      ]);
    });
  }

  return (
    <main className="w-[100svw] max-[768px]:w-screen max-[768px]:px-10 h-[100svh] bg-zinc-900 flex flex-col items-center">
      <Header />

      <section className="w-[768px] max-[768px]:w-full flex-grow gap-4 flex flex-col overflow-y-scroll pr-4 pb-4">
        {messages.length >= 1 &&
          messages.map((message, index) => (
            <Message key={index} className="mb-4" sender={message.sender} content={message.content} />
          ))}
        <div ref={messagesEndRef} />
      </section>

      <form className="w-[768px] max-[768px]:w-screen h-[40px] max-[768px]:px-10 flex flex-col justify-around gap-2 mb-16" id="messagingForm" onSubmit={handleSubmit}>

        <div className="py-3 bg-zinc-800 rounded-3xl flex items-center">
          <input
            type="text"
            autoComplete="off"
            className="w-[90%] h-full bg-transparent text-white pl-4 rounded-3xl focus:border-none focus:outline-none"
            placeholder="Type a message"
            value={userInput}
            onChange={(e) => { setUserInput(e.target.value) }}
          />
          <button
            type="submit"
            className="w-[10%] h-full text-white rounded-3xl disabled:text-zinc-400"
            disabled={isDisabled}
          >
            Send
          </button>
        </div>

        <p className="text-center">This model was made by LLaMA3.1 and groq</p>
      </form>
    </main>
  );
}
