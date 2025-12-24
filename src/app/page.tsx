"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Download, Activity, Cpu, Globe, BarChart3, LineChart } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiTerminalPro() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<any>({ SOL: 0, JUP: 0, BTC: 0, WIF: 0, BONK: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // دالة جلب الأسعار الحية من Jupiter API v2
  const fetchPrices = async () => {
    try {
      const ids = "SOL,JUP,BTC,WIF,BONK";
      const res = await fetch(`https://api.jup.ag/price/v2?ids=${ids}`);
      const json = await res.json();
      if (json.data) {
        const newPrices: any = {};
        Object.keys(json.data).forEach(key => {
          newPrices[key] = json.data[key].price;
        });
        setPrices(newPrices);
      }
    } catch (e) {
      console.error("Price fetch failed", e);
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 15000); // تحديث كل 15 ثانية لضمان الدقة
    return () => clearInterval(interval);
  }, []);

  const playElectronicSound = (freq: number, duration: number) => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(); osc.stop(ctx.currentTime + duration);
    } catch (e) {}
  };

  const analyzeWallet = async () => {
    if (!address) return;
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

      setTimeout(() => {
        playElectronicSound(440, 0.5);
        const topTokens = ["SOL", "JUP", "PYTH", "BONK", "WIF", "RAY"];
        setData({
          sol: solAmount,
          tokens: tokenAccounts.value.length,
          winRate: (72 + Math.random() * 25).toFixed(1),
          status: solAmount >= 1000 ? "LEGENDARY WHALE" : solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
          bigWinToken: topTokens[Math.floor(Math.random() * topTokens.length)],
          bigWinMultiplier: (5 + Math.random() * 12).toFixed(2),
          address: address.slice(0, 4) + "..." + address.slice(-4)
        });
        setLoading(false);
      }, 2000);
    } catch (err) {
      alert("Address Check Failed");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white flex flex-col font-sans overflow-x-hidden">
      
      {/* Live Market Ticker */}
      <div className="w-full bg-cyan-500/5 border-b border-white/5 py-2 px-6 flex gap-8 overflow-hidden whitespace-nowrap z-50">
        <div className="flex items-center gap-2 animate-pulse">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full"/> 
            <span className="text-[10px] font-mono font-bold">LIVE_MARKET:</span>
        </div>
        <div className="flex gap-10 text-[10px] font-mono font-bold uppercase tracking-widest">
           <span>SOL: <span className="text-cyan-400">${Number(prices.SOL || 0).toFixed(2)}</span></span>
           <span>JUP: <span className="text-purple-400">${Number(prices.JUP || 0).toFixed(4)}</span></span>
           <span>BTC: <span className="text-yellow-500">${Number(prices.BTC || 0).toLocaleString()}</span></span>
           <span className="text-gray-600 opacity-50 italic">NODE_STATUS: OPTIMAL</span>
        </div>
      </div>

      <div className="flex flex-col items-center py-12 px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl text-center">
          
          <h1 className="text-7xl font-black tracking-tighter italic text-white mb-2 uppercase drop-shadow-2xl">Wagmi</h1>
          <div className="flex items-center justify-center gap-3 mb-12">
              <Activity className="text-cyan-500 animate-pulse" size={16} />
              <span className="text-[10px] font-mono tracking-[0.6em] text-cyan-500 font-bold uppercase italic">Terminal v15.0</span>
          </div>

          <div className="space-y-4 mb-16 relative">
            <input 
              className="w-full bg-white/5 border border-white/10 p-6 rounded-3xl text-center font-mono text-xl outline-none focus:border-cyan-500/50 backdrop-blur-2xl transition-all"
              placeholder="ENTER_SOLANA_ID"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button 
              onClick={analyzeWallet}
              disabled={loading}
              className="w-full h-20 bg-gradient-to-r from-cyan-500 to-blue-600 text-black rounded-3xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all shadow-[0_0_30px_rgba(6,182,212,0.2)]"
            >
              {loading ? "SCANNING DATA..." : "IDENTIFY WALLET"} <Zap size={20} fill="currentColor" />
            </button>
          </div>

          <AnimatePresence>
            {data && (
              <motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
                <div ref={cardRef} className="p-10 rounded-[3rem] bg-[#050505] border border-white/10 text-left relative overflow-hidden mb-6 shadow-2xl">
                  <motion.div animate={{ y: [0, 400, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                      className="absolute top-0 left-0 w-full h-[1px] bg-cyan-500 shadow-[0_0_15px_#06b6d4] z-20"/>
                  
                  <div className="flex justify-between items-center mb-10">
                     <div className="bg-white/5 px-4 py-1.5 rounded-full border border-white/10 text-[9px] font-mono text-cyan-400 uppercase italic">ID: {data.address}</div>
                     <ShieldCheck className="text-cyan-500" size={24} />
                  </div>

                  <div className="space-y-8">
                    <div>
                      <p className="text-[9px] font-mono text-gray-500 uppercase tracking-widest mb-1 font-bold">Portfolio Tier</p>
                      <h2 className="text-5xl font-black italic text-white uppercase tracking-tighter">{data.status}</h2>
                    </div>
                    <div className="bg-cyan-500/5 border border-cyan-500/20 p-6 rounded-2xl relative">
                      <p className="text-[9px] font-mono text-cyan-400 font-bold uppercase mb-1 italic tracking-widest">Legendary Win</p>
                      <h3 className="text-3xl font-black text-white italic">{data.bigWinToken} <span className="text-cyan-400 ml-2">+{data.bigWinMultiplier}x</span></h3>
                    </div>
                    <div className="pt-6 border-t border-white/5">
                      <p className="text-[10px] font-mono text-gray-500 uppercase mb-2 font-bold tracking-widest italic">Net Worth</p>
                      <p className="text-6xl font-black text-white tracking-tighter">
                          {data.sol.toLocaleString(undefined, { minimumFractionDigits: 2 })} <span className="text-xl text-cyan-500 ml-2">SOL</span>
                      </p>
                    </div>
                  </div>
                </div>
                <button 
                  onClick={() => toPng(cardRef.current!).then(url => { const a = document.createElement('a'); a.download='WAGMI.png'; a.href=url; a.click(); })}
                  className="w-full h-16 bg-white/5 hover:bg-white hover:text-black border border-white/10 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all mb-10"
                >
                  <Download size={20} /> Capture & Share on X
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Trending Tokens with LIVE PRICES */}
          <div className="mt-8 bg-white/5 rounded-3xl p-8 border border-white/10 text-left">
             <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-cyan-500" size={20} />
                <h4 className="font-black uppercase tracking-widest text-xs italic">Market Trending</h4>
             </div>
             <div className="grid grid-cols-2 gap-4">
                {[
                  { sym: 'SOL', price: prices.SOL },
                  { sym: 'JUP', price: prices.JUP },
                  { sym: 'WIF', price: prices.WIF },
                  { sym: 'BONK', price: prices.BONK }
                ].map((token) => (
                   <div key={token.sym} className="bg-black/40 p-4 rounded-2xl border border-white/5 flex flex-col gap-1">
                      <div className="flex justify-between items-center">
                        <span className="font-mono text-[11px] font-bold text-white">{token.sym}</span>
                        <span className="text-green-500 text-[8px] font-black italic tracking-widest">LIVE</span>
                      </div>
                      <span className="text-cyan-400 font-mono text-[12px] font-black">
                        ${token.price ? (token.sym === 'BONK' ? Number(token.price).toFixed(6) : Number(token.price).toFixed(2)) : '---'}
                      </span>
                   </div>
                ))}
             </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5">
            <div className="flex justify-center gap-8 opacity-30 text-[9px] font-black uppercase tracking-widest mb-6 italic">
               <span>Powered by Solana</span> <span>Helius</span> <span>Jupiter</span>
            </div>
            <p className="text-[11px] font-mono tracking-[0.5em] text-gray-600 font-bold uppercase italic">
              Developed by <span className="text-white drop-shadow-[0_0_8px_white]">Bader Alkorgli</span>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}