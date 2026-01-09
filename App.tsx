
import React from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import { useRouter } from './hooks/useRouter';
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

// Subpages (Produtos)
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

// --- 2. MAPEAMENTO DE ROTAS ---

const routes: Record<string, React.LazyExoticComponent<React.FC>> = {
    '/': HomePage,
    '/home': HomePage,
    '/about': AboutPage,
    '/products': ProductsPage,
    '/catalog': CatalogPage,
    '/tables': TablesPage,
    '/calculator': CalculatorPage,
    '/certifications': CertificationsPage,
    '/contact': ContactPage,
    '/privacy': PrivacyPolicyPage,
    
    // Rotas de Produtos (Devem ser caminhos limpos sem barras no final)
    '/products/flanges': FlangeProductPage, 
    '/products/tubos': TubosProductPage,
    '/products/conexoes': ConexoesProductPage, 
    '/products/valvulas': ValvulasProductPage, 
    '/products/perfis': PerfisLaminadosProductPage,
    '/products/chapas': ChapasProductPage, 
    '/products/grades': GradesPisoProductPage,
    '/products/telhas': TelhasTrapezoidaisProductPage,
    '/products/civil': CivilProductPage, 
    '/products/caldeiraria': CaldeirariaProductPage, 
    '/products/oxicorte': OxicorteProductPage, 
    '/products/eletrodutos': EletrodutosProductPage, 
    '/products/grooved': GroovedProductPage, 
    '/products/tanques': TanqueCombustivelProductPage,
};

const App: React.FC = () => {
    const currentPath = useRouter();
    
    // Busca a página no mapa ou cai no NotFound
    const Page = routes[currentPath] || NotFoundPage;
    
    return (
        <div className="bg-brand-blue-dark font-sans text-gray-800 flex flex-col min-h-screen w-full overflow-x-hidden relative">
            <Header />
            <main className="flex-grow w-full flex flex-col">
                <React.Suspense fallback={<LoadingSpinner />}>
                    <Page />
                </React.Suspense>
            </main>
            <Footer />
            <FloatingWhatsapp />
            <CookieBanner />
        </div>
    );
};

export default App;
