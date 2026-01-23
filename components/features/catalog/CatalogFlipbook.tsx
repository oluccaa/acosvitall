
import React, { useEffect, useRef, useState } from 'react';
import { useI18n } from '../../../context/I18nContext';
import { 
    ChevronLeft, 
    ChevronRight, 
    Download, 
    Loader2, 
    ZoomIn, 
    ZoomOut, 
    Maximize, 
    Minimize, 
    RotateCcw
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
  const { t } = useI18n();
  const pdfUrl = t('productsPage.catalogPdfUrl');

  // --- Estados do PDF ---
  const [pdfDoc, setPdfDoc] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
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
              // Lógica de Capa (Página 1 sozinha à direita)
              if (currentPage === 1) {
                  if (canvasRightRef.current) await renderPageToCanvas(1, canvasRightRef.current);
              } else {
                  // Demais páginas em pares (Par na Esquerda, Ímpar na Direita)
                  if (canvasLeftRef.current) await renderPageToCanvas(currentPage, canvasLeftRef.current);
                  
                  if (canvasRightRef.current) {
                      if (currentPage + 1 <= totalPages) {
                          await renderPageToCanvas(currentPage + 1, canvasRightRef.current);
                      } else {
                          // Se não houver próxima página, limpa o canvas da direita
                          const ctx = canvasRightRef.current.getContext('2d');
                          if (ctx) ctx.clearRect(0, 0, canvasRightRef.current.width, canvasRightRef.current.height);
                      }
                  }
              }
          }
      };
      render();
      resetView();
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
          // Se estamos na 2, volta para 1 (capa)
          if (currentPage === 2) setCurrentPage(1);
          else setCurrentPage(p => Math.max(1, p - 2));
      }
  };

  const nextPage = () => {
      if (isMobile) {
          setCurrentPage(p => Math.min(totalPages, p + 1));
      } else {
          // Se estamos na 1 (capa), pula para 2 (que exibe 2 e 3)
          if (currentPage === 1) {
              if (totalPages > 1) setCurrentPage(2);
          } else {
              setCurrentPage(p => Math.min(totalPages, p + 2));
          }
      }
  };

  useEffect(() => {
      const handleKeys = (e: KeyboardEvent) => {
          if (e.key === "ArrowLeft") prevPage();
          if (e.key === "ArrowRight") nextPage();
      };
      window.addEventListener('keydown', handleKeys);
      return () => window.removeEventListener('keydown', handleKeys);
  }, [isMobile, totalPages, currentPage]);

  const canvasHeightClass = isFullscreen ? 'h-[85vh] w-auto' : 'h-[400px] md:h-[500px] w-auto';

  // Verifica se a página da direita deve ser exibida
  const hasRightPage = !isMobile && (currentPage === 1 ? true : (currentPage + 1 <= totalPages));
  // Verifica se a página da esquerda deve ser exibida
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
                            
                            {/* Página Esquerda - Oculta na Capa (Pág 1) */}
                            {!isMobile && (
                                <div className={`relative bg-white transition-all duration-500 ease-in-out ${!hasLeftPage ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                                    <canvas ref={canvasLeftRef} className={`block object-contain ${canvasHeightClass}`} />
                                    {/* Sombra de dobra central (direita da página esquerda) */}
                                    <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-black/20 to-transparent pointer-events-none mix-blend-multiply"></div>
                                </div>
                            )}

                            {/* Página Direita - Oculta na Última Página (se for isolada) */}
                            <div className={`relative bg-white transition-all duration-500 ease-in-out ${!hasRightPage && !isMobile ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                                <canvas ref={isMobile ? canvasSingleRef : canvasRightRef} className={`block object-contain ${canvasHeightClass}`} />
                                {!isMobile && hasLeftPage && (
                                    /* Sombra de dobra central (esquerda da página direita) */
                                    <div className="absolute top-0 left-0 w-8 h-full bg-gradient-to-r from-black/10 to-transparent pointer-events-none mix-blend-multiply"></div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-gray-800 border-t border-gray-700 p-4 flex flex-col md:flex-row items-center justify-between gap-4 z-20">
                    <div className="flex items-center gap-4 w-full md:w-auto justify-center md:justify-start order-2 md:order-1">
                        <button onClick={prevPage} disabled={currentPage === 1} className="p-2.5 rounded-lg bg-gray-700 text-white hover:bg-brand-blue-dark disabled:opacity-30 transition-all active:scale-95"><ChevronLeft size={20} /></button>
                        <span className="text-white font-mono text-sm whitespace-nowrap bg-gray-900 px-4 py-2 rounded-lg border border-gray-700 min-w-[140px] text-center">
                            {isMobile ? (
                                <>Pág. <span className="text-brand-orange font-bold">{currentPage}</span> de {totalPages}</>
                            ) : (
                                <>
                                    {currentPage === 1 ? (
                                        <>Capa <span className="text-brand-orange font-bold">(1)</span></>
                                    ) : (
                                        <>
                                            Págs. <span className="text-brand-orange font-bold">{currentPage}</span>
                                            {currentPage + 1 <= totalPages ? <span> - {currentPage + 1}</span> : ''}
                                        </>
                                    )}
                                    <span className="text-gray-500 ml-1"> / {totalPages}</span>
                                </>
                            )}
                        </span>
                        <button 
                            onClick={nextPage} 
                            disabled={isMobile ? (currentPage >= totalPages) : (currentPage >= totalPages || (currentPage === 1 && totalPages === 1))} 
                            className="p-2.5 rounded-lg bg-gray-700 text-white hover:bg-brand-blue-dark disabled:opacity-30 transition-all active:scale-95"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>

                    <div className="flex items-center gap-1 bg-gray-900 p-1 rounded-xl border border-gray-700 order-1 md:order-2">
                        <button onClick={zoomOut} className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"><ZoomOut size={18} /></button>
                        <div className="w-16 text-center text-xs font-bold text-brand-orange border-l border-r border-gray-700 py-1">{Math.round(transform.scale * 100)}%</div>
                        <button onClick={zoomIn} className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"><ZoomIn size={18} /></button>
                        <div className="w-px h-4 bg-gray-700 mx-1"></div>
                        <button onClick={resetView} className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors"><RotateCcw size={16} /></button>
                        <button onClick={toggleFullscreen} className="p-2 text-gray-400 hover:text-white rounded-lg transition-colors">{isFullscreen ? <Minimize size={18} /> : <Maximize size={18} />}</button>
                    </div>

                    <div className="w-full md:w-auto flex justify-center md:justify-end order-3">
                        <a href={pdfUrl} target="_blank" download className="flex items-center gap-2 bg-brand-orange hover:bg-brand-orange-dark text-white px-5 py-2.5 rounded-lg font-bold text-sm transition-all shadow-lg active:scale-95 w-full md:w-auto justify-center"><Download size={18} /><span>Baixar PDF</span></a>
                    </div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default CatalogFlipbook;
