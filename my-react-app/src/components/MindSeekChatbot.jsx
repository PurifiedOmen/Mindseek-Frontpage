import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User } from 'lucide-react';
import './MindSeek.css';

export default function MindSeekChatbot() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm MindSeek, your supportive companion. How are you feeling today?"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Replace with your actual API key
  const GEMINI_API_KEY = 'YOUR_API_KEY_HERE';

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: `You are MindSeek, a supportive AI assistant for students. Respond empathetically and concisely.\nStudent: ${userMessage}`
                  }
                ]
              }
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            }
          })
        }
      );

      const data = await response.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      } else {
        throw new Error('Unexpected response format');
      }
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      setMessages(prev => [
        ...prev,
        { role: 'assistant', content: "Sorry, I can't connect right now. Please try again." }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="mindseek-container">
      {/* Header */}
      <div className="mindseek-header">
        <div className="header-content">
          <div className="logo-circle"><Bot size={28} /></div>
          <div>
            <h1 className="title">MindSeek</h1>
            <p className="subtitle">Your mental wellness companion</p>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="chat-area">
        <div className="messages-container">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.role === 'user' ? 'user-row' : 'assistant-row'}`}>
              <div className={`avatar ${msg.role === 'user' ? 'user-avatar' : 'assistant-avatar'}`}>
                {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
              </div>
              <div className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
                <p>{msg.content}</p>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="message-row assistant-row">
              <div className="avatar assistant-avatar"><Bot size={20} /></div>
              <div className="message-bubble assistant-bubble">
                <div className="typing-indicator">
                  <div className="dot"></div><div className="dot"></div><div className="dot"></div>
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="input-area">
        <div className="input-container">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Share what's on your mind..."
            className="message-input"
            disabled={isLoading}
          />
          <button onClick={sendMessage} disabled={isLoading || !input.trim()} className="send-button">
            <Send size={24} />
          </button>
        </div>
        <p className="crisis-text">
          If you're in crisis, please reach out to a trusted adult or call 988 (Suicide & Crisis Lifeline)
        </p>
      </div>
    </div>
  );
}
