import { TableItem } from '../../shared/types';
import { DEFAULT_DIAGRAM_URL } from '../../shared/constants';

export const chapaGrossa: TableItem = {
    id: "chapa-grossa",
    name: "Chapas Grossas",
    description: "Tabela de pesos teóricos para chapas de aço grossas. Normas: ASTM A36 / NBR 7007.",
    imageUrls: [DEFAULT_DIAGRAM_URL],
    headers: ["Espessura (Pol)", "Espessura (mm)", "Peso (kg/m²)", "Peso (6000x2000mm)"],
    rows: [
        ["1/4\"", "6,35", "50,24", "602,88"],
        ["5/16\"", "7,94", "62,80", "753,60"],
        ["3/8\"", "9,53", "75,36", "904,32"],
        ["1/2\"", "12,70", "100,48", "1205,76"],
        ["5/8\"", "15,88", "125,60", "1507,20"],
        ["3/4\"", "19,05", "150,72", "1808,64"],
        ["7/8\"", "22,22", "175,84", "2110,08"],
        ["1\"", "25,40", "201,00", "2412,00"],
        ["1.1/4\"", "31,75", "251,25", "3015,00"],
        ["1.1/2\"", "38,10", "301,50", "3618,00"],
        ["2\"", "50,80", "402,00", "4824,00"]
    ]
};