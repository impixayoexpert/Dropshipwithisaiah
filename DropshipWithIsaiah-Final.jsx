import { useState, useEffect, useRef, useCallback } from "react";

/* ============================================================
   DROPSHIPWITHISAIAH — PREMIUM AGENCY WEBSITE
   Design Direction: Dark luxury tech meets editorial boldness
   Typography: Clash Display (display) + Cabinet Grotesk (body)
   Palette: Deep navy/black + electric sky blue + pure white
   Signature: Kinetic type, glass panels, magnetic hover, grain
============================================================ */

const CSS = `
@import url('https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&f[]=cabinet-grotesk@400,500,700,800&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }

:root {
  --ink:     #03080f;
  --ink2:    #070e1a;
  --ink3:    #0c1828;
  --sky:     #38bdf8;
  --sky2:    #0ea5e9;
  --sky3:    #7dd3fc;
  --sky4:    #0284c7;
  --white:   #ffffff;
  --mist:    #e0f2fe;
  --smoke:   #94a3b8;
  --dim:     #334155;
  --line:    rgba(56,189,248,0.12);
  --glow:    rgba(56,189,248,0.25);

  --f-display: 'Clash Display', 'Georgia', serif;
  --f-body:    'Cabinet Grotesk', 'Helvetica Neue', sans-serif;

  --ease-out: cubic-bezier(0.16,1,0.3,1);
  --ease-in:  cubic-bezier(0.7,0,0.84,0);
}

body {
  background: var(--ink);
  color: var(--white);
  font-family: var(--f-body);
  overflow-x: hidden;
  cursor: none;
}

/* ── CUSTOM CURSOR ── */
#cursor-dot {
  position: fixed; width: 8px; height: 8px;
  background: var(--sky); border-radius: 50%;
  pointer-events: none; z-index: 9999;
  transition: transform 0.1s, opacity 0.3s;
  transform: translate(-50%,-50%);
}
#cursor-ring {
  position: fixed; width: 36px; height: 36px;
  border: 1.5px solid rgba(56,189,248,0.5);
  border-radius: 50%; pointer-events: none; z-index: 9998;
  transition: transform 0.18s var(--ease-out), width 0.3s, height 0.3s, border-color 0.3s;
  transform: translate(-50%,-50%);
}
body:has(a:hover) #cursor-ring,
body:has(button:hover) #cursor-ring {
  width: 56px; height: 56px;
  border-color: var(--sky);
}

/* ── SCROLLBAR ── */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: var(--ink2); }
::-webkit-scrollbar-thumb { background: var(--sky4); border-radius: 2px; }

/* ── NOISE OVERLAY ── */
.noise::after {
  content: '';
  position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E");
  opacity: 0.025; z-index: 1;
}

/* ── TYPE ── */
.display { font-family: var(--f-display); font-weight: 700; line-height: 1; letter-spacing: -0.03em; }
.body-font { font-family: var(--f-body); }

.overline {
  font-family: var(--f-body); font-size: 11px; font-weight: 700;
  letter-spacing: 0.2em; text-transform: uppercase; color: var(--sky);
  display: flex; align-items: center; gap: 10px;
}
.overline::before {
  content: ''; width: 24px; height: 1px; background: var(--sky);
}

/* ── KINETIC TEXT ── */
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-track { display: flex; width: max-content; animation: marquee 20s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }

/* ── ANIMATIONS ── */
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(40px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeSlideIn {
  from { opacity: 0; transform: translateX(-30px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.92); }
  to   { opacity: 1; transform: scale(1); }
}
@keyframes lineExpand {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
@keyframes float {
  0%,100% { transform: translateY(0) rotate(0deg); }
  33%      { transform: translateY(-12px) rotate(1deg); }
  66%      { transform: translateY(-6px) rotate(-1deg); }
}
@keyframes pulseGlow {
  0%,100% { box-shadow: 0 0 0 0 rgba(56,189,248,0.4); }
  50%      { box-shadow: 0 0 0 16px rgba(56,189,248,0); }
}
@keyframes rotateSlow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes gradientFlow {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
@keyframes countUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
@keyframes scanline {
  0% { transform: translateY(-100%); }
  100% { transform: translateY(100vh); }
}

.anim-up   { animation: fadeSlideUp 0.8s var(--ease-out) both; }
.anim-up-2 { animation: fadeSlideUp 0.8s var(--ease-out) 0.12s both; }
.anim-up-3 { animation: fadeSlideUp 0.8s var(--ease-out) 0.24s both; }
.anim-up-4 { animation: fadeSlideUp 0.8s var(--ease-out) 0.36s both; }
.anim-up-5 { animation: fadeSlideUp 0.8s var(--ease-out) 0.48s both; }

.gradient-text {
  background: linear-gradient(135deg, #38bdf8, #7dd3fc, #0ea5e9, #38bdf8);
  background-size: 300% 300%;
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: gradientFlow 4s ease infinite;
}

/* ── GLASS ── */
.glass {
  background: rgba(12,24,40,0.6);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border: 1px solid rgba(56,189,248,0.12);
}
.glass-light {
  background: rgba(224,242,254,0.05);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255,255,255,0.08);
}

/* ── NAV ── */
.nav-link {
  font-family: var(--f-body); font-size: 13px; font-weight: 700;
  letter-spacing: 0.05em; color: var(--smoke);
  background: none; border: none; cursor: none;
  padding: 8px 16px; border-radius: 6px;
  transition: color 0.25s, background 0.25s;
  position: relative;
}
.nav-link::after {
  content: ''; position: absolute; bottom: 2px; left: 16px; right: 16px;
  height: 1px; background: var(--sky); transform: scaleX(0);
  transition: transform 0.3s var(--ease-out); transform-origin: left;
}
.nav-link:hover, .nav-link.active { color: var(--white); }
.nav-link:hover::after, .nav-link.active::after { transform: scaleX(1); }

/* ── BUTTONS ── */
.btn-sky {
  display: inline-flex; align-items: center; gap: 8px;
  background: linear-gradient(135deg, var(--sky4), var(--sky));
  color: var(--ink); font-family: var(--f-body); font-weight: 800;
  font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 14px 30px; border-radius: 100px; border: none;
  cursor: none; transition: all 0.3s var(--ease-out);
  box-shadow: 0 0 0 0 rgba(56,189,248,0.4);
  position: relative; overflow: hidden;
}
.btn-sky::before {
  content: ''; position: absolute; inset: 0;
  background: linear-gradient(135deg, #7dd3fc, var(--sky));
  opacity: 0; transition: opacity 0.3s;
}
.btn-sky:hover { transform: translateY(-3px); box-shadow: 0 12px 40px rgba(56,189,248,0.4); }
.btn-sky:hover::before { opacity: 1; }
.btn-sky span { position: relative; z-index: 1; }

.btn-ghost {
  display: inline-flex; align-items: center; gap: 8px;
  background: transparent; color: var(--white);
  font-family: var(--f-body); font-weight: 700;
  font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase;
  padding: 13px 30px; border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.15);
  cursor: none; transition: all 0.3s;
}
.btn-ghost:hover { border-color: var(--sky); color: var(--sky); background: rgba(56,189,248,0.06); transform: translateY(-3px); }

/* ── CARDS ── */
.card-premium {
  background: linear-gradient(135deg, rgba(12,24,40,0.9), rgba(7,14,26,0.95));
  border: 1px solid rgba(56,189,248,0.1);
  border-radius: 20px; position: relative; overflow: hidden;
  transition: all 0.4s var(--ease-out);
}
.card-premium::before {
  content: ''; position: absolute; inset: 0;
  background: radial-gradient(circle at 50% 0%, rgba(56,189,248,0.08) 0%, transparent 60%);
  opacity: 0; transition: opacity 0.4s;
}
.card-premium:hover { border-color: rgba(56,189,248,0.35); transform: translateY(-8px); box-shadow: 0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(56,189,248,0.08); }
.card-premium:hover::before { opacity: 1; }

.card-glow {
  border-radius: 20px; overflow: hidden;
  background: linear-gradient(135deg, rgba(12,24,40,0.95), rgba(7,14,26,1));
  border: 1px solid rgba(56,189,248,0.15);
  transition: all 0.4s var(--ease-out);
}
.card-glow:hover { transform: translateY(-6px); box-shadow: 0 0 0 1px rgba(56,189,248,0.4), 0 30px 80px rgba(0,0,0,0.6); }

/* ── CHIP / TAG ── */
.chip {
  display: inline-flex; align-items: center; gap: 5px;
  background: rgba(56,189,248,0.08); border: 1px solid rgba(56,189,248,0.2);
  color: var(--sky3); font-family: var(--f-body); font-size: 11px;
  font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
  padding: 4px 12px; border-radius: 100px;
}
.chip-white {
  display: inline-flex; align-items: center;
  background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1);
  color: rgba(255,255,255,0.7); font-family: var(--f-body); font-size: 11px;
  font-weight: 600; letter-spacing: 0.08em;
  padding: 4px 12px; border-radius: 100px;
}

/* ── FORM ── */
.field {
  width: 100%; background: rgba(56,189,248,0.04);
  border: 1px solid rgba(56,189,248,0.15); border-radius: 12px;
  color: var(--white); padding: 16px 20px;
  font-family: var(--f-body); font-size: 14px; font-weight: 500;
  outline: none; transition: border-color 0.3s, box-shadow 0.3s;
}
.field:focus { border-color: var(--sky); box-shadow: 0 0 0 3px rgba(56,189,248,0.1); }
.field::placeholder { color: var(--dim); }
.field option { background: var(--ink2); }

/* ── DIVIDER ── */
.h-line { height: 1px; background: linear-gradient(90deg, transparent, rgba(56,189,248,0.2), transparent); }
.v-line { width: 1px; background: linear-gradient(180deg, transparent, rgba(56,189,248,0.2), transparent); }

/* ── BADGE ── */
.live-badge {
  display: inline-flex; align-items: center; gap: 6px;
  background: rgba(56,189,248,0.1); border: 1px solid rgba(56,189,248,0.25);
  border-radius: 100px; padding: 6px 14px;
  font-family: var(--f-body); font-size: 12px; font-weight: 700;
  color: var(--sky); letter-spacing: 0.05em;
}
.live-dot { width: 6px; height: 6px; border-radius: 50%; background: var(--sky); animation: blink 1.4s ease infinite; }

/* ── FAQ ── */
.faq-row { border-bottom: 1px solid rgba(56,189,248,0.08); }
.faq-btn {
  width: 100%; display: flex; justify-content: space-between; align-items: center;
  gap: 20px; background: none; border: none; cursor: none;
  padding: 26px 0; text-align: left;
  font-family: var(--f-body); font-size: 17px; font-weight: 600;
  color: var(--white); transition: color 0.25s;
}
.faq-btn:hover { color: var(--sky); }
.faq-icon {
  width: 32px; height: 32px; min-width: 32px; border-radius: 50%;
  border: 1px solid rgba(56,189,248,0.25); display: flex;
  align-items: center; justify-content: center;
  color: var(--sky); font-size: 18px; font-weight: 300;
  transition: all 0.3s; background: rgba(56,189,248,0.05);
}

/* ── STARS ── */
.stars { color: #38bdf8; letter-spacing: 3px; font-size: 14px; }

/* ── STAT NUMBER ── */
.stat-num { font-family: var(--f-display); font-weight: 700; color: var(--sky); line-height: 1; letter-spacing: -0.04em; }

/* ── RESPONSIVE ── */
@media (max-width: 900px) {
  .col-2 { grid-template-columns: 1fr !important; gap: 40px !important; }
  .col-3 { grid-template-columns: 1fr 1fr !important; }
  .hide-sm { display: none !important; }
  body { cursor: auto; }
  #cursor-dot, #cursor-ring { display: none; }
}
@media (max-width: 600px) {
  .col-3 { grid-template-columns: 1fr !important; }
  .col-4 { grid-template-columns: 1fr 1fr !important; }
  .hero-h1 { font-size: clamp(42px, 12vw, 80px) !important; }
}

.container { max-width: 1240px; margin: 0 auto; padding: 0 32px; }
section { padding: 120px 0; }
`;

