"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Connection, PublicKey } from '@solana/web3.js';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Download, Radio, ShieldCheck, Fingerprint, 
  Volume2, VolumeX, Zap, Activity, Github, Cpu 
} from 'lucide-react';
import { toPng } from 'html-to-image';

export default function WagmiUltimateSovereign() {
  const [address, setAddress] = useState('');
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // استدعاء الصورة يدوياً من مجلد public لضمان الاستقرار 100%
  const senkuAgent = "/senku.png"; 

  // مراجع الملفات الصوتية للتفاعل
  const hoverSound = useRef<HTMLAudioElement | null>(null);
  const clickSound = useRef<HTMLAudioElement | null>(null);
  const scanSound = useRef<HTMLAudioElement | null>(null);
  const successSound = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // تحميل الأصوات عند تشغيل الصفحة
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
        status: sol >= 100 ? "SOLANA WHALE" : sol >= 10 ? "SCIENTIST LEVEL" : "WAGMI SURVIVOR",
        id: Math.floor(100000 + Math.random() * 900000),
        timestamp: new Date().toLocaleTimeString()
      });

      if (scanSound.current) scanSound.current.pause();
      playSound(successSound);
    } catch (e) { 
      if (scanSound.current) scanSound.current.pause();
      alert("Invalid Wallet Address. Please verify and try again."); 
    } finally { 
      setLoading(false); 
    }
  };

  const saveCard = async () => {
    playSound(clickSound);
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { pixelRatio: 4, backgroundColor: '#000' });
      const link = document.createElement('a');
      link.download = `WAGMI-CARD-${data?.id}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) { alert("Capture failed. Try again."); }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center p-4 md:p-10 font-sans overflow-x-hidden relative selection:bg-green-500 selection:text-black">
      
      {/* --- الأصل: نظام تساقط الثلج (Snow System) --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {[...Array(70)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ y: -20, x: Math.random() * 100 + "vw", opacity: 0 }}
            animate={{ y: "110vh", opacity: [0, 1, 1, 0], x: (Math.random() * 100 + (Math.random() * 10 - 5)) + "vw" }}
            transition={{ duration: Math.random() * 8 + 7, repeat: Infinity, ease: "linear", delay: Math.random() * 15 }}
            className="absolute w-[1.5px] h-[1.5px] bg-white rounded-full shadow-[0_0_8px_rgba(255,255,255,0.8)]"
          />
        ))}
      </div>

      {/* --- الوكيل الرقمي: Senku (النسخة الشفافة الكاملة) --- */}
      <motion.div 
        drag
        dragConstraints={{ left: -50, right: 50, top: -50, bottom: 50 }}
        className="fixed bottom-0 left-4 z-50 hidden lg:block cursor-grab active:cursor-grabbing pointer-events-auto"
      >
        <div className="relative flex flex-col items-center">
          {/* هالة طاقة علمية تحت الشخصية */}
          <motion.div 
            animate={{ scale: [1, 1.4, 1], opacity: [0.1, 0.4, 0.1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-20 w-80 h-80 bg-green-500/20 blur-[120px] rounded-full"
          />
          
          <motion.div
            animate={loading ? { 
              y: [0, -40, 0], 
              rotate: [0, 3, -3, 0],
              filter: ["brightness(1) contrast(1)", "brightness(1.5) contrast(1.2)", "brightness(1) contrast(1)"] 
            } : { 
              y: [0, -20, 0] 
            }}
            transition={{ duration: loading ? 0.5 : 4, repeat: Infinity, ease: "easeInOut" }}
            className="relative"
          >
            <img 
              src={senkuAgent} 
              alt="Senku Ishigami"
              className="w-[400px] md:w-[520px] h-auto drop-shadow-[0_0_60px_rgba(34,197,94,0.4)] select-none pointer-events-none"
              onError={(e) => {
                // في حال نسي بدر وضع الصورة، يظهر شعار احترافي بديل
                e.currentTarget.style.display = 'none';
              }}
            />
            
            {/* ملصق الحالة التفاعلي */}
            <motion.div 
              className="absolute top-32 right-12 bg-black/90 border border-green-500/50 backdrop-blur-xl px-5 py-2 rounded-full flex items-center gap-3 shadow-[0_0_20px_rgba(34,197,94,0.2)]"
              animate={{ x: [0, 8, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
                <div className="relative">
                   <Activity size={14} className="text-green-500 animate-pulse" />
                   <div className="absolute inset-0 bg-green-500 blur-sm opacity-50 animate-ping" />
                </div>
                <span className="text-[11px] font-mono text-green-400 tracking-widest uppercase font-black">
                    {loading ? "DATA_STREAMING..." : "SENKU_PROTOCOL_V7"}
                </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* --- أزرار التحكم --- */}
      <div className="fixed top-8 right-8 z-50 flex gap-4">
        <button onClick={() => setIsMuted(!isMuted)} className="p-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all backdrop-blur-md">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} className="text-green-400" />}
        </button>
      </div>

      {/* --- الواجهة الرئيسية --- */}
      <div className="relative z-10 w-full max-w-6xl flex flex-col items-center mt-20">
        
        {/* الشعار العملاق */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }} 
          animate={{ opacity: 1, scale: 1 }} 
          className="text-center mb-24 select-none"
        >
          <h1 className="text-9xl md:text-[16rem] font-[1000] italic tracking-tighter leading-none text-white drop-shadow-[0_0_80px_rgba(255,255,255,0.2)]">
            WAGMI
          </h1>
          <div className="flex items-center justify-center gap-6 mt-4">
             <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-green-500" />
             <p className="text-[12px] md:text-[16px] font-mono tracking-[1.5em] text-green-400 uppercase font-black italic">
                  THE KINGDOM OF SCIENCE
             </p>
             <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-green-500" />
          </div>
        </motion.div>

        {/* صندوق الإدخال الاحترافي */}
        <div className="w-full max-w-xl mb-24 px-4 relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-500 to-blue-600 rounded-full blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative p-[2px] rounded-full bg-white/10 focus-within:bg-green-500 transition-all duration-500">
            <input 
              onMouseEnter={() => playSound(hoverSound)}
              className="w-full bg-black rounded-full p-8 text-center outline-none font-mono text-lg md:text-xl text-white placeholder:text-white/10 border-none tracking-widest" 
              placeholder="PASTE WALLET SIGNATURE"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <button 
            onMouseEnter={() => playSound(hoverSound)}
            onClick={() => { playSound(clickSound); analyze(); }} 
            disabled={loading} 
            className="w-full mt-8 py-7 bg-white text-black rounded-full font-[1000] uppercase text-xl tracking-[0.6em] hover:bg-green-500 transition-all active:scale-95 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex items-center justify-center gap-4"
          >
            {loading ? <><Cpu className="animate-spin" /> CALCULATING...</> : "EXECUTE SCAN"}
          </button>
        </div>

        {/* عرض كرت WAGMI LEGACY */}
        <AnimatePresence>
          {data && (
            <motion.div 
              initial={{ y: 100, opacity: 0, rotateX: 45 }} 
              animate={{ y: 0, opacity: 1, rotateX: 0 }} 
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center gap-16 w-full px-2 perspective-1000"
            >
              <div className="relative w-full max-w-[650px] aspect-[1.58/1] rounded-[4rem] p-[4px] overflow-hidden shadow-[0_0_150px_rgba(0,0,0,1)]">
                {/* إطار النيون المتحرك */}
                <div className="absolute inset-[-500%] animate-[spin_3s_linear_infinity] bg-[conic-gradient(from_0deg,transparent,transparent,#22c55e,#3b82f6,#22c55e,transparent,transparent)]" />
                
                <div ref={cardRef} className="relative w-full h-full bg-[#040404] rounded-[3.8rem] p-12 md:p-16 overflow-hidden flex flex-col justify-between z-10 border border-white/5">
                  
                  {/* خلفية داخلية خفيفة */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#22c55e15,transparent)] pointer-events-none" />

                  <div className="flex justify-between items-start relative z-20">
                    <div className="flex items-center gap-8">
                      <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-[2rem] flex items-center justify-center border border-white/10 shadow-inner">
                        <Fingerprint size={45} className="text-green-400" />
                      </div>
                      <div className="text-left">
                        <p className="text-3xl md:text-4xl font-[1000] italic text-white uppercase tracking-tighter">Wagmi Legacy</p>
                        <p className="text-[12px] font-mono text-white/30 tracking-[0.4em] uppercase">Authenticated Identity</p>
                      </div>
                    </div>
                    <Radio className="text-green-500 animate-pulse w-10 h-10" />
                  </div>

                  <div className="flex items-center gap-6 text-left relative z-20">
                    <h2 className="text-8xl md:text-[9.5rem] font-[1000] tracking-tighter text-white italic drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] leading-none">{data.sol}</h2>
                    <span className="text-3xl md:text-4xl font-black text-green-400 italic mt-8 md:mt-12 uppercase tracking-widest">SOL</span>
                  </div>

                  <div className="flex justify-between items-end border-t border-white/10 pt-10 relative z-20">
                    <div className="text-left">
                        <div className="flex items-center gap-3 mb-3">
                           <ShieldCheck size={20} className="text-green-400" />
                           <p className="text-[12px] font-black text-green-400 uppercase tracking-widest italic">Protocol Verified</p>
                        </div>
                        <p className="text-2xl md:text-4xl font-[1000] italic text-white/95 uppercase tracking-tight">{data.status}</p>
                    </div>
                    <div className="text-right">
                       <p className="text-[12px] font-mono text-white/40 uppercase tracking-widest mb-1 italic">ID_{data.id}</p>
                       <p className="text-[8px] font-mono text-green-500/50 uppercase tracking-widest italic">SENSING_{data.timestamp}</p>
                    </div>
                  </div>
                </div>
              </div>

              <button 
                onMouseEnter={() => playSound(hoverSound)}
                onClick={saveCard} 
                className="group flex items-center gap-8 bg-white/5 border border-white/10 px-32 py-8 rounded-full font-[1000] text-sm uppercase tracking-[1em] hover:bg-white hover:text-black transition-all duration-500 mb-20 shadow-2xl"
              >
                SAVE ASSET <Download size={24} className="group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* التذييل */}
        <footer className="mt-20 pb-20 flex flex-col items-center gap-10 opacity-20 hover:opacity-100 transition-all duration-1000">
           <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-green-500 to-transparent" />
           <p className="text-[12px] font-mono tracking-[2.5em] uppercase text-center text-white/50 pl-[2.5em]">
             WAGMI // BADER ALKORGLI
           </p>
        </footer>
      </div>

      {/* تنسيقات إضافية */}
      <style jsx global>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        body { background-color: #000; overflow-x: hidden; }
        ::-webkit-scrollbar { width: 0px; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </div>
  );
}