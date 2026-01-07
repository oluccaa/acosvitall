import { TableItem } from '../../../shared/types';
import { curvas90Pesos } from './asme-b16-9-90';
import { curvas180Pesos } from './asme-b16-9-180';

export const groupCurvasKg90: TableItem = {
    id: "group-curvas-kg-90",
    name: "Curvas (kg) 90° e 180°",
    items: [curvas90Pesos, curvas180Pesos]
};