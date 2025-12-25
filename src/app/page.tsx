"use client";
import React, { useState, useRef } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, ShieldCheck, Zap, Layers, CreditCard, Radio } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiAnimatedNeonEdition() {
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
    link.download = `WAGMI-NEON-PASS.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative">
      
      {/* --- BACKGROUND GLOWS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute top-[20%] left-[-20%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-cyan-500/20 blur-[150px] rounded-full" 
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.6, 0.3] }} 
          transition={{ duration: 4, repeat: Infinity, delay: 2 }}
          className="absolute bottom-[20%] right-[-20%] w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-purple-600/20 blur-[150px] rounded-full" 
        />
      </div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-6 md:mt-12">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-6xl md:text-[10rem] font-black italic tracking-tighter leading-none bg-gradient-to-b from-white to-gray-800 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(255,255,255,0.2)] text-center">WAGMI</h1>
          <p className="text-[10px] md:text-[12px] font-mono tracking-[1.2em] text-cyan-400 uppercase mb-16 font-black italic text-center">Neural Interface v2.5</p>
        </motion.div>

        {/* Input Box */}
        <div className="w-full max-w-md mb-20 space-y-4 px-4">
            <div className="relative p-[1px] rounded-full bg-white/10 overflow-hidden focus-within:bg-cyan-500/50 transition-all">
                <input 
                  className="w-full bg-[#080808] rounded-full p-5 md:p-6 text-center outline-none font-mono text-sm md:text-lg text-white" 
                  placeholder="ENTER WALLET ADDRESS"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
            </div>
            <button onClick={analyze} disabled={loading} className="w-full py-5 bg-white text-black rounded-full font-black uppercase text-sm tracking-[0.2em] hover:bg-cyan-400 transition-all active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
               {loading ? "SCANNING..." : "SCAN IDENTITY"}
            </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-12 w-full max-w-[560px]">
              
              {/* --- THE ANIMATED RACING NEON CARD --- */}
              <div className="relative w-full aspect-[1.58/1] rounded-[2rem] md:rounded-[3rem] p-[3px] overflow-hidden group">
                
                {/* THIS IS THE MOVING NEON LIGHT IN THE BORDER */}
                <div className="absolute inset-[-1000%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,#06b6d4,#a855f7,#06b6d4)] opacity-100" />
                
                {/* Card Inner Content */}
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[1.9rem] md:rounded-[2.9rem] p-6 md:p-10 overflow-hidden flex flex-col justify-between z-10">
                  
                  {/* Subtle Grid Background */}
                  <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)`, backgroundSize: '25px 25px' }} />

                  {/* Header */}
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3 md:gap-5">
                      <div className="w-10 h-10 md:w-16 md:h-16 bg-white/5 rounded-xl md:rounded-2xl flex items-center justify-center border border-white/10">
                        <Layers size={22} className="md:w-8 md:h-8 text-cyan-400 drop-shadow-[0_0_10px_#06b6d4]" />
                      </div>
                      <div className="text-left">
                        <p className="text-xs md:text-lg font-black italic text-white uppercase tracking-tight">Identity Pass</p>
                        <p className="text-[8px] md:text-[10px] font-mono text-white/30 uppercase tracking-tighter">ID: //SOL-{data.id} * 9000//</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end">
                      <Radio className="text-cyan-500 animate-pulse w-5 h-5 md:w-8 md:h-8 shadow-[0_0_15px_#06b6d4]" />
                    </div>
                  </div>

                  {/* Wealth Section */}
                  <div className="flex items-center gap-4 md:gap-8 text-left">
                    <div className="w-12 h-9 md:w-20 md:h-14 bg-white/5 rounded-xl border border-white/10 flex items-center justify-center overflow-hidden">
                        <CreditCard size={20} className="md:w-9 md:h-9 text-white/20" />
                    </div>
                    <div>
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.3)] leading-none">{data.sol}</h2>
                        <p className="text-[8px] md:text-[11px] font-mono text-white/40 tracking-[0.4em] uppercase mt-1 italic">SOL_NETWORK_ASSET</p>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-end border-t border-white/10 pt-4 md:pt-8">
                    <div className="text-left">
                        <p className="text-[8px] md:text-[11px] font-black text-cyan-400 uppercase tracking-widest italic mb-1 drop-shadow-[0_0_8px_#06b6d4]">SECURED_ACCESS_NODE</p>
                        <p className="text-[10px] md:text-sm font-black italic tracking-tight text-white/90">CLASS: //{data.status}</p>
                    </div>
                    <motion.div 
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-10 h-10 md:w-16 md:h-16 bg-cyan-400 rounded-xl md:rounded-2xl flex items-center justify-center shadow-[0_0_30px_#06b6d4]"
                    >
                        <Zap size={22} className="md:w-8 md:h-8 text-black" fill="currentColor" />
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button onClick={saveCard} className="flex items-center gap-4 bg-white/5 border border-white/10 px-16 py-5 rounded-full font-black text-[10px] md:text-xs uppercase tracking-[0.5em] hover:bg-white hover:text-black transition-all shadow-2xl active:scale-95 mb-10 group">
                EXPORT IDENTITY <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Tailwind Custom Animation Injection */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}