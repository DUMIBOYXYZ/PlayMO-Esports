"use client";

import { useEffect, useState } from "react";
import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, ref, onValue, push } from "firebase/database";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getDatabase(app);

type Message = {
  text: string;
  name: string;
  time: number;
};

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("nickname");
    if (savedName) setName(savedName);

    const chatRef = ref(db, "chat");

    onValue(chatRef, (snapshot) => {
      const data = snapshot.val();
      if (!data) return;

      const loaded = Object.values(data) as Message[];
      setMessages(loaded);
    });
  }, []);

  const saveName = (value: string) => {
    setName(value);
    localStorage.setItem("nickname", value);
  };

  const sendMessage = async () => {
    if (!text.trim() || !name.trim()) return;

    const chatRef = ref(db, "chat");

    await push(chatRef, {
      text,
      name,
      time: Date.now(),
    });

    setText("");
  };

  return (
    <div style={{ maxWidth: 400, border: "1px solid #333", padding: 10 }}>
      
      {/* Nickname Input */}
      <input
        placeholder="Enter nickname..."
        value={name}
        onChange={(e) => saveName(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      {/* Chat Box */}
      <div style={{ height: 300, overflowY: "auto", marginBottom: 10 }}>
        {messages.map((m, i) => (
          <p key={i}>
            <b>{m.name}:</b> {m.text}
          </p>
        ))}
      </div>

      {/* Message Input */}
      <input
        placeholder="Type message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={sendMessage} style={{ width: "100%" }}>
        Send
      </button>
    </div>
  );
}