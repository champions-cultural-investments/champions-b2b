"use client";

// ============================================================================
// CHAMPIONS — B2B CULTURAL INTELLIGENCE PLATFORM
// Marketing Site / Landing Page — Pre-Seed Investor Ready
// "Predict breakout artists 12-18 months before mainstream recognition"
// Version 1.0 — February 2026
// ============================================================================
//
// AESTHETIC: "Intelligence Terminal meets Editorial Luxury"
// — Bloomberg data density + Monocle editorial refinement
// — Space Mono (data/labels) + Instrument Serif (editorial headlines)
// — Void black canvas with electric lime intelligence accents
// — Glassmorphism depth + atmospheric particle effects
// — The ONE thing people remember: the live CMI score animation
//
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';

// ============================================================================
// DESIGN TOKENS — B2B Cultural Intelligence System
// ============================================================================
const t = {
  void: '#060609',
  surface: '#0C0C12',
  surfaceEl: '#131320',
  surfaceHover: '#1A1A2D',
  glass: 'rgba(12, 12, 18, 0.88)',
  glassLight: 'rgba(12, 12, 18, 0.55)',
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
};

// ============================================================================
// SHARED COMPONENTS
// ============================================================================
const NoiseOverlay = () => (
  <div style={{
    position:'fixed',inset:0,pointerEvents:'none',zIndex:9999,opacity:0.02,mixBlendMode:'overlay',
    backgroundImage:`url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
  }}/>
);

const GlowOrb = ({color,size=500,x='0%',y='0%',delay=0}: {color:string;size?:number;x?:string;y?:string;delay?:number}) => (
  <motion.div style={{
    position:'absolute',left:x,top:y,width:size,height:size,borderRadius:'50%',pointerEvents:'none',
    background:`radial-gradient(circle,${color}15 0%,transparent 70%)`,filter:'blur(100px)',
  }}
    animate={{scale:[1,1.2,1],opacity:[0.3,0.5,0.3]}}
    transition={{duration:12,repeat:Infinity,delay,ease:'easeInOut'}}
  />
);

const Wrap = ({children, style={}}: {children:React.ReactNode;style?:React.CSSProperties}) => (
  <div style={{maxWidth:1280,margin:'0 auto',padding:'0 32px',position:'relative',zIndex:2,...style}}>
    {children}
  </div>
);

const SectionTag = ({children, color=t.pulse}: {children:React.ReactNode;color?:string}) => (
  <div style={{
    display:'inline-flex',alignItems:'center',gap:6,marginBottom:20,
    fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,
    letterSpacing:'0.14em',color:color,
    padding:'5px 12px',borderRadius:3,
    background:`${color}10`,border:`1px solid ${color}25`,
  }}>
    <motion.div animate={{opacity:[1,0.3,1]}} transition={{duration:2,repeat:Infinity}}
      style={{width:5,height:5,borderRadius:'50%',background:color}}/>
    {children}
  </div>
);

const RevealSection = ({children, style={}}: {children:React.ReactNode;style?:React.CSSProperties}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, {once:true, margin:'-60px'});
  return (
    <motion.div ref={ref} initial={{opacity:0,y:40}} animate={isInView?{opacity:1,y:0}:{}}
      transition={{duration:0.7,ease:[0.16,1,0.3,1]}} style={style}>
      {children}
    </motion.div>
  );
};

const GlassCard = ({children, style={}, hover=true}: {children:React.ReactNode;style?:React.CSSProperties;hover?:boolean}) => (
  <motion.div whileHover={hover?{borderColor:t.pulse+'30',y:-2}:{}}
    transition={{duration:0.25}} style={{
      background:t.glass,backdropFilter:'blur(24px)',WebkitBackdropFilter:'blur(24px)',
      border:`1px solid ${t.borderGlass}`,borderRadius:8,padding:28,
      position:'relative',overflow:'hidden',...style,
    }}>
    {children}
  </motion.div>
);

// ============================================================================
// CMI SCORE VISUALISATION — The hero piece
// ============================================================================
const CMIVisualization = () => {
  const [score, setScore] = useState(0);
  const targetScore = 74;
  const layers = [
    {label:'SOCIAL',weight:30,score:78,color:t.pulse},
    {label:'CONTENT',weight:25,score:82,color:t.intel},
    {label:'MOMENTUM',weight:20,score:91,color:t.alert},
    {label:'INDUSTRY',weight:15,score:45,color:t.brand},
    {label:'COMMUNITY',weight:10,score:62,color:t.amber},
  ];

  useEffect(()=>{
    let frame: number;
    let start: number | null = null;
    const duration = 2000;
    const animate = (ts: number)=>{
      if(!start)start=ts;
      const progress=Math.min((ts-start)/duration,1);
      const eased = 1-Math.pow(1-progress,3);
      setScore(Math.round(eased*targetScore));
      if(progress<1)frame=requestAnimationFrame(animate);
    };
    const timer = setTimeout(()=>{frame=requestAnimationFrame(animate);},800);
    return()=>{clearTimeout(timer);cancelAnimationFrame(frame);};
  },[]);

  const circumference = 2*Math.PI*88;
  const offset = circumference-(score/100)*circumference;

  return (
    <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:24}}>
      {/* Score Ring */}
      <div style={{position:'relative',width:200,height:200}}>
        <svg width="200" height="200" viewBox="0 0 200 200">
          {/* Track */}
          <circle cx="100" cy="100" r="88" fill="none" stroke={t.border} strokeWidth="3"/>
          {/* Score arc */}
          <motion.circle cx="100" cy="100" r="88" fill="none" stroke={t.pulse}
            strokeWidth="3" strokeLinecap="round"
            strokeDasharray={circumference} strokeDashoffset={offset}
            transform="rotate(-90 100 100)"
            style={{filter:`drop-shadow(0 0 8px ${t.pulse}40)`}}
          />
          {/* Layer segments */}
          {layers.map((layer,i)=>{
            const r = 76 - i*11;
            const c = 2*Math.PI*r;
            const segOffset = c-(layer.score/100)*c;
            return (
              <motion.circle key={i} cx="100" cy="100" r={r} fill="none"
                stroke={layer.color} strokeWidth="2" strokeLinecap="round" opacity={0.5}
                strokeDasharray={c}
                initial={{strokeDashoffset:c}}
                animate={{strokeDashoffset:segOffset}}
                transition={{duration:1.8,delay:1+i*0.15,ease:'easeOut'}}
                transform="rotate(-90 100 100)"
              />
            );
          })}
        </svg>
        {/* Center score */}
        <div style={{
          position:'absolute',inset:0,display:'flex',flexDirection:'column',
          alignItems:'center',justifyContent:'center',
        }}>
          <motion.div initial={{opacity:0,scale:0.8}} animate={{opacity:1,scale:1}}
            transition={{delay:0.5,duration:0.6}} style={{
              fontFamily:"'Space Mono',monospace",fontSize:42,fontWeight:700,color:t.pulse,
              lineHeight:1,textShadow:`0 0 30px ${t.pulse}30`,
            }}>
            {score}
          </motion.div>
          <div style={{
            fontFamily:"'Space Mono',monospace",fontSize:8,letterSpacing:'0.15em',
            color:t.textTer,marginTop:4,
          }}>
            CMI SCORE
          </div>
        </div>
      </div>

      {/* Layer breakdown */}
      <div style={{display:'flex',flexDirection:'column',gap:5,width:'100%',maxWidth:220}}>
        {layers.map((layer,i)=>(
          <motion.div key={i} initial={{opacity:0,x:-10}} animate={{opacity:1,x:0}}
            transition={{delay:1.5+i*0.1}} style={{
              display:'flex',alignItems:'center',gap:8,
            }}>
            <div style={{width:6,height:6,borderRadius:1,background:layer.color,flexShrink:0}}/>
            <span style={{
              fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:'0.06em',
              color:t.textTer,flex:1,
            }}>
              {layer.label}
            </span>
            <span style={{
              fontFamily:"'Space Mono',monospace",fontSize:9,color:t.textSec,
            }}>
              {layer.weight}%
            </span>
            <span style={{
              fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,color:layer.color,
            }}>
              {layer.score}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ============================================================================
// ANIMATED TICKER — Live data feel
// ============================================================================
const Ticker = () => {
  const items = [
    {artist:'BLESSING CHIBUEZE',genre:'AFROBEATS',cmi:72,delta:'+8.3',location:'LAGOS'},
    {artist:'ZARA OKWU',genre:'NEO-SOUL',cmi:68,delta:'+5.1',location:'LONDON'},
    {artist:'KOFI MENSAH',genre:'UK DRILL',cmi:78,delta:'+12.7',location:'CROYDON'},
    {artist:'AMARA DIALLO',genre:'AFRO-SWING',cmi:65,delta:'+3.9',location:'PARIS'},
    {artist:'KENJI HARA',genre:'DREAM POP',cmi:71,delta:'+6.4',location:'TOKYO'},
    {artist:'LYRA STONE',genre:'ALT R&B',cmi:74,delta:'+9.2',location:'ATLANTA'},
    {artist:'DAYO OKAFOR',genre:'ALTÉ',cmi:69,delta:'+7.8',location:'LAGOS'},
    {artist:'MIKA SILVA',genre:'ELECTRONIC',cmi:66,delta:'+4.5',location:'BERLIN'},
  ];
  const doubled = [...items,...items];

  return (
    <div style={{
      overflow:'hidden',width:'100%',
      borderTop:`1px solid ${t.border}`,borderBottom:`1px solid ${t.border}`,
      padding:'10px 0',background:`${t.surface}80`,
    }}>
      <motion.div animate={{x:['0%','-50%']}}
        transition={{duration:40,repeat:Infinity,ease:'linear'}}
        style={{display:'flex',gap:40,whiteSpace:'nowrap'}}>
        {doubled.map((item,i)=>(
          <div key={i} style={{display:'flex',alignItems:'center',gap:12,flexShrink:0}}>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:t.pulse,fontWeight:700}}>
              {item.cmi}
            </span>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:10,color:t.text,letterSpacing:'0.04em'}}>
              {item.artist}
            </span>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:t.textTer}}>
              {item.genre}
            </span>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:t.success}}>
              &#8599; {item.delta}
            </span>
            <span style={{fontFamily:"'Space Mono',monospace",fontSize:9,color:t.textDim}}>
              {item.location}
            </span>
            <span style={{color:t.textDim,fontSize:8}}>&#9679;</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

// ============================================================================
// NAVIGATION
// ============================================================================
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(()=>{
    const handler=()=>setScrolled(window.scrollY>40);
    window.addEventListener('scroll',handler);
    return()=>window.removeEventListener('scroll',handler);
  },[]);

  return (
    <motion.nav initial={{y:-20,opacity:0}} animate={{y:0,opacity:1}}
      transition={{duration:0.5}} style={{
        position:'fixed',top:0,left:0,right:0,zIndex:1000,
        background:scrolled?`${t.void}F0`:'transparent',
        backdropFilter:scrolled?'blur(20px)':'none',
        borderBottom:scrolled?`1px solid ${t.border}`:'1px solid transparent',
        transition:'all 0.3s ease',
      }}>
      <div style={{
        maxWidth:1280,margin:'0 auto',padding:'0 32px',
        display:'flex',alignItems:'center',justifyContent:'space-between',
        height:60,
      }}>
        <div style={{display:'flex',alignItems:'center',gap:20}}>
          <div style={{
            fontFamily:"'Space Mono',monospace",fontSize:13,fontWeight:700,
            color:t.pulse,letterSpacing:'0.12em',
          }}>
            CHAMPIONS
          </div>
          <div style={{width:1,height:16,background:t.border}}/>
          <div style={{
            fontFamily:"'Space Mono',monospace",fontSize:9,
            color:t.textTer,letterSpacing:'0.08em',
          }}>
            CULTURAL INTELLIGENCE
          </div>
        </div>

        <div style={{display:'flex',alignItems:'center',gap:28}}>
          {['PLATFORM','CMI','PRICING','ABOUT'].map(item=>(
            <a key={item} href={`#${item.toLowerCase()}`} style={{
              fontFamily:"'Space Mono',monospace",fontSize:10,letterSpacing:'0.08em',
              color:t.textSec,textDecoration:'none',cursor:'pointer',
              transition:'color 0.2s',
            }}
              onMouseEnter={e=>(e.target as HTMLElement).style.color=t.text}
              onMouseLeave={e=>(e.target as HTMLElement).style.color=t.textSec}
            >
              {item}
            </a>
          ))}
          <motion.a href="#demo" whileHover={{scale:1.03}} whileTap={{scale:0.97}} style={{
            fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,
            letterSpacing:'0.08em',color:t.void,textDecoration:'none',
            background:t.pulse,padding:'8px 20px',borderRadius:4,cursor:'pointer',
          }}>
            BOOK DEMO
          </motion.a>
        </div>
      </div>
    </motion.nav>
  );
};

