import React, { useState, useMemo } from 'react';
import { BlogPost, Project, Product } from '../types';
import { X, Search, FileText, Layers, ShoppingBag, ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  posts: BlogPost[];
  projects: Project[];
  products: Product[];
  onSelectPost: (post: BlogPost) => void;
  onSelectProject: (project: Project) => void;
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  posts,
  projects,
  products,
  onSelectPost,
  onSelectProject,
  onSelectProduct,
}) => {
  const { t, formatPrice } = useLanguage();
  const [query, setQuery] = useState('');

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return {
        matchedPosts: posts.slice(0, 3),
        matchedProjects: projects.slice(0, 2),
        matchedProducts: products.slice(0, 2),
        total: 7,
      };
    }

    const matchedPosts = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
    );

    const matchedProjects = projects.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.excerpt.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.techStack.some((t) => t.toLowerCase().includes(q))
    );

    const matchedProducts = products.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
    );

    return {
      matchedPosts,
      matchedProjects,
      matchedProducts,
      total: matchedPosts.length + matchedProjects.length + matchedProducts.length,
    };
  }, [query, posts, projects, products]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 md:pt-24 p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[80vh] flex flex-col border border-[#bfc9c3]/60 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="p-4 md:p-6 border-b border-[#bfc9c3]/50 flex items-center gap-3 bg-[#f8f9ff]">
          <Search className="w-6 h-6 text-[#003527] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t('search.placeholder', 'Tìm kiếm bài viết, dự án, sản phẩm, công nghệ...')}
            className="w-full bg-transparent outline-none font-body text-[16px] md:text-[18px] text-[#0b1c30] placeholder:text-[#707974]"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#707974] hover:text-[#0b1c30] p-1 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] text-[#003527] flex items-center justify-center transition-colors cursor-pointer ml-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {results.total === 0 ? (
            <div className="py-12 text-center text-[#707974]">
              <p className="font-body text-[16px]">
                {t('search.noResults', 'Không tìm thấy kết quả phù hợp với')} "{query}".
              </p>
              <p className="font-body text-[13px] mt-1">
                {t('search.suggestion', 'Hãy thử tìm với các từ khóa: AI, FinTech, EdTech...')}
              </p>
            </div>
          ) : (
            <>
              {/* Articles */}
              {results.matchedPosts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <FileText className="w-4 h-4 text-[#003527]" />
                    <h4 className="font-display text-[14px] font-bold text-[#003527] uppercase tracking-wider">
                      {t('search.articles', 'Bài viết & Kiến thức')} ({results.matchedPosts.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {results.matchedPosts.map((post) => (
                      <div
                        key={post.id}
                        onClick={() => {
                          onSelectPost(post);
                          onClose();
                        }}
                        className="p-3 rounded-xl border border-[#bfc9c3]/40 bg-[#f8f9ff] hover:bg-[#eff4ff] hover:border-[#003527]/30 transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div className="pr-4">
                          <span className="text-[11px] font-body font-bold text-[#003527] uppercase mr-2">
                            {post.category}
                          </span>
                          <h5 className="font-display text-[15px] font-semibold text-[#0b1c30] group-hover:text-[#003527]">
                            {post.title}
                          </h5>
                          <p className="font-body text-[13px] text-[#404944] line-clamp-1 mt-0.5">
                            {post.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#707974] group-hover:text-[#003527] group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Projects */}
              {results.matchedProjects.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-4 h-4 text-[#003527]" />
                    <h4 className="font-display text-[14px] font-bold text-[#003527] uppercase tracking-wider">
                      {t('search.projects', 'Dự án & Nền tảng')} ({results.matchedProjects.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {results.matchedProjects.map((project) => (
                      <div
                        key={project.id}
                        onClick={() => {
                          onSelectProject(project);
                          onClose();
                        }}
                        className="p-3 rounded-xl border border-[#bfc9c3]/40 bg-[#f8f9ff] hover:bg-[#eff4ff] hover:border-[#003527]/30 transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div className="pr-4">
                          <span className="text-[11px] font-body font-bold text-[#003527] uppercase mr-2">
                            {project.badge}
                          </span>
                          <h5 className="font-display text-[15px] font-semibold text-[#0b1c30] group-hover:text-[#003527]">
                            {project.title}
                          </h5>
                          <p className="font-body text-[13px] text-[#404944] line-clamp-1 mt-0.5">
                            {project.excerpt}
                          </p>
                        </div>
                        <ArrowRight className="w-4 h-4 text-[#707974] group-hover:text-[#003527] group-hover:translate-x-1 transition-all flex-shrink-0" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Products */}
              {results.matchedProducts.length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ShoppingBag className="w-4 h-4 text-[#003527]" />
                    <h4 className="font-display text-[14px] font-bold text-[#003527] uppercase tracking-wider">
                      {t('search.products', 'Cửa hàng & Tài nguyên')} ({results.matchedProducts.length})
                    </h4>
                  </div>
                  <div className="space-y-2">
                    {results.matchedProducts.map((product) => (
                      <div
                        key={product.id}
                        onClick={() => {
                          onSelectProduct(product);
                          onClose();
                        }}
                        className="p-3 rounded-xl border border-[#bfc9c3]/40 bg-[#f8f9ff] hover:bg-[#eff4ff] hover:border-[#003527]/30 transition-colors cursor-pointer flex items-center justify-between group"
                      >
                        <div className="pr-4">
                          <span className="text-[11px] font-body font-bold text-[#003527] uppercase mr-2">
                            {product.category}
                          </span>
                          <h5 className="font-display text-[15px] font-semibold text-[#0b1c30] group-hover:text-[#003527]">
                            {product.title}
                          </h5>
                          <p className="font-body text-[13px] text-[#404944] line-clamp-1 mt-0.5">
                            {product.description}
                          </p>
                        </div>
                        <div className="text-right flex-shrink-0">
                          <span className="font-display text-[14px] font-bold text-[#003527]">
                            {formatPrice(product.price)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

