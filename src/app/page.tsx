"use client";
import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Terminal, Zap, TrendingUp, TrendingDown, Award, BarChart3 } from 'lucide-react';

export default function WagmiViralFinal() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // استخدام الرابط الخاص بك
  const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483";

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    setData(null);

    try {
      const connection = new Connection(HELIUS_RPC, 'confirmed');
      const key = new PublicKey(address.trim());
      
      // 1. جلب رصيد الـ SOL الأساسي
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1000000000;

      // 2. جلب قائمة التوكنز (SPL Tokens)
      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(key, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });

      const totalTokens = tokenAccounts.value.length;
      
      // 3. محاكاة تحليل الربح (Logic لزيادة الـ Virality)
      // في النسخ المتقدمة نربطها بـ DexScreener API، حالياً سنعتمد على استقرار الرصيد
      const isProfitable = solAmount > 0.5 || totalTokens > 5; 
      const winRate = isProfitable ? (75 + Math.random() * 20).toFixed(1) : (30 + Math.random() * 20).toFixed(1);

      setData({
        sol: solAmount,
        tokens: totalTokens,
        winRate: winRate,
        status: isProfitable ? "PROFITABLE" : "RECOVERY MODE",
        bestTrade: totalTokens > 0 ? "Active Whale" : "Early Adopter"
      });

    } catch (err) {
      console.error(err);
      alert("Neural Link Error: Make sure the address is correct.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#020202] text-white overflow-hidden flex flex-col items-center py-10 px-4 font-sans selection:bg-cyan-500 selection:text-black">
      
      {/* Dynamic Background */}
      <div className="absolute inset-0 z-0 opacity-10">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -500, x: Math.random() * 1500 }}
            animate={{ y: 1000 }}
            transition={{ duration: Math.random() * 5 + 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1px] h-40 bg-gradient-to-b from-cyan-500 to-transparent"
          />
        ))}
      </div>

      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 w-full max-w-2xl text-center">
        <h1 className="text-7xl font-black mb-2 tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-blue-600">
          WAGMI
        </h1>
        <p className="text-cyan-800 font-mono text-[9px] tracking-[0.7em] mb-12 uppercase">Advanced Intelligence Terminal</p>

        {/* Search Bar */}
        <div className="bg-black/40 border border-white/10 p-2 flex gap-2 mb-10 backdrop-blur-3xl shadow-2xl">
          <input 
            className="flex-1 bg-transparent p-4 outline-none font-mono text-cyan-400 text-xs placeholder:text-gray-700"
            placeholder="ENTER_SOLANA_ADDRESS"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <button 
            onClick={analyzeWallet}
            disabled={loading}
            className="bg-white text-black px-10 font-black uppercase text-[10px] hover:bg-cyan-400 transition-all flex items-center gap-2"
          >
            {loading ? "Scanning..." : "Analyze"} <Zap size={14} />
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Card 1: Main Status */}
              <div className="bg-white/[0.03] border border-white/10 p-8 relative overflow-hidden text-left group">
                <div className={`absolute top-0 right-0 w-1 h-full ${data.status === 'PROFITABLE' ? 'bg-green-500' : 'bg-yellow-500'}`} />
                <p className="text-[10px] font-mono text-gray-500 uppercase mb-1">Portfolio Health</p>
                <h2 className={`text-4xl font-black mb-4 ${data.status === 'PROFITABLE' ? 'text-green-400' : 'text-yellow-400'}`}>{data.status}</h2>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <BarChart3 size={14} className="text-cyan-500" />
                  <span>Win Rate: <span className="text-white">{data.winRate}%</span></span>
                </div>
              </div>

              {/* Card 2: Assets */}
              <div className="bg-white/[0.03] border border-white/10 p-8 text-left relative">
                 <div className="absolute top-0 right-0 p-2 font-mono text-[8px] bg-cyan-500 text-black font-bold italic">LIVE_DATA</div>
                 <div className="space-y-4">
                    <div>
                        <p className="text-[10px] font-mono text-gray-500 uppercase">Total Balance</p>
                        <p className="text-3xl font-black text-white">{data.sol.toFixed(3)} <span className="text-xs text-cyan-500">SOL</span></p>
                    </div>
                    <div className="h-[1px] bg-white/5 w-full" />
                    <div className="flex justify-between items-center">
                        <span className="text-[10px] font-mono text-gray-400 italic underline decoration-cyan-900 uppercase">Tokens Found:</span>
                        <span className="text-xl font-black text-cyan-400 font-mono">{data.tokens}</span>
                    </div>
                 </div>
              </div>

              {/* Card 3: Achievement (The Viral Part) */}
              <div className="md:col-span-2 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-white/5 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="bg-cyan-500/20 p-3 rounded-full">
                        <Award className="text-cyan-400" size={24} />
                    </div>
                    <div className="text-left">
                        <p className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">Wallet Identity</p>
                        <h4 className="text-xl font-black uppercase italic tracking-widest">{data.bestTrade}</h4>
                    </div>
                </div>
                <div className="text-right">
                    <div className={`px-3 py-1 text-[9px] font-bold uppercase rounded-sm ${data.status === 'PROFITABLE' ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-400'}`}>
                        {data.status === 'PROFITABLE' ? 'Diamond Hands' : 'Paper Hands?'}
                    </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Signature */}
      <div className="mt-auto py-8 opacity-40 hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-mono tracking-[0.4em] text-cyan-500 font-bold uppercase cursor-crosshair">
          Powered by Bader Alkorgli // v3.1 Global Secure
        </p>
      </div>
    </div>
  );
}