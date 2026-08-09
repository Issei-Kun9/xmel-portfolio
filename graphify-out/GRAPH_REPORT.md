# Graph Report - my-portfolio  (2026-08-09)

## Corpus Check
- 51 files · ~28,682 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 310 nodes · 302 edges · 40 communities (22 shown, 18 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `0d1f6a51`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- dependencies
- layout.tsx
- components.json
- compilerOptions
- devDependencies
- app/page.tsx
- [slug]/page.tsx
- include
- calculator-client.tsx
- skiper40.tsx
- gtag.d.ts
- route.ts
- system.tsx
- faq.tsx
- hero.tsx
- problem.tsx
- results-banner.tsx
- next.config.ts
- about.tsx
- thank-you/page.tsx
- nav.tsx
- process.tsx
- stats.tsx
- tech-stack.tsx
- trust-badges.tsx
- eslint.config.mjs
- postcss.config.mjs
- reel1.sh
- projects.tsx
- testimonials.tsx
- n8n-workflow-automation-guide.mdx
- voice-ai-agent-vs-human-isa.mdx
- ai-lead-response-real-estate.mdx
- Reel 2 — "47 seconds vs 47 hours"
- My Portfolio

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `cn()` - 8 edges
3. `include` - 7 edges
4. `aliases` - 6 edges
5. `Architecture Overview` - 6 edges
6. `Reel 2 — "47 seconds vs 47 hours"` - 6 edges
7. `tailwind` - 5 edges
8. `scripts` - 5 edges
9. `CalculatorClient()` - 5 edges
10. `MailtoLink()` - 5 edges

## Surprising Connections (you probably didn't know these)
- `generateStaticParams()` --calls--> `getAllPosts()`  [EXTRACTED]
  src/app/blog/[slug]/page.tsx → src/lib/blog.ts
- `BlogIndex()` --calls--> `getAllPosts()`  [EXTRACTED]
  src/app/blog/page.tsx → src/lib/blog.ts
- `Link000()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/skiper-ui/skiper40.tsx → src/lib/utils.ts
- `Link001()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/skiper-ui/skiper40.tsx → src/lib/utils.ts
- `Link002()` --calls--> `cn()`  [EXTRACTED]
  src/components/ui/skiper-ui/skiper40.tsx → src/lib/utils.ts

## Import Cycles
- None detected.

## Communities (40 total, 18 thin omitted)

### Community 0 - "dependencies"
Cohesion: 0.05
Nodes (37): class-variance-authority, clsx, framer-motion, gray-matter, lucide-react, next, next-mdx-remote, dependencies (+29 more)

### Community 1 - "layout.tsx"
Cohesion: 0.13
Nodes (12): inter, jetbrainsMono, metadata, spaceGrotesk, CursorWrapper(), CustomCursor, FloatingContact(), graph (+4 more)

### Community 2 - "components.json"
Cohesion: 0.11
Nodes (18): aliases, components, hooks, lib, ui, utils, iconLibrary, registries (+10 more)

### Community 3 - "compilerOptions"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 4 - "devDependencies"
Cohesion: 0.08
Nodes (25): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/node (+17 more)

### Community 5 - "app/page.tsx"
Cohesion: 0.11
Nodes (16): About, Booking, Contact, Faq, Footer, Guarantee, Hero, Nav (+8 more)

### Community 6 - "[slug]/page.tsx"
Cohesion: 0.24
Nodes (10): BlogIndex(), metadata, BlogPost(), generateMetadata(), generateStaticParams(), Props, BlogPost, getAllPosts() (+2 more)

### Community 7 - "include"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 8 - "calculator-client.tsx"
Cohesion: 0.16
Nodes (9): CalculatorClient(), DISPOSABLE_DOMAINS, formatCurrency(), formatCurrencyFull(), isValidEmail(), metadata, SubmitState, MailtoLink() (+1 more)

### Community 9 - "skiper40.tsx"
Cohesion: 0.36
Nodes (7): Link000(), Link001(), Link002(), Link003(), Link004(), Link005(), cn()

### Community 11 - "route.ts"
Cohesion: 0.33
Nodes (4): TODO: Trigger email sequence (Email 1: immediate recap — send within 60s), TODO: Schedule Email 2 (case study) for day 2, TODO: Schedule Email 3 (soft CTA) for day 4-5, RoiCapturePayload

### Community 12 - "system.tsx"
Cohesion: 0.33
Nodes (3): archEdges, archNodes, verticals

### Community 35 - "n8n-workflow-automation-guide.mdx"
Cohesion: 0.17
Nodes (11): 1. Webhook Layer (7 nodes), 2. AI Qualification Layer (12 nodes), 3. Outreach Layer (24 nodes), 4. Data Layer (14 nodes), 5. Monitoring Layer (10 nodes), Architecture Overview, Deploying Your Own n8n System, Error Handling and Edge Cases (+3 more)

### Community 36 - "voice-ai-agent-vs-human-isa.mdx"
Cohesion: 0.17
Nodes (11): Availability, Cost Comparison, Getting Started, Head-to-Head Comparison, Qualification Accuracy, Real-World Results, Response Speed, The AI Voice Agent Alternative (+3 more)

### Community 37 - "ai-lead-response-real-estate.mdx"
Cohesion: 0.20
Nodes (9): Getting Started with AI Lead Response, How the AI Lead Response System Works, Results: Real Numbers from Real Deployments, Step 1: Lead Capture (Instant), Step 2: AI Qualification (3-5 seconds), Step 3: Automated Response (Under 50 seconds total), Step 4: CRM Sync & Notifications, The Technology Stack (+1 more)

### Community 38 - "Reel 2 — "47 seconds vs 47 hours""
Cohesion: 0.29
Nodes (6): CTA (32–38 sec), HOOK (0–3 sec), PRODUCTION NOTES, PUNCHLINE (25–32 sec), Reel 2 — "47 seconds vs 47 hours", SPLIT SCREEN (3–25 sec)

### Community 39 - "My Portfolio"
Cohesion: 0.40
Nodes (4): Add more Skiper UI components, Dev, My Portfolio, Setup

## Knowledge Gaps
- **160 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+155 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `dependencies` to `devDependencies`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `compilerOptions` to `include`?**
  _High betweenness centrality (0.007) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _160 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.05405405405405406 - nodes in this community are weakly interconnected._
- **Should `layout.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13450292397660818 - nodes in this community are weakly interconnected._
- **Should `components.json` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._
- **Should `compilerOptions` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._