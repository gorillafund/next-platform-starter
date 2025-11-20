export interface Question {
    id: string;
    title: string;
    description?: string;
    type: 'text' | 'select' | 'multi-select' | 'textarea' | 'radio';
    options?: string[];
    placeholder?: string;
    required?: boolean;
    category: string;
}
// test
export const setupQuestions: Question[] = [
    // Business Profile
    {
        id: 'entity-type',
        title: 'What type of entity are you?',
        description: 'This helps us understand your regulatory context',
        type: 'select',
        options: ['Asset Manager', 'Bank', 'Wealth Manager', 'Fintech', 'Family Office', 'Other'],
        required: true,
        category: 'Business Profile'
    },
    {
        id: 'jurisdictions',
        title: 'In which jurisdictions do you operate?',
        description: 'Select all that apply',
        type: 'multi-select',
        options: [
            'Germany',
            'Austria',
            'Switzerland',
            'United Kingdom',
            'France',
            'Netherlands',
            'Luxembourg',
            'Other EU countries',
            'United States',
            'Other'
        ],
        required: true,
        category: 'Business Profile'
    },
    {
        id: 'licenses',
        title: 'Which licenses do you currently hold?',
        description: 'Select all that apply (or "None" if you don\'t have any yet)',
        type: 'multi-select',
        options: [
            'MiFID Investment Firm',
            'Tied Agent',
            'AIFM (Alternative Investment Fund Manager)',
            'UCITS Manager',
            'Banking License',
            'Payment Institution License',
            'E-Money License',
            'None'
        ],
        required: true,
        category: 'Business Profile'
    },

    // Target Investors & Markets
    {
        id: 'target-clients',
        title: 'Who are your primary target clients?',
        description: 'Select all segments you plan to serve',
        type: 'multi-select',
        options: [
            'Retail Investors',
            'Semi-Professional Investors',
            'Professional Investors',
            'Institutional Investors',
            'Family Offices',
            'Corporate Treasury'
        ],
        required: true,
        category: 'Target Investors & Markets'
    },
    {
        id: 'target-regions',
        title: 'Which regions do you want to serve at launch?',
        description: 'This affects KYC and compliance requirements',
        type: 'multi-select',
        options: [
            'Germany only',
            'DACH (Germany, Austria, Switzerland)',
            'EU-wide',
            'EEA (EU + Iceland, Norway, Liechtenstein)',
            'UK',
            'Global'
        ],
        required: true,
        category: 'Target Investors & Markets'
    },
    {
        id: 'distribution-model',
        title: 'How do you plan to distribute your products?',
        type: 'radio',
        options: [
            'Own advisory and distribution only',
            'Via third-party distributors only',
            'Both own distribution and third-party partners'
        ],
        required: true,
        category: 'Target Investors & Markets'
    },

    // Products & Strategies
    {
        id: 'initial-products',
        title: 'What do you want to launch first?',
        description: 'Select all product types you plan to offer',
        type: 'multi-select',
        options: [
            'Single-strategy certificates',
            'Multi-strategy portfolios',
            'Model portfolios',
            'Savings plans / recurring investments',
            'Structured products',
            'Thematic investment products'
        ],
        required: true,
        category: 'Products & Strategies'
    },
    {
        id: 'asset-types',
        title: 'Which underlying asset types do you want to support?',
        description: 'Select all that apply',
        type: 'multi-select',
        options: [
            'Crypto (BTC, ETH, major tokens)',
            'DeFi yields and protocols',
            'Tokenized real-world assets (RWAs)',
            'Stablecoins',
            'Mixed crypto/traditional portfolios',
            'NFTs and digital collectibles'
        ],
        required: true,
        category: 'Products & Strategies'
    },
    {
        id: 'strategy-management',
        title: 'Who will manage the investment strategies?',
        type: 'radio',
        options: ['Only our in-house team', 'Only external portfolio managers', 'Both in-house and external managers'],
        required: true,
        category: 'Products & Strategies'
    },

    // Asset Universe & Networks
    {
        id: 'blockchain-networks',
        title: 'Which blockchain networks do you want to use?',
        description: 'Select all networks you want to support',
        type: 'multi-select',
        options: [
            'Ethereum Mainnet',
            'Arbitrum',
            'Polygon',
            'Optimism',
            'Base',
            'Binance Smart Chain',
            'Avalanche',
            'Solana',
            'Other'
        ],
        required: true,
        category: 'Asset Universe & Networks'
    },
    {
        id: 'asset-scope',
        title: 'What asset scope do you prefer?',
        type: 'radio',
        options: [
            'Blue-chip protocols and large-cap tokens only',
            'Mid-cap assets with established track record',
            'Include long-tail and emerging assets',
            'No restrictions - full market access'
        ],
        required: true,
        category: 'Asset Universe & Networks'
    },
    {
        id: 'risk-filters',
        title: 'Which risk filtering approach do you prefer?',
        type: 'radio',
        options: [
            'Use standard Valuya risk filters and whitelists',
            'I want to define my own whitelist/blacklist',
            'Combination of Valuya filters + custom additions'
        ],
        required: true,
        category: 'Asset Universe & Networks'
    },

    // Crypto Custody & Trading
    {
        id: 'custody-model',
        title: 'Which custody model do you prefer?',
        type: 'radio',
        options: [
            'Third-party institutional custodian (recommended)',
            'Self-custody with managed keys → (for professional-only setups)',
            'Hybrid custody model',
            'I already have a custody provider'
        ],
        required: true,
        category: 'Crypto Custody & Trading'
    },
    {
        id: 'custody-provider',
        title: 'Do you have an existing crypto provider to connect?',
        description: 'Enter provider name or select from common options',
        type: 'select',
        options: [
            'Use Valuya default integrations',
            'Tradevest',
            'Fireblocks',
            'Copper',
            'BitGo',
            'Anchorage Digital',
            'Coinbase Custody',
            'Other (specify in next step)'
        ],
        required: true,
        category: 'Crypto Custody & Trading'
    },
    {
        id: 'trading-preferences',
        title: 'What are your trading execution preferences?',
        description: 'We need to understand your liquidity and venue requirements',
        type: 'textarea',
        placeholder:
            'e.g., "CEX trading on Kraken/Coinbase/Tradevest, DEX execution via Valuya with max 0.5% slippage, no MEV-exposed venues"',
        required: false,
        category: 'Crypto Custody & Trading'
    },

    // Payments Provider
    {
        id: 'funding-methods',
        title: 'How should investors fund their investments?',
        description: 'Select all methods you want to offer',
        type: 'multi-select',
        options: [
            'SEPA bank transfers',
            'Credit/debit card payments',
            'Instant payments (SEPA Instant)',
            'Direct crypto deposits',
            'Stablecoin deposits'
        ],
        required: true,
        category: 'Fiat Payments & On-ramp'
    },
    {
        id: 'payment-provider',
        title: 'Which payment/on-ramp provider do you want to use?',
        type: 'select',
        options: [
            'Monerium (recommended for EU)',
            'Tradevest',
            'EURAU',
            'Circle',
            'Existing banking partner',
            'I want to integrate my own provider',
            'Not sure - recommend one'
        ],
        required: true,
        category: 'Fiat Payments & On-ramp'
    },
    {
        id: 'crypto-deposits',
        title: 'Should investors be able to deposit crypto directly?',
        type: 'radio',
        options: [
            'No - fiat onboarding only (simpler compliance)',
            'Yes - allow direct crypto deposits',
            'Yes, but only stablecoins'
        ],
        required: true,
        category: 'Fiat Payments & On-ramp'
    },
    {
        id: 'redemption-options',
        title: 'How should redemptions be handled?',
        description: 'Select all payout methods you want to offer',
        type: 'multi-select',
        options: [
            'Bank payout (SEPA)',
            'Stablecoin payout',
            'Crypto payout (native tokens)',
            'In-kind redemption (investor keeps the tokens)'
        ],
        required: true,
        category: 'Fiat Payments & On-ramp'
    },

    // KYC & AML
    {
        id: 'kyc-provider',
        title: 'Which KYC provider do you want to use?',
        type: 'select',
        options: [
            'Use Valuya default KYC solution',
            'I have an existing KYC provider to connect',
            'Both (Valuya default + my provider)',
            'Not decided yet'
        ],
        required: true,
        category: 'KYC, AML & Onboarding'
    },
    {
        id: 'onboarding-flows',
        title: 'Do you need different onboarding flows for different investor types?',
        type: 'radio',
        options: [
            'No - same flow for all investors',
            'Yes - differentiate retail vs. professional investors',
            'Yes - custom flows for each investor segment'
        ],
        required: true,
        category: 'KYC, AML & Onboarding'
    },
    {
        id: 'risk-checks',
        title: 'Which risk level checks should be mandatory?',
        description: 'Select all that apply',
        type: 'multi-select',
        options: [
            'Source of funds verification',
            'Enhanced due diligence (EDD)',
            'PEP (Politically Exposed Person) screening',
            'Sanctions screening',
            'Ongoing transaction monitoring',
            'Wealth verification'
        ],
        required: true,
        category: 'KYC, AML & Onboarding'
    },
    {
        id: 'suitability-checks',
        title: 'Should suitability/appropriateness checks be enforced?',
        type: 'radio',
        options: [
            'Yes - strict enforcement before every investment',
            'Yes - but allow experienced investors to opt out',
            'No - only disclosure/warnings',
            'Not sure - recommend based on my license'
        ],
        required: true,
        category: 'KYC, AML & Onboarding'
    },

    // Compliance & Legal
    {
        id: 'legal-wrappers',
        title: 'Which legal wrappers do you want to use?',
        description: 'Select all that apply',
        type: 'multi-select',
        options: [
            'Certificates (Tracker Certificates)',
            'Notes (Debt instruments)',
            'Tokenized funds',
            'Direct token ownership (no wrapper) → (Requires appropriate licensing – optional)',
            'Other structured products',
            'Not decided yet'
        ],
        required: true,
        category: 'Compliance & Legal'
    },
    {
        id: 'documentation',
        title: 'How do you want to handle legal documentation?',
        type: 'radio',
        options: [
            'Use Valuya default documentation (PRIIPs KIDs, T&Cs, etc.)',
            'I want to provide my own legal documentation',
            'Valuya templates with custom modifications'
        ],
        required: true,
        category: 'Compliance & Legal'
    },
    {
        id: 'reporting-frequency',
        title: 'How frequently should regulatory reporting be generated?',
        type: 'select',
        options: [
            'On-Demand',
            'Daily',
            'Weekly',
            'Monthly',
            'Quarterly',
            'As required by regulation only',
            'Custom schedule'
        ],
        required: true,
        category: 'Compliance & Legal'
    },
    {
        id: 'product-restrictions',
        title: 'Should certain strategies be restricted to specific investor categories?',
        type: 'radio',
        options: [
            'Yes - enforce investor categorization restrictions',
            'No - all products available to all investors (subject to suitability)',
            'Let me configure this per product'
        ],
        required: true,
        category: 'Compliance & Legal'
    },

    // Fee Structure
    {
        id: 'management-fees',
        title: 'What management fees do you want to charge?',
        description: 'Enter annual percentage (e.g., 1.5 for 1.5% p.a.)',
        type: 'text',
        placeholder: 'e.g., 1.5',
        required: true,
        category: 'Fee Structure & Revenue'
    },
    {
        id: 'performance-fees',
        title: 'Do you want to charge performance fees?',
        type: 'radio',
        options: [
            'No performance fees',
            'Yes - with high-water mark',
            'Yes - simple performance fee on gains',
            'Different per product type'
        ],
        required: true,
        category: 'Fee Structure & Revenue'
    },
    {
        id: 'fee-sharing',
        title: 'Do you want to share fees with external partners?',
        type: 'radio',
        options: [
            'No - all fees to our firm',
            'Yes - fee sharing with strategy managers',
            'Yes - fee sharing with distributors',
            'Yes - both strategy managers and distributors'
        ],
        required: true,
        category: 'Fee Structure & Revenue'
    },
    {
        id: 'transaction-fees',
        title: 'Should the platform charge transaction fees?',
        type: 'radio',
        options: [
            'No transaction fees - ongoing fees only',
            'Yes - subscription/redemption fees',
            'Yes - but waive for recurring investments',
            'Custom fee structure per product'
        ],
        required: true,
        category: 'Fee Structure & Revenue'
    },
    {
        id: 'fee-transparency',
        title: 'How should fees be displayed to investors?',
        type: 'radio',
        options: [
            'Aggregated total cost display (simple)',
            'Detailed breakdown of all fee components',
            'Aggregated with option to expand details'
        ],
        required: true,
        category: 'Fee Structure & Revenue'
    },

    // Branding
    {
        id: 'brand-name',
        title: 'Under which brand should the platform run?',
        type: 'text',
        placeholder: 'e.g., YourBrand Investment Platform',
        required: true,
        category: 'Branding & White-Label'
    },
    {
        id: 'brand-url',
        title: 'Enter your website URL to generate branding',
        description: 'We can extract colors, fonts, and design elements from your existing website',
        type: 'text',
        placeholder: 'e.g., https://yourcompany.com',
        required: false,
        category: 'Branding & White-Label'
    },
    {
        id: 'branding-elements',
        title: 'Which branding elements do you want to customize?',
        description: 'Select all you want to customize',
        type: 'multi-select',
        options: [
            'Logo',
            'Color scheme',
            'Typography',
            'Custom domain',
            'Onboarding texts and messaging',
            'Email templates',
            'Full design system'
        ],
        required: true,
        category: 'Branding & White-Label'
    },
    {
        id: 'branded-instances',
        title: 'Do you need different branded instances?',
        type: 'radio',
        options: [
            'No - single branded platform',
            'Yes - different brands for different regions',
            'Yes - white-label instances for distribution partners',
            'Yes - multiple brands and partners'
        ],
        required: true,
        category: 'Branding & White-Label'
    },

    // Integrations
    {
        id: 'api-requirements',
        title: 'Do you need API access for portfolio data?',
        type: 'radio',
        options: [
            'Yes - integrate with our PMS/OMS',
            'Yes - integrate with our reporting tools',
            'Yes - both PMS and reporting',
            'No - Valuya platform is sufficient'
        ],
        required: true,
        category: 'Integrations & APIs'
    },
    {
        id: 'crm-integration',
        title: 'Should we integrate with your CRM or advisory tools?',
        type: 'radio',
        options: ['Yes - specify CRM in next step', 'No - not needed', 'Maybe - discuss later'],
        required: true,
        category: 'Integrations & APIs'
    },
    {
        id: 'custom-exports',
        title: 'Do you require custom exports for specific parties?',
        description: 'e.g., custodians, auditors, regulators',
        type: 'multi-select',
        options: [
            'Custodian reporting',
            'Auditor packages',
            'Regulatory filings',
            'Tax reporting',
            'Custom investor statements',
            'Not needed'
        ],
        required: true,
        category: 'Integrations & APIs'
    },

    // Third-Party Services
    {
        id: 'analytics-tools',
        title: 'Which analytics and research tools would you like to integrate?',
        description: 'Select all third-party services you want to use',
        type: 'multi-select',
        options: ['CryptoMatter Analytics', 'Fountainhead Digital Analytics', 'None - use built-in analytics only'],
        required: true,
        category: 'Third-Party Services'
    },
    {
        id: 'ratings-providers',
        title: 'Which ratings and risk assessment providers do you want to integrate?',
        description: 'Select all that apply',
        type: 'multi-select',
        options: ['Particula Ratings', 'Bluechip Ratings', 'None - use internal risk assessment'],
        required: true,
        category: 'Third-Party Services'
    },
    {
        id: 'ai-strategy-copilot',
        title: 'Do you want to enable an AI Copilot for strategy design and monitoring?',
        description:
            'The AI Copilot can analyze portfolios, detect anomalies, propose rebalancing, and draft investment memos. Select all modules you want to activate.',
        type: 'multi-select',
        options: [
            'AI Rebalancing Assistant (suggests optimal weights in real-time)',
            'AI Market Intelligence Bot (summaries, alerts, and regime detection)',
            'AI Risk & Exposure Monitor (flags concentration and regulatory issues)',
            'AI Investment Memo Generator (drafts strategy updates automatically)',
            'Let me plugin my own AI trading engine',
            'None - no AI assistance needed'
        ],
        required: true,
        category: 'Strategy Automation'
    },

    {
        id: 'tax-tools',
        title: 'Do you want to integrate automated tax reporting tools?',
        type: 'radio',
        options: [
            'Yes - integrate Tax Tool for automated tax reporting',
            'No - manual tax reporting only',
            'Maybe - evaluate later'
        ],
        required: true,
        category: 'Third-Party Services'
    },
    {
        id: 'additional-integrations',
        title: 'Are there any other third-party services you need?',
        description: 'Describe any additional tools or integrations you require',
        type: 'textarea',
        placeholder:
            'e.g., "Bloomberg Terminal integration, custom ESG scoring provider, specific market data feeds..."',
        required: false,
        category: 'Third-Party Services'
    }
];

export const categories = [
    'Business Profile',
    'Target Investors & Markets',
    'Products & Strategies',
    'Asset Universe & Networks',
    'Crypto Custody & Trading',
    'Fiat Payments & On-ramp',
    'KYC, AML & Onboarding',
    'Compliance & Legal',
    'Fee Structure & Revenue',
    'Branding & White-Label',
    'Integrations & APIs',
    'Third-Party Services'
];
