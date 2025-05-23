// app/page.tsx
'use client';
import { useState, useRef, useEffect } from 'react';

// Icons (bereits in dieser Datei definiert)
const CpuChipIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9h8M8 13h8" />
  </svg>
);

const MagicWandIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const PaperAirplaneIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
  </svg>
);

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function Home() {
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Let's build your dream website! Describe it in a few words:" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setMessages(prev => [...prev, { role: 'user', text: inputValue }]);
    setInputValue('');
    setIsTyping(true);
    // hier deine Logik für AI-Antwort
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main className="min-h-screen bg-[#020617] text-fuchsia-50 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-28 pb-20">
        <div className="container mx-auto px-6 text-center md:text-left">
          <h1 className="text-5xl font-bold mb-6">Your AI Co-founder for Web Development</h1>
          <p className="max-w-xl mx-auto md:mx-0 mb-8 text-[#CBD5E1]">
            From idea to live site in 60 seconds. The only tool that codes, designs, and markets for you.
          </p>
          <button className="px-6 py-3 bg-gradient-to-r from-[#00F0FF] to-[#00FF88] rounded-full font-semibold">
            Launch Your Site
          </button>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 bg-gradient-to-b from-[#0a101f] to-[#020617]">
        {/* ... deine weiteren Sections hier einfügen ... */}
      </section>

      {/* Live Demo Chat Section */}
      <section className="py-24">
        <div
          ref={chatContainerRef}
          className="max-w-3xl mx-auto bg-[#111827] rounded-3xl p-6 space-y-4 overflow-y-auto h-96"
        >
          {messages.map((msg, idx) => (
            <div key={idx} className={msg.role === 'user' ? 'text-right' : 'text-left'}>
              <PaperAirplaneIcon className="inline-block w-6 h-6 text-[#00F0FF] mr-2" />
              <span>{msg.text}</span>
            </div>
          ))}
          {isTyping && <div>AI is typing...</div>}
        </div>
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto mt-4 flex space-x-2">
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder="Try 'Modern e-commerce for sneakers'"
            className="flex-grow px-4 py-2 rounded-full bg-[#1f2937] text-white"
          />
          <button type="submit" className="px-4 py-2 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#00FF88]">
            <MagicWandIcon className="w-6 h-6 text-black" />
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#1e293b] py-6 text-center text-[#CBD5E1]">
        © {new Date().getFullYear()} Codaiq. All rights reserved.
      </footer>
    </main>
  );
}
