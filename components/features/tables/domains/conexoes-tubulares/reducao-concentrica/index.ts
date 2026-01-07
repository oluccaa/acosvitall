import { TableItem } from '../../../shared/types';
import { reducaoConcentricaAsme } from './asme-b16-9-mssp-95';

export const groupReducaoConcentrica: TableItem = {
    id: "group-reducao-concentrica",
    name: "Redução Concêntrica",
    items: [reducaoConcentricaAsme]
};