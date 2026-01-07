import { TableItem } from '../../shared/types';
import { DEFAULT_DIAGRAM_URL } from '../../shared/constants';

export const gradeMalha25Av: TableItem = {
    id: "grade-malha-25-av",
    name: "Grade Malha 25 AV",
    description: "Tabela de especificações para Grades de Piso Industrial - Malha 25 AV.",
    imageUrls: [DEFAULT_DIAGRAM_URL],
    headerGroups: [
        [
            { text: "Grades de Piso Industrial - Malha 25 AV", colSpan: 7, className: "bg-brand-blue-dark border-b border-white/20 text-center" }
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
        ["AV-25X100-20-2", "16", "C.U.D ¹", "3827kgs", "1701kgs", "870kgs", "443kgs"],
        ["AV-25X50-20-2", "18", "FLEXA²", "1,1mm", "2,5mm", "4mm", "5mm"],
        ["AV-25X100-20-3", "22", "C.U.D ¹", "5740kgs", "2551kgs", "1304kgs", "665kgs"],
        ["AV-25X100-25-5", "42", "C.U.D ¹", "14051kgs", "6245kgs", "3513kgs", "2007kgs"]
    ]
};