
import React, { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/common/LoadingSpinner';
import CookieBanner from './components/common/CookieBanner';
import FloatingWhatsapp from './components/common/FloatingWhatsapp';

// --- 1. DEFINIÇÃO DAS PÁGINAS (LAZY LOADING) ---
const HomePage = React.lazy(() => import('./pages/HomePage'));
const AboutPage = React.lazy(() => import('./pages/AboutPage'));
const ProductsPage = React.lazy(() => import('./pages/ProductsPage'));
const CatalogPage = React.lazy(() => import('./pages/CatalogPage'));
const CertificationsPage = React.lazy(() => import('./pages/CertificationsPage'));
const ContactPage = React.lazy(() => import('./pages/ContactPage'));
const NotFoundPage = React.lazy(() => import('./pages/NotFoundPage'));
const TablesPage = React.lazy(() => import('./pages/TablesPage'));
const CalculatorPage = React.lazy(() => import('./pages/CalculatorPage'));
const PrivacyPolicyPage = React.lazy(() => import('./pages/PrivacyPolicyPage'));

// Subpages
const FlangeProductPage = React.lazy(() => import('./subpages/FlangeProductPage'));
const TubosProductPage = React.lazy(() => import('./subpages/TubosProductPage'));
const ConexoesProductPage = React.lazy(() => import('./subpages/ConexoesProductPage'));
const ValvulasProductPage = React.lazy(() => import('./subpages/ValvulasProductPage'));
const PerfisLaminadosProductPage = React.lazy(() => import('./subpages/PerfisLaminadosProductPage'));
const ChapasProductPage = React.lazy(() => import('./subpages/ChapasProductPage'));
const GradesPisoProductPage = React.lazy(() => import('./subpages/GradesPisoProductPage'));
const TelhasTrapezoidaisProductPage = React.lazy(() => import('./subpages/TelhasTrapezoidaisProductPage'));
const CivilProductPage = React.lazy(() => import('./subpages/CivilProductPage'));
const CaldeirariaProductPage = React.lazy(() => import('./subpages/CaldeirariaProductPage'));
const OxicorteProductPage = React.lazy(() => import('./subpages/OxicorteProductPage'));
const EletrodutosProductPage = React.lazy(() => import('./subpages/EletrodutosProductPage'));
const GroovedProductPage = React.lazy(() => import('./subpages/GroovedProductPage'));
const TanqueCombustivelProductPage = React.lazy(() => import('./subpages/TanqueCombustivelProductPage'));

const App: React.FC = () => {
    const navigate = useNavigate();

    // Interceptor global para transformar tags <a> em navegações do React Router
    useEffect(() => {
        const handleGlobalClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const anchor = target.closest('a');
            
            if (anchor && 
                anchor.href.startsWith(window.location.origin) && 
                !anchor.hasAttribute('download') && 
                anchor.target !== '_blank') {
                
                const url = new URL(anchor.href);
                // Se for âncora interna na mesma página (#id), deixa o browser tratar
                if (url.pathname === window.location.pathname && url.hash) return;
                
                e.preventDefault();
                navigate(url.pathname + url.search + url.hash);
                window.scrollTo(0, 0);
            }
        };

        document.addEventListener('click', handleGlobalClick);
        return () => document.removeEventListener('click', handleGlobalClick);
    }, [navigate]);

    return (
        <div className="bg-brand-blue-dark font-sans text-gray-800 flex flex-col min-h-screen w-full overflow-x-hidden relative">
            <Header />
            
            <main className="flex-grow w-full flex flex-col">
                <React.Suspense fallback={<LoadingSpinner />}>
                    <Routes>
                        {/* Rotas Principais */}
                        <Route path="/" element={<HomePage />} />
                        <Route path="/home" element={<Navigate to="/" replace />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/products" element={<ProductsPage />} />
                        <Route path="/catalog" element={<CatalogPage />} />
                        <Route path="/tables" element={<TablesPage />} />
                        <Route path="/calculator" element={<CalculatorPage />} />
                        <Route path="/certifications" element={<CertificationsPage />} />
                        <Route path="/contact" element={<ContactPage />} />
                        <Route path="/privacy" element={<PrivacyPolicyPage />} />

                        {/* Rotas de Produtos */}
                        <Route path="/products/flanges" element={<FlangeProductPage />} />
                        <Route path="/products/tubos" element={<TubosProductPage />} />
                        <Route path="/products/conexoes" element={<ConexoesProductPage />} />
                        <Route path="/products/valvulas" element={<ValvulasProductPage />} />
                        <Route path="/products/perfis" element={<PerfisLaminadosProductPage />} />
                        <Route path="/products/chapas" element={<ChapasProductPage />} />
                        <Route path="/products/grades" element={<GradesPisoProductPage />} />
                        <Route path="/products/telhas" element={<TelhasTrapezoidaisProductPage />} />
                        <Route path="/products/civil" element={<CivilProductPage />} />
                        <Route path="/products/caldeiraria" element={<CaldeirariaProductPage />} />
                        <Route path="/products/oxicorte" element={<OxicorteProductPage />} />
                        <Route path="/products/eletrodutos" element={<EletrodutosProductPage />} />
                        <Route path="/products/grooved" element={<GroovedProductPage />} />
                        <Route path="/products/tanques" element={<TanqueCombustivelProductPage />} />

                        {/* Rota 404 */}
                        <Route path="*" element={<NotFoundPage />} />
                    </Routes>
                </React.Suspense>
            </main>

            <Footer />
            <FloatingWhatsapp />
            <CookieBanner />
        </div>
    );
};

export default App;
