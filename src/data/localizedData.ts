import { BlogPost, Project, Product, SupportedLanguage } from '../types';
import { BLOG_POSTS, PROJECTS, PRODUCTS } from './mockData';

// Localized variations for Blog Posts
export const BLOG_POSTS_LOCALIZED: Record<SupportedLanguage, BlogPost[]> = {
  vi: BLOG_POSTS,
  en: [
    {
      ...BLOG_POSTS[0],
      title: 'The Impact of AI on Global Financial Markets',
      category: 'Economics',
      date: 'Oct 15, 2024',
      excerpt: 'In-depth analysis of how artificial intelligence is reshaping investment strategies and risk management in the digital era.',
      content: `Artificial Intelligence (AI) and Machine Learning (ML) are restructuring the foundation of international financial markets. From high-frequency trading (HFT) driven by deep neural networks to sentiment analysis powered by Natural Language Processing (NLP), leading institutions leverage big data for unprecedented alpha.

### 1. Quantitative Automation & Risk Governance
Modern AI algorithms process millions of real-time market data points, spotting anomalies and auto-rebalancing portfolios within milliseconds.

### 2. Micro & Macroeconomic Forecasting
Synthesizing structured data with alternative datasets (satellite imagery, search volume, supply chain feeds) produces unparalleled accuracy in economic cycle predictions.

### 3. The Future of Fintech in Southeast Asia
The region is experiencing a surge in WealthTech and micro-investing platforms, bringing personalized wealth advisory to millions of retail investors.`,
      readTime: '6 min read',
    },
    {
      ...BLOG_POSTS[1],
      title: 'EdTech 2025: The Hyper-Personalization of Learning',
      category: 'Education',
      date: 'Oct 12, 2024',
      excerpt: 'Discover how modern education technology platforms leverage behavioral data to craft bespoke learning journeys for every student.',
      content: `The traditional "one size fits all" pedagogical model is rapidly yielding to adaptive learning ecosystems. Driven by behavioral analytics and conversational AI, personalized pathways meet students at their exact cognitive baseline.

### 1. Knowledge Graph Mapping
By dynamically mapping knowledge dependencies, systems identify exact conceptual gaps and adjust instructional pacing on the fly.

### 2. Multi-Sensory Engagement & Socratic AI
Learners gain 24/7 access to AI tutors trained on Socratic questioning methods, fostering critical thinking rather than spoon-feeding direct answers.

### 3. Continuous Mastery Over High-Stakes Exams
Granular daily interaction metrics replace periodic exam stress, offering a genuine, comprehensive view of learner mastery.`,
      readTime: '5 min read',
    },
    {
      ...BLOG_POSTS[2],
      title: 'Microservices Architecture in Enterprise Applications',
      category: 'Technology',
      date: 'Oct 08, 2024',
      excerpt: 'A practical playbook for transitioning from monolithic legacy systems to microservices for enhanced agility and horizontal scalability.',
      content: `In large-scale enterprise environments, maintaining a single codebase monolith frequently causes deployment friction. Migrating to microservices is both an architectural and organizational transformation.

### 1. Domain-Driven Design (DDD)
Establish clear Bounded Contexts across key domains: Authentication, Billing, Content Management, and Analytics.

### 2. Asynchronous Event-Driven Architecture
Adopt message brokers like Apache Kafka or RabbitMQ to ensure fault tolerance and decouple service dependencies.

### 3. Full-Stack Observability
Deploy distributed tracing, metrics, and centralized telemetry via OpenTelemetry and Prometheus to isolate anomalies in real-time.`,
      readTime: '8 min read',
    },
    {
      ...BLOG_POSTS[3],
      title: 'Circular Economy Models in the Modern Era',
      category: 'Economics',
      date: 'Oct 05, 2024',
      excerpt: 'Why the circular economy is not merely environmental responsibility, but a core strategy for long-term margin optimization.',
      content: `The circular economy is evolving from a CSR initiative into a cornerstone of financial resilience and supply chain security.

### 1. Transitioning to Product-as-a-Service (PaaS)
Retaining asset ownership incentivizes modular product design, remanufacturing, and prolonged lifecycle value capture.

### 2. Supply Chain Optimization with IoT & AI
Real-time material provenance tracking and predictive maintenance reduce virgin raw material dependency.

### 3. ESG Mandates & Capital Allocation
Global institutional funds increasingly prioritize investments with transparent, verifiable circular metrics.`,
      readTime: '6 min read',
    },
    {
      ...BLOG_POSTS[4],
      title: 'Digital Payments & FinTech Trends in Emerging Asia',
      category: 'Economics',
      date: 'Sep 28, 2024',
      excerpt: 'Assessing cashless adoption velocity, Open Banking frameworks, and regulatory sandbox initiatives across high-growth markets.',
      content: `Southeast Asia continues to lead global rates of cashless transaction growth and digital wallet proliferation. The next frontier lies in seamless cross-border QR interoperability and standardized Open Banking APIs.`,
      readTime: '4 min read',
    },
    {
      ...BLOG_POSTS[5],
      title: 'Building Scalable Multi-Platform Design Systems',
      category: 'Technology',
      date: 'Sep 20, 2024',
      excerpt: 'Methodologies for structuring design tokens, semantic color hierarchies, and unified component libraries across Web and Mobile.',
      content: `A unified design system eliminates redundant frontend engineering hours and enforces brand consistency across every digital customer touchpoint.`,
      readTime: '7 min read',
    },
  ],
  ja: [
    {
      ...BLOG_POSTS[0],
      title: 'グローバル金融市場におけるAIの変革と影響',
      category: '経済学',
      date: '2024年10月15日',
      excerpt: '人工知能がデジタル時代の投資戦略とリスク管理をどのように再定義しているかを徹底分析。',
      content: `人工知能（AI）と機械学習（ML）は、国際金融市場の基盤を根本から再構築しています。高頻度取引（HFT）から自然言語処理（NLP）による市場センチメント分析まで、大手金融機関はビッグデータを活用して圧倒的な優位性を獲得しています。`,
      readTime: '読了6分',
    },
    {
      ...BLOG_POSTS[1],
      title: 'EdTech 2025: 個別最適化された学習の新潮流',
      category: '教育',
      date: '2024年10月12日',
      excerpt: '教育テクノロジープラットフォームが行動データを活用して一人ひとりに合わせた学習体験を創造する手法。',
      content: `従来の画一的な教育モデルから、適応型学習（Adaptive Learning）エコシステムへの移行が急速に進んでいます。認知特性に合わせた最適な学習パスを提供します。`,
      readTime: '読了5分',
    },
    {
      ...BLOG_POSTS[2],
      title: 'エンタープライズ領域におけるマイクロサービスアーキテクチャ',
      category: 'テクノロジー',
      date: '2024年10月08日',
      excerpt: 'モノリスからマイクロサービスへの移行によるスケーラビリティと開発生産性の向上。',
      content: `大規模企業システムにおいて、モノリスからの移行は技術的・組織的な戦略的決断です。DDDとイベント駆動アーキテクチャの導入が鍵を握ります。`,
      readTime: '読了8分',
    },
    {
      ...BLOG_POSTS[3],
      title: '新時代における循環型経済（サーキュラーエコノミー）モデル',
      category: '経済学',
      date: '2024年10月05日',
      excerpt: '循環型経済が単なる環境対策ではなく、長期的な利益率向上のための戦略である理由。',
      content: `PaaS（Product-as-a-Service）やIoTによる資産ライフサイクル管理が、持続可能な収益モデルを創出します。`,
      readTime: '読了6分',
    },
    {
      ...BLOG_POSTS[4],
      title: 'アジアにおけるデジタル決済とフィンテックの進化',
      category: '経済学',
      date: '2024年09月28日',
      excerpt: 'キャッシュレス普及、オープンバンキング、国境を越えたQRコード決済の展望。',
      content: `東南アジアを中心に、モバイルウォレットと即時決済インフラが急速に統合されています。`,
      readTime: '読了4分',
    },
    {
      ...BLOG_POSTS[5],
      title: 'クロスプラットフォーム対応デザインシステムの構築手法',
      category: 'テクノロジー',
      date: '2024年09月20日',
      excerpt: 'デザイントークン設計、アクセシビリティ標準、コンポーネントライブラリの統一。',
      content: `Webとモバイルで一貫したブランド体験と開発効率化を実現するデザインシステムの設計原則。`,
      readTime: '読了7分',
    },
  ],
  zh: [
    {
      ...BLOG_POSTS[0],
      title: '人工智能对全球金融市场的深远影响',
      category: '经济学',
      date: '2024年10月15日',
      excerpt: '深度解析人工智能如何重塑数字化时代的投资策略与量化风险管理。',
      content: `人工智能与机器学习正在重塑国际金融市场的基石。从高频交易（HFT）到自然语言处理（NLP）的情绪分析，顶级金融机构正通过大数据驱动获得前所未有的竞争优势。`,
      readTime: '阅读 6 分钟',
    },
    {
      ...BLOG_POSTS[1],
      title: '教育科技 2025：个性化自适应学习新范式',
      category: '教育',
      date: '2024年10月12日',
      excerpt: '探索现代教育平台如何借助行为数据与AI为每位学习者打造独一无二的学习路径。',
      content: `传统的“一刀切”教学模式正在被自适应学习生态系统取代。通过知识图谱与苏格拉底式AI助教，激发学习者的深度思考能力。`,
      readTime: '阅读 5 分钟',
    },
    {
      ...BLOG_POSTS[2],
      title: '企业级应用中的微服务架构演进实践',
      category: '科技',
      date: '2024年10月08日',
      excerpt: '从单体架构（Monolith）平滑迁移至微服务的实战指南，提升系统扩展性与交付效率。',
      content: `在大型企业环境中，采用领域驱动设计（DDD）与事件驱动架构（EDA），实现系统解耦与高弹性容错。`,
      readTime: '阅读 8 分钟',
    },
    {
      ...BLOG_POSTS[3],
      title: '新经济背景下的循环经济商业模式',
      category: '经济学',
      date: '2024年10月05日',
      excerpt: '为什么循环经济不仅是社会责任，更是企业实现长期利润最大化的核心战略。',
      content: `通过产品即服务（PaaS）与物联网技术，实现资产全生命周期追踪与高价值物料闭环。`,
      readTime: '阅读 6 分钟',
    },
    {
      ...BLOG_POSTS[4],
      title: '数字化支付与亚洲金融科技前沿趋势',
      category: '经济学',
      date: '2024年09月28日',
      excerpt: '评估无现金生态、开放银行体系（Open Banking）及跨境支付互联的广阔前景。',
      content: `移动钱包普及与标准化API推动区域金融包容性迈入全新发展阶段。`,
      readTime: '阅读 4 分钟',
    },
    {
      ...BLOG_POSTS[5],
      title: '构建跨平台标准化设计系统（Design System）',
      category: '科技',
      date: '2024年09月20日',
      excerpt: '设计令牌（Tokens）、语义色彩分级与组件库在多端环境下的统一工程化落地。',
      content: `一套完善的设计系统能节省上百小时前端开发时间，并在所有数字触点确保体验一致性。`,
      readTime: '阅读 7 分钟',
    },
  ],
  fr: [
    {
      ...BLOG_POSTS[0],
      title: 'L\'Impact de l\'IA sur les Marchés Financiers Mondiaux',
      category: 'Économie',
      date: '15 Oct. 2024',
      excerpt: 'Analyse approfondie de la façon dont l\'intelligence artificielle redéfinit les stratégies d\'investissement.',
      content: `L'intelligence artificielle transforme en profondeur la finance quantitative, du trading haute fréquence à l'analyse prédictive des cycles économiques.`,
      readTime: '6 min de lecture',
    },
    {
      ...BLOG_POSTS[1],
      title: 'EdTech 2025 : L\'Ère de l\'Apprentissage Hyper-Personnalisé',
      category: 'Éducation',
      date: '12 Oct. 2024',
      excerpt: 'Comment les technologies éducatives adaptent les parcours d\'apprentissage grâce aux données comportementales.',
      content: `L'approche pédagogique adaptative remplace les modèles standardisés pour maximiser la rétention et l'engagement des apprenants.`,
      readTime: '5 min de lecture',
    },
    {
      ...BLOG_POSTS[2],
      title: 'Architecture Microservices pour Applications d\'Entreprise',
      category: 'Technologie',
      date: '08 Oct. 2024',
      excerpt: 'Guide pratique pour migrer d\'un monolithe vers des microservices scalables et résilients.',
      content: `Adopter le Domain-Driven Design et les architectures orientées événements pour accélérer les cycles de livraison logicielle.`,
      readTime: '8 min de lecture',
    },
    {
      ...BLOG_POSTS[3],
      title: 'Modèles d\'Économie Circulaire dans le Nouveau Contexte Économique',
      category: 'Économie',
      date: '05 Oct. 2024',
      excerpt: 'Pourquoi l\'économie circulaire constitue un levier stratégique de rentabilité durable.',
      content: `Le passage au modèle Produit-en-tant-que-Service (PaaS) allonge le cycle de vie des actifs et optimise la rentabilité globale.`,
      readTime: '6 min de lecture',
    },
    {
      ...BLOG_POSTS[4],
      title: 'Paiements Numériques et Fintech en Asie Émergente',
      category: 'Économie',
      date: '28 Sept. 2024',
      excerpt: 'Perspectives sur le paiement sans contact, l\'Open Banking et l\'interopérabilité des QR codes.',
      content: `L'accélération des transactions mobiles ouvre la voie à une inclusion financière sans précédent.`,
      readTime: '4 min de lecture',
    },
    {
      ...BLOG_POSTS[5],
      title: 'Conception de Design Systems Scalables Multi-Plateformes',
      category: 'Technologie',
      date: '20 Sept. 2024',
      excerpt: 'Méthodologie pour structurer des Design Tokens et des composants réutilisables.',
      content: `Un design system cohérent réduit considérablement le temps de développement et renforce l'identité visuelle de marque.`,
      readTime: '7 min de lecture',
    },
  ],
  de: [
    {
      ...BLOG_POSTS[0],
      title: 'Der Einfluss von KI auf die globalen Finanzmärkte',
      category: 'Wirtschaft',
      date: '15. Okt. 2024',
      excerpt: 'Tiefgehende Analyse zur Neugestaltung von Anlagestrategien und quantitativem Risikomanagement.',
      content: `Künstliche Intelligenz und maschinelles Lernen restrukturieren die globalen Finanzmärkte nachhaltig – von Hochfrequenzhandelsmodellen bis zur Marktstimmungsanalyse.`,
      readTime: '6 Min. Lesezeit',
    },
    {
      ...BLOG_POSTS[1],
      title: 'EdTech 2025: Hyperpersonalisierte Lernpfade',
      category: 'Bildung',
      date: '12. Okt. 2024',
      excerpt: 'Wie moderne Bildungsplattformen durch Verhaltensdaten individuelle Lernerfolge ermöglichen.',
      content: `Adaptive Lernsysteme ersetzen starre Lehrpläne und passen Inhalte kontinuierlich an das individuelle Lerntempo an.`,
      readTime: '5 Min. Lesezeit',
    },
    {
      ...BLOG_POSTS[2],
      title: 'Microservices-Architektur in Unternehmensanwendungen',
      category: 'Technologie',
      date: '08. Okt. 2024',
      excerpt: 'Praxisleitfaden für die Migration von monolithischen Systemen zu skalierbaren Microservices.',
      content: `Domain-Driven Design und ereignisgesteuerte Architekturen schaffen Ausfallsicherheit und beschleunigen Release-Zyklen.`,
      readTime: '8 Min. Lesezeit',
    },
    {
      ...BLOG_POSTS[3],
      title: 'Kreislaufwirtschaftsmodelle im modernen Zeitalter',
      category: 'Wirtschaft',
      date: '05. Okt. 2024',
      excerpt: 'Warum Kreislaufwirtschaft eine Kernstrategie für nachhaltige Margenoptimierung ist.',
      content: `Product-as-a-Service und IoT-basiertes Lifecycle-Management schaffen langfristige wirtschaftliche Wettbewerbsvorteile.`,
      readTime: '6 Min. Lesezeit',
    },
    {
      ...BLOG_POSTS[4],
      title: 'Digitale Bezahlsysteme und FinTech-Trends in Asien',
      category: 'Wirtschaft',
      date: '28. Sept. 2024',
      excerpt: 'Entwicklung von bargeldlosen Transaktionen, Open Banking und grenzüberschreitenden QR-Zahlungen.',
      content: `Mobile Wallets und standardisierte Schnittstellen treiben die finanzielle Inklusion massiv voran.`,
      readTime: '4 Min. Lesezeit',
    },
    {
      ...BLOG_POSTS[5],
      title: 'Entwicklung skalierbarer Multi-Plattform Design-Systeme',
      category: 'Technologie',
      date: '20. Sept. 2024',
      excerpt: 'Strukturierung von Design Tokens, Farbsemantik und Komponentenbibliotheken.',
      content: `Ein einheitliches Design-System spart hunderte Entwicklungsstunden und sichert konsistente Markenerlebnisse.`,
      readTime: '7 Min. Lesezeit',
    },
  ],
};

