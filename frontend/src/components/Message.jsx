import React from "react";
import Markdown from "react-markdown";

export default function Message(props) {
  const path = props.sender == "You" ? "/Images/User.jpg" : "/Images/Stars.png";
  const imgStyle =
    props.sender == "You"
      ? "rounded-full w-7 h-7"
      : "rounded-full w-7 h-7 border-purple-500 border-[2px] p-[2px]";
  const style =
    props.type === "message"
      ? "ml-8 break-words text-white"
      : "ml-8 break-words text-red-500";
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2">
        <img src={path} className={imgStyle} />
        <p>{props.sender}</p>
      </div>

      {props.sender == "RAG" && (
        <Markdown className="ml-8 break-words">{props.content}</Markdown>
      )}

      {props.sender == "You" && (
        <p className="pl-8 break-words">{props.content}</p>
      )}
    </div>
  );
}
