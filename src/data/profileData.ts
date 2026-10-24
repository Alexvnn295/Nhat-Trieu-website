export interface ExperienceItem {
  id: string;
  role: string;
  roleVi: string;
  company: string;
  period: string;
  type: 'full-time' | 'project';
  pointsEn: string[];
  pointsVi: string[];
  highlight?: {
    en: string;
    vi: string;
  };
}

export interface EducationItem {
  degreeEn: string;
  degreeVi: string;
  institutionEn: string;
  institutionVi: string;
  noteEn?: string;
  noteVi?: string;
}

export interface CertificationCategory {
  titleEn: string;
  titleVi: string;
  iconType: 'marketing' | 'management' | 'hr' | 'tech';
  items: string[];
}

export interface AIRecognitionData {
  awardEn: string;
  awardVi: string;
  awardDescEn: string;
  awardDescVi: string;
  coachingScopeEn: string;
  coachingScopeVi: string;
  focusTopicsEn: string[];
  focusTopicsVi: string[];
  keyCourses: {
    titleEn: string;
    titleVi: string;
  }[];
  deliveredPrograms: {
    titleEn: string;
    titleVi: string;
    year: string;
  }[];
}

export interface DigitalTransformationAchievement {
  id: string;
  categoryEn: string;
  categoryVi: string;
  titleEn: string;
  titleVi: string;
  summaryEn: string;
  summaryVi: string;
  highlightsEn: string[];
  highlightsVi: string[];
  articleUrl: string;
  videoUrl?: string;
  pressSource: string;
  pressTitle: string;
  year: string;
  badge: string;
}

export interface PersonalPhoto {
  id: string;
  filename: string;
  url: string;
  fallbackUrl: string;
  titleVi: string;
  titleEn: string;
  poseVi: string;
  poseEn: string;
  descriptionVi: string;
  descriptionEn: string;
  badgeVi: string;
  badgeEn: string;
  isDefault?: boolean;
}

export const PERSONAL_PORTRAITS: PersonalPhoto[] = [
  {
    id: 'photo-01',
    filename: 'GRU02101.JPG',
    url: '/images/profile/GRU02101.JPG?v=4',
    fallbackUrl: '/images/profile/GRU02101.JPG?v=4',
    titleVi: 'Chân dung Trực diện Doanh nhân (GRU02101)',
    titleEn: 'Executive Frontal Studio Portrait (GRU02101)',
    poseVi: 'Tư thế trực diện đĩnh đạc, vest đen chỉn chu, cà vạt đỏ, phong thái chuyên gia chiến lược & AI',
    poseEn: 'Formal frontal executive portrait, tailored black business suit, crimson red tie, modern glasses',
    descriptionVi: 'Hình ảnh chân dung chính thức của ông Cao Nguyễn Nhật Triều chụp tại studio chuyên nghiệp. Phù hợp cho hồ sơ điều hành, diễn giả hội nghị quốc tế và đại diện phát ngôn thương hiệu.',
    descriptionEn: 'Official executive portrait of Mr. Cao Nguyễn Nhật Triều taken in professional studio lighting. Suitable for corporate governance, keynote speaking, and brand representation.',
    badgeVi: 'Chính thức / Mặc định',
    badgeEn: 'Official / Default',
    isDefault: true,
  },
  {
    id: 'photo-02',
    filename: 'GRU02108.JPG',
    url: '/images/profile/GRU02108.JPG?v=4',
    fallbackUrl: '/images/profile/GRU02108.JPG?v=4',
    titleVi: 'Tác phong Lãnh đạo & Khởi xướng Chiến lược (GRU02108)',
    titleEn: 'Leadership Action & Strategic Poise (GRU02108)',
    poseVi: 'Tác phong chuẩn mực, tay chỉnh khuy áo vest, ánh mắt kiên định sẵn sàng dẫn dắt đổi mới',
    poseEn: 'Authoritative dynamic stance adjusting suit jacket, prepared to lead and drive operational transformation',
    descriptionVi: 'Ghi lại khoảnh khắc tác phong điều hành chuẩn mực, thể hiện tinh thần sẵn sàng dấn thân giải quyết các bài toán chiến lược, mở rộng kênh phân phối và tái cấu trúc tổ chức.',
    descriptionEn: 'Capturing dynamic executive readiness, embodying commitment to tackling strategic challenges, scaling sales channels, and executing organizational restructuring.',
    badgeVi: 'Lãnh đạo & Điều hành',
    badgeEn: 'Leadership & Execution',
  },
  {
    id: 'photo-03',
    filename: 'GRU02112.JPG',
    url: '/images/profile/GRU02112.JPG?v=4',
    fallbackUrl: '/images/profile/GRU02112.JPG?v=4',
    titleVi: 'Chân dung Trực diện Đĩnh đạc & Bản lĩnh (GRU02112)',
    titleEn: 'Distinguished Executive Frontal Portrait (GRU02112)',
    poseVi: 'Tư thế đứng thẳng đĩnh đạc, ánh nhìn tự tin, thần thái chuyên gia hoạch định chiến lược và công nghệ',
    poseEn: 'Poised upright posture, confident gaze, reflecting seasoned strategic and technological executive presence',
    descriptionVi: 'Thể hiện phong thái đĩnh đạc, bản lĩnh và tư duy độc lập của chuyên gia cấp cao trong các dự án quy mô lớn, tái cấu trúc vận hành và ứng dụng công nghệ chuyên sâu.',
    descriptionEn: 'Reflecting distinguished composure, strategic fortitude, and executive acumen across large-scale enterprise transformation and technological implementations.',
    badgeVi: 'Chiến lược & Bản lĩnh',
    badgeEn: 'Strategy & Leadership',
  },
  {
    id: 'photo-04',
    filename: 'GRU02116.JPG',
    url: '/images/profile/GRU02116.JPG?v=4',
    fallbackUrl: '/images/profile/GRU02116.JPG?v=4',
    titleVi: 'Góc nghiêng 3/4 - Nụ cười Cố vấn & Hợp tác (GRU02116)',
    titleEn: '3/4 Perspective - Collaborative & Advisory Smile (GRU02116)',
    poseVi: 'Góc nghiêng 3/4 thân thiện, nụ cười tự tin, phong thái đối thoại và đồng hành cùng doanh nghiệp',
    poseEn: 'Approachable 3/4 profile with confident smile, radiating collaboration and mentorship poise',
    descriptionVi: 'Thể hiện phong thái cởi mở, lắng nghe và nhiệt huyết trong các chương trình cố vấn chuyển đổi số SME, huấn luyện AI thực chiến cho trường học và kết nối mạng lưới đối tác.',
    descriptionEn: 'Reflecting an open, receptive, and inspiring presence across SME digital transformation consulting, AI coaching programs, and strategic partnerships.',
    badgeVi: 'Cố vấn & Đào tạo',
    badgeEn: 'Advisory & Coaching',
  },
];

