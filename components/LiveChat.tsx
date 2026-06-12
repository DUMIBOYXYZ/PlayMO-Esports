"use client";

import { useEffect, useState } from "react";
import { ref, onValue, push } from "firebase/database";
import { db } from "@/lib/firebase";

type Message = {
  id?: string;
  user: string;
  message: string;
  time: number;
};

export default function LiveChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState<string>("");

  useEffect(() => {
    const msgRef = ref(db, "messages");

    onValue(msgRef, (snapshot) => {
      const data = snapshot.val();

      if (data) {
        const formatted: Message[] = Object.entries(data).map(
          ([id, value]: any) => ({
            id,
            ...value,
          })
        );

        setMessages(formatted);
      } else {
        setMessages([]);
      }
    });
  }, []);

  const sendMessage = () => {
    if (!text.trim()) return;

    push(ref(db, "messages"), {
      user: "Guest",
      message: text,
      time: Date.now(),
    });

    setText("");
  };

  return (
    <div style={{ background: "#111", color: "#fff", padding: 10 }}>
      <h3>🔥 Live Chat</h3>

      <div style={{ height: 200, overflowY: "auto" }}>
        {messages.map((msg) => (
          <div key={msg.id}>
            <b>{msg.user}</b>: {msg.message}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 10 }}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type message..."
          style={{ width: "70%" }}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}