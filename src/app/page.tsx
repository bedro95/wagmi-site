"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, Radio, Cpu, Github, Activity, Globe, Lock, BarChart3, Fingerprint } from 'lucide-react';
import { toPng } from 'html-to-image';

const ECOSYSTEM_ICONS = [
  "https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFW36DP7btR2GrS1W86WH7AfB7rqnCYcV5as67vS5/logo.png",
  "https://jup.ag/svg/jupiter-logo.svg",
  "https://raydium.io/logo/logo-only-light.svg",
  "https://pyth.network/favicon.ico",
  "https://www.tensor.trade/favicon.ico",
];

export default function WagmiSuperNovaTerminal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLDivElement>(null);
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
      
      const resData = { sol: sol.toFixed(2), status: currentStatus, asset: "SOL", id: Math.floor(1000 + Math.random() * 9000) };
      setData(resData);
      
      setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 500);
    } catch (e) { alert("Scan Error. Please check your connection."); } finally { setLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white font-sans selection:bg-cyan-500 overflow-x-hidden">
      
      {/* --- BACKGROUND ENGINE --- */}
      <motion.div style={{ y: backgroundY }} className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[80vw] h-[80vw] bg-[#9945FF]/10 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80vw] h-[80vw] bg-[#14F195]/10 blur-[180px] rounded-full animate-pulse" />
      </motion.div>

      {/* --- THE CORE ENGINE (WAGMI LOGO) --- */}
      <div className="fixed right-[5%] top-1/2 -translate-y-1/2 z-0 opacity-80 pointer-events-none hidden lg:block">
        <motion.div 
          animate={{ scale: [1, 1.05, 1], rotate: [0, 5, 0] }} 
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative w-72 h-72 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-[#9945FF] to-[#14F195] rounded-full blur-[90px] opacity-20" />
          
          <div className="relative w-full h-full bg-black rounded-full border border-white/10 flex items-center justify-center p-14 shadow-[0_0_100px_rgba(20,241,149,0.1)]">
            <svg viewBox="0 0 100 100" className="w-full h-full">
              <path d="M20 35L50 85L80 35" stroke="url(#g1)" strokeWidth="6" strokeLinecap="round" />
              <path d="M20 55L50 15L80 55" stroke="url(#g2)" strokeWidth="6" strokeLinecap="round" />
              <defs>
                <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#9945FF"/><stop offset="100%" stopColor="#14F195"/></linearGradient>
                <linearGradient id="g2" x1="100%" y1="0%" x2="0%" y2="100%"><stop offset="0%" stopColor="#14F195"/><stop offset="100%" stopColor="#00FFA3"/></linearGradient>
              </defs>
            </svg>
          </div>

          {/* Fountain Icons */}
          {ECOSYSTEM_ICONS.map((icon, i) => (
            <motion.img
              key={i} src={icon}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: [0, 1, 0], scale: [0.4, 0.8, 0.4], x: [0, (i % 2 === 0 ? 1 : -1) * 200], y: [0, -350] }}
              transition={{ duration: 7, repeat: Infinity, delay: i * 1.4 }}
              className="absolute w-10 h-10 rounded-full border border-white/10 bg-black/50 p-1"
            />
          ))}
        </motion.div>
      </div>

      {/* --- HERO SECTION --- */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-[12vw] md:text-[10rem] font-serif font-black italic tracking-tighter leading-none bg-gradient-to-b from-white to-gray-600 bg-clip-text text-transparent">WAGMI</h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.5em] text-cyan-400 uppercase mt-4 mb-16 animate-pulse">NEURAL TERMINAL v4.0</p>
        </motion.div>

        <div className="w-full max-w-xl px-4 space-y-6">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-cyan-400 rounded-full blur opacity-25 group-focus-within:opacity-100 transition duration-1000"></div>
            <input className="relative w-full bg-black/90 backdrop-blur-xl border border-white/10 rounded-full p-6 text-center outline-none font-mono text-white" placeholder="ENTER SOLANA ADDRESS" value={address} onChange={(e) => setAddress(e.target.value)} />
          </div>
          <button onClick={handleScan} disabled={loading} className="w-full py-6 bg-white text-black rounded-full font-[1000] uppercase text-2xl tracking-[0.5em] hover:bg-cyan-400 hover:text-white transition-all active:scale-95 shadow-2xl">
            {loading ? "SCANNING..." : "SCAN"}
          </button>
        </div>
      </section>

      {/* --- RESULT VIEW --- */}
      <AnimatePresence>
        {data && (
          <section ref={resultRef} className="relative z-10 py-32 flex flex-col items-center px-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="w-full max-w-[640px]">
              <div ref={cardRef} className="relative w-full aspect-[1.58/1] rounded-[3.5rem] p-12 overflow-hidden bg-black/80 border border-white/10 backdrop-blur-3xl shadow-2xl">
                 <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-purple-500/5" />
                 <div className="relative z-10 h-full flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center gap-4">
                        <Fingerprint className="text-cyan-400" size={32} />
                        <div><p className="text-xl font-black italic uppercase">Identity Pass</p><p className="text-[10px] font-mono text-white/40">ID: WAGMI-{data.id}</p></div>
                      </div>
                      <Radio className="text-cyan-500 animate-pulse" />
                    </div>
                    <div>
                      <h2 className="text-7xl md:text-8xl font-[1000] tracking-tighter">{data.sol}</h2>
                      <p className="text-xs font-mono text-cyan-400/60 mt-2 uppercase tracking-widest font-bold">RESERVE: SOLANA_MAINNET</p>
                    </div>
                    <div className="flex justify-between items-end border-t border-white/10 pt-8">
                      <div><p className="text-[10px] text-white/40 uppercase mb-1 font-mono">Status Protocol</p><p className="text-2xl font-black italic text-white uppercase">{data.status}</p></div>
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black shadow-xl"><Zap fill="currentColor" size={28} /></div>
                    </div>
                 </div>
              </div>
              <button onClick={() => cardRef.current && toPng(cardRef.current, { pixelRatio: 3, backgroundColor: '#000' }).then(url => { const l=document.createElement('a'); l.download='WAGMI-PASS.png'; l.href=url; l.click(); })} className="mt-8 w-full py-5 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-full font-black text-xs uppercase tracking-widest transition-all">Download Identity <Download size={16} className="inline ml-2" /></button>
            </motion.div>
          </section>
        )}
      </AnimatePresence>

      {/* --- ADDED BACK: EXTRA FEATURES --- */}
      <section className="relative z-10 py-40 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Lock />, title: "Secure Scan", desc: "End-to-end encrypted node verification." },
          { icon: <Activity />, title: "Live Stats", desc: "Real-time balance & status protocols." },
          { icon: <BarChart3 />, title: "Whale Alert", desc: "Automated ranking based on wallet depth." }
        ].map((feat, i) => (
          <div key={i} className="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] backdrop-blur-xl hover:bg-white/10 transition-all group">
            <div className="text-cyan-400 mb-6 group-hover:scale-110 transition-transform">{feat.icon}</div>
            <h3 className="text-2xl font-black italic mb-2 uppercase">{feat.title}</h3>
            <p className="text-gray-500 font-mono text-sm leading-relaxed">{feat.desc}</p>
          </div>
        ))}
      </section>

      {/* --- FOOTER --- */}
      <footer className="relative z-10 py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="text-left">
            <h2 className="text-4xl font-black italic tracking-tighter">WAGMI PULSE</h2>
            <p className="text-gray-500 font-mono text-xs mt-2 uppercase tracking-[0.4em]">Designed by <span className="text-cyan-500 font-bold underline">Bader Alkorgli</span></p>
          </div>
          <a href="https://github.com/bedro95" target="_blank" className="flex items-center gap-3 bg-white/10 hover:bg-white hover:text-black border border-white/10 px-8 py-4 rounded-2xl transition-all shadow-xl">
            <Github size={22} /> <span className="font-black text-xs uppercase tracking-widest">Dev Repository</span>
          </a>
        </div>
      </footer>

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #06b6d4; border-radius: 10px; }
      `}</style>
    </div>
  );
}