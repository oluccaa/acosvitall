import { TableItem } from '../../../shared/types';
import { DEFAULT_DIAGRAM_URL } from '../../../shared/constants';

export const toleranciasBW: TableItem = {
    id: "tolerancias-bw-asme",
    name: "Tolerâncias ASME B16.9",
    description: "Tolerâncias dimensionais para conexões BW",
    imageUrls: [DEFAULT_DIAGRAM_URL],
    headers: ["DN (Pol)", "DE (mm)", "Espessura (%)", "Centro à Face"],
    rows: [
        ["1/2 a 2.1/2\"", "+1,6 / -0,8", "-12.5%", "± 1,6"],
        ["3 a 3.1/2\"", "± 1,6", "-12.5%", "± 1,6"],
        ["4\"", "± 1,6", "-12.5%", "± 1,6"],
        ["5 a 8\"", "+2,4 / -1,6", "-12.5%", "± 2,0"]
    ]
};

export const groupTolerancias: TableItem = {
    id: "group-tolerancias-tubulares",
    name: "Tolerâncias",
    items: [toleranciasBW]
};