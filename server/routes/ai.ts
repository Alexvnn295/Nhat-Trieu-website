import { Router } from 'express';
import { GoogleGenAI } from '@google/genai';
import { db } from '../db';

const router = Router();

let aiClient: GoogleGenAI | null = null;

function getGenAI(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error('Khóa API GEMINI_API_KEY chưa được cấu hình trên server.');
    }
    aiClient = new GoogleGenAI({ apiKey });
  }
  return aiClient;
}

// POST /api/ai/chat - AI Advisory Consultation Chat
router.post('/chat', async (req, res) => {
  try {
    const { message, language = 'vi' } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ success: false, error: 'Tin nhắn câu hỏi là bắt buộc' });
    }

    const profile = db.getProfile();
    const systemPrompt = `Bạn là Trợ lý Cố vấn Trí tuệ Nhân tạo (Executive AI Advisor) đại diện cho Chuyên gia ${profile.name} - ${profile.titleVi} (${profile.titleEn}).
Lĩnh vực chuyên môn:
- Hoạch định Chiến lược Doanh nghiệp & Chuyển đổi số.
- Tối ưu hóa Vận hành & Kiến trúc Hệ thống Enterprise.
- Công nghệ Giáo dục (EdTech) & Cá nhân hóa Lộ trình Học tập.
- Ứng dụng Trí tuệ Nhân tạo (AI), Phân tích Dữ liệu Lớn & Kinh tế lượng (Econometrics).
- Tư vấn & Đồng hành cùng Doanh nghiệp, Nhà đầu tư và Tổ chức Giáo dục.

Nguyên tắc phản hồi:
- Tác phong: Chuyên nghiệp, nhã nhặn, sắc bén, mang tính chiến lược và xây dựng cao.
- Ngôn ngữ: Phản hồi bằng tiếng Việt (hoặc tiếng Anh nếu người dùng hỏi bằng tiếng Anh), rõ ràng, có cấu trúc bullet point hoặc đoạn văn khúc chiết.
- Không bịa đặt thông tin cá nhân. Khuyến khích người dùng để lại thông tin tại mục 'Liên hệ' hoặc đặt lịch hẹn trao đổi chi tiết nếu là các bài toán chuyển đổi thực tế.`;

    // Check if GEMINI_API_KEY is available
    if (!process.env.GEMINI_API_KEY) {
      // Graceful smart consultation fallback
      return res.json({
        success: true,
        source: 'fallback_advisory',
        reply: `Chào bạn, tôi là Trợ lý Cố vấn AI của Chuyên gia ${profile.name}.\n\n` +
          `Về câu hỏi của bạn ("${message.trim()}"): Đối với các bài toán chiến lược, tối ưu vận hành hoặc tích hợp công nghệ AI, chuyên gia Nhật Triều luôn ưu tiên phương pháp tiếp cận dựa trên dữ liệu định lượng và kiến trúc mở.\n\n` +
          `Để nhận tư vấn chi tiết và giải pháp tùy biến cho doanh nghiệp của bạn, bạn có thể gửi yêu cầu trực tiếp qua biểu mẫu Tư Vấn hoặc liên hệ qua email ${profile.contact?.email || 'trieucnn@gmail.com'}.\n\n` +
          `*(Ghi chú kỹ thuật: Để kích hoạt toàn bộ khả năng phân tích nâng cao của Gemini 3.8 Flash, vui lòng thiết lập biến môi trường GEMINI_API_KEY trong cài đặt dự án)*`,
      });
    }

    // Call Gemini API with automatic fallback
    const ai = getGenAI();
    let reply = '';
    let source = 'gemini_3.8_flash';

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: message,
        config: {
          systemInstruction: systemPrompt,
          temperature: 0.7,
        },
      });
      reply = response.text || '';
    } catch (primaryErr: any) {
      console.warn('Gemini 3.8 Flash high demand, trying gemini-2.5-flash...', primaryErr?.message);
      try {
        const fallbackRes = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: message,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.7,
          },
        });
        reply = fallbackRes.text || '';
        source = 'gemini_2.5_flash';
      } catch (fallbackErr: any) {
        console.warn('Gemini upstream busy, using executive knowledge base...', fallbackErr?.message);
        reply = `Chào bạn, hiện tại kênh AI đang xử lý lưu lượng cao. Dựa trên hồ sơ chuyên môn của Chuyên gia ${profile.name}:\n\n` +
          `• Lĩnh vực: ${profile.titleVi}\n` +
          `• Năng lực cốt lõi: Chiến lược kinh doanh, Kiến trúc công nghệ quy mô lớn, Chuyển đổi số, EdTech và Kinh tế lượng.\n` +
          `• Về câu hỏi của bạn: Để có phương án triển khai chuẩn xác và đo lường được ROI cho tổ chức, bạn có thể gửi tin nhắn chi tiết qua mục 'Liên Hệ' hoặc gửi email tới ${profile.contact?.email || 'trieucnn@gmail.com'}.`;
        source = 'executive_knowledge_base';
      }
    }

    res.json({
      success: true,
      source,
      reply: reply || 'Hệ thống đã ghi nhận câu hỏi của bạn. Vui lòng thử lại sau ít giây.',
    });
  } catch (error: any) {
    console.error('Error in /api/ai/chat:', error);
    res.status(500).json({
      success: false,
      error: error.message || 'Lỗi xử lý yêu cầu AI từ máy chủ',
    });
  }
});

export default router;
