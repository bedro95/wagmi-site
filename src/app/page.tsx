"use client";
import React, { useState } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion } from 'framer-motion';
import { Search, Terminal, Zap, ShieldCheck } from 'lucide-react';

export default function WagmiCyberpunkFinal() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // الرابط الخاص بك من Helius
  const HELIUS_RPC = "https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483";

  const checkBalance = async () => {
    if (!address) return;
    
    setLoading(true);
    setBalance(null);

    try {
      // الاتصال عبر Helius RPC
      const connection = new Connection(HELIUS_RPC, 'confirmed');
      const key = new PublicKey(address.trim());
      const bal = await connection.getBalance(key);
      
      setBalance(bal / 1000000000); 
    } catch (err: any) {
      console.error("RPC Error:", err);
      alert("Neural Link Failed: Invalid Address or RPC Timeout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-hidden flex flex-col items-center justify-center p-4 font-sans text-center">
      
      {/* Background - Digital Rain */}
      <div className="absolute inset-0 z-0 opacity-20">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -500, x: Math.random() * 1500 }}
            animate={{ y: 1000 }}
            transition={{ duration: Math.random() * 5 + 2, repeat: Infinity, ease: "linear" }}
            className="absolute w-[1px] h-32 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
          />
        ))}
      </div>

      {/* Main UI Card */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 bg-black/80 backdrop-blur-3xl p-10 rounded-none border-l-4 border-t-4 border-cyan-500 shadow-[20px_20px_0px_0px_rgba(6,182,212,0.1)] w-full max-w-md"
      >
        <div className="flex flex-col items-center mb-12">
          <h1 className="text-6xl font-black tracking-[0.25em] text-cyan-400 drop-shadow-[0_0_20px_rgba(34,211,238,0.6)] italic">
            WAGMI
          </h1>
          <div className="h-1 w-24 bg-purple-600 mt-2 shadow-[0_0_10px_#7c3aed]"></div>
          <p className="text-[10px] text-gray-500 font-mono tracking-[0.4em] mt-4 uppercase">Neural Network Terminal</p>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-none blur opacity-20 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative text-left">
              <input 
                type="text"
                placeholder="INPUT_WALLET_ADDRESS"
                className="w-full bg-black border border-cyan-900/50 p-5 rounded-none outline-none focus:border-cyan-400 text-cyan-400 font-mono text-xs transition-all uppercase placeholder:opacity-30"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <Terminal className="absolute right-4 top-5 text-cyan-900" size={18} />
            </div>
          </div>

          <button 
            onClick={checkBalance}
            disabled={loading}
            className="group relative w-full h-14 bg-cyan-500 hover:bg-white text-black font-black uppercase tracking-widest text-sm transition-all duration-300 shadow-[5px_5px_0px_0px_#7c3aed]"
          >
            <span className="flex items-center justify-center gap-2">
              {loading ? "DECRYPTING..." : "RUN ANALYSIS"} <Zap size={16} />
            </span>
          </button>

          {balance !== null && (
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="mt-8 p-6 border-l-2 border-purple-500 bg-purple-500/5 relative overflow-hidden text-left"
            >
              <div className="absolute top-0 right-0 p-1 bg-purple-500 text-[8px] text-black font-bold">DATA_RETRIEVED</div>
              <p className="text-gray-500 text-[10px] font-mono mb-2 tracking-tighter uppercase">Solana_Mainnet_Assets:</p>
              <h2 className="text-5xl font-black text-white italic">
                {balance.toLocaleString(undefined, { maximumFractionDigits: 3 })} <span className="text-sm text-cyan-400">SOL</span>
              </h2>
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Footer */}
      <div className="mt-12 flex flex-col items-center gap-4 opacity-60">
        <p className="text-[11px] font-mono tracking-[0.3em] text-cyan-400 uppercase font-bold">
          Powered by Bader Alkorgli
        </p>
        <div className="flex gap-4">
           <ShieldCheck size={14} className="text-gray-600" />
           <p className="text-[8px] font-mono tracking-widest text-gray-600 uppercase italic">Established 2025 // Helius_Node_Online</p>
        </div>
      </div>
    </div>
  );
}