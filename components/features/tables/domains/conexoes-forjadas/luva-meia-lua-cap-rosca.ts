import { TableItem } from '../../shared/types';
import { DEFAULT_DIAGRAM_URL } from '../../shared/constants';

export const luvaMeiaLuaCapRosca: TableItem = {
    id: "luva-meia-lua-cap-rosca",
    name: "Luva, Meia Lua e Cap Rosca",
    description: "Conexões Tipo Roscado B16.11 - Dimensões em mm",
    imageUrls: [DEFAULT_DIAGRAM_URL],
    headerGroups: [
        [
            { text: "Conexões Tipo Roscado B16.11", colSpan: 11, className: "bg-brand-blue-dark border-b border-white/20 text-center" }
        ],
        [
            { text: "DN", rowSpan: 3, colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle" },
            { text: "DN\nTubo", rowSpan: 3, colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle" },
            { text: "Comp. Total Luvas", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20" },
            { text: "Comp. Total CAPS", colSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20" },
            { text: "Diâm. Externo", colSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20" },
            { text: "Espessura Mín.", colSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20" },
            { text: "Comprim. Mín. da Rosca (nota 1)", colSpan: 2, rowSpan: 2, className: "bg-brand-blue-dark border-b border-white/20 align-middle text-xs" }
        ],
        [
            { text: "W", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs font-bold" },
            { text: "P", colSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs font-bold" },
            { text: "D", colSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs font-bold" },
            { text: "G", colSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs font-bold" }
        ],
        [
            { text: "3000/6000", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs" },
            { text: "3000", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs" },
            { text: "6000", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs" },
            { text: "3000", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs" },
            { text: "6000", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs" },
            { text: "B", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs" },
            { text: "L2", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs" },
            { text: "B", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle text-xs" },
            { text: "L2", colSpan: 1, className: "bg-brand-blue-dark align-middle text-xs" }
        ]
    ],
    headers: [],
    rows: [
        ["6", "1/8\"", "31,75", "19,05", "-", "15,75", "22,35", "4,83", "-", "6,35", "6,7"],
        ["15", "1/2\"", "47,75", "31,75", "33,27", "28,45", "38,1", "6,35", "7,87", "10,92", "13,56"],
        ["50", "2\"", "85,85", "47,75", "50,8", "76,2", "91,95", "12,7", "15,75", "19,05", "19,22"]
    ]
};