// ============================================================================
// HERO SECTION
// ============================================================================
const Hero = () => (
  <section style={{
    position:'relative',minHeight:'100vh',display:'flex',alignItems:'center',
    overflow:'hidden',paddingTop:60,
  }}>
    <GlowOrb color={t.pulse} size={700} x="-15%" y="-10%"/>
    <GlowOrb color={t.intel} size={500} x="65%" y="15%" delay={4}/>
    <GlowOrb color={t.brand} size={400} x="80%" y="60%" delay={7}/>

    {/* Grid background */}
    <div style={{
      position:'absolute',inset:0,pointerEvents:'none',opacity:0.025,
      backgroundImage:`
        linear-gradient(${t.pulse}20 1px,transparent 1px),
        linear-gradient(90deg,${t.pulse}20 1px,transparent 1px)
      `,backgroundSize:'80px 80px',
    }}/>

    <Wrap style={{
      display:'grid',gridTemplateColumns:'1fr 380px',gap:80,alignItems:'center',
      paddingTop:60,paddingBottom:80,
    }}>
      {/* Left — Copy */}
      <div>
        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{delay:0.2,duration:0.6}}>
          <SectionTag color={t.pulse}>PREDICTIVE CULTURAL INTELLIGENCE</SectionTag>
        </motion.div>

        <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}}
          transition={{delay:0.35,duration:0.7,ease:[0.16,1,0.3,1]}} style={{
            fontFamily:"'Instrument Serif',serif",
            fontSize:'clamp(38px,5.5vw,64px)',fontWeight:400,
            color:t.text,lineHeight:1.08,margin:'0 0 24px',letterSpacing:'-0.02em',
          }}>
          Predict breakout artists{' '}
          <span style={{
            color:t.pulse,fontStyle:'italic',
            textShadow:`0 0 40px ${t.pulse}20`,
          }}>
            12&ndash;18 months
          </span>{' '}
          before mainstream
        </motion.h1>

        <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{delay:0.5,duration:0.6}} style={{
            fontSize:16,lineHeight:1.7,color:t.textSec,
            margin:'0 0 36px',maxWidth:520,
          }}>
          Champions is the world&apos;s first AI-powered cultural intelligence platform for labels,
          brands, and investors. Our proprietary CMI algorithm analyses 47 data points across
          8 platforms to identify high-potential artists before anyone else &mdash; with 94.7% accuracy.
        </motion.p>

        <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}}
          transition={{delay:0.65,duration:0.6}} style={{display:'flex',gap:14,marginBottom:48}}>
          <motion.a href="#demo" whileHover={{scale:1.03,boxShadow:`0 0 30px ${t.pulse}25`}}
            whileTap={{scale:0.97}} style={{
              fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,
              letterSpacing:'0.06em',color:t.void,textDecoration:'none',
              background:t.pulse,padding:'14px 32px',borderRadius:5,cursor:'pointer',
              display:'inline-flex',alignItems:'center',gap:8,
            }}>
            BOOK A DEMO <span style={{fontSize:14}}>&rarr;</span>
          </motion.a>
          <motion.a href="#platform" whileHover={{scale:1.03,borderColor:t.text+'40'}}
            whileTap={{scale:0.97}} style={{
              fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,
              letterSpacing:'0.06em',color:t.text,textDecoration:'none',
              background:'transparent',padding:'14px 28px',borderRadius:5,
              border:`1px solid ${t.border}`,cursor:'pointer',
            }}>
            SEE HOW IT WORKS
          </motion.a>
        </motion.div>

        {/* Social proof stats */}
        <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8}}
          style={{display:'flex',gap:32}}>
          {[
            {value:'94.7%',label:'Prediction accuracy'},
            {value:'8',label:'Platform sources'},
            {value:'47',label:'Data points per artist'},
          ].map((stat,i)=>(
            <div key={i}>
              <div style={{
                fontFamily:"'Space Mono',monospace",fontSize:22,fontWeight:700,
                color:t.pulse,lineHeight:1,
              }}>
                {stat.value}
              </div>
              <div style={{
                fontFamily:"'Space Mono',monospace",fontSize:9,color:t.textTer,
                letterSpacing:'0.06em',marginTop:4,
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Right — CMI Visualization */}
      <motion.div initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}}
        transition={{delay:0.6,duration:0.8}}>
        <GlassCard style={{padding:32,textAlign:'center'}}>
          <div style={{
            fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:'0.12em',
            color:t.textTer,marginBottom:4,
          }}>
            LIVE CMI ANALYSIS
          </div>
          <div style={{
            fontFamily:"'Space Mono',monospace",fontSize:12,fontWeight:700,
            color:t.text,marginBottom:20,letterSpacing:'0.02em',
          }}>
            Blessing Chibueze
          </div>
          <CMIVisualization />
          <div style={{
            marginTop:20,padding:'10px 14px',borderRadius:4,
            background:t.pulseDim,border:`1px solid ${t.pulse}15`,
            fontFamily:"'Space Mono',monospace",fontSize:9,color:t.pulse,
            letterSpacing:'0.06em',
          }}>
            &#9733; HIGH POTENTIAL &mdash; STRONG PARTNERSHIP CANDIDATE
          </div>
        </GlassCard>
      </motion.div>
    </Wrap>
  </section>
);

// ============================================================================
// PROBLEM SECTION — Three critical failures
// ============================================================================
const ProblemSection = () => {
  const problems = [
    {
      number:'01',title:'Timing Gap',
      stat:'18\u201324 months',statLabel:'too late',
      body:'Brands discover talent 18-24 months too late, missing optimal partnership windows. By the time an artist appears on Spotify charts, they\'re already signed and expensive.',
      color:t.alert,
    },
    {
      number:'02',title:'Unknown-Unknowns',
      stat:'94%',statLabel:'invisible',
      body:'94% of breakout artists are invisible to traditional discovery methods until post-mainstream. Manual A&R processes can\'t scale to 120,000 new tracks uploaded to Spotify daily.',
      color:t.amber,
    },
    {
      number:'03',title:'Cost Inefficiency',
      stat:'10\u201315\u00d7',statLabel:'overpay',
      body:'Post-mainstream partnerships cost 10-15\u00d7 more than early-stage partnerships. A \u00a315K partnership today becomes a \u00a3200K partnership 18 months from now.',
      color:t.heat,
    },
  ];

  return (
    <section style={{padding:'120px 0',position:'relative'}}>
      <div style={{
        position:'absolute',left:0,right:0,top:0,height:1,
        background:`linear-gradient(90deg,transparent,${t.border},transparent)`,
      }}/>
      <Wrap>
        <RevealSection>
          <SectionTag color={t.alert}>THE PROBLEM</SectionTag>
          <h2 style={{
            fontFamily:"'Instrument Serif',serif",fontSize:'clamp(28px,3.5vw,44px)',
            fontWeight:400,color:t.text,margin:'0 0 12px',lineHeight:1.12,
          }}>
            Retrospective data is <span style={{color:t.alert,fontStyle:'italic'}}>broken</span>
          </h2>
          <p style={{fontSize:15,lineHeight:1.7,color:t.textSec,margin:'0 0 48px',maxWidth:600}}>
            Labels, brands, and investors rely on Spotify charts and Billboard rankings to identify
            opportunities. By the time artists appear there, it&apos;s already too late.
          </p>
        </RevealSection>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {problems.map((p,i)=>(
            <RevealSection key={i} style={{transitionDelay:`${i*0.1}s`}}>
              <GlassCard style={{height:'100%'}}>
                <div style={{
                  position:'absolute',top:0,left:0,right:0,height:2,
                  background:`linear-gradient(90deg,${p.color},transparent)`,
                }}/>
                <div style={{
                  fontFamily:"'Space Mono',monospace",fontSize:10,color:p.color,
                  letterSpacing:'0.1em',marginBottom:16,
                }}>
                  {p.number}
                </div>
                <div style={{
                  fontFamily:"'Space Mono',monospace",fontSize:32,fontWeight:700,
                  color:p.color,lineHeight:1,marginBottom:4,
                }}>
                  {p.stat}
                </div>
                <div style={{
                  fontFamily:"'Space Mono',monospace",fontSize:10,color:t.textTer,
                  letterSpacing:'0.08em',marginBottom:16,textTransform:'uppercase',
                }}>
                  {p.statLabel}
                </div>
                <h3 style={{
                  fontFamily:"'Instrument Serif',serif",fontSize:22,fontWeight:400,
                  color:t.text,margin:'0 0 10px',
                }}>
                  {p.title}
                </h3>
                <p style={{fontSize:13,lineHeight:1.65,color:t.textSec,margin:0}}>
                  {p.body}
                </p>
              </GlassCard>
            </RevealSection>
          ))}
        </div>
      </Wrap>
    </section>
  );
};

// ============================================================================
// SOLUTION SECTION — Three capabilities
// ============================================================================
const SolutionSection = () => {
  const [active, setActive] = useState(0);
  const capabilities = [
    {
      tag:'CMI SCORE',
      title:'Cultural Momentum Index',
      body:'Proprietary AI algorithm scoring 0-100 that predicts breakout probability by analysing 47 data points across 8 platforms. Not retrospective analytics \u2014 predictive cultural intelligence.',
      stats:[
        {label:'Platforms',value:'8'},
        {label:'Data points',value:'47'},
        {label:'Accuracy',value:'94.7%'},
        {label:'Prediction window',value:'12-18mo'},
      ],
      color:t.pulse,
      platforms:['Instagram','TikTok','YouTube','Spotify','SoundCloud','Apple Music','X/Twitter','Reddit'],
    },
    {
      tag:'REAL-TIME ALERTS',
      title:'Momentum Threshold Monitoring',
      body:'Custom monitoring rules that notify your team within 6 hours when artists matching your criteria cross momentum thresholds. Set genre, location, CMI range \u2014 we handle the rest.',
      stats:[
        {label:'Alert latency',value:'<6hrs'},
        {label:'Channels',value:'3'},
        {label:'Custom rules',value:'\u221e'},
        {label:'Cooldown',value:'30 days'},
      ],
      color:t.intel,
      platforms:['Email alerts','Slack integration','Dashboard notifications','Webhook API'],
    },
    {
      tag:'UNKNOWN-UNKNOWN DISCOVERY',
      title:'AI Recommendation Engine',
      body:'Surface high-potential artists your team would never find through manual search. Collaborative filtering, genre crossover detection, and geographic arbitrage \u2014 delivered every Monday 9am.',
      stats:[
        {label:'Weekly recs',value:'5-7'},
        {label:'Discovery uplift',value:'3-5\u00d7'},
        {label:'Relevance rate',value:'60%+'},
        {label:'Conversion',value:'15%+'},
      ],
      color:t.brand,
      platforms:['Collaborative filtering','Genre crossover detection','Geographic arbitrage','Scene formation'],
    },
  ];

  const cap = capabilities[active];

  return (
    <section id="platform" style={{padding:'120px 0',position:'relative'}}>
      <Wrap>
        <RevealSection>
          <SectionTag color={t.pulse}>THE SOLUTION</SectionTag>
          <h2 style={{
            fontFamily:"'Instrument Serif',serif",fontSize:'clamp(28px,3.5vw,44px)',
            fontWeight:400,color:t.text,margin:'0 0 48px',lineHeight:1.12,
          }}>
            Three capabilities,{' '}
            <span style={{color:t.pulse,fontStyle:'italic'}}>one platform</span>
          </h2>
        </RevealSection>

        <div style={{display:'grid',gridTemplateColumns:'320px 1fr',gap:24}}>
          {/* Tabs */}
          <div style={{display:'flex',flexDirection:'column',gap:8}}>
            {capabilities.map((c,i)=>(
              <motion.div key={i} onClick={()=>setActive(i)}
                whileHover={{x:4}} style={{
                  padding:'18px 20px',borderRadius:6,cursor:'pointer',
                  background:active===i?t.surfaceEl:'transparent',
                  borderLeft:`3px solid ${active===i?c.color:'transparent'}`,
                  border:active===i?`1px solid ${c.color}20`:`1px solid transparent`,
                  transition:'all 0.2s',
                }}>
                <div style={{
                  fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:'0.1em',
                  color:c.color,marginBottom:6,fontWeight:700,
                }}>
                  {c.tag}
                </div>
                <div style={{
                  fontFamily:"'Instrument Serif',serif",fontSize:18,
                  color:active===i?t.text:t.textSec,
                }}>
                  {c.title}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Content */}
          <AnimatePresence mode="wait">
            <motion.div key={active} initial={{opacity:0,x:20}} animate={{opacity:1,x:0}}
              exit={{opacity:0,x:-20}} transition={{duration:0.3}}>
              <GlassCard>
                <div style={{
                  position:'absolute',top:0,left:0,right:0,height:2,
                  background:`linear-gradient(90deg,${cap.color},transparent)`,
                }}/>
                <p style={{fontSize:15,lineHeight:1.7,color:t.textSec,margin:'0 0 28px'}}>
                  {cap.body}
                </p>
                {/* Stats grid */}
                <div style={{
                  display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:28,
                }}>
                  {cap.stats.map((s,i)=>(
                    <div key={i} style={{
                      padding:'14px 12px',borderRadius:4,background:t.surface,
                      border:`1px solid ${t.border}`,textAlign:'center',
                    }}>
                      <div style={{
                        fontFamily:"'Space Mono',monospace",fontSize:18,fontWeight:700,
                        color:cap.color,lineHeight:1,marginBottom:4,
                      }}>
                        {s.value}
                      </div>
                      <div style={{
                        fontFamily:"'Space Mono',monospace",fontSize:8,color:t.textTer,
                        letterSpacing:'0.08em',textTransform:'uppercase',
                      }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Platform/feature tags */}
                <div style={{display:'flex',flexWrap:'wrap',gap:6}}>
                  {cap.platforms.map((p,i)=>(
                    <span key={i} style={{
                      fontFamily:"'Space Mono',monospace",fontSize:9,letterSpacing:'0.04em',
                      padding:'5px 10px',borderRadius:3,color:t.textSec,
                      background:`${cap.color}08`,border:`1px solid ${cap.color}15`,
                    }}>
                      {p}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </Wrap>
    </section>
  );
};

// ============================================================================
// PERSONAS SECTION — Who it's for
// ============================================================================
const PersonaSection = () => {
  const [active, setActive] = useState(0);
  const personas = [
    {
      tag:'\u25c6 A&R DIRECTORS',
      title:'Sign the right artists, earlier',
      color:t.intel,
      pain:'Sorting through 2,000+ artist submissions monthly. Missing breakout talent. Signing too late means paying \u00a3150K-\u00a3300K in advances instead of \u00a315K-\u00a330K.',
      solution:'Champions reduces discovery time from 40 hours/week to 8 hours. CMI scores identify signing-ready artists at CMI 60-70 \u2014 before major labels notice.',
      roi:'5-10\u00d7 cost savings per signing + higher profit margins on artist deals',
      metrics:[
        {label:'Discovery time saved',value:'80%'},
        {label:'Signing accuracy uplift',value:'3.1\u00d7'},
        {label:'Avg advance saved',value:'\u00a3120K'},
      ],
    },
    {
      tag:'\u25c7 BRAND PARTNERSHIPS',
      title:'Authentic cultural alignment, at scale',
      color:t.brand,
      pain:'Mainstream artist partnerships cost \u00a3200K-\u00a31M, deliver 2-3% engagement, and feel inauthentic. Audiences see through forced brand collabs instantly.',
      solution:'Partner with culturally authentic emerging artists for \u00a320K-\u00a350K. Get 8-10% engagement. Own the narrative before competitors even know the artist exists.',
      roi:'4-5\u00d7 cost savings + 3-4\u00d7 engagement uplift + brand authenticity',
      metrics:[
        {label:'Partnership cost reduction',value:'75%'},
        {label:'Engagement uplift',value:'3.8\u00d7'},
        {label:'Cultural alignment score',value:'89%'},
      ],
    },
    {
      tag:'\u25c8 INVESTMENT PARTNERS',
      title:'Data-driven conviction, not gut instinct',
      color:t.amber,
      pain:'Limited data-driven validation for pre-mainstream investments. 60-70% portfolio failure rate. Missing early-stage opportunities that competitors later scoop.',
      solution:'De-risk investments with 94.7% accurate breakout prediction. CMI provides investment-grade scoring with 12-18 month forward visibility.',
      roi:'50% reduction in investment failures + 2\u00d7 higher returns',
      metrics:[
        {label:'Prediction accuracy',value:'94.7%'},
        {label:'Portfolio IRR improvement',value:'+16%'},
        {label:'Deal flow increase',value:'4.2\u00d7'},
      ],
    },
  ];

  const p = personas[active];

  return (
    <section style={{padding:'120px 0',position:'relative'}}>
      <GlowOrb color={p.color} size={600} x="60%" y="20%"/>
      <Wrap>
        <RevealSection>
          <SectionTag>WHO IT&apos;S FOR</SectionTag>
          <h2 style={{
            fontFamily:"'Instrument Serif',serif",fontSize:'clamp(28px,3.5vw,44px)',
            fontWeight:400,color:t.text,margin:'0 0 40px',lineHeight:1.12,
          }}>
            Built for cultural{' '}
            <span style={{fontStyle:'italic',color:t.pulse}}>decision-makers</span>
          </h2>
        </RevealSection>

        {/* Persona tabs */}
        <div style={{display:'flex',gap:8,marginBottom:32}}>
          {personas.map((per,i)=>(
            <motion.button key={i} onClick={()=>setActive(i)}
              whileHover={{scale:1.02}} whileTap={{scale:0.98}} style={{
                fontFamily:"'Space Mono',monospace",fontSize:10,fontWeight:700,
                letterSpacing:'0.06em',cursor:'pointer',
                padding:'10px 20px',borderRadius:5,
                background:active===i?`${per.color}15`:'transparent',
                color:active===i?per.color:t.textTer,
                border:`1px solid ${active===i?per.color+'40':t.border}`,
              }}>
              {per.tag}
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{opacity:0,y:16}} animate={{opacity:1,y:0}}
            exit={{opacity:0,y:-16}} transition={{duration:0.3}}>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:24}}>
              {/* Left — Problem & solution */}
              <GlassCard>
                <div style={{
                  position:'absolute',top:0,left:0,right:0,height:2,
                  background:`linear-gradient(90deg,${p.color},transparent)`,
                }}/>
                <h3 style={{
                  fontFamily:"'Instrument Serif',serif",fontSize:26,fontWeight:400,
                  color:t.text,margin:'0 0 20px',
                }}>
                  {p.title}
                </h3>

                <div style={{marginBottom:20}}>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,
                    color:t.alert,letterSpacing:'0.1em',marginBottom:8,
                  }}>
                    THE PAIN
                  </div>
                  <p style={{fontSize:13,lineHeight:1.65,color:t.textSec,margin:0}}>
                    {p.pain}
                  </p>
                </div>

                <div style={{marginBottom:20}}>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,
                    color:t.success,letterSpacing:'0.1em',marginBottom:8,
                  }}>
                    CHAMPIONS SOLVES THIS
                  </div>
                  <p style={{fontSize:13,lineHeight:1.65,color:t.textSec,margin:0}}>
                    {p.solution}
                  </p>
                </div>

                <div style={{
                  padding:'12px 16px',borderRadius:4,
                  background:`${p.color}08`,border:`1px solid ${p.color}15`,
                }}>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,
                    color:p.color,letterSpacing:'0.08em',marginBottom:4,
                  }}>
                    ROI
                  </div>
                  <div style={{fontSize:13,color:t.text,lineHeight:1.5}}>
                    {p.roi}
                  </div>
                </div>
              </GlassCard>

              {/* Right — Metrics */}
              <div style={{display:'flex',flexDirection:'column',gap:16}}>
                {p.metrics.map((m,i)=>(
                  <GlassCard key={i} style={{flex:1,display:'flex',alignItems:'center',gap:20}}>
                    <div style={{
                      fontFamily:"'Space Mono',monospace",fontSize:36,fontWeight:700,
                      color:p.color,lineHeight:1,flexShrink:0,minWidth:120,
                      textShadow:`0 0 30px ${p.color}20`,
                    }}>
                      {m.value}
                    </div>
                    <div>
                      <div style={{
                        fontFamily:"'Space Mono',monospace",fontSize:10,color:t.textTer,
                        letterSpacing:'0.06em',textTransform:'uppercase',
                      }}>
                        {m.label}
                      </div>
                    </div>
                  </GlassCard>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Wrap>
    </section>
  );
};

// ============================================================================
// COMPETITIVE SECTION
// ============================================================================
const CompetitiveSection = () => {
  const competitors = [
    {name:'Chartmetric',desc:'Retrospective analytics',limitation:'Post-mainstream only',champWin:'Predictive AI, 12-18 months earlier'},
    {name:'SoundCharts',desc:'Streaming dashboards',limitation:'Descriptive, no scoring',champWin:'Proprietary CMI, 94.7% accuracy'},
    {name:'Manual A&R',desc:'Human discovery',limitation:'40 hrs/week, 15% accuracy',champWin:'8 hrs/week, 47% accuracy'},
    {name:'HypeAuditor',desc:'Influencer verification',limitation:'Instagram-only',champWin:'8-platform intelligence'},
  ];

  return (
    <section style={{padding:'120px 0',position:'relative'}}>
      <Wrap>
        <RevealSection>
          <SectionTag>COMPETITIVE ADVANTAGE</SectionTag>
          <h2 style={{
            fontFamily:"'Instrument Serif',serif",fontSize:'clamp(28px,3.5vw,44px)',
            fontWeight:400,color:t.text,margin:'0 0 12px',lineHeight:1.12,
          }}>
            They tell you what <span style={{fontStyle:'italic',color:t.textTer,textDecoration:'line-through'}}>happened</span>.{' '}
            <br/>We tell you what&apos;s{' '}
            <span style={{fontStyle:'italic',color:t.pulse}}>about to happen</span>
          </h2>
          <p style={{fontSize:15,lineHeight:1.7,color:t.textSec,margin:'0 0 48px',maxWidth:600}}>
            Every competitor in the market looks backwards. Champions is the only platform
            that looks forward &mdash; with validated predictive accuracy.
          </p>
        </RevealSection>

        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:16}}>
          {competitors.map((c,i)=>(
            <RevealSection key={i}>
              <GlassCard style={{display:'flex',flexDirection:'column',gap:16}}>
                <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
                  <div>
                    <div style={{
                      fontFamily:"'Space Mono',monospace",fontSize:13,fontWeight:700,
                      color:t.text,marginBottom:2,
                    }}>
                      {c.name}
                    </div>
                    <div style={{
                      fontFamily:"'Space Mono',monospace",fontSize:10,color:t.textTer,
                    }}>
                      {c.desc}
                    </div>
                  </div>
                  <span style={{
                    fontFamily:"'Space Mono',monospace",fontSize:9,
                    color:t.alert,padding:'3px 8px',borderRadius:3,
                    background:`${t.alert}10`,border:`1px solid ${t.alert}20`,
                  }}>
                    LIMITATION
                  </span>
                </div>

                <div style={{
                  padding:'10px 14px',borderRadius:4,
                  background:`${t.alert}06`,borderLeft:`2px solid ${t.alert}40`,
                  fontSize:12,color:t.textSec,
                }}>
                  {c.limitation}
                </div>

                <div style={{
                  padding:'10px 14px',borderRadius:4,
                  background:t.pulseDim,borderLeft:`2px solid ${t.pulse}40`,
                }}>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:8,fontWeight:700,
                    color:t.pulse,letterSpacing:'0.1em',marginBottom:4,
                  }}>
                    CHAMPIONS ADVANTAGE
                  </div>
                  <div style={{fontSize:12,color:t.text}}>{c.champWin}</div>
                </div>
              </GlassCard>
            </RevealSection>
          ))}
        </div>
      </Wrap>
    </section>
  );
};

// ============================================================================
// PRICING SECTION
// ============================================================================
const PricingSection = () => {
  const tiers = [
    {
      name:'Essential',price:'\u00a335,000',period:'/year',
      desc:'CMI dashboard access for teams beginning their intelligence journey',
      features:[
        '500 artist profiles',
        'CMI scores with 5-layer breakdown',
        'Monthly data updates',
        '2 user seats',
        '50-artist watchlist',
        'CSV export (500 artists)',
        'Email support',
      ],
      cta:'Start Pilot',
      pilot:'\u00a328,000 pilot (6mo)',
      color:t.textSec,
      accent:t.border,
      popular:false,
    },
    {
      name:'Professional',price:'\u00a350,000',period:'/year',
      desc:'Real-time intelligence with AI recommendations for active discovery teams',
      features:[
        'Everything in Essential',
        'Real-time alerts (5 rules)',
        'AI recommendations (weekly)',
        'Weekly Intelligence Briefing',
        '5 user seats',
        '200-artist watchlist',
        'Slack integration',
        'Priority support',
      ],
      cta:'Start Pilot',
      pilot:'\u00a340,000 pilot (6mo)',
      popular:true,
      color:t.pulse,
      accent:t.pulse,
    },
    {
      name:'Enterprise',price:'\u00a375,000',period:'/year',
      desc:'Full platform access with API, custom integrations, and dedicated support',
      features:[
        'Everything in Professional',
        'Unlimited alert rules',
        'API access (1K req/hr)',
        'Custom integrations (Salesforce, Zapier)',
        '15 user seats',
        'Scene detection (roadmap)',
        'Dedicated account manager',
        'Quarterly business reviews',
      ],
      cta:'Contact Sales',
      color:t.intel,
      accent:t.intel,
      popular:false,
      pilot:null,
    },
  ];

  return (
    <section id="pricing" style={{padding:'120px 0',position:'relative'}}>
      <Wrap>
        <RevealSection style={{textAlign:'center',marginBottom:48}}>
          <SectionTag>PRICING</SectionTag>
          <h2 style={{
            fontFamily:"'Instrument Serif',serif",fontSize:'clamp(28px,3.5vw,44px)',
            fontWeight:400,color:t.text,margin:'0 0 12px',lineHeight:1.12,
          }}>
            Intelligence that{' '}
            <span style={{fontStyle:'italic',color:t.pulse}}>pays for itself</span>
          </h2>
          <p style={{fontSize:15,lineHeight:1.7,color:t.textSec,margin:'0 auto',maxWidth:500}}>
            One early partnership discovered via Champions saves 5-10\u00d7 your annual subscription cost.
          </p>
        </RevealSection>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {tiers.map((tier,i)=>(
            <RevealSection key={i}>
              <GlassCard style={{
                padding:0,overflow:'hidden',height:'100%',
                border:tier.popular?`1px solid ${t.pulse}30`:`1px solid ${t.borderGlass}`,
                display:'flex',flexDirection:'column',
              }}>
                {tier.popular && (
                  <div style={{
                    background:t.pulse,padding:'6px',textAlign:'center',
                    fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,
                    letterSpacing:'0.12em',color:t.void,
                  }}>
                    MOST POPULAR
                  </div>
                )}
                <div style={{padding:28,flex:1,display:'flex',flexDirection:'column'}}>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:11,fontWeight:700,
                    color:tier.accent,letterSpacing:'0.1em',marginBottom:12,
                  }}>
                    {tier.name.toUpperCase()}
                  </div>
                  <div style={{display:'flex',alignItems:'baseline',gap:4,marginBottom:8}}>
                    <span style={{
                      fontFamily:"'Space Mono',monospace",fontSize:32,fontWeight:700,
                      color:t.text,
                    }}>
                      {tier.price}
                    </span>
                    <span style={{
                      fontFamily:"'Space Mono',monospace",fontSize:12,color:t.textTer,
                    }}>
                      {tier.period}
                    </span>
                  </div>
                  <p style={{fontSize:13,lineHeight:1.55,color:t.textSec,margin:'0 0 24px'}}>
                    {tier.desc}
                  </p>

                  <div style={{flex:1,display:'flex',flexDirection:'column',gap:10,marginBottom:24}}>
                    {tier.features.map((f,fi)=>(
                      <div key={fi} style={{display:'flex',gap:8,alignItems:'flex-start'}}>
                        <span style={{color:tier.accent||t.success,fontSize:11,marginTop:1,flexShrink:0}}>&#10003;</span>
                        <span style={{fontSize:12.5,color:t.textSec,lineHeight:1.4}}>{f}</span>
                      </div>
                    ))}
                  </div>

                  <motion.a href="#demo" whileHover={{scale:1.02}} whileTap={{scale:0.97}} style={{
                    display:'block',textAlign:'center',cursor:'pointer',textDecoration:'none',
                    fontFamily:"'Space Mono',monospace",fontSize:11,fontWeight:700,
                    letterSpacing:'0.06em',padding:'13px 20px',borderRadius:5,
                    background:tier.popular?t.pulse:'transparent',
                    color:tier.popular?t.void:t.text,
                    border:tier.popular?'none':`1px solid ${t.border}`,
                  }}>
                    {tier.cta.toUpperCase()}
                  </motion.a>
                  {tier.pilot && (
                    <div style={{
                      textAlign:'center',marginTop:8,
                      fontFamily:"'Space Mono',monospace",fontSize:9,
                      color:t.textTer,letterSpacing:'0.04em',
                    }}>
                      {tier.pilot}
                    </div>
                  )}
                </div>
              </GlassCard>
            </RevealSection>
          ))}
        </div>
      </Wrap>
    </section>
  );
};

