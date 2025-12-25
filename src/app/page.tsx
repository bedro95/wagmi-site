"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, CreditCard, Radio, Cpu } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiMasterEdition() {
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
        sol: sol.toFixed(2),
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER",
        id: Math.floor(1000 + Math.random() * 9000)
      });
    } catch (e) { 
      alert("Invalid Address. Ensure it's a valid Solana Public Key."); 
    } finally { 
      setLoading(false); 
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { 
        pixelRatio: 3, 
        backgroundColor: '#000',
        cacheBust: true 
      });
      const link = document.createElement('a');
      link.download = `WAGMI-MASTER-ID.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Error saving card. Please try a screenshot.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden selection:bg-cyan-500">
      
      {/* --- EXTREME SIDE GLOW SYSTEM --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1, 1.1, 1] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[-20%] w-[100vw] h-[600px] bg-cyan-600/30 blur-[180px] rounded-full mix-blend-screen" 
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.7, 0.3], scale: [1.1, 1, 1.1] }} 
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2.5 }}
          className="absolute bottom-[-10%] right-[-20%] w-[100vw] h-[600px] bg-purple-700/30 blur-[180px] rounded-full mix-blend-screen" 
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-8 md:mt-20">
        {/* Header Section */}
        <motion.div initial={{ opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center">
          <h1 className="text-7xl md:text-[12rem] font-black italic tracking-tighter leading-none bg-gradient-to-b from-white to-gray-700 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,255,255,0.2)]">WAGMI</h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.3em] text-cyan-400 uppercase mb-20 font-black italic">Terminal Interface 2025</p>
        </motion.div>

        {/* Input UI - Ultra Modern */}
        <div className="w-full max-w-lg mb-24 px-4">
          <div className="group relative p-[1px] rounded-full bg-gradient-to-r from-white/10 to-white/5 focus-within:from-cyan-500 focus-within:to-purple-500 transition-all duration-500 shadow-2xl">
            <input 
              className="w-full bg-black rounded-full p-6 text-center outline-none font-mono text-sm md:text-lg text-white placeholder:opacity-30" 
              placeholder="PASTE WALLET ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={analyze} 
            disabled={loading} 
            className="w-full mt-6 py-6 bg-white text-black rounded-full font-black uppercase text-sm md:text-lg tracking-[0.3em] hover:bg-cyan-400 hover:text-white transition-all shadow-xl active:scale-[0.98] disabled:opacity-50"
          >
            {loading ? "SCANNING NEURAL DATA..." : "AUTHORIZE SCAN"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-14 w-full">
              
              {/* --- MASTER ANIMATED NEON CARD --- */}
              <div className="relative w-full max-w-[580px] aspect-[1.58/1] rounded-[2rem] md:rounded-[3.2rem] p-[4px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                
                {/* RACING BORDER ANIMATION */}
                <div className="absolute inset-[-500%] animate-[spin_5s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                {/* CARD INNER */}
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[1.8rem] md:rounded-[3rem] p-6 md:p-12 overflow-hidden flex flex-col justify-between z-10 border border-white/5">
                  
                  {/* Glass Overlay & Grid */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none" />
                  <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '30px 30px' }} />

                  {/* Top Section */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-4 md:gap-6">
                      <div className="w-12 h-12 md:w-16 md:h-16 bg-white/[0.03] rounded-2xl flex items-center justify-center border border-white/10 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                        <Layers size={28} className="md:w-9 md:h-9 text-cyan-400 drop-shadow-[0_0_8px_#06b6d4]" />
                      </div>
                      <div className="text-left">
                        <p className="text-sm md:text-xl font-black italic text-white uppercase tracking-tighter leading-none">Identity Pass</p>
                        <p className="text-[9px] md:text-[12px] font-mono text-white/30 uppercase mt-1">ID: //SOL-{data.id} * PR-V//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-6 h-6 md:w-10 md:h-10 drop-shadow-[0_0_12px_#06b6d4]" />
                  </div>

                  {/* Center Wealth Section */}
                  <div className="flex items-center gap-6 md:gap-10 text-left">
                    <div className="w-16 h-11 md:w-24 md:h-16 bg-gradient-to-br from-white/10 to-transparent rounded-xl border border-white/10 flex items-center justify-center shadow-inner">
                        <Cpu size={32} className="md:w-12 md:h-12 text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-5xl md:text-8xl font-black tracking-tighter text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)] leading-none">{data.sol}</h2>
                        <p className="text-[9px] md:text-[12px] font-mono text-white/40 tracking-[0.5em] uppercase mt-2 italic font-bold">SOL_LIQUID_RESERVE</p>
                    </div>
                  </div>

                  {/* Bottom Footer Section */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-6 md:pt-10">
                    <div className="text-left">
                        <p className="text-[9px] md:text-[12px] font-black text-cyan-400 uppercase tracking-widest italic mb-1 drop-shadow-[0_0_10px_#06b6d4]">NODE_CONNECTED_SECURE</p>
                        <p className="text-xs md:text-lg font-black italic tracking-tight text-white/90">CLASS: //{data.status}</p>
                    </div>
                    <motion.div 
                        whileHover={{ scale: 1.1 }}
                        className="w-12 h-12 md:w-20 md:h-20 bg-cyan-400 rounded-2xl md:rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(6,182,212,0.6)] border border-white/30"
                    >
                        <Zap size={28} className="md:w-12 md:h-12 text-black" fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={saveCard} 
                className="flex items-center gap-5 bg-white/5 border border-white/10 px-16 py-6 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.6em] hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95 group"
              >
                DOWNLOAD MASTER ID <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Master Footer */}
        <div className="mt-32 pb-20 opacity-20 hover:opacity-100 transition-opacity">
           <p className="text-[10px] font-mono tracking-[1em] uppercase text-gray-500 italic">
             Developed for <span className="text-white">Wagmi</span> by <span className="text-cyan-400 font-black italic border-b border-cyan-500">Bader Alkorgli</span>
           </p>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        body { background-color: black; }
      `}</style>
    </div>
  );
}