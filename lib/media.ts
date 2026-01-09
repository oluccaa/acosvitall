
/**
 * ============================================================================
 * BIBLIOTECA DE ASSETS - AÇOS VITAL
 * ============================================================================
 */

const IMG_WIDTH = {
    LOGO: 300,
    ICON: 150,
    THUMB: 400,
    CONTENT: 800,
    HERO: 1000 
};

const optimize = (url: string, width: number = IMG_WIDTH.CONTENT): string => {
    if (!url) return '';
    if (url.includes('supabase.co') || url.includes('unsplash.com') || url.includes('storage.googleapis.com')) {
        return `https://images.builderservices.io/s/cdn/v1.0/i/m?url=${encodeURIComponent(url)}&methods=resize%2C${width}%2C5000&format=webp&quality=70`;
    }
    return url;
};

const SB_BASE = "https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets";

export const ASSETS = {
    LOGO: optimize(`${SB_BASE}/geral/logo/logo.png`, IMG_WIDTH.LOGO),
    FAVICON: "/favicon.svg",

    GLOBAL: {
        LOGO: optimize(`${SB_BASE}/geral/logo/logo.png`, IMG_WIDTH.LOGO),
        FAVICON: "/favicon.svg",
    },

    ADS: {
        CALCULATOR_LEFT: `${SB_BASE}/calculadora_de_aco/ads_fixo/ads_esquerda.avif`,
        CALCULATOR_RIGHT: `${SB_BASE}/calculadora_de_aco/ads_fixo/ads_direita.avif`,
        CALCULATOR_BOTTOM: optimize(`${SB_BASE}/calculadora_de_aco/ads_fixo/entrega_otimizada_bottom.png`, 1200)
    },

    CERTIFICATIONS_LOGOS: {
        ISO9001: optimize(`${SB_BASE}/sobre_nos/certificacoes/ISO.webp`, 200),
        CRC: optimize(`${SB_BASE}/sobre_nos/certificacoes/CRC.webp`, 200),
        YPFB: optimize(`${SB_BASE}/sobre_nos/certificacoes/YPFB.webp`, 200)
    },

    SECTORS: {
        AGRICULTURE: optimize(`${SB_BASE}/geral/setores_atendidos/1.webp`, IMG_WIDTH.ICON),
        ARCHITECTURE: optimize(`${SB_BASE}/geral/setores_atendidos/2.webp`, IMG_WIDTH.ICON),
        AUTOMOTIVE: optimize(`${SB_BASE}/geral/setores_atendidos/3.webp`, IMG_WIDTH.ICON),
        CIVIL_CONST: optimize(`${SB_BASE}/geral/setores_atendidos/4.webp`, IMG_WIDTH.ICON),
        ENERGY: optimize(`${SB_BASE}/geral/setores_atendidos/5.webp`, IMG_WIDTH.ICON),
        NAVAL: optimize(`${SB_BASE}/geral/setores_atendidos/6.webp`, IMG_WIDTH.ICON),
        MINING: optimize(`${SB_BASE}/geral/setores_atendidos/7.webp`, IMG_WIDTH.ICON),
        OIL_GAS: optimize(`${SB_BASE}/geral/setores_atendidos/8.webp`, IMG_WIDTH.ICON),
        PULP_PAPER: optimize(`${SB_BASE}/geral/setores_atendidos/9.webp`, IMG_WIDTH.ICON),
        PETROCHEMICAL: optimize(`${SB_BASE}/geral/setores_atendidos/10.webp`, IMG_WIDTH.ICON),
        SANITATION: optimize(`${SB_BASE}/geral/setores_atendidos/11.webp`, IMG_WIDTH.ICON),
        STEEL: optimize(`${SB_BASE}/geral/setores_atendidos/12.webp`, IMG_WIDTH.ICON),
    },

    HERO_SLIDES_IMGS: {
        ENTRESSAFRA: optimize(`${SB_BASE}/home/hero/1.webp`, IMG_WIDTH.HERO),
        TRAPEZOIDAL: optimize(`${SB_BASE}/home/hero/2.webp`, IMG_WIDTH.HERO),
        EXCELLENCE: optimize(`${SB_BASE}/home/hero/3.webp`, IMG_WIDTH.HERO),
        FLANGES: optimize(`${SB_BASE}/home/hero/4.webp`, IMG_WIDTH.HERO),
        FLOORING: optimize(`${SB_BASE}/home/hero/5.webp`, IMG_WIDTH.HERO)
    },

    PRODUCT_THUMBNAILS: {
        FLANGES: optimize(`${SB_BASE}/home/produtos_destaques/1.webp`, IMG_WIDTH.THUMB),
        TUBES: optimize(`${SB_BASE}/home/produtos_destaques/2.webp`, IMG_WIDTH.THUMB),
        FITTINGS: optimize(`${SB_BASE}/home/produtos_destaques/4.webp`, IMG_WIDTH.THUMB),
        VALVES: optimize(`${SB_BASE}/home/produtos_destaques/5.webp`, IMG_WIDTH.THUMB),
        PROFILES: optimize(`${SB_BASE}/home/produtos_destaques/14.webp`, IMG_WIDTH.THUMB),
        PLATES: optimize(`${SB_BASE}/home/produtos_destaques/6.webp`, IMG_WIDTH.THUMB),
        GRATINGS: optimize(`${SB_BASE}/home/produtos_destaques/8.webp`, IMG_WIDTH.THUMB),
        TILES: optimize(`${SB_BASE}/home/produtos_destaques/13.webp`, IMG_WIDTH.THUMB),
        CIVIL: optimize(`${SB_BASE}/home/produtos_destaques/9.webp`, IMG_WIDTH.THUMB),
        BOILERMAKING: optimize(`${SB_BASE}/home/produtos_destaques/10.webp`, IMG_WIDTH.THUMB),
        CUTTING: optimize(`${SB_BASE}/home/produtos_destaques/12.webp`, IMG_WIDTH.THUMB),
        CONDUITS: optimize(`${SB_BASE}/home/produtos_destaques/3.webp`, IMG_WIDTH.THUMB),
        TANKS: optimize(`${SB_BASE}/home/produtos_destaques/7.webp`, IMG_WIDTH.THUMB),
        GROOVED: optimize(`${SB_BASE}/home/produtos_destaques/11.webp`, IMG_WIDTH.THUMB)
    },

    HOME_FEATURED: {
        FLANGE: optimize(`${SB_BASE}/home/produtos_destaques/1.webp`, IMG_WIDTH.THUMB),
        TUBOS: optimize(`${SB_BASE}/home/produtos_destaques/2.webp`, IMG_WIDTH.THUMB),
        CALDEIRARIA: optimize(`${SB_BASE}/home/produtos_destaques/10.webp`, IMG_WIDTH.THUMB),
        CHAPAS: optimize(`${SB_BASE}/home/produtos_destaques/6.webp`, IMG_WIDTH.THUMB),
        CONEXOES: optimize(`${SB_BASE}/home/produtos_destaques/4.webp`, IMG_WIDTH.THUMB),
        VALVULAS: optimize(`${SB_BASE}/home/produtos_destaques/5.webp`, IMG_WIDTH.THUMB),
        PERFIS: optimize(`${SB_BASE}/home/produtos_destaques/14.webp`, IMG_WIDTH.THUMB),
        GRADE: optimize(`${SB_BASE}/home/produtos_destaques/8.webp`, IMG_WIDTH.THUMB),
        TELHAS: optimize(`${SB_BASE}/home/produtos_destaques/13.webp`, IMG_WIDTH.THUMB),
        CIVIL: optimize(`${SB_BASE}/home/produtos_destaques/9.webp`, IMG_WIDTH.THUMB),
        OXICORTE: optimize(`${SB_BASE}/home/produtos_destaques/12.webp`, IMG_WIDTH.THUMB),
        ELETRODUTOS: optimize(`${SB_BASE}/home/produtos_destaques/3.webp`, IMG_WIDTH.THUMB),
        GROOVED: optimize(`${SB_BASE}/home/produtos_destaques/11.webp`, IMG_WIDTH.THUMB),
        TANQUES: optimize(`${SB_BASE}/home/produtos_destaques/7.webp`, IMG_WIDTH.THUMB)
    },

    CTA: {
        BG: optimize(`${SB_BASE}/geral/cta/cta.webp`, IMG_WIDTH.HERO),
        BG_GIF: `${SB_BASE}/geral/cta/cta.avif`
    },

    HERO: {
        COMMON_VIDEO: `${SB_BASE}/geral/video_hero.mp4`,
        COMMON_BG: optimize(`${SB_BASE}/home/hero/3.webp`, IMG_WIDTH.HERO),
        FEATURES_BG: optimize(`${SB_BASE}/home/hero/3.webp`, IMG_WIDTH.HERO),
        ABOUT_ANIMATED_BG: `${SB_BASE}/home/sobre/vertical-sobre-empresa.avif`
    },

    ABOUT: {
        UNITS_MAP: optimize(`${SB_BASE}/sobre_nos/onde_atuamos/mapa_de_atuacao.webp`, IMG_WIDTH.CONTENT),
        CONTENT_IMAGE: `${SB_BASE}/home/sobre/vertical-sobre-empresa.avif`,
    },

    CERTIFICATIONS: {
        HERO_BG: optimize("https://mxbsygruslepfcyhtmqr.supabase.co/storage/v1/object/public/public_assets/sobre_nos/certificacoes/hero.webp", IMG_WIDTH.HERO),
    },

    PRODUCT_PAGES: {
        CALDEIRARIA: {
            SLIDES: [
                optimize(`${SB_BASE}/products/caldeiraria_page/hero/1.webp`, IMG_WIDTH.HERO),
                optimize(`${SB_BASE}/products/caldeiraria_page/hero/2.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                TUBOS_CALANDRADOS: optimize(`${SB_BASE}/products/caldeiraria_page/1.webp`, IMG_WIDTH.THUMB),
                PECAS_PERSONALIZADAS: optimize(`${SB_BASE}/products/caldeiraria_page/2.webp`, IMG_WIDTH.THUMB),
                EQUIPAMENTOS: optimize(`${SB_BASE}/products/caldeiraria_page/3.webp`, IMG_WIDTH.THUMB)
            }
        },
        CHAPAS: {
            SLIDES: [
                optimize(`${SB_BASE}/products/chapas_page/hero/1.webp`, IMG_WIDTH.HERO),
                optimize(`${SB_BASE}/products/chapas_page/hero/2.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                FINA: optimize(`${SB_BASE}/products/chapas_page/1.webp`, IMG_WIDTH.THUMB),
                GROSSA: optimize(`${SB_BASE}/products/chapas_page/2.webp`, IMG_WIDTH.THUMB),
                ZINCADA: optimize(`${SB_BASE}/products/chapas_page/3.webp`, IMG_WIDTH.THUMB),
                XADREZ: optimize(`${SB_BASE}/products/chapas_page/4.webp`, IMG_WIDTH.THUMB),
                PERFURADA: optimize(`${SB_BASE}/products/chapas_page/5.webp`, IMG_WIDTH.THUMB),
                EXPANDIDA: optimize(`${SB_BASE}/products/chapas_page/6.webp`, IMG_WIDTH.THUMB)
            }
        },
        CIVIL: {
            SLIDES: [
                optimize(`${SB_BASE}/products/civil_page/hero/1.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                ARAME: optimize(`${SB_BASE}/products/civil_page/1.webp`, IMG_WIDTH.THUMB),
                BARRA_TRANSF: optimize(`${SB_BASE}/products/civil_page/2.webp`, IMG_WIDTH.THUMB),
                VERGALHOES: optimize(`${SB_BASE}/products/civil_page/3.webp`, IMG_WIDTH.THUMB),
                TELA: optimize(`${SB_BASE}/products/civil_page/4.webp`, IMG_WIDTH.THUMB),
                TRELICA: optimize(`${SB_BASE}/products/civil_page/5.webp`, IMG_WIDTH.THUMB)
            }
        },
        CONEXOES: {
            SLIDES: [
                optimize(`${SB_BASE}/products/conexoes_page/hero/1.webp`, IMG_WIDTH.HERO),
                optimize(`${SB_BASE}/products/conexoes_page/hero/2.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                ALTA_PRESSAO: optimize(`${SB_BASE}/products/conexoes_page/1.webp`, IMG_WIDTH.THUMB),
                GOMADAS: optimize(`${SB_BASE}/products/conexoes_page/2.webp`, IMG_WIDTH.THUMB),
                TUBULARES: optimize(`${SB_BASE}/products/conexoes_page/3.webp`, IMG_WIDTH.THUMB)
            }
        },
        ELETRODUTOS: {
            SLIDES: [
                optimize(`${SB_BASE}/products/eletrodutos_page/hero/1.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                LEVE: optimize(`${SB_BASE}/products/eletrodutos_page/1.webp`, IMG_WIDTH.THUMB),
                MEDIO: optimize(`${SB_BASE}/products/eletrodutos_page/2.webp`, IMG_WIDTH.THUMB),
                PESADO: optimize(`${SB_BASE}/products/eletrodutos_page/3.webp`, IMG_WIDTH.THUMB),
                CONEXOES_ELETRO: optimize(`${SB_BASE}/products/eletrodutos_page/4.webp`, IMG_WIDTH.THUMB),
                FOGO_MEDIO: optimize(`${SB_BASE}/products/eletrodutos_page/5.webp`, IMG_WIDTH.THUMB),
                FOGO_PESADO: optimize(`${SB_BASE}/products/eletrodutos_page/6.webp`, IMG_WIDTH.THUMB),
                FOGO_CONEXOES: optimize(`${SB_BASE}/products/eletrodutos_page/7.webp`, IMG_WIDTH.THUMB),
                RIR_NPT: optimize(`${SB_BASE}/products/eletrodutos_page/8.webp`, IMG_WIDTH.THUMB),
                RIR_BSP: optimize(`${SB_BASE}/products/eletrodutos_page/9.webp`, IMG_WIDTH.THUMB),
                INOX_10: optimize(`${SB_BASE}/products/eletrodutos_page/10.webp`, IMG_WIDTH.THUMB),
                INOX_40: optimize(`${SB_BASE}/products/eletrodutos_page/11.webp`, IMG_WIDTH.THUMB),
                CONEXOES_GERAL: optimize(`${SB_BASE}/products/eletrodutos_page/12.webp`, IMG_WIDTH.THUMB)
            }
        },
        FLANGES: {
            SLIDES: [
                optimize(`${SB_BASE}/products/flange_page/hero/1.webp`, IMG_WIDTH.HERO),
                optimize(`${SB_BASE}/products/flange_page/hero/2.webp`, IMG_WIDTH.HERO),
                optimize(`${SB_BASE}/products/flange_page/hero/3.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                SLIP_ON: optimize(`${SB_BASE}/products/flange_page/1.webp`, IMG_WIDTH.THUMB),
                WELD_NECK: optimize(`${SB_BASE}/products/flange_page/2.webp`, IMG_WIDTH.THUMB),
                BLIND: optimize(`${SB_BASE}/products/flange_page/3.webp`, IMG_WIDTH.THUMB),
                LAP_JOINT: optimize(`${SB_BASE}/products/flange_page/4.webp`, IMG_WIDTH.THUMB),
                THREADED: optimize(`${SB_BASE}/products/flange_page/5.webp`, IMG_WIDTH.THUMB),
                SOCKET_WELD: optimize(`${SB_BASE}/products/flange_page/6.webp`, IMG_WIDTH.THUMB),
                SOBREPOSTO: optimize(`${SB_BASE}/products/flange_page/7.webp`, IMG_WIDTH.THUMB),
                SOLTO: optimize(`${SB_BASE}/products/flange_page/8.webp`, IMG_WIDTH.THUMB),
                PEAD: optimize(`${SB_BASE}/products/flange_page/9.webp`, IMG_WIDTH.THUMB),
                LIGAS: optimize(`${SB_BASE}/products/flange_page/10.webp`, IMG_WIDTH.THUMB),
                FIXADORES: optimize(`${SB_BASE}/products/flange_page/11.webp`, IMG_WIDTH.THUMB),
                JUNTAS: optimize(`${SB_BASE}/products/flange_page/12.webp`, IMG_WIDTH.THUMB)
            }
        },
        GRADES: {
            SLIDES: [
                optimize(`${SB_BASE}/products/grades_page/hero/1.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                INDUSTRIAL: optimize(`${SB_BASE}/products/grades_page/1.webp`, IMG_WIDTH.THUMB),
                MALHAS: optimize(`${SB_BASE}/products/grades_page/2.webp`, IMG_WIDTH.THUMB)
            }
        },
        GROOVED: {
            SLIDES: [
                optimize(`${SB_BASE}/products/grooved_page/hero/1.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                FLEXIVEL: optimize(`${SB_BASE}/products/grooved_page/1.webp`, IMG_WIDTH.THUMB),
                REDUCAO_FLEX: optimize(`${SB_BASE}/products/grooved_page/2.webp`, IMG_WIDTH.THUMB),
                RIGIDO: optimize(`${SB_BASE}/products/grooved_page/3.webp`, IMG_WIDTH.THUMB),
                COTOVELO_45: optimize(`${SB_BASE}/products/grooved_page/4.webp`, IMG_WIDTH.THUMB),
                COTOVELO_90: optimize(`${SB_BASE}/products/grooved_page/5.webp`, IMG_WIDTH.THUMB),
                CRUZETA_MEC: optimize(`${SB_BASE}/products/grooved_page/6.webp`, IMG_WIDTH.THUMB),
                CRUZETA_RAN: optimize(`${SB_BASE}/products/grooved_page/7.webp`, IMG_WIDTH.THUMB),
                TAMPAO: optimize(`${SB_BASE}/products/grooved_page/8.webp`, IMG_WIDTH.THUMB),
                LUVA_RED: optimize(`${SB_BASE}/products/grooved_page/9.webp`, IMG_WIDTH.THUMB),
                ADAPTADOR: optimize(`${SB_BASE}/products/grooved_page/10.webp`, IMG_WIDTH.THUMB),
                TEE_UBOLT: optimize(`${SB_BASE}/products/grooved_page/11.webp`, IMG_WIDTH.THUMB),
                TEE_MEC_ROSCA: optimize(`${SB_BASE}/products/grooved_page/12.webp`, IMG_WIDTH.THUMB),
                TEE_MEC_RAN: optimize(`${SB_BASE}/products/grooved_page/13.webp`, IMG_WIDTH.THUMB),
                TEE_RAN: optimize(`${SB_BASE}/products/grooved_page/14.webp`, IMG_WIDTH.THUMB),
                TEE_RED_RAN: optimize(`${SB_BASE}/products/grooved_page/15.webp`, IMG_WIDTH.THUMB),
                TEE_RED_ROSCA: optimize(`${SB_BASE}/products/grooved_page/16.webp`, IMG_WIDTH.THUMB),
                FLANGE_BIP: optimize(`${SB_BASE}/products/grooved_page/17.webp`, IMG_WIDTH.THUMB)
            }
        },
        OXICORTE: {
            SLIDES: [
                optimize(`${SB_BASE}/products/oxicorte_page/hero/1.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                MACARICO: optimize(`${SB_BASE}/products/oxicorte_page/1.webp`, IMG_WIDTH.THUMB),
                TARTARUGA: optimize(`${SB_BASE}/products/oxicorte_page/2.webp`, IMG_WIDTH.THUMB),
                PLASMA: optimize(`${SB_BASE}/products/oxicorte_page/3.webp`, IMG_WIDTH.THUMB),
                FOTOCELULA: optimize(`${SB_BASE}/products/oxicorte_page/4.webp`, IMG_WIDTH.THUMB)
            }
        },
        PERFIS: {
            SLIDES: [
                optimize(`${SB_BASE}/products/perfis_page/hero/1.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                W: optimize(`${SB_BASE}/products/perfis_page/1.webp`, IMG_WIDTH.THUMB),
                I_HQ: optimize(`${SB_BASE}/products/perfis_page/2.webp`, IMG_WIDTH.THUMB),
                U: optimize(`${SB_BASE}/products/perfis_page/3.webp`, IMG_WIDTH.THUMB),
                U_SIMPLES: optimize(`${SB_BASE}/products/perfis_page/4.webp`, IMG_WIDTH.THUMB),
                U_ENRIJECIDO: optimize(`${SB_BASE}/products/perfis_page/5.webp`, IMG_WIDTH.THUMB),
                CANTONEIRA: optimize(`${SB_BASE}/products/perfis_page/6.webp`, IMG_WIDTH.THUMB),
                BARRA_CHATA: optimize(`${SB_BASE}/products/perfis_page/7.webp`, IMG_WIDTH.THUMB),
                BARRA_REDONDA: optimize(`${SB_BASE}/products/perfis_page/8.webp`, IMG_WIDTH.THUMB)
            }
        },
        TANQUES: {
            SLIDES: [
                optimize(`${SB_BASE}/products/tanques_page/hero/1.webp`, IMG_WIDTH.HERO),
                optimize(`${SB_BASE}/products/tanques_page/hero/2.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                AEREO: optimize(`${SB_BASE}/products/tanques_page/1.webp`, IMG_WIDTH.THUMB),
                JAQUETADO: optimize(`${SB_BASE}/products/tanques_page/2.webp`, IMG_WIDTH.THUMB),
                GLP: optimize(`${SB_BASE}/products/tanques_page/3.webp`, IMG_WIDTH.THUMB),
                MODULOS: optimize(`${SB_BASE}/products/tanques_page/4.webp`, IMG_WIDTH.THUMB)
            }
        },
        TELHAS: {
            SLIDES: [
                optimize(`${SB_BASE}/products/telhas_page/hero/1.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                GALVALUME: optimize(`${SB_BASE}/products/telhas_page/1.webp`, IMG_WIDTH.THUMB),
                PINTADA: optimize(`${SB_BASE}/products/telhas_page/2.webp`, IMG_WIDTH.THUMB),
                TERMOSTATICA: optimize(`${SB_BASE}/products/telhas_page/3.webp`, IMG_WIDTH.THUMB)
            }
        },
        TUBOS: {
            SLIDES: [
                optimize(`${SB_BASE}/products/tubos_page/hero/1.webp`, IMG_WIDTH.HERO),
                optimize(`${SB_BASE}/products/tubos_page/hero/2.webp`, IMG_WIDTH.HERO),
                optimize(`${SB_BASE}/products/tubos_page/hero/3.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                INOX: optimize(`${SB_BASE}/products/tubos_page/1.webp`, IMG_WIDTH.THUMB),
                CARBONO: optimize(`${SB_BASE}/products/tubos_page/2.webp`, IMG_WIDTH.THUMB),
                INDUSTRIAIS: optimize(`${SB_BASE}/products/tubos_page/3.webp`, IMG_WIDTH.THUMB),
                MECANICOS: optimize(`${SB_BASE}/products/tubos_page/4.webp`, IMG_WIDTH.THUMB)
            }
        },
        VALVULAS: {
            SLIDES: [
                optimize(`${SB_BASE}/products/valvulas_page/hero/1.webp`, IMG_WIDTH.HERO)
            ],
            MODELS: {
                BORBOLETA: optimize(`${SB_BASE}/products/valvulas_page/1.webp`, IMG_WIDTH.THUMB),
                ESFERA: optimize(`${SB_BASE}/products/valvulas_page/2.webp`, IMG_WIDTH.THUMB),
                GAVETA: optimize(`${SB_BASE}/products/valvulas_page/3.webp`, IMG_WIDTH.THUMB),
                GLOBO: optimize(`${SB_BASE}/products/valvulas_page/4.webp`, IMG_WIDTH.THUMB),
                GUILHOTINA: optimize(`${SB_BASE}/products/valvulas_page/5.webp`, IMG_WIDTH.THUMB),
                RETENCAO: optimize(`${SB_BASE}/products/valvulas_page/6.webp`, IMG_WIDTH.THUMB)
            }
        }
    }
};

export const ASSETS_SHORTCUTS = {
    LOGO: ASSETS.LOGO,
    CTA_BG: ASSETS.CTA.BG
};
