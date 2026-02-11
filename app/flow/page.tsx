'use client';

// ============================================================================
// CHAMPIONS B2B — MVP PILOT USER FLOW ARCHITECTURE
// Cultural Intelligence Platform for Brands, Labels & Investors
// Version 1.0 — February 2026
// ============================================================================

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ============================================================================
// DESIGN TOKENS — Evolved for B2B Cultural Intelligence
// ============================================================================
const theme = {
  colors: {
    void: '#06060A',
    surface: '#0E0E14',
    surfaceElevated: '#16161F',
    surfaceHover: '#1E1E2A',
    glass: 'rgba(14, 14, 20, 0.88)',
    glassLight: 'rgba(14, 14, 20, 0.6)',
    textPrimary: '#F0F0EC',
    textSecondary: '#8A8A9A',
    textTertiary: '#55556A',
    border: '#22223A',
    borderSubtle: '#1A1A2E',
    borderGlass: 'rgba(255, 255, 255, 0.05)',
    pulse: '#CDFF00',
    pulseGlow: 'rgba(205, 255, 0, 0.12)',
    pulseDim: 'rgba(205, 255, 0, 0.06)',
    success: '#10B981',
    heat: '#FF6B35',
    intel: '#00D4FF',
    intelGlow: 'rgba(0, 212, 255, 0.12)',
    alert: '#FF3366',
    alertGlow: 'rgba(255, 51, 102, 0.12)',
    brand: '#A855F7',
    brandGlow: 'rgba(168, 85, 247, 0.12)',
  },
  personas: {
    ar: { color: '#00D4FF', label: 'A&R DIRECTOR', icon: '◆', glow: 'rgba(0, 212, 255, 0.15)' },
    brand: { color: '#A855F7', label: 'BRAND PARTNERSHIPS', icon: '◇', glow: 'rgba(168, 85, 247, 0.15)' },
    investor: { color: '#FFAA00', label: 'INVESTMENT PARTNER', icon: '◈', glow: 'rgba(255, 170, 0, 0.15)' },
  },
};

// ============================================================================
// TYPE DEFINITIONS
// ============================================================================
interface FlowNode {
  id: string;
  title: string;
  description: string;
  type: 'page' | 'action' | 'meeting' | 'conversion' | 'email';
  details: string[];
  personas: ('ar' | 'brand' | 'investor')[];
  personaVariants?: {
    ar?: string;
    brand?: string;
    investor?: string;
  };
}

interface Phase {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  nodes: FlowNode[];
}

interface FlowData {
  phases: Phase[];
}

