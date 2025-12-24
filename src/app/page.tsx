"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, ShieldCheck, Download, Cpu, Star, Crown } from 'lucide-react';
import { toPng } from 'html-to-image';
import { saveAs } from 'file-saver';

export default function WagmiGlobalVIP() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const downloadCard = async () => {
    if (cardRef.current === null) return;
    try {
      // تحسين الدقة لتعمل بشكل ممتاز على شاشات الموبايل
      const dataUrl = await toPng(cardRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        backgroundColor: '#000' 
      });
      saveAs(dataUrl, `WAGMI_VIP_${address.slice(0,4)}.png`);
    } catch (err) {
      console.error("Save failed", err);
      alert("Please take a screenshot for now, we are optimizing mobile downloads.");
    }
  };

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483", 'confirmed');
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1_000_000_000;
      
      setData({
        sol: solAmount,
        status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "SOLANA CITIZEN",
        id: Math.floor(1000 + Math.random() * 9000),
        rank: solAmount >= 100 ? "PREMIUM" : "STANDARD"
      });
      setLoading(false);
    } catch (err) {
      alert("Invalid Address");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white flex flex-col items-center justify-start font-sans overflow-hidden py-10 px-4">
      
      {/* Dynamic Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-xl text-center">
        <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter mb-4 bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">WAGMI</h1>
        <p className="text-[9px] font-mono tracking-[0.6em] text-cyan-400 uppercase mb-12">Universal Identity Terminal</p>

        <div className="space-y-4 mb-16">
          <input 
            className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-center font-mono text-sm outline-none focus:border-cyan-500/50 backdrop-blur-xl"
            placeholder="ENTER SOLANA ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button onClick={analyzeWallet} disabled={loading} className="w-full h-16 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-cyan-500 transition-all active:scale-95 shadow-2xl">
            {loading ? "INITIALIZING..." : "SCAN IDENTITY"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-8">
              
              {/* THE GLOBAL VIP CARD */}
              <div ref={cardRef} className="relative w-full aspect-[1.58/1] max-w-md bg-gradient-to-br from-[#1a1a1a] to-[#000] rounded-3xl p-8 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group">
                
                {/* Holographic Overlays */}
                <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
                <div className="absolute -inset-[100%] bg-gradient-to-tr from-transparent via-white/5 to-transparent rotate-45 animate-[shimmer_5s_infinite] pointer-events-none" />

                <div className="relative z-10 h-full flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <Crown className="text-yellow-500" size={16} />
                        <span className="text-[10px] font-black uppercase tracking-widest text-white/80">Wagmi VIP Access</span>
                      </div>
                      <span className="text-[8px] font-mono text-white/30 tracking-widest">NO. {data.id}</span>
                    </div>
                    <Cpu className="text-cyan-500/50" size={24} />
                  </div>

                  <div className="py-4">
                    <p className="text-[8px] font-mono text-white/20 uppercase mb-1 italic">Identity Tier</p>
                    <h2 className="text-3xl md:text-4xl font-black italic tracking-tighter text-white uppercase">{data.status}</h2>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/10 pt-4">
                    <div className="space-y-1">
                      <p className="text-[8px] font-mono text-white/20 uppercase tracking-widest italic">Solana Balance</p>
                      <div className="flex items-baseline gap-1">
                         <span className="text-3xl font-black tracking-tighter">{data.sol.toFixed(2)}</span>
                         <span className="text-xs font-light text-cyan-400">SOL</span>
                      </div>
                    </div>
                    <div className="text-right">
                       <p className="text-[8px] font-mono text-white/20 uppercase mb-1">Pass Status</p>
                       <span className="bg-white/10 px-3 py-1 rounded-full text-[9px] font-black text-cyan-400 border border-cyan-400/20 tracking-tighter">VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={downloadCard}
                className="flex items-center gap-3 bg-white/5 border border-white/10 px-10 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
              >
                <Download size={14} /> Download Digital ID
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 py-10 border-t border-white/5 opacity-40">
           <div className="flex justify-center gap-8 text-[9px] font-black uppercase tracking-widest mb-6">
              <span>Solana</span><span>Jupiter</span><span>Helius</span>
           </div>
           <p className="text-[10px] font-mono tracking-[0.5em] uppercase italic">Designed by Bader Alkorgli</p>
        </div>
      </motion.div>

      <style jsx global>{`
        @keyframes shimmer {
          0% { transform: translateX(-150%) rotate(45deg); }
          100% { transform: translateX(150%) rotate(45deg); }
        }
      `}</style>
    </div>
  );
}