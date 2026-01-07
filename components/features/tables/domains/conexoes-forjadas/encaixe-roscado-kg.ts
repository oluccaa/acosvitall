import { TableItem } from '../../shared/types';
import { DEFAULT_DIAGRAM_URL } from '../../shared/constants';

export const encaixeRoscadoKg: TableItem = {
    id: "encaixe-roscado-kg",
    name: "Pesos Aproximados de Conexões",
    items: [
        {
            id: "pesos-sw-forjados",
            name: "Pesos Aproximados - Encaixe SW",
            description: "Pesos em kg para conexões de encaixe (Socket Weld)",
            imageUrls: [DEFAULT_DIAGRAM_URL],
            headerGroups: [
                [
                    { text: "Pesos Aproximados de Conexões Encaixe SW", colSpan: 22, className: "bg-brand-blue-dark border-b border-white/20 text-center" }
                ],
                [
                    { text: "DN", rowSpan: 2, colSpan: 1, className: "bg-brand-blue-dark border-r border-white/20 align-middle" },
                    { text: "Cotovelo 90°", colSpan: 3, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20 text-center" },
                    { text: "Cotovelo 45°", colSpan: 3, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20 text-center" },
                    { text: "Te", colSpan: 3, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20 text-center" },
                    { text: "Cruzeta", colSpan: 3, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20 text-center" },
                    { text: "Luva", colSpan: 3, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20 text-center" },
                    { text: "Meia Luva", colSpan: 3, className: "bg-brand-blue-dark border-r border-white/20 border-b border-white/20 text-center" },
                    { text: "CAP", colSpan: 3, className: "bg-brand-blue-dark border-b border-white/20 text-center" }
                ]
            ],
            headers: ["Pol", "3000#", "6000#", "9000#", "3000#", "6000#", "9000#", "3000#", "6000#", "9000#", "3000#", "6000#", "9000#", "3000#", "6000#", "9000#", "3000#", "6000#", "9000#", "3000#", "6000#", "9000#"],
            rows: [
                ["1/2\"", "0,23", "0,41", "-", "0,20", "0,37", "-", "0,31", "0,59", "-", "0,36", "0,68", "-", "0,11", "0,16", "-", "0,09", "0,19", "-", "0,14", "0,21", "-"],
                ["3/4\"", "0,34", "0,72", "-", "0,23", "0,7", "-", "0,4", "0,9", "-", "0,55", "1,0", "-", "0,17", "0,27", "-", "0,14", "0,31", "-", "0,2", "0,29", "-"],
                ["1\"", "0,45", "1,1", "-", "0,4", "0,99", "-", "0,65", "1,53", "-", "0,72", "1,69", "-", "0,34", "0,4", "-", "0,26", "0,5", "-", "0,32", "0,58", "-"]
            ]
        }
    ]
};