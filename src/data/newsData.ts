import { NewsFlashItem } from '../types';

export interface NewsSourceInfo {
  id: string;
  name: string;
  category: 'vietnam' | 'global_economy' | 'tech';
  url: string;
  description: {
    vi: string;
    en: string;
  };
  badgeColor: string;
}

export const TRUSTED_NEWS_SOURCES: NewsSourceInfo[] = [
  {
    id: 'bloomberg',
    name: 'Bloomberg Economics',
    category: 'global_economy',
    url: 'https://www.bloomberg.com/economics',
    description: {
      vi: 'Thông tin thị trường tài chính và kinh tế vĩ mô quốc tế',
      en: 'Global macroeconomics and financial market intelligence',
    },
    badgeColor: 'bg-blue-600 text-white',
  },
  {
    id: 'reuters',
    name: 'Reuters Financial',
    category: 'global_economy',
    url: 'https://www.reuters.com/business',
    description: {
      vi: 'Hãng thông tấn tài chính và thương mại thế giới',
      en: 'World financial news and global commerce wire',
    },
    badgeColor: 'bg-amber-600 text-white',
  },
  {
    id: 'ft',
    name: 'Financial Times',
    category: 'global_economy',
    url: 'https://www.ft.com',
    description: {
      vi: 'Nhật báo kinh tế và quản trị chiến lược hàng đầu',
      en: 'Premier international business and finance daily',
    },
    badgeColor: 'bg-[#ff7755] text-white',
  },
  {
    id: 'techcrunch',
    name: 'TechCrunch',
    category: 'tech',
    url: 'https://techcrunch.com',
    description: {
      vi: 'Tin tức khởi nghiệp, công nghệ AI và vốn đầu tư mạo hiểm',
      en: 'Startup ecosystems, AI frontier, and venture capital',
    },
    badgeColor: 'bg-emerald-600 text-white',
  },
  {
    id: 'mit_review',
    name: 'MIT Tech Review',
    category: 'tech',
    url: 'https://www.technologyreview.com',
    description: {
      vi: 'Phân tích chiều sâu về các công nghệ đột phá',
      en: 'Deep-dive analytical briefings on emerging technologies',
    },
    badgeColor: 'bg-slate-800 text-white',
  },
  {
    id: 'baochinhphu',
    name: 'Báo Chính Phủ',
    category: 'vietnam',
    url: 'https://baochinhphu.vn',
    description: {
      vi: 'Cổng thông tin điện tử Chính phủ & Chính sách điều hành vĩ mô',
      en: 'Vietnam Government Portal & Macro Policy Guidelines',
    },
    badgeColor: 'bg-red-700 text-white',
  },
  {
    id: 'cafef',
    name: 'CafeF / Nhịp Sống Thị Trường',
    category: 'vietnam',
    url: 'https://cafef.vn',
    description: {
      vi: 'Dữ liệu doanh nghiệp, chứng khoán và tài chính Việt Nam',
      en: 'Vietnam enterprise, equity market, and business news',
    },
    badgeColor: 'bg-indigo-600 text-white',
  },
  {
    id: 'vnexpress',
    name: 'VnExpress Kinh Doanh',
    category: 'vietnam',
    url: 'https://vnexpress.net/kinh-doanh',
    description: {
      vi: 'Thời sự kinh tế, thương mại và đời sống doanh nghiệp',
      en: 'Comprehensive Vietnamese business and commerce news',
    },
    badgeColor: 'bg-purple-700 text-white',
  },
  {
    id: 'htv',
    name: 'Đài Truyền Hình HTV',
    category: 'vietnam',
    url: 'https://htv.vn',
    description: {
      vi: 'Đài Phát thanh và Truyền hình Thành phố Hồ Chí Minh',
      en: 'Ho Chi Minh City Television - Multimedia News & Analysis',
    },
    badgeColor: 'bg-rose-700 text-white',
  },
];

