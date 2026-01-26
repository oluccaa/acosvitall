
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    ChevronLeft, 
    ChevronRight, 
    Download, 
    Loader2, 
    ZoomIn, 
    ZoomOut, 
    Maximize, 
    Minimize, 
    RotateCcw,
    Hash
} from 'lucide-react';

// Declaração global para a lib PDF.js carregada via CDN
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

interface TransformState {
    scale: number;
    x: number;
    y: number;
}

const CatalogFlipbook: React.FC = () => {
  const { t } = useTranslation();
  const pdfUrl = "https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/catalogo/catalogo_ed_1_comp.pdf";

  // --- Estados do PDF ---
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageInput, setPageInput] = useState('1');

  const [pageCache, setPageCache] = useState<Record<number, string>>({});
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const [transform, setTransform] = useState<TransformState>({ scale: 1, x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef<{ x: number, y: number }>({ x: 0, y: 0 });
  
  const wrapperRef = useRef<HTMLDivElement>(null); 
  const viewportRef = useRef<HTMLDivElement>(null); 
  const canvasLeftRef = useRef<HTMLCanvasElement>(null);
  const canvasRightRef = useRef<HTMLCanvasElement>(null);
  const canvasSingleRef = useRef<HTMLCanvasElement>(null);
  const renderTaskRef = useRef<any>(null);

  const RENDER_SCALE = isMobile ? 1.5 : 2.5;

  useEffect(() => {
    const handleResize = () => {
        const mobile = window.innerWidth < 1024;
        if (mobile !== isMobile) {
            setIsMobile(mobile);
            resetView();
            setPageCache({});
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  useEffect(() => {
      const handleFullscreenChange = () => {
          setIsFullscreen(!!document.fullscreenElement);
      };
      document.addEventListener('fullscreenchange', handleFullscreenChange);
      return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  useEffect(() => {
    const loadPdfScript = async () => {
        if (window.pdfjsLib) return true;
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
            script.async = true;
            script.onload = () => {
                if (window.pdfjsLib) {
                    window.pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
                    resolve(true);
                } else {
                    reject(new Error("PDF.js erro"));
                }
            };
            script.onerror = () => reject(new Error("Falha script PDF"));
            document.body.appendChild(script);
        });
    };

    const loadPdf = async () => {
      try {
        setLoading(true);
        await loadPdfScript();
        const loadingTask = window.pdfjsLib.getDocument(pdfUrl);
        const doc = await loadingTask.promise;
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar o catálogo.");
        setLoading(false);
      }
    };
    loadPdf();
  }, [pdfUrl]);

  const renderPageToCanvas = async (pageNumber: number, canvas: HTMLCanvasElement) => {
      if (!pdfDoc || pageNumber < 1 || pageNumber > totalPages) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      if (pageCache[pageNumber]) {
          const img = new Image();
          img.src = pageCache[pageNumber];
          img.onload = () => {
              canvas.width = img.width;
              canvas.height = img.height;
              ctx.clearRect(0, 0, canvas.width, canvas.height);
              ctx.drawImage(img, 0, 0);
          };
          return;
      }

      try {
          const page = await pdfDoc.getPage(pageNumber);
          const viewport = page.getViewport({ scale: RENDER_SCALE });
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          const task = page.render({ canvasContext: ctx, viewport: viewport });
          renderTaskRef.current = task;
          await task.promise;
          const cacheData = canvas.toDataURL('image/jpeg', 0.8);
          setPageCache(prev => ({ ...prev, [pageNumber]: cacheData }));
      } catch (error: any) {
          if (error.name !== 'RenderingCancelledException') console.error(error);
      }
  };

  useEffect(() => {
      if (!pdfDoc) return;
      const render = async () => {
          if (renderTaskRef.current) {
              try { await renderTaskRef.current.cancel(); } catch(e) {} 
          }
          if (isMobile) {
              if (canvasSingleRef.current) await renderPageToCanvas(currentPage, canvasSingleRef.current);
          } else {
              if (currentPage === 1) {
                  if (canvasRightRef.current) await renderPageToCanvas(1, canvasRightRef.current);
              } else {
                  if (canvasLeftRef.current) await renderPageToCanvas(currentPage, canvasLeftRef.current);
                  if (canvasRightRef.current) {
                      if (currentPage + 1 <= totalPages) {
                          await renderPageToCanvas(currentPage + 1, canvasRightRef.current);
                      } else {
                          const ctx = canvasRightRef.current.getContext('2d');
                          if (ctx) ctx.clearRect(0, 0, canvasRightRef.current.width, canvasRightRef.current.height);
                      }
                  }
              }
          }
      };
      render();
      resetView();
      setPageInput(currentPage.toString());
  }, [pdfDoc, currentPage, isMobile, totalPages]);

  const resetView = () => setTransform({ scale: 1, x: 0, y: 0 });
  
  const handleWheel = (e: React.WheelEvent) => {
      if (e.ctrlKey) {
          e.preventDefault();
          const delta = -e.deltaY * 0.001;
          setTransform(prev => ({ ...prev, scale: Math.min(Math.max(0.5, prev.scale + delta), 4) }));
      } else if (transform.scale > 1) {
          e.preventDefault();
          setTransform(prev => ({ ...prev, y: prev.y - e.deltaY }));
      }
  };

  const startDrag = (e: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      dragStartRef.current = { x: clientX - transform.x, y: clientY - transform.y };
  };

  const doDrag = (e: React.MouseEvent | React.TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
      setTransform(prev => ({ ...prev, x: clientX - dragStartRef.current.x, y: clientY - dragStartRef.current.y }));
  };

  const stopDrag = () => setIsDragging(false);

  const zoomIn = () => setTransform(prev => ({ ...prev, scale: Math.min(prev.scale + 0.5, 4) }));
  const zoomOut = () => setTransform(prev => ({ ...prev, scale: Math.max(prev.scale - 0.5, 0.5) }));
  
  const toggleFullscreen = () => {
      if (!document.fullscreenElement) wrapperRef.current?.requestFullscreen();
      else document.exitFullscreen();
  };

  const prevPage = () => {
      if (isMobile) {
          setCurrentPage(p => Math.max(1, p - 1));
      } else {
          if (currentPage === 2) setCurrentPage(1);
          else setCurrentPage(p => Math.max(1, p - 2));
      }
  };

  const nextPage = () => {
      if (isMobile) {
          setCurrentPage(p => Math.min(totalPages, p + 1));
      } else {
          if (currentPage === 1) {
              if (totalPages > 1) setCurrentPage(2);
          } else {
              setCurrentPage(p => Math.min(totalPages, p + 2));
          }
      }
  };

  const jumpToPage = (e: React.FormEvent) => {
      e.preventDefault();
      const val = parseInt(pageInput);
      if (!isNaN(val) && val >= 1 && val <= totalPages) {
          if (!isMobile && val > 1 && val % 2 !== 0) {
              setCurrentPage(val - 1);
          } else {
              setCurrentPage(val);
          }
      } else {
          setPageInput(currentPage.toString());
      }
  };

  useEffect(() => {
      const handleKeys = (e: KeyboardEvent) => {
          if (e.target instanceof HTMLInputElement) return; 
          if (e.key === "ArrowLeft") prevPage();
          if (e.key === "ArrowRight") nextPage();
      };
      window.addEventListener('keydown', handleKeys);
      return () => window.removeEventListener('keydown', handleKeys);
  }, [isMobile, totalPages, currentPage]);

  const canvasHeightClass = isFullscreen ? 'h-[85vh] w-auto' : 'h-[400px] md:h-[500px] w-auto';
  const hasRightPage = !isMobile && (currentPage === 1 ? true : (currentPage + 1 <= totalPages));
  const hasLeftPage = !isMobile && currentPage > 1;

  return (
    <section className="py-12 md:py-20 bg-brand-blue-dark relative overflow-hidden">
        <div className="container mx-auto px-6 sm:px-12 lg:px-24 relative z-10">
            <div className="text-center mb-10">
                <span className="inline-block py-1 px-3 rounded-full bg-brand-orange/10 text-brand-orange text-xs font-bold uppercase tracking-widest mb-3 border border-brand-orange/20">Catálogo Digital</span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Folheie Nosso Conteúdo</h2>
            </div>

            <div ref={wrapperRef} className={`bg-[#111827] rounded-2xl shadow-2xl border border-gray-700/50 flex flex-col overflow-hidden transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0 h-screen w-full' : 'w-full max-w-6xl mx-auto'}`}>
                
                <div 
                    ref={viewportRef}
                    className={`relative w-full bg-gray-900/50 overflow-hidden flex items-center justify-center ${isFullscreen ? 'flex-1 h-full' : 'h-[400px] md:h-[500px]'} ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
                    onMouseDown={startDrag} onMouseMove={doDrag} onMouseUp={stopDrag} onMouseLeave={stopDrag}
                    onTouchStart={startDrag} onTouchMove={doDrag} onTouchEnd={stopDrag} onWheel={handleWheel}
                >
                    {loading && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center z-50 bg-gray-900/80 backdrop-blur-sm">
                            <Loader2 className="w-12 h-12 text-brand-orange animate-spin mb-4" />
                            <span className="text-white font-medium animate-pulse">Carregando catálogo...</span>
                        </div>
                    )}

                    <div className="will-change-transform origin-center transition-transform duration-75 ease-out"
                         style={{ transform: `translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})` }}>
                        <div className={`relative flex shadow-2xl ${isMobile ? 'flex-col' : 'flex-row'}`}>
                            {!isMobile && (
                                <div className={`relative bg-white transition-all duration-500 ease-in-out ${!hasLeftPage ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                                    <canvas ref={canvasLeftRef} className={`block object-contain ${canvasHeightClass}`} />
                                    <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none mix-blend-multiply"></div>
                                </div>
                            )}
                            <div className={`relative bg-white transition-all duration-500 ease-in-out ${!hasRightPage && !isMobile ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                                <canvas ref={isMobile ? canvasSingleRef : canvasRightRef} className={`block object-contain ${canvasHeightClass}`} />
                                {!isMobile && hasLeftPage && (
                                    <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none mix-blend-multiply"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- UNIFIED CONTROLS BAR --- */}
                <div className="bg-[#111827] border-t border-gray-700/50 p-4 lg:px-6 flex flex-col lg:flex-row items-center justify-between gap-6 z-20">
                    
                    {/* Unified Pagination and Jump Block - Perfect Alignment at the Bottom */}
                    <div className="flex flex-wrap items-end justify-center gap-2 sm:gap-4 order-2 lg:order-1">
                        {/* Prev Button */}
                        <button 
                            onClick={prevPage} 
                            disabled={currentPage === 1} 
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gray-800 text-gray-400 hover:bg-brand-orange hover:text-white disabled:opacity-20 transition-all active:scale-90 border border-white/5 shadow-lg flex items-center justify-center mb-[2px]"
                            title="Anterior"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* Page Counter Display - Height Matched to Input */}
                        <div className="h-10 sm:h-11 flex items-center gap-2 px-4 sm:px-5 bg-[#0b1121] rounded-lg border border-white/5 min-w-[120px] justify-center shadow-inner mb-[2px]">
                            <span className="text-sm sm:text-base font-black text-white whitespace-nowrap">
                                {currentPage}{!isMobile && hasLeftPage && hasRightPage && totalPages > currentPage + 1 ? `-${currentPage + 1}` : ''}
                            </span>
                            <span className="text-gray-600 font-bold text-sm">/</span>
                            <span className="text-sm sm:text-base font-bold text-gray-500">
                                {totalPages}
                            </span>
                        </div>

                        {/* Jump To Page Form - Exactly Aligned to Counter, shifted down 12px */}
                        <form onSubmit={jumpToPage} className="flex items-end gap-2 translate-y-[12px]">
                            <div className="h-10 sm:h-11 relative group flex items-center bg-[#0b1121] rounded-lg border border-white/5 shadow-inner px-3">
                                <Hash size={14} className="text-gray-500 group-focus-within:text-brand-orange transition-colors mr-1" />
                                <input 
                                    type="text"
                                    value={pageInput}
                                    onChange={(e) => setPageInput(e.target.value.replace(/\D/g, ''))}
                                    className="w-10 sm:w-12 bg-transparent border-none outline-none text-sm font-black text-white text-center placeholder-gray-600"
                                    placeholder="Nº"
                                />
                            </div>
                            <button 
                                type="submit"
                                className="h-10 sm:h-11 bg-brand-orange text-white text-[10px] sm:text-xs font-black uppercase px-4 sm:px-5 rounded-lg hover:bg-brand-orange-dark transition-all active:scale-95 shadow-lg shadow-brand-orange/20"
                            >
                                Ir
                            </button>
                        </form>

                        {/* Next Button */}
                        <button 
                            onClick={nextPage} 
                            disabled={isMobile ? (currentPage >= totalPages) : (currentPage >= totalPages || (currentPage === 1 && totalPages === 1))} 
                            className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gray-800 text-gray-400 hover:bg-brand-orange hover:text-white disabled:opacity-20 transition-all active:scale-90 border border-white/5 shadow-lg flex items-center justify-center mb-[2px]"
                            title="Próxima"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    {/* Toolbar and Download Group */}
                    <div className="flex items-center gap-4 w-full lg:w-auto justify-center lg:justify-end order-1 lg:order-2">
                        {/* Zoom & View Tools */}
                        <div className="flex items-center gap-1 bg-[#0b1121] p-1 rounded-lg border border-white/5 shadow-inner">
                            <button onClick={zoomOut} className="p-2 text-gray-500 hover:text-white rounded-md transition-colors" title="Zoom Out"><ZoomOut size={16} /></button>
                            <div className="w-12 text-center text-[9px] font-black text-brand-orange border-l border-r border-gray-800 py-1">{Math.round(transform.scale * 100)}%</div>
                            <button onClick={zoomIn} className="p-2 text-gray-500 hover:text-white rounded-md transition-colors" title="Zoom In"><ZoomIn size={16} /></button>
                            <div className="w-px h-4 bg-gray-800 mx-1"></div>
                            <button onClick={resetView} className="p-2 text-gray-500 hover:text-white rounded-md transition-colors" title="Resetar Vista"><RotateCcw size={14} /></button>
                            <button onClick={toggleFullscreen} className="p-2 text-gray-500 hover:text-white rounded-md transition-colors" title="Tela Cheia">{isFullscreen ? <Minimize size={16} /> : <Maximize size={16} />}</button>
                        </div>

                        {/* Download PDF Button */}
                        <a 
                            href={pdfUrl} 
                            target="_blank" 
                            download 
                            className="flex items-center gap-3 bg-white/5 hover:bg-white/10 text-white px-5 h-11 rounded-lg font-black text-[10px] transition-all border border-white/10 shadow-lg active:scale-95 group uppercase tracking-widest"
                        >
                            <Download size={16} className="text-brand-orange group-hover:scale-110 transition-transform" />
                            <span className="hidden sm:inline">Baixar PDF</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default CatalogFlipbook;
