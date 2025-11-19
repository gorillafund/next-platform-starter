export const presentationConfig = {
  title: "Set Up Your Investment Platform with Valuya",
  subtitle:
    "From vision to live, regulated on-chain investment platform in a few guided steps.",
  company: {
    name: "Valuya",
    address: "Alte Ziegelei 18",
    city: "67346 Speyer",
    email: "jakob@valuya.net",
  },
};

export const slides = [
  {
    id: "cover",
    title: "Design Your On-Chain Investment Platform",
    type: "cover",
    content:
      "This walkthrough shows how an asset manager can configure a fully regulated investment platform with Valuya – choosing providers, products, and workflows in a few simple steps.",
  },

  // 1 – Intro to the setup flow
  {
    id: "intro-process",
    title: "How the Setup Works",
    type: "text",
    content:
      "In the future, launching an investment platform with Valuya will feel like configuring SaaS – not running a multi-year IT and legal project.",
    bullets: [
      "Guided wizard: 10–15 minutes to define your platform setup.",
      "Configurable modules for custody, payments, KYC, blockchain networks, and products.",
      "Valuya handles technical orchestration, compliance rails, and integrations in the background.",
    ],
  },

  // 2 – Business profile
  {
    id: "business-profile",
    title: "Step 1: Your Business Profile",
    type: "text",
    content:
      "We start by understanding your regulatory and business context.",
    bullets: [
      "What type of entity are you? (Asset manager, bank, wealth manager, fintech, family office)",
      "In which jurisdictions do you operate today and where do you plan to distribute products?",
      "Which licenses do you already hold (if any)? (e.g. MiFID firm, tied agent, AIFM, none)",
    ],
  },

  // 3 – Target investors & regions
  {
    id: "target-investors",
    title: "Step 2: Target Investors & Markets",
    type: "text",
    content:
      "Next, you define who your platform is built for – this drives KYC, suitability and product design.",
    bullets: [
      "Who are your primary target clients? (Retail, semi-professional, professional, institutional)",
      "Which regions do you want to serve at launch? (e.g. Germany, DACH, EU-wide)",
      "Do you plan to run your own advisory / distribution or work via third-party distributors?",
    ],
  },

  // 4 – Product and strategy types
  {
    id: "product-design",
    title: "Step 3: Products & Strategies",
    type: "text",
    content:
      "Select the investment products you want to offer on your platform.",
    bullets: [
      "What do you want to launch first? (Single-strategy certificates, multi-strategy portfolios, model portfolios, savings plans)",
      "Which underlying asset types do you want to support? (Crypto, DeFi yields, tokenized RWAs, stablecoins, mixed portfolios)",
      "Will strategies be managed only by your in-house team, or also by external portfolio managers?",
    ],
  },

  // 5 – Asset universe & chains
  {
    id: "asset-universe",
    title: "Step 4: Asset Universe & Networks",
    type: "text",
    content:
      "Define where your portfolios live on-chain and which assets you want access to.",
    bullets: [
      "Which base networks do you want to use? (e.g. Ethereum mainnet, Arbitrum, Polygon, others)",
      "Do you want to restrict yourself to blue-chip protocols and large-cap tokens, or include long-tail assets?",
      "Should we apply standard Valuya risk filters, or do you want to define your own whitelist/blacklist?",
    ],
  },

  // 6 – Crypto custody & trading provider
  {
    id: "crypto-provider",
    title: "Step 5: Crypto Custody & Trading",
    type: "text",
    content:
      "Choose how assets are held and traded behind the scenes.",
    bullets: [
      "Which custody model do you prefer? (Third-party institutional custodian, self-custody with managed keys, hybrid)",
      "Do you want to connect an existing crypto provider you already work with, or use Valuya’s default integrations?",
      "If you bring your own provider: which one? (e.g. Fireblocks, Copper, BitGo, other)",
      "Which trading venues and DEXs can be used for execution (pre-defined venue list + slippage and venue rules)?",
    ],
  },

  // 7 – Fiat / payments provider
  {
    id: "payments-provider",
    title: "Step 6: Fiat On-/Off-Ramp & Payments",
    type: "text",
    content:
      "Configure how investors move money in and out of your platform.",
    bullets: [
      "How should investors fund their investments? (SEPA/IBAN transfers, card payments, both)",
      "Which payment / on-ramp provider do you want to use? (e.g. Monerium, Circle, banking partner, other)",
      "Do you want fiat-only onboarding for end-clients (no direct crypto deposits), or also allow crypto deposits?",
      "How should redemptions be handled? (Bank payout only, stablecoin payout, both)",
    ],
  },

  // 8 – KYC / AML and onboarding
  {
    id: "kyc-aml",
    title: "Step 7: KYC, AML & Investor Onboarding",
    type: "text",
    content:
      "Investor onboarding is fully digital – you decide how strict and how fast it should be.",
    bullets: [
      "Which KYC provider do you want to connect? (Existing provider, Valuya default options, or both)",
      "Do you differentiate onboarding flows for retail vs. professional investors?",
      "Which risk level checks are mandatory? (Source of funds, enhanced due diligence, PEP, sanctions screening)",
      "Should suitability/appropriateness checks for each product be enforced in the front-end?",
    ],
  },

  // 9 – Compliance & legal configuration
  {
    id: "compliance-setup",
    title: "Step 8: Compliance & Legal Framework",
    type: "text",
    content:
      "Valuya comes with pre-configured legal templates – you decide how to apply them.",
    bullets: [
      "Which legal wrappers do you want to use initially? (Certificates, notes, tokenized funds, other)",
      "Do you want Valuya to provide the default documentation (e.g. PRIIPs KIDs, T&Cs) or plug in your own?",
      "How frequently should reporting be generated for regulators and institutional clients?",
      "Should certain strategies be restricted to specific investor categories by design?",
    ],
  },

  // 10 – Fee structure
  {
    id: "fees-revenue",
    title: "Step 9: Fee Structure & Revenue Model",
    type: "text",
    content:
      "Define how you earn money on the platform – and how this is displayed to the end-investor.",
    bullets: [
      "Which management and performance fees do you want to charge per product type?",
      "Do you want to share fees with external strategy managers / distributors? If yes, how is the split defined?",
      "Should the platform charge transaction fees (e.g. for subscriptions/redemptions) or only ongoing fees?",
      "How transparently sollen alle Gebühren im UI angezeigt werden? (aggregiert vs. detailliert)",
    ],
  },

  // 11 – Branding & white label
  {
    id: "branding",
    title: "Step 10: Branding & White-Label Options",
    type: "text",
    content:
      "Your platform should look and feel like your brand – not like infrastructure.",
    bullets: [
      "Under which brand should the platform run? (Your main brand, sub-brand, co-brand with Valuya)",
      "Which elements do you want to customize? (Logo, colors, typography, domain, onboarding texts)",
      "Do you need different branded instances for different regions or distribution partners?",
    ],
  },

  // 12 – Integrations & APIs
  {
    id: "integrations",
    title: "Step 11: Integrations & Data Connectivity",
    type: "text",
    content:
      "Connect Valuya to your existing infrastructure and reporting stack.",
    bullets: [
      "Do you need APIs for portfolio data, transactions, and positions into your existing PMS/OMS?",
      "Should we integrate with existing CRM or advisory tools for your salesforce?",
      "Do you require custom exports for custodians, auditors, or regulators?",
    ],
  },

  // 13 – Visual flow of the configured platform
  {
    id: "platform-flow-visual",
    title: "Your Configured Platform – High-Level Flow",
    type: "visual",
    content:
      "1) Investor → digital onboarding and KYC\n2) Payment provider → fiat to on-chain funds\n3) On-chain vaults & trading provider → portfolio management\n4) Legal wrapper → regulated security\n5) Reporting → you, your clients, and regulators.",
  },

  // 14 – Summary / confirmation
  {
    id: "summary",
    title: "Step 12: Summary & Go-Live Plan",
    type: "conclusion",
    content:
      "You’ve just configured your future investment platform with Valuya.\n\nIn practice, this setup wizard would generate a technical and legal configuration: providers, products, networks, compliance settings, and branding – ready for implementation.\n\nFrom here, Valuya’s team and infrastructure translate your configuration into a live, regulated, on-chain investment platform.",
  },
];
