import React, { useState } from 'react';
import { Project } from '../../types';
import {
  Layers,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  ExternalLink,
  CheckCircle2,
  Calendar,
  Building,
  Tag,
  Star,
  X,
  Save,
  Eye,
  AlertCircle
} from 'lucide-react';
import { useToast } from '../../context/ToastContext';

interface AdminProjectsTabProps {
  projects: Project[];
  onAddProject: (project: Omit<Project, 'id'> & { id?: string }) => void;
  onUpdateProject: (id: string, updated: Partial<Project>) => void;
  onDeleteProject: (id: string) => void;
}

export const AdminProjectsTab: React.FC<AdminProjectsTabProps> = ({
  projects,
  onAddProject,
  onUpdateProject,
  onDeleteProject,
}) => {
  const { showSuccess, showError } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Form State matching Project interface
  const initialFormState: Omit<Project, 'id'> = {
    title: '',
    badge: 'Dự Án Trọng Điểm',
    category: 'Thương mại hóa & Công nghệ',
    excerpt: '',
    description: '',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC0nfs-QE97ZSzPp1ePqwuJnL9Y8sYkh8kidQJAYCebU14EOYejcoy9MduTqZ6lBVKP_LVgLtpAESpHDLSokI62umBM_p5Cw1x36O4RItYPSxNB2V8zvzHD26W63AW2QrivLe6xQHlDODhloJjb7GASV5l3nmo50gpO12WWVwIJchubus92f_j_9aSfpEwwVzZnlpM_TY3QgTQ8KAo-3hH5Hf0RoSkHJen3B2MdR7CEfnTIYWCNQMaaDA',
    imageAlt: 'Hình ảnh dự án thực tế',
    techStack: ['AI Solution', 'Digital Transformation', 'Enterprise Tech'],
    highlights: ['Triển khai thực tế trên quy mô lớn', 'Hiệu quả đo lường minh bạch'],
    featured: false,
    articleUrl: '',
    videoUrl: '',
    pressSource: '',
    pressTitle: '',
  };

  const [formData, setFormData] = useState<Omit<Project, 'id'>>(initialFormState);
  const [techInput, setTechInput] = useState('');
  const [highlightInput, setHighlightInput] = useState('');

  const categories = [
    'all',
    'Thương mại hóa & Công nghệ',
    'App Product',
    'Web Platform',
    'System Architecture',
    'Educational Ebook'
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.badge && p.badge.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.techStack?.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProject(null);
    setFormData(initialFormState);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project: Project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      badge: project.badge || 'Dự Án',
      category: project.category,
      excerpt: project.excerpt || '',
      description: project.description || '',
      image: project.image,
      imageAlt: project.imageAlt || project.title,
      techStack: project.techStack || [],
      highlights: project.highlights || [],
      featured: Boolean(project.featured),
      articleUrl: project.articleUrl || '',
      videoUrl: project.videoUrl || '',
      pressSource: project.pressSource || '',
      pressTitle: project.pressTitle || '',
    });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.excerpt.trim()) {
      showError('Vui lòng điền tiêu đề và tóm tắt của dự án');
      return;
    }

    if (editingProject) {
      onUpdateProject(editingProject.id, formData);
      showSuccess(`Đã cập nhật dự án: ${formData.title}`);
    } else {
      onAddProject(formData);
      showSuccess(`Đã thêm dự án mới: ${formData.title}`);
    }

    setIsFormOpen(false);
  };

  const handleDelete = (id: string, title: string) => {
    onDeleteProject(id);
    setConfirmDeleteId(null);
    showSuccess(`Đã xóa dự án: ${title}`);
  };

  const handleAddTech = () => {
    if (techInput.trim() && !formData.techStack?.includes(techInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        techStack: [...(prev.techStack || []), techInput.trim()],
      }));
      setTechInput('');
    }
  };

  const handleRemoveTech = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      techStack: prev.techStack?.filter((t) => t !== tag) || [],
    }));
  };

  const handleAddHighlight = () => {
    if (highlightInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        highlights: [...(prev.highlights || []), highlightInput.trim()],
      }));
      setHighlightInput('');
    }
  };

  const handleRemoveHighlight = (idx: number) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights?.filter((_, i) => i !== idx) || [],
    }));
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Metrics */}
      <div className="bg-white rounded-xl p-6 border border-slate-200/80 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-600" />
              Quản Trị Dự Án & Portfolio Doanh Nghiệp
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Quản lý toàn bộ case study, giải pháp công nghệ, dự án y tế và hệ thống chuyển đổi số đã thực hiện.
            </p>
          </div>
          <button
            id="admin-add-project-btn"
            onClick={handleOpenAdd}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Thêm Dự Án Mới
          </button>
        </div>

        {/* Quick stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-slate-100">
          <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
            <span className="text-xs font-medium text-slate-500">Tổng số dự án</span>
            <p className="text-xl font-bold text-slate-900 mt-0.5">{projects.length}</p>
          </div>
          <div className="p-3.5 bg-amber-50 rounded-lg border border-amber-100/60">
            <span className="text-xs font-medium text-amber-700">Dự án tiêu biểu (Featured)</span>
            <p className="text-xl font-bold text-amber-900 mt-0.5">
              {projects.filter((p) => p.featured).length}
            </p>
          </div>
          <div className="p-3.5 bg-emerald-50 rounded-lg border border-emerald-100/60">
            <span className="text-xs font-medium text-emerald-700">Công nghệ & Giải pháp</span>
            <p className="text-xl font-bold text-emerald-900 mt-0.5">
              {projects.reduce((acc, p) => acc + (p.techStack?.length || 0), 0)} tags
            </p>
          </div>
          <div className="p-3.5 bg-indigo-50 rounded-lg border border-indigo-100/60">
            <span className="text-xs font-medium text-indigo-700">Phân loại danh mục</span>
            <p className="text-xl font-bold text-indigo-900 mt-0.5">
              {new Set(projects.map((p) => p.category)).size}
            </p>
          </div>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm theo tên dự án, huy hiệu, công nghệ..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-white border border-slate-200 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-slate-700"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'all' ? 'Tất cả danh mục' : c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-white rounded-xl border border-slate-200/80 overflow-hidden shadow-sm flex flex-col hover:shadow-md transition-shadow group"
          >
            <div className="relative h-44 bg-slate-100 overflow-hidden">
              <img
                src={project.image}
                alt={project.imageAlt || project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
              <div className="absolute top-3 left-3 flex items-center gap-2">
                <span className="px-2 py-0.5 bg-slate-900/80 backdrop-blur-sm text-white text-[11px] font-medium rounded">
                  {project.category}
                </span>
                {project.featured && (
                  <span className="px-2 py-0.5 bg-amber-500 text-slate-950 text-[11px] font-bold rounded flex items-center gap-1 shadow-sm">
                    <Star className="w-3 h-3 fill-current" />
                    Featured
                  </span>
                )}
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white text-xs">
                <span className="font-semibold drop-shadow">{project.badge}</span>
                {project.pressSource && (
                  <span className="text-[11px] text-white/80 drop-shadow">{project.pressSource}</span>
                )}
              </div>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-base leading-snug line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-xs text-slate-500 mt-2 line-clamp-3 leading-relaxed">
                  {project.excerpt}
                </p>

                {/* Tech Stack */}
                {project.techStack && project.techStack.length > 0 && (
                  <div className="flex flex-wrap gap-1 mt-3">
                    {project.techStack.slice(0, 4).map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-slate-100 text-slate-600 text-[10px] font-medium rounded"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 4 && (
                      <span className="px-1.5 py-0.5 text-slate-400 text-[10px]">
                        +{project.techStack.length - 4}
                      </span>
                    )}
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-medium text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                  {project.badge || 'Dự án'}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenEdit(project)}
                    className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded transition-colors cursor-pointer"
                    title="Chỉnh sửa dự án"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setConfirmDeleteId(project.id)}
                    className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                    title="Xóa dự án"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12 bg-white rounded-xl border border-slate-200">
          <Layers className="w-10 h-10 text-slate-300 mx-auto mb-3" />
          <p className="text-sm text-slate-500">Không tìm thấy dự án phù hợp với bộ lọc</p>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-sm w-full p-6 shadow-xl border border-slate-200">
            <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-slate-900">Xác nhận xóa dự án</h3>
            <p className="text-sm text-slate-500 mt-2">
              Hành động này sẽ xóa vĩnh viễn dự án khỏi cơ sở dữ liệu. Bạn có chắc chắn muốn tiếp tục?
            </p>
            <div className="flex items-center justify-end gap-3 mt-6">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => {
                  const target = projects.find((p) => p.id === confirmDeleteId);
                  if (target) handleDelete(target.id, target.title);
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-lg transition-colors cursor-pointer"
              >
                Xác nhận Xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 my-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4 mb-6">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                {editingProject ? 'Chỉnh Sửa Dự Án' : 'Thêm Dự Án Mới'}
              </h3>
              <button
                onClick={() => setIsFormOpen(false)}
                className="text-slate-400 hover:text-slate-600 p-1.5 rounded-lg transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tiêu Đề Dự Án *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Ví dụ: Kiosk Y Tế Thông Minh & Cổng Tiếp Nhận Bệnh Nhân Tự Động"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Huy Hiệu / Đơn Vị Đồng Hành (Badge)
                  </label>
                  <input
                    type="text"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    placeholder="Ví dụ: Đài Truyền Hình HTV, Bệnh Viện Nhi Đồng"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Danh Mục
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Thương mại hóa & Công nghệ">Thương mại hóa & Công nghệ</option>
                    <option value="App Product">Ứng Dụng Sản Phẩm (App Product)</option>
                    <option value="Web Platform">Nền Tảng Web (Web Platform)</option>
                    <option value="System Architecture">Kiến Trúc Hệ Thống (System Architecture)</option>
                    <option value="Educational Ebook">Sách & Tài Liệu (Educational Ebook)</option>
                  </select>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Ảnh Bìa Dự Án (URL)
                  </label>
                  <input
                    type="text"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tóm Tắt Ngắn (Excerpt) *
                  </label>
                  <textarea
                    rows={2}
                    required
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Tóm tắt ngắn gọn bài toán, giải pháp và kết quả đạt được..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mô Tả Toàn Diện & Phương Pháp Luận (Description)
                  </label>
                  <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Chi tiết nghiên cứu, kiến trúc kỹ thuật, tác động kinh tế..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono text-xs"
                  />
                </div>

                {/* Tech stack */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Công Nghệ & Kỹ Năng (Tech Stack)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={techInput}
                      onChange={(e) => setTechInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddTech();
                        }
                      }}
                      placeholder="Thêm tag công nghệ (VD: React, Docker, Qualcomm AI)..."
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddTech}
                      className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium cursor-pointer"
                    >
                      Thêm
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {formData.techStack?.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full text-xs font-medium"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTech(tag)}
                          className="text-slate-400 hover:text-slate-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Highlights */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Điểm Nổi Bật & Tác Động (Highlights)
                  </label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={highlightInput}
                      onChange={(e) => setHighlightInput(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddHighlight();
                        }
                      }}
                      placeholder="Ví dụ: Giảm 65% thời gian chờ đợi bệnh nhân..."
                      className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs"
                    />
                    <button
                      type="button"
                      onClick={handleAddHighlight}
                      className="px-3 py-1.5 bg-slate-800 text-white rounded-lg text-xs font-medium cursor-pointer"
                    >
                      Thêm
                    </button>
                  </div>
                  <div className="space-y-1">
                    {formData.highlights?.map((imp, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between px-3 py-1.5 bg-emerald-50/70 border border-emerald-100 rounded-lg text-xs text-emerald-900"
                      >
                        <span className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                          {imp}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveHighlight(idx)}
                          className="text-emerald-700 hover:text-emerald-950 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Media Links */}
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Link Bài Báo / Báo Cáo (Article URL)
                  </label>
                  <input
                    type="text"
                    value={formData.articleUrl || ''}
                    onChange={(e) => setFormData({ ...formData, articleUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Link Video Phát Sóng (Video URL)
                  </label>
                  <input
                    type="text"
                    value={formData.videoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                {/* Featured checkbox */}
                <div className="sm:col-span-2 flex items-center gap-3 pt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 text-emerald-600 rounded border-slate-300 focus:ring-emerald-500"
                    />
                    <span className="text-xs font-semibold text-slate-800 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-500 fill-current" />
                      Đánh dấu là Dự Án Tiêu Biểu (Hiển thị nổi bật trang chủ)
                    </span>
                  </label>
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex items-center justify-end gap-3 pt-6 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2.5 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
                >
                  Hủy Bỏ
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  {editingProject ? 'Lưu Thay Đổi' : 'Tạo Dự Án'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
