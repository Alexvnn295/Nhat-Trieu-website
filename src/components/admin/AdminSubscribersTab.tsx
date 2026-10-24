import React, { useState } from 'react';
import { NewsletterSubscriber } from '../../types';
import {
  Users,
  Search,
  Mail,
  Download,
  Copy,
  Trash2,
  CheckCircle2,
  Clock,
  Sparkles,
  Send,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AdminSubscribersTabProps {
  subscribers: NewsletterSubscriber[];
  onDeleteSubscriber: (idOrEmail: string) => Promise<boolean>;
  onNavigateToMarketing: () => void;
}

export const AdminSubscribersTab: React.FC<AdminSubscribersTabProps> = ({
  subscribers,
  onDeleteSubscriber,
  onNavigateToMarketing,
}) => {
  const { showSuccess, showError } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredSubscribers = subscribers.filter((s) => {
    return (
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.source && s.source.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleCopyEmails = () => {
    if (subscribers.length === 0) {
      showError('Không có email để sao chép');
      return;
    }
    const emails = subscribers.map((s) => s.email).join(', ');
    navigator.clipboard.writeText(emails);
    showSuccess(`Đã sao chép ${subscribers.length} email vào clipboard`);
  };

  const exportCSV = () => {
    if (subscribers.length === 0) {
      showError('Chưa có độc giả đăng ký nào');
      return;
    }

    const headers = ['ID', 'Email', 'Nguồn Đăng Ký', 'Trạng Thái', 'Ngày Đăng Ký'];
    const rows = subscribers.map((s) => [
      s.id,
      s.email,
      s.source || 'website',
      s.active ? 'Hoạt động' : 'Hủy nhận tin',
      new Date(s.subscribedAt).toLocaleString('vi-VN'),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `subscribers-trieu-portfolio-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess('Đã xuất danh sách độc giả sang tệp CSV');
  };

  const handleDelete = async (idOrEmail: string) => {
    const success = await onDeleteSubscriber(idOrEmail);
    if (success) {
      showSuccess('Đã xóa độc giả khỏi danh sách');
      setConfirmDeleteId(null);
    } else {
      showError('Lỗi khi xóa độc giả');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Users className="w-5 h-5 text-emerald-600" />
              Độc Giả Bản Tin & Danh Sách Đăng Ký
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Danh sách độc giả, nhà quản lý, và đối tác đăng ký nhận các báo cáo phân tích và bài viết mới.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleCopyEmails}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              <Copy className="w-3.5 h-3.5" />
              Sao Chép Email
            </button>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Xuất CSV
            </button>
            <button
              onClick={onNavigateToMarketing}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              Soạn Bản Tin Mới
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-100/60">
            <span className="text-xs font-medium text-emerald-700">Tổng số độc giả</span>
            <p className="text-xl font-bold text-emerald-900 mt-0.5">{subscribers.length}</p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-xs font-medium text-slate-500">Trạng thái hoạt động</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">
              {subscribers.filter((s) => s.active !== false).length}
            </p>
          </div>
          <div className="p-3.5 bg-indigo-50 rounded-lg border border-indigo-100/60">
            <span className="text-xs font-medium text-indigo-700">Đăng ký từ bài viết & trang chủ</span>
            <p className="text-xl font-bold text-indigo-900 mt-0.5">
              {subscribers.filter((s) => s.source?.includes('home') || s.source?.includes('blog')).length || subscribers.length}
            </p>
          </div>
          <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-100/60">
            <span className="text-xs font-medium text-amber-700">Tỷ lệ hủy đăng ký</span>
            <p className="text-xl font-bold text-amber-900 mt-0.5">0.0%</p>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Tìm theo địa chỉ email hoặc nguồn đăng ký..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      {/* Subscribers Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-xs font-semibold text-slate-700 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Email Độc Giả</th>
                <th className="px-5 py-3.5">Nguồn Đăng Ký</th>
                <th className="px-5 py-3.5">Trạng Thái</th>
                <th className="px-5 py-3.5">Thời Gian</th>
                <th className="px-5 py-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredSubscribers.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-medium text-slate-900 flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    {sub.email}
                  </td>
                  <td className="px-5 py-4">
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-600 text-xs rounded-md">
                      {sub.source || 'website'}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-700 font-medium">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Hoạt động
                    </span>
                  </td>
                  <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap">
                    {new Date(sub.subscribedAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setConfirmDeleteId(sub.id || sub.email)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                      title="Hủy đăng ký / Xóa"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredSubscribers.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Không tìm thấy độc giả nào</p>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Xác nhận xóa độc giả</h3>
            <p className="text-sm text-slate-500 mt-2">
              Bạn có chắc muốn xóa độc giả này khỏi danh sách nhận bản tin?
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleDelete(confirmDeleteId)}
                className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg cursor-pointer"
              >
                Xác nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
