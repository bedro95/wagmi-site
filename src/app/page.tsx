"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, MessageSquare, Send, X, Bot, CreditCard, Radio } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiExtremeNeonHorizontal() {
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
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' });
    const link = document.createElement('a');
    link.download = `WAGMI-ULTRA-ID.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col items-center p-6 font-sans overflow-hidden">
      
      {/* --- EXTRA POWERFUL SIDE GLOWS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-[-20%] w-[600px] h-[600px] bg-cyan-500/30 blur-[180px] rounded-full" 
        />
        <motion.div 
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1, 1.1, 1] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute top-1/2 right-[-20%] w-[600px] h-[600px] bg-purple-600/30 blur-[180px] rounded-full" 
        />
      </div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center mt-12">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
          <h1 className="text-8xl md:text-[11rem] font-black italic tracking-tighter leading-none bg-gradient-to-b from-white to-gray-800 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">WAGMI</h1>
          <p className="text-[10px] font-mono tracking-[1.5em] text-cyan-400 uppercase mb-20 font-black italic text-center">Universal Solana Terminal</p>
        </motion.div>

        {/* Input UI */}
        <div className="w-full max-w-md mb-24 space-y-6">
            <div className="relative p-[2px] rounded-full bg-gradient-to-r from-cyan-500/50 via-purple-500/50 to-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.2)]">
                <input 
                  className="w-full bg-black rounded-full p-6 text-center outline-none font-mono text-lg border border-white/5 focus:border-cyan-400 transition-all" 
                  placeholder="ENTER WALLET ADDRESS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button onClick={analyze} disabled={loading} className="w-full py-6 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] transition-all active:scale-95">
               {loading ? "SCANNING..." : "SCAN IDENTITY"}
            </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-14">
              
              {/* --- THE ULTRA NEON HORIZONTAL CARD --- */}
              <div 
                ref={cardRef} 
                className="relative w-[340px] md:w-[540px] aspect-[1.58/1] bg-[#050505] rounded-[2.5rem] p-10 overflow-hidden shadow-[0_0_80px_rgba(0,0,0,1)] border border-cyan-400/50"
                style={{ boxShadow: '0 0 40px rgba(6, 182, 212, 0.4), inset 0 0 20px rgba(6, 182, 212, 0.2)' }}
              >
                {/* Background Animation Lines */}
                <div className="absolute inset-0 opacity-[0.05]" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, #fff 1px, transparent 0)`, backgroundSize: '24px 24px' }} />
                
                {/* Internal Pulsing Neon Aura */}
                <motion.div 
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="absolute inset-0 border-[2px] border-cyan-400/30 rounded-[2.5rem] pointer-events-none"
                />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  {/* Top Bar */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-cyan-400/10 rounded-2xl flex items-center justify-center border border-cyan-400/40 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                        <Layers size={28} className="text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
                      </div>
                      <div className="text-left">
                        <p className="text-base font-black italic text-white uppercase tracking-tight">Identity Pass</p>
                        <p className="text-[10px] font-mono text-cyan-400/60 uppercase">ID: //SOL-{data.id} * 9000//</p>
                      </div>
                    </div>
                    <div className="w-12 h-12 bg-cyan-400/20 rounded-full flex items-center justify-center border border-cyan-400/50 shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                        <ShieldCheck size={26} className="text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
                    </div>
                  </div>

                  {/* Middle Balance Section */}
                  <div className="flex items-center gap-8 text-left">
                    <div className="w-16 h-12 bg-gray-900 rounded-lg border border-white/10 flex items-center justify-center shadow-inner relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
                        <CreditCard size={30} className="text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-6xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">{data.sol}</h2>
                        <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.5em] mt-1">SOLANEX_ASSET</p>
                    </div>
                  </div>

                  {/* Bottom Footer Section */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-6">
                    <div className="text-left">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest italic mb-1 drop-shadow-[0_0_8px_#06b6d4]">SYSTEM_ACCESS_GRANTED</p>
                        <p className="text-[12px] font-black italic tracking-tight text-white/90">CLASS: //{data.status}</p>
                    </div>
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-12 h-12 bg-cyan-400 rounded-2xl flex items-center justify-center shadow-[0_0_30px_#06b6d4] border border-white/20"
                    >
                        <Zap size={26} className="text-black" fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
              </div>

              <button onClick={saveCard} className="flex items-center gap-4 bg-cyan-400 text-black px-16 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.6em] hover:scale-105 hover:shadow-[0_0_50px_rgba(6,182,212,0.6)] transition-all active:scale-95 shadow-2xl">
                DOWNLOAD IDENTITY <Download size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}