/* ──────────────────── DATA ──────────────────── */

const SERVICES = [
  { icon: "◎", emoji: "🔍", title: "Product Research", tag: "Most Popular", price: "From $97",
    short: "Winning products identified before they saturate the market.",
    full: "Using Minea, AdSpy, TikTok Trends and proprietary research frameworks, we identify products with proven buyer demand, strong profit margins, and minimal competition. Delivered as a full report with supplier links, pricing strategy, and competitor ad breakdowns.",
    includes: ["Top 5 product shortlist with analysis", "Supplier links (AliExpress + agent)", "Profit margin calculator", "Competitor ad research", "Trend validation report"] },
  { icon: "◈", emoji: "🎨", title: "Store Design", tag: "High ROI", price: "From $197",
    short: "High-converting Shopify stores engineered to sell.",
    full: "We build clean, fast, premium Shopify stores that convert visitors into buyers. Mobile-first, CRO-optimised, and built with trust psychology at every touchpoint — from hero section to checkout.",
    includes: ["Custom Shopify theme build", "Brand identity & style guide", "Product page CRO design", "Trust signal integration", "Speed & mobile optimisation"] },
  { icon: "◉", emoji: "⚙️", title: "Ads Account Setup", tag: "Foundation", price: "From $147",
    short: "Pixel-perfect ad infrastructure, built right the first time.",
    full: "Wrong setup destroys campaigns before they launch. We configure your full ad ecosystem — Business Manager, Pixel, Events API, custom audiences, product catalogues — so data tracks accurately and campaigns can scale.",
    includes: ["Facebook Business Manager", "Meta Pixel + Events API", "TikTok Pixel + Events", "Google Ads structure", "Custom audience setup"] },
  { icon: "◆", emoji: "🚀", title: "Paid Ads Management", tag: "Revenue Driver", price: "From $397/mo",
    short: "Creative-led campaigns scaled to consistent profitability.",
    full: "Full Meta and TikTok campaign management — creative strategy, audience testing, budget scaling, and weekly reporting. We test systematically, find winners fast, and scale with precision. Every decision backed by data.",
    includes: ["Ad creative strategy & briefs", "Full campaign management", "Weekly A/B creative testing", "Scaling strategy", "Weekly performance reports"] },
  { icon: "◇", emoji: "📈", title: "SEO Optimisation", tag: "Long-Term", price: "From $247",
    short: "Organic traffic that compounds and converts — forever.",
    full: "Ads stop the moment you stop paying. SEO builds a permanent traffic engine. We optimise your entire Shopify store — pages, metadata, blog, speed — targeting buyer-intent keywords that drive free, converting traffic.",
    includes: ["Full SEO audit report", "Keyword research", "Product & collection SEO", "Blog content strategy", "Speed & Core Web Vitals"] },
  { icon: "○", emoji: "🔗", title: "Private Supplier Sourcing", tag: "Game Changer", price: "From $97",
    short: "Vetted agents with 7–12 day shipping and better margins.",
    full: "Stop relying on slow AliExpress suppliers that tank your reviews. We connect you with trusted private agents — faster shipping, better quality, custom packaging, lower unit costs at volume.",
    includes: ["Supplier vetting & introduction", "Price negotiation support", "Sample coordination", "Custom packaging options", "Agent relationship setup"] },
  { icon: "●", emoji: "📦", title: "Product Sourcing", tag: "Brand Building", price: "From $147",
    short: "Factory-to-store sourcing for serious brand builders.",
    full: "We handle the full sourcing process — finding manufacturers, requesting samples, negotiating MOQs, setting up your supply chain. Built for entrepreneurs who want a real brand, not just another dropship product.",
    includes: ["Manufacturer research", "Sample request & review", "MOQ & price negotiation", "Supply chain setup", "Quality control checklist"] },
  { icon: "◐", emoji: "🔎", title: "Store Audit & Fix", tag: "Quick Win", price: "From $97",
    short: "Diagnose and fix exactly what's killing your conversions.",
    full: "Already running a store with poor results? We audit every layer — design, UX, trust signals, checkout, speed, pricing — and deliver a prioritised fix roadmap. Implementation available.",
    includes: ["Full CRO audit report", "UX & design feedback", "Speed & technical review", "Trust & credibility analysis", "Priority fix roadmap"] },
  { icon: "◑", emoji: "📬", title: "Email Marketing", tag: "Autopilot", price: "From $197",
    short: "Automated flows that recover carts and retain customers.",
    full: "We set up your complete Klaviyo ecosystem — welcome series, abandoned cart recovery, post-purchase sequences, and winback campaigns. Revenue on autopilot, 24/7.",
    includes: ["Klaviyo account setup", "Abandoned cart recovery", "Welcome series (5 emails)", "Post-purchase sequence", "Winback campaign"] },
];

