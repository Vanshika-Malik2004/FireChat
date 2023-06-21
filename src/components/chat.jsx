import React, { useState, useEffect } from "react";

import { db, auth } from "../config/firebase";
import {
  collection,
  addDoc,
  serverTimestamp,
  onSnapshot,
  query,
  where,
  orderBy,
  or,
} from "firebase/firestore";

import "../styles/chats.css";

const Chat = ({ room }) => {
  const [message, setMessage] = useState("");
  const [messagesList, setMessagesList] = useState([]);

  const ChatsRef = collection(db, "messages");

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (message == "") {
      return;
    }

    await addDoc(ChatsRef, {
      text: message,
      createdAt: serverTimestamp(),
      user: auth.currentUser.displayName,
      room,
    });
    setMessage("");
  };

  useEffect(() => {
    const messageQuery = query(
      ChatsRef,
      where("room", "==", room),
      orderBy("createdAt")
    );

    const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
      const updateMessagesList = [];
      snapshot.forEach((doc) => {
        updateMessagesList.push({ ...doc.data(), id: doc.id });
      });
      setMessagesList(updateMessagesList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="chat-app">
      <div className="header">
        <h1>Welcome to: {room.toUpperCase()}</h1>
      </div>

      <div className="messages">
        {messagesList.map((message) => (
          <div key={message.id} className="message">
            <span className="user">{message.user}:</span> {message.text}
          </div>
        ))}
      </div>

      <form
        className="new-message-form"
        onSubmit={(e) => {
          handleSendMessage(e);
        }}
      >
        <input
          placeholder="enter your chats here"
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
          className="new-message-input"
        ></input>
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;