export const INITIAL_NEWS_FLASHES: NewsFlashItem[] = [
  {
    id: 'news-urban-development-law',
    title: {
      vi: 'Chương trình Luật Phát Triển Đô Thị: Ông Cao Nguyễn Nhật Triều đóng góp ý kiến về cơ chế Sandbox và thương mại hóa công nghệ',
      en: 'Urban Development Law Program: Expert Insights by Cao Nguyen Nhat Trieu on Regulatory Sandboxes & Tech Commercialization',
    },
    summary: {
      vi: 'Trong chương trình phát sóng về Luật Phát Triển Đô Thị (từ phút thứ 11:00), ông Cao Nguyễn Nhật Triều (Giám đốc điều hành Nha Trang Hitech) nêu bật kỳ vọng của cộng đồng doanh nghiệp vào Khoản 5 Điều 29: cơ chế thử nghiệm có kiểm soát (Sandbox) và chính sách ưu đãi các ngành công nghệ chiến lược để đưa TP.HCM thành trung tâm thương mại hóa sản phẩm R&D.',
      en: 'Featured in the televised discussion on the Urban Development Law (segment from 11:00), Cao Nguyen Nhat Trieu (COO Nha Trang Hitech) emphasized business expectations for Clause 5 Article 29: controlled regulatory sandboxes and strategic incentives empowering tech commercialization in HCMC.',
    },
    category: 'vietnam',
    sourceName: 'Chương trình Luật Phát Triển Đô Thị',
    sourceUrl: 'https://www.youtube.com/live/gPXndsELXvw?si=SgTTNQzKH1KXrKUF&t=660s',
    sourceDomain: 'youtube.com',
    publishedAt: '06/09/2026',
    readTime: '4 phút xem & đọc',
    badge: 'hot',
    impact: 'strategic',
    tags: ['Luật Phát Triển Đô Thị', 'Khoản 5 Điều 29', 'Cơ chế Sandbox', 'Thương mại hóa', 'TP.HCM', 'Nha Trang Hitech'],
    keyTakeaways: {
      vi: [
        'Xuất hiện đóng góp chuyên môn từ phút 11:00 trong chương trình bàn về Luật Phát Triển Đô Thị.',
        'Nhấn mạnh cơ chế thử nghiệm có kiểm soát (Sandbox) tại Khoản 5 Điều 29 cho khoa học công nghệ.',
        'Định hướng TP.HCM không chỉ là nơi ứng dụng mà là trung tâm thương mại hóa sản phẩm công nghệ cao.',
      ],
      en: [
        'Featured expert contribution from minute 11:00 in the Urban Development Law broadcast.',
        'Emphasizing controlled regulatory sandbox mechanisms under Clause 5 Article 29 for sci-tech innovation.',
        'Positioning HCMC to evolve beyond tech consumption into a major commercialization hub.',
      ],
    },
    relatedInsightTopic: 'ai-financial-markets',
  },
  {
    id: 'news-htv-commercialization',
    title: {
      vi: 'Đài Truyền hình HTV: Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm - Ông Cao Nguyễn Nhật Triều chia sẻ góc nhìn',
      en: 'HTV Television: Promoting Technology Businesses to Commercialize Products - Insights by Cao Nguyen Nhat Trieu',
    },
    summary: {
      vi: 'Ông Cao Nguyễn Nhật Triều (Giám đốc điều hành Công ty TNHH MTV Công Nghệ Cao Nha Trang) trao đổi trên HTV: Nhấn mạnh lợi thế dân số trẻ, năng động và vị thế trung tâm KHCN của TP.HCM giúp doanh nghiệp đưa sản phẩm từ phòng R&D ra thị trường trong nước và quốc tế.',
      en: 'Cao Nguyen Nhat Trieu (COO Nha Trang Hitech) shares perspectives on HTV Television: Highlighting HCMC dynamic young demographics and sci-tech ecosystem as launchpads for bringing R&D research into commercial products.',
    },
    category: 'vietnam',
    sourceName: 'Đài Truyền Hình HTV',
    sourceUrl: 'https://htv.vn/thuc-day-doanh-nghiep-cong-nghe-thuong-mai-hoa-san-pham-22226090516104883.htm',
    sourceDomain: 'htv.vn',
    publishedAt: '05/09/2026',
    readTime: '3 phút đọc',
    badge: 'analysis',
    impact: 'positive',
    tags: ['Đài HTV', 'Thương mại hóa', 'Khoa học công nghệ', 'TP.HCM', 'Nha Trang Hitech', 'Đổi mới sáng tạo'],
    keyTakeaways: {
      vi: [
        'TP. Hồ Chí Minh sở hữu nguồn dân số trẻ, năng động và hệ sinh thái đổi mới sáng tạo hàng đầu cả nước.',
        'Thúc đẩy chính sách đưa sản phẩm công nghệ từ phòng nghiên cứu (R&D) ra thị trường thương mại thực tiễn.',
        'Đồng hành cùng mục tiêu nâng tỷ lệ thương mại hóa kết quả nghiên cứu khoa học - công nghệ lên 8-10% đến năm 2030.',
      ],
      en: [
        'HCMC dynamic young population and leading innovation hub provide strong pillars for technology commercialization.',
        'Accelerating strategic policy support to transition R&D laboratory achievements into market-ready products.',
        'Contributing toward municipal targets of 40%+ innovative firms and 8-10% sci-tech research commercialization rate.',
      ],
    },
    relatedInsightTopic: 'ai-financial-markets',
  },
  {
    id: 'news-today-01',
    title: {
      vi: 'Ngân hàng Nhà nước và các tổ chức tín dụng đẩy mạnh gói tín dụng xanh và số hóa chuỗi cung ứng 2026',
      en: 'State Bank of Vietnam and commercial banks scale green credit packages and supply chain digitization for 2026',
    },
    summary: {
      vi: 'Ưu tiên hạn mức tín dụng với lãi suất ưu đãi cho các doanh nghiệp đạt chứng chỉ ESG, sản xuất sạch và áp dụng hóa đơn điện tử - thanh toán không tiền mặt liên thông.',
      en: 'Preferential credit quotas and subsidized rates allocated for ESG-compliant manufacturers, clean energy transitions, and end-to-end digitized enterprise invoicing.',
    },
    category: 'vietnam',
    sourceName: 'Báo Chính Phủ / SBV',
    sourceUrl: 'https://baochinhphu.vn',
    sourceDomain: 'baochinhphu.vn',
    publishedAt: '12 phút trước',
    readTime: '2 phút đọc',
    badge: 'breaking',
    impact: 'positive',
    tags: ['Tín dụng xanh', 'ESG', 'Ngân hàng', 'Chính sách vĩ mô'],
    keyTakeaways: {
      vi: [
        'Doanh nghiệp chuyển đổi xanh và tự động hóa nhà xưởng được tiếp cận vốn vay ưu đãi giảm 1.5 - 2%/năm.',
        'Hệ thống phê duyệt tín dụng liên kết dữ liệu định danh doanh nghiệp giúp rút ngắn thời gian giải ngân còn 24 giờ.',
        'Thúc đẩy thương mại bền vững và đáp ứng tiêu chuẩn xuất khẩu khắt khe sang thị trường EU (CBAM) và Mỹ.',
      ],
      en: [
        'Green transformation and automated manufacturing ventures access subsidized interest rates lower by 1.5-2.0% p.a.',
        'Automated credit scoring leveraging digitized enterprise data shortens loan disbursement cycle to 24 hours.',
        'Empowers sustainable cross-border exports meeting stringent EU CBAM and US ESG compliance baselines.',
      ],
    },
    relatedInsightTopic: 'ai-financial-markets',
  },
  {
    id: 'news-today-02',
    title: {
      vi: 'Thế hệ Agentic AI tự hành tái định hình quy trình tự động hóa vận hành và hoạch định nguồn lực ERP',
      en: 'Autonomous Agentic AI systems revolutionize enterprise ERP operations, financial forecasting, and workflow orchestration',
    },
    summary: {
      vi: 'Các tập đoàn công nghệ hàng đầu tích hợp AI Agent đa tác vụ vào chuỗi cung ứng, tự động đối soát thanh toán và xử lý đơn hàng đa kênh với độ chính xác trên 99.4%.',
      en: 'Enterprise tech leaders integrate autonomous multi-agent AI into supply chain logistics, reconciling payments and processing multi-channel orders with 99.4%+ accuracy.',
    },
    category: 'tech',
    sourceName: 'MIT Technology Review',
    sourceUrl: 'https://www.technologyreview.com',
    sourceDomain: 'technologyreview.com',
    publishedAt: '28 phút trước',
    readTime: '3 phút đọc',
    badge: 'hot',
    impact: 'strategic',
    tags: ['Agentic AI', 'ERP Tự động', 'Chuyển đổi số', 'Vận hành'],
    keyTakeaways: {
      vi: [
        'AI Agents tự động giải quyết các xung đột chứng từ và điều phối kho hàng theo thời gian thực mà không cần can thiệp thủ công.',
        'Chi phí vận hành back-office giảm bình quân 45-60% sau 6 tháng áp dụng mô hình lai (Hybrid AI Orchestration).',
        'Bảo mật dữ liệu cục bộ và phân quyền truy cập đóng vai trò quyết định trong việc bảo vệ bí mật kinh doanh.',
      ],
      en: [
        'Autonomous AI agents resolve invoice discrepancies and balance warehouse inventories in real time without human bottlenecks.',
        'Back-office operational overhead decreases by an average of 45-60% within 6 months of Hybrid AI adoption.',
        'Local data air-gapping and granular RBAC governance remain critical to safeguarding proprietary corporate assets.',
      ],
    },
    relatedInsightTopic: 'ai-financial-markets',
  },
  {
    id: 'news-today-03',
    title: {
      vi: 'Làn sóng dòng vốn FDI công nghệ cao đổ về các trung tâm bán dẫn và trung tâm dữ liệu AI tại Việt Nam',
      en: 'High-tech FDI inflows accelerate toward semiconductor assembly, packaging and green AI data centers in Vietnam',
    },
    summary: {
      vi: 'Hàng loạt dự án nhà máy kiểm thử vi mạch thế hệ mới và Data Center đạt chuẩn Net-Zero được cấp phép tại Bắc Ninh, Đà Nẵng, TP. Hồ Chí Minh và Đồng Nai.',
      en: 'Multiple next-generation chip packaging facilities and Net-Zero green AI data center complexes receive official investment licenses across strategic national economic zones.',
    },
    category: 'vietnam',
    sourceName: 'CafeF / Vietnam Briefing',
    sourceUrl: 'https://cafef.vn',
    sourceDomain: 'cafef.vn',
    publishedAt: '45 phút trước',
    readTime: '3 phút đọc',
    badge: 'trending',
    impact: 'positive',
    tags: ['Bán dẫn', 'Data Center AI', 'FDI Việt Nam', 'Hạ tầng số'],
    keyTakeaways: {
      vi: [
        'Hạ tầng viễn thông 5G công nghiệp và lưới điện năng lượng tái tạo ổn định tạo sức hút lớn cho chuỗi cung ứng công nghệ.',
        'Chính phủ cam kết hoàn thiện đào tạo nhân lực bán dẫn chất lượng cao và cơ chế thử nghiệm Sandbox chính sách.',
        'Các doanh nghiệp phụ trợ trong nước có cơ hội lớn tham gia chuỗi giá trị toàn cầu của các tập đoàn Big Tech.',
      ],
      en: [
        'Industrial 5G telecommunications and reliable clean power grids create a compelling value proposition for global tech supply chains.',
        'Government commits to accelerated semiconductor talent pipelines and policy sandbox mechanisms.',
        'Local Tier-1 and Tier-2 suppliers gain strategic openings to integrate into global high-tech electronics value chains.',
      ],
    },
    relatedInsightTopic: 'microservices-enterprise-architecture',
  },
  {
    id: 'news-today-04',
    title: {
      vi: 'Fed duy trì tín hiệu nới lỏng tiền tệ thận trọng: Thanh khoản toàn cầu phục hồi, kích hoạt đợt tăng trưởng mới',
      en: 'Federal Reserve reaffirms measured monetary easing path: Global liquidity improves, catalyzing Asian equity expansion',
    },
    summary: {
      vi: 'Lợi suất trái phiếu chính phủ Mỹ hạ nhiệt cùng với chỉ số lạm phát PCE ổn định giúp mở rộng không gian chính sách cho các nền kinh tế đang phát triển tại Đông Nam Á.',
      en: 'Cooling US Treasury yields and stable PCE inflation indices expand macroeconomic maneuvering room for developing ASEAN economies.',
    },
    category: 'economy',
    sourceName: 'Bloomberg Economics',
    sourceUrl: 'https://www.bloomberg.com/economics',
    sourceDomain: 'bloomberg.com',
    publishedAt: '1 giờ trước',
    readTime: '2 phút đọc',
    badge: 'analysis',
    impact: 'positive',
    tags: ['Fed', 'Lãi suất', 'Thanh khoản', 'Kinh tế vĩ mô'],
    keyTakeaways: {
      vi: [
        'Áp lực tỷ giá USD/VND hạ nhiệt đáng kể, tạo điều kiện giữ mặt bằng lãi suất cho vay ở mức thấp hỗ trợ sản xuất kinh doanh.',
        'Dòng vốn ngoại quay trở lại mua ròng tại các thị trường chứng khoán mới nổi có nền tảng tăng trưởng vững chắc.',
        'Doanh nghiệp nên chủ động tái cơ cấu nợ vay và tận dụng chi phí vốn hợp lý để đầu tư mở rộng công nghệ.',
      ],
      en: [
        'USD/VND exchange rate pressures moderate, enabling continued low domestic lending rates to spur industrial production.',
        'Foreign institutional capital returns to emerging equity markets with solid fundamental balance sheets.',
        'Enterprises are encouraged to restructure long-term debt and leverage competitive capital costs for tech Capex.',
      ],
    },
  },
  {
    id: 'news-today-05',
    title: {
      vi: 'Thanh toán liên thông mã QR xuyên biên giới trong khối ASEAN đạt kỷ lục 1.2 tỷ lượt giao dịch',
      en: 'Cross-border interoperable QR payments across ASEAN surpass 1.2 billion transactions milestone',
    },
    summary: {
      vi: 'Người dân và doanh nghiệp Việt Nam, Thái Lan, Singapore, Malaysia có thể thanh toán trực tiếp bằng đồng nội tệ qua mã QR chuẩn quốc gia, giảm chi phí chuyển đổi ngoại hối tới 40%.',
      en: 'Citizens and merchants across Vietnam, Thailand, Singapore, and Malaysia execute seamless direct local-currency QR settlements, reducing FX intermediation costs by up to 40%.',
    },
    category: 'economy',
    sourceName: 'Reuters Financial',
    sourceUrl: 'https://www.reuters.com/business',
    sourceDomain: 'reuters.com',
    publishedAt: '2 giờ trước',
    readTime: '2 phút đọc',
    badge: 'trending',
    impact: 'positive',
    tags: ['Fintech', 'Thanh toán QR', 'Kinh tế số', 'ASEAN'],
    keyTakeaways: {
      vi: [
        'Hỗ trợ đắc lực cho ngành du lịch quốc tế và bán lẻ dịch vụ xuyên biên giới.',
        'Giảm bớt sự phụ thuộc vào các mạng lưới thẻ thanh toán quốc tế có chi phí trung gian cao.',
        'Mở đường cho hệ sinh thái thương mại điện tử vi mô kết nối trực tiếp nông sản và hàng thủ công Đông Nam Á.',
      ],
      en: [
        'Provides massive boost to cross-border tourism recovery and merchant hospitality.',
        'Reduces reliance on expensive legacy international card interchange networks.',
        'Paves the way for direct micro-merchant e-commerce across regional markets.',
      ],
    },
  },
  {
    id: 'news-today-06',
    title: {
      vi: 'Xu hướng M&A và hợp nhất doanh nghiệp công nghệ B2B chú trọng dòng tiền tự do bền vững',
      en: 'B2B Enterprise Software M&A transactions prioritize sustainable free cash flow and positive unit economics',
    },
    summary: {
      vi: 'Báo cáo từ Bain & Company và Nikkei Asia cho thấy các thương vụ mua bán sáp nhập năm 2026 tập trung mạnh vào các công ty có khách hàng trung thành (High Net Retention) và biên lợi nhuận hoạt động ổn định.',
      en: 'Joint research by Bain & Company and Nikkei Asia indicates 2026 consolidation revolves around high Net Retention SaaS vendors with disciplined operating cash flows.',
    },
    category: 'enterprise',
    sourceName: 'Nikkei Asia / Financial Times',
    sourceUrl: 'https://asia.nikkei.com',
    sourceDomain: 'asia.nikkei.com',
    publishedAt: '3 giờ trước',
    readTime: '3 phút đọc',
    badge: 'analysis',
    impact: 'strategic',
    tags: ['M&A', 'B2B SaaS', 'Quản trị vốn', 'Chiến lược'],
    keyTakeaways: {
      vi: [
        'Giai đoạn "tăng trưởng bằng mọi giá" nhường chỗ cho hiệu quả sử dụng vốn (Rule of 40) và lợi nhuận trên mỗi khách hàng.',
        'Các giải pháp phần mềm tích hợp All-in-One được ưu tiên mua lại để mở rộng tệp khách hàng doanh nghiệp vừa và lớn.',
        'Lãnh đạo doanh nghiệp cần rà soát cấu trúc chi phí điện toán đám mây và tối ưu bộ máy vận hành tinh gọn.',
      ],
      en: [
        'The "growth at all costs" era gives way to strict capital efficiency (Rule of 40) and healthy customer unit economics.',
        'All-in-one vertical software suites command premium valuation multiples for strategic buyers.',
        'Executives should audit cloud infrastructure costs and streamline lean operational structures.',
      ],
    },
  },
  {
    id: 'news-today-07',
    title: {
      vi: 'Đề án 06 và Kiosk Y tế thông minh: Đột phá số hóa thủ tục khám chữa bệnh và bảo hiểm y tế toàn dân',
      en: 'Government Project 06 & Smart Healthcare Kiosks: Breakthrough in citizen biometric check-in and digital healthcare billing',
    },
    summary: {
      vi: 'Hàng trăm bệnh viện tuyến trung ương và tỉnh thành đồng loạt triển khai Kiosk tự phục vụ tích hợp xác thực CCCD gắn chip sinh trắc học, thanh toán viện phí tức thời không dùng tiền mặt.',
      en: 'Hundreds of major central and provincial hospitals deploy biometric citizen chip-ID self-service kiosks, slashing patient wait times and enabling instant cashless billing.',
    },
    category: 'vietnam',
    sourceName: 'VnExpress / Báo Chính Phủ',
    sourceUrl: 'https://vnexpress.net',
    sourceDomain: 'vnexpress.net',
    publishedAt: '4 giờ trước',
    readTime: '2 phút đọc',
    badge: 'trending',
    impact: 'positive',
    tags: ['Đề án 06', 'Y tế số', 'Kiosk IoT', 'CCCD Sinh trắc học'],
    keyTakeaways: {
      vi: [
        'Rút ngắn hơn 75% thời gian làm thủ tục đăng ký khám chữa bệnh của người dân tại các cơ sở y tế công lập.',
        'Loại bỏ triệt để rủi ro gian lận trục lợi quỹ bảo hiểm y tế nhờ xác thực vân tay và khuôn mặt qua thẻ căn cước gắn chip.',
        'Khẳng định tính hiệu quả vượt trội khi kết hợp giải pháp tài chính ngân hàng số vào dịch vụ công thiết yếu.',
      ],
      en: [
        'Cuts hospital registration and admission waiting time by more than 75% across public healthcare facilities.',
        'Eliminates identity fraud and insurance leakages via real-time biometric and chip-based citizen verification.',
        'Demonstrates immense synergy between digital banking infrastructure and national public services.',
      ],
    },
  },
  {
    id: 'news-today-08',
    title: {
      vi: 'Bảo mật an ninh mạng và chủ quyền dữ liệu định danh: Thách thức trọng tâm của các tổ chức tài chính 2026',
      en: 'Cybersecurity defense & identity data sovereignty: Foremost priority for financial institutions in 2026',
    },
    summary: {
      vi: 'Các cuộc tấn công mạng sử dụng Deepfake và mã độc nhắm vào chuỗi cung ứng API đòi hỏi doanh nghiệp phải áp dụng kiến trúc phòng thủ Zero Trust và mã hóa kháng lượng tử.',
      en: 'Advanced AI-generated deepfake social engineering and API supply chain exploits necessitate immediate Zero Trust architectures and quantum-resilient encryption.',
    },
    category: 'tech',
    sourceName: 'TechCrunch / IEEE Spectrum',
    sourceUrl: 'https://techcrunch.com',
    sourceDomain: 'techcrunch.com',
    publishedAt: '5 giờ trước',
    readTime: '3 phút đọc',
    badge: 'hot',
    impact: 'warning',
    tags: ['An ninh mạng', 'Zero Trust', 'Bảo mật API', 'Deepfake'],
    keyTakeaways: {
      vi: [
        'Bắt buộc kiểm thử an toàn thâm nhập (Penetration Testing) định kỳ và xác thực đa lớp cho mọi giao dịch nhạy cảm.',
        'Đào tạo nâng cao nhận thức bảo mật cho 100% cán bộ nhân viên để phòng ngừa lừa đảo qua công nghệ trí tuệ nhân tạo giả mạo.',
        'Xây dựng quy trình phản ứng sự cố khẩn cấp (Incident Response) với thời gian cô lập rủi ro dưới 15 phút.',
      ],
      en: [
        'Mandatory automated penetration testing and multi-factor biometric authentication for all high-value transactions.',
        'Continuous workforce cyber hygiene training to counter synthetic voice and deepfake social engineering attacks.',
        'Establish standardized Incident Response protocols capable of isolating breach perimeters in under 15 minutes.',
      ],
    },
  },
];

