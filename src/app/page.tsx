"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Radio, ShieldCheck, Fingerprint, Volume2, VolumeX, Github, Zap } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiSenkuFix() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // نظام الروابط البديلة لضمان ظهور الصورة
  const [imageSrc, setImageSrc] = useState("https://res.cloudinary.com/dyd911fv6/image/upload/v1625574312/senku_render_dr_stone_by_m_ some_dff_d49_d8_df_x7m_p.png");

  const handleImageError = () => {
    // إذا فشل الرابط الأول، جرب الرابط الثاني
    if (imageSrc.includes("cloudinary")) {
      setImageSrc("https://www.transparentpng.com/download/anime/senku-ishigami-dr-stone-hd-png-30.png");
    } 
    // إذا فشل الثاني، جرب الثالث (GitHub Raw)
    else if (imageSrc.includes("transparentpng")) {
      setImageSrc("https://raw.githubusercontent.com/bedro95/assets/main/senku.png");
    }
  };

  // Audio References
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const scanSound = useRef<HTMLAudioElement | null>(null);
  const successSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    hoverSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2571/2571-preview.mp3');
    clickSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3');
    scanSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2053/2053-preview.mp3');
    successSound.current = new Audio('https://assets.mixkit.co/active_storage/sfx/2018/2018-preview.mp3');
    if (scanSound.current) scanSound.current.loop = true;
  }, []);

  const playSound = (sound: React.MutableRefObject<HTMLAudioElement | null>) => {
    if (!isMuted && sound.current) {
      sound.current.currentTime = 0;
      sound.current.play().catch(() => {});
    }
  };

  const analyze = async () => {
    if (!address) return;
    setLoading(true);
    if (!isMuted && scanSound.current) scanSound.current.play();
    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;
      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "ALPHA TRADER" : "WAGMI SOLDIER",
        id: Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString()
      });
      if (scanSound.current) scanSound.current.pause();
      playSound(successSound);
    } catch (e) { 
      if (scanSound.current) scanSound.current.pause();
      alert("Invalid Address."); 
    } finally { setLoading(false); }
  };

  const saveCard = async () => {
    playSound(clickSound);
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 4, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-LEGACY-${data?.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert("Error saving card."); }
  };

  return (
    <div className="min-h-screen bg-[#000] text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-cyan-500">
      
      {/* --- SNOW SYSTEM (RESTORED) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], x: (Math.random() * 100) + "vw" }}
            transition={{ duration: Math.random() * 8 + 7, repeat: Infinity, ease: "linear", delay: Math.random() * 15 }}
            className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_8px_#fff]"
          />
        ))}
      </div>

      {/* --- DR. STONE AGENT (RE-FIXED IMAGE & LOGIC) --- */}
      <motion.div 
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        className="fixed bottom-10 left-10 z-50 hidden lg:block cursor-grab active:cursor-grabbing"
      >
        <div className="relative">
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute inset-0 bg-cyan-500/20 blur-[60px] rounded-full"
          />
          <motion.div
            animate={loading ? { y: [0, -15, 0] } : { y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src={imageSrc} 
              alt="Senku"
              className="w-60 h-auto drop-shadow-[0_0_30px_rgba(6,182,212,0.4)] relative z-10"
              onError={handleImageError}
            />
          </motion.div>
        </div>
      </motion.div>

      {/* UI CONTROLS */}
      <button onClick={() => setIsMuted(!isMuted)} className="fixed top-6 right-6 z-50 p-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all">
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-cyan-400" />}
      </button>

      {/* MAIN INTERFACE */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-16 md:mt-24">
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-20 md:mb-32">
          <h1 className="text-8xl md:text-[15rem] font-[1000] italic tracking-tighter leading-none text-white">
            WAGMI
          </h1>
          <p className="mt-4 text-[10px] md:text-[14px] font-mono tracking-[1.2em] text-cyan-400 uppercase font-black italic">
               SCIENCE & LEGACY INTERFACE
          </p>
        </motion.div>

        {/* INPUT SECTION */}
        <div className="w-full max-w-lg mb-20 px-4 relative z-20">
          <div className="relative p-[1px] rounded-full bg-white/10 focus-within:bg-gradient-to-r focus-within:from-cyan-500 focus-within:to-purple-600 transition-all duration-700">
            <input 
              onMouseEnter={() => playSound(hoverSound)}
              className="w-full bg-black rounded-full p-6 text-center outline-none font-mono text-base md:text-lg text-white" 
              placeholder="ENTER WALLET ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onMouseEnter={() => playSound(hoverSound)}
            onClick={() => { playSound(clickSound); analyze(); }} 
            disabled={loading} 
            className="w-full mt-6 py-6 bg-white text-black rounded-full font-black uppercase text-sm md:text-lg tracking-[0.4em] hover:scale-[1.02] transition-all shadow-[0_0_40px_rgba(255,255,255,0.1)]"
          >
            {loading ? "SCANNING..." : "INITIATE SCAN"}
          </button>
        </div>

        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="flex flex-col items-center gap-12 w-full px-2 relative z-20">
              
              <div className="relative w-full max-w-[620px] aspect-[1.58/1] rounded-[2.5rem] md:rounded-[3.8rem] p-[3px] overflow-hidden">
                <div className="absolute inset-[-500%] animate-[spin_4s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#06b6d4,#a855f7,#06b6d4,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[2.4rem] md:rounded-[3.7rem] p-8 md:p-14 overflow-hidden flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-6">
                      <div className="w-14 h-14 md:w-20 md:h-20 bg-white/5 rounded-2xl flex items-center justify-center border border-white/10">
                        <Fingerprint size={32} className="md:w-11 md:h-11 text-cyan-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-xl md:text-3xl font-black italic text-white uppercase tracking-tighter">Wagmi Legacy</p>
                        <p className="text-[10px] md:text-[12px] font-mono text-white/30 tracking-[0.2em] uppercase">Authenticated Node</p>
                      </div>
                    </div>
                    <Radio className="text-cyan-500 animate-pulse w-7 h-7 md:w-10 md:h-10" />
                  </div>

                  <div className="flex items-center gap-4 text-left">
                    <h2 className="text-6xl md:text-[7.5rem] font-[1000] tracking-tighter text-white italic">{data.sol}</h2>
                    <span className="text-xl md:text-3xl font-black text-cyan-400 italic mb-2 md:mb-4">SOL</span>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/5 pt-8 md:pt-12">
                    <div className="text-left">
                        <p className="text-[9px] md:text-[11px] font-black text-cyan-400 uppercase tracking-[0.2em] italic mb-2">Access: Scientific</p>
                        <p className="text-sm md:text-2xl font-black italic text-white/90 uppercase">{data.status}</p>
                    </div>
                    <p className="text-[10px] font-mono text-white/40 uppercase">ID_{data.id}</p>
                  </div>
                </div>
              </div>

              <button 
                onMouseEnter={() => playSound(hoverSound)}
                onClick={saveCard} 
                className="flex items-center gap-6 bg-white/5 border border-white/10 px-24 py-6 rounded-full font-black text-xs uppercase tracking-[0.8em] hover:bg-white hover:text-black transition-all mb-24"
              >
                SAVE ASSET <Download size={20} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <footer className="mt-10 pb-20 opacity-30">
          <p className="text-[10px] font-mono tracking-[1.5em] uppercase text-center text-white/50">
            WAGMI PROTOCOL // BADER ALKORGLI
          </p>
        </footer>
      </div>

      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        body { background-color: #000; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 0px; }
      `}</style>
    </div>
  );
}