"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, MessageSquare, Send, X, Bot, CreditCard, Radio } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiGlobalStandardEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toFixed(1),
        status: sol >= 100 ? "SOLANA PRO" : "HODLER",
        id: Math.floor(1000 + Math.random() * 9000)
      });
    } catch (e) { alert("Invalid Address"); } finally { setLoading(false); }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = `WAGMI-CARD-EXTREME.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white flex flex-col items-center p-6 font-sans selection:bg-cyan-500 overflow-hidden">
      
      {/* --- Dynamic Background Neon Pulse --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.1, 0.25, 0.1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-[-15%] w-[500px] h-[500px] bg-cyan-600/20 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ opacity: [0.1, 0.25, 0.1] }} 
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 right-[-15%] w-[500px] h-[500px] bg-purple-600/20 blur-[150px] rounded-full" 
        />
        <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)`, backgroundSize: '50px 50px' }} />
      </div>

      <div className="relative z-10 w-full max-w-3xl flex flex-col items-center mt-12">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-center">
          <h1 className="text-8xl md:text-[10rem] font-black italic tracking-tighter leading-none bg-gradient-to-b from-white to-gray-800 bg-clip-text text-transparent">WAGMI</h1>
          <p className="text-[10px] font-mono tracking-[1.2em] text-cyan-400 uppercase mb-16 font-black italic">Universal Solana Terminal</p>
        </motion.div>

        {/* Professional Search Module */}
        <div className="w-full max-w-lg mb-20 space-y-4">
          <div className="relative group p-[1px] rounded-[2rem] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent focus-within:via-cyan-400 transition-all">
            <input 
              className="w-full bg-black/80 backdrop-blur-xl p-6 rounded-[2rem] text-center font-mono text-lg outline-none border border-white/5" 
              placeholder="PASTE SOLANA ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button onClick={analyze} disabled={loading} className="w-full py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-white transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)] active:scale-95">
             {loading ? "INITIALIZING SCAN..." : "SCAN IDENTITY"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-12">
              
              {/* --- THE ULTIMATE NEON PULSING CARD --- */}
              <div className="relative group">
                {/* Active Neon Aura (Glow behind the card) */}
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.02, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-[2.5rem]" 
                />

                <div ref={cardRef} className="relative w-[340px] md:w-[520px] aspect-[1.58/1] bg-[#080808] rounded-[2.5rem] p-10 border border-cyan-400/40 shadow-[0_0_60px_rgba(0,0,0,1)] overflow-hidden">
                  
                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`, backgroundSize: '15px 15px' }} />
                  
                  {/* Glowing Perimeter Pulse (Internal line) */}
                  <motion.div 
                    animate={{ opacity: [0.2, 0.5, 0.2] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-[2px] border border-cyan-400/30 rounded-[2.5rem] pointer-events-none shadow-[inset_0_0_20px_rgba(6,182,212,0.1)]" 
                  />

                  <div className="relative z-10 h-full flex flex-col justify-between">
                    {/* Top Header */}
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                          <Layers size={24} className="text-cyan-400" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-black italic text-white uppercase tracking-tight leading-none">Identity Pass</p>
                          <p className="text-[9px] font-mono text-white/30 tracking-tighter mt-1 uppercase">ID: //SOL-{data.id} * TERMINAL//</p>
                        </div>
                      </div>
                      <Radio className="text-cyan-500 animate-pulse" size={24} />
                    </div>

                    {/* Central Area: Chip & Balance */}
                    <div className="flex items-center gap-6 text-left">
                      <div className="w-14 h-11 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg border border-white/10 shadow-inner flex flex-col p-1 gap-1">
                          <div className="h-full w-full border-r border-b border-white/10 opacity-40" />
                      </div>
                      <div>
                          <h2 className="text-5xl font-black tracking-tighter drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">{data.sol}</h2>
                          <p className="text-[10px] font-mono text-white/40 tracking-[0.4em] uppercase leading-none">NETWORK_ASSET_SOL</p>
                      </div>
                    </div>

                    {/* Bottom Status & Info */}
                    <div className="flex justify-between items-end border-t border-white/5 pt-6">
                      <div className="text-left">
                          <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest italic mb-1">ACCESS GRANTED</p>
                          <p className="text-[11px] font-black italic tracking-tight text-white/80">CLASS: //{data.status}</p>
                      </div>
                      <div className="flex items-center gap-2 bg-cyan-500/10 px-4 py-2 rounded-xl border border-cyan-500/20 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                          <span className="text-[9px] font-black text-cyan-400 uppercase">Verified</span>
                          <ShieldCheck size={16} className="text-cyan-400" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Action */}
              <button onClick={saveCard} className="flex items-center gap-4 bg-white/5 border border-white/10 px-14 py-6 rounded-[2rem] font-black text-[11px] uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95 group">
                DOWNLOAD IDENTITY <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Corporate Footer */}
        <div className="mt-40 pt-10 border-t border-white/5 pb-20 w-full opacity-40 text-center">
           <p className="text-[10px] font-mono tracking-[0.8em] uppercase italic text-gray-500 font-bold mb-4">
             Architected by <span className="text-white border-b border-cyan-500">Bader Alkorgli</span>
           </p>
        </div>
      </div>
    </div>
  );
}