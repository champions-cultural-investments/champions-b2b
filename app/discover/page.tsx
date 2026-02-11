'use client';

// ============================================================================
// CHAMPIONS — ARTIST DISCOVERY SEARCH
// "Find the unknown-unknowns before anyone else"
// Version 1.0 — February 2026
// ============================================================================
//
// AESTHETIC: Intelligence Terminal — dense, data-rich, Bloomberg-grade
// This is the page that proves Champions' depth to investors.
// Every row is a potential £200K decision made early for £20K.
//
// ============================================================================

import React, { useState, useMemo, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// THEME SYSTEM
// ============================================================================
interface Theme {
  mode: string;
  void: string;
  surface: string;
  surfaceEl: string;
  surfaceHover: string;
  glass: string;
  text: string;
  textSec: string;
  textTer: string;
  textDim: string;
  border: string;
  borderSub: string;
  borderGlass: string;
  pulse: string;
  pulseGlow: string;
  pulseDim: string;
  intel: string;
  brand: string;
  heat: string;
  alert: string;
  amber: string;
  success: string;
  logoText: string;
  inputBg: string;
  cardShadow: string;
  rowHover: string;
}

const themes: { dark: Theme; light: Theme } = {
  dark: {
    mode:'dark',
    void:'#060609',surface:'#0C0C12',surfaceEl:'#131320',surfaceHover:'#1A1A2D',
    glass:'rgba(12,12,18,0.88)',text:'#EDEDEA',textSec:'#8D8DA0',textTer:'#5A5A72',
    textDim:'#3A3A52',border:'#1E1E35',borderSub:'#161628',borderGlass:'rgba(255,255,255,0.045)',
    pulse:'#CDFF00',pulseGlow:'rgba(205,255,0,0.10)',pulseDim:'rgba(205,255,0,0.04)',
    intel:'#00D4FF',brand:'#A855F7',heat:'#FF6B35',alert:'#FF3366',amber:'#FFAA00',
    success:'#10B981',logoText:'#EDEDEA',inputBg:'#0C0C12',
    cardShadow:'none',rowHover:'rgba(205,255,0,0.03)',
  },
  light: {
    mode:'light',
    void:'#F6F5F1',surface:'#FFFFFF',surfaceEl:'#F0EFE9',surfaceHover:'#E8E7E0',
    glass:'rgba(255,255,255,0.92)',text:'#111111',textSec:'#555566',textTer:'#888899',
    textDim:'#AAAABB',border:'#DDD8D0',borderSub:'#E8E3DB',borderGlass:'rgba(0,0,0,0.06)',
    pulse:'#5A8A00',pulseGlow:'rgba(90,138,0,0.08)',pulseDim:'rgba(90,138,0,0.04)',
    intel:'#0094B3',brand:'#7C3AED',heat:'#E55A2B',alert:'#DC2655',amber:'#CC8800',
    success:'#0D9668',logoText:'#111111',inputBg:'#F6F5F1',
    cardShadow:'0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
    rowHover:'rgba(90,138,0,0.04)',
  },
};
const ThemeContext = createContext<Theme>(themes.dark);

// ============================================================================
// CHAMPIONS LOGO — Inline SVG, theme-adaptive wordmark
// ============================================================================
const ChampionsLogo = ({ height = 20 }: { height?: number }) => {
  const th = useContext(ThemeContext);
  return (
    <a href="/" style={{display:'inline-flex',alignItems:'center',textDecoration:'none',flexShrink:0}}>
      <svg viewBox="0 0 816 144" height={height} style={{display:'block'}}>
        <path fill="#00DA48" fillRule="evenodd" d="M536.701 1.462c2.012.022 3.936.434 5.775 1.238l1.568 1.567c.716 2.143.936 4.342.66 6.6a28.195 28.195 0 0 1-2.97 11.385 34.626 34.626 0 0 1-2.805 4.786l-.248-.166a64.62 64.62 0 0 0 1.65-6.27 16.218 16.218 0 0 0-.907-3.795 58.554 58.554 0 0 0-2.31-3.465 84.192 84.192 0 0 1-6.765-5.775 4.866 4.866 0 0 1-.578-1.485c.233-1.36.95-2.377 2.145-3.052a12.399 12.399 0 0 1 4.785-1.568" opacity=".978"/>
        <path fill="#04D847" fillRule="evenodd" d="M72.556 19.778c3.323.272 4.56 2.032 3.713 5.28a15.034 15.034 0 0 1-2.145 3.63c-6.376 6.421-9.951 14.121-10.725 23.1-1.124-.87-1.784-2.026-1.98-3.465a37.683 37.683 0 0 1-1.073-7.178 47.33 47.33 0 0 1 1.403-10.807 21.83 21.83 0 0 1 5.197-8.498c1.625-1.212 3.495-1.9 5.61-2.062" opacity=".968"/>
        <path fill="#00D948" fillRule="evenodd" d="M554.851 22.088a15.07 15.07 0 0 1 5.94.742c2.896 1.254 4.08 3.427 3.548 6.517a11 11 0 0 1-3.383 4.373 37.141 37.141 0 0 1-10.23 5.115 68.286 68.286 0 0 0-6.765 3.63 22.39 22.39 0 0 0-7.177 8.497c-.396-.161-.535-.409-.413-.742a7.472 7.472 0 0 1-1.155-2.475c-1.027-7.97 1.448-14.68 7.425-20.13l3.465-2.475c2.77-1.61 5.683-2.627 8.745-3.053" opacity=".978"/>
        <path fill="#04D847" fillRule="evenodd" d="M19.262 25.058a8.423 8.423 0 0 0 2.062 0c5.49.766 10.743 2.498 15.758 5.197 9.012 6.153 16.19 13.99 21.532 23.513.409 1.26.931 2.47 1.568 3.63.141.77.361 1.512.66 2.227l-.165.248a105.683 105.683 0 0 0-3.96-3.053c-10.127-6.304-20.962-9.522-32.505-9.652-.418.068-.83.123-1.238.165l-.825-.33a4.818 4.818 0 0 1-1.155.165c-1.66-.23-3.255-.56-4.785-.99-.34.057-.67-.053-.99-.33-.34.057-.67-.053-.99-.33l-.165.165C9.99 43.006 7.982 39.239 8.042 34.38c.418-4.603 2.893-7.518 7.425-8.745a40.412 40.412 0 0 1 3.795-.577" opacity=".985"/>
        <path fill="#04D848" fillRule="evenodd" d="M31.801 56.738a39.107 39.107 0 0 1 16.995 3.712c.25.278.526.526.825.742a2.53 2.53 0 0 1-1.155.495 29.552 29.552 0 0 0-11.385.908 48.59 48.59 0 0 0-5.94 2.31 344.444 344.444 0 0 0-8.745 5.115c-1.724 1.051-3.54 1.271-5.445.66-2.133-1.243-2.766-3.031-1.897-5.363a12.926 12.926 0 0 1 4.867-4.867 33.247 33.247 0 0 1 11.88-3.713" opacity=".98"/>
        {[
          "M138.722 35.947h24.42c-.029 9.406 0 18.81.082 28.215 8.776-6.093 18.538-9.118 29.288-9.075a43.473 43.473 0 0 1 14.85 2.393c7.474 3.02 12.012 8.493 13.612 16.417.201 1.095.366 2.195.495 3.3a1681.3 1681.3 0 0 1 .248 39.765h-24.585c.028-9.625 0-19.25-.083-28.875-.155-2.884-1.089-5.469-2.805-7.755-1.624-1.65-3.576-2.723-5.857-3.217-9.513-1.603-17.9.734-25.163 7.013-.082 10.944-.11 21.89-.082 32.834h-24.42z",
          "M92.191 55.088a91.509 91.509 0 0 1 18.81 1.567c5.95 1.134 11.285 3.553 16.005 7.26 5.278 4.918 8.193 10.995 8.745 18.233-8.305.027-16.61 0-24.915-.083-1.25-2.855-3.395-4.67-6.435-5.445a27.41 27.41 0 0 0-6.27-.99 44.673 44.673 0 0 0-13.365.99c-4.853 1.534-7.218 4.861-7.095 9.983.005 5.81 2.865 9.248 8.58 10.312a47.294 47.294 0 0 0 17.49-.165c3.301-.719 5.666-2.589 7.095-5.61 8.305-.082 16.61-.11 24.915-.082-1.029 11.227-6.749 18.955-17.16 23.182a58.791 58.791 0 0 1-18.15 3.63 88.319 88.319 0 0 1-22.935-1.485c-5.333-1.073-10.173-3.217-14.52-6.435-5.272-4.41-8.38-10.048-9.322-16.912-.901-6.21-.462-12.314 1.32-18.315 2.528-6.984 7.176-12.017 13.942-15.098a50.913 50.913 0 0 1 15.345-3.96c2.662-.248 5.302-.44 7.92-.577m170.776-.001a87.841 87.841 0 0 1 18.315 1.568c13.718 2.882 21.39 11.27 23.017 25.162.24 11.712.323 23.427.248 35.146h-24.42c.054-2.368 0-4.733-.165-7.096-6.688 4.623-14.113 7.235-22.275 7.838a61.199 61.199 0 0 1-15.345-.165c-5.287-.605-9.963-2.585-14.025-5.94-4.333-4.764-5.681-10.291-4.043-16.582 1.457-4.427 4.234-7.755 8.333-9.983a44.914 44.914 0 0 1 16.335-4.62 83.672 83.672 0 0 1 26.07.99c1.716.443 3.42.91 5.115 1.402-.116-2.947-1.547-4.955-4.29-6.022a18.64 18.64 0 0 0-4.455-.99 125.942 125.942 0 0 0-34.98 2.887l-7.755-17.49a134.564 134.564 0 0 1 34.32-6.105m-4.785 38.116c3.85-.028 7.7 0 11.55.082 3.494.107 6.931.575 10.312 1.403.083.823.11 1.648.083 2.474-9.183 3.642-18.698 5.045-28.545 4.208-3.154-.613-4.116-2.4-2.888-5.362a5.504 5.504 0 0 1 2.723-1.733 39.479 39.479 0 0 1 6.765-1.073",
          "M357.181 55.087a34.42 34.42 0 0 1 14.85 2.558c4.007 1.806 7.06 4.639 9.158 8.497 6.303-5.858 13.754-9.35 22.357-10.477a43.313 43.313 0 0 1 17.325.66c9.127 2.858 14.324 9.046 15.593 18.562.152 1.151.262 2.306.33 3.465.082 12.87.11 25.74.082 38.61h-24.42a979.09 979.09 0 0 0-.247-29.535c-.294-7.223-4.033-10.853-11.22-10.89-4.749.08-9.01 1.537-12.788 4.373a50.994 50.994 0 0 0-3.712 3.218c-.083 10.944-.11 21.89-.083 32.834h-24.42c.029-8.965 0-17.93-.082-26.895a27.421 27.421 0 0 0-.99-7.094c-.962-2.943-2.916-4.896-5.858-5.858-6.357-1.347-12.132-.082-17.325 3.795a50.994 50.994 0 0 0-3.712 3.218c-.083 10.944-.11 21.89-.083 32.834h-24.42V56.077h24.42c-.054 3.302 0 6.602.165 9.9 6.893-6.965 15.253-10.595 25.08-10.89",
          "M488.026 55.087c7.746-.381 15.06 1.186 21.945 4.703 7.444 4.62 11.76 11.302 12.953 20.047 1.145 7.295.43 14.39-2.145 21.285-3.2 7.159-8.506 12.027-15.923 14.603-9.942 3.296-19.842 3.186-29.7-.33a29.192 29.192 0 0 1-9.982-6.518c-.083 11.165-.11 22.33-.083 33.496h-24.42V56.078h24.42c-.028 2.695 0 5.39.083 8.084 4.546-4.266 9.908-6.989 16.087-8.167 2.264-.42 4.52-.722 6.765-.908m-9.57 20.46c2.367-.027 4.731 0 7.095.083 3.18.086 6.204.8 9.075 2.145 2.19 1.365 3.536 3.318 4.043 5.857.526 2.89.25 5.696-.825 8.415-1.564 2.477-3.792 4.044-6.683 4.703a45.501 45.501 0 0 1-18.81-.165c-4.304-1.21-6.697-4.043-7.177-8.498-.686-6.418 2.092-10.35 8.332-11.797a59.813 59.813 0 0 1 4.95-.743m114.18-20.459a82.609 82.609 0 0 1 21.615 2.227c4.904 1.242 9.305 3.442 13.2 6.6 5.544 5.181 8.486 11.589 8.828 19.223 1.28 18.736-7.272 29.929-25.658 33.577a87.38 87.38 0 0 1-31.185 0c-19.187-4.018-27.685-15.816-25.492-35.392 1.435-11.335 7.514-18.952 18.232-22.853a67.703 67.703 0 0 1 20.46-3.382m-1.155 20.46c4.045-.17 8.06.077 12.045.742 6.294 1.495 9.07 5.483 8.333 11.963-.315 3.777-2.213 6.39-5.693 7.837a32.765 32.765 0 0 1-11.137 1.567 37.614 37.614 0 0 1-9.653-1.072c-4.334-1.109-6.727-3.886-7.177-8.332-.695-6.894 2.358-10.937 9.157-12.128a74.079 74.079 0 0 1 4.125-.577m99.166-20.46a47.8 47.8 0 0 1 17.325 2.392c6.53 2.515 10.847 7.108 12.952 13.778a33.836 33.836 0 0 1 1.155 5.94 1681.3 1681.3 0 0 1 .248 39.765h-24.585c.028-9.626 0-19.25-.083-28.875-.155-2.885-1.089-5.47-2.805-7.755-1.624-1.651-3.576-2.724-5.857-3.218-9.513-1.603-17.9.734-25.163 7.013a3267.06 3267.06 0 0 0-.082 32.835h-24.42V56.078h24.42c-.029 2.695 0 5.39.082 8.085 8.044-5.643 16.982-8.668 26.813-9.075",
          "M762.917 55.087c6.669-.1 13.323.148 19.965.743a44.266 44.266 0 0 1 12.705 3.135c7.02 3.321 10.43 8.904 10.23 16.747-8.14.028-16.281 0-24.42-.082-.352-1.56-1.342-2.44-2.97-2.64a28.504 28.504 0 0 0-2.475-.33c-6.82-.3-13.64-.3-20.46 0a11.487 11.487 0 0 0-4.125.825c-.863.874-.863 1.754 0 2.64a8 8 0 0 0 2.64.825c9.238.61 18.478 1.216 27.72 1.815a67.225 67.225 0 0 1 15.675 2.97c4.669 1.535 7.887 4.587 9.652 9.157 1.284 5.191.9 10.251-1.155 15.18-2.066 3.935-5.173 6.713-9.322 8.333a51.91 51.91 0 0 1-14.52 3.135c-9.74.777-19.475.722-29.205-.165a53.24 53.24 0 0 1-16.5-3.96c-7.422-3.48-11.107-9.338-11.055-17.573h24.42c-.032 1.34.518 2.357 1.65 3.053a19.332 19.332 0 0 0 6.765 1.485c6.654.329 13.31.329 19.965 0 1.5-.048 2.928-.378 4.29-.99 1.176-1.083 1.287-2.266.33-3.548a6.51 6.51 0 0 0-2.97-.907 1749.42 1749.42 0 0 1-27.39-1.485 82.715 82.715 0 0 1-12.87-1.98c-10.663-2.696-14.925-9.489-12.788-20.378 1.358-5.374 4.575-9.196 9.653-11.467a50.662 50.662 0 0 1 15.345-3.795c3.76-.34 7.499-.588 11.22-.743",
          "M526.306 56.408h24.42v60.555h-24.42z",
        ].map((d,i)=><path key={i} fill={th.logoText} fillRule="evenodd" d={d} opacity={[.993,.991,.993,.992,.989,.995][i]||.993}/>)}
      </svg>
    </a>
  );
};

// ============================================================================
// SHARED UI PRIMITIVES
// ============================================================================
const NoiseOverlay = () => (
  <div style={{position:'fixed',inset:0,pointerEvents:'none',zIndex:9999,opacity:0.018,mixBlendMode:'overlay',
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  }}/>
);

const ThemeToggle = ({isDark, onToggle}: {isDark: boolean; onToggle: () => void}) => {
  const th = useContext(ThemeContext);
  return (
    <motion.button onClick={onToggle} whileHover={{scale:1.06}} whileTap={{scale:0.94}}
      title={isDark?'Switch to light mode':'Switch to dark mode'}
      style={{width:36,height:36,borderRadius:8,cursor:'pointer',display:'flex',alignItems:'center',
        justifyContent:'center',background:th.surfaceEl,border:`1px solid ${th.border}`,
        color:th.textSec,fontSize:15,position:'relative',overflow:'hidden'}}>
      <AnimatePresence mode="wait">
        <motion.span key={isDark?'sun':'moon'} initial={{y:12,opacity:0}} animate={{y:0,opacity:1}}
          exit={{y:-12,opacity:0}} transition={{duration:0.2}}>
          {isDark ? '☀' : '☾'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

const LiveDot = ({color}: {color?: string}) => {
  const th = useContext(ThemeContext);
  return (
    <motion.div animate={{opacity:[1,0.3,1]}} transition={{duration:1.5,repeat:Infinity}}
      style={{width:6,height:6,borderRadius:'50%',background:color||th.success,flexShrink:0}}/>
  );
};

const Badge = ({children, color}: {children: React.ReactNode; color?: string}) => {
  const th = useContext(ThemeContext);
  const c = color||th.pulse;
  return (
    <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:'0.06em',fontWeight:700,
      padding:'3px 8px',borderRadius:4,background:`${c}12`,color:c,border:`1px solid ${c}20`,whiteSpace:'nowrap'}}>
      {children}
    </span>
  );
};

const Sparkline = ({data, color, w=80, h=24}: {data: number[]; color: string; w?: number; h?: number}) => {
  const max = Math.max(...data), min = Math.min(...data), range = max-min||1;
  const d = data.map((p,i)=>{
    const x = (i/(data.length-1))*w;
    const y = h-((p-min)/range)*h*0.8-h*0.1;
    return `${i===0?'M':'L'}${x},${y}`;
  }).join(' ');
  return (
    <svg width={w} height={h} style={{display:'block'}}>
      <path d={`${d} L${w},${h} L0,${h} Z`} fill={`${color}15`}/>
      <path d={d} fill="none" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  );
};

// ============================================================================
// MOCK DATA — 20 realistic artists across genres/locations
// ============================================================================
interface Artist {
  id: number;
  name: string;
  genre: string;
  loc: string;
  cmi: number;
  d7: number;
  d30: number;
  ig: string;
  tt: string;
  sp: string;
  yt: string;
  signal: 'breakout' | 'rising' | 'watching' | 'early';
  signed: boolean;
  trend: number[];
}

const allArtists: Artist[] = [
  {id:1,name:'Kofi Mensah',genre:'UK Drill',loc:'Croydon, UK',cmi:78,d7:12.7,d30:18.2,ig:'180K',tt:'1.2M',sp:'95K',yt:'45K',signal:'breakout',signed:false,trend:[42,45,50,54,60,64,68,72,74,78]},
  {id:2,name:'Lyra Stone',genre:'Alt R&B',loc:'Atlanta, US',cmi:74,d7:9.2,d30:14.1,ig:'210K',tt:'780K',sp:'145K',yt:'92K',signal:'breakout',signed:false,trend:[38,42,44,50,55,58,63,67,71,74]},
  {id:3,name:'Blessing Chibueze',genre:'Afrobeats',loc:'Lagos, NG',cmi:72,d7:8.3,d30:12.6,ig:'245K',tt:'890K',sp:'125K',yt:'67K',signal:'rising',signed:false,trend:[35,38,42,48,52,58,62,66,70,72]},
  {id:4,name:'Kenji Hara',genre:'Dream Pop',loc:'Tokyo, JP',cmi:71,d7:6.4,d30:9.8,ig:'88K',tt:'290K',sp:'110K',yt:'55K',signal:'rising',signed:false,trend:[40,42,45,48,52,56,60,64,68,71]},
  {id:5,name:'Dayo Okafor',genre:'Alté',loc:'Lagos, NG',cmi:69,d7:7.8,d30:11.3,ig:'135K',tt:'450K',sp:'88K',yt:'38K',signal:'rising',signed:false,trend:[32,35,40,44,48,52,56,60,65,69]},
  {id:6,name:'Zara Okwu',genre:'Neo-Soul',loc:'London, UK',cmi:68,d7:5.1,d30:8.7,ig:'92K',tt:'340K',sp:'78K',yt:'28K',signal:'rising',signed:false,trend:[36,39,42,46,50,54,58,62,66,68]},
  {id:7,name:'Mika Silva',genre:'Electronic',loc:'Berlin, DE',cmi:66,d7:4.5,d30:7.2,ig:'110K',tt:'380K',sp:'72K',yt:'41K',signal:'watching',signed:false,trend:[34,37,40,44,48,52,55,58,62,66]},
  {id:8,name:'Amara Diallo',genre:'Afro-Swing',loc:'Paris, FR',cmi:65,d7:3.9,d30:6.5,ig:'156K',tt:'520K',sp:'62K',yt:'33K',signal:'watching',signed:false,trend:[30,33,38,42,46,50,54,58,62,65]},
  {id:9,name:'Priya Sharma',genre:'Indie Pop',loc:'Mumbai, IN',cmi:63,d7:5.8,d30:9.1,ig:'72K',tt:'410K',sp:'55K',yt:'22K',signal:'rising',signed:false,trend:[28,32,36,40,45,48,52,56,60,63]},
  {id:10,name:'Marco Rivera',genre:'Reggaeton',loc:'Bogotá, CO',cmi:61,d7:4.2,d30:7.8,ig:'195K',tt:'670K',sp:'48K',yt:'36K',signal:'watching',signed:false,trend:[25,29,33,38,42,46,50,54,58,61]},
  {id:11,name:'Suki Watanabe',genre:'City Pop',loc:'Osaka, JP',cmi:59,d7:6.1,d30:10.4,ig:'65K',tt:'220K',sp:'42K',yt:'19K',signal:'rising',signed:false,trend:[22,26,30,35,40,44,48,52,56,59]},
  {id:12,name:'Tomás Almeida',genre:'MPB Fusion',loc:'São Paulo, BR',cmi:57,d7:3.3,d30:5.9,ig:'88K',tt:'310K',sp:'38K',yt:'15K',signal:'watching',signed:false,trend:[24,28,32,36,40,44,48,52,55,57]},
  {id:13,name:'Fatou Cissé',genre:'Desert Blues',loc:'Bamako, ML',cmi:55,d7:7.2,d30:12.1,ig:'45K',tt:'180K',sp:'28K',yt:'12K',signal:'rising',signed:false,trend:[18,22,26,32,38,42,46,50,53,55]},
  {id:14,name:'Elsa Bergström',genre:'Synth Pop',loc:'Stockholm, SE',cmi:53,d7:2.8,d30:4.6,ig:'78K',tt:'250K',sp:'35K',yt:'21K',signal:'watching',signed:false,trend:[26,29,32,36,40,43,46,48,51,53]},
  {id:15,name:'Chen Wei',genre:'Mandopop',loc:'Taipei, TW',cmi:51,d7:4.9,d30:8.3,ig:'120K',tt:'540K',sp:'22K',yt:'48K',signal:'watching',signed:false,trend:[20,24,28,32,36,40,44,47,49,51]},
  {id:16,name:'Aisha Mohammed',genre:'Afro-Soul',loc:'Nairobi, KE',cmi:49,d7:5.5,d30:9.7,ig:'38K',tt:'150K',sp:'18K',yt:'9K',signal:'rising',signed:false,trend:[15,18,22,26,30,35,40,44,47,49]},
  {id:17,name:'Ollie Frost',genre:'UK Garage',loc:'Bristol, UK',cmi:47,d7:3.1,d30:5.2,ig:'55K',tt:'190K',sp:'25K',yt:'14K',signal:'watching',signed:false,trend:[18,22,26,30,34,37,40,43,45,47]},
  {id:18,name:'Nina Petrović',genre:'Balkan Beat',loc:'Belgrade, RS',cmi:44,d7:2.4,d30:3.8,ig:'32K',tt:'120K',sp:'15K',yt:'8K',signal:'early',signed:false,trend:[16,19,22,26,30,33,36,39,42,44]},
  {id:19,name:'Rémi Dubois',genre:'French Rap',loc:'Marseille, FR',cmi:42,d7:6.7,d30:11.5,ig:'95K',tt:'480K',sp:'32K',yt:'26K',signal:'rising',signed:false,trend:[12,16,20,24,28,32,35,38,40,42]},
  {id:20,name:'Isla Campbell',genre:'Folk Electronica',loc:'Glasgow, UK',cmi:39,d7:1.8,d30:3.1,ig:'28K',tt:'85K',sp:'12K',yt:'6K',signal:'early',signed:false,trend:[14,17,20,24,28,30,33,35,37,39]},
];

const genres = ['All Genres','Afrobeats','Alt R&B','Alté','Afro-Swing','Afro-Soul','Balkan Beat','City Pop','Desert Blues','Dream Pop','Electronic','Folk Electronica','French Rap','Indie Pop','MPB Fusion','Mandopop','Neo-Soul','Reggaeton','Synth Pop','UK Drill','UK Garage'];
const locations = ['All Locations','UK','US','Nigeria','Japan','Germany','France','India','Colombia','Brazil','Mali','Sweden','Taiwan','Kenya','Serbia'];
const signals = ['All Signals','breakout','rising','watching','early'];
const cmiRanges = ['All CMI','75+','60–74','45–59','30–44'];

// ============================================================================
// NAV HEADER
// ============================================================================
const Nav = ({isDark, onToggle}: {isDark: boolean; onToggle: () => void}) => {
  const th = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('discover');
  const tabs = [{id:'dashboard',l:'Dashboard'},{id:'discover',l:'Discover'},{id:'watchlist',l:'Watchlist'},{id:'alerts',l:'Alerts'},{id:'reports',l:'Reports'}];

  return (
    <header style={{position:'sticky',top:0,zIndex:100,background:`${th.void}F2`,backdropFilter:'blur(20px)',
      borderBottom:`1px solid ${th.border}`}}>
      <div style={{maxWidth:1440,margin:'0 auto',padding:'0 28px',display:'flex',alignItems:'center',height:56,gap:20}}>
        <ChampionsLogo height={18}/>
        <div style={{width:1,height:22,background:th.border}}/>
        <nav style={{display:'flex',gap:2,flex:1}}>
          {tabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{
              fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:activeTab===tab.id?700:400,
              letterSpacing:'0.06em',color:activeTab===tab.id?th.pulse:th.textSec,
              background:activeTab===tab.id?th.pulseGlow:'transparent',
              border:'none',padding:'8px 14px',borderRadius:6,cursor:'pointer',transition:'all 0.15s'}}>
              {tab.l.toUpperCase()}
            </button>
          ))}
        </nav>
        <ThemeToggle isDark={isDark} onToggle={onToggle}/>
        <div style={{width:32,height:32,borderRadius:8,
          background:`linear-gradient(135deg,${th.pulse}30,${th.intel}30)`,
          border:`1px solid ${th.border}`,display:'flex',alignItems:'center',justifyContent:'center',
          fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,color:th.text}}>
          SC
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// FILTER BAR
// ============================================================================
interface Filters {
  search: string;
  genre: string;
  location: string;
  signal: string;
  cmi: string;
  minFollowers?: string;
  platform?: string;
  momentum?: string;
  signed?: string;
  sort: string;
}

const FilterBar = ({filters, setFilters, resultCount}: {filters: Filters; setFilters: (f: Filters) => void; resultCount: number}) => {
  const th = useContext(ThemeContext);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const SelectFilter = ({label, value, options, onChange, width=140}: {label: string; value: string; options: string[]; onChange: (v: string) => void; width?: number}) => (
    <div style={{display:'flex',flexDirection:'column',gap:4}}>
      <span style={{fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:'0.1em',
        color:th.textDim,textTransform:'uppercase'}}>{label}</span>
      <select value={value} onChange={e=>onChange(e.target.value)} style={{
        fontFamily:"'Space Mono',monospace",fontSize:10,color:th.text,
        background:th.inputBg,border:`1px solid ${th.border}`,borderRadius:5,
        padding:'7px 10px',width,cursor:'pointer',outline:'none',
        WebkitAppearance:'none',appearance:'none',
        backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='${encodeURIComponent(th.textTer)}'/%3E%3C/svg%3E")`,
        backgroundRepeat:'no-repeat',backgroundPosition:'right 8px center',
        paddingRight:24,
      }}>
        {options.map(o=><option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );

  const activeCount = [filters.genre,filters.location,filters.signal,filters.cmi].filter(f=>!f.startsWith('All')).length;

  return (
    <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:10,
      padding:'16px 20px',boxShadow:th.cardShadow,marginBottom:16}}>
      {/* Row 1: Search + quick filters */}
      <div style={{display:'flex',alignItems:'flex-end',gap:12,marginBottom:showAdvanced?14:0}}>
        {/* Search */}
        <div style={{flex:1,display:'flex',flexDirection:'column',gap:4}}>
          <span style={{fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:'0.1em',
            color:th.textDim,textTransform:'uppercase'}}>ARTIST SEARCH</span>
          <div style={{display:'flex',alignItems:'center',gap:8,padding:'7px 12px',borderRadius:6,
            background:th.inputBg,border:`1px solid ${th.border}`}}>
            <span style={{color:th.textTer,fontSize:13}}>⌕</span>
            <input type="text" placeholder="Search artists, genres, locations..."
              value={filters.search} onChange={e=>setFilters({...filters,search:e.target.value})}
              style={{flex:1,background:'transparent',border:'none',outline:'none',
                fontFamily:"'Space Mono',monospace",fontSize:11,color:th.text}}/>
            {filters.search && (
              <span onClick={()=>setFilters({...filters,search:''})}
                style={{color:th.textTer,cursor:'pointer',fontSize:11}}>✕</span>
            )}
          </div>
        </div>

        <SelectFilter label="Genre" value={filters.genre} options={genres}
          onChange={v=>setFilters({...filters,genre:v})} width={150}/>
        <SelectFilter label="Location" value={filters.location} options={locations}
          onChange={v=>setFilters({...filters,location:v})} width={140}/>
        <SelectFilter label="Signal" value={filters.signal} options={signals}
          onChange={v=>setFilters({...filters,signal:v})} width={130}/>
        <SelectFilter label="CMI Range" value={filters.cmi} options={cmiRanges}
          onChange={v=>setFilters({...filters,cmi:v})} width={110}/>

        {/* Advanced toggle */}
        <motion.button whileHover={{scale:1.03}} onClick={()=>setShowAdvanced(!showAdvanced)} style={{
          fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,letterSpacing:'0.06em',
          padding:'9px 12px',borderRadius:5,cursor:'pointer',whiteSpace:'nowrap',
          background:showAdvanced?th.pulseGlow:'transparent',
          color:showAdvanced?th.pulse:th.textTer,
          border:`1px solid ${showAdvanced?th.pulse+'30':th.border}`,marginBottom:0,alignSelf:'flex-end',
        }}>
          {showAdvanced?'LESS':'MORE'} FILTERS {activeCount>0&&`(${activeCount})`}
        </motion.button>
      </div>

      {/* Row 2: Advanced filters */}
      <AnimatePresence>
        {showAdvanced && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}}
            exit={{height:0,opacity:0}} transition={{duration:0.2}} style={{overflow:'hidden'}}>
            <div style={{display:'flex',gap:12,paddingTop:14,borderTop:`1px solid ${th.border}`,
              alignItems:'flex-end',flexWrap:'wrap'}}>
              <SelectFilter label="Min Followers" value={filters.minFollowers||'Any'}
                options={['Any','10K+','50K+','100K+','250K+','500K+']}
                onChange={v=>setFilters({...filters,minFollowers:v})} width={110}/>
              <SelectFilter label="Platform Strength" value={filters.platform||'Any Platform'}
                options={['Any Platform','Instagram','TikTok','Spotify','YouTube']}
                onChange={v=>setFilters({...filters,platform:v})} width={130}/>
              <SelectFilter label="Momentum (7d)" value={filters.momentum||'Any'}
                options={['Any','+10% or more','+5% or more','+2% or more']}
                onChange={v=>setFilters({...filters,momentum:v})} width={130}/>
              <SelectFilter label="Signed Status" value={filters.signed||'Unsigned Only'}
                options={['Any','Unsigned Only','Signed']}
                onChange={v=>setFilters({...filters,signed:v})} width={120}/>
              <div style={{flex:1}}/>
              <motion.button whileHover={{scale:1.02}} onClick={()=>setFilters({
                search:'',genre:'All Genres',location:'All Locations',signal:'All Signals',cmi:'All CMI',
                minFollowers:'Any',platform:'Any Platform',momentum:'Any',signed:'Unsigned Only',
                sort:'cmi_desc'})}
                style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textTer,
                  background:'transparent',border:`1px solid ${th.border}`,borderRadius:5,
                  padding:'8px 14px',cursor:'pointer'}}>
                CLEAR ALL
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Results summary bar */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
        marginTop:14,paddingTop:12,borderTop:`1px solid ${th.border}`}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <LiveDot color={th.success}/>
          <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textSec}}>
            <strong style={{color:th.text}}>{resultCount}</strong> artists match your criteria
          </span>
        </div>
        <div style={{display:'flex',gap:6}}>
          <motion.button whileHover={{scale:1.02}} style={{
            fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:'0.04em',
            padding:'6px 12px',borderRadius:4,cursor:'pointer',
            background:th.pulseGlow,color:th.pulse,border:`1px solid ${th.pulse}20`}}>
            ★ SAVE SEARCH
          </motion.button>
          <motion.button whileHover={{scale:1.02}} style={{
            fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:'0.04em',
            padding:'6px 12px',borderRadius:4,cursor:'pointer',
            background:'transparent',color:th.textSec,border:`1px solid ${th.border}`}}>
            ↓ EXPORT CSV
          </motion.button>
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// RESULTS TABLE — The intelligence core
// ============================================================================
interface SortConfig {
  field: string;
  dir: 'asc' | 'desc';
}