// ============================================================================
// TESTIMONIALS / SOCIAL PROOF
// ============================================================================
const TestimonialSection = () => {
  const testimonials = [
    {
      quote:'Champions helped us sign 2 artists at CMI 68-72 who are now averaging 500K monthly Spotify listeners. We paid \u00a320K advances instead of \u00a3150K. ROI: 7.5\u00d7 in Year 1.',
      role:'A&R Director',type:'Independent Label, London',
      stat:'7.5\u00d7',statLabel:'ROI',
    },
    {
      quote:'We partnered with an Afrobeats artist Champions flagged at CMI 74. Campaign delivered 11.2% engagement vs our 2.8% average. Saved \u00a3215K, quadrupled engagement.',
      role:'Head of Partnerships',type:'Global Brand, New York',
      stat:'11.2%',statLabel:'Engagement',
    },
    {
      quote:'Champions\' CMI Score gave us conviction to invest \u00a3100K in 3 emerging artists. 18 months later: 2 have mainstream deals, 1 has 2M+ Spotify listeners.',
      role:'Investment Partner',type:'Music VC, Lagos/London',
      stat:'+16%',statLabel:'IRR Improvement',
    },
  ];

  return (
    <section style={{padding:'120px 0',position:'relative'}}>
      <Wrap>
        <RevealSection style={{textAlign:'center',marginBottom:48}}>
          <SectionTag>PILOT RESULTS</SectionTag>
          <h2 style={{
            fontFamily:"'Instrument Serif',serif",fontSize:'clamp(28px,3.5vw,44px)',
            fontWeight:400,color:t.text,margin:'0 0 12px',lineHeight:1.12,
          }}>
            Early clients are{' '}
            <span style={{fontStyle:'italic',color:t.pulse}}>already winning</span>
          </h2>
        </RevealSection>

        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:20}}>
          {testimonials.map((test,i)=>(
            <RevealSection key={i}>
              <GlassCard style={{height:'100%',display:'flex',flexDirection:'column'}}>
                <div style={{
                  display:'flex',alignItems:'center',gap:12,marginBottom:20,
                }}>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:28,fontWeight:700,
                    color:t.pulse,lineHeight:1,
                  }}>
                    {test.stat}
                  </div>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:9,color:t.textTer,
                    letterSpacing:'0.08em',textTransform:'uppercase',
                  }}>
                    {test.statLabel}
                  </div>
                </div>
                <p style={{
                  fontSize:13,lineHeight:1.7,color:t.textSec,margin:'0 0 20px',
                  flex:1,fontStyle:'italic',
                }}>
                  &ldquo;{test.quote}&rdquo;
                </p>
                <div style={{
                  borderTop:`1px solid ${t.border}`,paddingTop:14,
                }}>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:11,fontWeight:700,
                    color:t.text,marginBottom:2,
                  }}>
                    {test.role}
                  </div>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:10,color:t.textTer,
                  }}>
                    {test.type}
                  </div>
                </div>
              </GlassCard>
            </RevealSection>
          ))}
        </div>
      </Wrap>
    </section>
  );
};