const RESULTS = [
  { n: "$47K", label: "Revenue in 60 days", sub: "SwiftFit – Fashion Niche" },
  { n: "3.8×", label: "ROAS on Meta Ads", sub: "HomeGlow – Home Decor" },
  { n: "340%", label: "Sales after redesign", sub: "GlowSkin – Beauty" },
  { n: "2.1%", label: "Conversion rate CVR", sub: "vs 0.8% industry avg" },
  { n: "7 days", label: "Shipping time achieved", sub: "vs 21-day AliExpress" },
  { n: "$120K+", label: "Total revenue generated", sub: "Across all clients" },
];

const PORTFOLIO = [
  { name: "LuxePet Co.", niche: "Pet Supplies", result: "$23,400", sub: "Revenue in 45 days", roas: "4.2× ROAS", color: "#38bdf8",
    services: ["Store Design", "Product Research", "Meta Ads"],
    desc: "Built the complete Shopify brand from zero, sourced a winning pet product with a private agent, and managed Meta campaigns with UGC creatives. Profitable in week one.", emoji: "🐾" },
  { name: "HomeGlow", niche: "Home Decor", result: "3.8× ROAS", sub: "Sustained 6 weeks", roas: "$31K+ generated", color: "#22d3ee",
    services: ["TikTok Ads", "Private Supplier"],
    desc: "Identified a viral home décor product, connected with a freight agent cutting shipping to 8 days, then scaled TikTok campaigns to $2,000/day spend.", emoji: "🏡" },
  { name: "SwiftFit", niche: "Fitness Gear", result: "$47,200", sub: "In 60 days flat", roas: "First $10K week", color: "#0ea5e9",
    services: ["Full Stack", "Meta + TikTok"],
    desc: "End-to-end brand — identity, store, supplier setup, and dual-platform ad management. Client's first profitable store after two previous failures.", emoji: "💪" },
  { name: "GlowSkin", niche: "Beauty & Skincare", result: "2.1% CVR", sub: "Industry avg: 0.8%", roas: "$8K/mo organic", color: "#67e8f9",
    services: ["SEO", "Email Marketing"],
    desc: "Overhauled on-page SEO, configured Klaviyo flows, and rebuilt product pages. Now generates $8K+ monthly from organic traffic — zero ad spend.", emoji: "✨" },
  { name: "TechCarry", niche: "Tech Accessories", result: "18 Days", sub: "To first profitable run", roas: "2.9× ROAS", color: "#0284c7",
    services: ["Store Audit", "Ads Setup"],
    desc: "Audited a failing store, rebuilt product pages, fixed broken checkout, set up accurate pixel tracking, and launched the first profitable campaign in under 3 weeks.", emoji: "🎒" },
  { name: "KidsJoy", niche: "Children's Toys", result: "$15,800", sub: "First month revenue", roas: "Custom branded SKU", color: "#38bdf8",
    services: ["Product Sourcing", "Store Design"],
    desc: "Sourced a custom-branded toy from a Chinese manufacturer at 200-unit MOQ, designed the full brand store, and launched with targeted Facebook campaigns.", emoji: "🧸" },
];

const TESTIMONIALS = [
  { name: "Marcus O.", loc: "🇺🇸 USA", svc: "Paid Ads + Store Design", result: "$47K / 60 days", stars: 5,
    text: "I was about to quit dropshipping entirely. Isaiah redesigned my store and took over my Meta ads — within two months we hit $47K. He knows what he's doing at a level most gurus simply don't." },
  { name: "Fatima A.", loc: "🇬🇧 UK", svc: "Store Audit + Ads Setup", result: "First sale in 3 days", stars: 5,
    text: "Four months with zero sales. Isaiah audited my store in 48 hours, found seven conversion killers, fixed them, launched ads — first sale came three days later. Worth every single penny." },
  { name: "Daniel K.", loc: "🇦🇺 Australia", svc: "Private Supplier Sourcing", result: "21 → 7 day shipping", stars: 5,
    text: "Three-week shipping times were destroying my reviews. Isaiah introduced me to a China agent and now customers get orders in 7 days. My 1-star reviews dropped 80% and repeat purchases went up significantly." },
  { name: "Priya M.", loc: "🇨🇦 Canada", svc: "TikTok Ads Management", result: "3.8× ROAS", stars: 5,
    text: "Finally found someone who actually understands TikTok ads for ecommerce. Tested 12 creatives, found the winner, scaled to $1,500/day budget. My ROAS has held at 3.8× for six weeks straight." },
  { name: "James T.", loc: "🇿🇦 South Africa", svc: "Product Research", result: "Profitable on day 4", stars: 5,
    text: "I'd been doing my own research for months with nothing working. Isaiah delivered a list of 5 products with full analysis — the first one I tested went profitable on day four." },
  { name: "Sofia R.", loc: "🇲🇽 Mexico", svc: "Full Store Build", result: "340% sales increase", stars: 5,
    text: "My old store looked like a template. Isaiah built a completely new brand — logo, theme, product pages, everything. Conversion rate went from 0.4% to 1.9% and revenue tripled in 30 days." },
];

const FAQS = [
  { q: "Do I need experience to work with you?", a: "Not at all. I work with complete beginners who've never set up Shopify, all the way to experienced sellers who are stuck and need a fresh strategy. Every engagement starts with understanding exactly where you are." },
  { q: "How long before I see results?", a: "For paid ads clients, most see first sales within 3–7 days of launch. Consistent profitability typically comes within 2–4 weeks once winning creatives are identified. SEO is a longer game — meaningful organic traffic in 60–90 days." },
  { q: "What platforms do you work with?", a: "Shopify is our primary platform. For advertising, we run Meta (Facebook + Instagram), TikTok Ads, and Google Shopping. We don't work with WooCommerce or BigCommerce." },
  { q: "Do you offer ongoing monthly retainers?", a: "Yes. Our most popular ongoing engagement is Paid Ads Management — full campaign management, creative testing, optimisation, and weekly reporting. SEO retainers and full monthly management packages are also available." },
  { q: "Can you help if my ads account is banned?", a: "Yes. Account bans are common and fixable in most cases. We assist with appeals, backup account strategy, and setting up fully compliant campaigns to prevent future restrictions." },
  { q: "What's the first step?", a: "Send a message on WhatsApp or fill out the contact form. We'll schedule a free 30-minute strategy call to map out your exact path forward — no payment required." },
];

/* ──────────────────── SMALL COMPONENTS ──────────────────── */

function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; }
      if (ring.current) {
        setTimeout(() => {
          if (ring.current) { ring.current.style.left = e.clientX + "px"; ring.current.style.top = e.clientY + "px"; }
        }, 60);
      }
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <>
      <div id="cursor-dot" ref={dot} />
      <div id="cursor-ring" ref={ring} />
    </>
  );
}

