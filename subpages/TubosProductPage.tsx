import React from 'react';
import ProductDetailLayout, { ProductModel, TechnicalSection } from '../components/templates/ProductDetailLayout';
import { ASSETS } from '../lib/media';
import { FileText, Settings, Ruler, Layers } from 'lucide-react';

const TubosProductPage: React.FC = () => {
    const slides = [
        ...ASSETS.PRODUCT_PAGES.TUBOS.SLIDES
    ];

    const aboutText = (
        <>
            <p>
                A Aços Vital é uma das maiores fabricantes de Tubos no Brasil, fornecendo modelos em materiais de aço carbono, aço inoxidável, industriais e mecânicos laminados. Sua importância estratégica está na versatilidade e na alta capacidade de suportar pressões e temperaturas críticas, tornando-os indispensáveis para grandes infraestruturas.
            </p>
            <p>
                Todos os nossos modelos seguem normas técnicas rigorosas como <strong>ASTM, ASME, NBR e DIN</strong>, o que garante padronização absoluta e segurança operacional. A conformidade normativa assegura que cada metro de tubulação fornecido suporte as cargas exigidas pelos processos industriais mais desafiadores do mercado.
            </p>
        </>
    );

    const models: ProductModel[] = [
        { 
            name: "AÇO INOX", 
            desc: "Altamente resistente à corrosão e oxidação, o tubo de aço inox é essencial para indústrias químicas, alimentícias e projetos arquitetônicos que exigem acabamento premium e durabilidade eterna.",
            specs: ["ASTM A312", "Sch 10 ao 80", "Ligas 304/316"],
            image: ASSETS.PRODUCT_PAGES.TUBOS.MODELS.INOX 
        },
        { 
            name: "AÇO CARBONO", 
            desc: "Tubos versáteis com ampla gama de diâmetros e espessuras. São ideais para condução de fluídos em redes de incêndio, mineração e instalações industriais de alta pressão.",
            specs: ["NBR 5590 / ASTM A53", "Com e Sem Costura", "Variedade de Schedules"],
            image: ASSETS.PRODUCT_PAGES.TUBOS.MODELS.CARBONO 
        },
        { 
            name: "TUBOS INDUSTRIAIS", 
            desc: "Disponíveis em formatos Redondos, Quadrados e Retangulares. São a base para estruturas metálicas, implementos agrícolas e mobiliários industriais que exigem leveza e resistência.",
            specs: ["NBR 6591 / NBR 8261", "Corte sob Medida", "Geometria Precisa"],
            image: ASSETS.PRODUCT_PAGES.TUBOS.MODELS.INDUSTRIAIS 
        },
        { 
            name: "MECÂNICOS LAMINADOS", 
            desc: "Foco total em usinagem e fabricação de peças mecânicas. Possui grão fino e excelente soldabilidade, suportando esforços intensos em componentes de máquinas.",
            specs: ["ST 52 / SAE 1020", "Alta Resistência", "Usinagem Garantida"],
            image: ASSETS.PRODUCT_PAGES.TUBOS.MODELS.MECANICOS 
        },
    ];

    const technicalData: TechnicalSection[] = [
        {
            title: "Tipos de Tubos",
            icon: <Layers size={24} />,
            items: [
                "Tubo de Aço Carbono",
                "Tubo de Aço Inoxidável",
                "Tubos Industriais (Ret/Qua/Red)",
                "Tubos Mecânicos (ST-52)",
                "Tubos Calandrados",
                "Tubos PEAD"
            ]
        },
        {
            title: "Materiais & Ligas",
            icon: <Settings size={24} />,
            items: [
                "Aço Inox (Séries 300 e 400)",
                "Aço Carbono (A106/A53)",
                "Ligas Especiais",
                "Polietileno (PEAD)",
                "Aço liga",
                "Bronze",
                "Polímeros",
                "Ferro maleável"
            ]
        },
        {
            title: "Normas de Fabricação",
            icon: <FileText size={24} />,
            items: [
                "ASTM / ASME (Internacional)",
                "NBR / ISO (Nacional)",
                "DIN (Europeia)",
                "JIS (Asiática)"
            ]
        }
    ];

    return (
        <ProductDetailLayout
            title="TUBOS"
            slides={slides}
            aboutText={aboutText}
            modelsTitle="Modelos Disponíveis"
            models={models}
            techTitle="DADOS TÉCNICOS DE ENGENHARIA"
            techSubtitle="Padrões rigorosos que garantem segurança e conformidade em cada projeto."
            techData={technicalData}
            tablesLinkText="Tabelas de Pesos e Medidas"
        />
    );
};

export default TubosProductPage;