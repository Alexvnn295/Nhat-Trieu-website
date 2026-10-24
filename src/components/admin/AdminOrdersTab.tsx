import React, { useState } from 'react';
import { Order } from '../../types';
import {
  ShoppingBag,
  Search,
  Filter,
  Eye,
  CheckCircle2,
  Clock,
  AlertCircle,
  XCircle,
  DollarSign,
  Download,
  Trash2,
  X,
  CreditCard,
  User,
  Mail,
  Phone,
  Calendar,
  Tag,
  FileText,
  Check
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AdminOrdersTabProps {
  orders: Order[];
  onUpdateOrderStatus: (id: string, status: Order['paymentStatus'], notes?: string) => Promise<boolean>;
  onDeleteOrder: (id: string) => Promise<boolean>;
}

export const AdminOrdersTab: React.FC<AdminOrdersTabProps> = ({
  orders,
  onUpdateOrderStatus,
  onDeleteOrder,
}) => {
  const { showSuccess, showError } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | Order['paymentStatus']>('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [orderNotes, setOrderNotes] = useState('');
  const [updatingStatus, setUpdatingStatus] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (o.customerPhone && o.customerPhone.includes(searchQuery));
    const matchesStatus = statusFilter === 'all' || o.paymentStatus === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Calculate stats
  const totalRevenue = orders
    .filter((o) => o.paymentStatus === 'completed')
    .reduce((sum, o) => sum + (o.total || 0), 0);
  const completedOrders = orders.filter((o) => o.paymentStatus === 'completed').length;
  const pendingOrders = orders.filter((o) => o.paymentStatus === 'pending').length;

  const handleOpenDetail = (order: Order) => {
    setSelectedOrder(order);
    setOrderNotes(order.notes || '');
  };

  const handleStatusChange = async (newStatus: Order['paymentStatus']) => {
    if (!selectedOrder) return;
    setUpdatingStatus(newStatus);
    const success = await onUpdateOrderStatus(selectedOrder.id, newStatus, orderNotes);
    if (success) {
      showSuccess(`Đã cập nhật trạng thái đơn ${selectedOrder.id} sang: ${getStatusLabel(newStatus)}`);
      setSelectedOrder({ ...selectedOrder, paymentStatus: newStatus, notes: orderNotes });
    } else {
      showError('Không thể cập nhật trạng thái đơn hàng');
    }
    setUpdatingStatus(null);
  };

  const handleSaveNotes = async () => {
    if (!selectedOrder) return;
    const success = await onUpdateOrderStatus(selectedOrder.id, selectedOrder.paymentStatus, orderNotes);
    if (success) {
      showSuccess('Đã lưu ghi chú đơn hàng');
      setSelectedOrder({ ...selectedOrder, notes: orderNotes });
    } else {
      showError('Lỗi lưu ghi chú đơn hàng');
    }
  };

  const handleDelete = async (id: string) => {
    const success = await onDeleteOrder(id);
    if (success) {
      showSuccess('Đã xóa đơn hàng thành công');
      setConfirmDeleteId(null);
      if (selectedOrder?.id === id) setSelectedOrder(null);
    } else {
      showError('Lỗi khi xóa đơn hàng');
    }
  };

  const exportCSV = () => {
    if (orders.length === 0) {
      showError('Chưa có đơn hàng nào để xuất');
      return;
    }

    const headers = ['Mã Đơn', 'Khách Hàng', 'Email', 'Điện Thoại', 'Tổng Tiền (USD)', 'Trạng Thái', 'Phương Thức', 'Mã Giảm', 'Ngày Tạo'];
    const rows = orders.map((o) => [
      o.id,
      `"${o.customerName}"`,
      o.customerEmail,
      o.customerPhone || '',
      o.total,
      o.paymentStatus,
      o.paymentMethod || 'chuyển khoản',
      o.accessCodeApplied || '',
      new Date(o.createdAt).toLocaleString('vi-VN'),
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `don-hang-trieu-portfolio-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showSuccess('Đã xuất danh sách đơn hàng ra tệp CSV');
  };

  const getStatusBadge = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            Đã thanh toán
          </span>
        );
      case 'pending':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Chờ xác nhận
          </span>
        );
      case 'failed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">
            <XCircle className="w-3 h-3 text-rose-600" />
            Thất bại
          </span>
        );
      case 'refunded':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-200">
            <AlertCircle className="w-3 h-3 text-slate-600" />
            Đã hoàn tiền
          </span>
        );
      default:
        return null;
    }
  };

  const getStatusLabel = (status: Order['paymentStatus']) => {
    switch (status) {
      case 'completed':
        return 'Đã thanh toán';
      case 'pending':
        return 'Chờ xác nhận';
      case 'failed':
        return 'Thất bại';
      case 'refunded':
        return 'Đã hoàn tiền';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Metrics */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-emerald-600" />
              Quản Trị Đơn Hàng & Doanh Thu
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Theo dõi và xác nhận các giao dịch sách điện tử, tài liệu chuyên khảo, và khóa đào tạo trực tuyến.
            </p>
          </div>
          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-medium rounded-lg transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Xuất Báo Cáo (CSV)
          </button>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-100/60">
            <span className="text-xs font-medium text-emerald-700">Tổng doanh thu thực tế</span>
            <p className="text-xl font-bold text-emerald-900 mt-0.5">
              ${totalRevenue.toLocaleString()}
              <span className="text-xs font-normal text-emerald-700 ml-1">
                (~{(totalRevenue * 25400).toLocaleString('vi-VN')} đ)
              </span>
            </p>
          </div>
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-xs font-medium text-slate-500">Tổng số đơn hàng</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{orders.length}</p>
          </div>
          <div className="p-3.5 bg-emerald-50/50 rounded-lg border border-emerald-100/50">
            <span className="text-xs font-medium text-emerald-700">Đơn đã hoàn tất</span>
            <p className="text-xl font-bold text-emerald-900 mt-0.5">{completedOrders}</p>
          </div>
          <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-100/60">
            <span className="text-xs font-medium text-amber-700">Chờ xác nhận chuyển khoản</span>
            <p className="text-xl font-bold text-amber-900 mt-0.5">{pendingOrders}</p>
          </div>
        </div>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo mã đơn, họ tên khách hàng, email, số điện thoại..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as any)}
            className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="completed">Đã thanh toán</option>
            <option value="failed">Thất bại</option>
            <option value="refunded">Đã hoàn tiền</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 border-b border-slate-200/80 text-xs font-semibold text-slate-700 uppercase tracking-wider">
              <tr>
                <th className="px-5 py-3.5">Mã Đơn Hàng</th>
                <th className="px-5 py-3.5">Khách Hàng</th>
                <th className="px-5 py-3.5">Sản Phẩm</th>
                <th className="px-5 py-3.5">Tổng Tiền</th>
                <th className="px-5 py-3.5">Trạng Thái</th>
                <th className="px-5 py-3.5">Thời Gian</th>
                <th className="px-5 py-3.5 text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((order) => (
                <tr key={order.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="px-5 py-4 font-mono font-bold text-xs text-slate-900">
                    {order.id}
                  </td>
                  <td className="px-5 py-4">
                    <div className="font-medium text-slate-900">{order.customerName}</div>
                    <div className="text-xs text-slate-400">{order.customerEmail}</div>
                  </td>
                  <td className="px-5 py-4">
                    <span className="text-xs font-medium text-slate-700">
                      {order.items?.length || 0} sản phẩm
                    </span>
                    {order.items && order.items[0] && (
                      <p className="text-[11px] text-slate-400 truncate max-w-[180px]">
                        {order.items[0].title}
                      </p>
                    )}
                  </td>
                  <td className="px-5 py-4 font-bold text-slate-900">
                    ${order.total}
                    {order.accessCodeApplied && (
                      <span className="ml-1 text-[10px] text-emerald-600 font-mono bg-emerald-50 px-1 rounded">
                        {order.accessCodeApplied}
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4">{getStatusBadge(order.paymentStatus)}</td>
                  <td className="px-5 py-4 text-xs text-slate-400 whitespace-nowrap">
                    {new Date(order.createdAt).toLocaleDateString('vi-VN', {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </td>
                  <td className="px-5 py-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => handleOpenDetail(order)}
                        className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                        title="Xem chi tiết đơn hàng"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setConfirmDeleteId(order.id)}
                        className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                        title="Xóa đơn hàng"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <ShoppingBag className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm text-slate-500">Không tìm thấy đơn hàng nào</p>
          </div>
        )}
      </div>

      {/* Detail Drawer / Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-5">
              <div>
                <span className="text-xs font-mono text-emerald-600 font-bold uppercase">
                  Đơn Hàng #{selectedOrder.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                  Chi Tiết Giao Dịch & Khách Hàng
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Customer Info Card */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-500" />
                Thông Tin Khách Hàng
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div>
                  <span className="text-slate-400">Họ và Tên:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedOrder.customerName}</p>
                </div>
                <div>
                  <span className="text-slate-400">Email:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedOrder.customerEmail}</p>
                </div>
                <div>
                  <span className="text-slate-400">Số Điện Thoại:</span>
                  <p className="font-semibold text-slate-800 mt-0.5">{selectedOrder.customerPhone || 'Không cung cấp'}</p>
                </div>
              </div>
            </div>

            {/* Items List */}
            <div className="mb-5">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <ShoppingBag className="w-4 h-4 text-slate-500" />
                Danh Sách Sản Phẩm ({selectedOrder.items?.length || 0})
              </h4>
              <div className="border border-slate-200/80 rounded-xl overflow-hidden divide-y divide-slate-100">
                {selectedOrder.items?.map((item, idx) => (
                  <div key={idx} className="p-3.5 flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-slate-400 text-[11px] mt-0.5">Số lượng: {item.quantity}</p>
                    </div>
                    <span className="font-bold text-slate-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-5 text-xs space-y-2">
              <div className="flex justify-between text-slate-500">
                <span>Tạm tính (Subtotal):</span>
                <span>${selectedOrder.subtotal || selectedOrder.total}</span>
              </div>
              {selectedOrder.discount > 0 && (
                <div className="flex justify-between text-emerald-600 font-medium">
                  <span className="flex items-center gap-1">
                    <Tag className="w-3.5 h-3.5" />
                    Giảm giá ({selectedOrder.accessCodeApplied || 'Khuyến mãi'}):
                  </span>
                  <span>-${selectedOrder.discount}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-200">
                <span>Tổng Thanh Toán:</span>
                <span className="text-emerald-700 font-mono">${selectedOrder.total}</span>
              </div>
            </div>

            {/* Change Status Controls */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Cập Nhật Trạng Thái Giao Dịch
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(['pending', 'completed', 'failed', 'refunded'] as Order['paymentStatus'][]).map((st) => (
                  <button
                    key={st}
                    type="button"
                    disabled={updatingStatus !== null}
                    onClick={() => handleStatusChange(st)}
                    className={`px-3 py-2 rounded-lg text-xs font-medium border text-center transition-all cursor-pointer ${
                      selectedOrder.paymentStatus === st
                        ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {selectedOrder.paymentStatus === st && <Check className="w-3.5 h-3.5 inline mr-1" />}
                    {getStatusLabel(st)}
                  </button>
                ))}
              </div>
            </div>

            {/* Admin Internal Notes */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1">
                Ghi Chú Quản Trị Viên (Internal Notes)
              </label>
              <textarea
                rows={2}
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="VD: Đã đối soát qua tài khoản Vietcombank, đã gửi link tải qua email..."
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <div className="flex justify-end mt-1.5">
                <button
                  type="button"
                  onClick={handleSaveNotes}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-900 text-white text-xs font-medium rounded cursor-pointer"
                >
                  Lưu Ghi Chú
                </button>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setSelectedOrder(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-medium rounded-lg cursor-pointer"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Xóa bản ghi đơn hàng</h3>
            <p className="text-sm text-slate-500 mt-2">
              Bạn có chắc chắn muốn xóa đơn hàng #{confirmDeleteId}? Dữ liệu sẽ bị xóa khỏi hệ thống.
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
