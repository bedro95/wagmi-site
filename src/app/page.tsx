"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Radio, ShieldCheck, Fingerprint, Volume2, VolumeX, Zap, Activity, Github } from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiUltimateMasterpiece() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // --- نظام الروابط الذكي للشخصية (PNG شفافة عالية الجودة) ---
  const [imageSrc, setImageSrc] = useState("https://www.pngarts.com/files/12/Senku-Ishigami-Dr.-Stone-PNG-Photo.png");

  // --- المراجع الصوتية ---
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
    playSound(clickSound);
    if (!isMuted && scanSound.current) scanSound.current.play();

    try {
      const connection = new Connection("https://mainnet.helius-rpc.com/?api-key=4729436b-2f9d-4d42-a307-e2a3b2449483");
      const key = new PublicKey(address.trim());
      const balance = await connection.getBalance(key);
      const sol = balance / 1_000_000_000;

      // محاكاة تأخير بسيط لإظهار تفاعل الشخصية
      await new Promise(resolve => setTimeout(resolve, 2000));

      setData({
        sol: sol.toLocaleString(undefined, { minimumFractionDigits: 2 }),
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "SCIENTIST LEVEL" : "WAGMI SURVIVOR",
        id: Math.floor(100000 + Math.random() * 900000),
      });

      if (scanSound.current) scanSound.current.pause();
      playSound(successSound);
    } catch (e) {
      if (scanSound.current) scanSound.current.pause();
      alert("Address Verification Failed. Ensure it's a valid Solana Public Key.");
    } finally {
      setLoading(false);
    }
  };

  const saveCard = async () => {
    if (!cardRef.current) return;
    playSound(clickSound);
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 4, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-LEGACY-${data?.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      alert("Error generating asset.");
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-green-500">
      
      {/* --- نظام تساقط الثلج (Snowfall) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(60)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], x: (Math.random() * 100 + (Math.random() * 20 - 10)) + "vw" }}
            transition={{ duration: Math.random() * 10 + 7, repeat: Infinity, ease: "linear", delay: Math.random() * 10 }}
            className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_8px_white]"
          />
        ))}
      </div>

      {/* --- شخصية SENKU الاحترافية (بدون إطار وتتحرك) --- */}
      <motion.div 
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        className="fixed bottom-0 left-0 z-50 hidden lg:block cursor-grab active:cursor-grabbing"
      >
        <div className="relative flex flex-col items-center">
          {/* هالة خضراء علمية خلف الشخصية */}
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-20 w-80 h-80 bg-green-500/20 blur-[120px] rounded-full"
          />
          
          <motion.div
            animate={loading ? { 
                y: [0, -30, 0],
                filter: ["brightness(1) contrast(1.2)", "brightness(1.5) contrast(1.5)", "brightness(1) contrast(1.2)"]
            } : { 
                y: [0, -15, 0] 
            }}
            transition={{ duration: loading ? 0.4 : 5, repeat: Infinity, ease: "easeInOut" }}
          >
            <img 
              src={imageSrc} 
              alt="Senku Agent"
              className="w-[400px] md:w-[500px] h-auto drop-shadow-[0_0_50px_rgba(34,197,94,0.4)] select-none pointer-events-none"
              onError={() => setImageSrc("https://www.transparentpng.com/download/anime/senku-ishigami-dr-stone-hd-png-30.png")}
            />
            
            {/* ملصق الحالة العائم */}
            <motion.div 
                className="absolute top-40 right-10 bg-black/60 border border-green-500/30 backdrop-blur-xl px-5 py-2 rounded-full flex items-center gap-3 shadow-2xl"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
            >
                <div className={`w-2 h-2 rounded-full ${loading ? 'bg-red-500 animate-ping' : 'bg-green-500 animate-pulse'}`} />
                <span className="text-[10px] font-mono text-green-400 font-bold tracking-widest uppercase">
                    {loading ? "DATA_CRUNCHING..." : "SENKU_READY"}
                </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- مفتاح كتم الصوت --- */}
      <button onClick={() => setIsMuted(!isMuted)} className="fixed top-8 right-8 z-50 p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 backdrop-blur-md transition-all">
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-green-400" />}
      </button>

      {/* --- الواجهة الرئيسية --- */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center mt-24">
        
        {/* اللوجو الضخم المستوحى من أول صورة */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center mb-20">
          <h1 className="text-[9rem] md:text-[16rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.1)]">
            WAGMI
          </h1>
          <p className="mt-2 text-[10px] md:text-[15px] font-mono tracking-[1.3em] text-green-400 uppercase font-black italic opacity-80">
               THE SCIENCE OF WEALTH
          </p>
        </motion.div>

        {/* حقل الإدخال */}
        <div className="w-full max-w-xl mb-24 px-4 relative">
          <div className="group relative p-[2px] rounded-full bg-white/10 focus-within:bg-gradient-to-r focus-within:from-green-500 focus-within:to-blue-600 transition-all duration-1000">
            <input 
              onMouseEnter={() => playSound(hoverSound)}
              className="w-full bg-black rounded-full p-7 text-center outline-none font-mono text-lg text-white placeholder:text-white/10 transition-all" 
              placeholder="ENTER SOLANA ADDRESS"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onMouseEnter={() => playSound(hoverSound)}
            onClick={analyze} 
            disabled={loading} 
            className="w-full mt-8 py-7 bg-white text-black rounded-full font-[1000] uppercase text-xl tracking-[0.6em] hover:scale-[1.03] transition-all shadow-[0_0_60px_rgba(255,255,255,0.15)] active:scale-95 flex items-center justify-center gap-4"
          >
            {loading ? <><Activity className="animate-spin" /> SCANNING...</> : "INITIATE PROTOCOL"}
          </button>
        </div>

        {/* ظهور الكرت عند توفر البيانات */}
        <AnimatePresence>
          {data && (
            <motion.div initial={{ scale: 0.8, opacity: 0, y: 50 }} animate={{ scale: 1, opacity: 1, y: 0 }} className="flex flex-col items-center gap-16 w-full px-2">
              
              <div className="relative w-full max-w-[650px] aspect-[1.58/1] rounded-[4rem] p-[4px] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,0.8)]">
                {/* الإطار المتحرك النيوني */}
                <div className="absolute inset-[-500%] animate-[spin_3s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#22c55e,#3b82f6,#22c55e,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#050505] rounded-[3.85rem] p-12 md:p-16 flex flex-col justify-between overflow-hidden">
                  {/* رأس الكرت */}
                  <div className="flex justify-between items-start z-10">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 md:w-20 md:h-20 bg-white/5 rounded-3xl flex items-center justify-center border border-white/10 shadow-inner">
                        <Fingerprint size={40} className="text-green-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-3xl md:text-4xl font-[1000] italic text-white uppercase tracking-tighter leading-tight">Wagmi Legacy</p>
                        <p className="text-[10px] md:text-[12px] font-mono text-white/20 tracking-[0.4em] uppercase">Authenticated Identity</p>
                      </div>
                    </div>
                    <Radio className="text-green-500 animate-pulse w-10 h-10" />
                  </div>

                  {/* رصيد الـ SOL */}
                  <div className="flex items-center gap-6 text-left z-10">
                    <h2 className="text-[6rem] md:text-[9.5rem] font-[1000] tracking-tighter text-white italic drop-shadow-[0_0_40px_rgba(255,255,255,0.2)] leading-none">
                        {data.sol}
                    </h2>
                    <span className="text-3xl md:text-4xl font-black text-green-400 italic mb-4">SOL</span>
                  </div>

                  {/* تذييل الكرت */}
                  <div className="flex justify-between items-end border-t border-white/5 pt-10 z-10">
                    <div className="text-left">
                        <div className="flex items-center gap-3 mb-3">
                           <ShieldCheck size={18} className="text-green-400" />
                           <p className="text-[10px] md:text-[14px] font-black text-green-400 uppercase tracking-widest italic">Verification: Success</p>
                        </div>
                        <p className="text-xl md:text-3xl font-[1000] italic text-white/90 uppercase">{data.status}</p>
                    </div>
                    <p className="text-[12px] font-mono text-white/20 uppercase tracking-widest">ID_{data.id}</p>
                  </div>
                </div>
              </div>

              {/* زر حفظ الكرت */}
              <button 
                onMouseEnter={() => playSound(hoverSound)}
                onClick={saveCard} 
                className="flex items-center gap-8 bg-white/5 border border-white/10 px-28 py-8 rounded-full font-[1000] text-sm uppercase tracking-[0.8em] hover:bg-white hover:text-black transition-all mb-20 shadow-xl"
              >
                SAVE ASSET <Download size={24} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* تذييل الموقع */}
        <footer className="mt-20 pb-20 flex flex-col items-center gap-8 opacity-20 hover:opacity-100 transition-all duration-700">
           <a href="https://github.com/bedro95" target="_blank" rel="noopener noreferrer" className="p-4 bg-white/5 rounded-full border border-white/10 hover:border-green-500 transition-colors">
              <Github size={28} />
           </a>
           <p className="text-[10px] font-mono tracking-[2em] uppercase text-center text-white/50">
             WAGMI PROTOCOL // <span className="text-white font-bold">BADER ALKORGLI</span>
           </p>
        </footer>
      </div>

      {/* --- الأنماط الإضافية --- */}
      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        body { background-color: #000; cursor: default; }
        ::-webkit-scrollbar { width: 0px; }
        ::selection { background: #22c55e; color: black; }
      `}</style>
    </div>
  );
}