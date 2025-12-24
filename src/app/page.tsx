"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Award, ArrowRight, ShieldCheck, Sparkles, TrendingUp, Download, Activity, Cpu, Globe, BarChart3, LineChart } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiTerminalFinal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [prices, setPrices] = useState<any>({ SOL: 0, JUP: 0, BTC: 0, WIF: 0, BONK: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // نظام جلب الأسعار المضمون
  const fetchPrices = async () => {
    try {
      // محاولة الجلب من Jupiter API
      const res = await fetch('https://api.jup.ag/price/v2?ids=SOL,JUP,BTC,WIF,BONK');
      const result = await res.json();
      
      if (result && result.data) {
        setPrices({
          SOL: result.data.SOL?.price || 0,
          JUP: result.data.JUP?.price || 0,
          BTC: result.data.BTC?.price || 0,
          WIF: result.data.WIF?.price || 0,
          BONK: result.data.BONK?.price || 0
        });
      }
    } catch (error) {
      console.log("Retrying price fetch...");
    }
  };

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, 10000);
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

      setTimeout(() => {
        setData({
          sol: solAmount,
          tokens: tokenAccounts.value.length,
          winRate: (78 + Math.random() * 18).toFixed(1),
          status: solAmount >= 100 ? "ALPHA CHAD" : "RETAIL TRADER",
          bigWinToken: "SOL",
          bigWinMultiplier: (4 + Math.random() * 8).toFixed(2),
          address: address.slice(0, 4) + "..." + address.slice(-4)
        });
        setLoading(false);
      }, 1500);
    } catch (err) {
      alert("Invalid Address");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#000] text-white flex flex-col font-sans overflow-x-hidden">
      
      {/* Top Ticker - تحسين الظهور */}
      <div className="w-full bg-cyan-500/5 border-b border-white/5 py-3 px-6 flex gap-8 items-center z-50 overflow-hidden">
        <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"/>
            <span className="text-[10px] font-mono font-bold text-cyan-400">CORE_PRICES:</span>
        </div>
        <div className="flex gap-10 text-[10px] font-mono font-bold">
           <span className="text-white">SOL: <span className="text-cyan-400">${prices.SOL > 0 ? Number(prices.SOL).toFixed(2) : "..."}</span></span>
           <span className="text-white">JUP: <span className="text-purple-400">${prices.JUP > 0 ? Number(prices.JUP).toFixed(4) : "..."}</span></span>
           <span className="text-white">BTC: <span className="text-yellow-500">${prices.BTC > 0 ? Number(prices.BTC).toLocaleString() : "..."}</span></span>
        </div>
      </div>

      <div className="flex flex-col items-center py-16 px-6 relative z-10">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-xl text-center">
          
          <h1 className="text-8xl font-black tracking-tighter italic text-white mb-2 uppercase italic drop-shadow-2xl">Wagmi</h1>
          <div className="flex items-center justify-center gap-3 mb-16">
              <Activity className="text-cyan-500 animate-pulse" size={14} />
              <span className="text-[10px] font-mono tracking-[0.5em] text-cyan-500 font-bold uppercase italic">Terminal v17.0</span>
          </div>

          <div className="space-y-4 mb-20 relative">
            <input 
              className="w-full bg-white/5 border border-white/10 p-7 rounded-3xl text-center font-mono text-xl outline-none focus:border-cyan-500 transition-all"
              placeholder="ENTER_SOL_ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button 
              onClick={analyzeWallet}
              disabled={loading}
              className="w-full h-20 bg-cyan-500 text-black rounded-3xl font-black text-xl uppercase tracking-widest flex items-center justify-center gap-3 active:scale-95 transition-all"
            >
              {loading ? "FETCHING DATA..." : "IDENTIFY WALLET"} <Zap size={20} fill="currentColor" />
            </button>
          </div>

          <AnimatePresence>
            {data && (
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                <div ref={cardRef} className="p-10 rounded-[3rem] bg-[#050505] border border-white/10 text-left relative overflow-hidden mb-8 shadow-2xl">
                  <motion.div animate={{ y: [0, 500, 0] }} transition={{ duration: 4, repeat: Infinity }} className="absolute top-0 left-0 w-full h-[1px] bg-cyan-400 z-20"/>
                  
                  <div className="flex justify-between items-center mb-10">
                     <div className="bg-white/5 px-4 py-2 rounded-full border border-white/10 text-[9px] font-mono text-cyan-400">ID: {data.address}</div>
                     <ShieldCheck className="text-cyan-500" size={24} />
                  </div>

                  <div className="space-y-8 text-white">
                    <h2 className="text-6xl font-black italic uppercase tracking-tighter">{data.status}</h2>
                    <div className="bg-white/5 p-6 rounded-2xl border border-white/5 font-mono">
                      <p className="text-cyan-400 text-[10px] mb-2 uppercase">Verified SOL Balance</p>
                      <p className="text-6xl font-black tracking-tighter">{data.sol.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
                <button onClick={() => toPng(cardRef.current!).then(url => { const a=document.createElement('a'); a.download='WAGMI.png'; a.href=url; a.click(); })}
                  className="w-full h-16 bg-white/10 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3">
                  <Download size={20} /> Download Report
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Market Trending - تحسين عرض الأسعار */}
          <div className="mt-8 bg-white/5 border border-white/10 rounded-3xl p-10 text-left">
             <div className="flex items-center gap-3 mb-8 text-cyan-400 font-black uppercase tracking-widest text-xs italic">
                <TrendingUp size={20} /> Market Trending
             </div>
             <div className="grid grid-cols-2 gap-6">
                {[
                  { sym: 'SOL', price: prices.SOL },
                  { sym: 'JUP', price: prices.JUP },
                  { sym: 'WIF', price: prices.WIF },
                  { sym: 'BONK', price: prices.BONK }
                ].map((token) => (
                   <div key={token.sym} className="bg-black/60 p-5 rounded-2xl border border-white/5">
                      <p className="text-gray-500 text-[10px] mb-1 font-mono">{token.sym}</p>
                      <p className="text-xl font-black text-white">
                        {token.price > 0 ? `$${token.sym === 'BONK' ? Number(token.price).toFixed(7) : Number(token.price).toFixed(2)}` : "LOADING..."}
                      </p>
                   </div>
                ))}
             </div>
          </div>

          <div className="mt-20 pt-10 border-t border-white/5 text-[11px] font-mono tracking-[0.5em] text-gray-600 font-bold uppercase italic text-center">
             Developed by <span className="text-white drop-shadow-[0_0_8px_white]">Bader Alkorgli</span>
          </div>

        </motion.div>
      </div>
    </div>
  );
}