// ============================================================================
// CMI EXPLAINER — How the algorithm works
// ============================================================================
const CMIExplainerSection = () => (
  <section id="cmi" style={{padding:'120px 0',position:'relative'}}>
    <GlowOrb color={t.pulse} size={500} x="-10%" y="30%"/>
    <Wrap>
      <RevealSection>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:60,alignItems:'center'}}>
          {/* Left — Copy */}
          <div>
            <SectionTag>THE CMI ALGORITHM</SectionTag>
            <h2 style={{
              fontFamily:"'Instrument Serif',serif",fontSize:'clamp(28px,3.5vw,44px)',
              fontWeight:400,color:t.text,margin:'0 0 16px',lineHeight:1.12,
            }}>
              47 data points.{' '}
              <span style={{fontStyle:'italic',color:t.pulse}}>One score.</span>
            </h2>
            <p style={{fontSize:15,lineHeight:1.7,color:t.textSec,margin:'0 0 32px'}}>
              The Cultural Momentum Index analyses data across 5 intelligence layers, weighting
              each based on its predictive value for artist breakout. Backtested against 500
              artists who broke mainstream between 2018-2023 with 94.7% accuracy.
            </p>

            {/* Score interpretation */}
            <div style={{display:'flex',flexDirection:'column',gap:8}}>
              {[
                {range:'0-40',label:'Early-stage',desc:'Minimal breakout indicators',color:t.textTer},
                {range:'41-60',label:'Rising',desc:'Watch closely \u2014 building momentum',color:t.amber},
                {range:'61-75',label:'High potential',desc:'Strong partnership candidate',color:t.pulse},
                {range:'76-85',label:'Near-mainstream',desc:'Urgent action recommended',color:t.alert},
                {range:'86-100',label:'Mainstream',desc:'Post-breakout, expensive partnerships',color:t.intel},
              ].map((tier,i)=>(
                <div key={i} style={{
                  display:'flex',alignItems:'center',gap:12,
                  padding:'8px 12px',borderRadius:4,background:t.surface,
                  border:`1px solid ${t.border}`,
                }}>
                  <div style={{
                    fontFamily:"'Space Mono',monospace",fontSize:11,fontWeight:700,
                    color:tier.color,minWidth:44,
                  }}>
                    {tier.range}
                  </div>
                  <div style={{width:1,height:20,background:t.border}}/>
                  <div>
                    <span style={{fontSize:12,fontWeight:600,color:t.text}}>{tier.label}</span>
                    <span style={{fontSize:11,color:t.textTer}}> &mdash; {tier.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Layer architecture */}
          <div style={{display:'flex',flexDirection:'column',gap:10}}>
            {[
              {name:'Social Media Foundation',weight:30,sources:'Instagram, TikTok, YouTube, Spotify',color:t.pulse,
                points:'Followers, engagement rate, story views, reel performance, follower growth velocity'},
              {name:'Content Performance',weight:25,sources:'Cross-platform content analysis',color:t.intel,
                points:'Video views, watch time, engagement rate, sound usage, content consistency'},
              {name:'Momentum Signals',weight:20,sources:'Growth rate analysis',color:t.alert,
                points:'7-day velocity, 30-day acceleration, viral coefficient, cross-platform correlation'},
              {name:'Industry Validation',weight:15,sources:'X/Twitter, Music publications',color:t.brand,
                points:'Critic mentions, sentiment analysis, publication features, endorsements'},
              {name:'Community Validation',weight:10,sources:'Reddit, Fan communities',color:t.amber,
                points:'Subreddit engagement, upvote velocity, community consensus detection'},
            ].map((layer,i)=>(
              <RevealSection key={i}>
                <GlassCard style={{padding:18}}>
                  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:8}}>
                    <div style={{display:'flex',alignItems:'center',gap:8}}>
                      <div style={{width:10,height:10,borderRadius:2,background:layer.color}}/>
                      <span style={{
                        fontFamily:"'Space Mono',monospace",fontSize:11,fontWeight:700,
                        color:t.text,letterSpacing:'0.02em',
                      }}>
                        {layer.name}
                      </span>
                    </div>
                    <span style={{
                      fontFamily:"'Space Mono',monospace",fontSize:14,fontWeight:700,
                      color:layer.color,
                    }}>
                      {layer.weight}%
                    </span>
                  </div>
                  {/* Weight bar */}
                  <div style={{
                    height:3,borderRadius:2,background:t.border,marginBottom:8,overflow:'hidden',
                  }}>
                    <motion.div initial={{width:0}} whileInView={{width:`${layer.weight*3.3}%`}}
                      viewport={{once:true}} transition={{duration:1,delay:i*0.1}}
                      style={{height:'100%',borderRadius:2,background:layer.color}}/>
                  </div>
                  <div style={{fontSize:11,color:t.textTer,lineHeight:1.4,marginBottom:4}}>
                    {layer.sources}
                  </div>
                  <div style={{fontSize:11,color:t.textSec,lineHeight:1.5}}>
                    {layer.points}
                  </div>
                </GlassCard>
              </RevealSection>
            ))}
          </div>
        </div>
      </RevealSection>
    </Wrap>
  </section>
);

