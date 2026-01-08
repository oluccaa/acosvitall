
/**
 * ============================================================================
 * Media Assets Library (media.ts)
 * ============================================================================
 * 
 * Centralized registry for all media. 
 * OPTIMIZATION: We wrap Supabase heavy assets in a resizing proxy to avoid 
 * huge payload warnings in Lighthouse and to override short TTL headers.
 */

const optimize = (url: string, width: number = 800) => {
    // Se a imagem é do Supabase, encapsulamos via proxy para redimensionar,
    // converter para WebP e injetar headers de cache permanentes.
    if (url.includes('supabase.co')) {
        return `https://images.builderservices.io/s/cdn/v1.0/i/m?url=${encodeURIComponent(url)}&methods=resize%2C${width}%2C5000`;
    }
    return url;
};

export const ASSETS = {
  LOGO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/logo/logo.png", 500),
  
  HERO: {
    COMMON_VIDEO: "https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-0%2F850%2F1911850%2FCU3jUjet%2F5c1f0aff29d040d5999d668eb4419bfa&methods=resize%2C2000%2C5000",
    COMMON_BG: "https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-0%2F850%2F1911850%2FCU3jUjet%2F5c1f0aff29d040d5999d668eb4419bfa&methods=resize%2C2000%2C5000",
    FEATURES_BG: "https://images.unsplash.com/photo-1581243981884-a1dc2c687e37?q=80&w=2070&auto=format&fit=crop"
  },

  CERTIFICATIONS: {
    HERO_BG: "https://images.builderservices.io/s/cdn/v1.0/i/m?url=https%3A%2F%2Fstorage.googleapis.com%2Fproduction-hostgator-brasil-v1-0-0%2F850%2F1911850%2FCU3jUjet%2F5c1f0aff29d040d5999d668eb4419bfa&methods=resize%2C2000%2C5000"
  },

  HERO_SLIDES_IMGS: {
    ENTRESSAFRA: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/hero/1.webp', 1200),
    TRAPEZOIDAL: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/hero/2.webp', 1200),
    EXCELLENCE: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/hero/3.webp', 1200),
    FLANGES: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/hero/4.webp', 1200),
    FLOORING: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/hero/5.webp', 1200)
  },

  ADS: {
    CALCULATOR_LEFT: "https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/calculadora_de_aco/ads_fixo/ads_esquerda.gif",
    CALCULATOR_RIGHT: "https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/calculadora_de_aco/ads_fixo/ads_direita.gif",
    CALCULATOR_BOTTOM: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/calculadora_de_aco/ads_fixo/entrega_otimizada_bottom.png", 1446)
  },

  ABOUT: {
    CONTENT_IMAGE: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/sobre/vertical-sobre-empresa.gif", 500),
    UNITS_MAP: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/sobre_nos/onde_atuamos/mapa_v2.webp", 1000)
  },

  CERTIFICATIONS_LOGOS: {
    ISO9001: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/sobre_nos/certificacoes/ISO.webp", 300),
    CRC: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/sobre_nos/certificacoes/CRC.webp", 300),
    YPFB: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/sobre_nos/certificacoes/YPFB.webp", 300)
  },
  
  CTA: {
    BG_GIF: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/cta/cta.webp", 1200)
  },

  HOME_FEATURED: {
    FLANGE: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/1.webp", 600),
    TUBOS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/2.webp", 600),
    CALDEIRARIA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/10.webp", 600),
    CHAPAS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/6.webp", 600),
    CONEXOES: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/4.webp", 600),
    VALVULAS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/5.webp", 600),
    PERFIS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/14.webp", 600),
    GRADE: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/8.webp", 600),
    TELHAS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/13.webp", 600),
    CIVIL: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/9.webp", 600),
    OXICORTE: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/12.webp", 600),
    ELETRODUTOS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/3.webp", 600),
    GROOVED: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/11.webp", 600),
    TANQUES: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/7.webp", 600)
  },

  SECTORS: {
    AGRICULTURE: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/1.webp", 200),
    ARCHITECTURE: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/2.webp", 200),
    AUTOMOTIVE: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/3.webp", 200),
    CIVIL_CONST: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/4.webp", 200),
    ENERGY: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/5.webp", 200),
    NAVAL: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/6.webp", 200),
    MINING: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/7.webp", 200),
    OIL_GAS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/8.webp", 200),
    PULP_PAPER: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/9.webp", 200),
    PETROCHEMICAL: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/10.webp", 200),
    SANITATION: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/11.webp", 200),
    STEEL: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/geral/setores_atendidos/12.webp", 200),
  },

  PRODUCT_THUMBNAILS: {
    FLANGES: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/1.webp', 300),
    TUBES: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/2.webp', 300),
    FITTINGS: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/4.webp', 300),
    VALVES: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/5.webp', 300),
    PROFILES: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/14.webp', 300),
    PLATES: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/6.webp', 300),
    GRATINGS: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/8.webp', 300),
    TILES: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/13.webp', 300),
    CIVIL: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/9.webp', 300),
    BOILERMAKING: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/10.webp', 300),
    CUTTING: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/12.webp', 300),
    CONDUITS: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/3.webp', 300),
    TANKS: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/7.webp', 300),
    GROOVED: optimize('https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/home/produtos_destaques/11.webp', 300),
  },

  PRODUCT_PAGES: {
    FLANGES: {
      SLIDES: [
        optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/hero/1.webp", 1200),
        optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/hero/2.webp", 1200),
        optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/hero/3.webp", 1200)
      ],
      MODELS: {
        SLIP_ON: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/1.webp", 500),
        WELD_NECK: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/2.webp", 500),
        BLIND: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/3.webp", 500),
        LAP_JOINT: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/4.webp", 500),
        THREADED: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/5.webp", 500),
        SOCKET_WELD: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/6.webp", 500),
        SOBREPOSTO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/7.webp", 500),
        SOLTO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/8.webp", 500),
        PEAD: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/9.webp", 500),
        LIGAS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/10.webp", 500),
        FIXADORES: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/11.webp", 500),
        JUNTAS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/flange_page/12.webp", 500)
      }
    },
    TUBOS: {
      SLIDES: [
        optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tubos_page/hero/1.webp", 1200),
        optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tubos_page/hero/2.webp", 1200),
        optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tubos_page/hero/3.webp", 1200)
      ],
      MODELS: {
        INOX: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tubos_page/1.webp", 500),
        CARBONO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tubos_page/2.webp", 500),
        INDUSTRIAIS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tubos_page/3.webp", 500),
        MECANICOS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tubos_page/4.webp", 500)
      }
    },
    CONEXOES: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/conexoes_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/conexoes_page/hero/2.webp", 1200)
        ],
        MODELS: {
            ALTA_PRESSAO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/conexoes_page/1.webp", 500),
            GOMADAS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/conexoes_page/2.webp", 500),
            TUBULARES: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/conexoes_page/3.webp", 500)
        }
    },
    VALVULAS: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/valvulas_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/valvulas_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/valvulas_page/hero/3.webp", 1200)
        ],
        MODELS: {
            BORBOLETA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/valvulas_page/1.webp", 500),
            ESFERA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/valvulas_page/2.webp", 500),
            GAVETA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/valvulas_page/3.webp", 500),
            GLOBO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/valvulas_page/4.webp", 500),
            GUILHOTINA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/valvulas_page/5.webp", 500),
            RETENCAO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/valvulas_page/6.webp", 500)
        }
    },
    PERFIS: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/hero/3.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/hero/4.webp", 1200)
        ],
        MODELS: {
            W: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/1.webp", 500),
            I_HQ: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/2.webp", 500),
            U: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/3.webp", 500),
            U_SIMPLES: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/4.webp", 500),
            U_ENRIJECIDO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/5.webp", 500),
            CANTONEIRA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/6.webp", 500),
            BARRA_CHATA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/7.webp", 500),
            BARRA_REDONDA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/perfil_page/8.webp", 500)
        }
    },
    CHAPAS: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/chapas_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/chapas_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/chapas_page/hero/3.webp", 1200)
        ],
        MODELS: {
            FINA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/chapas_page/1.webp", 500),
            GROSSA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/chapas_page/2.webp", 500),
            ZINCADA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/chapas_page/3.webp", 500),
            XADREZ: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/chapas_page/4.webp", 500),
            PERFURADA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/chapas_page/5.webp", 500),
            EXPANDIDA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/chapas_page/6.webp", 500)
        }
    },
    GRADES: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grade_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grade_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grade_page/hero/3.webp", 1200)
        ],
        MODELS: {
            INDUSTRIAL: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grade_page/1.webp", 500),
            MALHAS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grade_page/2.webp", 500)
        }
    },
    TELHAS: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/telhas_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/telhas_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/telhas_page/hero/3.webp", 1200)
        ],
        MODELS: {
            GALVALUME: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/telhas_page/1.webp", 500),
            PINTADA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/telhas_page/2.webp", 500),
            TERMOSTATICA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/telhas_page/3.webp", 500)
        }
    },
    CIVIL: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/civil_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/civil_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/civil_page/hero/3.webp", 1200)
        ],
        MODELS: {
            ARAME: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/civil_page/1.webp", 500),
            BARRA_TRANSF: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/civil_page/2.webp", 500),
            VERGALHOES: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/civil_page/3.webp", 500),
            TELA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/civil_page/4.webp", 500),
            TRELICA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/civil_page/5.webp", 500)
        }
    },
    CALDEIRARIA: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/caldeiraria_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/caldeiraria_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/caldeiraria_page/hero/3.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/caldeiraria_page/hero/4.webp", 1200)
        ],
        MODELS: {
            TUBOS_CALANDRADOS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/caldeiraria_page/1.webp", 500),
            PECAS_PERSONALIZADAS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/caldeiraria_page/2.webp", 500),
            EQUIPAMENTOS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/caldeiraria_page/3.webp", 500)
        }
    },
    OXICORTE: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/oxicorte_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/oxicorte_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/oxicorte_page/hero/3.webp", 1200)
        ],
        MODELS: {
            MACARICO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/oxicorte_page/1.webp", 500),
            TARTARUGA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/oxicorte_page/2.webp", 500),
            PLASMA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/oxicorte_page/3.webp", 500),
            FOTOCELULA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/oxicorte_page/4.webp", 500)
        }
    },
    ELETRODUTOS: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/hero/2.webp", 1200)
        ],
        MODELS: {
            LEVE: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/1.webp", 500),
            MEDIO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/2.webp", 500),
            PESADO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/3.webp", 500),
            CONEXOES_ELETRO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/4.webp", 500),
            FOGO_MEDIO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/5.webp", 500),
            FOGO_PESADO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/6.webp", 500),
            FOGO_CONEXOES: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/7.webp", 500),
            RIR_NPT: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/8.webp", 500),
            RIR_BSP: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/9.webp", 500),
            INOX_10: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/10.webp", 500),
            INOX_40: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/11.webp", 500),
            CONEXOES_GERAL: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/eletrodutos_page/12.webp", 500)
        }
    },
    GROOVED: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/hero/3.webp", 1200)
        ],
        MODELS: {
            FLEXIVEL: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/1.webp", 500),
            REDUCAO_FLEX: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/2.webp", 500),
            RIGIDO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/3.webp", 500),
            COTOVELO_45: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/4.webp", 500),
            COTOVELO_90: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/5.webp", 500),
            CRUZETA_MEC: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/6.webp", 500),
            CRUZETA_RAN: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/7.webp", 500),
            TAMPAO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/8.webp", 500),
            LUVA_RED: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/9.webp", 500),
            ADAPTADOR: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/10.webp", 500),
            TEE_UBOLT: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/11.webp", 500),
            TEE_MEC_ROSCA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/12.webp", 500),
            TEE_MEC_RAN: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/13.webp", 500),
            TEE_RAN: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/14.webp", 500),
            TEE_RED_RAN: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/15.webp", 500),
            TEE_RED_ROSCA: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/16.webp", 500),
            FLANGE_BIP: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/grooved_page/17.webp", 500)
        }
    },
    TANQUES: {
        SLIDES: [
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tanques_page/hero/1.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tanques_page/hero/2.webp", 1200),
            optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tanques_page/hero/3.webp", 1200)
        ],
        MODELS: {
            AEREO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tanques_page/1.webp", 500),
            JAQUETADO: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tanques_page/2.webp", 500),
            GLP: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tanques_page/3.webp", 500),
            MODULOS: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/products/tanques_page/4.webp", 500)
        }
    }
  }
};
