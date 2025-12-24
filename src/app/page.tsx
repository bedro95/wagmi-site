"use client";
import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Twitter, Share2, Shield, Target, Award, ArrowRight } from 'lucide-react';

export default function WagmiArtisticEdition() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483";

  const analyzeWallet = async () => {
    if (!address) return;
    setLoading(true);
    setData(null);

    try {
      const connection = new Connection(HELIUS_RPC, 'confirmed');
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const solAmount = balance / 1000000000;

      const tokenAccounts = await connection.getParsedTokenAccountsByOwner(key, {
        programId: new PublicKey("TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA")
      });

      const totalTokens = tokenAccounts.value.length;
      const isProfitable = solAmount > 1 || totalTokens > 10;
      const winRate = isProfitable ? (85 + Math.random() * 12).toFixed(1) : (40 + Math.random() * 20).toFixed(1);

      setData({
        sol: solAmount,
        tokens: totalTokens,
        winRate: winRate,
        status: isProfitable ? "CHAD" : "SURVIVOR",
        rank: isProfitable ? "DIAMOND HANDS" : "DEGEN",
        address: address.slice(0, 4) + "..." + address.slice(-4)
      });

    } catch (err) {
      alert("Address not found on Solana Mainnet.");
    } finally {
      setLoading(false);
    }
  };

  const shareOnX = () => {
    const text = `Verified my Solana ID on WAGMI Terminal ⚡\n\nRank: ${data.rank}\nWin Rate: ${data.winRate}%\nAssets: ${data.tokens} Tokens\n\nCheck yours here:`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(window.location.href)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="relative min-h-screen bg-[#020202] text-white flex flex-col items-center py-12 px-6 font-sans overflow-hidden">
      
      {/* Abstract Background Art */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-600/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative z-10 w-full max-w-xl">
        
        {/* Logo */}
        <div className="text-center mb-12">
          <h1 className="text-7xl font-black tracking-tighter italic text-white drop-shadow-2xl">WAGMI</h1>
          <div className="flex items-center justify-center gap-2 mt-2">
            <div className="h-[1px] w-8 bg-cyan-500" />
            <p className="text-[10px] tracking-[0.5em] text-cyan-400 font-bold uppercase">Neural Terminal v5.0</p>
            <div className="h-[1px] w-8 bg-cyan-500" />
          </div>
        </div>

        {/* Input & Modern Button */}
        <div className="flex flex-col gap-4 mb-16">
          <div className="relative group">
            <input 
              className="w-full bg-white/5 border border-white/10 p-6 rounded-2xl text-center text-lg font-mono outline-none focus:border-cyan-500/50 transition-all uppercase backdrop-blur-md"
              placeholder="PASTE_WALLET_ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onClick={analyzeWallet}
            disabled={loading}
            className="w-full bg-cyan-500 hover:bg-white text-black h-16 rounded-2xl font-black uppercase tracking-widest transition-all duration-500 flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(6,182,212,0.4)] group"
          >
            {loading ? "DECRYPTING..." : (
              <>
                START DEEP ANALYSIS <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, y: 40 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              className="relative p-[2px] rounded-[2.5rem] bg-gradient-to-br from-cyan-400 via-purple-500 to-blue-600 shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
            >
              {/* Artistic Card Content */}
              <div className="bg-[#080808] rounded-[2.4rem] p-10 relative overflow-hidden">
                
                {/* Decorative Elements */}
                <div className="absolute top-0 right-0 p-6 opacity-20">
                    <Award size={80} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="px-3 py-1 bg-white/10 rounded-full border border-white/10">
                        <span className="text-[9px] font-mono text-gray-400">ID: {data.address}</span>
                    </div>
                  </div>

                  <p className="text-[10px] font-mono text-cyan-500 uppercase tracking-[0.4em] mb-3">Portfolio Class</p>
                  <h2 className="text-6xl font-black italic tracking-tighter text-white mb-6">
                    {data.rank}
                  </h2>

                  <div className="grid grid-cols-2 gap-6 pt-8 border-t border-white/5">
                    <div>
                        <p className="text-[9px] font-mono text-gray-500 uppercase mb-1 italic">Win Rate</p>
                        <p className="text-3xl font-black text-cyan-400">{data.winRate}%</p>
                    </div>
                    <div>
                        <p className="text-[9px] font-mono text-gray-500 uppercase mb-1 italic">Net Value</p>
                        <p className="text-3xl font-black text-white">{data.sol.toFixed(2)} <span className="text-sm font-light opacity-50">SOL</span></p>
                    </div>
                  </div>

                  {/* X-Button Inside Card */}
                  <button 
                    onClick={shareOnX}
                    className="mt-10 w-full bg-white/5 hover:bg-white hover:text-black border border-white/10 py-4 rounded-xl flex items-center justify-center gap-3 transition-all font-bold text-xs uppercase tracking-widest"
                  >
                    <Twitter size={16} fill="currentColor" /> Share on Crypto Twitter
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-20 text-center">
          <p className="text-[10px] font-mono tracking-[0.5em] text-gray-600 font-bold uppercase">
            Designed by <span className="text-white">Bader Alkorgli</span> // Global Release 5.0
          </p>
        </div>
      </motion.div>
    </div>
  );
}