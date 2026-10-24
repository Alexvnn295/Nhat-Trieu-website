import React, { useState } from 'react';
import {
  Key,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock,
  Calendar,
  Shield,
  Sparkles,
  Copy,
  Check,
  AlertTriangle,
  Lock,
  Unlock,
  Layers,
  Search,
  Filter,
  RefreshCw,
  Users,
  ChevronRight,
  ExternalLink,
  Info
} from 'lucide-react';
import { AccessCode, AccessCodeType, AccessCodeScope } from '../../types';
import { SYSTEM_PERMISSIONS, SystemPermissionOption } from '../../data/accessCodesData';
import { useData } from '../../context/DataContext';
import { useLanguage } from '../../context/LanguageContext';
import { useToast } from '../../context/ToastContext';

export const AdminAccessCodesTab: React.FC = () => {
  const {
    accessCodes,
    addAccessCode,
    updateAccessCode,
    deleteAccessCode,
    toggleAccessCodeStatus,
    extendAccessCodeExpiry,
  } = useData();

  const { formatPrice } = useLanguage();
  const { showSuccess, showError } = useToast();

  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'expired' | 'inactive'>('all');
  const [typeFilter, setTypeFilter] = useState<'all' | AccessCodeType>('all');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Form State for creating/editing
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<AccessCode | null>(null);

  const getInitialFormState = (): Partial<AccessCode> => ({
    code: '',
    description: '',
    type: 'discount_percent',
    discountPercent: 30,
    discountAmountUsd: 0,
    scope: 'all',
    validFrom: new Date().toISOString().slice(0, 10),
    validUntil: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
    hasExpiry: true,
    maxUsage: 100,
    permissions: ['full_download', 'priority_support'],
    isActive: true,
    assignedTo: '',
    notes: '',
  });

  const [formData, setFormData] = useState<Partial<AccessCode>>(getInitialFormState());

  const handleOpenCreateModal = () => {
    setEditingCode(null);
    setFormData(getInitialFormState());
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (codeItem: AccessCode) => {
    setEditingCode(codeItem);
    setFormData({ ...codeItem });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCode(null);
  };

  const handleGenerateRandomCode = () => {
    const prefixes = ['TRIEU', 'PORTFOLIO', 'DOSSIER', 'EXEC', 'VIP', 'CORP', 'STRATEGY', 'AI-PRO'];
    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const generated = `${prefix}-${randomNum}`;
    setFormData((prev) => ({ ...prev, code: generated }));
  };

  const handlePermissionToggle = (permId: string) => {
    setFormData((prev) => {
      const current = prev.permissions || [];
      if (current.includes(permId)) {
        return { ...prev, permissions: current.filter((p) => p !== permId) };
      } else {
        return { ...prev, permissions: [...current, permId] };
      }
    });
  };

  const handleQuickAddDays = (days: number) => {
    const target = new Date();
    target.setDate(target.getDate() + days);
    setFormData((prev) => ({
      ...prev,
      hasExpiry: true,
      validUntil: target.toISOString().slice(0, 10),
    }));
  };

  const handleSaveCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.code.trim()) {
      showError('Thiếu mã code', 'Vui lòng nhập ký hiệu mã code truy cập.');
      return;
    }

    const cleanCode = formData.code.trim().toUpperCase();

    // Check duplicate code
    const duplicate = accessCodes.find(
      (c) => c.code === cleanCode && (!editingCode || c.id !== editingCode.id)
    );
    if (duplicate) {
      showError('Mã đã tồn tại', `Mã "${cleanCode}" đã được thiết lập trước đó. Vui lòng chọn ký hiệu khác.`);
      return;
    }

    const payload = {
      code: cleanCode,
      description: formData.description || 'Mã quyền hạn & ưu đãi đặc biệt',
      type: formData.type || 'discount_percent',
      discountPercent: Number(formData.discountPercent) || 0,
      discountAmountUsd: Number(formData.discountAmountUsd) || 0,
      scope: formData.scope || 'all',
      validFrom: formData.validFrom || new Date().toISOString().slice(0, 10),
      validUntil: formData.validUntil || new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      hasExpiry: formData.hasExpiry !== undefined ? formData.hasExpiry : true,
      maxUsage: Number(formData.maxUsage) || 0,
      permissions: formData.permissions || [],
      isActive: formData.isActive !== undefined ? formData.isActive : true,
      assignedTo: formData.assignedTo || 'Chung',
      notes: formData.notes || '',
    };

    if (editingCode) {
      updateAccessCode(editingCode.id, payload);
      showSuccess('Cập nhật mã thành công', `Đã lưu các thay đổi cho mã "${cleanCode}".`);
    } else {
      addAccessCode(payload);
      showSuccess('Tạo mã mới thành công', `Mã truy cập "${cleanCode}" đã sẵn sàng hoạt động.`);
    }

    handleCloseModal();
  };

  const handleCopyCode = (codeStr: string, id: string) => {
    navigator.clipboard.writeText(codeStr);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
    showSuccess('Đã sao chép', `Đã sao chép mã "${codeStr}" vào bộ nhớ tạm.`);
  };

  const handleDeleteCode = (id: string, codeStr: string) => {
    if (window.confirm(`Bạn có chắc chắn muốn xóa vĩnh viễn mã truy cập "${codeStr}"?`)) {
      deleteAccessCode(id);
      showSuccess('Đã xóa mã', `Đã xóa mã "${codeStr}" khỏi hệ thống.`);
    }
  };

  // Status calculation helper
  const getCodeStatusInfo = (codeItem: AccessCode) => {
    if (!codeItem.isActive) {
      return {
        label: 'Đã tạm khóa',
        bg: 'bg-slate-100 text-slate-700 border-slate-300',
        dot: 'bg-slate-500',
        statusKey: 'inactive',
      };
    }

    if (codeItem.hasExpiry && codeItem.validUntil) {
      const today = new Date().toISOString().slice(0, 10);
      if (today > codeItem.validUntil) {
        return {
          label: 'Đã hết hạn',
          bg: 'bg-rose-100 text-rose-800 border-rose-300',
          dot: 'bg-rose-600',
          statusKey: 'expired',
        };
      }

      // Check if expiring in 7 days
      const diffMs = new Date(codeItem.validUntil).getTime() - new Date().getTime();
      const diffDays = Math.ceil(diffMs / (1000 * 60 * 60 * 24));
      if (diffDays <= 7 && diffDays >= 0) {
        return {
          label: `Còn ${diffDays} ngày`,
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          dot: 'bg-amber-500',
          statusKey: 'active',
        };
      }
    }

    if (!codeItem.hasExpiry) {
      return {
        label: 'Vĩnh viễn',
        bg: 'bg-purple-100 text-purple-800 border-purple-300',
        dot: 'bg-purple-600',
        statusKey: 'active',
      };
    }

    return {
      label: 'Đang hiệu lực',
      bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
      dot: 'bg-emerald-600',
      statusKey: 'active',
    };
  };

  // Filtered List
  const filteredCodes = accessCodes.filter((item) => {
    const matchesSearch =
      item.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.assignedTo && item.assignedTo.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));

    const statusInfo = getCodeStatusInfo(item);
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'active' && statusInfo.statusKey === 'active') ||
      (statusFilter === 'expired' && statusInfo.statusKey === 'expired') ||
      (statusFilter === 'inactive' && statusInfo.statusKey === 'inactive');

    const matchesType = typeFilter === 'all' || item.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Summary Metrics
  const metrics = {
    total: accessCodes.length,
    active: accessCodes.filter((c) => getCodeStatusInfo(c).statusKey === 'active').length,
    fullVip: accessCodes.filter((c) => c.type === 'full_access').length,
    totalUsed: accessCodes.reduce((sum, c) => sum + (c.usedCount || 0), 0),
  };

  return (
    <div className="space-y-6">
      {/* Header and Privacy Notice */}
      <div className="bg-white border border-[#bfc9c3]/60 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="p-1.5 bg-[#003527] text-white rounded-lg">
                <Key className="w-5 h-5" />
              </span>
              <h2 className="font-display text-[22px] font-bold text-[#003527]">
                Quản lý Mã Quyền hạn & Khóa Truy cập Nội bộ
              </h2>
            </div>
            <p className="font-body text-[14px] text-[#404944] max-w-3xl">
              Hệ thống quản lý và cấp mã đặc quyền số riêng tư: Mở khóa Hồ sơ Năng lực (Portfolio), In ấn PDF Dossier, chiết khấu mua sắm và cấp phép dịch vụ cố vấn cao cấp.
            </p>
          </div>

          <button
            onClick={handleOpenCreateModal}
            className="bg-[#003527] hover:bg-[#064e3b] text-white px-5 py-2.5 rounded-xl font-body text-[14px] font-bold shadow-sm transition-transform active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
          >
            <Plus className="w-4 h-4" /> Tạo Mã Quyền Hạn Mới
          </button>
        </div>

        {/* Confidential System Alert */}
        <div className="mt-5 p-3.5 bg-[#eff4ff] border border-[#003527]/20 rounded-xl flex items-start gap-3">
          <Shield className="w-5 h-5 text-[#003527] shrink-0 mt-0.5" />
          <div className="text-[13px] font-body text-[#003527]">
            <strong>Bảo mật & Quyền riêng tư:</strong> Toàn bộ các mã được tạo tại đây <strong>hoàn toàn ẩn khỏi toàn bộ giao diện công cộng (Portfolio & Cửa hàng)</strong>. Khách hàng hoặc đối tác cần nhập chính xác mã được cấp riêng để hệ thống tự động mở khóa Hồ sơ Năng lực hoặc áp dụng chiết khấu/đặc quyền tương ứng.
          </div>
        </div>
      </div>

      {/* Metrics Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white border border-[#bfc9c3]/50 rounded-xl p-4 shadow-sm">
          <span className="text-[12px] font-body text-[#707974] font-medium block">Tổng số mã code</span>
          <span className="font-display text-[24px] font-bold text-[#0b1c30]">{metrics.total}</span>
        </div>
        <div className="bg-white border border-[#bfc9c3]/50 rounded-xl p-4 shadow-sm">
          <span className="text-[12px] font-body text-emerald-700 font-medium block">Đang hoạt động</span>
          <span className="font-display text-[24px] font-bold text-emerald-700">{metrics.active}</span>
        </div>
        <div className="bg-white border border-[#bfc9c3]/50 rounded-xl p-4 shadow-sm">
          <span className="text-[12px] font-body text-purple-700 font-medium block">Mã VIP 100% (Full)</span>
          <span className="font-display text-[24px] font-bold text-purple-700">{metrics.fullVip}</span>
        </div>
        <div className="bg-white border border-[#bfc9c3]/50 rounded-xl p-4 shadow-sm">
          <span className="text-[12px] font-body text-[#003527] font-medium block">Lượt áp dụng thực tế</span>
          <span className="font-display text-[24px] font-bold text-[#003527]">{metrics.totalUsed}</span>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="bg-white border border-[#bfc9c3]/60 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#707974] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm theo mã, đối tượng cấp, mô tả..."
            className="w-full pl-10 pr-4 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-xl text-[13px] font-body outline-none focus:border-[#003527]"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Status Filter */}
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="px-3 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-xl text-[13px] font-body text-[#0b1c30] outline-none focus:border-[#003527]"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hiệu lực</option>
            <option value="expired">Đã hết hạn</option>
            <option value="inactive">Đã tạm khóa</option>
          </select>

          {/* Type Filter */}
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as any)}
            className="px-3 py-2 bg-[#f8f9ff] border border-[#bfc9c3] rounded-xl text-[13px] font-body text-[#0b1c30] outline-none focus:border-[#003527]"
          >
            <option value="all">Tất cả loại quyền</option>
            <option value="full_access">Mở khóa VIP 100%</option>
            <option value="discount_percent">Giảm giá theo %</option>
            <option value="special_privilege">Đặc quyền chuyên biệt</option>
          </select>
        </div>
      </div>

      {/* Access Codes Table & Cards */}
      <div className="bg-white border border-[#bfc9c3]/60 rounded-2xl shadow-sm overflow-hidden">
        {filteredCodes.length === 0 ? (
          <div className="p-12 text-center">
            <Key className="w-12 h-12 text-[#bfc9c3] mx-auto mb-3" />
            <h3 className="font-display text-[17px] font-bold text-[#0b1c30] mb-1">
              Không tìm thấy mã truy cập phù hợp
            </h3>
            <p className="font-body text-[13px] text-[#707974] max-w-sm mx-auto mb-4">
              Không có mã code nào khớp với bộ lọc hoặc từ khóa tìm kiếm của bạn.
            </p>
            <button
              onClick={handleOpenCreateModal}
              className="bg-[#003527] text-white px-4 py-2 rounded-xl text-[13px] font-body font-bold hover:bg-[#064e3b] cursor-pointer"
            >
              + Tạo mã truy cập đầu tiên
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#f8f9ff] border-b border-[#bfc9c3]/60 text-[12px] font-body font-bold text-[#404944] uppercase tracking-wider">
                  <th className="py-3.5 px-4">Mã Code / Ký hiệu</th>
                  <th className="py-3.5 px-4">Loại & Ưu đãi</th>
                  <th className="py-3.5 px-4">Thời gian hiệu lực</th>
                  <th className="py-3.5 px-4">Quyền hạn kèm theo</th>
                  <th className="py-3.5 px-4">Lượt dùng</th>
                  <th className="py-3.5 px-4">Trạng thái</th>
                  <th className="py-3.5 px-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#bfc9c3]/40 text-[13px] font-body">
                {filteredCodes.map((item) => {
                  const statusInfo = getCodeStatusInfo(item);
                  return (
                    <tr key={item.id} className="hover:bg-[#eff4ff]/40 transition-colors">
                      {/* Code and Description */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[14px] font-bold text-[#003527] bg-[#f0fdf4] border border-[#bbf7d0] px-2.5 py-1 rounded-lg">
                            {item.code}
                          </span>
                          <button
                            onClick={() => handleCopyCode(item.code, item.id)}
                            className="text-[#707974] hover:text-[#003527] p-1 rounded transition-colors cursor-pointer"
                            title="Sao chép mã"
                          >
                            {copiedId === item.id ? (
                              <Check className="w-4 h-4 text-emerald-600" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                        <p className="text-[12px] text-[#404944] mt-1 font-medium line-clamp-1">
                          {item.description}
                        </p>
                        {item.assignedTo && (
                          <span className="inline-flex items-center gap-1 text-[11px] text-[#707974] mt-0.5">
                            <Users className="w-3 h-3 text-[#003527]" /> {item.assignedTo}
                          </span>
                        )}
                      </td>

                      {/* Type and Value */}
                      <td className="py-4 px-4 align-top">
                        {item.type === 'full_access' && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-purple-100 text-purple-800 border border-purple-300">
                            <Sparkles className="w-3 h-3" /> VIP 100% OFF
                          </span>
                        )}
                        {item.type === 'discount_percent' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Giảm {item.discountPercent}%
                          </span>
                        )}
                        {item.type === 'special_privilege' && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-800 border border-blue-300">
                            Đặc quyền riêng
                          </span>
                        )}
                        <span className="block text-[11px] text-[#707974] mt-1 capitalize">
                          Áp dụng: {item.scope === 'all' ? 'Toàn bộ cửa hàng' : item.scope}
                        </span>
                      </td>

                      {/* Expiry & Time */}
                      <td className="py-4 px-4 align-top">
                        <div className="space-y-1">
                          {item.hasExpiry ? (
                            <>
                              <div className="flex items-center gap-1.5 text-[12px] text-[#0b1c30]">
                                <Calendar className="w-3.5 h-3.5 text-[#707974]" />
                                <span>Đến: <strong>{item.validUntil}</strong></span>
                              </div>
                              <span className="text-[11px] text-[#707974] block">
                                Bắt đầu: {item.validFrom || 'Ngay bây giờ'}
                              </span>
                            </>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-[12px] font-medium text-purple-700">
                              <Clock className="w-3.5 h-3.5" /> Không giới hạn thời gian
                            </span>
                          )}

                          {/* Quick Extend button if expired or near expiry */}
                          {item.hasExpiry && (
                            <button
                              onClick={() => {
                                extendAccessCodeExpiry(item.id, 30);
                                showSuccess('Gia hạn thành công', `Đã cộng thêm 30 ngày hiệu lực cho mã ${item.code}.`);
                              }}
                              className="text-[11px] text-[#003527] hover:underline font-semibold flex items-center gap-1 cursor-pointer pt-0.5"
                            >
                              + Gia hạn 30 ngày
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Permissions Granted */}
                      <td className="py-4 px-4 align-top max-w-xs">
                        <div className="flex flex-wrap gap-1">
                          {item.permissions && item.permissions.length > 0 ? (
                            item.permissions.map((permId) => {
                              const permObj = SYSTEM_PERMISSIONS.find((p) => p.id === permId);
                              return (
                                <span
                                  key={permId}
                                  className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                                    permObj ? permObj.badgeColor : 'bg-slate-100 text-slate-800'
                                  }`}
                                  title={permObj ? permObj.descriptionVi : permId}
                                >
                                  {permObj ? permObj.nameVi : permId}
                                </span>
                              );
                            })
                          ) : (
                            <span className="text-[11px] text-[#707974] italic">Chỉ chiết khấu</span>
                          )}
                        </div>
                      </td>

                      {/* Usage */}
                      <td className="py-4 px-4 align-top">
                        <div className="text-[12px] font-medium text-[#0b1c30]">
                          {item.usedCount || 0}
                          {item.maxUsage > 0 ? ` / ${item.maxUsage}` : ' (không giới hạn)'}
                        </div>
                        {item.maxUsage > 0 && (
                          <div className="w-16 bg-[#e2e8f0] h-1.5 rounded-full mt-1 overflow-hidden">
                            <div
                              className="bg-[#003527] h-full rounded-full"
                              style={{
                                width: `${Math.min(100, ((item.usedCount || 0) / item.maxUsage) * 100)}%`,
                              }}
                            />
                          </div>
                        )}
                      </td>

                      {/* Status */}
                      <td className="py-4 px-4 align-top">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toggleAccessCodeStatus(item.id)}
                            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border transition-colors cursor-pointer ${statusInfo.bg}`}
                            title="Nhấp để chuyển trạng thái Bật/Tắt"
                          >
                            <span className={`w-1.5 h-1.5 rounded-full ${statusInfo.dot}`} />
                            {statusInfo.label}
                          </button>
                        </div>
                      </td>

                      {/* Action buttons */}
                      <td className="py-4 px-4 align-top text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditModal(item)}
                            className="p-1.5 text-[#404944] hover:text-[#003527] hover:bg-white rounded-lg transition-colors border border-transparent hover:border-[#bfc9c3] cursor-pointer"
                            title="Chỉnh sửa mã & quyền hạn"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteCode(item.id, item.code)}
                            className="p-1.5 text-[#404944] hover:text-red-600 hover:bg-white rounded-lg transition-colors border border-transparent hover:border-red-200 cursor-pointer"
                            title="Xóa mã"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Create / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 md:p-8 border border-[#bfc9c3]/60 shadow-2xl my-8 relative">
            <div className="flex items-center justify-between pb-4 border-b border-[#bfc9c3]/50 mb-6">
              <div className="flex items-center gap-2.5">
                <span className="p-2 bg-[#003527] text-white rounded-xl">
                  <Key className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-display text-[20px] font-bold text-[#003527]">
                    {editingCode ? 'Chỉnh Sửa Mã Quyền Hạn & Thời Gian' : 'Thiết Lập Mã Truy Cập Mới'}
                  </h3>
                  <p className="text-[12px] font-body text-[#707974]">
                    Cấu hình thời gian hết hạn, tỷ lệ chiết khấu và danh mục quyền hạn cấp phép.
                  </p>
                </div>
              </div>

              <button
                onClick={handleCloseModal}
                className="text-[#707974] hover:text-[#0b1c30] p-1.5 rounded-lg cursor-pointer"
              >
                <XCircle className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSaveCode} className="space-y-5 font-body">
              {/* Row 1: Code String & Random Generate */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#0b1c30] mb-1.5">
                    Ký hiệu Mã Code <span className="text-red-500">*</span>
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      required
                      value={formData.code || ''}
                      onChange={(e) => setFormData({ ...formData, code: e.target.value.toUpperCase() })}
                      placeholder="Ví dụ: VIP-EXECUTIVE-2026"
                      className="w-full px-3.5 py-2.5 uppercase font-mono font-bold bg-[#f8f9ff] border border-[#bfc9c3] rounded-xl text-[14px] outline-none focus:border-[#003527]"
                    />
                    <button
                      type="button"
                      onClick={handleGenerateRandomCode}
                      className="px-3 py-2 bg-[#eff4ff] hover:bg-[#dbeafe] text-[#003527] border border-[#003527]/30 rounded-xl text-[12px] font-bold shrink-0 cursor-pointer"
                      title="Tạo mã ngẫu nhiên"
                    >
                      Tạo ngẫu nhiên
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0b1c30] mb-1.5">
                    Đối tượng cấp phát (Assigned To)
                  </label>
                  <input
                    type="text"
                    value={formData.assignedTo || ''}
                    onChange={(e) => setFormData({ ...formData, assignedTo: e.target.value })}
                    placeholder="Ví dụ: Lãnh đạo EdTech, Đối tác chiến lược..."
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-xl text-[13px] outline-none focus:border-[#003527]"
                  />
                </div>
              </div>

              {/* Row 2: Description */}
              <div>
                <label className="block text-[13px] font-bold text-[#0b1c30] mb-1.5">
                  Mô tả / Mục đích sử dụng
                </label>
                <input
                  type="text"
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Ví dụ: Quyền tiếp cận 100% tài nguyên số & Khóa học dành cho đối tác chiến lược"
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-xl text-[13px] outline-none focus:border-[#003527]"
                />
              </div>

              {/* Row 3: Code Type & Value & Scope */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-[#f8f9ff] border border-[#bfc9c3]/50 rounded-xl">
                <div>
                  <label className="block text-[12px] font-bold text-[#0b1c30] mb-1">
                    Loại hình mã
                  </label>
                  <select
                    value={formData.type || 'discount_percent'}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#bfc9c3] rounded-lg text-[13px] outline-none focus:border-[#003527]"
                  >
                    <option value="full_access">Mở khóa VIP 100% (Free Toàn Bộ)</option>
                    <option value="discount_percent">Chiết khấu theo phần trăm (%)</option>
                    <option value="special_privilege">Đặc quyền chuyên biệt</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#0b1c30] mb-1">
                    {formData.type === 'full_access' ? 'Mức giảm (%)' : 'Giá trị chiết khấu (%)'}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    disabled={formData.type === 'full_access'}
                    value={formData.type === 'full_access' ? 100 : formData.discountPercent || 0}
                    onChange={(e) => setFormData({ ...formData, discountPercent: Number(e.target.value) })}
                    className={`w-full px-3 py-2 bg-white border border-[#bfc9c3] rounded-lg text-[13px] outline-none focus:border-[#003527] ${
                      formData.type === 'full_access' ? 'opacity-70 bg-slate-100 font-bold text-purple-700' : ''
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-[12px] font-bold text-[#0b1c30] mb-1">
                    Phạm vi áp dụng
                  </label>
                  <select
                    value={formData.scope || 'all'}
                    onChange={(e) => setFormData({ ...formData, scope: e.target.value as any })}
                    className="w-full px-3 py-2 bg-white border border-[#bfc9c3] rounded-lg text-[13px] outline-none focus:border-[#003527]"
                  >
                    <option value="all">Toàn bộ cửa hàng (All)</option>
                    <option value="tools">Chỉ Công cụ số & Source Code</option>
                    <option value="courses">Chỉ Khóa học & Đào tạo</option>
                    <option value="books">Chỉ Sách & Ấn phẩm</option>
                  </select>
                </div>
              </div>

              {/* Row 4: Time and Expiry Controls */}
              <div className="p-4 bg-[#f8f9ff] border border-[#bfc9c3]/50 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#003527]" />
                    <span className="text-[13px] font-bold text-[#0b1c30]">
                      Thiết lập Thời gian & Hạn sử dụng
                    </span>
                  </div>

                  <label className="inline-flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.hasExpiry}
                      onChange={(e) => setFormData({ ...formData, hasExpiry: e.target.checked })}
                      className="w-4 h-4 text-[#003527] rounded focus:ring-0"
                    />
                    <span className="text-[12px] font-medium text-[#404944]">Có giới hạn thời gian</span>
                  </label>
                </div>

                {formData.hasExpiry ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block text-[12px] text-[#707974] mb-1">Ngày bắt đầu hiệu lực</label>
                      <input
                        type="date"
                        value={formData.validFrom || ''}
                        onChange={(e) => setFormData({ ...formData, validFrom: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#bfc9c3] rounded-lg text-[13px] outline-none focus:border-[#003527]"
                      />
                    </div>
                    <div>
                      <label className="block text-[12px] text-[#707974] mb-1">Ngày hết hạn</label>
                      <input
                        type="date"
                        value={formData.validUntil || ''}
                        onChange={(e) => setFormData({ ...formData, validUntil: e.target.value })}
                        className="w-full px-3 py-2 bg-white border border-[#bfc9c3] rounded-lg text-[13px] outline-none focus:border-[#003527]"
                      />
                    </div>

                    <div className="sm:col-span-2 flex flex-wrap gap-2 pt-1">
                      <span className="text-[11px] text-[#707974] self-center">Chọn nhanh:</span>
                      <button
                        type="button"
                        onClick={() => handleQuickAddDays(30)}
                        className="px-2.5 py-1 bg-white hover:bg-[#eff4ff] border border-[#bfc9c3] rounded-md text-[11px] font-medium cursor-pointer"
                      >
                        +30 Ngày
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAddDays(90)}
                        className="px-2.5 py-1 bg-white hover:bg-[#eff4ff] border border-[#bfc9c3] rounded-md text-[11px] font-medium cursor-pointer"
                      >
                        +90 Ngày (3 tháng)
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickAddDays(365)}
                        className="px-2.5 py-1 bg-white hover:bg-[#eff4ff] border border-[#bfc9c3] rounded-md text-[11px] font-medium cursor-pointer"
                      >
                        +1 Năm (365 ngày)
                      </button>
                      <button
                        type="button"
                        onClick={() => setFormData((prev) => ({ ...prev, hasExpiry: false }))}
                        className="px-2.5 py-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-300 rounded-md text-[11px] font-medium cursor-pointer"
                      >
                        Vĩnh viễn
                      </button>
                    </div>
                  </div>
                ) : (
                  <p className="text-[12px] text-purple-700 italic bg-purple-50 p-2.5 rounded-lg border border-purple-200">
                    Mã này sẽ có hiệu lực vĩnh viễn (cho đến khi Quản trị viên chủ động khóa hoặc xóa mã).
                  </p>
                )}
              </div>

              {/* Row 5: Max Usage and Active Toggle */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[13px] font-bold text-[#0b1c30] mb-1.5">
                    Số lượt sử dụng tối đa
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={formData.maxUsage || 0}
                    onChange={(e) => setFormData({ ...formData, maxUsage: Number(e.target.value) })}
                    placeholder="0 = Không giới hạn số lượt"
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-xl text-[13px] outline-none focus:border-[#003527]"
                  />
                  <span className="text-[11px] text-[#707974] mt-1 block">
                    (Nhập 0 để cho phép sử dụng không giới hạn số lượt)
                  </span>
                </div>

                <div>
                  <label className="block text-[13px] font-bold text-[#0b1c30] mb-1.5">
                    Trạng thái kích hoạt
                  </label>
                  <select
                    value={formData.isActive ? 'active' : 'inactive'}
                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'active' })}
                    className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-xl text-[13px] outline-none focus:border-[#003527]"
                  >
                    <option value="active">Kích hoạt ngay (Active)</option>
                    <option value="inactive">Tạm khóa mã (Inactive)</option>
                  </select>
                </div>
              </div>

              {/* Row 6: System Permissions Multi-select */}
              <div>
                <label className="block text-[13px] font-bold text-[#0b1c30] mb-2">
                  Thiết lập Quyền hạn Mở khóa (Permissions Matrix)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {SYSTEM_PERMISSIONS.map((perm) => {
                    const isChecked = (formData.permissions || []).includes(perm.id);
                    return (
                      <label
                        key={perm.id}
                        className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#eff4ff] border-[#003527] shadow-xs'
                            : 'bg-white border-[#bfc9c3]/60 hover:bg-[#f8f9ff]'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => handlePermissionToggle(perm.id)}
                          className="mt-0.5 w-4 h-4 text-[#003527] rounded focus:ring-0 cursor-pointer"
                        />
                        <div className="flex-1">
                          <span className="text-[12px] font-bold text-[#003527] block">
                            {perm.nameVi}
                          </span>
                          <span className="text-[11px] text-[#404944] block mt-0.5 leading-snug">
                            {perm.descriptionVi}
                          </span>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Row 7: Notes */}
              <div>
                <label className="block text-[13px] font-bold text-[#0b1c30] mb-1.5">
                  Ghi chú nội bộ của Quản trị viên
                </label>
                <textarea
                  rows={2}
                  value={formData.notes || ''}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="Ghi chú thêm về điều kiện trao mã, hợp đồng đối tác, hoặc trường hợp ngoại lệ..."
                  className="w-full px-3.5 py-2.5 bg-[#f8f9ff] border border-[#bfc9c3] rounded-xl text-[13px] outline-none focus:border-[#003527]"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#bfc9c3]/50">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-5 py-2.5 rounded-xl border border-[#bfc9c3] font-body text-[13px] font-medium text-[#404944] hover:bg-[#f8f9ff] cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#003527] hover:bg-[#064e3b] text-white font-body text-[13px] font-bold shadow-sm transition-transform active:scale-95 cursor-pointer"
                >
                  {editingCode ? 'Lưu Thay Đổi' : 'Tạo Mã Quyền Hạn'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
