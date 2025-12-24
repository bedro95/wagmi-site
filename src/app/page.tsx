"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Download, Activity, Cpu, Globe, Share2 } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiUltimate() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // دالة توليد الأصوات الإلكترونية (تم إصلاحها لتعمل مع تفاعل المستخدم)
  const playElectronicSound = (freq: number, duration: number) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.1, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch (e) { console.log("Sound blocked by browser"); }
  };

  const analyzeWallet = async () => {
    if (!address) return;
    
    // تشغيل صوت "بدء المسح"
    playElectronicSound(150, 0.2);
    
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

      // محاكاة وقت التحليل للإثارة
      setTimeout(() => {
        playElectronicSound(440, 0.5); // صوت "النجاح"
        const topTokens = ["SOL", "JUP", "PYTH", "BONK", "WIF", "RAY"];
        setData({
          sol: solAmount,
          tokens: tokenAccounts.value.length,
          winRate: (68 + Math.random() * 28).toFixed(1),
          status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
          bigWinToken: topTokens[Math.floor(Math.random() * topTokens.length)],
          bigWinMultiplier: (3 + Math.random() * 8).toFixed(2),
          address: address.slice(0, 4) + "..." + address.slice(-4)
        });
        setLoading(false);
      }, 2000);
    } catch (err) {
      alert("Invalid Address");
      setLoading(false);
    }
  };

  const downloadAndShare = async () => {
    if (cardRef.current === null) return;
    const dataUrl = await toPng(cardRef.current, { pixelRatio: 3 });
    const link = document.createElement('a');
    link.download = `WAGMI-CARD.png`;
    link.href = dataUrl;
    link.click();
    window.open(`https://twitter.com/intent/tweet?text=Verified my Solana ID on WAGMI ⚡`, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white flex flex-col items-center py-10 px-6 font-sans overflow-x-hidden">
      
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, #06b6d4 0%, transparent 50%)', filter: 'blur(100px)' }} />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative z-10 w-full max-w-xl text-center">
        
        <h1 className="text-8xl font-black tracking-tighter italic text-white mb-2 italic">Wagmi</h1>
        <div className="flex items-center justify-center gap-3 mb-12">
            <Activity className="text-cyan-500 animate-pulse" size={16} />
            <span className="text-[10px] font-mono tracking-[0.6em] text-cyan-500 font-bold uppercase">System Active v13.0</span>
        </div>

        {/* Input UI */}
        <div className="space-y-4 mb-16">
          <input 
            className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-center font-mono text-xl outline-none focus:border-cyan-500/50 backdrop-blur-2xl transition-all"
            placeholder="PASTE_WALLET_ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet}
            disabled={loading}
            className="w-full h-20 bg-gradient-to-r from-cyan-500 to-blue-600 text-black rounded-3xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all"
          >
            {loading ? "SCANNING NETWORK..." : "RUN ANALYSIS"} <Zap size={20} fill="currentColor" />
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
              
              {/* Artistic Card */}
              <div ref={cardRef} className="p-10 rounded-[3rem] bg-[#050505] border border-white/10 text-left relative overflow-hidden mb-6">
                
                {/* Scanner Laser Effect */}
                <motion.div 
                    animate={{ y: [0, 400, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute top-0 left-0 w-full h-[2px] bg-cyan-500/50 shadow-[0_0_15px_#06b6d4] z-20"
                />

                <div className="flex justify-between items-center mb-10">
                   <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[10px] font-mono text-cyan-400">ID: {data.address}</div>
                   <ShieldCheck className="text-cyan-500" size={24} />
                </div>

                <div className="space-y-8">
                  <div>
                    <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1">Portfolio Tier</p>
                    <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter">{data.status}</h2>
                  </div>

                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                    <p className="text-[9px] font-mono text-cyan-500 font-bold uppercase mb-1 italic tracking-widest">Master Gain</p>
                    <h3 className="text-3xl font-black text-white italic">{data.bigWinToken} <span className="text-cyan-500 ml-2">+{data.bigWinMultiplier}x</span></h3>
                  </div>

                  <div className="pt-6 border-t border-white/5">
                    <p className="text-[10px] font-mono text-gray-500 uppercase mb-2">Total Net Worth</p>
                    <p className="text-6xl font-black text-white tracking-tighter">
                        {data.sol.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xl text-cyan-500 ml-2">SOL</span>
                    </p>
                  </div>
                </div>
              </div>

              <button 
                onClick={downloadAndShare}
                className="w-full h-16 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all mb-10"
              >
                <Download size={20} /> Capture & Share on X
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Footer & Credits */}
        <div className="mt-10 pt-10 border-t border-white/5">
          <div className="flex justify-center gap-8 opacity-30 text-[9px] font-black uppercase tracking-widest mb-6">
             <span>Solana</span> <span>Helius</span> <span>Jupiter</span>
          </div>
          <p className="text-[10px] font-mono tracking-[0.5em] text-gray-600 font-bold uppercase italic">
            Developed by <span className="text-white">Bader Alkorgli</span>
          </p>
        </div>

      </motion.div>
    </div>
  );
}