function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (p) => { setPage(p); setMob(false); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const pages = ["Home", "Services", "Portfolio", "Testimonials", "Contact"];

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        padding: "0 32px", height: 72,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(3,8,15,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(24px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(56,189,248,0.08)" : "none",
        transition: "all 0.4s",
      }}>
        {/* Logo */}
        <button onClick={() => go("Home")} style={{ background: "none", border: "none", cursor: "none", display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 10, background: "linear-gradient(135deg, #0ea5e9, #38bdf8)", display: "grid", placeItems: "center" }}>
            <span style={{ fontSize: 16 }}>⚡</span>
          </div>
          <span style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 18, color: "#fff", letterSpacing: "-0.02em" }}>
            Dropship<span style={{ color: "var(--sky)" }}>WithIsaiah</span>
          </span>
        </button>

        {/* Desktop */}
        <div className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 4 }}>
          {pages.map(p => (
            <button key={p} className={`nav-link ${page === p ? "active" : ""}`} onClick={() => go(p)}>{p}</button>
          ))}
        </div>
        <div className="hide-sm" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="https://wa.link/4o42bb" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
            <button className="btn-ghost" style={{ padding: "10px 20px", fontSize: 12 }}>💬 WhatsApp</button>
          </a>
          <button className="btn-sky" onClick={() => go("Contact")} style={{ padding: "10px 22px", fontSize: 12 }}>
            <span>Free Strategy Call</span><span>→</span>
          </button>
        </div>

        {/* Hamburger */}
        <button onClick={() => setMob(!mob)} style={{ background: "none", border: "none", cursor: "none", color: "var(--sky)", fontSize: 22, display: "none" }} className="mobile-ham">
          {mob ? "✕" : "☰"}
        </button>
        <button onClick={() => setMob(!mob)} style={{ background: "none", border: "none", cursor: "pointer", color: "var(--sky)", fontSize: 22 }}>
          {mob ? "✕" : "☰"}
        </button>
      </nav>

      {mob && (
        <div style={{
          position: "fixed", inset: 0, zIndex: 999, paddingTop: 72,
          background: "rgba(3,8,15,0.98)", backdropFilter: "blur(20px)",
          display: "flex", flexDirection: "column", padding: "100px 32px 40px", gap: 6,
        }}>
          {pages.map((p, i) => (
            <button key={p} onClick={() => go(p)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontFamily: "var(--f-display)", fontWeight: 700,
              fontSize: "clamp(32px, 8vw, 52px)",
              color: page === p ? "var(--sky)" : "rgba(255,255,255,0.2)",
              textAlign: "left", padding: "8px 0",
              transition: "color 0.25s",
              animation: `fadeSlideIn 0.5s ease ${i * 0.06}s both`,
            }}
              onMouseEnter={e => e.currentTarget.style.color = "#fff"}
              onMouseLeave={e => e.currentTarget.style.color = page === p ? "var(--sky)" : "rgba(255,255,255,0.2)"}
            >{p}</button>
          ))}
          <button className="btn-sky" onClick={() => go("Contact")} style={{ marginTop: 32, width: "fit-content" }}>
            <span>Book Free Call</span><span>→</span>
          </button>
        </div>
      )}
    </>
  );
}

function WAFloat() {
  return (
    <a href="https://wa.link/4o42bb" target="_blank" rel="noopener noreferrer"
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 998,
        width: 56, height: 56, borderRadius: "50%",
        background: "linear-gradient(135deg, #128c7e, #25d366)",
        display: "grid", placeItems: "center", fontSize: 26,
        textDecoration: "none", animation: "pulseGlow 2.5s ease infinite",
        boxShadow: "0 8px 30px rgba(37,211,102,0.35)",
        transition: "transform 0.3s",
      }}
      onMouseEnter={e => e.currentTarget.style.transform = "scale(1.12)"}
      onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
    >💬</a>
  );
}

function MarqueeBar() {
  const items = ["Product Research", "Store Design", "Paid Ads", "Private Suppliers", "SEO Optimisation", "Email Marketing", "Store Audits", "Product Sourcing", "TikTok Ads", "Meta Ads"];
  const all = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", background: "var(--sky2)", padding: "14px 0", borderTop: "1px solid rgba(255,255,255,0.1)", borderBottom: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="marquee-track">
        {all.map((t, i) => (
          <span key={i} style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 13, color: "var(--ink)", letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 32px", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 20 }}>
            {t} <span style={{ opacity: 0.4 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ background: "#020509", borderTop: "1px solid rgba(56,189,248,0.07)", padding: "80px 32px 40px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1.5fr", gap: 60, marginBottom: 60 }}>
          <div>
            <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: 20, color: "#fff", marginBottom: 16, letterSpacing: "-0.02em" }}>
              Dropship<span style={{ color: "var(--sky)" }}>WithIsaiah</span>
            </div>
            <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--dim)", lineHeight: 1.8, maxWidth: 260, marginBottom: 24 }}>
              Helping dropshippers and ecommerce entrepreneurs build profitable stores, find winning products, and scale with data-driven ads.
            </p>
            <div style={{ display: "flex", gap: 10 }}>
              {["WhatsApp", "Telegram", "Email"].map(s => (
                <div key={s} className="chip-white" style={{ cursor: "pointer" }}>{s}</div>
              ))}
            </div>
          </div>
          <div>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 20 }}>Services</div>
            {["Product Research", "Store Design", "Paid Ads", "SEO", "Private Suppliers", "Email Marketing"].map(s => (
              <div key={s} onClick={() => { setPage("Services"); window.scrollTo(0, 0); }}
                style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--dim)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "var(--dim)"}
              >{s}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 20 }}>Company</div>
            {["Portfolio", "Testimonials", "Contact Us", "FAQ", "Book Free Call"].map(s => (
              <div key={s} style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--dim)", marginBottom: 10, cursor: "pointer", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = "#fff"}
                onMouseLeave={e => e.target.style.color = "var(--dim)"}
              >{s}</div>
            ))}
          </div>
          <div>
            <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 20 }}>Contact</div>
            {[
              { icon: "📱", label: "WhatsApp", val: "+1 (234) 567-8900" },
              { icon: "✈️", label: "Telegram", val: "@dropshipwithisaiah" },
              { icon: "📧", label: "Email", val: "dropshipwithisaiah@gmail.com" },
            ].map(c => (
              <div key={c.label} style={{ display: "flex", gap: 10, marginBottom: 16, alignItems: "flex-start" }}>
                <span>{c.icon}</span>
                <div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--sky)", fontWeight: 600, marginBottom: 2 }}>{c.label}</div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--dim)" }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="h-line" style={{ marginBottom: 28 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)" }}>© 2025 DropshipWithIsaiah · All rights reserved</span>
          <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)" }}>Built for winners. Engineered to scale.</span>
        </div>
      </div>
    </footer>
  );
}

