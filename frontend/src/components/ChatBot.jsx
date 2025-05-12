import React, { useState } from 'react';
import './ChatBot.css';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Olá! Como posso ajudar você hoje?' },
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() === '') return;
    const userMessage = { from: 'user', text: input };
    const botResponse = { from: 'bot', text: 'Entendi. Em breve, uma consultora entrará em contato com você.' };
    setMessages((prev) => [...prev, userMessage, botResponse]);
    setInput('');
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.from}`}>{msg.text}</div>
        ))}
      </div>
      <div className="chatbot-input">
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Digite sua mensagem..." />
        <button onClick={handleSend}>Enviar</button>
      </div>
    </div>
  );
};

export default ChatBot;
