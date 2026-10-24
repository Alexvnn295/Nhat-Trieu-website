import { BlogPost, Project, Product, GalleryMediaItem } from '../types';

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'so-du-tai-khoan-khong-noi-len-ban-giau-hay-ngheo',
    title: 'Số dư tài khoản không nói lên bạn giàu hay nghèo',
    category: 'Kinh tế',
    date: '30 Thg 09, 2026',
    excerpt: 'Anh Tân đi xe mới, điện thoại đời mới nhất, nhưng mỗi tháng è cổ trả góp và tài sản ròng âm. Chị Mai đi xe máy cũ, không nợ một đồng và có sổ tiết kiệm dự phòng. Sự khác biệt nằm ở tài sản ròng, không phải số dư tài khoản ngày lương về.',
    content: `Có lần đi ăn đám cưới, tôi ngồi cùng bàn với anh Tân — dân kinh doanh, ăn mặc chỉn chu, đi xe mới, điện thoại đời mới nhất, kể chuyện làm ăn nghe rôm rả cả bàn. Ai cũng trầm trồ, có người còn hỏi nhỏ "chắc giàu lắm hen". Anh Tân cười xòa, không xác nhận cũng không phủ nhận, kiểu cười mà ai cũng tự hiểu là "chắc vậy rồi".

Sáu tháng sau tôi tình cờ gặp lại, nghe chuyện mới biết: cái xe đó đang trả góp, mỗi tháng è cổ gần một phần ba thu nhập. Cái điện thoại cũng trả góp nốt. Thẻ tín dụng xài tới hạn mức, tháng nào cũng đóng lãi tối thiểu. Tài khoản ngân hàng thì lúc có lúc không, có đợt lương về cái là trừ nợ gần hết, còn lại vài triệu sống cầm chừng tới tháng sau.

Ngồi cạnh anh Tân hôm đám cưới đó còn có chị Mai, làm kế toán cho một công ty nhỏ, lương không cao, đi chiếc xe máy cũ mèm, hôm đó mặc bộ đồ mua từ ba năm trước. Chẳng ai nghĩ chị "giàu" cả. Nhưng chị Mai không nợ ai một đồng, có một mảnh đất nhỏ ở quê đứng tên mình, và một khoản tiết kiệm đủ sống sáu tháng nếu công ty có sa thải ngày mai. Nhìn bề ngoài, chị Mai chẳng có gì để trầm trồ. Nhưng nếu hỏi ai đang "giàu" hơn theo đúng nghĩa — ai có nhiều lựa chọn hơn, ai ít phải lo sợ hơn khi có chuyện bất trắc xảy tới — thì câu trả lời không khó đoán.

### Cái bẫy của vẻ ngoài: Thu nhập cao không đồng nghĩa với Giàu có
Đây chính là cái bẫy lớn nhất khi người ta nhìn vào số dư tài khoản, hay tệ hơn là nhìn vào những thứ người khác đang sở hữu, để đoán xem ai giàu ai nghèo. Số dư trong tài khoản chỉ là một con số tại một thời điểm — nó không nói cho bạn biết đằng sau con số đó là bao nhiêu khoản nợ đang chờ tới hạn. Cái xe, cái điện thoại, căn nhà đang ở — toàn là những thứ có thể đang thuộc về ngân hàng nhiều hơn là thuộc về người đang sử dụng chúng.

Cái mà anh Tân có, gọi đúng tên, là thu nhập cao và lối sống theo kịp thu nhập đó — nhưng tài sản ròng, tức là lấy những gì anh sở hữu trừ đi những gì anh còn nợ, có khi lại là một con số âm. Cái mà chị Mai có là tài sản ròng dương, dù nhỏ, nhưng là của thật, không ai đòi lại được. Một người trông giàu nhưng đang gánh rủi ro rất lớn. Một người trông bình thường nhưng đang đứng vững hơn nhiều.

Chúng ta hay bị con số trong tài khoản, hay những món đồ phô ra bên ngoài, đánh lừa — kể cả tự đánh lừa chính mình. Tháng nào lương về, tài khoản đầy lên, người ta dễ có cảm giác "mình đang khá lên", rồi tự thưởng cho bản thân một món gì đó. Nhưng nếu tháng đó cũng là tháng phải trả góp, trả lãi, trả nợ bạn bè, thì cái cảm giác khá lên đó chỉ là ảo giác kéo dài đúng vài ngày đầu tháng, trước khi các khoản trừ tự động chạy vào.

### Tài sản ròng: Thước đo thực sự của sự độc lập tài chính
Sự khác biệt thật sự không nằm ở việc bạn đang cầm bao nhiêu tiền trong tay lúc này, mà nằm ở hướng đi của toàn bộ bức tranh tài chính: mỗi tháng, tài sản ròng của bạn đang nhích lên hay đang lún xuống. Một người lương thấp nhưng tài sản ròng cứ nhích lên đều đặn mỗi năm, về lâu dài sẽ vượt xa một người lương cao nhưng tài sản ròng cứ lình xình quanh số không, hoặc tệ hơn là âm dần vì nợ chồng nợ.

Cũng đừng hiểu lầm rằng nợ nào cũng xấu. Nợ để mua một tài sản có khả năng sinh lời, hay để đầu tư vào thứ giúp bạn kiếm ra nhiều tiền hơn, là chuyện khác. Nhưng nợ để mua một chiếc xe mất giá dần theo từng năm, một chiếc điện thoại chỉ để chụp ảnh sang hơn, thì đó là nợ đang âm thầm kéo tài sản ròng của bạn đi xuống, trong khi tài khoản vẫn có tiền chảy qua chảy lại mỗi tháng, tạo cảm giác mọi thứ vẫn ổn.

### Đừng để số dư tài khoản hôm nay đánh lừa bạn
Vậy làm sao để không bị chính con số trong tài khoản đánh lừa? Cách đơn giản nhất là, thay vì chỉ nhìn số dư, thử ngồi liệt kê một lần: mình đang sở hữu những gì có giá trị thật, và mình đang nợ những gì. Lấy cái trước trừ cái sau, ra một con số — đó mới là con số đáng để theo dõi mỗi tháng, chứ không phải số dư nhảy lên nhảy xuống theo ngày lương về hay ngày đóng tiền nhà.

Anh Tân không phải người xấu, cũng không phải người dại. Anh chỉ đang nhìn nhầm chỗ — nhìn vào số dư và vẻ ngoài, thay vì nhìn vào tài sản ròng và hướng đi của nó. Chị Mai cũng chẳng có bí quyết gì cao siêu — chị chỉ đơn giản là không để những món đồ phô trương kéo tài sản ròng của mình đi xuống, dù thu nhập của chị thấp hơn nhiều.

Cuối tháng này, thử dành mười lăm phút ngồi tính thật: mình đang sở hữu bao nhiêu, đang nợ bao nhiêu, và con số chênh lệch đó so với sáu tháng trước đang tốt lên hay xấu đi. Đừng nhìn vào số dư tài khoản ngày hôm nay để đánh giá mình giàu hay nghèo — hãy nhìn vào cái hướng mà tài sản ròng của mình đang đi.

---

### 💡 5 Đúc kết then chốt (Executive Hooks)
1. **Xe mới, điện thoại đời mới, ăn mặc chỉn chu — nhưng tài sản ròng của người đó có khi đang âm mà chẳng ai biết.**
2. **Tài khoản đầy lên mỗi khi lương về chỉ là ảo giác, nếu vài ngày sau các khoản trả góp lại rút gần hết.**
3. **Người lương thấp nhưng tài sản ròng nhích lên đều mỗi năm, cuối cùng sẽ vượt xa người lương cao nhưng nợ chồng nợ.**
4. **Không phải nợ nào cũng xấu — nhưng nợ để mua thứ mất giá dần thì đang âm thầm kéo bạn đi xuống mỗi tháng.**
5. **Đừng hỏi tài khoản có bao nhiêu tiền hôm nay. Hỏi tài sản ròng của mình đang đi lên hay đi xuống so với sáu tháng trước.**`,
    readTime: '5 phút đọc',
    tags: ['Finance', 'Operations', 'Business', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cao Nguyễn Nhật Triều - Quản trị tài chính cá nhân và tài sản ròng',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'tai-sao-cang-ban-cang-ngheo',
    title: 'Tại sao càng bận càng nghèo: Chiếc khăn bịt mắt của con lừa kéo cối xay',
    category: 'Vận hành',
    date: '30 Thg 09, 2026',
    excerpt: 'Con lừa bịt mắt đi mỏi chân cả ngày quanh cối xay, cuối ngày vẫn đứng nguyên chỗ cũ. Anh Long thợ giỏi tự làm mọi ca sửa xe, anh Hùng dạy học việc và nhân bản hệ thống. Bận rộn và tiến bộ là hai chuyện hoàn toàn khác nhau.',
    content: `Ngày xưa ở quê, nhà nào có cối xay bột bằng sức lừa kéo, người ta hay bịt mắt con lừa lại. Không phải để nó đỡ sợ, mà để nó khỏi... chóng mặt và bỏ chạy, vì nếu mở mắt ra nó sẽ thấy mình cứ đi vòng vòng quanh một cái trục, chẳng đi tới đâu cả. Bịt mắt vào, nó cứ ngỡ mình đang bước những bước dài trên một con đường thẳng tắp. Cả buổi trời, nó đi mỏi chân, đổ mồ hôi, thở hồng hộc — và cuối ngày vẫn đứng nguyên chỗ cũ, cách chỗ xuất phát đúng... nửa vòng cối xay.

Tôi kể chuyện con lừa này không phải để chê ai ngu, mà vì nó giống một cách đáng sợ với cách rất nhiều người đang "kiếm sống" mỗi ngày. Và để khỏi nói suông, tôi kể luôn một chuyện có thật ở gần khu tôi ở, chỉ đổi tên cho tiện.

Anh Long mở tiệm sửa xe máy nhỏ, mặt tiền hai mét rưỡi. Anh giỏi nghề, tay nghề trong xóm ai cũng biết, khách tới sửa xe là anh đích thân xem máy, báo giá, sửa, chạy thử, rồi thu tiền — hết. Quán đông khách tới mức có hôm khách phải dắt xe đứng chờ ngoài lề đường. Anh Long làm việc từ bảy giờ sáng tới chín giờ tối, gần như không nghỉ trưa, vì nghỉ là mất khách. Ba năm sau, tiệm vẫn y như cũ: vẫn một mình anh, vẫn cái tủ đồ nghề đó, vẫn hai mét rưỡi mặt tiền đó. Thu nhập có nhỉnh hơn hồi mới mở đôi chút, nhưng sức khỏe thì đi xuống rõ rệt — lưng đau, đầu gối mỏi vì suốt ngày cúi lom khom bên gầm xe.

Cách đó không xa, anh Hùng cũng mở tiệm sửa xe, tay nghề nói thật không bằng anh Long. Nhưng ngay từ đầu, anh Hùng làm một việc rất khác: anh nhận hai đứa học việc, dạy tụi nó sửa những lỗi thường gặp — thay nhớt, vá vỏ, thay bố thắng — còn anh chỉ đứng ra xử lý những ca khó, kiểm tra chất lượng, và quan trọng nhất là lo phần khách hàng: chăm sóc, giữ mối, mở rộng mặt bằng. Ba năm sau, tiệm anh Hùng có ba người làm, anh gần như không còn tự tay vặn ốc nữa, chỉ đứng giám sát và tính toán. Hôm nào anh nghỉ đi đám cưới bạn, tiệm vẫn mở, vẫn có tiền vào. Thu nhập của anh, tính ra, gấp mấy lần anh Long — dù tay nghề sửa xe của anh, tôi dám chắc, không bằng anh Long.

### Khác biệt cốt lõi: Tách thu nhập ra khỏi cơ thể
Khác biệt giữa hai người không nằm ở chuyện ai chăm hơn — anh Long chăm hơn hẳn, làm việc nhiều giờ hơn hẳn, mệt hơn hẳn. Khác biệt nằm ở chỗ: thu nhập của anh Long dính chặt vào chính đôi tay và cái lưng của anh, còn thu nhập của anh Hùng đã tách ra khỏi cơ thể anh từ lúc anh quyết định nhận học việc đầu tiên. Anh Long là con lừa chăm chỉ nhất xóm, kéo cối xay từ sáng tới tối. Anh Hùng là người đứng cạnh cối xay, chỉ việc cho lừa đi đúng hướng.

Cái bẫy nằm ở chỗ: khi thu nhập của bạn gắn chặt với số giờ bạn bỏ ra, trần thu nhập của bạn chính là hai mươi bốn tiếng một ngày — thứ duy nhất trên đời không ai xin thêm được, dù giàu cỡ nào. Anh Long càng sửa nhiều xe, càng mệt, nhưng thu nhập tối đa vẫn bị khóa cứng bởi sức một con người và số giờ trong ngày. Anh Hùng thì khác — anh nhân bản chính mình ra thành ba đôi tay, nên thu nhập của anh không còn bị khóa bởi cơ thể của riêng anh nữa.

### Cái bẫy giữa "Bận rộn" và "Tiến bộ"
Đây chính là chỗ nhiều người nhầm lẫn giữa "bận" và "tiến bộ". Bận là bạn đang di chuyển, đang tốn sức, đang đổ mồ hôi — anh Long bận hơn anh Hùng rất nhiều. Tiến bộ là khoảng cách thực sự bạn đi được so với điểm xuất phát — và ở khoản này, anh Hùng đã bỏ xa anh Long từ lâu, dù ngày đầu mở tiệm cả hai đứng ngang nhau.

Điều đáng lo hơn nữa là: sự bận rộn, giống như cái khăn bịt mắt, khiến người ta không còn thời gian hay tâm trí để dừng lại tự hỏi liệu vòng quay này có đang dẫn mình tới đâu không. Anh Long không sai khi giỏi nghề, không sai khi chăm chỉ. Cái anh thiếu là một khoảnh khắc dừng lại, tháo khăn bịt mắt ra, để thấy rằng có một cách khác để vận hành cái tiệm hai mét rưỡi đó — không cần chính tay mình cầm cờ lê ở mọi ca sửa xe.

### Làm sao để tháo chiếc khăn bịt mắt đó ra?
Không phải là bỏ việc, nghỉ ngơi vô thời hạn, chờ tiền tự nhiên rơi vào túi. Mà là bắt đầu để ý, trong tất cả những việc mình đang bận rộn mỗi ngày, việc nào đang gắn chặt thu nhập với đúng số giờ mình bỏ ra, và việc nào có thể tách dần ra khỏi thời gian cá nhân — một phần việc có thể dạy lại, một quy trình có thể ghi ra giấy cho người khác làm theo, một khách hàng có thể được chăm sóc bởi ai đó không phải là mình.

Không cần làm chuyện này một sớm một chiều — anh Hùng cũng mất cả năm mới dạy được hai đứa học việc làm đúng ý mình. Chỉ cần bắt đầu bằng một câu hỏi thành thật mỗi tuần: trong những việc mình vừa bận rộn, có việc nào, nếu làm thêm một lần nữa, sẽ mang lại thêm thu nhập mà không cần mình bỏ thêm y hệt số giờ đó không? Nếu câu trả lời toàn là không, có thể bạn đang là con lừa chăm chỉ nhất xóm — nhưng vẫn đang đứng nguyên chỗ cũ, chỉ khác là cái lưng ngày càng đau hơn.

Làm ít hơn, theo đúng nghĩa mà nhiều người hiểu lầm, không phải là bớt cố gắng. Nó là ngừng nhầm lẫn giữa việc bị bịt mắt chạy vòng quanh, với việc thực sự đang tiến về phía trước. Anh Long hoàn toàn có thể trở thành anh Hùng, chỉ cần một ngày nào đó anh chịu buông cây cờ lê ra một chút, đứng lùi lại, và nhìn thẳng vào cái trục mình đang xoay quanh suốt ba năm qua.

---

### 💡 5 Đúc kết then chốt (Executive Hooks)
1. **Con lừa kéo cối xay bận rộn cả ngày, đổ mồ hôi không ngừng — và cuối ngày vẫn đứng nguyên chỗ cũ.**
2. **Hai tiệm sửa xe, cùng mở một ngày, ba năm sau một tiệm vẫn y nguyên, một tiệm có ba người làm — khác biệt không nằm ở tay nghề.**
3. **Anh thợ giỏi nhất xóm chưa chắc là người giàu nhất xóm, nếu tay nghề đó chưa từng được tách khỏi chính đôi tay anh.**
4. **Hễ cơ thể nghỉ là tiền nghỉ theo — đó là cái giá của việc để thu nhập dính chặt vào chính mình.**
5. **Bận và tiến bộ là hai chuyện khác nhau. Một cái đo bằng mồ hôi, một cái đo bằng khoảng cách tới đích.**`,
    readTime: '6 phút đọc',
    tags: ['Operations', 'Leadership', 'Management', 'Startup'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cao Nguyễn Nhật Triều - Năng suất vận hành và thoát khỏi cái bẫy bận rộn',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'quy-luat-80-20-trong-doi-song-va-kinh-doanh',
    title: 'Quy luật 80/20: Tủ quần áo, cuộc họp và bài toán tối ưu năng lượng',
    category: 'Vận hành',
    date: '30 Thg 09, 2026',
    excerpt: 'Tủ đồ đầy trăm món nhưng chỉ mặc vài bộ ruột. Họp hai tiếng nhưng quyết định chốt trong mười phút cuối. 20% khách hàng gánh 80% doanh thu. Làm ít hơn không phải lười đi, mà là dừng đối xử cào bằng với những thứ vốn không đóng góp như nhau.',
    content: `Mở tủ quần áo ra mà xem — đồ chất đầy chật cứng, có khi cả trăm món, vậy mà nhìn kỹ lại, ngày nào cũng chỉ lấy đúng vài bộ "ruột" ra mặc. Cái áo mua hồi Tết năm ngoái, giá không rẻ, mặc đúng một lần rồi treo đó tới giờ vẫn còn nguyên tem. Hóa ra tủ đồ đầy vậy, chứ chỉ hai chục phần trăm số đồ trong đó gánh tám chục phần trăm số lần bạn mặc ra đường.

Đó chính là cái quy luật 80/20 — nghe có vẻ toán học khô khan, nhưng thật ra nó nằm ngay trong cái tủ quần áo, trong cuộc họp, trong sổ khách hàng của bất kỳ ai đang đi làm.

### Từ chiếc tủ quần áo đến phòng họp hai tiếng
Nói tới họp hành thì càng rõ. Cả phòng ngồi họp hai tiếng đồng hồ, chiếu slide, bàn tới bàn lui, ai cũng phát biểu vài câu cho có. Nhưng nếu ngồi để ý kỹ, quyết định thật sự — cái điều khiến cuộc họp đó có ý nghĩa — thường chỉ chốt trong đúng mười phút cuối, lúc mọi người bắt đầu đói bụng, liếc đồng hồ, muốn về. Một trăm hai mươi phút, chỉ mười phút là "ruột", còn lại là phần đệm cho có không khí họp hành.

Chuyện làm ăn cũng chẳng khác. Danh sách khách hàng dài cả trang, nhưng ngồi tính lại doanh thu, thường chỉ một nhóm nhỏ khách quen, khách lớn là gánh phần lớn con số. Số còn lại tuy đông, nhưng gộp lại chưa chắc bằng nhóm nhỏ kia. Vậy mà thời gian, sự quan tâm, công sức chăm sóc lại hay bị chia đều — hoặc tệ hơn, dồn nhiều nhất cho những khách khó tính nhất, chứ không phải khách mang lại giá trị nhiều nhất.

### Trong kinh doanh: Sai lầm của việc đối xử cào bằng
Cái sai phổ biến không phải là không biết quy luật này — ai cũng nghe qua 80/20 ít nhất một lần. Cái sai là biết rồi vẫn đối xử với mọi thứ như nhau: mọi bộ đồ trong tủ đều đáng giữ, mọi phút họp đều đáng ngồi nghe, mọi khách hàng đều đáng dồn sức chăm như nhau. Kết quả là năng lượng bị rải mỏng ra khắp nơi, thay vì dồn vào đúng hai chục phần trăm đang thật sự tạo ra giá trị.

Làm ít hơn, theo đúng tinh thần 80/20, không phải là lười đi. Nó là dừng đối xử công bằng với những thứ vốn dĩ không đóng góp như nhau. Bộ đồ nào mặc hoài không đụng tới, cho hoặc bỏ đi cho nhẹ tủ. Phần họp nào chỉ để có không khí, rút ngắn lại hoặc bỏ luôn. Khách hàng nào chiếm nhiều thời gian nhất mà mang lại ít giá trị nhất, xem lại có đáng ưu tiên vậy không.

### Thử nghiệm tối nay: Tìm ra 20% gánh 80% giá trị
Tối nay, thử chọn một thứ thôi — công việc, khách hàng, hay ngay cả cái tủ quần áo — và tìm cho ra hai chục phần trăm đang gánh tám chục phần trăm giá trị. Rồi dồn thêm một chút sự chú ý vào đúng chỗ đó. Không cần làm nhiều hơn. Chỉ cần làm đúng chỗ hơn.

---

### 💡 5 Đúc kết then chốt (Executive Hooks)
1. **Tủ đồ chật cứng cả trăm món, nhưng ngày nào cũng chỉ mặc đúng vài bộ "ruột" — quy luật 80/20 nằm ngay trong tủ quần áo của bạn.**
2. **Họp hai tiếng, nhưng quyết định thật sự chỉ chốt trong mười phút cuối, lúc ai cũng đói bụng muốn về.**
3. **Không phải khách hàng nào cũng đáng được chăm như nhau — hai chục phần trăm trong sổ khách đang gánh tám chục phần trăm doanh thu.**
4. **Biết quy luật 80/20 không khó. Khó là ngừng đối xử công bằng với những thứ vốn không đóng góp như nhau.**
5. **Làm ít hơn không phải lười đi. Là ngừng rải đều sức lực cho những thứ chẳng mấy giá trị.**`,
    readTime: '4 phút đọc',
    tags: ['Operations', 'Business', 'Management', 'Strategy'],
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cao Nguyễn Nhật Triều - Quy luật 80/20 và bài toán tối ưu năng lượng',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'leadership-cai-bay-cua-nguoi-dan-dat-gioi-viec',
    title: 'Leadership: Cái bẫy của người dẫn dắt giỏi việc',
    category: 'Lãnh đạo',
    date: '30 Thg 09, 2026',
    excerpt: 'Kỹ năng giúp bạn được thăng chức và kỹ năng giúp bạn thành công ở vị trí mới gần như là hai thứ hoàn toàn khác nhau. Lãnh đạo không phải là người làm việc giỏi nhất trong phòng, mà là người khiến cả căn phòng làm việc giỏi hơn.',
    content: `Có một khoảnh khắc kỳ lạ xảy ra với gần như tất cả những ai được thăng chức vì họ giỏi việc: họ được giao thêm người, thêm quyền, thêm trách nhiệm — nhưng vẫn tiếp tục làm việc y hệt như trước, chỉ là làm nhiều hơn và mệt hơn.

Bạn từng là người giỏi nhất trong đội. Vì giỏi, bạn được đưa lên làm người dẫn dắt đội đó. Nhưng không ai nói cho bạn biết rằng kỹ năng giúp bạn được thăng chức và kỹ năng giúp bạn thành công ở vị trí mới gần như là hai thứ hoàn toàn khác nhau. Vậy nên bạn tiếp tục làm điều bạn giỏi nhất — tự tay xử lý mọi việc khó — trong khi đội của bạn đứng nhìn, chờ bạn quyết định, và dần dần không còn phát triển thêm nữa.

### Cái bẫy lớn nhất: Gánh vác nhiều hơn thay vì Lãnh đạo
Đây là cái bẫy lớn nhất của việc trở thành người dẫn dắt: bạn nghĩ mình đang có trách nhiệm hơn, nhưng thực chất bạn đang làm công việc của một nhân viên giỏi ở quy mô lớn hơn. Bạn không lãnh đạo. Bạn chỉ đang gánh vác nhiều hơn.

Lãnh đạo thực sự không phải là trở thành người làm việc giỏi nhất trong phòng. Nó là trở thành người khiến cả căn phòng làm việc giỏi hơn, kể cả khi bạn không có mặt ở đó. Đây là một sự chuyển dịch tư duy khó, vì nó đi ngược lại bản năng của những người có năng lực: bản năng muốn tự mình kiểm soát, tự mình chắc chắn mọi thứ đúng, tự mình chịu trách nhiệm cho từng chi tiết.

### Nút thắt cổ chai và cái giá của việc "làm thay"
Nhưng mỗi lần bạn nhảy vào làm thay vì hướng dẫn người khác tự làm, bạn đang lấy đi một cơ hội để họ trưởng thành. Và bạn đang tự khóa mình vào vị trí là nút thắt duy nhất — nơi mọi quyết định, mọi vấn đề, mọi rủi ro đều phải đi qua bạn trước khi có thể tiến lên.

Điều đáng sợ hơn là điều này thường không được nhìn thấy ngay. Trong ngắn hạn, việc bạn tự làm có vẻ hiệu quả hơn — nhanh hơn, chắc chắn hơn, ít sai sót hơn. Nhưng về dài hạn, nó tạo ra một đội ngũ phụ thuộc hoàn toàn vào bạn, không có khả năng tự ra quyết định, và một người lãnh đạo kiệt sức vì gánh trên vai công việc của cả đội thay vì chỉ công việc của chính mình.

### Lãnh đạo giỏi đặt đúng câu hỏi thay vì có sẵn mọi câu trả lời
Lãnh đạo giỏi không phải là người có câu trả lời cho mọi vấn đề. Đó là người đặt đúng câu hỏi để người khác tự tìm ra câu trả lời, rồi đủ can đảm để lùi lại và để họ thử — kể cả khi biết trước có thể họ sẽ vấp.

Sự vấp ngã đó, nếu được để xảy ra trong một môi trường an toàn, chính là nơi năng lực thực sự được xây dựng. Còn nếu bạn luôn can thiệp trước khi họ kịp vấp, bạn đang cứu lấy một kết quả ngắn hạn bằng cái giá của sự trưởng thành dài hạn của cả đội.

### Câu hỏi phản tỉnh cho người dẫn dắt
Nếu bạn đang ở vị trí dẫn dắt người khác — dù là một đội nhỏ hay một tổ chức lớn — hãy tự hỏi mình một câu thành thật: trong tuần vừa rồi, có bao nhiêu việc bạn tự tay làm, mà lẽ ra nên là cơ hội để ai đó trong đội học cách tự làm?

Đó không phải là câu hỏi để bạn cảm thấy tội lỗi. Đó là câu hỏi để bạn nhận ra chính xác nơi mình đang giữ đội ngũ lại, thay vì đẩy họ đi lên.

Người dẫn dắt giỏi nhất không phải là người không thể thiếu. Đó là người xây dựng được một đội ngũ đến mức, nếu họ vắng mặt một thời gian, mọi thứ vẫn tiếp tục vận hành tốt. Đó không phải là dấu hiệu bạn không quan trọng. Đó là dấu hiệu bạn đã làm đúng công việc của một người lãnh đạo.

---

### 💡 5 Đúc kết then chốt (Executive Hooks)
1. **Kỹ năng giúp bạn được thăng chức và kỹ năng giúp bạn thành công ở vị trí mới là hai thứ hoàn toàn khác nhau.**
2. **Lãnh đạo không phải là người giỏi nhất trong phòng. Đó là người khiến cả phòng giỏi hơn kể cả khi mình không có mặt.**
3. **Mỗi lần bạn nhảy vào làm thay, bạn đang lấy đi một cơ hội để người khác trưởng thành.**
4. **Người lãnh đạo giỏi không có câu trả lời cho mọi thứ. Họ đặt đúng câu hỏi để người khác tự tìm ra.**
5. **Nếu bạn vắng mặt một tuần và mọi thứ vẫn chạy tốt — đó không phải dấu hiệu bạn không quan trọng, mà là dấu hiệu bạn đã lãnh đạo đúng.**`,
    readTime: '5 phút đọc',
    tags: ['Leadership', 'Management', 'Operations', 'Startup'],
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cao Nguyễn Nhật Triều - Nghệ thuật dẫn dắt đội ngũ và năng lực lãnh đạo',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'kinh-doanh-van-hanh-chuyen-ba-nau-co-tet',
    title: 'Kinh doanh & Vận hành: Chuyện bà nấu cỗ Tết và cái bẫy ôm việc',
    category: 'Vận hành',
    date: '30 Thg 09, 2026',
    excerpt: 'Nhà ai có bà nấu cỗ Tết chắc từng thấy cảnh bà đứng bếp từ 5 giờ sáng, không cho ai đụng vào rồi than cực. Đi làm cũng y chang: bạn ôm hết việc vì sợ người khác làm sai, rồi tự biến mình thành "làn đường duy nhất" gây tắc nghẽn cả hệ thống.',
    content: `Nhà ai có bà, có mẹ nấu cỗ Tết chắc từng thấy cảnh này: bà đứng bếp từ 5 giờ sáng, tay xào tay kho, miệng vẫn không quên quát: "Đứa nào đụng vào nồi thịt kho là hư hết đó nghen, để tao!" Cả nhà ngồi chơi, bà một mình quần quật tới trưa, xong ngồi thở dốc than: "Tao cực quá, có ai phụ được đâu."

Nhưng nếu để ý kỹ, chẳng ai không phụ được cả. Chỉ là bà không cho phụ. Vì bà sợ người khác làm không đúng ý, sợ nêm sai, sợ hỏng món. Nên rốt cuộc, cái "cực" đó là do bà tự chọn, chứ không phải do không có người.

Tôi kể chuyện này không phải để chê bà, vì thật ra phần lớn chúng ta đi làm cũng y chang vậy. Bạn giỏi một việc gì đó, nên dần dần bạn trở thành người duy nhất được tin tưởng làm việc đó. Ai giao cho người khác làm, bạn cũng thấy... không yên tâm. Thế là bạn ôm hết. Rồi cuối ngày mệt phờ, ngồi than: "Sao việc gì cũng tới tay mình vậy trời."

Câu trả lời thật ra hơi phũ: **vì bạn không cho ai làm thay bạn cả.**

### Cái bẫy của "Vận hành": Khi bạn trở thành chiếc cổ chai
Đây chính là cái bẫy của "vận hành". Nghe từ này có vẻ to tát, kiểu chỉ dành cho công ty lớn, có phòng ban đàng hoàng. Nhưng thật ra vận hành đơn giản chỉ là câu hỏi: việc này có nhất thiết phải qua tay mình không, hay là mình đang làm vì... quen tay rồi?

Có một kiểu người rất hay gặp ở chỗ làm: người này cực kỳ giỏi, nhận việc gì cũng làm tốt, nên sếp giao thêm, đồng nghiệp đẩy qua, khách hàng cũng chỉ định đích danh. Nghe có vẻ là được trọng dụng, nhưng thật ra đang trở thành... cái cổ chai. Mọi việc dồn qua một người, người đó nghỉ phép một buổi là cả phòng rối tung như xe cộ dồn vào một làn đường trong giờ cao điểm, ai cũng bấm còi mà chẳng nhích được centimet nào.

Vấn đề không phải ở chỗ bạn làm được nhiều việc. Vấn đề là bạn có đang là "làn đường duy nhất" hay không. Nếu có, thì dù bạn có chăm tới đâu, hệ thống vẫn tắc, vì tắc không phải do thiếu người chạy nhanh, mà do có đúng một cái cổng cho tất cả đi qua.

### Chuyển đổi tư duy: Từ "Làm cho xong" sang "Thiết kế để việc tự chạy"
Cách nghĩ khác đi một chút sẽ đỡ mệt hơn nhiều: thay vì hỏi "làm sao để mình cân được nhiều việc hơn", hãy hỏi "việc này có cần đúng mình làm không, hay chỉ cần có người làm đúng cách là được".

Nghe đơn giản vậy thôi nhưng đổi hẳn cách bạn sống một ngày:
- **Người giỏi việc**: lo làm cho xong.
- **Người giỏi vận hành**: lo làm sao việc được làm xong dù không có mình đứng cạnh nhắc từng chút.

Chuyện này không chỉ dành cho ai đang làm sếp. Ngay cả khi bạn chưa quản lý ai, cuộc sống của bạn vẫn đang được "vận hành" mỗi ngày — chỉ là bạn có đang thiết kế nó, hay đang để nó chạy bằng quán tính.

Nếu tuần nào bạn cũng bù đầu xử lý những việc y chang tuần trước, y chang tháng trước, thì đó không phải do bạn chưa đủ chăm. Đó là dấu hiệu bạn đang tự làm bà nội nấu cỗ Tết — không ai giành việc của bạn, chỉ là bạn chưa từng buông tay ra thử.

### Bài tập nhỏ cho cuối tuần này
Cuối tuần này, thử làm một việc nhỏ:
1. **Liệt kê ra ba việc** bạn cứ phải lặp đi lặp lại mỗi tuần.
2. **Tự hỏi bản thân thật lòng**: cái nào trong đó thật sự cần chính tay mình, và cái nào chỉ đang tồn tại vì mình chưa từng để ai khác thử — hoặc chưa từng viết ra một quy trình rõ ràng để không phải nhớ lại từ đầu mỗi lần?

Làm ít hơn không có nghĩa làm biếng hơn. Nó có nghĩa là bạn đủ tỉnh để nhận ra: **cực không phải vì việc nhiều, mà vì mình đang đứng ở chỗ không cần đứng.**`,
    readTime: '4 phút đọc',
    tags: ['Operations', 'Business', 'Management', 'Startup'],
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Cao Nguyễn Nhật Triều - Chiến lược tối ưu vận hành và kinh doanh hiệu quả',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'ai-financial-markets',
    title: 'Tác động của AI đối với thị trường tài chính toàn cầu',
    category: 'Kinh tế',
    date: '15 Thg 10, 2024',
    excerpt: 'Phân tích chuyên sâu về cách trí tuệ nhân tạo đang định hình lại các chiến lược đầu tư và quản lý rủi ro trong kỷ nguyên số.',
    content: `Trí tuệ nhân tạo (AI) và Học máy (Machine Learning) đang tái cấu trúc nền tảng của thị trường tài chính quốc tế. Từ giao dịch tần suất cao (HFT) dựa trên mạng nơ-ron sâu đến phân tích tâm lý thị trường thông qua xử lý ngôn ngữ tự nhiên (NLP), các tổ chức tài chính hàng đầu đang tận dụng dữ liệu lớn để đạt được lợi thế cạnh tranh vượt trội.

### 1. Tự động hóa chiến lược định lượng và quản trị rủi ro
Các thuật toán AI hiện đại có khả năng xử lý hàng triệu điểm dữ liệu thị trường theo thời gian thực, phát hiện các mẫu hình dị thường và tự động cân bằng danh mục đầu tư trong mili-giây.

### 2. Dự báo kinh tế vi mô và vĩ mô
Việc kết hợp dữ liệu truyền thống (báo cáo tài chính, chỉ số CPI) với dữ liệu phi cấu trúc (hình ảnh vệ tinh, xu hướng tìm kiếm, dữ liệu chuỗi cung ứng) mang lại độ chính xác chưa từng có trong dự báo chu kỳ kinh tế.

### 3. Tương lai của Fintech tại Đông Nam Á
Khu vực đang chứng kiến sự bùng nổ của các giải pháp WealthTech và Micro-investing, giúp phổ cập dịch vụ tài chính cá nhân hóa đến hàng triệu người dùng mới.`,
    readTime: '6 phút đọc',
    tags: ['Finance', 'AI', 'Startup'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'AI and financial market analysis visualization',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'edtech-personalized-learning-2025',
    title: 'EdTech 2025: Xu hướng cá nhân hóa học tập',
    category: 'Giáo dục',
    date: '12 Thg 10, 2024',
    excerpt: 'Khám phá cách các nền tảng công nghệ giáo dục đang sử dụng dữ liệu để tạo ra trải nghiệm học tập độc bản cho từng cá nhân.',
    content: `Mô hình giáo dục "one size fits all" truyền thống đang nhanh chóng nhường chỗ cho các hệ sinh thái học tập thích ứng (Adaptive Learning). Nhờ công nghệ phân tích hành vi và trí tuệ nhân tạo, lộ trình học tập ngày nay được tùy biến đến từng học viên.

### 1. Phân tích khoảng trống kiến thức (Knowledge Graph Mapping)
Bằng cách lập bản đồ kiến thức liên kết, hệ thống có thể xác định chính xác khái niệm nào học viên chưa nắm vững và tự động điều chỉnh tốc độ giảng dạy.

### 2. Tương tác đa giác quan và trợ lý ảo AI
Học viên được hỗ trợ 24/7 bởi các gia sư AI được huấn luyện theo phương pháp Socratic, kích thích tư duy phản biện thay vì chỉ đưa ra câu trả lời trực tiếp.

### 3. Đánh giá liên tục thay vì thi cử định kỳ
Dữ liệu tương tác hàng ngày thay thế các kỳ thi căng thẳng, mang lại cái nhìn toàn diện và thực chất hơn về sự tiến bộ của người học.`,
    readTime: '5 phút đọc',
    tags: ['EdTech', 'AI'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsEmMVJFAG636BcxL0dGCdSKYa9z7fySqWLI_3CNU85l4YoGEj6WGgTBq_1rJ082ajo_GQ-ULnxFe57OKxF1NgkF6OQ7Bt7Yp6nTolpEaTZm3d5YjDh3sk95MCgYML-TQvoadv0DTXLLgtZIjVms_E2ygKVGVedBOl7gu_BCTP06CCeHDWnbGhTTQYmnL9fx7Jxf91ZSkqQUaOK1jmvfFhAKPITWQxvnf6CZ6PPBUrqBzqPtMOOvzF3Q',
    imageAlt: 'EdTech digital learning tablet and classroom setup',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'microservices-enterprise-architecture',
    title: 'Kiến trúc Microservices trong các ứng dụng Enterprise',
    category: 'Công nghệ',
    date: '08 Thg 10, 2024',
    excerpt: 'Hướng dẫn thực tế về việc chuyển đổi từ kiến trúc Monolithic sang Microservices để tăng tính linh hoạt và khả năng mở rộng.',
    content: `Trong môi trường doanh nghiệp quy mô lớn, việc duy trì một khối mã nguồn đơn lẻ (Monolith) thường dẫn đến sự chậm trễ trong chu kỳ phát hành và khó khăn khi mở rộng quy mô. Chuyển đổi sang Microservices là một quyết định chiến lược về kỹ thuật lẫn tổ chức.

### 1. Phân rã theo Domain-Driven Design (DDD)
Xác định Bounded Contexts rõ ràng giữa các phân hệ: Xác thực, Thanh toán, Quản lý nội dung, và Phân tích dữ liệu.

### 2. Giao tiếp bất đồng bộ với Event-Driven Architecture
Sử dụng Message Queues như Apache Kafka hoặc RabbitMQ để đảm bảo tính chịu lỗi cao và giảm thiểu phụ thuộc trực tiếp giữa các dịch vụ.

### 3. Khả năng quan sát toàn diện (Observability)
Thiết lập hệ thống giám sát phân tán (Distributed Tracing, Metrics, Centralized Logging) với OpenTelemetry và Prometheus để nhanh chóng định vị sự cố.`,
    readTime: '8 phút đọc',
    tags: ['Startup', 'AI'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBYAzrD5-xbj9Sc1eOInSQ2EGyDl9zLLebfwrtorvafkpuYHqTyz4eULJ8yvTbfGjBepTKe5c1xk2_GFOHfAjF5kDWiJypNTZtVE3bDKnlVcFwL7EvXKnsd5AMxRjeDrwYfOdVliFCKBdsquJ6tc1CCJtw7fklgHDgR4Ne3vq5KTL5X3m5zTDZGo7FEKNBnvGcJY0NQ_7THsPlOeHlWrEg_VX1aVR1FUfjTjYejZoLVhtDsjQ1q8JuVpw',
    imageAlt: 'Enterprise microservices and software development',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'circular-economy-models',
    title: 'Mô hình kinh tế tuần hoàn trong bối cảnh mới',
    category: 'Kinh tế',
    date: '05 Thg 10, 2024',
    excerpt: 'Tại sao kinh tế tuần hoàn không chỉ là xu hướng bảo vệ môi trường mà còn là chiến lược tối ưu hóa lợi nhuận dài hạn.',
    content: `Kinh tế tuần hoàn (Circular Economy) đang chuyển mình từ một sáng kiến trách nhiệm xã hội (CSR) thành một trụ cột chiến lược quyết định hiệu quả tài chính và sức cạnh tranh bền vững của doanh nghiệp.

### 1. Chuyển đổi mô hình kinh doanh sang PaaS (Product-as-a-Service)
Thay vì bán sản phẩm một lần, doanh nghiệp giữ quyền sở hữu và cung cấp dịch vụ sử dụng, khuyến khích thiết kế sản phẩm có tuổi thọ cao và dễ tái chế.

### 2. Tối ưu hóa chuỗi cung ứng bằng IoT và AI
Theo dõi vòng đời tài sản, dự đoán thời điểm bảo trì và quản lý chu trình thu hồi nguyên vật liệu với độ chính xác cao.

### 3. Tiêu chuẩn ESG và lợi thế tiếp cận vốn
Các quỹ đầu tư toàn cầu ngày càng ưu tiên phân bổ dòng vốn cho các doanh nghiệp có chiến lược kinh tế tuần hoàn minh bạch và có thể đo lường.`,
    readTime: '6 phút đọc',
    tags: ['Finance', 'Startup'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAcHNpzGB820pzuoq2jIneP6_7-lUlv6J4ig5yXycNUvJkbWEVPsTnbOAmht3-_zqKYwvorbBdTsfz7bUb7I4wEGOHZj47lGZG5uKJsBerCmY7qMN1LTc_E4IJjekL-tky9ijVqynqLNgidIul5LgpXE-li_-OuBdKXDXjy4dFLkFSGa-3KyeqkdhzqvkFb1MESb8tNnAstTw6spEhYQn7m_NGIGmEFtWL8TxZ5YDG2Ckay5N0Q4JDISw',
    imageAlt: 'Circular economy diagram and sustainable economic models',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'fintech-trends-vietnam-2025',
    title: 'Xu hướng thanh toán số và Fintech tại Việt Nam',
    category: 'Kinh tế',
    date: '28 Thg 09, 2024',
    excerpt: 'Đánh giá triển vọng của hệ sinh thái thanh toán không tiền mặt, ngân hàng mở (Open Banking) và chính sách quản lý thí điểm.',
    content: `Việt Nam đang dẫn đầu khu vực Đông Nam Á về tốc độ tăng trưởng thanh toán không dùng tiền mặt và số lượng người dùng ví điện tử. Bước tiến tiếp theo sẽ là sự liên thông toàn diện qua Open Banking và mã QR xuyên biên giới.`,
    readTime: '4 phút đọc',
    tags: ['Finance', 'Startup'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpj_SV1Ro3r0D--0-kXN9L-DV5eiPGXagqpe0SvyxCKNMLG4EPhDBOa9QotfnQxqRE8Eq9THRWmuHb_Tz9C1NCUk7M07Fwy2CjxEKDrXbBN2TM1aqOrDPNevYyM3qiFb8TuU-WeXOTub23rOII68XXld3LgMjITEDiOlDLZnCj6rtzwyYYFnf03ppgNF4jO00CFzgySjSrnIhGaTOHC-plm2b6tXa62GC3-TlyGXvhaX1Ad9M-H3MBVQ',
    imageAlt: 'Digital payment and financial applications in Vietnam',
    author: 'Cao Nguyễn Nhật Triều',
  },
  {
    id: 'building-scalable-design-systems',
    title: 'Xây dựng Design System quy chuẩn cho ứng dụng đa nền tảng',
    category: 'Công nghệ',
    date: '20 Thg 09, 2024',
    excerpt: 'Phương pháp thiết lập Design Tokens, hệ thống phân cấp màu sắc và component thư viện đồng nhất giữa Web và Mobile.',
    content: `Một Design System hoàn chỉnh không chỉ giúp tiết kiệm hàng trăm giờ lập trình mà còn đảm bảo trải nghiệm thương hiệu nhất quán trên mọi điểm chạm của người dùng.`,
    readTime: '7 phút đọc',
    tags: ['EdTech', 'AI'],
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD66m0OaCiT0OO7UpZoJ9B6sH-7vNbexu5dnGWz_Rtjy7bR29PRgg8KcFWdWLSq5IzOca9FV9DzVxHTtWPGNLbttCSpieOfTCiIeT9YUUueV29pAmCULk0bTdB7aInkLP62oqG_dHIqs5XAdW0YtskYAkI0piy53I6NKn5ueDXnXRTD6Hy8tgl9MQ4pjryNWpV3x12gBJfxE9eO3tQWoaLj_JDPXjPU4-7JIjp4JfruLBXRht_7My5R7w',
    imageAlt: 'Design system tokens and UI architecture',
    author: 'Cao Nguyễn Nhật Triều',
  },
];

export const PROJECTS: Project[] = [
  {
    id: 'htv-tech-commercialization',
    title: 'Đài Truyền hình HTV: Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm',
    badge: 'Đài Truyền Hình HTV',
    category: 'Thương mại hóa & Công nghệ',
    excerpt: 'Ông Cao Nguyễn Nhật Triều (Giám đốc điều hành Nha Trang Hitech) trao đổi trên sóng Đài Phát thanh và Truyền hình TP.HCM (HTV) về chiến lược thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm từ phòng R&D ra thị trường.',
    description: 'Dấu ấn chuyên gia trên truyền hình: Ông Cao Nguyễn Nhật Triều, Giám đốc điều hành Công ty TNHH MTV Công Nghệ Cao Nha Trang (Nha Trang Hitech), có buổi trao đổi chuyên sâu trên sóng Đài Phát thanh và Truyền hình TP.HCM (HTV) về chủ đề "Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm". Trong chương trình, ông Triều phân tích các lợi thế chiến lược của TP.HCM với lực lượng dân số trẻ, năng động và là trung tâm khoa học công nghệ đầu tàu cả nước, tạo nền tảng vững chắc để các doanh nghiệp đưa kết quả nghiên cứu khoa học từ phòng lab ra thị trường thực tiễn trong nước và vươn tầm quốc tế.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'Đài Truyền hình HTV: Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm',
    techStack: ['HTV Television', 'Tech Commercialization', 'R&D to Market', 'HCMC Tech Hub', 'Nha Trang Hitech'],
    highlights: [
      'Được Đài Phát thanh và Truyền hình TP.HCM (HTV) phỏng vấn và đưa tin chuyên sâu',
      'Chiến lược then chốt đưa sản phẩm công nghệ từ phòng thí nghiệm R&D ra thị trường thực tiễn',
      'Khai phóng lợi thế nguồn nhân lực trẻ, năng động và hệ sinh thái công nghệ TP.HCM',
      'Đồng hành cùng mục tiêu nâng cao tỷ lệ thương mại hóa kết quả nghiên cứu khoa học lên 8-10%'
    ],
    metrics: [
      { label: 'Đài truyền hình', value: 'HTV TP.HCM' },
      { label: 'Trọng tâm', value: 'Thương mại hóa' },
      { label: 'Nguồn tin', value: 'HTV.vn' }
    ],
    colSpan: 'md:col-span-8',
    featured: true,
    articleUrl: 'https://htv.vn/thuc-day-doanh-nghiep-cong-nghe-thuong-mai-hoa-san-pham-22226090516104883.htm',
    videoUrl: 'https://www.youtube.com/watch?si=UJ3MoshsIuSK-RwE&v=y-_DxX8pUFQ&feature=youtu.be',
    pressSource: 'Đài Truyền hình HTV',
    pressTitle: 'Thúc đẩy doanh nghiệp công nghệ thương mại hóa sản phẩm',
  },
  {
    id: 'urban-development-law-contribution',
    title: 'Chương trình Luật Phát Triển Đô Thị: Đóng góp ý kiến & Hiến kế thương mại hóa công nghệ',
    badge: 'Luật Phát Triển Đô Thị | Phút 11:00',
    category: 'Chính sách & Thương mại hóa',
    excerpt: 'Ông Cao Nguyễn Nhật Triều (Giám đốc điều hành Nha Trang Hitech) xuất hiện đóng góp ý kiến từ phút 11:00 trong chương trình Luật Phát Triển Đô Thị, nhấn mạnh cơ chế Sandbox Khoản 5 Điều 29 và đưa TP.HCM thành trung tâm thương mại hóa công nghệ cao.',
    description: 'Đóng góp chính sách & góc nhìn chuyên gia: Trong chương trình phát sóng thảo luận chuyên sâu về "Luật Phát Triển Đô Thị" (xuất hiện từ phút 11:00), ông Cao Nguyễn Nhật Triều – Giám đốc điều hành Công ty TNHH MTV Công Nghệ Cao Nha Trang (Nha Trang Hitech) – đã có những phát biểu trọng tâm đại diện cho cộng đồng doanh nghiệp công nghệ. Ông nhấn mạnh kỳ vọng vào Khoản 5 Điều 29 dành cho phát triển khoa học công nghệ, đổi mới sáng tạo, cơ chế thử nghiệm có kiểm soát (regulatory sandbox) và chính sách ưu đãi các ngành công nghệ chiến lược; đề xuất giải pháp để Việt Nam và TP.HCM không chỉ là thị trường tiêu thụ mà trở thành trung tâm sáng tạo và thương mại hóa các sản phẩm công nghệ cao ra quốc tế.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'Ông Cao Nguyễn Nhật Triều đóng góp ý kiến trong chương trình Luật Phát Triển Đô Thị',
    techStack: ['Luật Phát Triển Đô Thị', 'Khoản 5 Điều 29', 'Regulatory Sandbox', 'Tech Commercialization', 'Nha Trang Hitech'],
    highlights: [
      'Xuất hiện đóng góp chuyên môn từ phút thứ 11:00 trong chương trình phát sóng Luật Phát Triển Đô Thị',
      'Đại diện tiếng nói của cộng đồng doanh nghiệp công nghệ trước những cơ hội và kỳ vọng của khuôn khổ pháp lý mới',
      'Phân tích chuyên sâu Khoản 5 Điều 29: Cơ chế thử nghiệm có kiểm soát (Sandbox) và chính sách ưu đãi công nghệ chiến lược',
      'Định hướng phát triển TP. Hồ Chí Minh thành trung tâm thương mại hóa các sản phẩm công nghệ từ nghiên cứu R&D'
    ],
    metrics: [
      { label: 'Chương trình', value: 'Luật PT Đô Thị' },
      { label: 'Mốc thời gian', value: 'Từ phút 11:00' },
      { label: 'Trọng tâm', value: 'Sandbox & Đổi mới ST' }
    ],
    colSpan: 'md:col-span-4',
    featured: true,
    articleUrl: 'https://www.youtube.com/live/gPXndsELXvw?si=SgTTNQzKH1KXrKUF&t=660s',
    videoUrl: 'https://www.youtube.com/live/gPXndsELXvw?si=SgTTNQzKH1KXrKUF&t=660s',
    pressSource: 'Chương trình Luật Phát Triển Đô Thị',
    pressTitle: 'Đóng góp ý kiến của ông Cao Nguyễn Nhật Triều (từ phút 11:00)',
  },
  {
    id: 'smart-health-kiosk-hdbank',
    title: 'Dự án Chuyển đổi số Y tế: Kiosk y tế thông minh và Trải nghiệm người dân',
    badge: 'Chuyển Đổi Số Quốc Gia | Đề án 06',
    category: 'Chuyển đổi số & Y tế',
    excerpt: 'Tham gia dự án Chuyển đổi số quốc gia: Triển khai 1.001+ Kiosk y tế thông minh và nâng cao trải nghiệm khám chữa bệnh cho người dân (theo Đề án 06). Được đưa tin chính thức trên Báo Điện tử Chính phủ.',
    description: 'Dự án trọng điểm quy mô quốc gia: Tham gia điều phối PMO và phát triển kinh doanh vùng triển khai 1.001+ Kiosk Y tế Thông minh toàn quốc theo Đề án 06 Chính phủ. Giải pháp tạo bước đột phá trong hành trình khám chữa bệnh: người dân chủ động đăng ký bằng CCCD gắn chip sinh trắc học, rút ngắn hơn 70% thời gian chờ đợi, thanh toán viện phí không dùng tiền mặt thông suốt và kết nối trực tiếp với Cơ sở dữ liệu Quốc gia về Dân cư.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpj_SV1Ro3r0D--0-kXN9L-DV5eiPGXagqpe0SvyxCKNMLG4EPhDBOa9QotfnQxqRE8Eq9THRWmuHb_Tz9C1NCUk7M07Fwy2CjxEKDrXbBN2TM1aqOrDPNevYyM3qiFb8TuU-WeXOTub23rOII68XXld3LgMjITEDiOlDLZnCj6rtzwyYYFnf03ppgNF4jO00CFzgySjSrnIhGaTOHC-plm2b6tXa62GC3-TlyGXvhaX1Ad9M-H3MBVQ',
    imageAlt: 'Dự án Chuyển đổi số Y tế: Kiosk y tế thông minh và Trải nghiệm người dân',
    techStack: ['IoT Smart Kiosks', 'Biometric CCCD Chip Auth', 'Đề án 06 Integration', 'Cashless Hospital Pay', 'PMO Framework'],
    highlights: [
      'Tham gia dự án Chuyển đổi số Quốc gia: Triển khai 1.001+ Kiosk Y tế Thông minh toàn quốc theo Đề án 06',
      'Nâng cao toàn diện trải nghiệm khám chữa bệnh của người dân: xác thực sinh trắc CCCD, cắt giảm 70% thời gian chờ',
      'Tích hợp giải pháp thanh toán viện phí không dùng tiền mặt và hệ sinh thái số Edupay / Smart Campus',
      'Được Báo Điện tử Chính phủ (BaoChinhPhu.vn) ghi nhận và đưa tin chính thức'
    ],
    metrics: [
      { label: 'Kiosk Y tế triển khai', value: '1,001+' },
      { label: 'Cắt giảm thời gian chờ', value: '70%+' },
      { label: 'Nguồn tin chính thống', value: 'Báo Chính Phủ' }
    ],
    colSpan: 'md:col-span-8',
    featured: true,
    articleUrl: 'https://baochinhphu.vn/hdbank-ngan-hang-dau-tien-dua-kiosk-y-te-thong-minh-vao-nang-cao-trai-nghiem-kham-chua-benh-cho-nguoi-dan-102250307164606244.htm',
    pressSource: 'Báo Điện tử Chính phủ',
    pressTitle: 'HDBank - Ngân hàng đầu tiên đưa kiosk y tế thông minh vào nâng cao trải nghiệm khám chữa bệnh cho người dân',
  },
  {
    id: 'smart-edu-digital-transformation',
    title: 'Dự án: Chuyển đổi số giáo dục - đẩy mạnh hoạt động quản lý giáo dục và thanh toán lên giao dịch điện tử và số hóa',
    badge: 'Chuyển Đổi Số Giáo Dục',
    category: 'Chuyển đổi số & Tài chính số',
    excerpt: 'Triển khai giải pháp chuyển đổi số giáo dục, kết nối hệ sinh thái tài chính số học đường (Edupay / Smart Campus), số hóa quản lý và thanh toán học phí không tiền mặt. Được đưa tin trên Báo Đồng Nai.',
    description: 'Dự án chiến lược Chuyển đổi số Giáo dục: Triển khai tích hợp hệ sinh thái tài chính số học đường (Edupay / Smart Campus) tại các cơ sở giáo dục. Đẩy mạnh số hóa toàn diện hoạt động quản lý giáo dục, chuẩn hóa quy trình giao dịch điện tử, kết nối thanh toán học phí trực tuyến 100% an toàn và minh bạch cho nhà trường và phụ huynh.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJamFXC06F0OqcMCKi1NBvVbIDzXF04x8fkCWD4K3qGdnZrJZPSwN4tIvCK6MolWd-Zs_ut5YjLZ2hH58sM2AINwQAmE0bHZyel9KVoX-NL1D4EZIl-nKMs_BPogsPMTOoy4GsoQjspHB453QdZ0U-nr5xKg7dqwAkdnWmKbKzC9mJy-VO6maoPD6t3cbBPfB-UX8q03WXPQxguxcqci_4ufFKFmmaXP3rGbRYBCFhpf2HoUkZCoyMLw',
    imageAlt: 'Chuyển đổi số giáo dục và kết nối hệ sinh thái tài chính số',
    techStack: ['Edupay Campus Gateway', 'Digital Banking APIs', 'School Management Systems', 'Cashless Tuition', 'E-Transactions'],
    highlights: [
      'Kết nối hệ sinh thái tài chính số học đường Edupay / Smart Campus liên trường',
      'Đẩy mạnh số hóa công tác quản lý giáo dục và quy trình giao dịch điện tử',
      'Thúc đẩy thanh toán học phí không dùng tiền mặt 100% an toàn, minh bạch',
      'Được Báo Đồng Nai (chuyên mục Chuyển đổi số) ghi nhận và đưa tin chính thức'
    ],
    metrics: [
      { label: 'Hệ sinh thái', value: 'Edupay / Campus' },
      { label: 'Thanh toán không tiền mặt', value: '100% Số hóa' },
      { label: 'Nguồn tin', value: 'Báo Đồng Nai' }
    ],
    colSpan: 'md:col-span-8',
    featured: true,
    articleUrl: 'https://baodongnai.com.vn/chuyen-doi-so/202606/ket-noi-he-sinh-thai-tai-chinh-so-8d44066/',
    pressSource: 'Báo Đồng Nai - Chuyển đổi số',
    pressTitle: 'Kết nối hệ sinh thái tài chính số',
  },
  {
    id: 'qualcomm-top-ai-solutions',
    title: 'Nha Trang Hitech vào Chung kết Qualcomm Challenges 2026 với hệ sinh thái Ontrak Chainflow',
    badge: 'Chung kết Qualcomm 2026',
    category: 'Đổi mới sáng tạo & AI',
    excerpt: 'Nha Trang Hitech xuất sắc tiến vào Vòng Chung kết cuộc thi danh giá toàn cầu Qualcomm Innovation Challenge 2026 với hệ sinh thái công nghệ cao Ontrak Chainflow.',
    description: 'Thành tựu công nghệ quốc tế nổi bật: Nha Trang Hitech xuất sắc được vinh danh và tiến vào Vòng Chung kết cuộc thi danh giá Qualcomm Vietnam Innovation Challenge 2026 (QVIC) với hệ sinh thái công nghệ cao Ontrak Chainflow. Khẳng định năng lực đổi mới sáng tạo, phát triển giải pháp AI tại biên, tích hợp IoT và tự động hóa quy trình nghiệp vụ thực chiến cho doanh nghiệp.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'Nha Trang Hitech vào Chung kết Qualcomm Challenges 2026 với hệ sinh thái Ontrak Chainflow',
    techStack: ['Ontrak Chainflow', 'Edge AI', 'IoT Ecosystem', 'Workflow Automation', 'Qualcomm Platforms'],
    highlights: [
      'Vào Vòng Chung kết cuộc thi toàn cầu Qualcomm Vietnam Innovation Challenge 2026',
      'Phát triển hệ sinh thái Ontrak Chainflow tích hợp AI, IoT & tự động hóa công nghiệp',
      'Được truyền thông và ghi nhận qua video phát sóng chính thức'
    ],
    metrics: [
      { label: 'Thành tựu', value: 'Chung kết Qualcomm 2026' },
      { label: 'Hệ sinh thái', value: 'Ontrak Chainflow' },
      { label: 'Nguồn tin', value: 'Qualcomm Video' }
    ],
    colSpan: 'md:col-span-8',
    featured: true,
    articleUrl: 'https://www.facebook.com/reel/1411251914186357',
    pressSource: 'Qualcomm Challenges / Video',
    pressTitle: 'Nha Trang Hitech vào Chung kết Qualcomm Challenges 2026 với hệ sinh thái Ontrak Chainflow',
  },
  {
    id: 'techcombank-advisors-network',
    title: 'Thành tựu tại TCA: Phát triển mạng lưới 63 tỉnh thành & Hàng trăm Trung tâm Hỗ trợ Bồi thường',
    badge: 'Mạng lưới 63 Tỉnh Thành',
    category: 'Chiến lược & Hệ thống',
    excerpt: 'Phát triển mạng lưới rộng khắp 63 tỉnh thành trên toàn quốc với gần 100 văn phòng đại diện chính thức và hàng trăm trung tâm hỗ trợ bồi thường phục vụ khách hàng.',
    description: 'Thành tựu phát triển mạng lưới tài chính và bảo hiểm quy mô toàn quốc tại TC Advisors (TCA): Xây dựng và mở rộng hệ sinh thái kinh doanh rộng khắp 63 tỉnh thành với gần 100 văn phòng đại diện chính thức. Đồng thời, triển khai hàng trăm trung tâm hỗ trợ bồi thường chuyên nghiệp trên toàn quốc nhằm đồng hành, bảo vệ quyền lợi và nâng cao trải nghiệm cho khách hàng. Thiết lập các liên minh phân phối chiến lược với các định chế tài chính, bảo hiểm hàng đầu (Bảo hiểm PVI, Techcombank).',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoLV7Sz_GogQx4KLhjqNPlLBXfb1lI4lJ-5-5Mtmn3XoPTiY2csMeoAMP-zXY0FG3v86ZTuEVScrw3iOGMeQBHT9N9me1bVaOwlrKpf7C6O8RUf82yJYOIHghq4us2t78Su_K0V3RlylEZTSL-OoiDagiIiMiK-tJlf6G5W-XFjVilNHnzWEhl_cVSK0Xl3g0-Jt-_a1ZNnBJiTe-sb5CN8NqHeiD_8cbA6FKxLmrjafUPZF8XU0eRtQ',
    imageAlt: 'TCA Phát triển mạng lưới 63 tỉnh thành & Trung tâm hỗ trợ bồi thường',
    techStack: ['TCA Network', 'Claim Support Centers', 'P&L Governance', 'PVI Partnership', 'Territory Scaling', 'Omnichannel Ops'],
    highlights: [
      'Phát triển mạng lưới rộng khắp 63 tỉnh thành trên toàn quốc với gần 100 văn phòng đại diện chính thức',
      'Triển khai hàng trăm trung tâm hỗ trợ bồi thường nhằm phục vụ và bảo vệ quyền lợi khách hàng',
      'Ký kết thỏa thuận hợp tác và triển khai bảo hiểm chiến lược với Bảo hiểm PVI và đối tác định chế',
      'Ghi nhận trên Doanh Nhân Toàn Cầu, Báo Điện tử Tập đoàn Dầu khí Việt Nam (PVN), Đài PT-TH Ninh Thuận'
    ],
    metrics: [
      { label: 'Độ phủ toàn quốc', value: '63 tỉnh thành' },
      { label: 'Văn phòng đại diện', value: 'Gần 100 VP' },
      { label: 'TT Hỗ trợ bồi thường', value: 'Hàng trăm TT' }
    ],
    colSpan: 'md:col-span-6',
    featured: true,
    articleUrl: 'https://doanhnhantoancau.net/tca-tung-bung-khai-truong-van-phong-moi.html',
    pressSource: 'Doanh Nhân Toàn Cầu & Báo PVN & NinhThuận TV',
    pressTitle: 'TCA mở rộng mạng lưới 63 tỉnh thành & phát triển hàng trăm trung tâm hỗ trợ bồi thường',
    pressLinks: [
      {
        source: 'Doanh Nhân Toàn Cầu',
        title: 'TCA tưng bừng khai trương văn phòng mới - Mở rộng quy mô mạng lưới',
        url: 'https://doanhnhantoancau.net/tca-tung-bung-khai-truong-van-phong-moi.html',
      },
      {
        source: 'Báo Điện tử Tập đoàn Dầu khí Việt Nam (PVN)',
        title: 'Bảo hiểm PVI và TC Advisors ký thoả thuận hợp tác và triển khai bảo hiểm TNDS bắt buộc',
        url: 'https://www.pvn.vn/bao-hiem-pvi-va-tc-advisors-ky-thoa-thuan-hop-tac-va-trien-khai-bao-hiem-trach-nhiem-dan-su-bat-buoc-9308',
      },
      {
        source: 'Đài PT-TH Ninh Thuận',
        title: 'Khai trương Trung tâm Hỗ trợ Bồi thường TCA Ninh Thuận',
        url: 'https://ninhthuantv.vn/tin-tuc/khai-truong-trung-tam-ho-tro-boi-thuong-tca-ninh-thuan',
      },
    ],
  },
  {
    id: 'h2y-vietnam-platform-advisory',
    title: 'Thiết lập và tư vấn tạo dựng nền tảng H2Y tại Việt Nam thời gian đầu',
    badge: 'Nền tảng H2Y',
    category: 'Tư vấn & Nền tảng',
    excerpt: 'Tư vấn chiến lược và thiết lập tạo dựng nền tảng H2Y tại Việt Nam giai đoạn đầu, kết nối chuỗi cung ứng, thương mại điện tử và sự kiện triển lãm xúc tiến thương mại Beauty Inside You.',
    description: 'Thành tựu tư vấn và kiến tạo hệ sinh thái: Thiết lập và tư vấn tạo dựng nền tảng H2Y tại thị trường Việt Nam trong giai đoạn khởi tạo. Hoạch định mô hình phân phối đa kênh, tích hợp chuỗi cung ứng mỹ phẩm - làm đẹp công nghệ cao và đồng hành tổ chức triển lãm trải nghiệm quy mô lớn Beauty Inside You 2023.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJamFXC06F0OqcMCKi1NBvVbIDzXF04x8fkCWD4K3qGdnZrJZPSwN4tIvCK6MolWd-Zs_ut5YjLZ2hH58sM2AINwQAmE0bHZyel9KVoX-NL1D4EZIl-nKMs_BPogsPMTOoy4GsoQjspHB453QdZ0U-nr5xKg7dqwAkdnWmKbKzC9mJy-VO6maoPD6t3cbBPfB-UX8q03WXPQxguxcqci_4ufFKFmmaXP3rGbRYBCFhpf2HoUkZCoyMLw',
    imageAlt: 'Nền tảng H2Y tại Việt Nam và Triển lãm Beauty Inside You',
    techStack: ['H2Y Platform', 'Commerce Advisory', 'Supply Chain', 'Distribution Strategy', 'Event Marketing'],
    highlights: [
      'Thiết lập và tư vấn tạo dựng nền tảng H2Y tại Việt Nam thời gian đầu',
      'Định hình mô hình phân phối và kết nối chuỗi cung ứng mỹ phẩm công nghệ cao',
      'Đồng hành tổ chức sự kiện triển lãm xúc tiến thương mại Beauty Inside You 2023',
      'Được Báo Tiền Phong (TienPhong.vn) đưa tin chính thống'
    ],
    metrics: [
      { label: 'Giai đoạn', value: 'Khởi tạo & Thiết lập' },
      { label: 'Nền tảng', value: 'H2Y Vietnam' },
      { label: 'Nguồn tin', value: 'Báo Tiền Phong' }
    ],
    colSpan: 'md:col-span-6',
    featured: true,
    articleUrl: 'https://tienphong.vn/beauty-inside-you-2023-trien-lam-my-pham-khoi-day-moi-giac-quan-post1521299.tpo',
    pressSource: 'Báo Tiền Phong',
    pressTitle: 'Beauty Inside You 2023: Triển lãm mỹ phẩm khơi dậy mọi giác quan & Nền tảng H2Y',
  },
  {
    id: 'edumetrics-platform',
    title: 'EduMetrics Analytics Platform',
    badge: 'Web App',
    category: 'Web Platform',
    excerpt: 'A comprehensive data visualization tool designed for academic institutions to track student performance and curriculum efficacy.',
    description: 'Nền tảng phân tích dữ liệu giáo dục toàn diện, cung cấp bảng điều khiển trực quan theo thời gian thực giúp ban giám hiệu và giảng viên theo dõi sát sao tiến độ học tập, tỷ lệ hoàn thành môn học và hiệu quả của các phương pháp giảng dạy mới.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJamFXC06F0OqcMCKi1NBvVbIDzXF04x8fkCWD4K3qGdnZrJZPSwN4tIvCK6MolWd-Zs_ut5YjLZ2hH58sM2AINwQAmE0bHZyel9KVoX-NL1D4EZIl-nKMs_BPogsPMTOoy4GsoQjspHB453QdZ0U-nr5xKg7dqwAkdnWmKbKzC9mJy-VO6maoPD6t3cbBPfB-UX8q03WXPQxguxcqci_4ufFKFmmaXP3rGbRYBCFhpf2HoUkZCoyMLw',
    imageAlt: 'EduMetrics Analytics Platform Dashboard Interface',
    techStack: ['React', 'TypeScript', 'Tailwind CSS', 'D3.js / Recharts', 'REST APIs'],
    highlights: [
      'Dashboard tương tác phân tích 50+ chỉ số học thuật',
      'Thuật toán dự báo sớm sinh viên cần hỗ trợ học vụ',
      'Khả năng trích xuất báo cáo tự động theo chuẩn kiểm định quốc tế'
    ],
    metrics: [
      { label: 'Cơ sở giáo dục', value: '12+' },
      { label: 'Người dùng hoạt động', value: '45,000+' },
      { label: 'Độ chính xác dự báo', value: '94.8%' }
    ],
    colSpan: 'md:col-span-6',
    featured: false,
  },
  {
    id: 'econlearn-mobile',
    title: 'EconLearn Mobile',
    badge: 'Mobile App',
    category: 'App Product',
    excerpt: 'Interactive learning modules for macroeconomics, optimized for on-the-go professionals.',
    description: 'Ứng dụng học tập kinh tế vĩ mô di động dạng micro-learning, tối ưu hóa cho chuyên gia bận rộn với các bài giảng 5 phút, mô phỏng thị trường tương tác và câu đố ôn tập hàng ngày.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAb9BFbG1i_sQ_fhmdZH8UkIEvqS4zDdWm5xBE5EV1hed0SfDFxDyLnGOIrOMvelFjuflmJoEWHASMuAfAtfSs8zKPX0DhSHxXC9zBBwyFwCqA_gIZ-AyKzN4NHg7c43PeG12CZvMihz9IIeKEtr7OObTzyiBR1OUdoeCJDPdyQOXjeRkK-Yoi_Uu0op4y_4xYfSElcXB5k__zQDisWvw9NLmKczn5LtnqDGJk_Z1WaKSNoZD0i7dDCog',
    imageAlt: 'EconLearn Mobile Application on Smartphone',
    techStack: ['React Native', 'TypeScript', 'Node.js', 'PostgreSQL', 'Gamification Engine'],
    highlights: [
      'Hơn 200 bài học kinh tế vĩ mô cô đọng',
      'Mô phỏng chính sách tiền tệ và lạm phát trực quan',
      'Đồng bộ hóa ngoại tuyến liền mạch'
    ],
    metrics: [
      { label: 'Lượt tải', value: '25,000+' },
      { label: 'Đánh giá App Store', value: '4.9 / 5.0' },
      { label: 'Tỷ lệ hoàn thành khóa', value: '78%' }
    ],
    colSpan: 'md:col-span-4',
    featured: true,
  },
  {
    id: 'fintech-analytics-dashboard',
    title: 'FinTech Analytics Dashboard',
    badge: 'App Product',
    category: 'App Product',
    excerpt: 'A comprehensive mobile application designed for real-time economic data visualization. Features include customizable charts, predictive modeling algorithms, and seamless integration with major financial APIs to empower professional decision-making.',
    description: 'Giải pháp bảng điều khiển tài chính di động cao cấp cho các nhà đầu tư và nhà phân tích chiến lược. Tích hợp nguồn cấp dữ liệu thời gian thực, mô hình dự báo định lượng và giao diện tối ưu hóa cao cho các quyết định đầu tư quan trọng.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpj_SV1Ro3r0D--0-kXN9L-DV5eiPGXagqpe0SvyxCKNMLG4EPhDBOa9QotfnQxqRE8Eq9THRWmuHb_Tz9C1NCUk7M07Fwy2CjxEKDrXbBN2TM1aqOrDPNevYyM3qiFb8TuU-WeXOTub23rOII68XXld3LgMjITEDiOlDLZnCj6rtzwyYYFnf03ppgNF4jO00CFzgySjSrnIhGaTOHC-plm2b6tXa62GC3-TlyGXvhaX1Ad9M-H3MBVQ',
    imageAlt: 'FinTech Analytics Dashboard Mobile Application',
    techStack: ['React Native', 'WebSockets', 'Chart.js', 'FinTech APIs', 'Tailwind'],
    highlights: [
      'Real-time data synchronization',
      'Customizable reporting modules',
      'Bảo mật cấp ngân hàng với mã hóa 2 lớp'
    ],
    metrics: [
      { label: 'Giao dịch giám sát', value: '$1.2B+' },
      { label: 'Độ trễ truyền dữ liệu', value: '<50ms' },
      { label: 'Khách hàng tổ chức', value: '30+' }
    ],
    colSpan: 'md:col-span-8',
    featured: false,
  },
  {
    id: 'modern-economics-principles',
    title: 'Modern Economics Principles',
    badge: 'Educational Ebook',
    category: 'Educational Ebook',
    excerpt: 'An in-depth digital publication exploring contemporary economic theories through a modern, data-driven lens. Essential reading for professionals seeking strategic macro-insights.',
    description: 'Ấn phẩm số chuyên khảo kết hợp lý thuyết kinh tế học hiện đại với bằng chứng thực nghiệm và các mô hình dữ liệu lớn. Tài liệu cần thiết cho các nhà quản lý, nhà hoạch định chính sách và sinh viên chuyên ngành.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC2l-iRCAf0fdgEhVzpHb__iXTyHJO1yuFkMq46YafCDBgKH-zz1mO5h-YLJggkQ6pToGzEACnIxaQHLL0K2nMwfqgzJ_XGQTBEbffQnjP99l_xLtSnlJAekEVaJa14_3HCEvZQhYmnPmuF7DOCIXRhAEKpgFkeNOM1qOcEy9hCNM_fyO7jMGBSdKQBpBuQGFqNARti0YWeNPfWSe4zgtPjYpOtugfIKMREpKqjdddGqSR61vaU_iNweA',
    imageAlt: 'Modern Economics Principles Digital Book Render',
    techStack: ['Digital Publishing', 'LaTeX', 'Interactive Charts', 'PDF & ePub'],
    highlights: [
      '12 chương lý thuyết và nghiên cứu điển hình thực tế',
      'Tích hợp 40+ biểu đồ tương tác',
      'Bộ câu hỏi thảo luận chiến lược cho doanh nghiệp'
    ],
    metrics: [
      { label: 'Độc giả chuyên nghiệp', value: '5,000+' },
      { label: 'Đại học áp dụng', value: '8' },
      { label: 'Số trang chuyên sâu', value: '380' }
    ],
    colSpan: 'md:col-span-4',
    featured: false,
  },
  {
    id: 'enterprise-consulting-hub',
    title: 'Enterprise Consulting Hub',
    badge: 'Web Platform',
    category: 'Web Platform',
    excerpt: 'A scalable web platform built for a premier consulting firm. Incorporates advanced scheduling systems, secure client portals, and dynamic content management structures optimized for high-value partner engagement.',
    description: 'Cổng thông tin tư vấn doanh nghiệp tích hợp hệ thống đặt lịch tự động, cổng bảo mật dữ liệu khách hàng, trao đổi tài liệu số an toàn và báo cáo định kỳ tự động.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoLV7Sz_GogQx4KLhjqNPlLBXfb1lI4lJ-5-5Mtmn3XoPTiY2csMeoAMP-zXY0FG3v86ZTuEVScrw3iOGMeQBHT9N9me1bVaOwlrKpf7C6O8RUf82yJYOIHghq4us2t78Su_K0V3RlylEZTSL-OoiDagiIiMiK-tJlf6G5W-XFjVilNHnzWEhl_cVSK0Xl3g0-Jt-_a1ZNnBJiTe-sb5CN8NqHeiD_8cbA6FKxLmrjafUPZF8XU0eRtQ',
    imageAlt: 'Enterprise Consulting Hub Website on Laptop',
    techStack: ['Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS'],
    highlights: [
      'Cổng thông tin đối tác bảo mật cao',
      'Tự động hóa lịch tư vấn và hội nghị trực tuyến',
      'Hệ thống quản lý hợp đồng điện tử thông minh'
    ],
    metrics: [
      { label: 'Doanh nghiệp kết nối', value: '120+' },
      { label: 'Thời gian tiết kiệm', value: '45%' },
      { label: 'Uptime dịch vụ', value: '99.99%' }
    ],
    colSpan: 'md:col-span-6',
    featured: false,
  },
  {
    id: 'modular-design-framework',
    title: 'Modular Design Framework',
    badge: 'System Architecture',
    category: 'System Architecture',
    excerpt: 'A robust, token-based design system architected to unify digital products across multiple platforms. Ensures brand consistency while accelerating development velocity for large-scale enterprise applications.',
    description: 'Khung kiến trúc hệ thống thiết kế dạng mô-đun với Token thiết kế chuẩn, linh hoạt mở rộng cho các hệ thống phần mềm quy mô lớn của doanh nghiệp, giúp tăng tốc độ bàn giao tính năng lên đến 2.5 lần.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD66m0OaCiT0OO7UpZoJ9B6sH-7vNbexu5dnGWz_Rtjy7bR29PRgg8KcFWdWLSq5IzOca9FV9DzVxHTtWPGNLbttCSpieOfTCiIeT9YUUueV29pAmCULk0bTdB7aInkLP62oqG_dHIqs5XAdW0YtskYAkI0piy53I6NKn5ueDXnXRTD6Hy8tgl9MQ4pjryNWpV3x12gBJfxE9eO3tQWoaLj_JDPXjPU4-7JIjp4JfruLBXRht_7My5R7w',
    imageAlt: 'Modular Design Framework and System Architecture',
    techStack: ['Design Tokens', 'Storybook', 'Figma API', 'React Component Library', 'CI/CD'],
    highlights: [
      'Bộ sưu tập 150+ thành phần UI tuân thủ WCAG AAA',
      'Tự động đồng bộ hóa token từ Figma sang mã nguồn',
      'Hỗ trợ chế độ đa chủ đề (Light/Dark/High Contrast)'
    ],
    metrics: [
      { label: 'Dự án áp dụng', value: '24+' },
      { label: 'Tăng tốc phát triển UI', value: '250%' },
      { label: 'Lỗi giao diện giảm', value: '85%' }
    ],
    colSpan: 'md:col-span-6',
    featured: false,
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 'sme-growth-strategy-consulting',
    title: 'Gói Tư Vấn Chiến Lược & Tối Ưu Vận Hành Doanh Nghiệp (SME)',
    category: 'Tư vấn',
    price: 199.0,
    description: 'Chương trình tư vấn chuyên sâu 1-1 về hoạch định chiến lược kinh doanh, tối ưu hóa quy trình vận hành và cấu trúc tài chính.',
    fullDetails: 'Dựa trên hơn 15 năm kinh nghiệm điều hành và 7+ năm tư vấn doanh nghiệp SME, chương trình cung cấp giải pháp toàn diện từ rà soát mô hình kinh doanh, tái thiết lập quy trình phân phối đa kênh, chuẩn hóa bảng chỉ số P&L/KPI đến xây dựng lộ trình chuyển đổi số thực chiến.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoLV7Sz_GogQx4KLhjqNPlLBXfb1lI4lJ-5-5Mtmn3XoPTiY2csMeoAMP-zXY0FG3v86ZTuEVScrw3iOGMeQBHT9N9me1bVaOwlrKpf7C6O8RUf82yJYOIHghq4us2t78Su_K0V3RlylEZTSL-OoiDagiIiMiK-tJlf6G5W-XFjVilNHnzWEhl_cVSK0Xl3g0-Jt-_a1ZNnBJiTe-sb5CN8NqHeiD_8cbA6FKxLmrjafUPZF8XU0eRtQ',
    imageAlt: 'SME Strategic Growth & Operational Consulting',
    rating: 5.0,
    features: [
      'Đánh giá toàn diện hiện trạng tài chính, nhân sự và vận hành',
      'Xây dựng mô hình phân phối đa kênh Online/Offline',
      'Bộ công cụ quản trị P&L, KPI và ngân sách chuyên dụng',
      'Đồng hành tư vấn trực tiếp 1-1 cùng chuyên gia Cao Nguyễn Nhật Triều'
    ],
  },
  {
    id: 'ai-foundations-prompt-design',
    title: 'Khóa Đào Tạo AI Foundations & Prompt Design Cho Doanh Nghiệp',
    category: 'Khóa học',
    price: 149.0,
    description: 'Chương trình huấn luyện nâng cao năng suất tổ chức từ 3x - 5x bằng Generative AI, Kỹ thuật Prompt chuyên sâu và Tự động hóa.',
    fullDetails: 'Giáo trình thực chiến được vinh danh trong TOP Qualcomm Challenges 2026. Học viên được trang bị tư duy ứng dụng AI toàn diện, thực hành xây dựng kịch bản prompt chuẩn xác, tích hợp công cụ AI vào báo cáo quản trị, phân tích thị trường và quản lý công việc hàng ngày.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'AI Foundations and Prompt Design Corporate Training',
    rating: 5.0,
    features: [
      '20+ giờ bài giảng thực hành trực tiếp cùng bộ bài tập tình huống',
      'Thư viện 100+ prompt templates chuẩn hóa cho Tài chính & Vận hành',
      'Hướng dẫn tích hợp AI vào quy trình làm việc thực tế',
      'Chứng nhận hoàn thành khóa đào tạo chuyên nghiệp'
    ],
  },
  {
    id: 'custom-ai-agents-workshop',
    title: 'Khóa Huấn Luyện Xây Dựng AI Agent Trong Sản Xuất & Tài Chính',
    category: 'Khóa học',
    price: 189.0,
    description: 'Khóa đào tạo chuyên sâu xây dựng Custom AI Agent tự động hóa chuỗi quy trình vận hành sản xuất và phân tích tài chính.',
    fullDetails: 'Thiết kế riêng cho cấp quản lý và chuyên viên công nghệ. Nội dung bao gồm kiến trúc Multi-Agent, tích hợp Retrieval-Augmented Generation (RAG), kết nối cơ sở dữ liệu nội bộ bảo mật và tự động hóa báo cáo phân tích rủi ro trong doanh nghiệp.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsEmMVJFAG636BcxL0dGCdSKYa9z7fySqWLI_3CNU85l4YoGEj6WGgTBq_1rJ082ajo_GQ-ULnxFe57OKxF1NgkF6OQ7Bt7Yp6nTolpEaTZm3d5YjDh3sk95MCgYML-TQvoadv0DTXLLgtZIjVms_E2ygKVGVedBOl7gu_BCTP06CCeHDWnbGhTTQYmnL9fx7Jxf91ZSkqQUaOK1jmvfFhAKPITWQxvnf6CZ6PPBUrqBzqPtMOOvzF3Q',
    imageAlt: 'Custom AI Agents Workshop for Manufacturing and Finance',
    rating: 4.9,
    features: [
      'Xây dựng AI Agent xử lý dữ liệu sản xuất và tài chính thực tế',
      'Tự động hóa luồng làm việc với LangChain, n8n và Python',
      'Bảo mật dữ liệu doanh nghiệp và kiểm soát sai số',
      'Kèm mã nguồn mẫu và tài liệu kiến trúc hệ thống'
    ],
  },
  {
    id: 'quantitative-finance-framework',
    title: 'Bộ Khung Mô Hình Tài Chính Lượng Hóa & Kinh Tế Lượng (Excel & Python)',
    category: 'Công cụ số',
    price: 49.0,
    description: 'Bộ công cụ phân tích dữ liệu kinh tế vĩ mô, dự báo tài chính và mô hình hóa rủi ro chuẩn hóa cho nhà quản lý và nhà phân tích.',
    fullDetails: 'Tổng hợp các mô hình kinh tế lượng và tài chính định lượng được tối ưu hóa qua nhiều năm nghiên cứu. Bao gồm mô hình dự báo chu kỳ kinh tế, phân tích chuỗi thời gian, ma trận quản trị rủi ro thanh khoản và bảng điều khiển trực quan hóa dữ liệu kinh doanh.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYIYzU1kT2iP2D9H1eEacDv5L27YJFE2N2zHOP41RGROF8rxZR1jMWAEsnk0t55gQS4QexapBU2wuirG6E13IGaksVKMFljcqw3vuFn7uytAyaRL3qIxCY5lmj1lVG36xdS5bwMfpabjvV95YFoIi24bL3aDaXKklGBBBZBC6JTjiZWrhT898Gg5Py-jUvPfNa2Vp9Mwk1otYYYDDFJ5AlmPLJGxqpNdi4lCt2HYv8voClo_EuQ6sjSQ',
    imageAlt: 'Quantitative Finance & Econometrics Framework',
    rating: 4.9,
    features: [
      '15+ mẫu Excel mô hình tài chính động kèm công thức tự động',
      'Notebook Python trích xuất và phân tích dữ liệu kinh tế vĩ mô',
      'Hướng dẫn phương pháp luận định giá và kiểm định mô hình',
      'Cập nhật dữ liệu định kỳ và hỗ trợ kỹ thuật'
    ],
  },
  {
    id: 'bancassurance-distribution-playbook',
    title: 'Tài Liệu & Bộ Quy Trình Vận Hành Mạng Lưới Phân Phối Toàn Quốc',
    category: 'Sách',
    price: 39.0,
    description: 'Cẩm nang quản trị thực chiến đúc kết từ kinh nghiệm thiết lập 40+ VPĐD và 300+ điểm kết nối tài chính toàn quốc.',
    fullDetails: 'Tài liệu chi tiết về chiến lược mở rộng mạng lưới, quy chế tổ chức và vận hành văn phòng đại diện, chính sách đãi ngộ và KPI đội ngũ bán hàng đa kênh, quản trị đấu thầu và kiểm soát rủi ro phân phối trong ngành tài chính bảo hiểm.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi5iyQr27VrV5oH6_kCbrmdz8la4lr2HG_i88JXxEFJnXfu8dg_hyteNZIHfhOg_RdG_FXGcFfD5o-wqKg1818qgMkP9Xp_6EtCWQinPVl76cUCa0A9T7-a3BUa5GYcHL2CzFQg6n5BmerQ4xHkGYYM2QamXAvFL2nE1itrkOwrk7dL-cZfAtrUJeDj_yQ_1IrxsXVekJ6wrh-1h_eAHTjaYS2_gzMG72HW3JVHfrrktZRS6YoSMpXZQ',
    imageAlt: 'Bancassurance & Territory Distribution Playbook',
    rating: 4.9,
    features: [
      'Quy trình thành lập và vận hành mạng lưới văn phòng đại diện chuẩn',
      'Khung chỉ số KPI, SLA và cơ chế động lực cho đội ngũ kinh doanh',
      'Biểu mẫu quản lý ngân sách, mua sắm và tài sản cố định',
      'Định dạng PDF/ePub chất lượng cao'
    ],
  },
  {
    id: 'edtech-ecosystem-digital-handbook',
    title: 'Giáo Trình Chuyển Đổi Số Giáo Dục & Thiết Kế Hệ Sinh Thái EdTech',
    category: 'Sách',
    price: 29.0,
    description: 'Cẩm nang hướng dẫn chuyển đổi số giáo dục, xây dựng nền tảng học tập cá nhân hóa và quản trị dữ liệu trường học.',
    fullDetails: 'Tài liệu tổng kết từ các dự án triển khai EdTech và Smart Campus. Cung cấp phương pháp tích hợp cổng thanh toán Edupay, xây dựng Knowledge Graph theo dõi năng lực học tập và ứng dụng trợ lý AI trong quản lý học tập.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBwlEkqniFFh1Jo-nNbH1rWEhTlSxip7ipd9qPiTGIUwGRBBCHKQrPTqanZ1StKA2RoA-AAasuaaCkooQP4zUu9YTv-BHS7zf9J8LLtP3d6Q6My5NeN4ZJqDDPEmKWyoJlXzg-WAzLJe27pxXYL8NsLouKmGNOOuxP_H-JyCtis2XiprEKQkDf3CF2K8mAoSNVKxuqRG1RhyG47um0JxXsbLw3gqMxH-Cn1WnIQFDdBow79hvmj5-US-w',
    imageAlt: 'EdTech Digital Transformation Handbook',
    rating: 4.8,
    features: [
      'Khung kiến trúc hệ sinh thái EdTech & Smart School hiện đại',
      'Quy trình tích hợp thanh toán học phí không tiền mặt (Edupay)',
      'Phương pháp luận cá nhân hóa trải nghiệm học tập',
      'Nghiên cứu tình huống thực tiễn tại Việt Nam'
    ],
  },
  {
    id: 'xuat-nhap-khau-thuc-chien-40',
    title: 'Ebook: Xuất Nhập Khẩu Thực Chiến 4.0',
    category: 'Sách',
    price: 39.0,
    description: 'Cẩm nang toàn diện: Từ Zero đến vận hành hệ thống chuyên nghiệp. Cập nhật 2024–2026: Incoterms® 2020, EVFTA/CPTPP/RCEP, Hải quan, Logistics, UCP 600 và AI thương mại số.',
    fullDetails: 'Tài liệu thực chiến chuẩn hóa gồm 15 phần chuyên sâu dành cho người học, chuyên viên và lãnh đạo doanh nghiệp XNK. Nội dung bao gồm: Sơ đồ 13 bước End-to-End, Incoterms® 2020 (FOB, CIF, DDP, bẫy EXW), Quy trình xuất khẩu SOP & chứng từ B/L, Kiểm soát Landed Cost & bẫy Local Charges, Ma trận 27 loại biểu thuế & Hải quan Việt Nam (2024–2026), Tối ưu ưu đãi thuế quan EVFTA/CPTPP/RCEP & quy tắc xuất xứ C/O, Thanh toán quốc tế UCP 600 & rủi ro L/C Discrepancies, Vận tải quốc tế, Ứng dụng AI/e-BL trong thương mại số và bộ biểu mẫu hợp đồng ngoại thương song ngữ, Landed Cost Worksheet, KPI Dashboard cho CEO.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCi5iyQr27VrV5oH6_kCbrmdz8la4lr2HG_i88JXxEFJnXfu8dg_hyteNZIHfhOg_RdG_FXGcFfD5o-wqKg1818qgMkP9Xp_6EtCWQinPVl76cUCa0A9T7-a3BUa5GYcHL2CzFQg6n5BmerQ4xHkGYYM2QamXAvFL2nE1itrkOwrk7dL-cZfAtrUJeDj_yQ_1IrxsXVekJ6wrh-1h_eAHTjaYS2_gzMG72HW3JVHfrrktZRS6YoSMpXZQ',
    imageAlt: 'Ebook Xuất Nhập Khẩu Thực Chiến 4.0 - Cẩm nang toàn diện',
    rating: 5.0,
    features: [
      'Sơ đồ hệ thống 13 bước XNK End-to-End & phân tích điểm chạm rủi ro',
      'Hướng dẫn Incoterms® 2020, SOP xuất khẩu, Landed Cost & bẫy Local Charges',
      'Ma trận 27 loại biểu thuế, tra cứu HS Code & thủ tục hải quan 2024–2026',
      'Tận dụng ưu đãi thuế quan EVFTA, CPTPP, RCEP & quy tắc xuất xứ C/O',
      'Thanh toán quốc tế UCP 600, phòng ngừa rủi ro L/C Discrepancies & bộ biểu mẫu hợp đồng thực chiến'
    ],
  },
  {
    id: 'giao-trinh-dau-tu-chuan-quoc-te',
    title: 'Giáo Trình: Đầu Tư Theo Chuẩn Quốc Tế',
    category: 'Sách',
    price: 45.0,
    description: 'Investment Textbook Following International Standards (Cập nhật 2026). Dành cho sinh viên Tài chính - Ngân hàng và nhà đầu tư chuyên nghiệp. Tuân thủ chuẩn CFA, GIPS, Basel III, IFRS & ESG.',
    fullDetails: 'Ấn phẩm học thuật và thực hành chuyên sâu (133 trang A4) do tác giả Cao Nguyễn Nhật Triều biên soạn. Giáo trình bao gồm 8 chương lý thuyết chuyên sâu và 4 phụ lục chuyên đề, tích hợp 60+ công thức tài chính toán học, 15+ case study thực tế (FPT, Vinamilk, Vietcombank...), 30+ trích dẫn nghiên cứu khoa học quốc tế, 7 bài tập lớn có lời giải chi tiết và từ điển 80+ thuật ngữ Anh-Việt. Nội dung chuẩn hóa theo các tiêu chuẩn quốc tế hàng đầu: CFA Institute Standards, GIPS (Chuẩn mực hiệu quả đầu tư toàn cầu), Basel III (Chuẩn mực an toàn vốn ngân hàng), IFRS (Chuẩn mực báo cáo tài chính quốc tế) và Nguyên tắc ESG/Đầu tư bền vững.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAYIYzU1kT2iP2D9H1eEacDv5L27YJFE2N2zHOP41RGROF8rxZR1jMWAEsnk0t55gQS4QexapBU2wuirG6E13IGaksVKMFljcqw3vuFn7uytAyaRL3qIxCY5lmj1lVG36xdS5bwMfpabjvV95YFoIi24bL3aDaXKklGBBBZBC6JTjiZWrhT898Gg5Py-jUvPfNa2Vp9Mwk1otYYYDDFJ5AlmPLJGxqpNdi4lCt2HYv8voClo_EuQ6sjSQ',
    imageAlt: 'Giáo Trình Đầu Tư Theo Chuẩn Quốc Tế - Cao Nguyễn Nhật Triều',
    rating: 5.0,
    features: [
      '8 chương lý thuyết chuyên sâu & 4 phụ lục chuyên đề (133 trang A4 chuẩn in ấn)',
      'Tuân thủ chuẩn mực quốc tế: CFA Institute, GIPS, Basel III, IFRS, ESG Principles',
      '60+ công thức định lượng (CAPM, MPT, Fama-French, Duration, DCF, DuPont 3-5 bước, VaR/CVaR)',
      '15+ case study phân tích thực tế (FPT, Vinamilk, Vietcombank...) & 7 bài tập có lời giải chi tiết',
      'Từ điển 80+ thuật ngữ chuyên ngành Anh - Việt & tóm tắt 10 nghiên cứu khoa học nền tảng'
    ],
  },
];

export const INITIAL_CONTACTS = [
  {
    id: 'inq-001',
    name: 'Nguyễn Hoàng Nam',
    email: 'nam.nguyen@vinasupply.vn',
    phone: '0908 123 456',
    service: 'econ',
    serviceLabel: 'Tư vấn Kinh tế & Tài chính',
    message: 'Chúng tôi là doanh nghiệp sản xuất bao bì tại Bình Dương, muốn trao đổi với anh Triều về gói tư vấn tối ưu hóa quy trình vận hành và xây dựng AI Agent cho khối quản lý chất lượng.',
    createdAt: '2026-08-22 14:30',
    status: 'new' as const,
    notes: 'Khách hàng tiềm năng cao - Đã kiểm tra hồ sơ công ty sản xuất bao bì',
    source: 'contact_modal' as const,
  },
  {
    id: 'inq-002',
    name: 'Trần Thị Mai Lan',
    email: 'lan.tran@edufuture.edu.vn',
    phone: '0912 345 678',
    service: 'edtech',
    serviceLabel: 'Giải pháp Công nghệ Giáo dục (EdTech)',
    message: 'Ban giám hiệu muốn mời thầy Triều tổ chức buổi Workshop đào tạo "Ứng dụng AI và Prompt Engineering trong giảng dạy đại học" cho 50 giảng viên vào tháng 9 tới.',
    createdAt: '2026-08-21 09:15',
    status: 'contacted' as const,
    notes: 'Đã gửi email phản hồi và tài liệu khung chương trình đào tạo',
    source: 'quick_fab' as const,
  },
  {
    id: 'inq-003',
    name: 'Phạm Quốc Bảo',
    email: 'bao.pham@fintechasia.io',
    phone: '0988 776 554',
    service: 'tech',
    serviceLabel: 'Kiến trúc Phần mềm & Tự động hóa',
    message: 'Chúng tôi muốn tham vấn anh Triều về kinh nghiệm triển khai mạng lưới Kiosk thông minh kết nối ngân hàng và phương án xác thực căn cước công dân gắn chip.',
    createdAt: '2026-08-19 16:45',
    status: 'in_progress' as const,
    notes: 'Đang thảo luận bản đề xuất giải pháp kỹ thuật và thời gian biểu',
    source: 'contact_modal' as const,
  },
];

export const GALLERY_MEDIA_ITEMS: GalleryMediaItem[] = [
  {
    id: 'gal-01',
    title: {
      vi: 'Kiosk Y Tế Thông Minh HDBank & Đề Án 06',
      en: 'HDBank Smart Healthcare Kiosk & Government Project 06',
    },
    subtitle: {
      vi: 'Triển khai 1.001+ Kiosk y tế thông minh toàn quốc, xác thực sinh trắc CCCD gắn chip và thanh toán viện phí không tiền mặt',
      en: 'Deploying 1,001+ Smart Healthcare Kiosks nationwide with biometric Citizen ID chip integration and cashless hospital billing',
    },
    category: 'digital_transformation',
    categoryLabel: {
      vi: 'Chuyển đổi số Y tế',
      en: 'Digital Healthcare',
    },
    badge: 'Đề Án 06 Quốc Gia',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDpj_SV1Ro3r0D--0-kXN9L-DV5eiPGXagqpe0SvyxCKNMLG4EPhDBOa9QotfnQxqRE8Eq9THRWmuHb_Tz9C1NCUk7M07Fwy2CjxEKDrXbBN2TM1aqOrDPNevYyM3qiFb8TuU-WeXOTub23rOII68XXld3LgMjITEDiOlDLZnCj6rtzwyYYFnf03ppgNF4jO00CFzgySjSrnIhGaTOHC-plm2b6tXa62GC3-TlyGXvhaX1Ad9M-H3MBVQ',
    imageAlt: 'HDBank Smart Healthcare Kiosk and Biometric Citizen ID Check-in',
    aspectRatio: 'landscape',
    date: '2025 - 2026',
    sourceLink: {
      label: 'Báo Điện tử Chính phủ',
      sourceName: 'BaoChinhPhu.vn',
      url: 'https://baochinhphu.vn/hdbank-ngan-hang-dau-tien-dua-kiosk-y-te-thong-minh-vao-nang-cao-trai-nghiem-kham-chua-benh-cho-nguoi-dan-102250307164606244.htm',
    },
    description: {
      vi: 'Dự án trọng điểm quy mô quốc gia: Tham gia điều phối PMO và phát triển kinh doanh vùng triển khai 1.001+ Kiosk Y tế Thông minh toàn quốc theo Đề án 06 Chính phủ. Nâng cao trải nghiệm khám chữa bệnh, rút ngắn hơn 70% thời gian chờ đợi của người dân.',
      en: 'National milestone project: Participating in PMO coordination and regional business rollout for 1,001+ Smart Healthcare Kiosks nationwide according to Government Project 06, cutting patient wait time by over 70%.',
    },
    tags: ['Chuyển đổi số', 'Y tế số', 'Đề án 06', 'Kiosk IoT', 'Sinh trắc học CCCD'],
  },
  {
    id: 'gal-02',
    title: {
      vi: 'Chuyển Đổi Số Giáo Dục & Hệ Sinh Thái Tài Chính Số Edupay',
      en: 'Education Digital Transformation & Edupay Financial Ecosystem',
    },
    subtitle: {
      vi: 'Số hóa quản lý giáo dục, thanh toán học phí không dùng tiền mặt và kết nối hệ sinh thái tài chính số Smart Campus',
      en: 'Digitizing academic management, 100% cashless tuition fee settlement and Smart Campus financial ecosystem',
    },
    category: 'digital_transformation',
    categoryLabel: {
      vi: 'Giáo dục số & FinTech',
      en: 'EdTech & FinTech',
    },
    badge: 'Báo Đồng Nai Đưa Tin',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCJamFXC06F0OqcMCKi1NBvVbIDzXF04x8fkCWD4K3qGdnZrJZPSwN4tIvCK6MolWd-Zs_ut5YjLZ2hH58sM2AINwQAmE0bHZyel9KVoX-NL1D4EZIl-nKMs_BPogsPMTOoy4GsoQjspHB453QdZ0U-nr5xKg7dqwAkdnWmKbKzC9mJy-VO6maoPD6t3cbBPfB-UX8q03WXPQxguxcqci_4ufFKFmmaXP3rGbRYBCFhpf2HoUkZCoyMLw',
    imageAlt: 'Chuyển đổi số giáo dục và kết nối hệ sinh thái tài chính số Edupay',
    aspectRatio: 'landscape',
    date: '2026',
    sourceLink: {
      label: 'Báo Đồng Nai - Chuyển đổi số',
      sourceName: 'BaoDongNai.com.vn',
      url: 'https://baodongnai.com.vn/chuyen-doi-so/202606/ket-noi-he-sinh-thai-tai-chinh-so-8d44066/',
    },
    description: {
      vi: 'Triển khai giải pháp chuyển đổi số giáo dục toàn diện, tích hợp hệ sinh thái tài chính số học đường Edupay / Smart Campus liên trường, thúc đẩy thanh toán học phí không dùng tiền mặt 100% an toàn và minh bạch.',
      en: 'Comprehensive digital education rollout: Integrating cross-institution Edupay / Smart Campus financial infrastructure and promoting 100% cashless tuition payment transparency.',
    },
    tags: ['EdTech', 'FinTech học đường', 'Edupay', 'Smart Campus', 'Chuyển đổi số'],
  },
  {
    id: 'gal-03',
    title: {
      vi: 'Chung Kết Qualcomm Vietnam Innovation Challenge 2026',
      en: 'Finalist at Qualcomm Vietnam Innovation Challenge 2026',
    },
    subtitle: {
      vi: 'Nha Trang Hitech tiến vào Vòng Chung kết cuộc thi công nghệ quốc tế danh giá với hệ sinh thái Ontrak Chainflow',
      en: 'Nha Trang Hitech enters global finals with the high-tech Ontrak Chainflow edge AI and IoT ecosystem',
    },
    category: 'events',
    categoryLabel: {
      vi: 'Đổi mới sáng tạo Quốc tế',
      en: 'Global Tech Innovation',
    },
    badge: 'Chung Kết Qualcomm 2026',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'Nha Trang Hitech Qualcomm Innovation Challenge 2026 Finals Ontrak Chainflow',
    aspectRatio: 'landscape',
    date: '2026',
    sourceLink: {
      label: 'Qualcomm Challenges Video',
      sourceName: 'Facebook Video Reel',
      url: 'https://www.facebook.com/reel/1411251914186357',
    },
    description: {
      vi: 'Thành tựu công nghệ quốc tế nổi bật: Nha Trang Hitech xuất sắc vào Vòng Chung kết cuộc thi Qualcomm Vietnam Innovation Challenge 2026 với hệ sinh thái công nghệ cao Ontrak Chainflow tích hợp Edge AI và tự động hóa quy trình.',
      en: 'International tech recognition: Nha Trang Hitech advanced to the Finals of Qualcomm Vietnam Innovation Challenge 2026 featuring the Ontrak Chainflow Edge AI & industrial IoT ecosystem.',
    },
    tags: ['Qualcomm 2026', 'Ontrak Chainflow', 'Edge AI', 'IoT', 'Hitech Innovation'],
  },
  {
    id: 'gal-04',
    title: {
      vi: 'Mạng Lưới 63 Tỉnh Thành & Hàng Trăm TT Hỗ Trợ Bồi Thường TCA',
      en: 'Nationwide Network in 63 Provinces & Claim Support Centers (TCA)',
    },
    subtitle: {
      vi: 'Xây dựng mạng lưới phân phối tài chính - bảo hiểm quy mô toàn quốc và liên minh chiến lược cùng Bảo hiểm PVI',
      en: 'Nationwide financial advisory network scaling across 63 provinces with strategic PVI Insurance alliance',
    },
    category: 'press_coverage',
    categoryLabel: {
      vi: 'Chiến lược & Hệ thống',
      en: 'Strategy & Network',
    },
    badge: 'Mạng Lưới 63 Tỉnh',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoLV7Sz_GogQx4KLhjqNPlLBXfb1lI4lJ-5-5Mtmn3XoPTiY2csMeoAMP-zXY0FG3v86ZTuEVScrw3iOGMeQBHT9N9me1bVaOwlrKpf7C6O8RUf82yJYOIHghq4us2t78Su_K0V3RlylEZTSL-OoiDagiIiMiK-tJlf6G5W-XFjVilNHnzWEhl_cVSK0Xl3g0-Jt-_a1ZNnBJiTe-sb5CN8NqHeiD_8cbA6FKxLmrjafUPZF8XU0eRtQ',
    imageAlt: 'TCA Network Scaling 63 provinces and Claim Support Centers nationwide',
    aspectRatio: 'landscape',
    date: '2023 - 2025',
    sourceLink: {
      label: 'Doanh Nhân Toàn Cầu & Báo PVN',
      sourceName: 'DoanhNhanToanCau.net',
      url: 'https://doanhnhantoancau.net/tca-tung-bung-khai-truong-van-phong-moi.html',
    },
    description: {
      vi: 'Thành tựu phát triển mạng lưới tài chính và bảo hiểm: Xây dựng gần 100 văn phòng đại diện trên 63 tỉnh thành, hàng trăm trung tâm hỗ trợ bồi thường độc lập bảo vệ quyền lợi khách hàng, liên minh chiến lược cùng PVI và Techcombank.',
      en: 'Financial & insurance distribution milestone: Built nearly 100 representative offices across 63 provinces, hundreds of independent claim support centers, and institutional partnerships.',
    },
    tags: ['TCA', 'Bảo hiểm PVI', 'Mạng lưới 63 tỉnh', 'TT Bồi thường', 'Vận hành toàn quốc'],
  },
  {
    id: 'gal-05',
    title: {
      vi: 'Tư Vấn Nền Tảng H2Y Việt Nam & Triển Lãm Beauty Inside You',
      en: 'H2Y Vietnam Platform Advisory & Beauty Inside You Exhibition',
    },
    subtitle: {
      vi: 'Thiết lập mô hình chuỗi cung ứng, thương mại điện tử đa kênh và triển lãm trải nghiệm công nghệ quy mô lớn',
      en: 'Establishing supply chain, multi-channel commerce platform and hosting the Beauty Inside You grand exhibition',
    },
    category: 'events',
    categoryLabel: {
      vi: 'Tư vấn Nền tảng & Sự kiện',
      en: 'Platform & Events',
    },
    badge: 'Báo Tiền Phong',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAsEmMVJFAG636BcxL0dGCdSKYa9z7fySqWLI_3CNU85l4YoGEj6WGgTBq_1rJ082ajo_GQ-ULnxFe57OKxF1NgkF6OQ7Bt7Yp6nTolpEaTZm3d5YjDh3sk95MCgYML-TQvoadv0DTXLLgtZIjVms_E2ygKVGVedBOl7gu_BCTP06CCeHDWnbGhTTQYmnL9fx7Jxf91ZSkqQUaOK1jmvfFhAKPITWQxvnf6CZ6PPBUrqBzqPtMOOvzF3Q',
    imageAlt: 'Nền tảng H2Y Việt Nam và Triển lãm Beauty Inside You',
    aspectRatio: 'landscape',
    date: '2023',
    sourceLink: {
      label: 'Báo Tiền Phong',
      sourceName: 'TienPhong.vn',
      url: 'https://tienphong.vn/beauty-inside-you-2023-trien-lam-my-pham-khoi-day-moi-giac-quan-post1521299.tpo',
    },
    description: {
      vi: 'Tư vấn chiến lược và thiết lập tạo dựng nền tảng H2Y tại Việt Nam giai đoạn đầu: Định hình mô hình phân phối, tích hợp chuỗi cung ứng mỹ phẩm công nghệ cao và đồng hành tổ chức triển lãm trải nghiệm Beauty Inside You.',
      en: 'Foundational advisory and platform inception for H2Y in Vietnam: Formulating omni-channel distribution models, supply chain integration, and orchestrating the Beauty Inside You exhibition.',
    },
    tags: ['H2Y Platform', 'Triển lãm', 'Thương mại điện tử', 'Chuỗi cung ứng', 'Báo Tiền Phong'],
  },
  {
    id: 'gal-06',
    title: {
      vi: 'Chuỗi Talk Show & Podcast: TRIEU CAO & Talks',
      en: 'Media & Podcast Series: TRIEU CAO & Talks',
    },
    subtitle: {
      vi: 'Không gian chia sẻ tri thức thực chiến về Kinh tế, Công nghệ, Khởi nghiệp & Kỹ năng lãnh đạo trên YouTube và Spotify',
      en: 'Practical knowledge exchange space on Macroeconomics, Tech, Startups & Leadership on YouTube and Spotify',
    },
    category: 'media_podcast',
    categoryLabel: {
      vi: 'Kênh Truyền thông & Podcast',
      en: 'Media & Podcasts',
    },
    badge: 'YouTube & Spotify',
    imageUrl: 'https://i.ytimg.com/vi/y-_DxX8pUFQ/hqdefault.jpg',
    imageAlt: 'TRIEU CAO & Talks Media Podcast and Strategic Thought Leadership',
    aspectRatio: 'landscape',
    date: '2024 - 2026',
    sourceLink: {
      label: 'Kênh YouTube @TrieuCaoandTalks',
      sourceName: 'YouTube / Spotify',
      url: 'https://www.youtube.com/@TrieuCaoandTalks',
    },
    description: {
      vi: 'Kênh truyền thông chuyên sâu kết nối tri thức học thuật với thực tiễn thương trường: Cung cấp các tập phân tích chuyên sâu về An ninh mạng, Tương lai việc làm, Công nghệ xanh và Chuyển đổi số.',
      en: 'Dedicated media channel bridging theory and executive business execution: Delivering analytical episodes on Cybersecurity, Future of Work, Green Tech and Digital Transformation.',
    },
    tags: ['YouTube Channel', 'Spotify Podcast', 'TRIEU CAO and Talks', 'Luận đàm', 'Tri thức thực chiến'],
  },
  {
    id: 'gal-07',
    title: {
      vi: 'Đài Truyền Hình HTV: Thúc Đẩy Doanh Nghiệp Công Nghệ Thương Mại Hóa Sản Phẩm',
      en: 'HTV Television: Promoting Technology Businesses to Commercialize Products',
    },
    subtitle: {
      vi: 'Ông Cao Nguyễn Nhật Triều (COO Nha Trang Hitech) trao đổi trên sóng HTV về lợi thế TP.HCM và thương mại hóa kết quả nghiên cứu công nghệ',
      en: 'Cao Nguyen Nhat Trieu (COO Nha Trang Hitech) interviewed on HTV discussing HCMC tech advantages and R&D product commercialization',
    },
    category: 'press_coverage',
    categoryLabel: {
      vi: 'Truyền hình & Báo chí',
      en: 'Television & Press',
    },
    badge: 'Đài Truyền Hình HTV',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'Đài Truyền hình HTV đưa tin ông Cao Nguyễn Nhật Triều trao đổi về thương mại hóa sản phẩm công nghệ',
    aspectRatio: 'landscape',
    date: '09/2026',
    sourceLink: {
      label: 'Đài Truyền hình HTV',
      sourceName: 'HTV.vn',
      url: 'https://htv.vn/thuc-day-doanh-nghiep-cong-nghe-thuong-mai-hoa-san-pham-22226090516104883.htm',
    },
    videoUrl: 'https://www.youtube.com/watch?si=UJ3MoshsIuSK-RwE&v=y-_DxX8pUFQ&feature=youtu.be',
    description: {
      vi: 'Dấu ấn chuyên gia trên sóng Đài Phát thanh và Truyền hình TP.HCM (HTV): Ông Cao Nguyễn Nhật Triều, Giám đốc điều hành Công ty TNHH MTV Công Nghệ Cao Nha Trang, chia sẻ về chiến lược đưa sản phẩm công nghệ từ phòng nghiên cứu ra thị trường thương mại, tận dụng tối đa nguồn nhân lực trẻ, năng động và hệ sinh thái đổi mới sáng tạo của TP.HCM.',
      en: 'Special television feature on HTV: Cao Nguyen Nhat Trieu, COO of Nha Trang Hitech, shares strategic perspectives on taking technology products from R&D labs into commercial markets, capitalizing on Ho Chi Minh City dynamic young talent and premier tech hub.',
    },
    tags: ['Đài Truyền hình HTV', 'HTV.vn', 'Thương mại hóa', 'Nha Trang Hitech', 'Đổi mới sáng tạo', 'Khoa học công nghệ'],
  },
  {
    id: 'gal-08',
    title: {
      vi: 'Chương Trình Luật Phát Triển Đô Thị: Đóng Góp Ý Kiến & Thương Mại Hóa Công Nghệ',
      en: 'Urban Development Law Program: Expert Contributions & Tech Commercialization',
    },
    subtitle: {
      vi: 'Ông Cao Nguyễn Nhật Triều xuất hiện đóng góp ý kiến từ phút 11:00 về Khoản 5 Điều 29 (Cơ chế Sandbox & ưu đãi công nghệ chiến lược)',
      en: 'Cao Nguyen Nhat Trieu featured from minute 11:00 discussing Clause 5 Article 29 (Sandbox mechanisms & strategic tech incentives)',
    },
    category: 'press_coverage',
    categoryLabel: {
      vi: 'Truyền hình & Chính sách',
      en: 'Television & Policy',
    },
    badge: 'Luật Phát Triển Đô Thị | Phút 11:00',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'Đóng góp ý kiến của ông Cao Nguyễn Nhật Triều trong chương trình Luật Phát Triển Đô Thị',
    aspectRatio: 'landscape',
    date: '2026',
    sourceLink: {
      label: 'Chương trình phát sóng',
      sourceName: 'YouTube Livestream (Từ phút 11:00)',
      url: 'https://www.youtube.com/live/gPXndsELXvw?si=SgTTNQzKH1KXrKUF&t=660s',
    },
    videoUrl: 'https://www.youtube.com/live/gPXndsELXvw?si=SgTTNQzKH1KXrKUF&t=660s',
    description: {
      vi: 'Khách mời đóng góp ý kiến từ phút thứ 11:00 trong chương trình thảo luận về Luật Phát Triển Đô Thị: Phân tích cơ hội và kỳ vọng của cộng đồng doanh nghiệp công nghệ, đặc biệt là Khoản 5 Điều 29 về thử nghiệm có kiểm soát (Sandbox) và chính sách ưu đãi các ngành công nghệ chiến lược nhằm thúc đẩy thương mại hóa giải pháp công nghệ tại TP.HCM.',
      en: 'Expert speaker contribution from minute 11:00 in the Urban Development Law discussion: Analyzing opportunities and business expectations, specifically Clause 5 Article 29 on regulatory sandboxes and strategic tech incentives to empower commercialization in HCMC.',
    },
    tags: ['Luật Phát Triển Đô Thị', 'Cơ chế Sandbox', 'Điều 29', 'Khoa học công nghệ', 'Thương mại hóa', 'Nha Trang Hitech'],
  },
];