function FAQBlock() {
  const [open, setOpen] = useState(null);
  return (
    <section style={{ background: "var(--ink2)", padding: "120px 32px" }}>
      <div className="container">
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 80, alignItems: "start" }} className="col-2">
          <div style={{ position: "sticky", top: 100 }}>
            <span className="overline" style={{ marginBottom: 20 }}>FAQ</span>
            <h2 className="display" style={{ fontSize: "clamp(36px, 3.5vw, 54px)", color: "#fff", marginBottom: 20, lineHeight: 1.05 }}>
              Frequently<br />Asked <span className="gradient-text">Questions</span>
            </h2>
            <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 32 }}>
              Can't find what you're looking for? Reach out directly on WhatsApp.
            </p>
            <a href="https://wa.link/4o42bb" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button className="btn-ghost">💬 Ask on WhatsApp</button>
            </a>
          </div>
          <div>
            {FAQS.map((f, i) => (
              <div key={i} className="faq-row">
                <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)}>
                  <span style={{ color: open === i ? "var(--sky)" : "inherit" }}>{f.q}</span>
                  <div className="faq-icon" style={{ transform: open === i ? "rotate(45deg)" : "none", background: open === i ? "rgba(56,189,248,0.15)" : "" }}>+</div>
                </button>
                {open === i && (
                  <div style={{ paddingBottom: 24, animation: "fadeSlideUp 0.3s ease" }}>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "var(--smoke)", lineHeight: 1.85 }}>{f.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ──────────────────── PAGES ──────────────────── */

function HomePage({ setPage }) {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="noise" style={{
        minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center",
        background: "radial-gradient(ellipse 120% 80% at 60% 40%, rgba(14,165,233,0.07) 0%, transparent 60%), linear-gradient(160deg, #03080f 0%, #07131f 50%, #03080f 100%)",
        position: "relative", overflow: "hidden", paddingTop: 72,
      }}>
        {/* Geometric grid */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)", backgroundSize: "64px 64px" }} />
        {/* Glow sphere */}
        <div style={{ position: "absolute", top: "15%", right: "8%", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1) 0%, transparent 70%)", animation: "float 8s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "10%", left: "3%", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(14,165,233,0.07) 0%, transparent 70%)", animation: "float 10s ease-in-out 2s infinite", pointerEvents: "none" }} />

        <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: 80, paddingBottom: 80 }}>
          {/* Eyebrow */}
          <div className="live-badge anim-up" style={{ marginBottom: 28, display: "inline-flex" }}>
            <div className="live-dot" /><span>50+ Entrepreneurs Scaled</span>
          </div>

          {/* H1 */}
          <h1 className="display hero-h1 anim-up-2" style={{
            fontSize: "clamp(52px, 8vw, 110px)", color: "#fff",
            maxWidth: 900, marginBottom: 32, lineHeight: 0.95,
          }}>
            Stop Guessing.<br />
            Start <span className="gradient-text">Scaling.</span>
          </h1>

          <p className="anim-up-3" style={{ fontFamily: "var(--f-body)", fontSize: "clamp(15px, 1.8vw, 18px)", color: "var(--smoke)", lineHeight: 1.8, maxWidth: 520, marginBottom: 44 }}>
            I help dropshippers and ecommerce entrepreneurs build profitable stores, find winning products, and run ads that actually convert — from zero to consistent revenue.
          </p>

          <div className="anim-up-4" style={{ display: "flex", gap: 14, flexWrap: "wrap", marginBottom: 72 }}>
            <button className="btn-sky" onClick={() => { setPage("Contact"); window.scrollTo(0, 0); }}>
              <span>Book Free Strategy Call</span><span>→</span>
            </button>
            <button className="btn-ghost" onClick={() => { setPage("Portfolio"); window.scrollTo(0, 0); }}>
              View Our Work ↗
            </button>
          </div>

          {/* Metrics row */}
          <div className="anim-up-5" style={{
            display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
            borderTop: "1px solid rgba(56,189,248,0.1)",
            borderLeft: "1px solid rgba(56,189,248,0.1)",
            maxWidth: 700,
          }}>
            {[["$120K+", "Revenue Generated"], ["50+", "Clients Served"], ["4.9★", "Avg. Rating"], ["3yrs", "In Ecommerce"]].map(([n, l]) => (
              <div key={l} style={{ padding: "24px 20px", borderRight: "1px solid rgba(56,189,248,0.1)", borderBottom: "1px solid rgba(56,189,248,0.1)" }}>
                <div className="stat-num" style={{ fontSize: "clamp(22px, 2.5vw, 30px)", marginBottom: 4 }}>{n}</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)", letterSpacing: "0.05em" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{ position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: 0.4 }}>
          <span style={{ fontFamily: "var(--f-body)", fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sky)" }}>Scroll</span>
          <div style={{ width: 1, height: 40, background: "linear-gradient(180deg, var(--sky), transparent)" }} />
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <MarqueeBar />

      {/* ── ABOUT ── */}
      <section style={{ background: "#fff", padding: "120px 32px" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 100, alignItems: "center" }} className="col-2">
            <div>
              <span className="overline" style={{ color: "var(--sky4)", marginBottom: 20 }}>About Isaiah</span>
              <h2 className="display" style={{ fontSize: "clamp(36px, 4vw, 60px)", color: "var(--ink)", lineHeight: 1.0, marginBottom: 28 }}>
                From<br /><span style={{ color: "var(--sky2)" }}>Struggling</span><br />To Scaling.
              </h2>
              <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "#4a6070", lineHeight: 1.9, marginBottom: 20 }}>
                I'm Isaiah — a dropshipping and ecommerce specialist who knows exactly what it's like to waste money on ads that don't convert, run a store with zero sales, and feel completely stuck with no clear path forward.
              </p>
              <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "#4a6070", lineHeight: 1.9, marginBottom: 36 }}>
                After years of testing, failing, and figuring out what actually works, I've generated over $120K for clients across niches from fitness to beauty to home décor. Now I help people skip the painful learning curve.
              </p>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36 }}>
                {["Shopify Expert", "Meta & TikTok Ads", "Product Research", "Private Suppliers", "SEO", "Email Flows"].map(t => (
                  <span key={t} style={{ background: "rgba(2,132,199,0.08)", border: "1px solid rgba(2,132,199,0.18)", borderRadius: "100px", padding: "5px 14px", fontSize: 12, fontWeight: 700, color: "var(--sky4)", fontFamily: "var(--f-body)" }}>{t}</span>
                ))}
              </div>
              <button className="btn-sky" style={{ background: "linear-gradient(135deg, var(--sky4), var(--sky2))" }} onClick={() => { setPage("Contact"); window.scrollTo(0, 0); }}>
                <span>Work With Me</span><span>→</span>
              </button>
            </div>

            {/* Right: Values grid */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { icon: "🎯", t: "Data-Driven", d: "Every decision backed by numbers and systematic testing, not guesswork." },
                { icon: "⚡", t: "Fast Execution", d: "From strategy to live campaigns in days, not weeks or months." },
                { icon: "🔍", t: "Transparent", d: "Weekly reports, open Slack/WhatsApp access, no fluff or hiding." },
                { icon: "📈", t: "ROI-First", d: "Your profit is the only metric that matters. Everything else is noise." },
              ].map((v, i) => (
                <div key={i} style={{ background: i % 2 === 0 ? "var(--mist)" : "var(--sky2)", borderRadius: 18, padding: "28px 24px", transition: "transform 0.3s" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "translateY(-4px)"}
                  onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
                >
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{v.icon}</div>
                  <div className="display" style={{ fontSize: 17, color: i % 2 === 0 ? "var(--ink)" : "#fff", marginBottom: 8 }}>{v.t}</div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 13, color: i % 2 === 0 ? "#4a6070" : "rgba(255,255,255,0.8)", lineHeight: 1.7 }}>{v.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES PREVIEW ── */}
      <section style={{ background: "var(--ink)", padding: "120px 32px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 64, flexWrap: "wrap", gap: 24 }}>
            <div>
              <span className="overline" style={{ marginBottom: 16 }}>What I Offer</span>
              <h2 className="display" style={{ fontSize: "clamp(36px, 4vw, 60px)", color: "#fff", lineHeight: 1.0 }}>
                Every Tool You<br />Need To <span className="gradient-text">Win</span>
              </h2>
            </div>
            <button className="btn-ghost" onClick={() => { setPage("Services"); window.scrollTo(0, 0); }}>View All 9 Services →</button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="col-3">
            {SERVICES.slice(0, 6).map((s, i) => (
              <div key={i} className="card-premium" style={{ padding: "32px 30px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                  <div style={{ width: 50, height: 50, borderRadius: 14, background: "rgba(56,189,248,0.08)", border: "1px solid rgba(56,189,248,0.15)", display: "grid", placeItems: "center", fontSize: 24 }}>{s.emoji}</div>
                  <span className="chip" style={{ fontSize: 10 }}>{s.tag}</span>
                </div>
                <h3 className="display" style={{ fontSize: 20, color: "#fff", marginBottom: 10 }}>{s.title}</h3>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 20 }}>{s.short}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid rgba(56,189,248,0.08)", paddingTop: 16 }}>
                  <span style={{ fontFamily: "var(--f-display)", fontWeight: 600, fontSize: 16, color: "var(--sky)" }}>{s.price}</span>
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)", cursor: "pointer" }}
                    onClick={() => { setPage("Services"); window.scrollTo(0, 0); }}>Learn more →</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RESULTS STRIP ── */}
      <section style={{ background: "linear-gradient(135deg, var(--sky4) 0%, var(--sky2) 50%, var(--sky) 100%)", padding: "100px 32px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <h2 className="display" style={{ fontSize: "clamp(32px, 4vw, 56px)", color: "var(--ink)", lineHeight: 1.1, marginBottom: 12 }}>Real Numbers. Real Clients.</h2>
            <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "rgba(3,8,15,0.65)" }}>Not projections. Not promises. Actual results delivered.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="col-3">
            {RESULTS.map((r, i) => (
              <div key={i} style={{ background: "rgba(3,8,15,0.12)", backdropFilter: "blur(10px)", borderRadius: 16, padding: "32px 24px", textAlign: "center", border: "1px solid rgba(255,255,255,0.15)" }}>
                <div className="display" style={{ fontSize: "clamp(32px, 4vw, 48px)", color: "var(--ink)", fontWeight: 700, lineHeight: 1, marginBottom: 8 }}>{r.n}</div>
                <div style={{ fontFamily: "var(--f-body)", fontWeight: 700, fontSize: 15, color: "var(--ink)", marginBottom: 4 }}>{r.label}</div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "rgba(3,8,15,0.55)" }}>{r.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS PREVIEW ── */}
      <section style={{ background: "var(--ink2)", padding: "120px 32px" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 60, flexWrap: "wrap", gap: 20 }}>
            <div>
              <span className="overline" style={{ marginBottom: 16 }}>Client Reviews</span>
              <h2 className="display" style={{ fontSize: "clamp(36px, 4vw, 56px)", color: "#fff" }}>
                What They <span className="gradient-text">Say</span>
              </h2>
            </div>
            <button className="btn-ghost" onClick={() => { setPage("Testimonials"); window.scrollTo(0, 0); }}>All Reviews →</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="col-3">
            {TESTIMONIALS.slice(0, 3).map((t, i) => (
              <div key={i} className="card-premium" style={{ padding: 32 }}>
                <div className="stars" style={{ marginBottom: 16 }}>{"★".repeat(t.stars)}</div>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--smoke)", lineHeight: 1.85, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
                <div style={{ borderTop: "1px solid rgba(56,189,248,0.1)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="display" style={{ fontSize: 15, color: "#fff", marginBottom: 3 }}>{t.name}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)" }}>{t.loc}</div>
                  </div>
                  <span className="chip" style={{ fontSize: 10 }}>{t.result}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section style={{ background: "var(--ink)", padding: "120px 32px" }}>
        <div className="container">
          <div style={{ background: "linear-gradient(135deg, rgba(14,165,233,0.08) 0%, rgba(56,189,248,0.04) 100%)", border: "1px solid rgba(56,189,248,0.15)", borderRadius: 28, padding: "80px 60px", textAlign: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, right: -60, width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.1), transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -80, left: -40, width: 250, height: 250, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.06), transparent 70%)", pointerEvents: "none" }} />
            <div className="live-badge" style={{ marginBottom: 28, display: "inline-flex" }}><div className="live-dot" /><span>Limited Spots — Book Now</span></div>
            <h2 className="display" style={{ fontSize: "clamp(36px, 5vw, 72px)", color: "#fff", lineHeight: 1.0, marginBottom: 20 }}>
              Ready To Build Your<br /><span className="gradient-text">Profitable Store?</span>
            </h2>
            <p style={{ fontFamily: "var(--f-body)", fontSize: 16, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 44, maxWidth: 540, margin: "0 auto 44px" }}>
              Book a free 30-minute strategy call. We'll identify exactly what's holding your store back and map out the fastest path to consistent profitability.
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-sky" onClick={() => { setPage("Contact"); window.scrollTo(0, 0); }}>
                <span>Book Free Strategy Call</span><span>→</span>
              </button>
              <a href="https://wa.link/4o42bb" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <button className="btn-ghost">💬 WhatsApp Now</button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

function ServicesPage({ setPage }) {
  const [active, setActive] = useState(null);
  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh", paddingTop: 72 }}>
      {/* Hero */}
      <div className="noise" style={{ padding: "100px 32px 80px", background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(14,165,233,0.07) 0%, transparent 70%)", borderBottom: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(56,189,248,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.02) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="overline" style={{ justifyContent: "center", marginBottom: 20 }}>Everything You Need</span>
          <h1 className="display" style={{ fontSize: "clamp(44px, 6vw, 86px)", color: "#fff", lineHeight: 1.0, marginBottom: 24 }}>
            Services Built For<br /><span className="gradient-text">Ecommerce Winners</span>
          </h1>
          <p style={{ fontFamily: "var(--f-body)", fontSize: 16, color: "var(--smoke)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto" }}>
            Whether you're starting from zero or scaling past 5 figures — every service is designed for exactly where you are right now.
          </p>
        </div>
      </div>

      {/* Services accordion */}
      <div className="container" style={{ padding: "80px 32px" }}>
        {SERVICES.map((s, i) => (
          <div key={s.id || i} className="card-glow" style={{ marginBottom: 16, overflow: "hidden" }}>
            <button onClick={() => setActive(active === i ? null : i)} style={{ width: "100%", background: "none", border: "none", cursor: "none", padding: "32px 36px", display: "flex", alignItems: "center", gap: 24, textAlign: "left" }}>
              <div style={{ width: 56, height: 56, minWidth: 56, borderRadius: 16, background: active === i ? "rgba(56,189,248,0.15)" : "rgba(56,189,248,0.07)", border: `1px solid ${active === i ? "rgba(56,189,248,0.4)" : "rgba(56,189,248,0.12)"}`, display: "grid", placeItems: "center", fontSize: 26, transition: "all 0.3s" }}>{s.emoji}</div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 6 }}>
                  <h3 className="display" style={{ fontSize: 22, color: "#fff" }}>{s.title}</h3>
                  <span className="chip" style={{ fontSize: 10 }}>{s.tag}</span>
                </div>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--smoke)" }}>{s.short}</p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 24, minWidth: "auto" }}>
                <span className="display" style={{ fontSize: 18, color: "var(--sky)", whiteSpace: "nowrap" }}>{s.price}</span>
                <div style={{
                  width: 36, height: 36, borderRadius: "50%",
                  border: "1px solid rgba(56,189,248,0.25)",
                  display: "grid", placeItems: "center", color: "var(--sky)", fontSize: 20,
                  transition: "all 0.35s", background: active === i ? "rgba(56,189,248,0.15)" : "transparent",
                  transform: active === i ? "rotate(45deg)" : "none",
                }}>+</div>
              </div>
            </button>

            {active === i && (
              <div style={{ padding: "0 36px 40px", borderTop: "1px solid rgba(56,189,248,0.08)", animation: "fadeSlideUp 0.4s ease" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, paddingTop: 36 }} className="col-2">
                  <div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 20 }}>What's Included</div>
                    {s.includes.map((inc, j) => (
                      <div key={j} style={{ display: "flex", gap: 12, marginBottom: 14, alignItems: "flex-start" }}>
                        <div style={{ width: 20, height: 20, minWidth: 20, borderRadius: "50%", background: "rgba(56,189,248,0.1)", border: "1px solid rgba(56,189,248,0.3)", display: "grid", placeItems: "center", marginTop: 1 }}>
                          <span style={{ color: "var(--sky)", fontSize: 10, fontWeight: 700 }}>✓</span>
                        </div>
                        <span style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--smoke)", lineHeight: 1.6 }}>{inc}</span>
                      </div>
                    ))}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 20 }}>Full Description</div>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--smoke)", lineHeight: 1.9, marginBottom: 32 }}>{s.full}</p>
                    <button className="btn-sky" onClick={() => { setPage("Contact"); window.scrollTo(0, 0); }}>
                      <span>Get This Service</span><span>→</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, var(--sky4), var(--sky2))", padding: "80px 32px", textAlign: "center" }}>
        <h2 className="display" style={{ fontSize: "clamp(28px, 3vw, 48px)", color: "var(--ink)", marginBottom: 14 }}>Not Sure Which Service Fits You?</h2>
        <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "rgba(3,8,15,0.65)", marginBottom: 32 }}>Book a free call and I'll tell you exactly what will move the needle.</p>
        <button style={{ background: "var(--ink)", color: "#fff", fontFamily: "var(--f-body)", fontWeight: 800, fontSize: 14, padding: "14px 32px", borderRadius: "100px", border: "none", cursor: "pointer", transition: "all 0.3s" }}
          onClick={() => { setPage("Contact"); window.scrollTo(0, 0); }}
          onMouseEnter={e => e.currentTarget.style.transform = "translateY(-3px)"}
          onMouseLeave={e => e.currentTarget.style.transform = "translateY(0)"}
        >Book Free Strategy Call →</button>
      </div>
    </div>
  );
}

function PortfolioPage({ setPage }) {
  const [sel, setSel] = useState(null);
  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh", paddingTop: 72 }}>
      <div className="noise" style={{ padding: "100px 32px 80px", background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(14,165,233,0.07) 0%, transparent 70%)", borderBottom: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }} className="col-2">
            <div>
              <span className="overline" style={{ marginBottom: 20 }}>Case Studies</span>
              <h1 className="display" style={{ fontSize: "clamp(44px, 5.5vw, 80px)", color: "#fff", lineHeight: 1.0, marginBottom: 20 }}>
                Real Stores.<br /><span className="gradient-text">Real Revenue.</span>
              </h1>
              <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "var(--smoke)", lineHeight: 1.8 }}>
                Every project shown here is a real client — real strategies, real numbers, real outcomes. No mock-ups.
              </p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[["$120K+", "Total Generated"], ["50+", "Projects Done"], ["6", "Case Studies"], ["4.9★", "Avg Rating"]].map(([n, l]) => (
                <div key={l} style={{ background: "rgba(56,189,248,0.05)", border: "1px solid rgba(56,189,248,0.12)", borderRadius: 14, padding: "24px 20px" }}>
                  <div className="stat-num" style={{ fontSize: 28, marginBottom: 4 }}>{n}</div>
                  <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }} className="col-2">
          {PORTFOLIO.map((p, i) => (
            <div key={i} className="card-glow" style={{ cursor: "pointer", overflow: "hidden" }} onClick={() => setSel(sel === i ? null : i)}>
              {/* Card Header */}
              <div style={{ background: `linear-gradient(135deg, ${p.color}14, ${p.color}05)`, padding: "40px 36px", borderBottom: `2px solid ${p.color}` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
                  <span style={{ fontSize: 52 }}>{p.emoji}</span>
                  <div style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
                    {p.services.map(sv => <span key={sv} className="chip-white" style={{ fontSize: 10 }}>{sv}</span>)}
                  </div>
                </div>
                <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: p.color, marginBottom: 8 }}>{p.niche}</div>
                <h3 className="display" style={{ fontSize: 28, color: "#fff", marginBottom: 24 }}>{p.name}</h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                  <div>
                    <div style={{ fontFamily: "var(--f-display)", fontWeight: 700, fontSize: "clamp(24px, 3vw, 34px)", color: p.color, lineHeight: 1 }}>{p.result}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--smoke)", marginTop: 4 }}>{p.sub}</div>
                  </div>
                  <div>
                    <div className="display" style={{ fontSize: 20, color: "#fff", lineHeight: 1 }}>{p.roas}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--smoke)", marginTop: 4 }}>Key metric</div>
                  </div>
                </div>
              </div>

              {/* Card Body */}
              <div style={{ padding: "28px 36px" }}>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--sky)", fontWeight: 600 }}>{sel === i ? "▲ Collapse" : "▼ Full case study"}</span>
                </div>

                {sel === i && (
                  <div style={{ marginTop: 24, paddingTop: 24, borderTop: "1px solid rgba(56,189,248,0.1)", animation: "fadeSlideUp 0.4s ease" }}>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 14 }}>Strategy Applied</div>
                    <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--dim)", lineHeight: 1.85, marginBottom: 24 }}>
                      Systematic product validation, store architecture, supplier negotiations, and data-led campaign scaling using proven creative testing frameworks. Every decision tracked, tested, and optimised weekly.
                    </p>
                    <button className="btn-sky" style={{ width: "100%", justifyContent: "center" }} onClick={() => { setPage("Contact"); window.scrollTo(0, 0); }}>
                      <span>Get Similar Results</span><span>→</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function TestimonialsPage({ setPage }) {
  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh", paddingTop: 72 }}>
      {/* Hero */}
      <div className="noise" style={{ padding: "100px 32px 80px", background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(14,165,233,0.07) 0%, transparent 70%)", borderBottom: "1px solid var(--line)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1, textAlign: "center" }}>
          <span className="overline" style={{ justifyContent: "center", marginBottom: 20 }}>100% Verified Reviews</span>
          <h1 className="display" style={{ fontSize: "clamp(44px, 6vw, 86px)", color: "#fff", lineHeight: 1.0, marginBottom: 20 }}>
            Client <span className="gradient-text">Success Stories</span>
          </h1>
          <p style={{ fontFamily: "var(--f-body)", fontSize: 16, color: "var(--smoke)", maxWidth: 500, margin: "0 auto" }}>Real people. Real results. Real businesses transformed across 6 countries.</p>

          {/* Rating Bar */}
          <div style={{ display: "flex", gap: 40, justifyContent: "center", alignItems: "center", flexWrap: "wrap", marginTop: 48 }}>
            <div>
              <div className="display" style={{ fontSize: 72, color: "var(--sky)", lineHeight: 1, letterSpacing: "-0.05em" }}>4.9</div>
              <div className="stars" style={{ fontSize: 20 }}>★★★★★</div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)", marginTop: 6 }}>Average Rating</div>
            </div>
            <div className="v-line" style={{ height: 80 }} />
            <div>
              <div className="display" style={{ fontSize: 48, color: "#fff", lineHeight: 1 }}>50+</div>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)", marginTop: 6 }}>Total Reviews</div>
            </div>
            <div className="v-line" style={{ height: 80 }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[[5, "93%"], [4, "5%"], [3, "2%"]].map(([star, pct]) => (
                <div key={star} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)", width: 22 }}>{star}★</span>
                  <div style={{ height: 6, width: 140, background: "rgba(56,189,248,0.1)", borderRadius: 3, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: pct, background: "linear-gradient(90deg, var(--sky4), var(--sky))", borderRadius: 3 }} />
                  </div>
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)" }}>{pct}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* All Reviews */}
      <div className="container" style={{ padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }} className="col-3">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card-premium" style={{ padding: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <div className="stars">{"★".repeat(t.stars)}</div>
                <div className="chip" style={{ fontSize: 10, background: "rgba(56,189,248,0.06)" }}>✓ Verified</div>
              </div>
              <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--smoke)", lineHeight: 1.85, marginBottom: 24, fontStyle: "italic" }}>"{t.text}"</p>
              <div style={{ borderTop: "1px solid rgba(56,189,248,0.08)", paddingTop: 20 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <div>
                    <div className="display" style={{ fontSize: 15, color: "#fff", marginBottom: 3 }}>{t.name}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)" }}>{t.loc}</div>
                  </div>
                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 11, color: "var(--sky)", fontWeight: 600, marginBottom: 2 }}>{t.svc}</div>
                    <div className="display" style={{ fontSize: 14, color: "var(--sky3)" }}>{t.result}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={{ background: "linear-gradient(135deg, var(--sky4), var(--sky2))", padding: "80px 32px", textAlign: "center" }}>
        <h2 className="display" style={{ fontSize: "clamp(28px, 3.5vw, 52px)", color: "var(--ink)", marginBottom: 14 }}>
          You Could Be The Next Success Story
        </h2>
        <p style={{ fontFamily: "var(--f-body)", fontSize: 15, color: "rgba(3,8,15,0.65)", marginBottom: 32 }}>Book a free call and let's map out your path to profitable dropshipping.</p>
        <button style={{ background: "var(--ink)", color: "#fff", fontFamily: "var(--f-body)", fontWeight: 800, fontSize: 14, padding: "14px 32px", borderRadius: "100px", border: "none", cursor: "pointer" }}
          onClick={() => { setPage("Contact"); window.scrollTo(0, 0); }}>
          Book Free Strategy Call →
        </button>
      </div>

      <FAQBlock />
    </div>
  );
}