export interface ExecutiveProfileData {
  name: string;
  titleEn: string;
  titleVi: string;
  avatarUrl?: string;
  activePhotoId?: string;
  personalPortraits?: PersonalPhoto[];
  summaryEn: string;
  summaryVi: string;
  contact: {
    locationEn: string;
    locationVi: string;
    phone: string;
    email: string;
    linkedin: string;
    github?: string;
  };
  metrics: {
    value: string;
    labelEn: string;
    labelVi: string;
    subLabelEn: string;
    subLabelVi: string;
  }[];
  coreCompetencies: {
    titleEn: string;
    titleVi: string;
    descEn: string;
    descVi: string;
  }[];
  education: EducationItem[];
  certifications: CertificationCategory[];
  fullTimeExperience: ExperienceItem[];
  projectExperience: ExperienceItem[];
  aiRecognition: AIRecognitionData;
  digitalTransformationAchievements?: DigitalTransformationAchievement[];
  otherActivities: {
    en: string;
    vi: string;
  }[];
}

export const EXECUTIVE_PROFILE: ExecutiveProfileData = {
  name: 'CAO NGUYỄN NHẬT TRIỀU',
  titleEn: 'Professional Executive Profile | Strategy, Tech & AI Consultant',
  titleVi: 'Hồ Sơ Năng Lực Chuyên Gia | Chiến Lược, Công Nghệ & AI',
  avatarUrl: '/images/profile/GRU02101.JPG?v=4',
  activePhotoId: 'photo-01',
  personalPortraits: PERSONAL_PORTRAITS,
  summaryEn:
    'Professional with over 15 years of experience in strategy, commercial operations, technology-oriented business development, and digital transformation across finance, insurance, e-commerce, and related sectors, including more than 7 years of business consulting for SMEs. Background includes distribution strategy execution, sales team formation, and business development across B2B, B2C, and C2C contexts. Current focus includes AI consulting, AI training, and coaching programs for schools and enterprises to improve productivity and organizational capabilities.',
  summaryVi:
    'Chuyên gia với hơn 15 năm kinh nghiệm về chiến lược, vận hành thương mại, phát triển kinh doanh công nghệ và chuyển đổi số trong lĩnh vực tài chính, bảo hiểm, TMĐT... bao gồm 7+ năm tư vấn cho SME. Giàu kinh nghiệm trong thực thi chiến lược phân phối, xây dựng đội ngũ bán hàng và phát triển B2B, B2C, C2C. Trọng tâm hiện tại bao gồm tư vấn, đào tạo và huấn luyện AI cho trường học và doanh nghiệp nhằm nâng cao hiệu suất và năng lực tổ chức.',
  contact: {
    locationEn: 'Ho Chi Minh City, Vietnam',
    locationVi: 'TP. Hồ Chí Minh, Việt Nam',
    phone: '0983.440.188',
    email: 'trieucnn@gmail.com',
    linkedin: 'https://vn.linkedin.com/in/alexvnn295',
    github: 'https://github.com/Alexvnn295',
  },
  metrics: [
    {
      value: '15+ Years',
      labelEn: 'Commercial Strategy Ops',
      labelVi: 'Vận hành Chiến lược',
      subLabelEn: 'Strategy & Operations',
      subLabelVi: 'Chiến lược & Vận hành',
    },
    {
      value: '7+ Years',
      labelEn: 'SME Business Consulting',
      labelVi: 'Tư vấn Doanh nghiệp SME',
      subLabelEn: 'Advisory & Restructuring',
      subLabelVi: 'Cố vấn & Tái cấu trúc',
    },
    {
      value: 'Multi-Sector',
      labelEn: 'Finance, Technology, Business & AI',
      labelVi: 'Tài chính, Công nghệ, Kinh doanh & AI',
      subLabelEn: 'Tech Transformation',
      subLabelVi: 'Chuyển đổi số & Công nghệ',
    },
  ],
  coreCompetencies: [
    {
      titleEn: 'Strategic Planning & Business Consulting',
      titleVi: 'Hoạch định Chiến lược & Tư vấn Doanh nghiệp',
      descEn: 'Architecting growth roadmaps, business model innovation, and restructuring for SMEs and corporate enterprises.',
      descVi: 'Hoạch định lộ trình tăng trưởng, đổi mới mô hình kinh doanh và tái cấu trúc cho khối SME và doanh nghiệp.',
    },
    {
      titleEn: 'Distribution Strategy (Financial & Retail)',
      titleVi: 'Chiến lược Phân phối (Tài chính & Bán lẻ)',
      descEn: 'Designing multi-tier omnichannel distribution systems, branch networks, and financial service kiosks.',
      descVi: 'Thiết lập mạng lưới phân phối đa kênh, hệ thống chi nhánh và giải pháp kiosk tài chính công nghệ cao.',
    },
    {
      titleEn: 'Sales Team Formation & Leadership',
      titleVi: 'Xây dựng & Lãnh đạo Đội ngũ Bán hàng',
      descEn: 'Building high-performance sales forces, KPI governance frameworks, and P&L accountability structures.',
      descVi: 'Xây dựng đội ngũ kinh doanh tinh nhuệ, thiết lập khung quản trị KPI và quản lý trách nhiệm P&L.',
    },
    {
      titleEn: 'B2B, B2C, and C2C Business Development',
      titleVi: 'Phát triển Kinh doanh B2B, B2C, C2C',
      descEn: 'Expanding cross-platform customer acquisition funnels, corporate partnerships, and campus solutions.',
      descVi: 'Mở rộng phễu khách hàng đa kênh, kết nối đối tác doanh nghiệp và giải pháp thanh toán trường học/y tế.',
    },
    {
      titleEn: 'AI Training & Coaching for Schools and Enterprises',
      titleVi: 'Đào tạo & Huấn luyện AI cho Trường học & Doanh nghiệp',
      descEn: 'Delivering applied Generative AI, custom AI Agents, and productivity automation for managers and teams.',
      descVi: 'Chuyển giao ứng dụng AI Tạo sinh, xây dựng AI Agent và tự động hóa quy trình nâng cao hiệu suất làm việc.',
    },
  ],
  education: [
    {
      degreeEn: 'PhD Research Candidate (In Progress)',
      degreeVi: 'Nghiên cứu sinh Tiến sĩ (Đang thực hiện)',
      institutionEn: 'Doctoral Research Program',
      institutionVi: 'Chương trình Nghiên cứu sinh Tiến sĩ',
      noteEn: 'Currently pursuing doctoral research in economics & business management',
      noteVi: 'Đang thực hiện nghiên cứu chuyên sâu về kinh tế và quản trị',
    },
    {
      degreeEn: 'MBA (Master of Business Administration)',
      degreeVi: 'Thạc sĩ Quản trị Kinh doanh (MBA)',
      institutionEn: 'Ho Chi Minh City University of Technology (HUTECH)',
      institutionVi: 'Trường Đại học Kỹ thuật Công nghệ TP.HCM',
      noteEn: 'Strategic Management & Operations',
      noteVi: 'Quản trị Chiến lược & Vận hành Doanh nghiệp',
    },
    {
      degreeEn: 'Postgraduate Diploma in Business Management',
      degreeVi: 'Chứng chỉ Sau Đại học về Quản trị Kinh doanh',
      institutionEn: 'Kingston International College, Singapore',
      institutionVi: 'Học viện Kingston International, Singapore',
      noteEn: 'International Trade & Business Management',
      noteVi: 'Thương mại Quốc tế & Quản trị Toàn cầu',
    },
    {
      degreeEn: 'B.A. in Law',
      degreeVi: 'Cử nhân Luật',
      institutionEn: 'University of Economics and Law, VNU HCM',
      institutionVi: 'Trường Đại học Kinh tế - Luật, ĐHQG TP.HCM',
      noteEn: 'Corporate Law, Regulatory Frameworks & Governance',
      noteVi: 'Luật Doanh nghiệp, Khung Pháp lý & Quản trị',
    },
    {
      degreeEn: 'B.A. in Economics',
      degreeVi: 'Cử nhân Kinh tế',
      institutionEn: 'University of Economics and Law, VNU HCM',
      institutionVi: 'Trường Đại học Kinh tế - Luật, ĐHQG TP.HCM',
      noteEn: 'Macroeconomics, Market Dynamics & Quantitative Analysis',
      noteVi: 'Kinh tế Vĩ mô, Phân tích Thị trường & Định lượng',
    },
  ],
  certifications: [
    {
      titleEn: 'Marketing & Digital',
      titleVi: 'Tiếp thị & Kỹ thuật số',
      iconType: 'marketing',
      items: [
        'Google Digital Marketing & E-commerce',
        'Design Thinking: Venture Design',
        'Digital Transformation Masterclass',
      ],
    },
    {
      titleEn: 'Management & Project',
      titleVi: 'Quản lý & Dự án',
      iconType: 'management',
      items: [
        'CEO – The Professional Chief Executive Officer',
        'Google Project Management / P.M. Foundations',
        'Implementing Supply Chain Management',
      ],
    },
    {
      titleEn: 'HR & Training',
      titleVi: 'Nhân sự & Đào tạo',
      iconType: 'hr',
      items: [
        'Train the Trainer (Giảng viên Chuyên nghiệp)',
        'Strategic Human Resources',
        'Prep Professional in Human Resources (PHR)',
      ],
    },
    {
      titleEn: 'Languages & IT / AI Tools',
      titleVi: 'Ngôn ngữ & Công cụ CNTT / AI',
      iconType: 'tech',
      items: [
        'English: TOEFL iBT 87, BEC II (Business English Certificate)',
        'Software & AI Tools: Generative AI tools, prompt engineering, AI productivity and automation tools, Visual Basic',
      ],
    },
  ],
  fullTimeExperience: [
    {
      id: 'coo-nhatrang-hitech',
      role: 'Chief Operating Officer (COO)',
      roleVi: 'Giám đốc Vận hành (COO)',
      company: 'Nha Trang Hitech Ltd',
      period: '04/2025 – Present',
      type: 'full-time',
      pointsEn: [
        'Lead day-to-day operations and cross-functional execution to support strategic growth priorities.',
        'Coordinate business development, partnership implementation, internal operations, and performance tracking.',
        'Support the commercialization and operational deployment of technology-driven products and solutions.',
      ],
      pointsVi: [
        'Điều hành hoạt động hàng ngày và thực thi đa nhiệm hỗ trợ các ưu tiên tăng trưởng chiến lược.',
        'Điều phối phát triển kinh doanh, triển khai đối tác, vận hành nội bộ và theo dõi hiệu suất.',
        'Hỗ trợ thương mại hóa và triển khai vận hành các sản phẩm/giải pháp định hướng công nghệ.',
      ],
      highlight: {
        en: 'Media & Technology Commercialization: Featured in an interview on Ho Chi Minh City Television (HTV) on "Promoting Technology Businesses to Commercialize Products", bridging R&D to market.',
        vi: 'Dấu ấn Truyền thông & Thương mại hóa: Được Đài Truyền hình TP.HCM (HTV) phỏng vấn và đưa tin về chiến lược "Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm", đưa kết quả nghiên cứu R&D ra thị trường thực tiễn.',
      },
    },
    {
      id: 'pmo-hdbank',
      role: 'PMO & Region Sale Manager',
      roleVi: 'Quản lý Dự án (PMO) & Quản lý Kinh doanh Vùng',
      company: 'HD Bank – Partnership and Employee Banking',
      period: '10/2024 – Present',
      type: 'full-time',
      pointsEn: [
        'Lead regional business development in Southeast & Central Highlands (healthcare digital transformation, education, connectivity).',
        'Manage national PMO operations: project timeline, quality governance, risk mitigation, and cross-departmental coordination with hospitals and government stakeholders.',
        'Implement Smart Healthcare Kiosk systems and cashless medical fee collection models across major hospital networks.',
      ],
      pointsVi: [
        'Dẫn dắt phát triển kinh doanh khu vực Đông Nam Bộ & Tây Nguyên (chuyển đổi số y tế, giáo dục, giải pháp kết nối).',
        'Quản lý PMO dự án cấp quốc gia: kiểm soát tiến độ, quản trị chất lượng, giảm thiểu rủi ro và phối hợp liên ngành cùng các bệnh viện, sở y tế.',
        'Triển khai hệ thống Kiosk Y tế Thông minh và giải pháp thanh toán viện phí không tiền mặt tại các bệnh viện tuyến đầu.',
      ],
      highlight: {
        en: 'National Digital Transformation Highlight: Deployed 1,001+ Smart Healthcare Kiosks nationwide (Government Scheme 06) and integrated Edupay / Smart Campus solutions. Featured on the Government Portal (BaoChinhPhu.vn).',
        vi: 'Thành tựu Chuyển đổi số Trọng điểm: Tham gia triển khai 1.001+ Kiosk Y tế Thông minh toàn quốc (Đề án 06) nâng cao trải nghiệm khám chữa bệnh cho người dân & tích hợp Edupay / Smart Campus. Được đưa tin chính thức trên Báo Điện tử Chính phủ.',
      },
    },
    {
      id: 'techcombank-tca',
      role: 'Head of Representative Office / Territory Development',
      roleVi: 'Trưởng VPĐD / Phát triển Thị trường',
      company: 'Techcombank – TC Advisors Corp',
      period: '12/2014 – 02/2024',
      type: 'full-time',
      pointsEn: [
        'Built and scaled a nationwide financial network across 63 provinces and cities with nearly 100 official representative offices.',
        'Deployed hundreds of customer claim support centers across Vietnam to protect and serve policyholders.',
        'Held full P&L KPI accountability across multi-tier sales channels, integrating online and offline cross-platform operations.',
        'Directed strategic distribution agreements with major institutional partners (PVI Insurance, Techcombank ecosystem).',
      ],
      pointsVi: [
        'Phát triển mạng lưới rộng khắp 63 tỉnh thành trên toàn quốc với gần 100 văn phòng đại diện chính thức.',
        'Triển khai hàng trăm trung tâm hỗ trợ bồi thường nhằm phục vụ và bảo vệ quyền lợi tối đa cho khách hàng.',
        'Chịu trách nhiệm toàn diện P&L KPI các kênh kinh doanh, mở rộng đa nền tảng Online & Offline.',
        'Điều phối các thỏa thuận hợp tác phân phối chiến lược với các đối tác định chế lớn (Bảo hiểm PVI, Techcombank).',
      ],
    },
    {
      id: 'hr-vinh-nam',
      role: 'HR Manager',
      roleVi: 'Trưởng phòng Nhân sự',
      company: 'VINH NAM J.S.C',
      period: '07/2013 – 11/2014',
      type: 'full-time',
      pointsEn: [
        'Managed recruitment, C&B, administration, and ISO/5S standardization projects.',
      ],
      pointsVi: [
        'Quản lý tuyển dụng, chế độ đãi ngộ (C&B), hành chính và các dự án chuẩn hóa ISO/5S.',
      ],
    },
    {
      id: 'kumho-tires',
      role: 'Asst. of HR-GA Director',
      roleVi: 'Trợ lý Giám đốc Nhân sự & Hành chính',
      company: 'Kumho Tires Vietnam',
      period: '03/2012 – 07/2013',
      type: 'full-time',
      pointsEn: [
        'Supported HR operations for 1,500 employees via enterprise SAP/HRM system.',
      ],
      pointsVi: [
        'Hỗ trợ quản trị nhân sự cho 1.500 nhân viên thông qua hệ thống quản lý tích hợp SAP/HRM.',
      ],
    },
    {
      id: 'nhabe-corp',
      role: 'Mgr. of Labor Organization Dept.',
      roleVi: 'Trưởng phòng Tổ chức Lao động',
      company: 'Nhabe Corp – APIC & Tam Quan',
      period: '10/2010 – 02/2012',
      type: 'full-time',
      pointsEn: [
        'Directed HR operations for 3,500+ staff across 3 factories.',
        'Managed salary, bonus, compensation structures, and audited international ILO workplace standards.',
      ],
      pointsVi: [
        'Điều hành nhân sự cho hơn 3.500 nhân viên tại 3 nhà máy sản xuất.',
        'Quản lý lương thưởng và đánh giá tiêu chuẩn an toàn lao động quốc tế ILO.',
      ],
    },
  ],
  projectExperience: [
    {
      id: 'proj-nt-hitech',
      role: 'Strategic Partnership Director',
      roleVi: 'Giám đốc Đối tác Chiến lược',
      company: 'Nha Trang Hitech Ltd',
      period: '2014 – Present',
      type: 'project',
      pointsEn: [
        'Identify and nurture strategic R&D/Tech partnerships with international tech leaders (KDDI, Sato, Airquays, CCJ).',
      ],
      pointsVi: [
        'Phát triển đối tác chiến lược R&D và chuyển giao công nghệ với các tập đoàn quốc tế (KDDI, Sato, Airquays, CCJ).',
      ],
    },
    {
      id: 'proj-h2y',
      role: 'Strategic Advisor',
      roleVi: 'Cố vấn Chiến lược',
      company: 'H2Y Intl Trading JSC',
      period: '2022 – 2023',
      type: 'project',
      pointsEn: [
        'Implemented modern business models and HR execution strategies for cross-border operations.',
      ],
      pointsVi: [
        'Triển khai mô hình kinh doanh và chiến lược phát triển nhân sự thương mại quốc tế.',
      ],
    },
    {
      id: 'proj-abodos',
      role: 'Manager of Project Development',
      roleVi: 'Quản lý Phát triển Dự án',
      company: 'ABODOS J.S.C',
      period: '02/2022 – 10/2022',
      type: 'project',
      pointsEn: [
        'Established strategic partner connections in real estate, blockchain/crypto, and premium tourism.',
      ],
      pointsVi: [
        'Xây dựng kết nối đối tác chiến lược trong các lĩnh vực bất động sản, công nghệ crypto và du lịch.',
      ],
    },
    {
      id: 'proj-lecturer',
      role: 'Strategy Consultant / Lecturer',
      roleVi: 'Chuyên gia Tư vấn Chiến lược / Giảng viên',
      company: 'TA Design, UPK, Olympus | Affiliated Projects',
      period: 'Affiliated Projects',
      type: 'project',
      pointsEn: [
        'Developed organizational projects including tailored training programs, competency modeling, and executive recruitment.',
      ],
      pointsVi: [
        'Phát triển dự án, đào tạo và tuyển dụng theo nhu cầu đặc thù của doanh nghiệp.',
      ],
    },
  ],
  aiRecognition: {
    awardEn: 'Recognized in TOP Qualcomm Challenges 2026',
    awardVi: 'Nằm trong TOP Qualcomm Challenges 2026',
    awardDescEn:
      'Recognized for exceptional capability in AI innovation, applied problem-solving, and technology-driven solution development.',
    awardDescVi:
      'Khẳng định năng lực đổi mới sáng tạo, giải quyết bài toán thực tiễn và phát triển giải pháp ứng dụng Trí tuệ Nhân tạo.',
    coachingScopeEn:
      'Design and deliver structured AI training and coaching programs for schools and enterprises to maximize operational efficiency.',
    coachingScopeVi:
      'Thiết kế & triển khai các chương trình đào tạo AI thực tiễn cho trường học và doanh nghiệp nhằm tối ưu hóa hiệu suất làm việc.',
    focusTopicsEn: [
      'Generative AI applications in business & education',
      'Prompt design and conversational intelligence',
      'AI-assisted productivity and cognitive augmentation',
      'Workflow automation and autonomous AI Agents',
    ],
    focusTopicsVi: [
      'Ứng dụng AI Tạo sinh trong doanh nghiệp và trường học',
      'Thiết kế Prompt và kỹ thuật tương tác AI chuyên sâu',
      'Tăng hiệu suất làm việc với công cụ AI thông minh',
      'Tự động hóa quy trình nghiệp vụ và triển khai AI Agent',
    ],
    keyCourses: [
      {
        titleEn: 'AI Foundations for Schools and Enterprises',
        titleVi: 'AI Nền tảng cho Trường học & Doanh nghiệp',
      },
      {
        titleEn: 'Generative AI for Managers and Team Leaders',
        titleVi: 'AI Tạo sinh cho Quản lý & Trưởng nhóm',
      },
      {
        titleEn: 'AI Productivity and Automation for Office Teams',
        titleVi: 'Tự động hóa & Tăng hiệu suất cho Khối văn phòng',
      },
    ],
    deliveredPrograms: [
      {
        titleEn: 'AI Agent Training for Managers in Packaging Manufacturing',
        titleVi: 'Đào tạo AI Agent cho Quản lý Sản xuất Bao bì',
        year: '2025',
      },
      {
        titleEn: 'AI Training for Financial/Sales Systems in Supporting Industries',
        titleVi: 'Đào tạo AI hệ thống Tài chính & Sales trong Công nghiệp hỗ trợ',
        year: '2025',
      },
    ],
  },
  digitalTransformationAchievements: [
    {
      id: 'dt-htv-tech-commercialization',
      categoryEn: 'Technology Commercialization & Media',
      categoryVi: 'Thương Mại Hóa Công Nghệ & Truyền Thông',
      titleEn: 'HTV Television: Promoting Technology Businesses to Commercialize Products',
      titleVi: 'Đài Truyền hình HTV: Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm',
      summaryEn:
        'Featured in an in-depth interview on Ho Chi Minh City Television (HTV) discussing solutions to promote technology businesses in commercializing products. Emphasized the strategic advantages of Ho Chi Minh City with its young, dynamic demographic and status as a leading science and technology center, providing a solid foundation for tech enterprises to take products from R&D laboratories to domestic and global markets.',
      summaryVi:
        'Ông Cao Nguyễn Nhật Triều (Giám đốc điều hành Công ty TNHH MTV Công Nghệ Cao Nha Trang) có trao đổi chuyên sâu trên sóng Đài Phát thanh và Truyền hình TP.HCM (HTV) về giải pháp "Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm". Nhấn mạnh lợi thế vượt trội của TP.HCM với dân số trẻ, năng động và là trung tâm khoa học công nghệ lớn, tạo nền tảng vững chắc để các doanh nghiệp đưa kết quả nghiên cứu từ phòng R&D ra thị trường thực tiễn và vươn tầm quốc tế.',
      highlightsEn: [
        'Featured in an exclusive interview on Ho Chi Minh City Television (HTV)',
        'Strategic insights on bridging R&D research into viable commercialized high-tech products',
        'Leveraging HCMC young, energetic workforce and thriving sci-tech innovation ecosystem',
        'Aligning with municipal goals to achieve 8-10% technology commercialization rate by 2030',
      ],
      highlightsVi: [
        'Được Đài Phát thanh và Truyền hình TP.HCM (HTV) phỏng vấn và đưa tin chính thức',
        'Hiến kế giải pháp đưa sản phẩm công nghệ từ phòng nghiên cứu (R&D) ra thương trường thực tế',
        'Khẳng định lợi thế trung tâm công nghệ và nguồn nhân lực trẻ, năng động của TP. Hồ Chí Minh',
        'Đồng hành cùng mục tiêu phát triển hệ sinh thái đổi mới sáng tạo và nâng cao tỷ lệ thương mại hóa công nghệ',
      ],
      articleUrl:
        'https://htv.vn/thuc-day-doanh-nghiep-cong-nghe-thuong-mai-hoa-san-pham-22226090516104883.htm',
      videoUrl:
        'https://www.youtube.com/watch?si=UJ3MoshsIuSK-RwE&v=y-_DxX8pUFQ&feature=youtu.be',
      pressSource: 'Đài Truyền hình HTV',
      pressTitle: 'Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm',
      year: '2026',
      badge: 'Đài Truyền Hình HTV',
    },
    {
      id: 'dt-urban-development-law',
      categoryEn: 'Urban Policy & Tech Commercialization',
      categoryVi: 'Chính Sách Đô Thị & Thương Mại Hóa Công Nghệ',
      titleEn: 'Urban Development Law Program: Expert Contributions to Sci-Tech & Controlled Sandboxes',
      titleVi: 'Chương trình Luật Phát Triển Đô Thị: Đóng góp ý kiến & Hiến kế thương mại hóa công nghệ',
      summaryEn:
        'Featured speaker and expert contributor in the televised program discussing the Urban Development Law (Luật Phát Triển Đô Thị - segment from 11:00). Cao Nguyen Nhat Trieu (COO of Nha Trang Hitech) articulated key perspectives of the tech business community on the transformative potential of the law, highlighting Clause 5, Article 29 on sci-tech innovation, controlled regulatory sandboxes, and strategic incentives. Emphasized turning HCMC and Vietnam into a premier hub for commercializing advanced technology products from R&D into real urban life.',
      summaryVi:
        'Khách mời chuyên gia tham gia đóng góp ý kiến trong chương trình phát sóng chuyên sâu về "Luật Phát Triển Đô Thị" (xuất hiện đóng góp từ phút thứ 11:00). Ông Cao Nguyễn Nhật Triều (Giám đốc điều hành Công ty TNHH MTV Công Nghệ Cao Nha Trang) đại diện cộng đồng doanh nghiệp công nghệ chia sẻ sự hào hứng trước những cơ hội và kỳ vọng của Luật; nhấn mạnh Khoản 5 Điều 29 về phát triển khoa học công nghệ, đổi mới sáng tạo, cơ chế thử nghiệm có kiểm soát (regulatory sandbox) và chính sách ưu đãi cho các ngành công nghệ chiến lược, với kỳ vọng Việt Nam và TP.HCM sẽ là nơi thương mại hóa sản phẩm công nghệ cao từ phòng lab ra thị trường.',
      highlightsEn: [
        'Featured expert contribution from minute 11:00 in the televised broadcast on the Urban Development Law',
        'Deep analysis on Clause 5 Article 29: Controlled regulatory sandboxes & sci-tech incentives',
        'Vision to position HCMC and Vietnam as premier hubs for high-tech product commercialization',
        'Representing the technology business community in bridging policy frameworks with market reality',
      ],
      highlightsVi: [
        'Xuất hiện đóng góp chuyên môn từ phút thứ 11 trong chương trình Luật Phát Triển Đô Thị',
        'Phân tích sâu về Khoản 5 Điều 29: Phát triển KHCN, cơ chế thử nghiệm có kiểm soát (Sandbox)',
        'Hiến kế đưa TP.HCM và Việt Nam trở thành trung tâm thương mại hóa sản phẩm công nghệ cao',
        'Đại diện góc nhìn thực chiến của cộng đồng doanh nghiệp công nghệ trước khuôn khổ pháp lý mới',
      ],
      articleUrl:
        'https://www.youtube.com/live/gPXndsELXvw?si=SgTTNQzKH1KXrKUF&t=660s',
      videoUrl:
        'https://www.youtube.com/live/gPXndsELXvw?si=SgTTNQzKH1KXrKUF&t=660s',
      pressSource: 'Chương trình Luật Phát Triển Đô Thị',
      pressTitle: 'Đóng góp ý kiến của ông Cao Nguyễn Nhật Triều (từ phút 11:00)',
      year: '2026',
      badge: 'Luật Phát Triển Đô Thị | Phút 11:00',
    },
    {
      id: 'dt-smart-health-kiosk',
      categoryEn: 'National Digital Transformation',
      categoryVi: 'Chuyển Đổi Số Quốc Gia',
      titleEn: 'National Healthcare Digital Transformation: Smart Healthcare Kiosks & Citizen Experience',
      titleVi: 'Dự án Chuyển đổi số Y tế: Kiosk y tế thông minh và Trải nghiệm người dân',
      summaryEn:
        'Participated as PMO & Regional Business Development Lead in the national deployment of 1,001+ Smart Healthcare Kiosks (under Government Scheme 06). Empowered citizens with seamless biometric check-in (chip-based Citizen ID), reduced outpatient registration queue times by over 70%, and enabled 100% cashless hospital fee payments.',
      summaryVi:
        'Tham gia với vai trò Quản lý PMO & Phát triển Kinh doanh Vùng trong dự án triển khai quy mô quốc gia 1.001+ Kiosk Y tế Thông minh (theo Đề án 06 Chính phủ). Nâng cao trải nghiệm khám chữa bệnh cho người dân: đăng ký khám bằng CCCD gắn chip sinh trắc học, rút ngắn hơn 70% thời gian chờ đợi và thanh toán viện phí không dùng tiền mặt an toàn, thông suốt.',
      highlightsEn: [
        'National deployment of 1,001+ Smart Healthcare Kiosks nationwide under Government Scheme 06',
        'Over 70% reduction in patient waiting and registration times across top-tier hospitals',
        'Full integration with National Population Database & chip-based Citizen ID biometric authentication',
        'Official recognition and press coverage by the Government Electronic Newspaper (BaoChinhPhu.vn)',
      ],
      highlightsVi: [
        'Triển khai thần tốc 1.001+ Kiosk Y tế Thông minh trên toàn quốc theo Đề án 06 Chính phủ',
        'Rút ngắn hơn 70% thời gian đăng ký và chờ khám cho người dân tại các bệnh viện lớn',
        'Tích hợp xác thực sinh trắc học thẻ CCCD gắn chip với Cơ sở dữ liệu Quốc gia về Dân cư',
        'Được Báo Điện tử Chính phủ (BaoChinhPhu.vn) ghi nhận và đưa tin chính thức',
      ],
      articleUrl:
        'https://baochinhphu.vn/hdbank-ngan-hang-dau-tien-dua-kiosk-y-te-thong-minh-vao-nang-cao-trai-nghiem-kham-chua-benh-cho-nguoi-dan-102250307164606244.htm',
      pressSource: 'Báo Điện tử Chính phủ',
      pressTitle: 'HDBank - Ngân hàng đầu tiên đưa kiosk y tế thông minh vào nâng cao trải nghiệm khám chữa bệnh cho người dân',
      year: '2024 – 2026',
      badge: 'Đề án 06 Chính phủ',
    },
    {
      id: 'dt-smart-education',
      categoryEn: 'Education Digital Transformation',
      categoryVi: 'Chuyển Đổi Số Giáo Dục',
      titleEn: 'Education Digital Transformation: Advancing Educational Management & Cashless Digital Payments',
      titleVi: 'Dự án: Chuyển đổi số giáo dục - đẩy mạnh hoạt động quản lý giáo dục và thanh toán lên giao dịch điện tử và số hóa',
      summaryEn:
        'Participated in the strategic deployment of Education Digital Transformation solutions, integrating digital financial ecosystems (Edupay / Smart Campus), digitizing academic management operations, and promoting 100% electronic and cashless tuition fee transactions across key economic regions.',
      summaryVi:
        'Tham gia phát triển và triển khai giải pháp Chuyển đổi số Giáo dục: kết nối hệ sinh thái tài chính số học đường (Edupay / Smart Campus), đẩy mạnh hoạt động quản lý giáo dục số hóa, chuẩn hóa giao dịch điện tử và thúc đẩy thanh toán học phí không dùng tiền mặt an toàn, minh bạch.',
      highlightsEn: [
        'Connecting digital financial ecosystems & Edupay / Smart Campus across education institutions',
        'Digitizing education management workflows and electronic transaction processing',
        'Promoting 100% cashless, transparent, and seamless tuition payments',
        'Official recognition and press coverage by Dong Nai Newspaper - Digital Transformation Section',
      ],
      highlightsVi: [
        'Kết nối hệ sinh thái tài chính số học đường & giải pháp Edupay / Smart Campus tại các cơ sở giáo dục',
        'Đẩy mạnh số hóa quy trình quản lý giáo dục và giao dịch điện tử học đường',
        'Thúc đẩy thanh toán học phí không dùng tiền mặt an toàn, nhanh chóng và minh bạch',
        'Được Báo Đồng Nai (chuyên mục Chuyển đổi số) ghi nhận và đưa tin chính thức',
      ],
      articleUrl:
        'https://baodongnai.com.vn/chuyen-doi-so/202606/ket-noi-he-sinh-thai-tai-chinh-so-8d44066/',
      pressSource: 'Báo Đồng Nai - Chuyển đổi số',
      pressTitle: 'Kết nối hệ sinh thái tài chính số',
      year: '2024 – 2026',
      badge: 'Chuyển Đổi Số Giáo Dục',
    },
    {
      id: 'dt-qualcomm-ontrak',
      categoryEn: 'Global Tech Innovation',
      categoryVi: 'Đổi Mới Sáng Tạo Quốc Tế',
      titleEn: 'Nha Trang Hitech enters Qualcomm Challenges 2026 Finals with Ontrak Chainflow Ecosystem',
      titleVi: 'Nha Trang Hitech vào Chung kết Qualcomm Challenges 2026 với hệ sinh thái Ontrak Chainflow',
      summaryEn:
        'Outstanding milestone at Qualcomm Vietnam Innovation Challenge 2026: Nha Trang Hitech advanced to the prestigious Finals with the groundbreaking Ontrak Chainflow ecosystem, pioneering edge AI, IoT, and high-tech industrial automation.',
      summaryVi:
        'Dấu ấn xuất sắc tại cuộc thi công nghệ toàn cầu Qualcomm Vietnam Innovation Challenge 2026: Nha Trang Hitech tiến vào Vòng Chung kết với hệ sinh thái công nghệ cao Ontrak Chainflow, tiên phong ứng dụng AI tại biên, IoT và tự động hóa công nghiệp.',
      highlightsEn: [
        'Finalist in the prestigious Qualcomm Vietnam Innovation Challenge 2026',
        'Ontrak Chainflow high-tech ecosystem integrating AI, IoT, and tracking automation',
        'Demonstrated practical industrial readiness and cutting-edge innovation',
        'Broadcasted and recognized on official video media coverage',
      ],
      highlightsVi: [
        'Vào Vòng Chung kết cuộc thi danh giá Qualcomm Vietnam Innovation Challenge 2026',
        'Phát triển hệ sinh thái Ontrak Chainflow tích hợp AI, IoT và tự động hóa chuỗi cung ứng',
        'Khẳng định năng lực đổi mới sáng tạo và tiềm năng thương mại hóa quốc tế',
        'Được ghi nhận và truyền thông qua video phát sóng chính thức',
      ],
      articleUrl: 'https://www.facebook.com/reel/1411251914186357',
      pressSource: 'Qualcomm Challenges / Video',
      pressTitle: 'Nha Trang Hitech vào Chung kết Qualcomm Challenges 2026 với hệ sinh thái Ontrak Chainflow',
      year: '2026',
      badge: 'Chung kết Qualcomm 2026',
    },
    {
      id: 'dt-tca-nationwide-network',
      categoryEn: 'Financial Network & Customer Protection',
      categoryVi: 'Mạng Lưới Tài Chính & Bảo Vệ Khách Hàng',
      titleEn: 'TCA: Nationwide Distribution Network Across 63 Provinces & Hundreds of Claim Support Centers',
      titleVi: 'Thành tựu tại TCA: Phát triển mạng lưới rộng khắp 63 tỉnh thành trên toàn quốc & Hàng trăm Trung tâm Hỗ trợ Bồi thường',
      summaryEn:
        'Built and expanded a nationwide financial agency network across 63 provinces and cities with nearly 100 official representative offices. Spearheaded the establishment of hundreds of dedicated customer claim support centers to assist policyholders and promote transparent financial services.',
      summaryVi:
        'Phát triển mạng lưới rộng khắp 63 tỉnh thành trên toàn quốc với gần 100 văn phòng đại diện chính thức. Bên cạnh đó, hệ thống còn triển khai hàng trăm trung tâm hỗ trợ bồi thường chuyên nghiệp nhằm phục vụ và bảo vệ quyền lợi tối đa cho khách hàng.',
      highlightsEn: [
        'Expanded financial agency network across all 63 provinces and cities in Vietnam',
        'Scaled to nearly 100 official representative offices and branch locations',
        'Deployed hundreds of dedicated Customer Claim Support Centers nationwide',
        'Forged strategic distribution partnerships with leading insurers such as PVI Insurance',
        'Featured by global business and governmental media (Doanh Nhân Toàn Cầu, PVN, Ninh Thuan TV)',
      ],
      highlightsVi: [
        'Phát triển mạng lưới rộng khắp 63 tỉnh thành trên toàn quốc',
        'Quy mô gần 100 văn phòng đại diện chính thức hoạt động chuyên nghiệp',
        'Triển khai hàng trăm trung tâm hỗ trợ bồi thường tận tâm phục vụ khách hàng',
        'Hợp tác chiến lược toàn diện với các định chế bảo hiểm hàng đầu (Bảo hiểm PVI)',
        'Được Doanh Nhân Toàn Cầu, Báo PVN, Đài PT-TH Ninh Thuận ghi nhận và đưa tin',
      ],
      articleUrl: 'https://doanhnhantoancau.net/tca-tung-bung-khai-truong-van-phong-moi.html',
      pressSource: 'Doanh Nhân Toàn Cầu & Báo PVN',
      pressTitle: 'TCA tưng bừng khai trương văn phòng mới & Hợp tác chiến lược bảo hiểm',
      year: '2014 – 2024',
      badge: 'Mạng Lưới 63 Tỉnh Thành',
    },
    {
      id: 'dt-h2y-vietnam-platform',
      categoryEn: 'Platform Advisory & Commercial Setup',
      categoryVi: 'Tư Vấn & Thiết Lập Nền Tảng',
      titleEn: 'Establishment and Advisory for the H2Y Platform in Vietnam in Initial Stage',
      titleVi: 'Thiết lập và tư vấn tạo dựng nền tảng H2Y tại Việt Nam thời gian đầu',
      summaryEn:
        'Advised and established the foundational commercial and digital ecosystem for the H2Y platform in Vietnam during its initial phase. Connected supply chain networks, digital commerce, and lifestyle/beauty technology exhibitions (such as Beauty Inside You 2023).',
      summaryVi:
        'Thiết lập và tư vấn tạo dựng nền tảng H2Y tại Việt Nam thời gian đầu: Xây dựng chiến lược phân phối, kết nối chuỗi cung ứng thương mại và chuỗi sự kiện xúc tiến thương mại công nghệ làm đẹp (tiêu biểu như Triển lãm Beauty Inside You 2023).',
      highlightsEn: [
        'Strategic consulting and foundational architecture for H2Y platform in Vietnam',
        'Bridged high-tech commercial distribution, cosmetics supply chain, and digital retail',
        'Coordinated major experiential trade show "Beauty Inside You 2023"',
        'Published and covered by Tien Phong Newspaper (TienPhong.vn)',
      ],
      highlightsVi: [
        'Tư vấn chiến lược và thiết lập nền tảng H2Y tại Việt Nam trong giai đoạn khởi tạo',
        'Kết nối chuỗi cung ứng, thương mại điện tử và giải pháp phân phối ngành làm đẹp',
        'Đồng hành tổ chức sự kiện triển lãm xúc tiến "Beauty Inside You 2023"',
        'Được Báo Tiền Phong (TienPhong.vn) ghi nhận và đưa tin chính thống',
      ],
      articleUrl: 'https://tienphong.vn/beauty-inside-you-2023-trien-lam-my-pham-khoi-day-moi-giac-quan-post1521299.tpo',
      pressSource: 'Báo Tiền Phong',
      pressTitle: 'Beauty Inside You 2023: Triển lãm mỹ phẩm khơi dậy mọi giác quan & Nền tảng H2Y',
      year: '2023',
      badge: 'Nền Tảng H2Y',
    },
  ],
  otherActivities: [
    {
      en: 'Active participation in social, community, and humanitarian initiatives.',
      vi: 'Tham gia tích cực vào các hoạt động xã hội và thiện nguyện vì cộng đồng.',
    },
    {
      en: 'Connecting high-level networks (CEOs, industry leaders, Olympians).',
      vi: 'Kết nối mạng lưới lãnh đạo cấp cao, chuyên gia, CEO và các tuyển thủ Olympic.',
    },
    {
      en: 'Consulting affiliate and interdisciplinary programs (Corporate Law, Technology, AI).',
      vi: 'Cố vấn các chương trình liên kết đào tạo chuyên sâu (Luật Doanh nghiệp, Công nghệ, AI).',
    },
    {
      en: 'Co-founder of the "Economics Club" for students and young entrepreneurs.',
      vi: 'Đồng sáng lập "Câu lạc bộ Kinh tế" dành cho sinh viên và nhà khởi nghiệp trẻ.',
    },
    {
      en: 'Professional references available upon request.',
      vi: 'Thông tin người tham chiếu sẽ được cung cấp đầy đủ khi có yêu cầu.',
    },
  ],
};