// Localized projects mapping
export const PROJECTS_LOCALIZED: Record<SupportedLanguage, Project[]> = {
  vi: PROJECTS,
  en: PROJECTS.map((p) => ({
    ...p,
    title: p.id === 'smart-health-kiosk-hdbank'
      ? 'National Healthcare Digital Transformation: Smart Healthcare Kiosks & Citizen Experience'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Education Digital Transformation: Advancing Educational Management & Cashless Digital Payments'
      : p.id === 'qualcomm-top-ai-solutions'
      ? 'Nha Trang Hitech enters Qualcomm Challenges 2026 Finals with Ontrak Chainflow Ecosystem'
      : p.id === 'techcombank-advisors-network'
      ? 'TCA: Nationwide Distribution Network Across 63 Provinces & Hundreds of Claim Support Centers'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'Establishment & Advisory for H2Y Platform in Vietnam (Initial Phase)'
      : p.title,
    badge: p.id === 'smart-health-kiosk-hdbank'
      ? 'National Digital Transformation | Scheme 06'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Education Digital Transformation'
      : p.id === 'qualcomm-top-ai-solutions'
      ? 'Qualcomm Finals 2026'
      : p.id === 'techcombank-advisors-network'
      ? '63 Provinces Network'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'H2Y Platform Advisory'
      : p.badge,
    excerpt: p.id === 'smart-health-kiosk-hdbank'
      ? 'Participated in National Digital Transformation: Deployed 1,001+ Smart Healthcare Kiosks nationwide to elevate citizen healthcare experience. Featured on the Government Portal (BaoChinhPhu.vn).'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Deploying education digital transformation solutions, integrating campus digital financial ecosystems (Edupay / Smart Campus), and enabling cashless tuition transactions. Featured in Dong Nai Newspaper.'
      : p.id === 'qualcomm-top-ai-solutions'
      ? 'Nha Trang Hitech advanced to the Finals of the global Qualcomm Vietnam Innovation Challenge 2026 with the Ontrak Chainflow high-tech ecosystem.'
      : p.id === 'techcombank-advisors-network'
      ? 'Built and scaled a nationwide financial network across 63 provinces with nearly 100 representative offices and hundreds of claim support centers.'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'Strategic consulting and foundational architecture for H2Y platform in Vietnam during initial phase, bridging supply chains and Beauty Inside You exhibition.'
      : p.excerpt,
    description: p.id === 'smart-health-kiosk-hdbank'
      ? 'National Digital Transformation Flagship: Participated in PMO leadership and regional business development to deploy 1,001+ Smart Healthcare Kiosks nationwide under Government Scheme 06. Empowering citizens with biometric Citizen ID check-in, reducing queue times by 70%+, and integrating seamless cashless hospital fee payments.'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Education Digital Transformation Initiative: Strategic integration of campus financial ecosystems (Edupay / Smart Campus) across schools and institutions. Digitizing education management workflows, standardizing electronic transactions, and securing 100% cashless digital tuition fee payments.'
      : p.id === 'qualcomm-top-ai-solutions'
      ? 'Global tech innovation milestone: Nha Trang Hitech advanced to the Finals of Qualcomm Vietnam Innovation Challenge 2026 (QVIC) with the Ontrak Chainflow ecosystem, pioneering edge AI, IoT, and industrial workflow automation.'
      : p.id === 'techcombank-advisors-network'
      ? 'Nationwide financial agency and customer protection milestone at TCA: Scaled distribution networks across all 63 provinces and cities with nearly 100 official representative offices. Deployed hundreds of customer claim support centers to protect policyholder rights and deliver transparent financial services. Partnered with institutional giants like PVI Insurance.'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'Ecosystem creation & platform advisory: Established and advised the foundational setup of H2Y platform in Vietnam. Structured omnichannel distribution models, integrated beauty-tech supply chains, and supported large-scale experiential events including Beauty Inside You 2023. Featured in Tien Phong Newspaper.'
      : p.id === 'edumetrics-platform'
      ? 'A comprehensive data visualization tool designed for academic institutions to track student performance and curriculum efficacy in real time.'
      : p.id === 'econlearn-mobile'
      ? 'Interactive mobile micro-learning modules for macroeconomics, optimized for on-the-go professionals with 5-minute lessons.'
      : p.description,
  })),
  ja: PROJECTS.map((p) => ({
    ...p,
    title: p.id === 'smart-health-kiosk-hdbank'
      ? '国家医療DXプロジェクト：スマート医療キオスクと市民体験の革新'
      : p.id === 'smart-edu-digital-transformation'
      ? '教育DXプロジェクト：教育管理のデジタル化とキャッシュレス決済推進'
      : p.id === 'techcombank-advisors-network'
      ? 'TCA全国ネットワーク実績：全国63省市・約100代表事務所と数百の損害賠償支援センター'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'ベトナムにおけるH2Yプラットフォーム初期構築・コンサルティング実績'
      : p.title,
    badge: p.id === 'smart-health-kiosk-hdbank'
      ? '国家DXプロジェクト | 計画06'
      : p.id === 'smart-edu-digital-transformation'
      ? '教育DX'
      : p.id === 'techcombank-advisors-network'
      ? '全国63省市ネットワーク'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'H2Yプラットフォーム'
      : p.badge === 'Web App' ? 'ウェブアプリ' : p.badge === 'Mobile App' ? 'モバイルアプリ' : p.badge,
    description: p.id === 'smart-health-kiosk-hdbank'
      ? '国家DX重点プロジェクト：全国1,001箇所以上のスマート医療キオスク展開（政府計画06）を推進。ICチップ付き市民ID生体認証による受付、待ち時間70％削減、完全キャッシュレス決済を実現。政府電子新聞（BaoChinhPhu.vn）に掲載。'
      : p.id === 'smart-edu-digital-transformation'
      ? '教育DX戦略プロジェクト：学内デジタル金融エコシステム（Edupay/スマートキャンパス）の統合導入。教育管理業務のデジタル化、電子決済取引の標準化、完全キャッシュレス授業料納付を実現。ドンナイ新聞に掲載。'
      : p.id === 'techcombank-advisors-network'
      ? 'TCAにおける事業拡大実績：全国63省市に広がる販売ネットワークと約100箇所の正規代表事務所を構築。さらに顧客の権利保護のため数百の損害賠償支援センターを展開。'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'ベトナムにおけるH2Yプラットフォーム初期構築・コンサルティング実績：オムニチャネル流通モデルの策定、美容テックサプライチェーンの統合、および「Beauty Inside You 2023」展示会の共同推進。ティエンフォン新聞（TienPhong.vn）に掲載。'
      : p.id === 'edumetrics-platform'
      ? '教育機関向けの包括的な学習データ可視化・分析プラットフォーム。リアルタイムで学修進捗を追跡します。'
      : p.id === 'econlearn-mobile'
      ? '多忙なビジネスパーソンのためのマクロ経済学マイクロラーニングアプリ。'
      : p.description,
  })),
  zh: PROJECTS.map((p) => ({
    ...p,
    title: p.id === 'smart-health-kiosk-hdbank'
      ? '国家医疗数字化转型项目：智慧医疗Kiosk与市民就医体验革新'
      : p.id === 'smart-edu-digital-transformation'
      ? '教育数字化转型项目：深化教育管理与全流程电子化无感缴费'
      : p.id === 'techcombank-advisors-network'
      ? 'TCA全国网络建设成果：覆盖63省市近百家代表处及数百家理赔支持中心'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? '越南初期H2Y平台建设与战略咨询成果'
      : p.title,
    badge: p.id === 'smart-health-kiosk-hdbank'
      ? '国家级数字化转型 | 06号方案'
      : p.id === 'smart-edu-digital-transformation'
      ? '教育数字化转型'
      : p.id === 'techcombank-advisors-network'
      ? '63省市金融网络'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'H2Y平台咨询'
      : p.badge === 'Web App' ? '网络应用' : p.badge === 'Mobile App' ? '移动应用' : p.badge,
    description: p.id === 'smart-health-kiosk-hdbank'
      ? '国家级数字化转型重点项目：参与全国1001+台智慧医疗Kiosk落地部署（政府06号方案），实现芯片公民身份证生物识别快速挂号、候诊时间缩短70%以上及无感无现金医疗缴费。获越南政府门户网官方报道。'
      : p.id === 'smart-edu-digital-transformation'
      ? '教育数字化转型战略项目：在各级学校落地部署智慧校园金融生态系统（Edupay / Smart Campus），推进教育管理活动数字化与电子交易标准化，全面普及无现金学费安全缴纳。获同奈报数字化转型专栏报道。'
      : p.id === 'techcombank-advisors-network'
      ? 'TCA全国网络建设成果：构建覆盖越南63省市的金融代理网络，设立近100家正式代表处，并部署数百家理赔协助中心，全方位保障客户合法权益。'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? '越南H2Y平台初期建设与咨询成果：规划全渠道分销模式，整合美妆高新科技供应链，协同推进Beauty Inside You 2023大型体验展。获越南先锋报官方报道。'
      : p.id === 'edumetrics-platform'
      ? '面向学术机构的综合教育数据分析与可视化平台，实时追踪学生表现与课程成效。'
      : p.id === 'econlearn-mobile'
      ? '专为忙碌专业人士打造的宏观经济学微学习移动应用，包含5分钟精炼课程与模拟。'
      : p.description,
  })),
  fr: PROJECTS.map((p) => ({
    ...p,
    title: p.id === 'smart-health-kiosk-hdbank'
      ? 'Transformation Numérique Nationale de la Santé : Kiosques Médicaux Intelligents & Expérience Citoyenne'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Transformation Numérique de l\'Éducation : Gestion Numérisée & Paiements Électroniques'
      : p.id === 'techcombank-advisors-network'
      ? 'Réseau National TCA : Déploiement dans 63 Provinces & Centres de Support d\'Indemnisation'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'Mise en place et Conseil pour la Plateforme H2Y au Vietnam (Phase Initiale)'
      : p.title,
    badge: p.id === 'smart-health-kiosk-hdbank'
      ? 'Transformation Numérique Nationale'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Transformation Numérique Éducative'
      : p.id === 'techcombank-advisors-network'
      ? 'Réseau 63 Provinces'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'Plateforme H2Y'
      : p.badge,
    description: p.id === 'smart-health-kiosk-hdbank'
      ? 'Projet national stratégique : Déploiement de plus de 1 001 kiosques médicaux intelligents, réduisant le temps d\'attente de 70% et intégrant le paiement sans contact. Publié sur le portail officiel du gouvernement.'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Projet éducatif stratégique : Intégration de l\'écosystème financier numérique (Edupay / Smart Campus) et transition vers 100% de paiements dématérialisés des frais scolaires.'
      : p.id === 'techcombank-advisors-network'
      ? 'Réalisation stratégique TCA : Développement d\'un réseau national dans 63 provinces avec près de 100 bureaux officiels et des centaines de centres de soutien aux sinistres.'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'Conseil et création d\'écosystème : Établissement de la plateforme H2Y au Vietnam, structuration de la distribution omnicanale, intégration de la chaîne d\'approvisionnement cosmétique et organisation de Beauty Inside You 2023.'
      : p.id === 'edumetrics-platform'
      ? 'Plateforme complète de visualisation et d\'analyse de données éducatives en temps réel pour établissements académiques.'
      : p.description,
  })),
  de: PROJECTS.map((p) => ({
    ...p,
    title: p.id === 'smart-health-kiosk-hdbank'
      ? 'Nationale Digitale Transformation im Gesundheitswesen: Intelligente Kioske & Bürgererlebnis'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Digitale Transformation im Bildungswesen: Digitalisiertes Management & Bargeldloses Bezahlen'
      : p.id === 'techcombank-advisors-network'
      ? 'TCA Bundesweites Netzwerk: 63 Provinzen & Schadensunterstützungszentren'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'Aufbau und Beratung der H2Y-Plattform in Vietnam (Frühphase)'
      : p.title,
    badge: p.id === 'smart-health-kiosk-hdbank'
      ? 'Nationale Digitale Transformation'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Digitale Bildungstransformation'
      : p.id === 'techcombank-advisors-network'
      ? 'Netzwerk in 63 Provinzen'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'H2Y Plattform-Beratung'
      : p.badge,
    description: p.id === 'smart-health-kiosk-hdbank'
      ? 'Nationales Schlüsselprojekt: Bereitstellung von 1.001+ intelligenten Gesundheitskiosken, 70% Wartezeitverkürzung und bargeldlose Bezahlung. Vom offiziellen Regierungsportal berichtet.'
      : p.id === 'smart-edu-digital-transformation'
      ? 'Strategisches Bildungsprojekt: Integration des digitalen Finanzökosystems (Edupay / Smart Campus) für Schulen und 100% bargeldlose Studiengebührenabrechnung.'
      : p.id === 'techcombank-advisors-network'
      ? 'Meilenstein bei TCA: Aufbau eines landesweiten Vertriebsnetzes in 63 Provinzen mit fast 100 offiziellen Repräsentanzen und Hunderten von Schadensregulierungszentren.'
      : p.id === 'h2y-vietnam-platform-advisory'
      ? 'Ökosystemaufbau & Plattformberatung: Etablierung der H2Y-Plattform in Vietnam, Strukturierung von Omnichannel-Vertriebsmodellen, Beauty-Tech-Lieferketten und Mitwirkung an der Messe Beauty Inside You 2023.'
      : p.id === 'edumetrics-platform'
      ? 'Umfassende Datenvisualisierungsplattform für Bildungsinstitute zur Echtzeitanalyse von Lernerfolgen.'
      : p.description,
  })),
};

