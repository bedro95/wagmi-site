"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, Radio, Cpu, Github, ExternalLink, Activity, Globe } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiEliteTerminalV3() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const handleScan = async () => {
    if (!address || address.length < 32) {
      alert("Please enter a valid Solana address");
      return;
    }
    setLoading(true);
    setData(null); 
    try {
      const connection = new Connection("https://api.mainnet-beta.solana.com", "confirmed");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key).catch(() => 0);
      const sol = balance / 1_000_000_000;

      let currentStatus = sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER";
      let assetLabel = "SOL";

      if (address.toLowerCase().includes('troll')) {
        currentStatus = "TROLL HODLER";
        assetLabel = "TROLL";
      }

      setData({
        sol: sol.toFixed(2),
        status: currentStatus,
        asset: assetLabel,
        id: Math.floor(1000 + Math.random() * 9000)
      });

      setTimeout(() => {
        const el = document.getElementById('result-view');
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);

    } catch (e) { 
      alert("Connection error. Please try again."); 
    } finally { 
      setLoading(false); 
    }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* --- ULTRA NEON BACKGROUND --- */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-cyan-500/30 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-purple-600/20 blur-[180px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
      </motion.div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          {/* LOGO FIX: المتناسق مع الحرف i المثالي */}
          <h1 className="text-[12vw] md:text-[10rem] font-serif font-black italic tracking-tighter leading-none bg-gradient-to-b from-white via-white to-gray-600 bg-clip-text text-transparent drop-shadow-[0_0_50px_rgba(255,255,255,0.3)] select-none">
            WAGMI
          </h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 font-black italic mb-16 drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
            NEURAL TERMINAL v3.0
          </p>
        </motion.div>

        <div className="w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full blur opacity-40 group-focus-within:opacity-100 transition duration-1000"></div>
            <input 
              className="relative w-full bg-black/80 backdrop-blur-md border border-white/10 rounded-full p-6 text-center outline-none font-mono text-lg text-white" 
              placeholder="ENTER SOLANA ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={handleScan} 
            disabled={loading} 
            className="w-full py-6 bg-white text-black rounded-full font-[1000] uppercase text-2xl tracking-[0.5em] hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-[0_0_60px_rgba(255,255,255,0.2)] disabled:opacity-50"
          >
            {loading ? "SCANNING..." : "SCAN"}
          </button>
        </div>
      </section>

      {/* --- RESULT SECTION --- */}
      <AnimatePresence mode="wait">
        {data && (
          <section id="result-view" className="relative z-10 py-32 flex flex-col items-center">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="flex flex-col items-center gap-16 w-full max-w-[640px] px-4"
            >
              {/* GLASS NEON CARD */}
              <div className="relative w-full aspect-[1.58/1] rounded-[2.5rem] md:rounded-[3.5rem] p-[3px] overflow-hidden shadow-[0_0_150px_rgba(6,182,212,0.6)] group">
                <div className="absolute inset-[-500%] animate-[spin_3s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-black/40 backdrop-blur-[40px] rounded-[2.3rem] md:rounded-[3.3rem] p-8 md:p-12 overflow-hidden flex flex-col justify-between z-10 border border-white/10">
                  {/* Sheen Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center border border-white/20 shadow-inner">
                        <Layers className="text-cyan-400 w-8 h-8" />
                      </div>
                      <div className="text-left leading-none">
                        <p className="text-xl font-black italic text-white uppercase tracking-tighter drop-shadow-md">Identity Pass</p>
                        <p className="text-[10px] font-mono text-white/40 uppercase mt-1 italic tracking-widest">ID: //WAGMI-{data.id}//</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-8 h-8 drop-shadow-[0_0_15px_rgba(6,182,212,1)]" />
                  </div>

                  <div className="flex items-center gap-8 text-left">
                    <div className="w-20 h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center">
                        <Cpu size={32} className="text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-6xl md:text-8xl font-[1000] tracking-tighter text-white leading-none drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">{data.sol}</h2>
                        <p className="text-[10px] font-mono text-cyan-400/60 tracking-[0.6em] uppercase mt-2 italic font-bold">RESERVE_ASSET: {data.asset}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/10 pt-8">
                    <div className="text-left">
                        <p className="text-[10px] font-black text-cyan-400 uppercase tracking-widest italic mb-1">ENCRYPTED TERMINAL ACCESS</p>
                        <p className="text-lg md:text-2xl font-black italic tracking-tight text-white uppercase drop-shadow-md">RANK: {data.status}</p>
                    </div>
                    <div className="w-16 h-16 bg-cyan-400 rounded-3xl flex items-center justify-center shadow-[0_0_60px_rgba(6,182,212,1)]">
                        <Zap size={32} className="text-black" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const l = document.createElement('a'); l.download = 'WAGMI-IDENTITY.png'; l.href = url; l.click(); })}
                className="flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 px-12 py-5 rounded-full font-black text-xs uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all active:scale-95"
              >
                DOWNLOAD IDENTITY <Download size={18} />
              </button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* --- FEATURES SECTION --- */}
      <section className="relative z-10 py-40 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { icon: <ShieldCheck size={40} />, title: "SECURE SCAN", desc: "Real-time verification across Solana nodes." },
            { icon: <Activity size={40} />, title: "LIVE STATS", desc: "Fetch liquidity and asset distribution metrics." },
            { icon: <Globe size={40} />, title: "UNIVERSAL", desc: "Compatible with all SPL wallets." }
          ].map((feat, i) => (
            <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/[0.08] transition-all group">
              <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform">{feat.icon}</div>
              <h3 className="text-2xl font-black italic mb-4 uppercase">{feat.title}</h3>
              <p className="text-gray-400 font-mono text-sm">{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div>
            <h2 className="text-4xl font-black italic tracking-tighter text-white uppercase leading-none drop-shadow-lg">WAGMI PULSE</h2>
            <p className="text-gray-500 font-mono text-xs tracking-[0.5em] uppercase italic mt-2">Designed by <span className="text-cyan-500 font-bold">Bader Alkorgli</span></p>
          </div>
          
          {/* GITHUB ICON PROFESSIONAL */}
          <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-3 bg-white/10 hover:bg-white hover:text-black border border-white/10 px-8 py-4 rounded-2xl transition-all duration-500 shadow-xl group">
            <Github size={24} className="group-hover:rotate-12 transition-transform" />
            <span className="font-black text-sm uppercase tracking-widest">Developer Repo</span>
          </a>
        </div>
      </footer>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 10px; }
      `}</style>
    </div>
  );
}