'use client';

// ============================================================================
// CHAMPIONS — B2B INTELLIGENCE DASHBOARD
// The Cultural Intelligence Command Centre
// "Where cultural decisions are made"
// Version 1.0 — February 2026
// ============================================================================

import React, { useState, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// THEME SYSTEM — Dark & Light mode with full token sets
// ============================================================================
interface Theme {
  mode: string;
  void: string;
  surface: string;
  surfaceEl: string;
  surfaceHover: string;
  glass: string;
  glassLight: string;
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
  intelGlow: string;
  brand: string;
  brandGlow: string;
  heat: string;
  alert: string;
  amber: string;
  success: string;
  successGlow: string;
  logoTextFill: string;
  cardShadow: string;
  inputBg: string;
}

const themes: { dark: Theme; light: Theme } = {
  dark: {
    mode: 'dark',
    void: '#060609',
    surface: '#0C0C12',
    surfaceEl: '#131320',
    surfaceHover: '#1A1A2D',
    glass: 'rgba(12,12,18,0.88)',
    glassLight: 'rgba(12,12,18,0.55)',
    text: '#EDEDEA',
    textSec: '#8D8DA0',
    textTer: '#5A5A72',
    textDim: '#3A3A52',
    border: '#1E1E35',
    borderSub: '#161628',
    borderGlass: 'rgba(255,255,255,0.045)',
    pulse: '#CDFF00',
    pulseGlow: 'rgba(205,255,0,0.10)',
    pulseDim: 'rgba(205,255,0,0.04)',
    intel: '#00D4FF',
    intelGlow: 'rgba(0,212,255,0.10)',
    brand: '#A855F7',
    brandGlow: 'rgba(168,85,247,0.10)',
    heat: '#FF6B35',
    alert: '#FF3366',
    amber: '#FFAA00',
    success: '#10B981',
    successGlow: 'rgba(16,185,129,0.10)',
    logoTextFill: '#EDEDEA',
    cardShadow: 'none',
    inputBg: '#0C0C12',
  },
  light: {
    mode: 'light',
    void: '#F6F5F1',
    surface: '#FFFFFF',
    surfaceEl: '#F0EFE9',
    surfaceHover: '#E8E7E0',
    glass: 'rgba(255,255,255,0.92)',
    glassLight: 'rgba(255,255,255,0.7)',
    text: '#111111',
    textSec: '#555566',
    textTer: '#888899',
    textDim: '#AAAABB',
    border: '#DDD8D0',
    borderSub: '#E8E3DB',
    borderGlass: 'rgba(0,0,0,0.06)',
    pulse: '#5A8A00',
    pulseGlow: 'rgba(90,138,0,0.08)',
    pulseDim: 'rgba(90,138,0,0.04)',
    intel: '#0094B3',
    intelGlow: 'rgba(0,148,179,0.08)',
    brand: '#7C3AED',
    brandGlow: 'rgba(124,58,237,0.08)',
    heat: '#E55A2B',
    alert: '#DC2655',
    amber: '#CC8800',
    success: '#0D9668',
    successGlow: 'rgba(13,150,104,0.08)',
    logoTextFill: '#111111',
    cardShadow: '0 1px 3px rgba(0,0,0,0.04), 0 4px 12px rgba(0,0,0,0.03)',
    inputBg: '#F6F5F1',
  },
};

const ThemeContext = createContext<Theme>(themes.dark);

// ============================================================================
// CHAMPIONS LOGO COMPONENT — Inline SVG, theme-adaptive
// ============================================================================
const ChampionsLogo = ({ height = 22 }: { height?: number }) => {
  const th = useContext(ThemeContext);
  const textFill = th.logoTextFill;
  const greenFill1 = '#00DA48';
  const greenFill2 = '#04D847';
  const greenFill3 = '#04D848';

  return (
    <a href="/" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none', flexShrink: 0 }}>
      <svg viewBox="0 0 816 144" height={height} style={{ display: 'block' }}>
        {/* Green accent elements */}
        <path fill={greenFill1} fillRule="evenodd" d="M536.701 1.462c2.012.022 3.936.434 5.775 1.238l1.568 1.567c.716 2.143.936 4.342.66 6.6a28.195 28.195 0 0 1-2.97 11.385 34.626 34.626 0 0 1-2.805 4.786l-.248-.166a64.62 64.62 0 0 0 1.65-6.27 16.218 16.218 0 0 0-.907-3.795 58.554 58.554 0 0 0-2.31-3.465 84.192 84.192 0 0 1-6.765-5.775 4.866 4.866 0 0 1-.578-1.485c.233-1.36.95-2.377 2.145-3.052a12.399 12.399 0 0 1 4.785-1.568" opacity=".978"/>
        <path fill={greenFill2} fillRule="evenodd" d="M72.556 19.778c3.323.272 4.56 2.032 3.713 5.28a15.034 15.034 0 0 1-2.145 3.63c-6.376 6.421-9.951 14.121-10.725 23.1-1.124-.87-1.784-2.026-1.98-3.465a37.683 37.683 0 0 1-1.073-7.178 47.33 47.33 0 0 1 1.403-10.807 21.83 21.83 0 0 1 5.197-8.498c1.625-1.212 3.495-1.9 5.61-2.062" opacity=".968"/>
        <path fill={greenFill1} fillRule="evenodd" d="M554.851 22.088a15.07 15.07 0 0 1 5.94.742c2.896 1.254 4.08 3.427 3.548 6.517a11 11 0 0 1-3.383 4.373 37.141 37.141 0 0 1-10.23 5.115 68.286 68.286 0 0 0-6.765 3.63 22.39 22.39 0 0 0-7.177 8.497c-.396-.161-.535-.409-.413-.742a7.472 7.472 0 0 1-1.155-2.475c-1.027-7.97 1.448-14.68 7.425-20.13l3.465-2.475c2.77-1.61 5.683-2.627 8.745-3.053" opacity=".978"/>
        <path fill={greenFill2} fillRule="evenodd" d="M19.262 25.058a8.423 8.423 0 0 0 2.062 0c5.49.766 10.743 2.498 15.758 5.197 9.012 6.153 16.19 13.99 21.532 23.513.409 1.26.931 2.47 1.568 3.63.141.77.361 1.512.66 2.227l-.165.248a105.683 105.683 0 0 0-3.96-3.053c-10.127-6.304-20.962-9.522-32.505-9.652-.418.068-.83.123-1.238.165l-.825-.33a4.818 4.818 0 0 1-1.155.165c-1.66-.23-3.255-.56-4.785-.99-.34.057-.67-.053-.99-.33-.34.057-.67-.053-.99-.33l-.165.165C9.99 43.006 7.982 39.239 8.042 34.38c.418-4.603 2.893-7.518 7.425-8.745a40.412 40.412 0 0 1 3.795-.577" opacity=".985"/>
        <path fill={greenFill3} fillRule="evenodd" d="M31.801 56.738a39.107 39.107 0 0 1 16.995 3.712c.25.278.526.526.825.742a2.53 2.53 0 0 1-1.155.495 29.552 29.552 0 0 0-11.385.908 48.59 48.59 0 0 0-5.94 2.31 344.444 344.444 0 0 0-8.745 5.115c-1.724 1.051-3.54 1.271-5.445.66-2.133-1.243-2.766-3.031-1.897-5.363a12.926 12.926 0 0 1 4.867-4.867 33.247 33.247 0 0 1 11.88-3.713" opacity=".98"/>
        {/* Wordmark text paths — color adapts to theme */}
        <path fill={textFill} fillRule="evenodd" d="M138.722 35.947h24.42c-.029 9.406 0 18.81.082 28.215 8.776-6.093 18.538-9.118 29.288-9.075a43.473 43.473 0 0 1 14.85 2.393c7.474 3.02 12.012 8.493 13.612 16.417.201 1.095.366 2.195.495 3.3a1681.3 1681.3 0 0 1 .248 39.765h-24.585c.028-9.625 0-19.25-.083-28.875-.155-2.884-1.089-5.469-2.805-7.755-1.624-1.65-3.576-2.723-5.857-3.217-9.513-1.603-17.9.734-25.163 7.013-.082 10.944-.11 21.89-.082 32.834h-24.42z" opacity=".993"/>
        <path fill={textFill} fillRule="evenodd" d="M92.191 55.088a91.509 91.509 0 0 1 18.81 1.567c5.95 1.134 11.285 3.553 16.005 7.26 5.278 4.918 8.193 10.995 8.745 18.233-8.305.027-16.61 0-24.915-.083-1.25-2.855-3.395-4.67-6.435-5.445a27.41 27.41 0 0 0-6.27-.99 44.673 44.673 0 0 0-13.365.99c-4.853 1.534-7.218 4.861-7.095 9.983.005 5.81 2.865 9.248 8.58 10.312a47.294 47.294 0 0 0 17.49-.165c3.301-.719 5.666-2.589 7.095-5.61 8.305-.082 16.61-.11 24.915-.082-1.029 11.227-6.749 18.955-17.16 23.182a58.791 58.791 0 0 1-18.15 3.63 88.319 88.319 0 0 1-22.935-1.485c-5.333-1.073-10.173-3.217-14.52-6.435-5.272-4.41-8.38-10.048-9.322-16.912-.901-6.21-.462-12.314 1.32-18.315 2.528-6.984 7.176-12.017 13.942-15.098a50.913 50.913 0 0 1 15.345-3.96c2.662-.248 5.302-.44 7.92-.577m170.776-.001a87.841 87.841 0 0 1 18.315 1.568c13.718 2.882 21.39 11.27 23.017 25.162.24 11.712.323 23.427.248 35.146h-24.42c.054-2.368 0-4.733-.165-7.096-6.688 4.623-14.113 7.235-22.275 7.838a61.199 61.199 0 0 1-15.345-.165c-5.287-.605-9.963-2.585-14.025-5.94-4.333-4.764-5.681-10.291-4.043-16.582 1.457-4.427 4.234-7.755 8.333-9.983a44.914 44.914 0 0 1 16.335-4.62 83.672 83.672 0 0 1 26.07.99c1.716.443 3.42.91 5.115 1.402-.116-2.947-1.547-4.955-4.29-6.022a18.64 18.64 0 0 0-4.455-.99 125.942 125.942 0 0 0-34.98 2.887l-7.755-17.49a134.564 134.564 0 0 1 34.32-6.105m-4.785 38.116c3.85-.028 7.7 0 11.55.082 3.494.107 6.931.575 10.312 1.403.083.823.11 1.648.083 2.474-9.183 3.642-18.698 5.045-28.545 4.208-3.154-.613-4.116-2.4-2.888-5.362a5.504 5.504 0 0 1 2.723-1.733 39.479 39.479 0 0 1 6.765-1.073" opacity=".991"/>
        <path fill={textFill} fillRule="evenodd" d="M357.181 55.087a34.42 34.42 0 0 1 14.85 2.558c4.007 1.806 7.06 4.639 9.158 8.497 6.303-5.858 13.754-9.35 22.357-10.477a43.313 43.313 0 0 1 17.325.66c9.127 2.858 14.324 9.046 15.593 18.562.152 1.151.262 2.306.33 3.465.082 12.87.11 25.74.082 38.61h-24.42a979.09 979.09 0 0 0-.247-29.535c-.294-7.223-4.033-10.853-11.22-10.89-4.749.08-9.01 1.537-12.788 4.373a50.994 50.994 0 0 0-3.712 3.218c-.083 10.944-.11 21.89-.083 32.834h-24.42c.029-8.965 0-17.93-.082-26.895a27.421 27.421 0 0 0-.99-7.094c-.962-2.943-2.916-4.896-5.858-5.858-6.357-1.347-12.132-.082-17.325 3.795a50.994 50.994 0 0 0-3.712 3.218c-.083 10.944-.11 21.89-.083 32.834h-24.42V56.077h24.42c-.054 3.302 0 6.602.165 9.9 6.893-6.965 15.253-10.595 25.08-10.89" opacity=".993"/>
        <path fill={textFill} fillRule="evenodd" d="M488.026 55.087c7.746-.381 15.06 1.186 21.945 4.703 7.444 4.62 11.76 11.302 12.953 20.047 1.145 7.295.43 14.39-2.145 21.285-3.2 7.159-8.506 12.027-15.923 14.603-9.942 3.296-19.842 3.186-29.7-.33a29.192 29.192 0 0 1-9.982-6.518c-.083 11.165-.11 22.33-.083 33.496h-24.42V56.078h24.42c-.028 2.695 0 5.39.083 8.084 4.546-4.266 9.908-6.989 16.087-8.167 2.264-.42 4.52-.722 6.765-.908m-9.57 20.46c2.367-.027 4.731 0 7.095.083 3.18.086 6.204.8 9.075 2.145 2.19 1.365 3.536 3.318 4.043 5.857.526 2.89.25 5.696-.825 8.415-1.564 2.477-3.792 4.044-6.683 4.703a45.501 45.501 0 0 1-18.81-.165c-4.304-1.21-6.697-4.043-7.177-8.498-.686-6.418 2.092-10.35 8.332-11.797a59.813 59.813 0 0 1 4.95-.743m114.18-20.459a82.609 82.609 0 0 1 21.615 2.227c4.904 1.242 9.305 3.442 13.2 6.6 5.544 5.181 8.486 11.589 8.828 19.223 1.28 18.736-7.272 29.929-25.658 33.577a87.38 87.38 0 0 1-31.185 0c-19.187-4.018-27.685-15.816-25.492-35.392 1.435-11.335 7.514-18.952 18.232-22.853a67.703 67.703 0 0 1 20.46-3.382m-1.155 20.46c4.045-.17 8.06.077 12.045.742 6.294 1.495 9.07 5.483 8.333 11.963-.315 3.777-2.213 6.39-5.693 7.837a32.765 32.765 0 0 1-11.137 1.567 37.614 37.614 0 0 1-9.653-1.072c-4.334-1.109-6.727-3.886-7.177-8.332-.695-6.894 2.358-10.937 9.157-12.128a74.079 74.079 0 0 1 4.125-.577m99.166-20.46a47.8 47.8 0 0 1 17.325 2.392c6.53 2.515 10.847 7.108 12.952 13.778a33.836 33.836 0 0 1 1.155 5.94 1681.3 1681.3 0 0 1 .248 39.765h-24.585c.028-9.626 0-19.25-.083-28.875-.155-2.885-1.089-5.47-2.805-7.755-1.624-1.651-3.576-2.724-5.857-3.218-9.513-1.603-17.9.734-25.163 7.013a3267.06 3267.06 0 0 0-.082 32.835h-24.42V56.078h24.42c-.029 2.695 0 5.39.082 8.085 8.044-5.643 16.982-8.668 26.813-9.075" opacity=".992"/>
        <path fill={textFill} fillRule="evenodd" d="M762.917 55.087c6.669-.1 13.323.148 19.965.743a44.266 44.266 0 0 1 12.705 3.135c7.02 3.321 10.43 8.904 10.23 16.747-8.14.028-16.281 0-24.42-.082-.352-1.56-1.342-2.44-2.97-2.64a28.504 28.504 0 0 0-2.475-.33c-6.82-.3-13.64-.3-20.46 0a11.487 11.487 0 0 0-4.125.825c-.863.874-.863 1.754 0 2.64a8 8 0 0 0 2.64.825c9.238.61 18.478 1.216 27.72 1.815a67.225 67.225 0 0 1 15.675 2.97c4.669 1.535 7.887 4.587 9.652 9.157 1.284 5.191.9 10.251-1.155 15.18-2.066 3.935-5.173 6.713-9.322 8.333a51.91 51.91 0 0 1-14.52 3.135c-9.74.777-19.475.722-29.205-.165a53.24 53.24 0 0 1-16.5-3.96c-7.422-3.48-11.107-9.338-11.055-17.573h24.42c-.032 1.34.518 2.357 1.65 3.053a19.332 19.332 0 0 0 6.765 1.485c6.654.329 13.31.329 19.965 0 1.5-.048 2.928-.378 4.29-.99 1.176-1.083 1.287-2.266.33-3.548a6.51 6.51 0 0 0-2.97-.907 1749.42 1749.42 0 0 1-27.39-1.485 82.715 82.715 0 0 1-12.87-1.98c-10.663-2.696-14.925-9.489-12.788-20.378 1.358-5.374 4.575-9.196 9.653-11.467a50.662 50.662 0 0 1 15.345-3.795c3.76-.34 7.499-.588 11.22-.743" opacity=".989"/>
        <path fill={textFill} fillRule="evenodd" d="M526.306 56.408h24.42v60.555h-24.42z" opacity=".995"/>
      </svg>
    </a>
  );
};

// ============================================================================
// SHARED COMPONENTS
// ============================================================================
const NoiseOverlay = () => (
  <div style={{
    position:'fixed',inset:0,pointerEvents:'none',zIndex:9999,opacity:0.018,mixBlendMode:'overlay',
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  }}/>
);

const ThemeToggle = ({ isDark, onToggle }: { isDark: boolean; onToggle: () => void }) => {
  const th = useContext(ThemeContext);
  return (
    <motion.button onClick={onToggle} whileHover={{scale:1.06}} whileTap={{scale:0.94}}
      style={{
        width:38,height:38,borderRadius:8,cursor:'pointer',
        display:'flex',alignItems:'center',justifyContent:'center',
        background:th.surfaceEl,border:`1px solid ${th.border}`,
        color:th.textSec,fontSize:16,position:'relative',overflow:'hidden',
      }}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      <AnimatePresence mode="wait">
        <motion.span key={isDark?'moon':'sun'}
          initial={{y:12,opacity:0,rotate:-30}}
          animate={{y:0,opacity:1,rotate:0}}
          exit={{y:-12,opacity:0,rotate:30}}
          transition={{duration:0.2}}>
          {isDark ? '☀' : '☾'}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
};

const Card = ({children, style={}, onClick}: {children: React.ReactNode; style?: React.CSSProperties; onClick?: () => void}) => {
  const th = useContext(ThemeContext);
  return (
    <motion.div whileHover={onClick?{borderColor:th.pulse+'30',y:-1}:{}}
      onClick={onClick} transition={{duration:0.2}} style={{
        background:th.surface,border:`1px solid ${th.border}`,borderRadius:10,
        padding:20,position:'relative',overflow:'hidden',
        boxShadow:th.cardShadow,cursor:onClick?'pointer':'default',...style,
      }}>
      {children}
    </motion.div>
  );
};

const Label = ({children, color, style={}}: {children: React.ReactNode; color?: string; style?: React.CSSProperties}) => {
  const th = useContext(ThemeContext);
  return (
    <span style={{
      fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,
      letterSpacing:'0.12em',color:color||th.textTer,textTransform:'uppercase',
      ...style,
    }}>
      {children}
    </span>
  );
};

const StatValue = ({value, color, size=24}: {value: string | number; color?: string; size?: number}) => {
  const th = useContext(ThemeContext);
  return (
    <span style={{
      fontFamily:"'Space Mono',monospace",fontSize:size,fontWeight:700,
      color:color||th.text,lineHeight:1,
    }}>
      {value}
    </span>
  );
};

const LiveDot = ({color}: {color?: string}) => (
  <motion.div animate={{opacity:[1,0.3,1]}} transition={{duration:1.5,repeat:Infinity}}
    style={{width:6,height:6,borderRadius:'50%',background:color||'#10B981',flexShrink:0}}/>
);

const Badge = ({children, color}: {children: React.ReactNode; color?: string}) => {
  const th = useContext(ThemeContext);
  return (
    <span style={{
      fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:'0.06em',fontWeight:700,
      padding:'3px 8px',borderRadius:4,
      background:`${color||th.pulse}12`,color:color||th.pulse,
      border:`1px solid ${color||th.pulse}20`,
    }}>
      {children}
    </span>
  );
};

// ============================================================================
// MOCK DATA — Realistic intelligence data
// ============================================================================
interface Artist {
  id: number;
  name: string;
  genre: string;
  location: string;
  cmi: number;
  delta: number;
  ig: string;
  tiktok: string;
  spotify: string;
  signal: 'rising' | 'breakout' | 'watching';
  img: string;
}

const mockArtists: Artist[] = [
  {id:1,name:'Blessing Chibueze',genre:'Afrobeats',location:'Lagos',cmi:72,delta:8.3,ig:'245K',tiktok:'890K',spotify:'125K',signal:'rising',img:'BC'},
  {id:2,name:'Kofi Mensah',genre:'UK Drill',location:'Croydon',cmi:78,delta:12.7,ig:'180K',tiktok:'1.2M',spotify:'95K',signal:'breakout',img:'KM'},
  {id:3,name:'Zara Okwu',genre:'Neo-Soul',location:'London',cmi:68,delta:5.1,ig:'92K',tiktok:'340K',spotify:'78K',signal:'rising',img:'ZO'},
  {id:4,name:'Amara Diallo',genre:'Afro-Swing',location:'Paris',cmi:65,delta:3.9,ig:'156K',tiktok:'520K',spotify:'62K',signal:'watching',img:'AD'},
  {id:5,name:'Kenji Hara',genre:'Dream Pop',location:'Tokyo',cmi:71,delta:6.4,ig:'88K',tiktok:'290K',spotify:'110K',signal:'rising',img:'KH'},
  {id:6,name:'Lyra Stone',genre:'Alt R&B',location:'Atlanta',cmi:74,delta:9.2,ig:'210K',tiktok:'780K',spotify:'145K',signal:'breakout',img:'LS'},
  {id:7,name:'Dayo Okafor',genre:'Alté',location:'Lagos',cmi:69,delta:7.8,ig:'135K',tiktok:'450K',spotify:'88K',signal:'rising',img:'DO'},
  {id:8,name:'Mika Silva',genre:'Electronic',location:'Berlin',cmi:66,delta:4.5,ig:'110K',tiktok:'380K',spotify:'72K',signal:'watching',img:'MS'},
];

interface Alert {
  id: number;
  artist: string;
  type: string;
  message: string;
  time: string;
  color: string;
}

const mockAlerts: Alert[] = [
  {id:1,artist:'Kofi Mensah',type:'CMI Threshold',message:'Crossed CMI 75 — Breakout candidate',time:'2 hours ago',color:'#FF3366'},
  {id:2,artist:'Lyra Stone',type:'Momentum Spike',message:'+9.2 pts in 7 days, fastest in Alt R&B',time:'5 hours ago',color:'#CDFF00'},
  {id:3,artist:'Blessing Chibueze',type:'Press Coverage',message:'Featured in The FADER — emerging Afrobeats profile',time:'12 hours ago',color:'#A855F7'},
  {id:4,artist:'Dayo Okafor',type:'Viral Content',message:'TikTok sound used in 2,400 videos (48hr)',time:'1 day ago',color:'#00D4FF'},
  {id:5,artist:'Zara Okwu',type:'Playlist Addition',message:'Added to Spotify "Neo-Soul Rising" (45K followers)',time:'1 day ago',color:'#FFAA00'},
];

interface GenreTrend {
  genre: string;
  momentum: string;
  artists: number;
  hot?: boolean;
}

const mockGenreTrends: GenreTrend[] = [
  {genre:'Afrobeats',momentum:'+14.2%',artists:847,hot:true},
  {genre:'UK Drill',momentum:'+11.8%',artists:623,hot:true},
  {genre:'Afro-Swing',momentum:'+9.1%',artists:412},
  {genre:'Neo-Soul',momentum:'+7.3%',artists:389},
  {genre:'Alt R&B',momentum:'+6.8%',artists:567},
  {genre:'Dream Pop',momentum:'+4.2%',artists:298},
];

// ============================================================================
// NAVIGATION / HEADER
// ============================================================================
const DashboardNav = ({isDark, onToggle}: {isDark: boolean; onToggle: () => void}) => {
  const th = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const tabs = [
    {id:'dashboard',label:'Dashboard'},
    {id:'discover',label:'Discover'},
    {id:'watchlist',label:'Watchlist'},
    {id:'alerts',label:'Alerts'},
    {id:'reports',label:'Reports'},
  ];

  return (
    <header style={{
      position:'sticky',top:0,zIndex:100,
      background:`${th.void}F2`,backdropFilter:'blur(20px)',
      borderBottom:`1px solid ${th.border}`,
    }}>
      <div style={{
        maxWidth:1440,margin:'0 auto',padding:'0 28px',
        display:'flex',alignItems:'center',height:56,gap:24,
      }}>
        <ChampionsLogo height={20}/>

        <div style={{width:1,height:24,background:th.border}}/>

        {/* Nav tabs */}
        <nav style={{display:'flex',gap:2,flex:1}}>
          {tabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)} style={{
              fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:activeTab===tab.id?700:400,
              letterSpacing:'0.06em',color:activeTab===tab.id?th.pulse:th.textSec,
              background:activeTab===tab.id?th.pulseGlow:'transparent',
              border:'none',padding:'8px 14px',borderRadius:6,cursor:'pointer',
              transition:'all 0.15s',
            }}>
              {tab.label.toUpperCase()}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div style={{display:'flex',alignItems:'center',gap:10}}>
          {/* Search */}
          <div style={{
            display:'flex',alignItems:'center',gap:6,
            padding:'7px 12px',borderRadius:6,
            background:th.inputBg,border:`1px solid ${th.border}`,
            minWidth:200,
          }}>
            <span style={{fontSize:12,color:th.textTer}}>⌕</span>
            <span style={{
              fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textDim,
            }}>
              Search artists, genres...
            </span>
            <span style={{
              fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textDim,
              marginLeft:'auto',padding:'1px 5px',borderRadius:3,
              border:`1px solid ${th.border}`,
            }}>
              ⌘K
            </span>
          </div>

          {/* Notifications */}
          <div style={{position:'relative'}}>
            <motion.button whileHover={{scale:1.06}} style={{
              width:38,height:38,borderRadius:8,cursor:'pointer',
              display:'flex',alignItems:'center',justifyContent:'center',
              background:th.surfaceEl,border:`1px solid ${th.border}`,
              color:th.textSec,fontSize:14,
            }}>
              ◎
            </motion.button>
            <div style={{
              position:'absolute',top:6,right:6,width:8,height:8,borderRadius:'50%',
              background:'#FF3366',border:`2px solid ${th.void}`,
            }}/>
          </div>

          <ThemeToggle isDark={isDark} onToggle={onToggle}/>

          {/* User */}
          <div style={{
            width:34,height:34,borderRadius:8,
            background:`linear-gradient(135deg,${th.pulse}30,${th.intel}30)`,
            border:`1px solid ${th.border}`,
            display:'flex',alignItems:'center',justifyContent:'center',
            fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,
            color:th.text,
          }}>
            SC
          </div>
        </div>
      </div>
    </header>
  );
};

// ============================================================================
// KPI STRIP — Key metrics at a glance
// ============================================================================
const KPIStrip = () => {
  const th = useContext(ThemeContext);
  const kpis = [
    {label:'ARTISTS TRACKED',value:'2,847',delta:'+142',deltaType:'up',icon:'◆'},
    {label:'AVG CMI (WATCHLIST)',value:'67.3',delta:'+2.4',deltaType:'up',icon:'◈'},
    {label:'ALERTS (7D)',value:'18',delta:'+5',deltaType:'up',icon:'◉'},
    {label:'RECOMMENDATIONS',value:'7',delta:'New',deltaType:'new',icon:'★'},
    {label:'PARTNERSHIPS INITIATED',value:'4',delta:'+1',deltaType:'up',icon:'↗'},
  ];

  return (
    <div style={{display:'grid',gridTemplateColumns:'repeat(5,1fr)',gap:12,marginBottom:20}}>
      {kpis.map((kpi,i)=>(
        <motion.div key={i} initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
          transition={{delay:i*0.05}}>
          <Card style={{padding:'16px 18px'}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:10}}>
              <Label>{kpi.label}</Label>
              <span style={{fontSize:12,color:th.textTer}}>{kpi.icon}</span>
            </div>
            <div style={{display:'flex',alignItems:'baseline',gap:8}}>
              <StatValue value={kpi.value} size={22}/>
              <span style={{
                fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,
                color:kpi.deltaType==='up'?th.success:kpi.deltaType==='new'?th.pulse:th.alert,
              }}>
                {kpi.delta}
              </span>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

// ============================================================================
// CMI MOVERS — Top momentum artists
// ============================================================================
const CMIMovers = () => {
  const th = useContext(ThemeContext);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const topMovers = [...mockArtists].sort((a,b)=>b.delta-a.delta).slice(0,6);

  const signalStyles: Record<string, {color: string; label: string; icon: string}> = {
    rising: {color:th.pulse,label:'RISING',icon:'▲'},
    breakout: {color:th.alert,label:'BREAKOUT',icon:'★'},
    watching: {color:th.amber,label:'WATCHING',icon:'◉'},
  };

  return (
    <Card style={{padding:0,overflow:'hidden'}}>
      <div style={{
        padding:'16px 20px',borderBottom:`1px solid ${th.border}`,
        display:'flex',alignItems:'center',justifyContent:'space-between',
      }}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <LiveDot color={th.pulse}/>
          <Label color={th.pulse}>CMI MOVERS — 7 DAY</Label>
        </div>
        <span style={{
          fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textTer,cursor:'pointer',
        }}>
          View All →
        </span>
      </div>

      <div style={{padding:'4px 0'}}>
        {topMovers.map((artist,i)=>{
          const sig = signalStyles[artist.signal];
          return (
            <motion.div key={artist.id}
              initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
              transition={{delay:i*0.04}}
              onMouseEnter={()=>setHoveredId(artist.id)}
              onMouseLeave={()=>setHoveredId(null)}
              style={{
                display:'grid',gridTemplateColumns:'32px 1.4fr 0.7fr 0.7fr 0.6fr 0.5fr',
                alignItems:'center',gap:12,
                padding:'10px 20px',cursor:'pointer',
                background:hoveredId===artist.id?th.surfaceHover:'transparent',
                borderBottom:`1px solid ${th.border}08`,
                transition:'background 0.15s',
              }}>
              {/* Rank */}
              <span style={{
                fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textDim,
              }}>
                {String(i+1).padStart(2,'0')}
              </span>
              {/* Name + genre */}
              <div style={{display:'flex',alignItems:'center',gap:10}}>
                <div style={{
                  width:30,height:30,borderRadius:6,flexShrink:0,
                  background:`linear-gradient(135deg,${sig.color}25,${sig.color}10)`,
                  border:`1px solid ${sig.color}20`,
                  display:'flex',alignItems:'center',justifyContent:'center',
                  fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,color:sig.color,
                }}>
                  {artist.img}
                </div>
                <div>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:11,fontWeight:700,
                    color:th.text,lineHeight:1.2,
                  }}>
                    {artist.name}
                  </div>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textTer,
                  }}>
                    {artist.genre} · {artist.location}
                  </div>
                </div>
              </div>
              {/* CMI */}
              <div style={{textAlign:'center'}}>
                <StatValue value={artist.cmi} color={th.pulse} size={16}/>
              </div>
              {/* Delta */}
              <div style={{
                textAlign:'center',fontFamily:"'Space Mono',monospace",fontSize:12,
                fontWeight:700,color:th.success,
              }}>
                +{artist.delta}
              </div>
              {/* Signal */}
              <Badge color={sig.color}>{sig.icon} {sig.label}</Badge>
              {/* Quick action */}
              <div style={{textAlign:'right'}}>
                <span style={{
                  fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textTer,
                  padding:'4px 8px',borderRadius:4,border:`1px solid ${th.border}`,
                  cursor:'pointer',
                }}>
                  + WATCH
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
};

// ============================================================================
// ALERT FEED — Recent threshold crossings
// ============================================================================
const AlertFeed = () => {
  const th = useContext(ThemeContext);
  return (
    <Card style={{padding:0,overflow:'hidden',height:'100%'}}>
      <div style={{
        padding:'16px 20px',borderBottom:`1px solid ${th.border}`,
        display:'flex',alignItems:'center',justifyContent:'space-between',
      }}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <LiveDot color={th.alert}/>
          <Label color={th.alert}>ALERT FEED</Label>
        </div>
        <span style={{
          fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textTer,cursor:'pointer',
        }}>
          Manage Rules →
        </span>
      </div>
      <div style={{padding:8}}>
        {mockAlerts.map((alert,i)=>(
          <motion.div key={alert.id} initial={{opacity:0,x:-8}} animate={{opacity:1,x:0}}
            transition={{delay:0.2+i*0.06}} style={{
              padding:'12px 14px',borderRadius:6,marginBottom:4,cursor:'pointer',
              borderLeft:`3px solid ${alert.color}`,
              background:'transparent',transition:'background 0.15s',
            }}
            whileHover={{background:th.surfaceHover}}>
            <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:4}}>
              <div style={{display:'flex',alignItems:'center',gap:6}}>
                <span style={{
                  fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,color:th.text,
                }}>
                  {alert.artist}
                </span>
                <Badge color={alert.color}>{alert.type.toUpperCase()}</Badge>
              </div>
              <span style={{
                fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textDim,
              }}>
                {alert.time}
              </span>
            </div>
            <p style={{
              fontSize:12,lineHeight:1.45,color:th.textSec,margin:0,
            }}>
              {alert.message}
            </p>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

// ============================================================================
// GENRE TRENDS — Market pulse
// ============================================================================
const GenreTrends = () => {
  const th = useContext(ThemeContext);
  return (
    <Card style={{padding:0,overflow:'hidden',height:'100%'}}>
      <div style={{
        padding:'16px 20px',borderBottom:`1px solid ${th.border}`,
        display:'flex',alignItems:'center',justifyContent:'space-between',
      }}>
        <Label color={th.intel}>GENRE MOMENTUM — 30 DAY</Label>
      </div>
      <div style={{padding:12}}>
        {mockGenreTrends.map((g,i)=>(
          <motion.div key={i} initial={{opacity:0}} animate={{opacity:1}}
            transition={{delay:0.3+i*0.05}} style={{
              display:'flex',alignItems:'center',gap:12,
              padding:'10px 10px',borderRadius:6,marginBottom:4,
            }}>
            <span style={{
              fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textDim,width:16,
            }}>
              {String(i+1).padStart(2,'0')}
            </span>
            <div style={{flex:1}}>
              <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:4}}>
                <span style={{
                  fontFamily:"'Space Mono',monospace",fontSize:11,fontWeight:700,color:th.text,
                }}>
                  {g.genre}
                </span>
                {g.hot && <span style={{fontSize:8,color:th.heat}}>🔥</span>}
              </div>
              {/* Momentum bar */}
              <div style={{height:4,borderRadius:2,background:th.border,overflow:'hidden'}}>
                <motion.div initial={{width:0}} animate={{width:`${parseFloat(g.momentum)*6}%`}}
                  transition={{duration:1,delay:0.4+i*0.1}}
                  style={{height:'100%',borderRadius:2,
                    background:parseFloat(g.momentum)>10?th.pulse:parseFloat(g.momentum)>7?th.intel:th.textTer,
                  }}/>
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{
                fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,
                color:th.success,lineHeight:1,
              }}>
                {g.momentum}
              </div>
              <div style={{
                fontFamily:"'Space Mono',monospace",fontSize:8,color:th.textDim,marginTop:2,
              }}>
                {g.artists} artists
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

// ============================================================================
// WATCHLIST MINI — Quick view of tracked artists
// ============================================================================
const WatchlistMini = () => {
  const th = useContext(ThemeContext);
  const watched = mockArtists.slice(0,4);

  return (
    <Card style={{padding:0,overflow:'hidden',height:'100%'}}>
      <div style={{
        padding:'16px 20px',borderBottom:`1px solid ${th.border}`,
        display:'flex',alignItems:'center',justifyContent:'space-between',
      }}>
        <Label color={th.amber}>YOUR WATCHLIST</Label>
        <span style={{
          fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textDim,
        }}>
          12 / 50
        </span>
      </div>
      <div style={{padding:8}}>
        {watched.map((a,i)=>(
          <motion.div key={a.id} initial={{opacity:0}} animate={{opacity:1}}
            transition={{delay:0.3+i*0.05}} style={{
              display:'flex',alignItems:'center',gap:10,
              padding:'10px 12px',borderRadius:6,cursor:'pointer',
              transition:'background 0.15s',
            }}
            whileHover={{background:th.surfaceHover}}>
            <div style={{
              width:28,height:28,borderRadius:6,flexShrink:0,
              background:`${th.pulse}10`,border:`1px solid ${th.pulse}15`,
              display:'flex',alignItems:'center',justifyContent:'center',
              fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,color:th.pulse,
            }}>
              {a.img}
            </div>
            <div style={{flex:1}}>
              <div style={{
                fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,color:th.text,
              }}>
                {a.name}
              </div>
              <div style={{
                fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textTer,
              }}>
                {a.genre}
              </div>
            </div>
            <div style={{textAlign:'right'}}>
              <div style={{
                fontFamily:"'Space Mono',monospace",fontSize:13,fontWeight:700,color:th.pulse,
              }}>
                {a.cmi}
              </div>
              <div style={{
                fontFamily:"'Space Mono',monospace",fontSize:9,color:th.success,
              }}>
                +{a.delta}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{
        padding:'10px 20px',borderTop:`1px solid ${th.border}`,
        textAlign:'center',
      }}>
        <span style={{
          fontFamily:"'Space Mono',monospace",fontSize:10,color:th.pulse,cursor:'pointer',
        }}>
          VIEW FULL WATCHLIST →
        </span>
      </div>
    </Card>
  );
};

// ============================================================================
// WEEKLY BRIEFING PREVIEW
// ============================================================================
const BriefingPreview = () => {
  const th = useContext(ThemeContext);
  return (
    <Card style={{
      padding:20,
      background:`linear-gradient(135deg,${th.surface},${th.surfaceEl})`,
      border:`1px solid ${th.pulse}15`,
    }}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:14}}>
        <div style={{display:'flex',alignItems:'center',gap:8}}>
          <span style={{fontSize:14}}>◈</span>
          <Label color={th.brand}>WEEKLY BRIEFING</Label>
        </div>
        <Badge color={th.success}>READY</Badge>
      </div>
      <p style={{fontSize:13,lineHeight:1.6,color:th.textSec,margin:'0 0 14px'}}>
        Your Monday intelligence digest includes 7 new artist recommendations,
        3 genre crossover trends, and 2 geographic arbitrage opportunities.
      </p>
      <div style={{display:'flex',gap:12}}>
        <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}} style={{
          fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,
          letterSpacing:'0.06em',color:th.mode==='dark'?th.void:th.surface,
          background:th.pulse,padding:'9px 18px',borderRadius:5,
          border:'none',cursor:'pointer',
        }}>
          VIEW BRIEFING
        </motion.button>
        <motion.button whileHover={{scale:1.02}} style={{
          fontFamily:"'Space Mono',monospace",fontSize:10,
          letterSpacing:'0.06em',color:th.textSec,
          background:'transparent',padding:'9px 18px',borderRadius:5,
          border:`1px solid ${th.border}`,cursor:'pointer',
        }}>
          EXPORT PDF
        </motion.button>
      </div>
    </Card>
  );
};

// ============================================================================
// RECENT ACTIVITY — Timeline of actions
// ============================================================================
const RecentActivity = () => {
  const th = useContext(ThemeContext);
  const activities = [
    {action:'Viewed profile',target:'Kofi Mensah',time:'14 min ago',icon:'◆'},
    {action:'Added to watchlist',target:'Lyra Stone',time:'2 hrs ago',icon:'★'},
    {action:'Exported CSV',target:'UK Drill unsigned (23 artists)',time:'Yesterday',icon:'▣'},
    {action:'Alert triggered',target:'Blessing Chibueze crossed CMI 70',time:'Yesterday',icon:'◉'},
    {action:'Contacted artist',target:'Amara Diallo — partnership enquiry',time:'2 days ago',icon:'↗'},
  ];

  return (
    <Card style={{padding:0,overflow:'hidden',height:'100%'}}>
      <div style={{
        padding:'16px 20px',borderBottom:`1px solid ${th.border}`,
      }}>
        <Label>RECENT ACTIVITY</Label>
      </div>
      <div style={{padding:8}}>
        {activities.map((a,i)=>(
          <div key={i} style={{
            display:'flex',gap:10,padding:'10px 12px',
            borderBottom:i<activities.length-1?`1px solid ${th.border}08`:'none',
          }}>
            <span style={{
              fontFamily:"'Space Mono',monospace",fontSize:10,color:th.textDim,marginTop:1,
            }}>
              {a.icon}
            </span>
            <div style={{flex:1}}>
              <div style={{fontSize:12,color:th.textSec,lineHeight:1.4}}>
                <span style={{color:th.text,fontWeight:500}}>{a.action}</span>{' '}
                {a.target}
              </div>
              <div style={{
                fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textDim,marginTop:2,
              }}>
                {a.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

// ============================================================================
// MAIN DASHBOARD COMPONENT
// ============================================================================
export default function ChampionsDashboard() {
  const [isDark, setIsDark] = useState(true);
  const th = isDark ? themes.dark : themes.light;

  return (
    <ThemeContext.Provider value={th}>
      <div style={{
        minHeight:'100vh',background:th.void,color:th.text,
        fontFamily:"system-ui,-apple-system,'Segoe UI',sans-serif",
        transition:'background 0.3s ease, color 0.3s ease',
      }}>
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap');
          * { box-sizing: border-box; margin: 0; padding: 0; }
          body { background: ${th.void}; transition: background 0.3s; }
          ::selection { background: ${th.pulse}30; color: ${th.text}; }
          ::-webkit-scrollbar { width: 6px; }
          ::-webkit-scrollbar-track { background: transparent; }
          ::-webkit-scrollbar-thumb { background: ${th.border}; border-radius: 3px; }
        `}</style>

        <NoiseOverlay />
        <DashboardNav isDark={isDark} onToggle={()=>setIsDark(!isDark)}/>

        {/* Dashboard Content */}
        <main style={{maxWidth:1440,margin:'0 auto',padding:'20px 28px 48px'}}>

          {/* Welcome header */}
          <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}}
            style={{marginBottom:20,display:'flex',alignItems:'flex-end',justifyContent:'space-between'}}>
            <div>
              <h1 style={{
                fontFamily:"'Instrument Serif',serif",fontSize:28,fontWeight:400,
                color:th.text,margin:'0 0 4px',
              }}>
                Good morning, Sarah
              </h1>
              <p style={{
                fontFamily:"'Space Mono',monospace",fontSize:11,color:th.textTer,
                letterSpacing:'0.04em',
              }}>
                7 Feb 2026 · 18 alerts triggered · 7 new recommendations
              </p>
            </div>
            <div style={{display:'flex',gap:8}}>
              <motion.button whileHover={{scale:1.02}} style={{
                fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,
                letterSpacing:'0.06em',color:th.mode==='dark'?th.void:th.surface,
                background:th.pulse,padding:'9px 18px',borderRadius:5,
                border:'none',cursor:'pointer',
              }}>
                + DISCOVER ARTISTS
              </motion.button>
              <motion.button whileHover={{scale:1.02}} style={{
                fontFamily:"'Space Mono',monospace",fontSize:10,
                letterSpacing:'0.06em',color:th.textSec,
                background:'transparent',padding:'9px 18px',borderRadius:5,
                border:`1px solid ${th.border}`,cursor:'pointer',
              }}>
                EXPORT REPORT
              </motion.button>
            </div>
          </motion.div>

          {/* KPI Strip */}
          <KPIStrip />

          {/* Main Grid */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:16,marginBottom:16}}>
            {/* CMI Movers — Full width left */}
            <CMIMovers />
            {/* Alert Feed — Right sidebar */}
            <AlertFeed />
          </div>

          {/* Secondary Grid */}
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr',gap:16,marginBottom:16}}>
            <GenreTrends />
            <WatchlistMini />
            <RecentActivity />
          </div>

          {/* Briefing Preview — Full width */}
          <BriefingPreview />

          {/* Footer bar */}
          <div style={{
            marginTop:28,paddingTop:16,borderTop:`1px solid ${th.border}`,
            display:'flex',justifyContent:'space-between',alignItems:'center',
          }}>
            <div style={{display:'flex',alignItems:'center',gap:12}}>
              <ChampionsLogo height={14}/>
              <span style={{
                fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textDim,
                letterSpacing:'0.04em',
              }}>
                INTELLIGENCE DASHBOARD v1.0
              </span>
            </div>
            <div style={{display:'flex',alignItems:'center',gap:6}}>
              <LiveDot color={th.success}/>
              <span style={{
                fontFamily:"'Space Mono',monospace",fontSize:9,color:th.textTer,
                letterSpacing:'0.06em',
              }}>
                DATA REFRESHED 2 HRS AGO · NEXT UPDATE IN 4 HRS
              </span>
            </div>
          </div>
        </main>
      </div>
    </ThemeContext.Provider>
  );
}
