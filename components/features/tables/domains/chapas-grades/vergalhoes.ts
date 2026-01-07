import { TableItem } from '../../shared/types';

export const vergalhoes: TableItem = {
    id: "vergalhoes-ca50-ca60",
    name: "Vergalhões CA-50 / CA-60",
    description: "Dimensões e pesos nominais para vergalhões de aço destinados a concreto armado.",
    headers: ["Bitola (mm)", "Bitola (Pol)", "Massa (kg/m)", "Tolerância (%)"],
    rows: [
        ["5,0", "3/16\"", "0,154", "± 7"],
        ["6,3", "1/4\"", "0,245", "± 7"],
        ["8,0", "5/16\"", "0,395", "± 7"],
        ["10,0", "3/8\"", "0,617", "± 6"],
        ["12,5", "1/2\"", "0,963", "± 6"],
        ["16,0", "5/8\"", "1,578", "± 5"],
        ["20,0", "3/4\"", "2,466", "± 5"],
        ["25,0", "1\"", "3,853", "± 4"]
    ]
};