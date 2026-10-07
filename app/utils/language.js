// Get user's language setting from localStorage
export const getUserLanguage = () => {
  try {
    const language = localStorage.getItem('itealab_language')
    if (language) {
      return language
    }
    
    // Fallback to browser language
    const browserLang = navigator.language.slice(0, 2)
    const supportedLangs = ['en', 'vi', 'ja']
    
    return supportedLangs.includes(browserLang) ? browserLang : 'en'
  } catch (err) {
    console.error('Failed to get language setting:', err)
    return 'en'
  }
}

// Set user's language preference
export const setUserLanguage = (language) => {
  try {
    localStorage.setItem('itealab_language', language)
    console.log(`🌐 Language set to: ${language}`)
    
    // Dispatch event for cross-component reactivity
    window.dispatchEvent(new CustomEvent('languageChanged', { 
      detail: { language } 
    }))
  } catch (err) {
    console.error('Failed to update language setting:', err)
  }
}

// Language configuration
export const languageConfig = {
  en: { name: 'English', flag: '🇺🇸', rtl: false },
  vi: { name: 'Tiếng Việt', flag: '🇻🇳', rtl: false },
  ja: { name: '日本語', flag: '🇯🇵', rtl: false }
}

// Complete translation dictionary
const translations = {
  en: {
    // Common
    'language': 'Language',
    'loading': 'Loading...',
    'error': 'Error',
    'success': 'Success',
    
    // Navigation
    'home': 'Home',
    'about': 'About',
    'what_we_do': 'What We Do',
    'how_we_work': 'How We Work',
    'how_our_team_work': 'How Our Team Work',
    'news': 'News',
    'join_us': 'Join Us',
    
    // Hero Section
    'welcome_title': 'Welcome to',
    'welcome_subtitle': 'Innovation through Technology and Education',
    'welcome_description': 'We are a forward-thinking laboratory focused on advancing technology and education through innovative research and collaborative projects.',
    
    // About Section
    'about_title': 'About Us',
    'about_description': 'Learn more about our mission and vision',
    
    // What We Do Section
    'what_we_do_title': 'What We Do',
    'what_we_do_description': 'Discover our innovative projects and research',
    
    // How We Work Section
    'how_we_work_title': 'How Our Team Works',
    'how_we_work_description': 'Learn about our collaborative approach',
    
    // News Section
    'news_title': 'Latest News',
    'news_description': 'Stay updated with our latest developments',
    
    // Join Us Section
    'join_us_title': 'Join Us',
    'join_us_description': 'Become part of our innovative team',
    
    // Footer
    'contact_us': 'Contact Us',
    'follow_us': 'Follow Us',
    'all_rights_reserved': 'All rights reserved',
    
    // About Section Details
    'about_us': 'About US',
    'our_vision': 'Our VISION',
    'about_description_long': 'ITea Lab is a community built from a group of Computer Science students at Swinburne Vietnam, dedicated to cutting-edge research and development in technology.',
    'vision_description': 'To further expand the community and cultivate an inclusive space where Computer Science students can explore, research, and exchange knowledge, fostering connections among curious and passionate CS minds across all boundaries.',
    
    // Timeline
    'conception': 'Conception Day',
    'conception_desc': 'The idea of an association for CS students suggested by Ms.Pascale Quester',
    'it_student_association': 'IT Student Association',
    'it_student_desc': 'Formed and recruited Gen 1 in Feb 2024, focusing on doing projects. Represented Swinburne Vietnam CS at ACS accreditation',
    'swinburne_it_lab': 'Swinburne IT Lab',
    'swinburne_desc': 'Represented Swinburne Vietnam CS at ExDays and Conception Day. We participated in some of our first Akathon/Hackathon to test our skill and later, part of our core team joined First Cloud Journey to expand their cloud skill set',
    'itea_lab_community': 'ITea Lab Community',
    'community_desc': 'We re-branded our CS community. Began organising more workshops and start recruiting Gen 2',
    'future_roadmap': 'Future Roadmap',
    'future_desc': 'As the number of member grow, we become semi-independent, collaborating with outside firms while representing CS students at Swinburne Vietnam.',
    'present': 'Present',
    'early_2025': 'Early 2025',
    'early_2024': 'Early 2024',
    'our_journey': 'Our JOURNEY',
    'journey_description': 'From humble beginnings to a thriving community, explore our journey through the years.',
    
    // How Our Team Works Section
    'how_team_work_title': 'HOW OUR TEAM WORK',
    'how_team_work_description': 'At ITea Lab, we embrace challenges, diversity, and creativity in our work environment.',
    'research_driven': 'Research-Driven',
    'research_driven_desc': 'We balance academic rigor with practical applications, publishing our findings and contributing to open-source projects.',
    'agile_methodology': 'Agile Methodology',
    'agile_methodology_desc': 'We embrace iterative development, continuous feedback, and adaptive planning to deliver exceptional results.',
    'flexible_work': 'Flexible Work',
    'flexible_work_desc': 'We support remote work and flexible schedules, focusing on outcomes rather than hours spent at a desk.',
    'continuous_growth': 'Continuous Growth',
    'continuous_growth_desc': 'We invest in our team\'s development through conferences, courses, and dedicated learning time.',
    
    // What We Do Section
    'what_we_do_title': 'WHAT WE DO',
    'what_we_do_desc': 'We bring tech to life through hands-on workshops, meaningful community projects, and fun team activities that build real connections. It\'s not just about coding—it\'s about creating together, solving problems that matter, and having a blast while we do it.',
    'workshops': 'Workshops',
    'git_github_workshop': 'Git & GitHub Workshop',
    'amazon_q_workshop': 'Amazon Q Workshop',
    'docker_workshop': 'Docker Workshop',
    
    // Join Us Section
    'drop_us_line': 'DROP US A LINE',
    'introduce_yourself': 'Introduce yourself and your enthusiasm. We are eager to learn about your creative journey and the inspiration behind your work.',
    'your_name': 'Your name',
    'name_placeholder': 'Tell us what we should call you',
    'your_email': 'Your email',
    'email_placeholder': 'Your email',
    'your_message': 'Your message (optional)',
    'message_placeholder': 'Tell us about yourself and why you\'re interested',
    'add_ons': 'Add-Ons',
    'join_us_button': 'Join Us',
    'estimated_respond': 'Estimated respond time → within an hour',
    'or_email_us': 'or email us at',
    'web_development': 'Web Development',
    'mobile_apps': 'Mobile Apps',
    'cloud_computing': 'Cloud Computing',
    'data_science': 'Data Science',
    'devops': 'DevOps',
    'ui_ux_design': 'UI/UX Design',
    'machine_learning': 'Machine Learning',
    'cybersecurity': 'Cybersecurity',
    
    // News Section
    'itea_lab_news': 'ITEA LAB NEWS',
    'news_subtitle': 'Stay updated with the latest happenings at our community.',
    'news_title_1': 'ITea Lab Talents Build Chongluadao.vn AI Tool, Gain National Recognition',
    
    // Footer Section
    'footer_message': 'We build digital solutions that help communities navigate the tech landscape',
    'more_information': 'More information:',
    'solutions': 'Solutions',
    'ecosystem': 'Ecosystem',
    'company': 'Company',
    'our_community': 'Our Community',
    'events': 'Events',
    'tech_dive_2025': 'Tech Dive 2025',
    'vietnam_projects': 'Vietnam Projects',
    'academy': 'Academy',
    'documentation': 'Documentation',
    'media_kit': 'Media Kit',
    'roadmap_2025': 'Roadmap 2025',
    'company_brochure': 'Company Brochure',
    'itea_circles': 'ITea Circles',
    'our_team': 'Our Team',
    'get_involved': 'Get Involved',
    'copyright': 'Copyright ITea Lab 2025',
    'privacy_policy': 'Privacy Policy',
    'cookies_policy': 'Cookies Policy',
  },
  
  vi: {
    // Common
    'language': 'Ngôn ngữ',
    'loading': 'Đang tải...',
    'error': 'Lỗi',
    'success': 'Thành công',
    
    // Navigation
    'home': 'Trang chủ',
    'about': 'Giới thiệu',
    'what_we_do': 'Hoạt động',
    'how_we_work': 'Cách tụi mình làm việc',
    'how_our_team_work': 'Cách team tụi mình làm việc',
    'news': 'Tin tức',
    'join_us': 'Gia nhập lab',
    
    // Hero Section
    'welcome_title': 'Chào mừng đến với',
    'welcome_subtitle': 'Đổi mới thông qua Công nghệ và Học tập',
    'welcome_description': 'Chúng mình là một cộng đồng sinh viên công nghệ năng động, cùng nhau học hỏi, nghiên cứu và phát triển thông qua các dự án thực tế.',
    
    // About Section
    'about_title': 'Về ITea Lab',
    'about_description': 'Tìm hiểu thêm về sứ mệnh và định hướng của chúng mình',
    
    // What We Do Section
    'what_we_do_title': 'HOẠT ĐỘNG CỦA LAB',
    'what_we_do_description': 'Khám phá các dự án sáng tạo và hoạt động nghiên cứu của tụi mình',
    
    // How We Work Section
    'how_we_work_title': 'Cách lab chúng mình làm việc',
    'how_we_work_description': 'Khám phá văn hóa làm việc và chia sẻ của team',
    
    // News Section
    'news_title': 'Tin tức mới nhất',
    'news_description': 'Cập nhật những hoạt động nổi bật của lab',
    
    // Join Us Section
    'join_us_title': 'Tham gia vào ITea Lab',
    'join_us_description': 'Trở thành một phần của cộng đồng chúng mình',
    
    // Footer
    'contact_us': 'Liên hệ',
    'follow_us': 'Theo dõi hoạt động của lab',
    'all_rights_reserved': 'Bản quyền thuộc về ITea Lab',
    
    // About Section Details
    'about_us': 'Về ITea Lab',
    'our_vision': 'TẦM NHÌN',
    'about_description_long': 'ITea Lab là cộng đồng công nghệ được lập nền bởi nhóm sinh viên ngành Khoa học Máy tính tại Swinburne Vietnam, những người cùng chung niềm đam mê nghiên cứu và phát triển phần mềm.',
    'vision_description': 'Mở rộng cộng đồng và xây dựng một không gian cởi mở, nơi sinh viên Khoa học Máy tính có thể tự do tìm tòi, nghiên cứu và trao đổi kiến thức; kết nối những tâm hồn trẻ luôn tò mò và giàu niềm đam mê với công nghệ.',
    // Timeline
    'conception': 'Khởi nguồn ý tưởng',
    'conception_desc': 'Ý tưởng về một cộng đồng học thuật dành cho sinh viên CS được cô Pascale Quester gợi ý từ buổi tham quan khai giảng.',
    'it_student_association': 'Hội sinh viên CNTT',
    'it_student_desc': 'Được thành lập cùng lứa Gen 1 vào tháng 2/2024, tụi mình tập trung thực hiện các dự án IoT nhỏ và đại diện sinh viên CS Swinburne Vietnam trong kỳ kiểm định ACS.',
    'swinburne_it_lab': 'Swinburne IT Lab',
    'swinburne_desc': 'Đại diện sinh viên CS tại các sự kiện ExDays và Conception Day của trường. Tụi mình bắt đầu thử sức ở các cuộc thi học thuật, Hackathon; sau đó các thành viên core tiếp tục tham gia First Cloud Journey bootcamp để nâng cao kỹ năng về Cloud.',
    'itea_lab_community': 'Cộng đồng ITea Lab',
    'community_desc': 'Tụi mình chính thức định vị lại thương hiệu ITea Lab, đẩy mạnh tổ chức các buổi workshop chuyên môn cho sinh viên và mở đợt tuyển Gen 2.',
    'future_roadmap': 'Định hướng tương lai',
    'future_desc': 'Khi cộng đồng ngày càng lớn mạnh, lab hướng tới mô hình bán độc lập, tích cực kết nối với các doanh nghiệp bên ngoài và tiếp tục là cầu nối đại diện cho sinh viên CS Swinburne Vietnam.',
    'present': 'Hiện tại',
    'early_2025': 'Đầu năm 2025',
    'early_2024': 'Đầu năm 2024',
    'our_journey': 'HÀNH TRÌNH CỦA CHÚNG MÌNH',
    'journey_description': 'Từ những bước đi đầu tiên đến một cộng đồng gắn kết như hôm nay, cùng nhìn lại hành trình của chúng mình qua từng cột mốc.',
    
    // How Our Team Works Section
    'how_team_work_title': 'CÁCH ĐỘI NGŨ CHÚNG MÌNH LÀM VIỆC',
    'how_team_work_description': 'Tại ITea Lab, tụi mình luôn sẵn sàng đón nhận thử thách, trân trọng sự đa dạng và khuyến khích sáng tạo trong từng dự án.',
    'research_driven': 'TẬP TRUNG NGHIÊN CỨU',
    'research_driven_desc': 'Chúng mình cân bằng giữa nền tảng học thuật và ứng dụng thực tiễn, tích cực chia sẻ kết quả nghiên cứu và đóng góp cho các dự án mã nguồn mở.',
    'agile_methodology': 'Phương pháp Agile',
    'agile_methodology_desc': 'Tụi mình áp dụng phát triển lặp, liên tục lắng nghe phản hồi và thích ứng linh hoạt để đem lại sản phẩm chỉn chu nhất.',
    'flexible_work': 'Làm việc linh hoạt',
    'flexible_work_desc': 'Chúng mình không bị gò bó bởi thời gian hay không gian làm việc, mà luôn ưu tiên chất lượng kết quả và tinh thần chủ động.',
    'continuous_growth': 'Học hỏi không ngừng',
    'continuous_growth_desc': 'Tụi mình luôn tạo điều kiện cho các thành viên phát triển bản thân qua các buổi workshop, khóa học và thời gian tự nghiên cứu chuyên sâu.',
    
    // What We Do Section
    'what_we_do_title': 'HOẠT ĐỘNG CỦA CHÚNG MÌNH',
    'what_we_do_desc': 'Chúng mình mang công nghệ vào đời sống qua các workshop thực hành, dự án cộng đồng ý nghĩa và những buổi sinh hoạt gắn kết. Không chỉ là viết code—đó là cùng nhau sáng tạo, giải quyết những bài toán thực tế và tận hưởng trọn vẹn niềm vui học hỏi.',
    'workshops': 'Workshop',
    'git_github_workshop': 'Workshop Git & GitHub',
    'amazon_q_workshop': 'Workshop Amazon Q',
    'docker_workshop': 'Workshop Docker',
    
    // Join Us Section
    'drop_us_line': 'KẾT NỐI VỚI LAB',
    'introduce_yourself': 'Hãy giới thiệu đôi nét về bản thân nhé! ITea Lab rất hào hứng được lắng nghe về hành trình và niềm đam mê công nghệ của bạn.',
    'your_name': 'Tên của bạn',
    'name_placeholder': 'Cho chúng mình biết nên gọi bạn là gì',
    'your_email': 'Email của bạn',
    'email_placeholder': 'username@gmail.com',
    'your_message': 'Lời nhắn (tùy chọn)',
    'message_placeholder': 'Chia sẻ đôi chút về bản thân bạn hoặc lý do bạn muốn đồng hành cùng lab',
    'add_ons': 'Lĩnh vực quan tâm',
    'join_us_button': 'Gia nhập cộng đồng',
    'estimated_respond': 'Thời gian phản hồi dự kiến → trong vòng 1 giờ',
    'or_email_us': 'hoặc gửi email cho tụi mình tại',
    'web_development': 'Phát triển Web',
    'mobile_apps': 'Ứng dụng Di động',
    'cloud_computing': 'Điện toán Đám mây',
    'data_science': 'Khoa học Dữ liệu',
    'devops': 'DevOps',
    'ui_ux_design': 'Thiết kế UI/UX',
    'machine_learning': 'Học máy & AI',
    'cybersecurity': 'An toàn Thông tin',
    
    // News Section
    'itea_lab_news': 'TIN TỨC TỪ ITEA LAB',
    'news_subtitle': 'Cập nhật những hoạt động mới nhất của lab.',
    'news_title_1': 'Thành viên ITea Lab phát triển công cụ AI cho Chongluadao.vn, ghi dấu ấn trên toàn quốc',
    
    // Footer Section
    'footer_message': 'Chúng mình tạo ra các giải pháp số thiết thực, giúp các bạn trẻ tự tin làm chủ công nghệ.',
    'more_information': 'Thông tin thêm:',
    'solutions': 'Dự án',
    'ecosystem': 'Hệ sinh thái',
    'company': 'Về Lab',
    'our_community': 'Cộng đồng ITea Lab',
    'events': 'Sự kiện',
    'tech_dive_2025': 'Tech Dive 2025',
    'vietnam_projects': 'Dự án tại Việt Nam',
    'academy': 'Học thuật',
    'documentation': 'Tài liệu',
    'media_kit': 'Media Kit',
    'roadmap_2025': 'Lộ trình 2025',
    'company_brochure': 'Hồ sơ giới thiệu Lab',
    'itea_circles': 'ITea Circles',
    'our_team': 'Team của chúng mình',
    'get_involved': 'Tham gia cùng tụi mình',
    'copyright': 'Bản quyền ITea Lab 2025',
    'privacy_policy': 'Chính sách bảo mật',
    'cookies_policy': 'Chính sách Cookie',
  },
  
  ja: {
    // Common
    'language': '言語',
    'loading': '読み込み中...',
    'error': 'エラー',
    'success': '成功',
    
    // Navigation
    'home': 'ホーム',
    'about': 'ラボについて',
    'what_we_do': '活動内容',
    'how_we_work': '私たちの働き方',
    'how_our_team_work': 'チームカルチャー',
    'news': 'ニュース',
    'join_us': '参加する',
    
    // Hero Section
    'welcome_title': 'ようこそ',
    'welcome_subtitle': '技術と学びを通じたイノベーション',
    'welcome_description': '私たちは、実践的な研究と協同プロジェクトを通じて、テクノロジーと教育の発展を目指す学生主体のテックコミュニティです。',
    
    // About Section
    'about_title': '私たちについて',
    'about_description': 'ITea Labのミッションとビジョンをご紹介します',
    
    // What We Do Section
    'what_we_do_title': '私たちの取り組み',
    'what_we_do_description': '実践的なプロジェクトや研究活動をご紹介します',
    
    // How We Work Section
    'how_we_work_title': '私たちの働き方',
    'how_we_work_description': 'コラボレーションと学びを重視するカルチャー',
    
    // News Section
    'news_title': '最新ニュース',
    'news_description': 'ラボの最新トピックや活動報告をお届けします',
    
    // Join Us Section
    'join_us_title': 'メンバー募集',
    'join_us_description': 'ITea Labの一員として一緒に活動しませんか？',
    
    // Footer
    'contact_us': 'お問い合わせ',
    'follow_us': '最新情報をチェック',
    'all_rights_reserved': 'All rights reserved',
    
    // About Section Details
    'about_us': 'ITea Labについて',
    'our_vision': '私たちのビジョン',
    'about_description_long': 'ITea Labは、Swinburne Vietnamのコンピュータサイエンス専攻の学生たちによって設立されたテックコミュニティです。最先端技術の研究開発に情熱を持って取り組んでいます。',
    'vision_description': 'コミュニティの輪を広げ、CSを学ぶ学生たちが自由に探求・研究・知見の共有ができるオープンな場を築くこと。好奇心と情熱にあふれる仲間たちをつなぎ、共に成長できる環境を目指しています。',
    
    // Timeline
    'conception': '設立のきっかけ',
    'conception_desc': 'Pascale Quester教授の提案を受け、CS学生のためのコミュニティ構想がスタート',
    'it_student_association': 'IT学生協会を発足',
    'it_student_desc': '2024年2月に第1期生（Gen 1）を発足し、実践プロジェクトに着手。ACS認定審査においてSwinburne Vietnam CS専攻の代表を務める',
    'swinburne_it_lab': 'Swinburne ITラボ',
    'swinburne_desc': 'ExDaysやConception DayでCS代表として出展。ハッカソン等に挑戦して腕を磨き、コアメンバーはFirst Cloud Journeyに参加してクラウド技術を習得',
    'itea_lab_community': 'ITea Labコミュニティ',
    'community_desc': 'ITea Labとしてリブランディング。技術ワークショップの定期開催と第2期生（Gen 2）の募集を開始',
    'future_roadmap': '今後のロードマップ',
    'future_desc': 'コミュニティの規模拡大に伴い半独立型の組織へ発展。外部企業と連携しつつ、Swinburne VietnamのCS学生を代表する存在へ',
    'present': '現在',
    'early_2025': '2025年初頭',
    'early_2024': '2024年初頭',
    'our_journey': 'これまでの歩み',
    'journey_description': '小さな一歩から始まったITea Labのこれまでの軌跡と成長の歩みをご紹介します。',
    
    // How Our Team Works Section
    'how_team_work_title': 'チームカルチャー',
    'how_team_work_description': 'ITea Labでは、挑戦・多様性・創造性を大切にするオープンな活動環境を築いています。',
    'research_driven': '研究・実践志向',
    'research_driven_desc': 'アカデミックな探求と実用的なものづくりを両立し、知見の発信やオープンソースへの貢献に取り組んでいます。',
    'agile_methodology': 'アジャイルなアプローチ',
    'agile_methodology_desc': '反復型の開発とフィードバックの共有を重視し、柔軟な計画でスピーディに成果を出します。',
    'flexible_work': '自由で柔軟な活動スタイル',
    'flexible_work_desc': 'リモート活動や柔軟なスケジュールを導入し、活動時間よりも成果と自発性を重んじています。',
    'continuous_growth': '継続的な成長',
    'continuous_growth_desc': '勉強会やカンファレンス参加、専任の学習時間を通じて、メンバー一人ひとりの成長を応援しています。',
    
    // What We Do Section
    'what_we_do_title': '私たちの取り組み',
    'what_we_do_desc': 'ハンズオンワークショップ、実践的な開発プロジェクト、親睦を深めるチームイベントを通じて、生きたテクノロジーを体験します。ただコードを書くだけでなく、共に創り、課題を解決し、楽しみながら成長するコミュニティです。',
    'workshops': 'ワークショップ',
    'git_github_workshop': 'Git & GitHub ワークショップ',
    'amazon_q_workshop': 'Amazon Q ワークショップ',
    'docker_workshop': 'Docker ワークショップ',
    
    // Join Us Section
    'drop_us_line': 'お問い合わせ・参加希望',
    'introduce_yourself': '自己紹介や興味のある分野を教えてください。あなたのものづくりへの情熱やアイデアを共有できるのを楽しみにしています。',
    'your_name': 'お名前',
    'name_placeholder': 'お名前・ニックネームをご記入ください',
    'your_email': 'メールアドレス',
    'email_placeholder': 'username@gmail.com',
    'your_message': 'メッセージ（任意）',
    'message_placeholder': '自己紹介や興味のある技術、参加への想いをお聞かせください',
    'add_ons': '興味のある分野',
    'join_us_button': 'コミュニティに参加する',
    'estimated_respond': '通常1時間以内に返信いたします',
    'or_email_us': 'またはメールでのお問い合わせ',
    'web_development': 'ウェブ開発',
    'mobile_apps': 'モバイルアプリ',
    'cloud_computing': 'クラウドコンピューティング',
    'data_science': 'データサイエンス',
    'devops': 'DevOps',
    'ui_ux_design': 'UI/UXデザイン',
    'machine_learning': '機械学習・AI',
    'cybersecurity': 'サイバーセキュリティ',
    
    // News Section
    'itea_lab_news': 'ITea Lab ニュース',
    'news_subtitle': 'ITea Labの最新活動やトピックをお届けします。',
    'news_title_1': 'ITea LabメンバーがChongluadao.vnのAIツールを開発、全国的な注目を集める',
    
    // Footer Section
    'footer_message': 'テクノロジーの急速な進化の中で、学生たちが技術を自在に乗りこなせるよう支援するソリューションを開発しています。',
    'more_information': '詳細情報：',
    'solutions': 'プロジェクト',
    'ecosystem': 'エコシステム',
    'company': 'ラボについて',
    'our_community': 'ITea Labコミュニティ',
    'events': 'イベント',
    'tech_dive_2025': 'Tech Dive 2025',
    'vietnam_projects': 'ベトナムプロジェクト',
    'academy': 'アカデミー',
    'documentation': 'ドキュメント',
    'media_kit': 'メディアキット',
    'roadmap_2025': 'ロードマップ2025',
    'company_brochure': 'ラボ紹介資料',
    'itea_circles': 'ITea Circles',
    'our_team': 'メンバー紹介',
    'get_involved': '参加・協力',
    'copyright': 'Copyright ITea Lab 2025',
    'privacy_policy': 'プライバシーポリシー',
    'cookies_policy': 'クッキーポリシー',
  }
}

// Get translation for a key
export const t = (key, params = {}) => {
  const language = getUserLanguage()
  const translation = translations[language]?.[key] || translations.en[key] || key
  
  // Simple parameter replacement for dynamic content
  if (params && Object.keys(params).length > 0) {
    return translation.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] || match
    })
  }
  
  return translation
}

// Get language info
export const getLanguageInfo = (targetLanguage = null) => {
  const language = targetLanguage || getUserLanguage()
  return languageConfig[language] || languageConfig.en
}

// Initialize language system
export const initializeLanguage = async () => {
  if (typeof window === 'undefined') return // Skip on server-side
  
  const userLanguage = getUserLanguage()
  console.log(`🌐 Initializing language system with: ${userLanguage}`)
  
  // Set document language for accessibility
  document.documentElement.lang = userLanguage
  
  // Set text direction (none of our current languages are RTL)
  const langInfo = getLanguageInfo(userLanguage)
  document.documentElement.dir = langInfo.rtl ? 'rtl' : 'ltr'
}