// ============================================================================
// FLOW DATA — Complete MVP Pilot Architecture
// ============================================================================
const flowData: FlowData = {
  phases: [
    {
      id: 'acquisition',
      title: 'ACQUISITION',
      subtitle: 'How clients find us',
      color: theme.colors.pulse,
      nodes: [
        {
          id: 'landing',
          title: 'Marketing Site',
          description: 'Value prop, CMI explainer, social proof from pilot clients, competitive positioning',
          type: 'page',
          details: [
            'Hero: "Predict breakout artists 12-18 months early"',
            'CMI Score live demo (interactive)',
            'ROI Calculator widget',
            'Pilot client testimonials',
            'Book Demo CTA (primary)',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'demo_book',
          title: 'Book Demo',
          description: 'Calendly integration — 45-min slot with founder or sales lead',
          type: 'action',
          details: [
            'Capture: Name, company, role, use case',
            'Persona auto-detection from role title',
            'Calendar integration (Calendly/Cal.com)',
            'Confirmation email with prep materials',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'demo_live',
          title: 'Live Demo',
          description: 'Personalised 45-min walkthrough with live CMI data, tailored to prospect use case',
          type: 'meeting',
          details: [
            'CMI explainer + live artist example (15 min)',
            'Custom use case walkthrough (15 min)',
            'Alert system demonstration (10 min)',
            'Q&A + pilot proposal discussion (5 min)',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'pilot_sign',
          title: 'Pilot Agreement',
          description: '6-month pilot at preferential rate — MSA + DPA signed digitally',
          type: 'conversion',
          details: [
            'Essential: £28K (6-month pilot)',
            'Professional: £40K (6-month pilot)',
            '20% discount vs annual pricing',
            'DocuSign / PandaDoc integration',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
      ],
    },
    {
      id: 'onboarding',
      title: 'ONBOARDING',
      subtitle: 'First 5 days',
      color: theme.colors.intel,
      nodes: [
        {
          id: 'account_setup',
          title: 'Account Creation',
          description: 'Brand profile, team seat provisioning, SSO configuration',
          type: 'page',
          details: [
            'Company details + logo upload',
            'Provision 2-5 user seats (tier dependent)',
            'SSO setup (Google/Microsoft)',
            'Billing configuration',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'persona_config',
          title: 'Intelligence Profile',
          description: 'Persona-specific configuration — what intelligence matters most to this client',
          type: 'page',
          details: [
            'Select primary use case (scouting / partnerships / investment)',
            'Genre preferences (multi-select, weighted)',
            'Geographic focus markets',
            'CMI threshold preferences',
            'Signed/unsigned artist filtering',
          ],
          personas: ['ar', 'brand', 'investor'],
          personaVariants: {
            ar: 'Genre focus, signing budget range, roster gaps, competitor labels to monitor',
            brand: 'Brand values alignment, campaign budget, target demographics, partnership history',
            investor: 'Investment thesis, ticket size, stage preference, portfolio composition',
          },
        },
        {
          id: 'alert_setup',
          title: 'Alert Configuration',
          description: 'Set up initial monitoring rules — get notified when artists cross thresholds',
          type: 'action',
          details: [
            'Create 3-5 starter alert rules',
            'Select genres + CMI range + locations',
            'Choose channels (email, Slack, dashboard)',
            'Test alert with sample data',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'guided_tour',
          title: 'Platform Walkthrough',
          description: 'Interactive guided tour of key features — 15 min self-paced or 60 min with CSM',
          type: 'meeting',
          details: [
            'Dashboard orientation',
            'Discovery search tutorial',
            'CMI score interpretation guide',
            'Watchlist + export training',
            'Pre-configured 3-5 saved searches',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
      ],
    },
    {
      id: 'intelligence',
      title: 'INTELLIGENCE HUB',
      subtitle: 'Daily engagement',
      color: theme.colors.pulse,
      nodes: [
        {
          id: 'dashboard',
          title: 'Intelligence Dashboard',
          description: 'Command centre — personalised CMI movers, alert feed, market pulse, quick actions',
          type: 'page',
          details: [
            'CMI Movers: Top 10 momentum artists (7d)',
            'Alert Feed: Recent threshold crossings',
            'Market Pulse: Genre trends, geographic heat',
            'Watchlist Summary: Your tracked artists',
            'Weekly Briefing Preview',
          ],
          personas: ['ar', 'brand', 'investor'],
          personaVariants: {
            ar: 'Unsigned artist spotlight, genre-specific movers, signing opportunity alerts',
            brand: 'Cultural alignment scores, partnership-ready artists, campaign match suggestions',
            investor: 'Portfolio CMI tracking, deal flow pipeline, market validation metrics',
          },
        },
        {
          id: 'discovery',
          title: 'Artist Discovery',
          description: 'Advanced search with 12+ filters — find artists matching exact criteria across 8 platforms',
          type: 'page',
          details: [
            'Filters: Genre, location, CMI range, platform metrics',
            'Sort by: CMI score, momentum (7d/30d), followers, engagement',
            'Artist cards: Photo, CMI, genre, location, key stats',
            'Saved searches (one-click re-run)',
            'Bulk export (CSV, up to 500 artists)',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'artist_profile',
          title: 'Artist Intelligence',
          description: 'Deep-dive profile — 5-layer CMI breakdown, 8-platform metrics, momentum trajectory, press intelligence',
          type: 'page',
          details: [
            'CMI Score: 5-layer donut chart + breakdown',
            'Platform Metrics: IG, TikTok, YT, Spotify, etc.',
            'Momentum Chart: 90-day CMI trajectory',
            'Industry Validation: Press mentions, critic sentiment',
            'Contact Artist / Add to Watchlist CTAs',
          ],
          personas: ['ar', 'brand', 'investor'],
          personaVariants: {
            ar: 'Signing feasibility score, estimated advance range, comparable artist trajectory',
            brand: 'Cultural alignment %, audience demographic overlap, partnership cost estimate',
            investor: 'Investment grade rating, projected ROI, comparable exit data points',
          },
        },
      ],
    },
    {
      id: 'monitoring',
      title: 'MONITORING',
      subtitle: 'Ongoing intelligence',
      color: theme.colors.alert,
      nodes: [
        {
          id: 'watchlist',
          title: 'Watchlist',
          description: 'Saved artists dashboard — track CMI changes, momentum alerts, comparative analysis',
          type: 'page',
          details: [
            'Up to 50 artists (Essential) / 200 (Professional)',
            'CMI change indicators (7d, 30d)',
            'Weekly watchlist digest email',
            'Compare up to 5 artists side-by-side',
            'Bulk actions: Export, tag, remove',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'alerts',
          title: 'Alert Centre',
          description: 'Manage monitoring rules, view alert history, track engagement effectiveness',
          type: 'page',
          details: [
            'Active rules dashboard (create/edit/pause/delete)',
            'Alert history: All triggered alerts with timestamps',
            'Effectiveness metrics: Alerts → views → contacts',
            'Slack/email channel management',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'briefing',
          title: 'Weekly Briefing',
          description: 'Monday 9am intelligence digest — AI-curated artist recommendations + trend analysis',
          type: 'email',
          details: [
            '5-7 personalised artist recommendations',
            '200-word cultural context per artist (Gemini AI)',
            'Genre crossover trends (3 per week)',
            'Geographic arbitrage opportunities (2-3 artists)',
            'Watchlist momentum summary',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
      ],
    },
    {
      id: 'action',
      title: 'ACTION & VALUE',
      subtitle: 'Business outcomes',
      color: '#FFAA00',
      nodes: [
        {
          id: 'contact',
          title: 'Contact Artist',
          description: 'Initiate partnership — champions facilitates warm introduction with context',
          type: 'action',
          details: [
            'Express interest form (budget, timeline, proposal)',
            'champions provides warm introduction',
            'Partnership negotiation support',
            'Tracked in engagement analytics',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'reporting',
          title: 'Intelligence Reports',
          description: 'Custom exports, ROI tracking, quarterly business reviews with CSM',
          type: 'page',
          details: [
            'CSV export: Search results, watchlist, alert history',
            'PDF reports: Artist profiles, CMI breakdowns',
            'ROI dashboard: Partnerships initiated, cost savings',
            'Monthly/quarterly review data packs',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
        {
          id: 'renewal',
          title: 'Pilot → Annual',
          description: 'Month 6 conversion — QBR with ROI proof, upsell to Professional/Enterprise tier',
          type: 'conversion',
          details: [
            'Executive QBR presentation',
            'ROI case study (bespoke)',
            'Upsell: Essential → Professional / Enterprise',
            'Annual contract: 5% discount for upfront payment',
            'Referral programme: 3 months free per referral',
          ],
          personas: ['ar', 'brand', 'investor'],
        },
      ],
    },
  ],
};

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

const NoiseOverlay = () => (
  <div style={{
    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 1000,
    opacity: 0.018,
    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
  }} />
);

interface GlowOrbProps {
  color: string;
  size?: number;
  x: string;
  y: string;
  delay?: number;
}

const GlowOrb = ({ color, size = 500, x, y, delay = 0 }: GlowOrbProps) => (
  <motion.div
    style={{
      position: 'fixed', left: x, top: y, width: size, height: size,
      borderRadius: '50%', pointerEvents: 'none', zIndex: 0,
      background: `radial-gradient(circle, ${color}18 0%, transparent 70%)`,
      filter: 'blur(80px)',
    }}
    animate={{ scale: [1, 1.15, 1], opacity: [0.25, 0.4, 0.25] }}
    transition={{ duration: 10, repeat: Infinity, delay, ease: 'easeInOut' }}
  />
);

const GridLines = () => (
  <div style={{
    position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0, opacity: 0.03,
    backgroundImage: `
      linear-gradient(${theme.colors.pulse}15 1px, transparent 1px),
      linear-gradient(90deg, ${theme.colors.pulse}15 1px, transparent 1px)
    `,
    backgroundSize: '60px 60px',
  }} />
);

const ScanLine = () => (
  <motion.div
    style={{
      position: 'fixed', left: 0, right: 0, height: 1, zIndex: 1,
      background: `linear-gradient(90deg, transparent, ${theme.colors.pulse}30, transparent)`,
      pointerEvents: 'none',
    }}
    animate={{ top: ['-2%', '102%'] }}
    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
  />
);

// ============================================================================
// NODE COMPONENT — Individual flow step
// ============================================================================
interface FlowNodeProps {
  node: FlowNode;
  phaseColor: string;
  index: number;
  isSelected: boolean;
  onSelect: (id: string) => void;
  isCompact: boolean;
}

const FlowNodeComponent = ({ node, phaseColor, index, isSelected, onSelect, isCompact }: FlowNodeProps) => {
  const typeStyles: Record<string, { icon: string; borderAccent: string }> = {
    page: { icon: '▣', borderAccent: phaseColor },
    action: { icon: '▶', borderAccent: theme.colors.pulse },
    meeting: { icon: '◉', borderAccent: theme.colors.intel },
    conversion: { icon: '★', borderAccent: '#FFAA00' },
    email: { icon: '◈', borderAccent: theme.colors.brand },
  };

  const style = typeStyles[node.type] || typeStyles.page;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      onClick={() => onSelect(node.id)}
      style={{
        background: isSelected ? theme.colors.surfaceElevated : theme.colors.surface,
        border: `1px solid ${isSelected ? style.borderAccent + '60' : theme.colors.border}`,
        borderLeft: `3px solid ${style.borderAccent}`,
        borderRadius: 6,
        padding: isCompact ? '12px 14px' : '16px 18px',
        cursor: 'pointer',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.2s ease',
      }}
      whileHover={{
        borderColor: style.borderAccent + '50',
        background: theme.colors.surfaceHover,
      }}
    >
      {isSelected && (
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: `radial-gradient(ellipse at top left, ${style.borderAccent}08 0%, transparent 60%)`,
        }} />
      )}

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 11,
            color: style.borderAccent, letterSpacing: '0.05em',
          }}>
            {style.icon}
          </span>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 12, fontWeight: 700,
            color: theme.colors.textPrimary, letterSpacing: '0.02em',
          }}>
            {node.title}
          </span>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 9,
            color: theme.colors.textTertiary, letterSpacing: '0.08em',
            textTransform: 'uppercase', marginLeft: 'auto',
          }}>
            {node.type}
          </span>
        </div>

        {/* Description */}
        <p style={{
          fontSize: 12, lineHeight: 1.5, color: theme.colors.textSecondary,
          margin: 0, fontFamily: 'system-ui, -apple-system, sans-serif',
        }}>
          {node.description}
        </p>

        {/* Persona indicators */}
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {node.personas.map(p => (
            <span key={p} style={{
              display: 'inline-flex', alignItems: 'center', gap: 3,
              padding: '2px 7px', borderRadius: 3, fontSize: 9,
              fontFamily: "'Space Mono', monospace", letterSpacing: '0.06em',
              background: theme.personas[p].glow,
              color: theme.personas[p].color,
              border: `1px solid ${theme.personas[p].color}25`,
            }}>
              {theme.personas[p].icon} {p === 'ar' ? 'A&R' : p === 'brand' ? 'BRAND' : 'VC'}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================================
// DETAIL PANEL — Expanded node information
// ============================================================================
interface DetailPanelProps {
  node: FlowNode & { phaseColor: string };
}

const DetailPanel = ({ node }: DetailPanelProps) => {
  if (!node) return null;

  return (
    <motion.div
      key={node.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      style={{
        background: theme.colors.glass,
        backdropFilter: 'blur(24px)',
        border: `1px solid ${theme.colors.borderGlass}`,
        borderRadius: 8,
        padding: 24,
        height: 'fit-content',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
        paddingBottom: 16, borderBottom: `1px solid ${theme.colors.border}`,
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 6,
          background: `${node.phaseColor}15`, border: `1px solid ${node.phaseColor}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Space Mono', monospace", fontSize: 14, color: node.phaseColor,
        }}>
          {node.type === 'page' ? '▣' : node.type === 'action' ? '▶' : node.type === 'meeting' ? '◉' : node.type === 'email' ? '◈' : '★'}
        </div>
        <div>
          <h3 style={{
            fontFamily: "'Space Mono', monospace", fontSize: 15, fontWeight: 700,
            color: theme.colors.textPrimary, margin: 0, letterSpacing: '0.01em',
          }}>
            {node.title}
          </h3>
          <p style={{
            fontSize: 11, color: theme.colors.textTertiary, margin: 0, marginTop: 2,
            fontFamily: "'Space Mono', monospace", letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            {node.type} · {node.personas.length} persona{node.personas.length > 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: 13, lineHeight: 1.65, color: theme.colors.textSecondary,
        margin: '0 0 18px 0', fontFamily: 'system-ui, -apple-system, sans-serif',
      }}>
        {node.description}
      </p>

      {/* Requirements / Details */}
      <div style={{ marginBottom: 18 }}>
        <h4 style={{
          fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
          color: theme.colors.pulse, letterSpacing: '0.12em', margin: '0 0 10px 0',
          textTransform: 'uppercase',
        }}>
          MVP Requirements
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
          {node.details.map((detail, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              style={{
                display: 'flex', gap: 8, alignItems: 'flex-start',
                padding: '6px 10px', borderRadius: 4,
                background: theme.colors.pulseDim,
                border: `1px solid ${theme.colors.pulse}10`,
              }}
            >
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 10,
                color: theme.colors.pulse, marginTop: 1, flexShrink: 0,
              }}>
                {String(i + 1).padStart(2, '0')}
              </span>
              <span style={{
                fontSize: 12, lineHeight: 1.45, color: theme.colors.textSecondary,
                fontFamily: 'system-ui, -apple-system, sans-serif',
              }}>
                {detail}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Persona Variants */}
      {node.personaVariants && (
        <div>
          <h4 style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
            color: theme.colors.intel, letterSpacing: '0.12em', margin: '0 0 10px 0',
            textTransform: 'uppercase',
          }}>
            Persona Adaptations
          </h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {(Object.entries(node.personaVariants) as [keyof typeof theme.personas, string][]).map(([key, val]) => (
              <div key={key} style={{
                padding: '10px 12px', borderRadius: 4,
                background: theme.personas[key].glow,
                border: `1px solid ${theme.personas[key].color}20`,
              }}>
                <div style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
                  color: theme.personas[key].color, letterSpacing: '0.1em',
                  marginBottom: 4, textTransform: 'uppercase',
                }}>
                  {theme.personas[key].icon} {theme.personas[key].label}
                </div>
                <div style={{
                  fontSize: 11.5, lineHeight: 1.5, color: theme.colors.textSecondary,
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                  {val}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

// ============================================================================
// PHASE CONNECTOR — Visual connection between phases
// ============================================================================
interface PhaseConnectorProps {
  fromColor: string;
  toColor: string;
}

const PhaseConnector = ({ fromColor, toColor }: PhaseConnectorProps) => (
  <div style={{
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: '4px 0',
  }}>
    <div style={{
      width: 2, height: 28,
      background: `linear-gradient(to bottom, ${fromColor}40, ${toColor}40)`,
      borderRadius: 1,
    }} />
  </div>
);

// ============================================================================
// LEGEND COMPONENT
// ============================================================================
const Legend = () => (
  <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.3 }}
    style={{
      display: 'flex', flexWrap: 'wrap', gap: 16, alignItems: 'center',
      padding: '12px 18px', borderRadius: 6,
      background: theme.colors.surface,
      border: `1px solid ${theme.colors.border}`,
    }}
  >
    <span style={{
      fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
      color: theme.colors.textTertiary, letterSpacing: '0.12em',
    }}>
      PERSONAS
    </span>
    {Object.entries(theme.personas).map(([key, val]) => (
      <div key={key} style={{
        display: 'flex', alignItems: 'center', gap: 5,
      }}>
        <div style={{
          width: 8, height: 8, borderRadius: 2,
          background: val.color, opacity: 0.8,
        }} />
        <span style={{
          fontFamily: "'Space Mono', monospace", fontSize: 10,
          color: val.color, letterSpacing: '0.06em',
        }}>
          {val.label}
        </span>
      </div>
    ))}

    <div style={{ width: 1, height: 16, background: theme.colors.border, margin: '0 4px' }} />

    <span style={{
      fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
      color: theme.colors.textTertiary, letterSpacing: '0.12em',
    }}>
      NODE TYPES
    </span>
    {[
      { icon: '▣', label: 'PAGE', color: theme.colors.textSecondary },
      { icon: '▶', label: 'ACTION', color: theme.colors.pulse },
      { icon: '◉', label: 'MEETING', color: theme.colors.intel },
      { icon: '★', label: 'CONVERSION', color: '#FFAA00' },
      { icon: '◈', label: 'EMAIL', color: theme.colors.brand },
    ].map(t => (
      <div key={t.label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 10, color: t.color }}>{t.icon}</span>
        <span style={{ fontFamily: "'Space Mono', monospace", fontSize: 9, color: theme.colors.textTertiary, letterSpacing: '0.06em' }}>{t.label}</span>
      </div>
    ))}
  </motion.div>
);

// ============================================================================
// STATS BAR — Key metrics
// ============================================================================
const StatsBar = () => {
  const stats = [
    { label: 'TOTAL SCREENS', value: '14', color: theme.colors.pulse },
    { label: 'PHASES', value: '5', color: theme.colors.intel },
    { label: 'PERSONAS SERVED', value: '3', color: theme.colors.brand },
    { label: 'PILOT DURATION', value: '6 MO', color: '#FFAA00' },
    { label: 'ONBOARDING', value: '5 DAYS', color: theme.colors.success },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      style={{
        display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12,
      }}
    >
      {stats.map((s, i) => (
        <motion.div
          key={s.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.06 }}
          style={{
            padding: '14px 16px', borderRadius: 6,
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
            textAlign: 'center',
          }}
        >
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 22, fontWeight: 700,
            color: s.color, marginBottom: 4,
          }}>
            {s.value}
          </div>
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 9,
            color: theme.colors.textTertiary, letterSpacing: '0.1em',
          }}>
            {s.label}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// ============================================================================
// PERSONA JOURNEY VIEW — Filtered view per persona
// ============================================================================
interface PersonaJourneyBarProps {
  activePersona: string | null;
  onSelect: (persona: string | null) => void;
}

const PersonaJourneyBar = ({ activePersona, onSelect }: PersonaJourneyBarProps) => (
  <div style={{
    display: 'flex', gap: 8, alignItems: 'center',
  }}>
    <span style={{
      fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
      color: theme.colors.textTertiary, letterSpacing: '0.1em', marginRight: 4,
    }}>
      FILTER BY JOURNEY
    </span>
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => onSelect(null)}
      style={{
        padding: '6px 14px', borderRadius: 4,
        fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
        letterSpacing: '0.06em', cursor: 'pointer',
        background: !activePersona ? theme.colors.pulse + '20' : 'transparent',
        color: !activePersona ? theme.colors.pulse : theme.colors.textTertiary,
        border: `1px solid ${!activePersona ? theme.colors.pulse + '40' : theme.colors.border}`,
      }}
    >
      ALL
    </motion.button>
    {Object.entries(theme.personas).map(([key, val]) => (
      <motion.button
        key={key}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={() => onSelect(key)}
        style={{
          padding: '6px 14px', borderRadius: 4,
          fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
          letterSpacing: '0.06em', cursor: 'pointer',
          background: activePersona === key ? val.glow : 'transparent',
          color: activePersona === key ? val.color : theme.colors.textTertiary,
          border: `1px solid ${activePersona === key ? val.color + '40' : theme.colors.border}`,
        }}
      >
        {val.icon} {key === 'ar' ? 'A&R' : key === 'brand' ? 'BRANDS' : 'INVESTORS'}
      </motion.button>
    ))}
  </div>
);

// ============================================================================
// MAIN COMPONENT — Champions B2B User Flow Architecture
// ============================================================================
export default function ChampionsB2BFlow() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [activePersona, setActivePersona] = useState<string | null>(null);

  const selectedNodeData = useMemo(() => {
    if (!selectedNode) return null;
    for (const phase of flowData.phases) {
      const node = phase.nodes.find(n => n.id === selectedNode);
      if (node) return { ...node, phaseColor: phase.color };
    }
    return null;
  }, [selectedNode]);

  const filteredPhases = useMemo(() => {
    if (!activePersona) return flowData.phases;
    return flowData.phases.map(phase => ({
      ...phase,
      nodes: phase.nodes.filter(n => n.personas.includes(activePersona as 'ar' | 'brand' | 'investor')),
    })).filter(phase => phase.nodes.length > 0);
  }, [activePersona]);

  return (
    <div style={{
      minHeight: '100vh',
      background: theme.colors.void,
      color: theme.colors.textPrimary,
      fontFamily: 'system-ui, -apple-system, sans-serif',
      position: 'relative',
      overflow: 'hidden',
    }}>
      <NoiseOverlay />
      <GridLines />
      <ScanLine />
      <GlowOrb color={theme.colors.pulse} size={600} x="-200px" y="-100px" />
      <GlowOrb color={theme.colors.intel} size={500} x="70%" y="30%" delay={3} />
      <GlowOrb color={theme.colors.brand} size={400} x="20%" y="70%" delay={6} />

      {/* CONTENT */}
      <div style={{
        position: 'relative', zIndex: 10,
        maxWidth: 1400, margin: '0 auto', padding: '32px 32px 64px',
      }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ marginBottom: 28 }}
        >
          {/* Top bar */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            marginBottom: 20,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 11, fontWeight: 700,
                color: theme.colors.pulse, letterSpacing: '0.15em',
                padding: '4px 10px', borderRadius: 3,
                border: `1px solid ${theme.colors.pulse}30`,
                background: theme.colors.pulseDim,
              }}>
                CHAMPIONS
              </div>
              <div style={{
                fontFamily: "'Space Mono', monospace", fontSize: 10,
                color: theme.colors.textTertiary, letterSpacing: '0.08em',
              }}>
                B2B PLATFORM · MVP PILOT · USER FLOW ARCHITECTURE
              </div>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              <motion.div
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                style={{
                  width: 6, height: 6, borderRadius: '50%',
                  background: theme.colors.success,
                }}
              />
              <span style={{
                fontFamily: "'Space Mono', monospace", fontSize: 9,
                color: theme.colors.success, letterSpacing: '0.1em',
              }}>
                PRE-SEED READY
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: "'Space Mono', monospace",
            fontSize: 'clamp(24px, 3.5vw, 36px)',
            fontWeight: 700,
            color: theme.colors.textPrimary,
            margin: '0 0 8px 0',
            lineHeight: 1.15,
            letterSpacing: '-0.02em',
          }}>
            User Flow Architecture
            <span style={{ color: theme.colors.pulse }}> — Pilot MVP</span>
          </h1>
          <p style={{
            fontSize: 14, lineHeight: 1.6, color: theme.colors.textSecondary,
            margin: '0 0 20px 0', maxWidth: 700,
          }}>
            Complete journey mapping for A&R directors, brand partnership teams, and investment
            partners — from first touch through pilot conversion and annual renewal.
          </p>

          {/* Stats */}
          <StatsBar />
        </motion.div>

        {/* CONTROLS */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: 24, flexWrap: 'wrap', gap: 12,
          }}
        >
          <PersonaJourneyBar activePersona={activePersona} onSelect={setActivePersona} />
        </motion.div>

        {/* Legend */}
        <div style={{ marginBottom: 24 }}>
          <Legend />
        </div>

        {/* MAIN CONTENT — Flow + Detail Panel */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: selectedNodeData ? '1fr 380px' : '1fr',
          gap: 24,
          alignItems: 'start',
          transition: 'all 0.3s ease',
        }}>
          {/* FLOW COLUMN */}
          <div>
            {filteredPhases.map((phase, phaseIdx) => (
              <React.Fragment key={phase.id}>
                {phaseIdx > 0 && (
                  <PhaseConnector
                    fromColor={filteredPhases[phaseIdx - 1].color}
                    toColor={phase.color}
                  />
                )}

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: phaseIdx * 0.1 }}
                  style={{
                    background: theme.colors.glass,
                    backdropFilter: 'blur(20px)',
                    border: `1px solid ${theme.colors.borderGlass}`,
                    borderRadius: 8,
                    overflow: 'hidden',
                  }}
                >
                  {/* Phase Header */}
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: '14px 18px',
                    borderBottom: `1px solid ${theme.colors.border}`,
                    background: `linear-gradient(90deg, ${phase.color}08 0%, transparent 60%)`,
                  }}>
                    <div style={{
                      fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
                      color: theme.colors.void, letterSpacing: '0.1em',
                      padding: '3px 8px', borderRadius: 3,
                      background: phase.color,
                    }}>
                      {String(phaseIdx + 1).padStart(2, '0')}
                    </div>
                    <div>
                      <div style={{
                        fontFamily: "'Space Mono', monospace", fontSize: 13, fontWeight: 700,
                        color: phase.color, letterSpacing: '0.08em',
                      }}>
                        {phase.title}
                      </div>
                      <div style={{
                        fontFamily: "'Space Mono', monospace", fontSize: 9,
                        color: theme.colors.textTertiary, letterSpacing: '0.06em',
                        marginTop: 1,
                      }}>
                        {phase.subtitle}
                      </div>
                    </div>
                    <div style={{
                      marginLeft: 'auto',
                      fontFamily: "'Space Mono', monospace", fontSize: 10,
                      color: theme.colors.textTertiary, letterSpacing: '0.06em',
                    }}>
                      {phase.nodes.length} step{phase.nodes.length !== 1 ? 's' : ''}
                    </div>
                  </div>

                  {/* Phase Nodes */}
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: selectedNodeData
                      ? 'repeat(auto-fill, minmax(280px, 1fr))'
                      : 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap: 10,
                    padding: 14,
                  }}>
                    {phase.nodes.map((node, nodeIdx) => (
                      <React.Fragment key={node.id}>
                        <FlowNodeComponent
                          node={node}
                          phaseColor={phase.color}
                          index={nodeIdx}
                          isSelected={selectedNode === node.id}
                          onSelect={setSelectedNode}
                          isCompact={!!selectedNodeData}
                        />
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Flow arrows between nodes */}
                  {phase.nodes.length > 1 && (
                    <div style={{
                      display: 'flex', justifyContent: 'center', padding: '0 14px 10px',
                      gap: 4, flexWrap: 'wrap',
                    }}>
                      {phase.nodes.map((n, i) => (
                        <React.Fragment key={n.id}>
                          <span style={{
                            fontFamily: "'Space Mono', monospace", fontSize: 9,
                            color: phase.color + '60', letterSpacing: '0.04em',
                          }}>
                            {n.title.split(' ')[0]}
                          </span>
                          {i < phase.nodes.length - 1 && (
                            <span style={{
                              fontFamily: "'Space Mono', monospace", fontSize: 10,
                              color: phase.color + '40',
                            }}>
                              →
                            </span>
                          )}
                        </React.Fragment>
                      ))}
                    </div>
                  )}
                </motion.div>
              </React.Fragment>
            ))}
          </div>

          {/* DETAIL PANEL */}
          <AnimatePresence>
            {selectedNodeData && (
              <div style={{ position: 'sticky', top: 32 }}>
                <DetailPanel
                  node={selectedNodeData}
                />
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  whileHover={{ background: theme.colors.surfaceHover }}
                  onClick={() => setSelectedNode(null)}
                  style={{
                    width: '100%', marginTop: 8, padding: '10px',
                    borderRadius: 6, cursor: 'pointer',
                    fontFamily: "'Space Mono', monospace", fontSize: 10,
                    color: theme.colors.textTertiary, letterSpacing: '0.08em',
                    background: theme.colors.surface,
                    border: `1px solid ${theme.colors.border}`,
                  }}
                >
                  CLOSE DETAILS ✕
                </motion.button>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* FOOTER — Page inventory summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            marginTop: 32, padding: '20px 24px', borderRadius: 8,
            background: theme.colors.surface,
            border: `1px solid ${theme.colors.border}`,
          }}
        >
          <div style={{
            fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
            color: theme.colors.pulse, letterSpacing: '0.12em', marginBottom: 14,
          }}>
            MVP PAGE INVENTORY — PILOT BUILD PRIORITY
          </div>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
            gap: 10,
          }}>
            {[
              { page: 'Marketing Site / Landing', priority: 'P0', status: 'BUILD' },
              { page: 'Book Demo Flow', priority: 'P0', status: 'BUILD' },
              { page: 'Account Setup', priority: 'P0', status: 'BUILD' },
              { page: 'Intelligence Profile Config', priority: 'P0', status: 'BUILD' },
              { page: 'Intelligence Dashboard', priority: 'P0', status: 'BUILD' },
              { page: 'Artist Discovery Search', priority: 'P0', status: 'BUILD' },
              { page: 'Artist Intelligence Profile', priority: 'P0', status: 'BUILD' },
              { page: 'Watchlist', priority: 'P1', status: 'BUILD' },
              { page: 'Alert Centre', priority: 'P1', status: 'BUILD' },
              { page: 'CMI Explainer', priority: 'P1', status: 'BUILD' },
              { page: 'Login / Auth', priority: 'P0', status: 'BUILD' },
              { page: 'Weekly Briefing (Email)', priority: 'P2', status: 'DESIGN' },
              { page: 'Reporting & Export', priority: 'P2', status: 'DESIGN' },
              { page: 'Legal Pages (T&C, Privacy)', priority: 'P1', status: 'ADAPT' },
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '8px 10px', borderRadius: 4,
                background: theme.colors.surfaceElevated,
                border: `1px solid ${theme.colors.borderSubtle}`,
              }}>
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 9, fontWeight: 700,
                  color: item.priority === 'P0' ? theme.colors.pulse : item.priority === 'P1' ? theme.colors.intel : theme.colors.textTertiary,
                  padding: '2px 5px', borderRadius: 2,
                  background: item.priority === 'P0' ? theme.colors.pulseDim : 'transparent',
                  border: `1px solid ${item.priority === 'P0' ? theme.colors.pulse + '30' : theme.colors.border}`,
                }}>
                  {item.priority}
                </span>
                <span style={{
                  fontSize: 11, color: theme.colors.textSecondary,
                  fontFamily: 'system-ui, -apple-system, sans-serif', flex: 1,
                }}>
                  {item.page}
                </span>
                <span style={{
                  fontFamily: "'Space Mono', monospace", fontSize: 8,
                  color: item.status === 'BUILD' ? theme.colors.success : item.status === 'ADAPT' ? '#FFAA00' : theme.colors.textTertiary,
                  letterSpacing: '0.08em',
                }}>
                  {item.status}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Architecture Note */}
        <div style={{
          marginTop: 16, padding: '14px 18px', borderRadius: 6,
          border: `1px solid ${theme.colors.pulse}20`,
          background: theme.colors.pulseDim,
          display: 'flex', gap: 12, alignItems: 'flex-start',
        }}>
          <span style={{
            fontFamily: "'Space Mono', monospace", fontSize: 12, color: theme.colors.pulse,
          }}>
            ★
          </span>
          <div>
            <div style={{
              fontFamily: "'Space Mono', monospace", fontSize: 10, fontWeight: 700,
              color: theme.colors.pulse, letterSpacing: '0.08em', marginBottom: 4,
            }}>
              NEXT STEP — SITE BUILD
            </div>
            <div style={{
              fontSize: 12, lineHeight: 1.6, color: theme.colors.textSecondary,
              fontFamily: 'system-ui, -apple-system, sans-serif',
            }}>
              This flow architecture defines every screen needed for the MVP pilot. The recommended
              build order starts with P0 pages (7 screens) for the investor demo, followed by P1
              pages (4 screens) for pilot launch readiness, then P2 pages (3 screens) for full
              operational capability. Each page will be built as production-grade JSX with the
              Champions B2B design system, ready for Vercel deployment.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
