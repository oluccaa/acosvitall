import { TableItem } from '../../shared/types';
import { cotovelosTesCruzetas } from './cotovelos-tes-cruzetas';
import { luvaMeiaLuaCap } from './luva-meia-lua-cap';
import { colares } from './colares';
import { colares2 } from './colares-2';
import { plugsBuchasNiples } from './plugs-buchas-niples';
import { cotovelosTeCruzetaEn } from './cotovelos-te-cruzeta-en';
import { luvaMeiaLuaCapRosca } from './luva-meia-lua-cap-rosca';
import { encaixeRoscadoKg } from './encaixe-roscado-kg';

export const conexoesForjadasDomain: TableItem = {
    id: "conexoes-forjadas-domain",
    name: "Conexões Forjadas",
    items: [
        {
            id: "forjadas-encaixe-sw",
            name: "Encaixe SW (Socket Weld)",
            items: [cotovelosTesCruzetas, luvaMeiaLuaCap, cotovelosTeCruzetaEn]
        },
        {
            id: "forjadas-roscadas",
            name: "Roscadas (NPT/BSP)",
            items: [luvaMeiaLuaCapRosca, plugsBuchasNiples]
        },
        {
            id: "forjadas-colares",
            name: "Colares (Olets)",
            items: [colares, colares2]
        },
        {
            id: "forjadas-pesos",
            name: "Tabelas de Pesos",
            items: [encaixeRoscadoKg]
        }
    ]
};