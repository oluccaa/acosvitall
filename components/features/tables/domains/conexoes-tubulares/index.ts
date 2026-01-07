import { TableItem } from '../../shared/types';
import { curvas } from './curvas';
import { teCruzetaCap } from './te-cruzeta-cap';
import { teReducao } from './te-reducao';
import { groupCurvasKg90 } from './curvas-kg-90';
import { groupPestanas } from './pestanas';
import { groupReducaoConcentrica } from './reducao-concentrica';
import { groupReducaoExcentrica } from './reducao-excentrica';
import { groupTolerancias } from './tolerancias';
import { capsKg } from './caps-kg';
import { curvas45Kg } from './curvas-kg-45';
import { curvasRaioEspecial } from './curvas-raio-3x-5x';
import { pestanaKg } from './pestana-kg';
import { reducaoKg } from './reducao-kg';
import { tesKg } from './tes-kg';

/**
 * Domínio de Conexões Tubulares consolidado conforme estrutura de diretórios e normas técnicas.
 */
export const conexoesTubularesDomain: TableItem = {
    id: "conexoes-tubulares-domain",
    name: "Conexões Tubulares (BW)",
    items: [
        curvas,
        teCruzetaCap,
        teReducao,
        curvasRaioEspecial,
        groupCurvasKg90,
        groupPestanas,
        groupReducaoConcentrica,
        groupReducaoExcentrica,
        groupTolerancias,
        {
            id: "tubulares-pesos-kg",
            name: "Tabelas de Pesos (kg)",
            items: [
                curvas45Kg,
                tesKg,
                capsKg,
                reducaoKg,
                pestanaKg
            ]
        }
    ]
};