// Localized products mapping
export const PRODUCTS_LOCALIZED: Record<SupportedLanguage, Product[]> = {
  vi: PRODUCTS,
  en: PRODUCTS.map((prod) => ({
    ...prod,
    category: prod.category === 'Công cụ số' ? 'Digital Tools' : prod.category === 'Khóa học' ? 'Courses' : prod.category === 'Tư vấn' ? 'Consulting' : 'Books',
    title: prod.id === 'sme-growth-strategy-consulting'
      ? 'Strategic Advisory & Operational Optimization Package (SME)'
      : prod.id === 'ai-foundations-prompt-design'
      ? 'AI Foundations & Prompt Design Corporate Training'
      : prod.id === 'custom-ai-agents-workshop'
      ? 'Custom AI Agents Workshop for Manufacturing & Finance'
      : prod.id === 'quantitative-finance-framework'
      ? 'Quantitative Finance & Econometrics Framework (Excel & Python)'
      : prod.id === 'bancassurance-distribution-playbook'
      ? 'Bancassurance & Territory Distribution Network Playbook'
      : prod.id === 'edtech-ecosystem-digital-handbook'
      ? 'EdTech Digital Transformation & Smart Learning Handbook'
      : prod.id === 'xuat-nhap-khau-thuc-chien-40'
      ? 'Ebook: Practical Import-Export & Global Trade 4.0'
      : 'Textbook: Investment Following International Standards (2026)',
    description: prod.id === 'sme-growth-strategy-consulting'
      ? '1-on-1 strategic advisory on business planning, operational workflow optimization, and financial structuring.'
      : prod.id === 'ai-foundations-prompt-design'
      ? 'Corporate training program boosting organization productivity by 3x - 5x using Generative AI and advanced prompt engineering.'
      : prod.id === 'custom-ai-agents-workshop'
      ? 'Specialized technical workshop for building custom AI agents automating manufacturing pipelines and risk analytics.'
      : prod.id === 'quantitative-finance-framework'
      ? 'Comprehensive quantitative modeling toolkit for macroeconomic forecasting, risk simulation, and business intelligence.'
      : prod.id === 'bancassurance-distribution-playbook'
      ? 'Practical management handbook based on scaling 40+ representative offices and 300+ financial agency hubs.'
      : prod.id === 'edtech-ecosystem-digital-handbook'
      ? 'Comprehensive guide for educational digital transformation, adaptive learning systems, and institutional data governance.'
      : prod.id === 'xuat-nhap-khau-thuc-chien-40'
      ? 'Comprehensive practical handbook from Zero to professional system operations. Updated 2024–2026: Incoterms® 2020, EVFTA, Customs, Logistics, UCP 600 & Digital Trade AI.'
      : 'Investment Textbook Following International Standards (2026 Edition). For Finance-Banking students & professional investors. CFA, GIPS, Basel III, IFRS & ESG standards.',
  })),
  ja: PRODUCTS.map((prod) => ({
    ...prod,
    category: prod.category === 'Công cụ số' ? 'デジタルツール' : prod.category === 'Khóa học' ? 'オンライン講座' : prod.category === 'Tư vấn' ? 'コンサルティング' : '書籍',
  })),
  zh: PRODUCTS.map((prod) => ({
    ...prod,
    category: prod.category === 'Công cụ số' ? '数字工具' : prod.category === 'Khóa học' ? '专业课程' : prod.category === 'Tư vấn' ? '战略咨询' : '图书出版',
  })),
  fr: PRODUCTS.map((prod) => ({
    ...prod,
    category: prod.category === 'Công cụ số' ? 'Outils numériques' : prod.category === 'Khóa học' ? 'Formations' : prod.category === 'Tư vấn' ? 'Conseil' : 'Livres',
  })),
  de: PRODUCTS.map((prod) => ({
    ...prod,
    category: prod.category === 'Công cụ số' ? 'Digitale Tools' : prod.category === 'Khóa học' ? 'Kurse' : prod.category === 'Tư vấn' ? 'Beratung' : 'Bücher',
  })),
};