const ResultsTable = ({artists, sortConfig, onSort}: {artists: Artist[]; sortConfig: SortConfig; onSort: (field: string) => void}) => {
  const th = useContext(ThemeContext);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const signalMap: Record<string, {color: string; label: string; icon: string}> = {
    breakout:{color:th.alert,label:'BREAKOUT',icon:'★'},
    rising:{color:th.pulse,label:'RISING',icon:'▲'},
    watching:{color:th.amber,label:'WATCHING',icon:'◉'},
    early:{color:th.textTer,label:'EARLY',icon:'○'},
  };

  const toggleSelect = (id: number) => {
    const next = new Set(selected);
    next.has(id)?next.delete(id):next.add(id);
    setSelected(next);
  };
  const toggleAll = () => {
    setSelected(selected.size===artists.length?new Set():new Set(artists.map(a=>a.id)));
  };

  const SortHeader = ({field, children, align='left', width}: {field: string; children: React.ReactNode; align?: 'left' | 'center' | 'right'; width?: number}) => {
    const active = sortConfig.field===field;
    return (
      <th onClick={()=>onSort(field)} style={{
        fontFamily:"'Space Mono',monospace",fontSize:8.5,fontWeight:700,
        letterSpacing:'0.1em',color:active?th.pulse:th.textDim,
        textTransform:'uppercase',padding:'10px 8px',textAlign:align,
        cursor:'pointer',userSelect:'none',whiteSpace:'nowrap',
        borderBottom:`1px solid ${th.border}`,width,
        background:active?th.pulseGlow:'transparent',transition:'all 0.15s',
      }}>
        {children}{' '}
        {active && <span style={{fontSize:8}}>{sortConfig.dir==='asc'?'▲':'▼'}</span>}
      </th>
    );
  };

  return (
    <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:10,
      overflow:'hidden',boxShadow:th.cardShadow}}>
      {/* Bulk actions */}
      <AnimatePresence>
        {selected.size>0 && (
          <motion.div initial={{height:0,opacity:0}} animate={{height:'auto',opacity:1}}
            exit={{height:0,opacity:0}} style={{overflow:'hidden'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,padding:'10px 20px',
              background:th.pulseGlow,borderBottom:`1px solid ${th.pulse}15`}}>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,
                color:th.pulse}}>
                {selected.size} SELECTED
              </span>
              <motion.button whileHover={{scale:1.02}} style={{fontFamily:"'Space Mono',monospace",
                fontSize:9,padding:'4px 10px',borderRadius:4,cursor:'pointer',
                background:th.pulse,color:th.void,border:'none',fontWeight:700}}>
                + ADD TO WATCHLIST
              </motion.button>
              <motion.button whileHover={{scale:1.02}} style={{fontFamily:"'Space Mono',monospace",
                fontSize:9,padding:'4px 10px',borderRadius:4,cursor:'pointer',
                background:'transparent',color:th.pulse,border:`1px solid ${th.pulse}30`}}>
                COMPARE ({Math.min(selected.size,5)})
              </motion.button>
              <motion.button whileHover={{scale:1.02}} style={{fontFamily:"'Space Mono',monospace",
                fontSize:9,padding:'4px 10px',borderRadius:4,cursor:'pointer',
                background:'transparent',color:th.pulse,border:`1px solid ${th.pulse}30`}}>
                EXPORT SELECTED
              </motion.button>
              <span onClick={()=>setSelected(new Set())} style={{marginLeft:'auto',
                fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textTer,cursor:'pointer'}}>
                DESELECT ALL
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Table */}
      <div style={{overflowX:'auto'}}>
        <table style={{width:'100%',borderCollapse:'collapse',minWidth:1000}}>
          <thead>
            <tr>
              <th style={{padding:'10px 8px 10px 20px',width:36,borderBottom:`1px solid ${th.border}`}}>
                <input type="checkbox" checked={selected.size===artists.length&&artists.length>0}
                  onChange={toggleAll} style={{cursor:'pointer',accentColor:th.pulse}}/>
              </th>
              <SortHeader field="name" width={200}>Artist</SortHeader>
              <SortHeader field="genre" width={110}>Genre</SortHeader>
              <SortHeader field="loc" width={110}>Location</SortHeader>
              <SortHeader field="cmi" align="center" width={70}>CMI</SortHeader>
              <SortHeader field="d7" align="center" width={70}>7d Δ</SortHeader>
              <SortHeader field="d30" align="center" width={70}>30d Δ</SortHeader>
              <th style={{fontFamily:"'Space Mono',monospace",fontSize:8.5,fontWeight:700,
                letterSpacing:'0.1em',color:th.textDim,textTransform:'uppercase',
                padding:'10px 8px',textAlign:'center',borderBottom:`1px solid ${th.border}`,width:90}}>
                TREND
              </th>
              <SortHeader field="ig" align="center" width={70}>IG</SortHeader>
              <SortHeader field="tt" align="center" width={70}>TIKTOK</SortHeader>
              <SortHeader field="sp" align="center" width={70}>SPOTIFY</SortHeader>
              <th style={{fontFamily:"'Space Mono',monospace",fontSize:8.5,fontWeight:700,
                letterSpacing:'0.1em',color:th.textDim,textTransform:'uppercase',
                padding:'10px 8px',textAlign:'center',borderBottom:`1px solid ${th.border}`,width:90}}>
                SIGNAL
              </th>
              <th style={{borderBottom:`1px solid ${th.border}`,width:80}}/>
            </tr>
          </thead>
          <tbody>
            {artists.map((a,i)=>{
              const sig = signalMap[a.signal];
              const isHovered = hoveredId===a.id;
              const isSelected = selected.has(a.id);
              return (
                <motion.tr key={a.id} initial={{opacity:0}} animate={{opacity:1}}
                  transition={{delay:i*0.02}}
                  onMouseEnter={()=>setHoveredId(a.id)} onMouseLeave={()=>setHoveredId(null)}
                  style={{
                    background:isSelected?th.pulseGlow:isHovered?th.rowHover:'transparent',
                    cursor:'pointer',transition:'background 0.1s',
                  }}>
                  <td style={{padding:'8px 8px 8px 20px',borderBottom:`1px solid ${th.border}08`}}>
                    <input type="checkbox" checked={isSelected} onChange={()=>toggleSelect(a.id)}
                      style={{cursor:'pointer',accentColor:th.pulse}}/>
                  </td>
                  {/* Name */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`}}>
                    <div style={{display:'flex',alignItems:'center',gap:10}}>
                      <div style={{width:30,height:30,borderRadius:6,flexShrink:0,
                        background:`linear-gradient(135deg,${sig.color}20,${sig.color}08)`,
                        border:`1px solid ${sig.color}15`,display:'flex',alignItems:'center',
                        justifyContent:'center',fontFamily:"'Space Mono',monospace",fontSize:9,
                        fontWeight:700,color:sig.color}}>
                        {a.name.split(' ').map(n=>n[0]).join('')}
                      </div>
                      <span style={{fontFamily:"'Space Mono',monospace",fontSize:11,fontWeight:700,
                        color:th.text}}>{a.name}</span>
                    </div>
                  </td>
                  {/* Genre */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,
                    fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textSec}}>
                    {a.genre}
                  </td>
                  {/* Location */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,
                    fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textTer}}>
                    {a.loc}
                  </td>
                  {/* CMI */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,textAlign:'center'}}>
                    <span style={{fontFamily:"'Space Mono',monospace",fontSize:14,fontWeight:700,
                      color:a.cmi>=75?th.alert:a.cmi>=60?th.pulse:a.cmi>=45?th.amber:th.textTer}}>
                      {a.cmi}
                    </span>
                  </td>
                  {/* 7d delta */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,textAlign:'center',
                    fontFamily:"'Space Mono',monospace",fontSize:11,fontWeight:700,
                    color:a.d7>=8?th.success:a.d7>=4?th.pulse:th.textSec}}>
                    +{a.d7}
                  </td>
                  {/* 30d delta */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,textAlign:'center',
                    fontFamily:"'Space Mono',monospace",fontSize:11,color:th.textSec}}>
                    +{a.d30}
                  </td>
                  {/* Sparkline */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,textAlign:'center'}}>
                    <Sparkline data={a.trend} color={a.cmi>=60?th.pulse:th.textTer}/>
                  </td>
                  {/* IG */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,textAlign:'center',
                    fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textSec}}>
                    {a.ig}
                  </td>
                  {/* TikTok */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,textAlign:'center',
                    fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textSec}}>
                    {a.tt}
                  </td>
                  {/* Spotify */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,textAlign:'center',
                    fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textSec}}>
                    {a.sp}
                  </td>
                  {/* Signal */}
                  <td style={{padding:'8px',borderBottom:`1px solid ${th.border}08`,textAlign:'center'}}>
                    <Badge color={sig.color}>{sig.icon} {sig.label}</Badge>
                  </td>
                  {/* Actions */}
                  <td style={{padding:'8px 20px 8px 8px',borderBottom:`1px solid ${th.border}08`,textAlign:'right'}}>
                    <div style={{display:'flex',gap:4,justifyContent:'flex-end'}}>
                      <motion.button whileHover={{scale:1.08}} title="View profile" style={{
                        width:26,height:26,borderRadius:5,cursor:'pointer',display:'flex',
                        alignItems:'center',justifyContent:'center',background:'transparent',
                        border:`1px solid ${th.border}`,color:th.textTer,fontSize:11}}>
                        →
                      </motion.button>
                      <motion.button whileHover={{scale:1.08}} title="Add to watchlist" style={{
                        width:26,height:26,borderRadius:5,cursor:'pointer',display:'flex',
                        alignItems:'center',justifyContent:'center',background:'transparent',
                        border:`1px solid ${th.border}`,color:th.textTer,fontSize:11}}>
                        +
                      </motion.button>
                    </div>
                  </td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',
        padding:'12px 20px',borderTop:`1px solid ${th.border}`}}>
        <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textTer}}>
          Showing 1–{artists.length} of {artists.length} results
        </span>
        <div style={{display:'flex',gap:4}}>
          {[1,2,3,'...',12].map((p,i)=>(
            <button key={i} style={{
              fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:p===1?700:400,
              padding:'5px 10px',borderRadius:4,cursor:'pointer',
              background:p===1?th.pulse:'transparent',
              color:p===1?(th.mode==='dark'?th.void:'#fff'):th.textSec,
              border:p===1?'none':`1px solid ${th.border}`,
            }}>
              {p}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

// ============================================================================
// SAVED SEARCHES SIDEBAR
// ============================================================================
const SavedSearches = () => {
  const th = useContext(ThemeContext);
  const saved = [
    {name:'UK Drill Unsigned, CMI 60+',count:23,updated:'2 hrs ago'},
    {name:'Afrobeats Rising, Lagos',count:47,updated:'1 day ago'},
    {name:'All Breakout Signals',count:8,updated:'3 hrs ago'},
    {name:'Neo-Soul + Alt R&B, Global',count:34,updated:'5 days ago'},
  ];

  return (
    <div style={{background:th.surface,border:`1px solid ${th.border}`,borderRadius:10,
      padding:0,boxShadow:th.cardShadow,overflow:'hidden'}}>
      <div style={{padding:'14px 18px',borderBottom:`1px solid ${th.border}`,
        display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,
          letterSpacing:'0.1em',color:th.textTer}}>SAVED SEARCHES</span>
        <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textDim}}>
          {saved.length} / 10
        </span>
      </div>
      {saved.map((s,i)=>(
        <motion.div key={i} whileHover={{background:th.surfaceHover}} style={{
          padding:'12px 18px',cursor:'pointer',borderBottom:i<saved.length-1?`1px solid ${th.border}08`:'none',
          transition:'background 0.15s'}}>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,
            color:th.text,marginBottom:4,lineHeight:1.3}}>{s.name}</div>
          <div style={{display:'flex',gap:8}}>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:th.pulse}}>
              {s.count} artists
            </span>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textDim}}>
              {s.updated}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// QUICK STATS — Discovery summary
// ============================================================================
const QuickStats = () => {
  const th = useContext(ThemeContext);
  const stats = [
    {label:'TOTAL ARTISTS',value:'2,847',color:th.text},
    {label:'BREAKOUT SIGNALS',value:'14',color:th.alert},
    {label:'RISING',value:'142',color:th.pulse},
    {label:'NEW THIS WEEK',value:'+67',color:th.success},
  ];

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:10,marginBottom:16}}>
      {stats.map((s,i)=>(
        <motion.div key={i} initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
          transition={{delay:i*0.04}} style={{
            background:th.surface,border:`1px solid ${th.border}`,borderRadius:8,
            padding:'14px 16px',boxShadow:th.cardShadow}}>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:'0.1em',
            color:th.textDim,marginBottom:6}}>{s.label}</div>
          <div style={{fontFamily:"'Space Mono',monospace",fontSize:20,fontWeight:700,
            color:s.color}}>{s.value}</div>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================
export default function ChampionsDiscovery() {
  const [isDark, setIsDark] = useState(true);
  const th = isDark ? themes.dark : themes.light;

  const [filters, setFilters] = useState<Filters>({
    search:'',genre:'All Genres',location:'All Locations',signal:'All Signals',cmi:'All CMI',
    minFollowers:'Any',platform:'Any Platform',momentum:'Any',signed:'Unsigned Only',sort:'cmi_desc',
  });
  const [sortConfig, setSortConfig] = useState<SortConfig>({field:'cmi',dir:'desc'});

  // Filter logic
  const filtered = useMemo(()=>{
    let result = [...allArtists];
    if(filters.search){
      const q = filters.search.toLowerCase();
      result = result.filter(a=>a.name.toLowerCase().includes(q)||a.genre.toLowerCase().includes(q)||a.loc.toLowerCase().includes(q));
    }
    if(filters.genre!=='All Genres') result = result.filter(a=>a.genre===filters.genre);
    if(filters.location!=='All Locations'){
      const loc = filters.location;
      result = result.filter(a=>a.loc.includes(loc==='UK'?'UK':loc==='US'?'US':loc==='Nigeria'?'NG':loc==='Japan'?'JP':loc==='Germany'?'DE':loc==='France'?'FR':loc==='India'?'IN':loc==='Colombia'?'CO':loc==='Brazil'?'BR':loc==='Mali'?'ML':loc==='Sweden'?'SE':loc==='Taiwan'?'TW':loc==='Kenya'?'KE':loc==='Serbia'?'RS':loc));
    }
    if(filters.signal!=='All Signals') result = result.filter(a=>a.signal===filters.signal);
    if(filters.cmi!=='All CMI'){
      if(filters.cmi==='75+') result = result.filter(a=>a.cmi>=75);
      else if(filters.cmi==='60–74') result = result.filter(a=>a.cmi>=60&&a.cmi<75);
      else if(filters.cmi==='45–59') result = result.filter(a=>a.cmi>=45&&a.cmi<60);
      else if(filters.cmi==='30–44') result = result.filter(a=>a.cmi>=30&&a.cmi<45);
    }
    return result;
  },[filters]);

  // Sort logic
  const sorted = useMemo(()=>{
    const arr = [...filtered];
    const {field,dir} = sortConfig;
    const parseK = (v: string | number): number =>{
      if(typeof v==='number') return v;
      const s = String(v).replace(/,/g,'');
      if(s.endsWith('M')) return parseFloat(s)*1000000;
      if(s.endsWith('K')) return parseFloat(s)*1000;
      return parseFloat(s)||0;
    };
    arr.sort((a,b)=>{
      let va: string | number = a[field as keyof Artist] as string | number;
      let vb: string | number = b[field as keyof Artist] as string | number;
      if(['ig','tt','sp','yt'].includes(field)){va=parseK(va);vb=parseK(vb);}
      if(typeof va==='string' && typeof vb==='string') return dir==='asc'?va.localeCompare(vb):vb.localeCompare(va);
      return dir==='asc'?(va as number)-(vb as number):(vb as number)-(va as number);
    });
    return arr;
  },[filtered,sortConfig]);

  const handleSort = (field: string)=>{
    setSortConfig(prev=>({
      field,
      dir:prev.field===field&&prev.dir==='desc'?'asc':'desc',
    }));
  };

  return (
    <ThemeContext.Provider value={th}>
      <div style={{minHeight:'100vh',background:th.void,color:th.text,
        fontFamily:"system-ui,-apple-system,'Segoe UI',sans-serif",
        transition:'background 0.3s ease, color 0.3s ease'}}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${th.void}; transition: background 0.3s; }
          ::selection { background: ${th.pulse}30; color: ${th.text}; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: ${th.border}; border-radius: 3px; }
          input::placeholder { color: ${th.textDim}; }
        `}</style>

        <NoiseOverlay />
        <Nav isDark={isDark} onToggle={()=>setIsDark(!isDark)}/>

        <main style={{maxWidth:1440,margin:'0 auto',padding:'20px 28px 60px'}}>
          {/* Page header */}
          <motion.div initial={{opacity:0,y:8}} animate={{opacity:1,y:0}}
            style={{marginBottom:18,display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
            <div>
              <h1 style={{fontFamily:"'Instrument Serif',serif",fontSize:28,fontWeight:400,
                color:th.text,margin:'0 0 4px'}}>
                Artist Discovery
              </h1>
              <p style={{fontFamily:"'Space Mono',monospace",fontSize:11,color:th.textTer,
                letterSpacing:'0.04em'}}>
                Search 2,847 emerging artists across 20 genres and 45 countries
              </p>
            </div>
          </motion.div>

          {/* Quick stats */}
          <QuickStats />

          {/* Main layout: filters + table + sidebar */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 240px',gap:16}}>
            <div>
              {/* Filters */}
              <FilterBar filters={filters} setFilters={setFilters} resultCount={sorted.length}/>
              {/* Results table */}
              <ResultsTable artists={sorted} sortConfig={sortConfig} onSort={handleSort}/>
            </div>
            {/* Sidebar */}
            <div style={{display:'flex',flexDirection:'column',gap:16}}>
              <SavedSearches />
              {/* Quick discovery tip */}
              <div style={{background:th.surface,border:`1px solid ${th.pulse}15`,borderRadius:10,
                padding:18,boxShadow:th.cardShadow}}>
                <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:10}}>
                  <span style={{fontSize:12}}>★</span>
                  <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,
                    letterSpacing:'0.1em',color:th.pulse}}>AI RECOMMENDATION</span>
                </div>
                <p style={{fontSize:12,lineHeight:1.55,color:th.textSec,margin:'0 0 12px'}}>
                  Based on your watchlist, you may be interested in <strong style={{color:th.text}}>Fatou Cissé</strong> (Desert Blues, CMI 55).
                  She&apos;s showing +7.2 momentum — similar trajectory to Blessing Chibueze 3 months ago.
                </p>
                <div style={{display:'flex',gap:6}}>
                  <motion.button whileHover={{scale:1.03}} style={{fontFamily:"'Space Mono',monospace",
                    fontSize:9,fontWeight:700,padding:'6px 12px',borderRadius:4,cursor:'pointer',
                    background:th.pulse,color:th.mode==='dark'?th.void:'#fff',border:'none'}}>
                    VIEW PROFILE
                  </motion.button>
                  <motion.button whileHover={{scale:1.03}} style={{fontFamily:"'Space Mono',monospace",
                    fontSize:9,padding:'6px 12px',borderRadius:4,cursor:'pointer',
                    background:'transparent',color:th.textSec,border:`1px solid ${th.border}`}}>
                    DISMISS
                  </motion.button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{marginTop:28,paddingTop:16,borderTop:`1px solid ${th.border}`,
            display:'flex',justifyContent:'space-between',alignItems:'center'}}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <ChampionsLogo height={13}/>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textDim,
                letterSpacing:'0.04em'}}>ARTIST DISCOVERY v1.0</span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <LiveDot color={th.success}/>
              <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textTer,
                letterSpacing:'0.06em'}}>LAST INDEXED 2 HRS AGO</span>
            </div>
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
