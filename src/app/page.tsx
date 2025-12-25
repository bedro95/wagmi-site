"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, MessageSquare, Send, X, Bot, ChevronRight } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiCyberNeonEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const saveCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { quality: 1, pixelRatio: 3, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-NEON-ID.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Please take a screenshot for now on mobile devices.");
    }
  };

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toFixed(2),
        status: sol >= 100 ? "LEGENDARY WHALE" : sol >= 10 ? "SOLANA PRO" : "RETAIL TRADER",
        id: Math.floor(100000 + Math.random() * 900000)
      });
    } catch (e) { alert("Invalid Solana Address"); } finally { setLoading(false); }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);
    try {
      const context = data ? `User Wallet: ${data.sol} SOL, Status: ${data.status}` : "Browsing Wagmi Terminal.";
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context: context })
      });
      const result = await response.json();
      setChatHistory(prev => [...prev, { role: 'bot', text: result.text || "AI is currently syncing..." }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'bot', text: "Connection error." }]);
    } finally { setIsTyping(false); }
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center justify-start p-6 font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* Cyber Grid Background */}
      <div className="fixed inset-0 z-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: `linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      
      {/* Dynamic Neon Blurs */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 w-full max-w-2xl mt-12 text-center">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-8xl md:text-[10rem] font-black italic tracking-tighter mb-0 bg-gradient-to-b from-white to-gray-700 bg-clip-text text-transparent leading-none">
            WAGMI
          </h1>
          <p className="text-[10px] font-mono tracking-[1.2em] text-cyan-400 uppercase mb-16 font-black italic">Neural Terminal v25.5</p>
        </motion.div>

        {/* Neon Input Container */}
        <div className="relative group p-[2px] rounded-[2.5rem] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mb-20 shadow-[0_0_30px_rgba(6,182,212,0.15)]">
          <div className="bg-black rounded-[2.5rem] overflow-hidden flex flex-col gap-2 p-2">
            <input 
              className="w-full bg-white/[0.03] p-8 rounded-[2rem] text-center font-mono text-lg outline-none focus:bg-white/[0.06] transition-all placeholder:opacity-30 tracking-widest" 
              placeholder="PASTE SOLANA ADDRESS" 
              value={address} 
              onChange={(e) => setAddress(e.target.value)} 
            />
            <button 
              onClick={analyze} 
              disabled={loading} 
              className="w-full h-20 bg-white text-black rounded-[2rem] font-black text-xl uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all active:scale-[0.98] flex items-center justify-center gap-3"
            >
              {loading ? "SCANNING..." : <>INITIALIZE SCAN <Zap size={20} fill="currentColor" /></>}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-10">
              {/* THE NEON VIP CARD */}
              <div ref={cardRef} className="relative w-full aspect-[1.58/1] max-w-md bg-[#050505] rounded-[3rem] p-10 border border-white/10 shadow-[0_0_50px_rgba(0,0,0,1)] overflow-hidden group">
                {/* Neon Glow Edges */}
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-purple-500 to-transparent" />
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 text-left">
                      <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-inner">
                        <Layers size={22} className="text-cyan-400" />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase text-cyan-400 tracking-tighter">Verified Node</p>
                        <p className="text-[9px] font-mono text-white/20 uppercase tracking-widest italic">ID_{data.id}</p>
                      </div>
                    </div>
                    <ShieldCheck className="text-white/10" size={32} />
                  </div>

                  <div className="text-left space-y-1">
                    <p className="text-[9px] font-mono text-white/20 uppercase tracking-[0.5em] italic">Status Classification</p>
                    <h2 className="text-5xl md:text-6xl font-black italic text-white uppercase tracking-tighter leading-none bg-gradient-to-r from-white to-white/40 bg-clip-text text-transparent">
                      {data.status}
                    </h2>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-6">
                    <div className="text-left">
                      <p className="text-[8px] font-mono text-white/20 uppercase italic mb-1 tracking-widest">Net Worth</p>
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-black text-white">{data.sol}</span>
                        <span className="text-sm font-black text-cyan-400 italic">SOL</span>
                      </div>
                    </div>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-full">
                      <p className="text-[9px] font-black text-cyan-400 tracking-widest uppercase italic leading-none">Access Granted</p>
                    </div>
                  </div>
                </div>
                {/* Scanning Animation */}
                <motion.div animate={{ top: ['0%', '100%', '0%'] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className="absolute left-0 w-full h-[1px] bg-cyan-400/20 blur-[2px] z-20" />
              </div>

              <button onClick={saveCard} className="flex items-center gap-4 bg-white/[0.03] border border-white/10 px-12 py-5 rounded-full font-black text-[10px] uppercase tracking-[0.4em] hover:bg-white hover:text-black transition-all shadow-xl">
                <Download size={16} /> Save Identity Pass
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-40 pt-10 border-t border-white/5 pb-20">
           <div className="flex justify-center gap-12 text-[10px] font-black uppercase tracking-[0.4em] mb-10 opacity-20">
              <span className="hover:text-cyan-400 transition-colors cursor-default">Solana</span>
              <span className="hover:text-orange-500 transition-colors cursor-default">Jupiter</span>
              <span className="hover:text-purple-500 transition-colors cursor-default">Helius</span>
           </div>
           <p className="text-[10px] font-mono tracking-[0.6em] uppercase italic text-gray-600 font-bold">
             Developed by <span className="text-white border-b border-cyan-500/40">Bader Alkorgli</span>
           </p>
        </div>
      </div>

      {/* --- Cyber Chat Widget --- */}
      <div className="fixed bottom-6 right-6 z-[100]">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.3)] hover:scale-110 transition-all border border-white/20">
          {isChatOpen ? <X size={28} className="text-black" /> : <MessageSquare size={28} className="text-black" />}
        </button>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.95 }} className="absolute bottom-24 right-0 w-[320px] md:w-[400px] h-[550px] bg-black border border-cyan-500/20 rounded-[3rem] shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col overflow-hidden backdrop-blur-3xl">
              <div className="p-7 border-b border-white/5 bg-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse" />
                  <h5 className="text-[10px] font-black uppercase tracking-widest">Wagmi Intelligence</h5>
                </div>
                <Bot size={18} className="text-cyan-500/50"/>
              </div>
              <div className="flex-1 overflow-y-auto p-6 space-y-4 text-[11px] font-mono scrollbar-hide">
                {chatHistory.length === 0 && <p className="text-gray-700 text-center mt-20 italic">Encrypted Connection Established...</p>}
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-500 text-black font-black' : 'bg-white/5 text-gray-300 border border-white/10'}`}>{msg.text}</div>
                  </div>
                ))}
                {isTyping && <div className="text-[9px] text-cyan-500 font-mono animate-pulse uppercase tracking-widest">Processing Data...</div>}
              </div>
              <div className="p-5 bg-black border-t border-white/5 flex gap-2">
                <input className="flex-1 bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-[11px] outline-none focus:border-cyan-500/50 text-white font-mono" placeholder="Input Query..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChat()} />
                <button onClick={handleChat} className="w-12 h-12 bg-white text-black rounded-2xl flex items-center justify-center shrink-0 hover:bg-cyan-500 transition-colors"><Send size={18} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}