// ============================================================================
// CTA SECTION
// ============================================================================
const CTASection = () => (
  <section id="demo" style={{padding:'120px 0',position:'relative'}}>
    <GlowOrb color={t.pulse} size={800} x="30%" y="-20%"/>
    <Wrap>
      <RevealSection style={{textAlign:'center',maxWidth:650,margin:'0 auto'}}>
        <SectionTag>GET STARTED</SectionTag>
        <h2 style={{
          fontFamily:"'Instrument Serif',serif",fontSize:'clamp(32px,4vw,52px)',
          fontWeight:400,color:t.text,margin:'0 0 16px',lineHeight:1.1,
        }}>
          Stop discovering artists{' '}
          <span style={{fontStyle:'italic',color:t.pulse}}>too late</span>
        </h2>
        <p style={{fontSize:16,lineHeight:1.7,color:t.textSec,margin:'0 0 36px'}}>
          Book a 45-minute demo. We&apos;ll show you live CMI data for artists in your genre focus,
          explain exactly how we predicted their trajectory, and demonstrate what early
          intelligence looks like.
        </p>

        <div style={{display:'flex',gap:14,justifyContent:'center',marginBottom:40}}>
          <motion.a href="mailto:hello@champions.io" whileHover={{scale:1.03,boxShadow:`0 0 40px ${t.pulse}25`}}
            whileTap={{scale:0.97}} style={{
              fontFamily:"'Space Mono',monospace",fontSize:13,fontWeight:700,
              letterSpacing:'0.06em',color:t.void,textDecoration:'none',
              background:t.pulse,padding:'16px 40px',borderRadius:5,cursor:'pointer',
              display:'inline-flex',alignItems:'center',gap:10,
            }}>
            BOOK YOUR DEMO <span style={{fontSize:16}}>&rarr;</span>
          </motion.a>
        </div>

        <div style={{display:'flex',gap:32,justifyContent:'center'}}>
          {[
            {label:'45-min personalised walkthrough'},
            {label:'Live CMI data for your genre'},
            {label:'No commitment required'},
          ].map((item,i)=>(
            <div key={i} style={{display:'flex',alignItems:'center',gap:6}}>
              <span style={{color:t.pulse,fontSize:11}}>&#10003;</span>
              <span style={{
                fontFamily:"'Space Mono',monospace",fontSize:10,color:t.textSec,
              }}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </RevealSection>
    </Wrap>
  </section>
);

// ============================================================================
// FOOTER
// ============================================================================
const Footer = () => (
  <footer style={{
    borderTop:`1px solid ${t.border}`,padding:'48px 0 32px',
  }}>
    <Wrap>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr 1fr 1fr',gap:40,marginBottom:40}}>
        <div>
          <div style={{
            fontFamily:"'Space Mono',monospace",fontSize:13,fontWeight:700,
            color:t.pulse,letterSpacing:'0.12em',marginBottom:12,
          }}>
            CHAMPIONS
          </div>
          <p style={{fontSize:12,lineHeight:1.6,color:t.textTer,margin:0}}>
            Predictive cultural intelligence for labels, brands, and investors.
          </p>
        </div>
        {[
          {title:'PLATFORM',links:['CMI Algorithm','Artist Discovery','Real-Time Alerts','AI Recommendations']},
          {title:'COMPANY',links:['About','Careers','Blog','Contact']},
          {title:'LEGAL',links:['Terms of Service','Privacy Policy','Cookie Policy','GDPR']},
        ].map((col,i)=>(
          <div key={i}>
            <div style={{
              fontFamily:"'Space Mono',monospace",fontSize:9,fontWeight:700,
              color:t.textTer,letterSpacing:'0.12em',marginBottom:12,
            }}>
              {col.title}
            </div>
            {col.links.map((link,li)=>(
              <div key={li} style={{
                fontSize:12,color:t.textSec,marginBottom:8,cursor:'pointer',
              }}>
                {link}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div style={{
        borderTop:`1px solid ${t.border}`,paddingTop:20,
        display:'flex',justifyContent:'space-between',alignItems:'center',
      }}>
        <div style={{
          fontFamily:"'Space Mono',monospace",fontSize:9,color:t.textDim,
          letterSpacing:'0.04em',
        }}>
          &copy; 2026 CHAMPIONS LIMITED &middot; REGISTERED IN ENGLAND &amp; WALES
        </div>
        <div style={{
          fontFamily:"'Space Mono',monospace",fontSize:9,color:t.textDim,
          letterSpacing:'0.04em',
        }}>
          hello@champions.io
        </div>
      </div>
    </Wrap>
  </footer>
);

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================
export default function ChampionsLanding() {
  return (
    <div style={{
      background:t.void,color:t.text,minHeight:'100vh',
      fontFamily:"system-ui,-apple-system,'Segoe UI',sans-serif",
      position:'relative',overflow:'hidden',
    }}>
      {/* Google Fonts */}
      {/* eslint-disable-next-line @next/next/no-css-in-head */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Space+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: ${t.void}; }
        ::selection { background: ${t.pulse}30; color: ${t.text}; }
        a:hover { opacity: 0.9; }
      `}</style>

      <NoiseOverlay />
      <Nav />
      <Hero />
      <Ticker />
      <ProblemSection />
      <SolutionSection />
      <CMIExplainerSection />
      <PersonaSection />
      <CompetitiveSection />
      <TestimonialSection />
      <PricingSection />
      <CTASection />
      <Footer />
    </div>
  );
}