export const LIVE_NEWS_ROTATION_POOL: NewsFlashItem[] = [
  {
    id: 'news-live-extra-01',
    title: {
      vi: 'Chỉ số sản xuất công nghiệp PMI Việt Nam đạt 53.8 điểm, cao nhất trong vòng 18 tháng qua',
      en: 'Vietnam Manufacturing PMI surges to 53.8 points, logging highest factory growth trajectory in 18 months',
    },
    summary: {
      vi: 'Số lượng đơn đặt hàng xuất khẩu mới tăng mạnh ở các phân khúc vi mạch điện tử, máy tính, thiết bị quang học và linh kiện ô tô điện thông minh.',
      en: 'New international export orders spike across semiconductor electronics, optical precision hardware, and smart EV automotive components.',
    },
    category: 'economy',
    sourceName: 'S&P Global Market Intelligence',
    sourceUrl: 'https://www.spglobal.com',
    sourceDomain: 'spglobal.com',
    publishedAt: 'Vừa xong',
    readTime: '2 phút đọc',
    badge: 'breaking',
    impact: 'positive',
    tags: ['PMI', 'Sản xuất công nghiệp', 'Xuất khẩu', 'Phục hồi'],
    keyTakeaways: {
      vi: [
        'Doanh nghiệp mở rộng quy mô tuyển dụng kỹ sư công nghệ và gia tăng lượng tồn kho nguyên vật liệu đầu vào.',
        'Sự dịch chuyển chuỗi cung ứng toàn cầu tiếp tục tạo động lực vững chắc cho các khu công nghiệp phía Nam và phía Bắc.',
        'Doanh nghiệp cần tối ưu hóa logistics và kho thông minh để đảm bảo tiến độ giao hàng đúng cam kết quốc tế.',
      ],
      en: [
        'Manufacturers expand technical workforce recruitment and build up strategic raw material reserves.',
        'Global supply chain diversification delivers durable tailwinds for industrial park clusters nationwide.',
        'Enterprises must optimize smart warehouse logistics to fulfill stringent international delivery SLAs.',
      ],
    },
  },
  {
    id: 'news-live-extra-02',
    title: {
      vi: 'Chuyển đổi số giáo dục & Hệ sinh thái học đường thông minh Smart Campus tiếp tục nhân rộng',
      en: 'Educational digital transformation & Smart Campus ecosystem expands across universities and secondary school networks',
    },
    summary: {
      vi: 'Triển khai giải pháp số hóa quản lý trường học, điểm danh khuôn mặt thông minh và thu học phí tự động 100% không tiền mặt qua Edupay tại hơn 500 cơ sở giáo dục.',
      en: 'Deployment of digital campus management, smart facial attendance, and 100% cashless automated tuition fee settlement across 500+ academic institutions.',
    },
    category: 'vietnam',
    sourceName: 'Báo Đồng Nai / Giáo Dục & Thời Đại',
    sourceUrl: 'https://baodongnai.com.vn',
    sourceDomain: 'baodongnai.com.vn',
    publishedAt: 'Vừa xong',
    readTime: '2 phút đọc',
    badge: 'trending',
    impact: 'positive',
    tags: ['Edupay', 'Smart Campus', 'Giáo dục số', 'Fintech'],
    keyTakeaways: {
      vi: [
        'Minh bạch hóa 100% các khoản thu chi học đường, giảm thiểu sai sót đối soát thủ công của bộ phận kế toán.',
        'Phụ huynh có thể thanh toán trực tuyến mọi lúc mọi nơi qua ứng dụng ngân hàng di động quen thuộc.',
        'Nhà trường nâng cao chất lượng quản trị và xây dựng môi trường học đường số văn minh, hiện đại.',
      ],
      en: [
        'Achieves 100% financial transparency in school accounting, eliminating manual reconciliation overhead.',
        'Parents settle tuition fees anytime, anywhere through their preferred mobile banking applications.',
        'Institutions upgrade operational governance and establish modern, digitized campus experiences.',
      ],
    },
  },
  {
    id: 'news-live-extra-03',
    title: {
      vi: 'Các tập đoàn bán lẻ ứng dụng AI thị giác máy tính và phân tích hành vi khách hàng tại điểm bán',
      en: 'Retail leaders implement Computer Vision AI and real-time footfall behavioral analytics in physical stores',
    },
    summary: {
      vi: 'Tối ưu sơ đồ trưng bày sản phẩm (Planogram) và dự báo doanh số theo thời gian thực giúp tăng tỷ lệ chuyển đổi mua hàng thêm 22% tại các chuỗi cửa hàng hiện đại.',
      en: 'Dynamic planogram optimization and real-time shopper analytics elevate in-store conversion rates by 22% across modern supermarket chains.',
    },
    category: 'enterprise',
    sourceName: 'Retail Dive / Harvard Business Review',
    sourceUrl: 'https://www.retaildive.com',
    sourceDomain: 'retaildive.com',
    publishedAt: 'Vừa xong',
    readTime: '2 phút đọc',
    badge: 'hot',
    impact: 'strategic',
    tags: ['Bán lẻ hiện đại', 'AI Thị giác', 'Phân tích dữ liệu', 'Doanh thu'],
    keyTakeaways: {
      vi: [
        'Nhận diện các khu vực "điểm nóng" (Heatmaps) trong cửa hàng để sắp xếp vị trí hàng hóa có lợi nhuận cao.',
        'Tự động cảnh báo hết hàng trên quầy kệ (Out-of-Stock Alert) theo thời gian thực cho nhân viên siêu thị.',
        'Cá nhân hóa ưu đãi khuyến mãi tức thì qua ứng dụng khách hàng thân thiết khi khách bước vào cửa hàng.',
      ],
      en: [
        'Generates real-time in-store heatmaps to strategically position high-margin merchandise.',
        'Automated real-time out-of-stock shelf alerts empower instant replenishment by store staff.',
        'Triggers personalized geofenced loyalty promotions directly to shopper mobile devices upon entry.',
      ],
    },
  },
];
