import React, { useState, useEffect } from "react";
import * as client from "./client";
interface Message {
  role: string;
  content: string;
  imageUrl?: string;
  revisedPrompt?: string;
  shape?: string;
}
export default function Chat() {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [shape, setShape] = useState("square");
  const [message, setMessage] = useState<string>("");
  const sendMessage = async () => {
    const userMessage = {
      role: "user",
      content: message,
    };
    const response = await client.postMessage(userMessage);
    setConversation([...conversation, userMessage, response]);
    setMessage("");
  };
  const getConversation = async () => {
    const conversation = await client.getConversation();
    setConversation(conversation);
  };
  const requestImage = async () => {
    const response = await client.requestImage({
      content: message,
      shape,
      role: "user",
    });
    setConversation([...conversation, response]);
  };
  useEffect(() => {
    getConversation();
  }, []);
  return (
    <div>
      <h2>Chat</h2>
      <ul className="list-group">
        {conversation.map((message, index) => (
          <li key={index} className="list-group-item">
            {message.imageUrl && (
              <>
                {message.shape === "square" && (
                  <img src={message.imageUrl} width="256" height="256" alt=""/>
                )}
                {message.shape === "portrait" && (
                  <img src={message.imageUrl} height="256" alt=""/>
                )}
                {message.shape === "landscape" && (
                  <img src={message.imageUrl} width="256" alt=""/>
                )}
                <p>{message.revisedPrompt}</p>
              </>
            )}
            {!message.imageUrl && (
              <>
                <strong>{message.role}</strong>:{message.content}
              </>
            )}
          </li>
        ))}
        <li className="list-group-item">
          <button
            onClick={sendMessage}
            className="float-end w-25 btn btn-primary"
          >
            Send
          </button>
          <button onClick={requestImage} className="btn btn-primary">
            Request Image{" "}
          </button>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-75 form-control"
          />
          <select
            className="form-control"
            value={shape}
            onChange={(e) => setShape(e.target.value)}
          >
            <option value="square">Square</option>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
          </select>
        </li>
      </ul>
    </div>
  );
}
