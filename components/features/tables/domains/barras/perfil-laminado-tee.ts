import { TableItem } from '../../shared/types';
import { DEFAULT_DIAGRAM_URL } from '../../shared/constants';

export const perfilLaminadoTee: TableItem = {
    id: "perfil-laminado-tee",
    name: "Perfil Laminado Tee",
    description: "Barras com 6m - Normas: NBR 7007 MR 250 / ASTM A-36",
    imageUrls: [DEFAULT_DIAGRAM_URL],
    headerGroups: [
        [
            { text: "Perfil Laminado Tee", colSpan: 3, className: "bg-brand-blue-dark border-b border-white/20 text-center" }
        ],
        [
            { text: "Bitola", colSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 text-center align-middle" },
            { text: "Peso Teórico kg/m", colSpan: 1, rowSpan: 2, className: "bg-brand-blue-dark text-center align-middle" }
        ],
        [
            { text: "pol.", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 text-center text-xs" },
            { text: "mm", colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 text-center text-xs" }
        ]
    ],
    headers: [],
    rows: [
        ["1/8 x 5/8\"", "3,18 x 15,88", "0,71"],
        ["1/8 x 3/4\"", "3,18 x 19,05", "0,86"],
        ["1/8 x 1\"", "3,18 x 25,40", "1,18"],
        ["1/4 x 2\"", "6,35 x 50,80", "4,74"]
    ]
};