function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", wa: "", service: "", budget: "", message: "" });
  const [done, setDone] = useState(false);
  const submit = () => { if (form.name && form.email && form.message) setDone(true); };

  return (
    <div style={{ background: "var(--ink)", minHeight: "100vh", paddingTop: 72 }}>
      <div className="noise" style={{ padding: "100px 32px 80px", background: "radial-gradient(ellipse 100% 60% at 50% 0%, rgba(14,165,233,0.07) 0%, transparent 70%)", borderBottom: "1px solid var(--line)", position: "relative", overflow: "hidden", textAlign: "center" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(56,189,248,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.025) 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <span className="overline" style={{ justifyContent: "center", marginBottom: 20 }}>Get In Touch</span>
          <h1 className="display" style={{ fontSize: "clamp(44px, 6vw, 86px)", color: "#fff", lineHeight: 1.0, marginBottom: 20 }}>
            Let's Build Your<br /><span className="gradient-text">Dream Store</span>
          </h1>
          <p style={{ fontFamily: "var(--f-body)", fontSize: 16, color: "var(--smoke)", maxWidth: 500, margin: "0 auto" }}>
            Start with a free 30-minute strategy call. No commitment, no sales pitch — just honest direction on what you need.
          </p>
        </div>
      </div>

      <div className="container" style={{ padding: "80px 32px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.6fr", gap: 64, alignItems: "start" }} className="col-2">

          {/* Left — contact info */}
          <div>
            <h2 className="display" style={{ fontSize: 30, color: "#fff", marginBottom: 8 }}>Contact Info</h2>
            <p style={{ fontFamily: "var(--f-body)", fontSize: 14, color: "var(--smoke)", lineHeight: 1.8, marginBottom: 36 }}>
              Pick your preferred channel. WhatsApp gets the fastest reply — usually under 2 hours.
            </p>

            {[
              { icon: "📱", name: "WhatsApp", val: "wa.link/4o42bb", note: "Fastest response · Under 2 hrs", col: "#25d366", href: "https://wa.link/4o42bb" },
              { icon: "✈️", name: "Telegram", val: "@dropshipwithisaiah", note: "Great for file sharing", col: "#0088cc", href: "https://t.me/dropshipwithisaiah" },
              { icon: "📧", name: "Email", val: "dropshipwithisaiah@gmail.com", note: "Formal proposals & invoices", col: "var(--sky)", href: "mailto:dropshipwithisaiah@gmail.com" },
            ].map(c => (
              <a key={c.name} href={c.href} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none", display: "block", marginBottom: 14 }}>
                <div style={{
                  display: "flex", gap: 16, alignItems: "flex-start", padding: "20px 24px", borderRadius: 14,
                  background: `${c.col}0d`, border: `1px solid ${c.col}28`,
                  transition: "all 0.3s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.borderColor = c.col + "66"; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = c.col + "28"; }}
                >
                  <span style={{ fontSize: 26, marginTop: 2 }}>{c.icon}</span>
                  <div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: c.col, marginBottom: 3 }}>{c.name}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 14, fontWeight: 600, color: "#fff", marginBottom: 3 }}>{c.val}</div>
                    <div style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)" }}>{c.note}</div>
                  </div>
                </div>
              </a>
            ))}

            {/* Response times */}
            <div style={{ background: "var(--ink2)", border: "1px solid var(--line)", borderRadius: 14, padding: 24, marginTop: 8 }}>
              <div style={{ fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 16 }}>Response Times</div>
              {[["WhatsApp", "Under 2 hours"], ["Telegram", "Under 3 hours"], ["Email", "Within 24 hours"]].map(([p, t]) => (
                <div key={p} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, borderBottom: "1px solid rgba(56,189,248,0.05)", paddingBottom: 10 }}>
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--dim)" }}>{p}</span>
                  <span style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "#fff", fontWeight: 600 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div style={{ background: "var(--ink2)", border: "1px solid rgba(56,189,248,0.12)", borderRadius: 24, padding: "48px", position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, var(--sky4), var(--sky), var(--sky3))" }} />
            <div style={{ position: "absolute", top: -80, right: -80, width: 200, height: 200, borderRadius: "50%", background: "radial-gradient(circle, rgba(56,189,248,0.06), transparent 70%)", pointerEvents: "none" }} />

            {done ? (
              <div style={{ textAlign: "center", padding: "48px 0" }}>
                <div style={{ fontSize: 64, marginBottom: 20 }}>🎉</div>
                <h3 className="display" style={{ fontSize: 30, color: "var(--sky)", marginBottom: 12 }}>Message Sent!</h3>
                <p style={{ fontFamily: "var(--f-body)", color: "var(--smoke)", lineHeight: 1.8, fontSize: 15, marginBottom: 32 }}>
                  Thanks {form.name}! I'll reply within 24 hours. For faster response, message on WhatsApp.
                </p>
                <a href="https://wa.link/4o42bb" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                  <button className="btn-sky"><span>Continue on WhatsApp</span><span>→</span></button>
                </a>
              </div>
            ) : (
              <>
                <h3 className="display" style={{ fontSize: 26, color: "#fff", marginBottom: 6 }}>Send a Message</h3>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 13, color: "var(--dim)", marginBottom: 32 }}>Free consultation · No commitment required</p>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[["Full Name *", "name", "Your name", "text"], ["Email Address *", "email", "you@email.com", "email"]].map(([label, key, ph, type]) => (
                    <div key={key}>
                      <label style={{ display: "block", fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 8 }}>{label}</label>
                      <input className="field" type={type} placeholder={ph} value={form[key]} onChange={e => setForm({ ...form, [key]: e.target.value })} />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 8 }}>WhatsApp Number</label>
                  <input className="field" placeholder="+1 234 567 8900" value={form.wa} onChange={e => setForm({ ...form, wa: e.target.value })} />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 8 }}>Service Needed</label>
                    <select className="field" value={form.service} onChange={e => setForm({ ...form, service: e.target.value })}>
                      <option value="">Select...</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                      <option value="bundle">Full Bundle</option>
                      <option value="unsure">Not Sure Yet</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 8 }}>Monthly Budget</label>
                    <select className="field" value={form.budget} onChange={e => setForm({ ...form, budget: e.target.value })}>
                      <option value="">Select...</option>
                      {["Under $100", "$100 – $300", "$300 – $600", "$600 – $1,000", "$1,000+"].map(b => <option key={b}>{b}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: 28 }}>
                  <label style={{ display: "block", fontFamily: "var(--f-body)", fontSize: 11, fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--sky)", marginBottom: 8 }}>Your Situation *</label>
                  <textarea className="field" rows={5} placeholder="Where are you now? What's your biggest challenge? What have you already tried?" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} style={{ resize: "vertical" }} />
                </div>

                <button className="btn-sky" onClick={submit} style={{ width: "100%", justifyContent: "center", padding: "16px", fontSize: 14 }}>
                  <span>Send Message & Book Free Call</span><span>→</span>
                </button>
                <p style={{ fontFamily: "var(--f-body)", fontSize: 12, color: "var(--dim)", textAlign: "center", marginTop: 14 }}>No spam · No obligation · Reply within 24 hours</p>
              </>
            )}
          </div>
        </div>
      </div>

      <FAQBlock />
    </div>
  );
}

/* ──────────────────── ROOT ──────────────────── */
export default function App() {
  const [page, setPage] = useState("Home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const render = () => {
    switch (page) {
      case "Home":         return <HomePage setPage={setPage} />;
      case "Services":     return <ServicesPage setPage={setPage} />;
      case "Portfolio":    return <PortfolioPage setPage={setPage} />;
      case "Testimonials": return <TestimonialsPage setPage={setPage} />;
      case "Contact":      return <ContactPage />;
      default:             return <HomePage setPage={setPage} />;
    }
  };

  return (
    <>
      <style>{CSS}</style>
      <Cursor />
      <Navbar page={page} setPage={setPage} />
      <main>{render()}</main>
      <Footer setPage={setPage} />
      <WAFloat />
    </>
  );
}
