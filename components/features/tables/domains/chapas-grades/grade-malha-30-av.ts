import { TableItem } from '../../shared/types';
import { DEFAULT_DIAGRAM_URL } from '../../shared/constants';

export const gradeMalha30Av: TableItem = {
    id: "grade-malha-30-av",
    name: "Grade Malha 30 AV",
    description: "Tabela de especificações para Grades de Piso Industrial - Malha 30 AV.",
    imageUrls: [DEFAULT_DIAGRAM_URL],
    headerGroups: [
        [
            { text: "Grades de Piso Industrial - Malha 30 AV", colSpan: 7, className: "bg-brand-blue-dark border-b border-white/20 text-center" }
        ],
        [
            { text: "Referência", colSpan: 1, rowSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 text-center align-middle" },
            { text: "Peso M²", colSpan: 1, rowSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 text-center align-middle" },
            { text: "Sobrecarga", colSpan: 1, rowSpan: 2, className: "bg-brand-blue-dark border-r border-white/20 text-center align-middle" },
            { text: "Vãos/mm - Carga Distribuída Uniformemente", colSpan: 4, className: "bg-brand-blue-dark border-b border-white/20 text-center" }
        ]
    ],
    headers: ["400mm", "600mm", "800mm", "1000mm"],
    rows: [
        ["AV-30X100-20-2", "14", "C.U.D ¹", "3267kgs", "1452kgs", "743kgs", "379kgs"],
        ["AV-30X50-20-2", "16", "FLEXA²", "1,1mm", "2,5mm", "4mm", "5mm"],
        ["AV-30X100-20-3", "19", "C.U.D ¹", "4900kgs", "2178kgs", "1113kgs", "568kgs"],
        ["AV-30X50-20-3", "22", "FLEXA²", "1,1mm", "2,5mm", "4mm", "5mm"],
        ["AV-30X100-20-5", "30", "C.U.D ¹", "7677kgs", "3412kgs", "1745kgs", "890kgs"],
        ["AV-30X50-20-5", "32", "FLEXA²", "1,1mm", "2,5mm", "4mm", "5mm"]
    ]
};