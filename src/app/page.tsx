cat << 'EOF' > src/app/page.tsx
"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, TrendingUp, Download, Activity, MessageSquare, Send, X, Bot, Cpu } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiFinalBuild() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<any>({ SOL: 0, JUP: 0, BTC: 0, WIF: 0, BONK: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: string, text: string}[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const fetchPrices = async () => {
    try {
      const [binanceRes, jupRes] = await Promise.all([
        fetch('https://api.binance.com/api/v3/ticker/price?symbols=["SOLUSDT","BTCUSDT"]'),
        fetch('https://api.jup.ag/price/v2?ids=JUP,WIF,BONK')
      ]);
      const bData = await binanceRes.json();
      const jData = await jupRes.json();
      setPrices({
        SOL: bData.find((t: any) => t.symbol === "SOLUSDT")?.price || 0,
        BTC: bData.find((t: any) => t.symbol === "BTCUSDT")?.price || 0,
        JUP: jData.data?.JUP?.price || 0,
        WIF: jData.data?.WIF?.price || 0,
        BONK: jData.data?.BONK?.price || 0,
      });
    } catch (e) { console.error("Update prices failed"); }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000);
    return () => clearInterval(interval);
  }, []);

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    setData(null);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", 'confirmed');
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(key, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });

      setData({
        sol: solAmount,
        tokens: tokenAccounts.value.length,
        winRate: (75 + Math.random() * 20).toFixed(1),
        status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
        address: address.slice(0, 4) + "..." + address.slice(-4)
      });
      setLoading(false);
    } catch (err) {
      alert("Invalid Address");
      setLoading(false);
    }
  };

  const handleChat = async () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatHistory(prev => [...prev, { role: 'user', text: userMsg }]);
    setChatInput('');
    setIsTyping(true);

    try {
      const context = data ? "User Wallet: " + data.sol + " SOL, Status: " + data.status : "User is exploring Wagmi.";
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, context: context })
      });
      const result = await response.json();
      setChatHistory(prev => [...prev, { role: 'bot', text: result.text || "I am currently syncing. Try again." }]);
    } catch (e) {
      setChatHistory(prev => [...prev, { role: 'bot', text: "AI Service connection error." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col font-sans overflow-x-hidden selection:bg-cyan-500/30">
      <div className="w-full bg-white/[0.03] border-b border-white/5 py-2.5 px-6 flex gap-8 items-center z-50 backdrop-blur-md overflow-x-auto scrollbar-hide">
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"/>
          <span className="text-[9px] font-mono font-black text-cyan-400 uppercase">Live_Market</span>
        </div>
        <div className="flex gap-10 text-[9px] font-mono font-bold uppercase whitespace-nowrap">
           <span>SOL <span className="text-white">${Number(prices.SOL).toFixed(2)}</span></span>
           <span>JUP <span className="text-white">${Number(prices.JUP).toFixed(4)}</span></span>
           <span>BTC <span className="text-yellow-500">${Number(prices.BTC).toLocaleString()}</span></span>
        </div>
      </div>

      <div className="flex flex-col items-center py-16 md:py-24 px-5 relative z-10 w-full max-w-2xl mx-auto">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center mb-16">
          <h1 className="text-7xl md:text-9xl font-black tracking-tighter italic leading-none mb-4">WAGMI</h1>
          <div className="flex items-center justify-center gap-3 text-cyan-500">
            <Cpu size={14} />
            <p className="text-[10px] font-mono tracking-[0.6em] font-black uppercase italic">Neural Terminal v22.5</p>
          </div>
        </motion.div>

        <div className="w-full space-y-4 mb-20 px-2">
          <input className="w-full bg-white/5 border border-white/10 p-6 md:p-8 rounded-[2rem] text-center font-mono text-lg outline-none focus:border-cyan-500 transition-all shadow-inner" placeholder="ENTER_SOL_ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
          <button onClick={analyzeWallet} disabled={loading} className="w-full h-16 md:h-24 bg-white text-black rounded-[2rem] font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-cyan-500 active:scale-95 transition-all shadow-xl">
            {loading ? "SCANNING..." : "ANALYZE WALLET"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="w-full">
              <div ref={cardRef} className="p-10 md:p-14 rounded-[3rem] md:rounded-[4rem] bg-[#050505] border border-white/10 text-left relative overflow-hidden mb-8 shadow-2xl">
                <motion.div animate={{ y: [0, 600, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500 z-20 shadow-[0_0_15px_cyan]"/>
                <div className="flex justify-between items-center mb-16">
                   <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[9px] font-mono text-cyan-400 font-bold uppercase italic tracking-tighter">ID: {data.address}</div>
                   <ShieldCheck className="text-cyan-500 shrink-0" size={24} />
                </div>
                <div className="space-y-12">
                  <div>
                    <p className="text-[9px] font-mono text-gray-600 uppercase tracking-widest font-bold mb-2 italic">Identity Class</p>
                    <h2 className="text-5xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-none">{data.status}</h2>
                  </div>
                  <div className="pt-8 border-t border-white/5">
                    <p className="text-[9px] font-mono text-gray-600 uppercase mb-3 font-bold italic tracking-widest">Balance Assessment</p>
                    <p className="text-6xl md:text-8xl font-black text-white tracking-tighter">
                        {data.sol.toFixed(2)} <span className="text-2xl md:text-3xl text-cyan-500 font-light italic">SOL</span>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="w-full bg-[#050505] border border-white/10 rounded-[2.5rem] p-10 text-left shadow-2xl mb-24 backdrop-blur-md">
           <div className="grid grid-cols-2 gap-4 md:gap-6 font-mono text-sm">
              {[
                { sym: 'SOL', price: prices.SOL, color: 'text-cyan-400' },
                { sym: 'JUP', price: prices.JUP, color: 'text-purple-400' },
                { sym: 'WIF', price: prices.WIF, color: 'text-yellow-500' },
                { sym: 'BONK', price: prices.BONK, color: 'text-orange-400' }
              ].map((token) => (
                 <div key={token.sym} className="bg-white/[0.03] p-5 rounded-2xl border border-white/5">
                    <p className="text-gray-600 text-[8px] mb-1 font-black uppercase tracking-widest">{token.sym}</p>
                    <p className={`text-base md:text-xl font-black ${token.color} italic tracking-tighter`}>
                      ${token.price > 0 ? Number(token.price).toFixed(token.sym === 'BONK' ? 6 : 2) : "---"}
                    </p>
                 </div>
              ))}
           </div>
        </div>

        <div className="w-full pt-10 border-t border-white/5 text-center">
          <p className="text-[11px] font-mono tracking-[0.5em] text-gray-600 font-bold uppercase italic">
            Developed by <span className="text-white">Bader Alkorgli</span>
          </p>
        </div>
      </div>

      <div className="fixed bottom-6 right-6 z-[100]">
        <button onClick={() => setIsChatOpen(!isChatOpen)} className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center shadow-2xl">
          {isChatOpen ? <X size={28} className="text-black" /> : <MessageSquare size={28} className="text-black" />}
        </button>
        <AnimatePresence>
          {isChatOpen && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="absolute bottom-20 right-0 w-[320px] md:w-[380px] h-[500px] bg-[#0A0A0A] border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-3xl">
              <div className="p-6 border-b border-white/5 bg-white/5 flex items-center gap-3">
                <Bot size={18} className="text-cyan-500"/>
                <h5 className="text-[10px] font-black uppercase tracking-widest">Wagmi Intelligence</h5>
              </div>
              <div className="flex-1 overflow-y-auto p-5 space-y-4 text-[11px] font-mono scrollbar-hide">
                {chatHistory.map((msg, i) => (
                  <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl ${msg.role === 'user' ? 'bg-cyan-500 text-black font-bold' : 'bg-white/5 text-gray-300 border border-white/10'}`}>
                      {msg.text}
                    </div>
                  </div>
                ))}
                {isTyping && <div className="text-[9px] text-cyan-500 font-mono animate-pulse">Gemini is thinking...</div>}
              </div>
              <div className="p-4 bg-black border-t border-white/5 flex gap-2">
                <input className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[11px] outline-none focus:border-cyan-500 text-white" placeholder="Ask Gemini..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleChat()} />
                <button onClick={handleChat} className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center shrink-0"><Send size={16} /></button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
EOF