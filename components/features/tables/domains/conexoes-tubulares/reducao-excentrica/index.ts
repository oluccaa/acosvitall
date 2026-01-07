import { TableItem } from '../../../shared/types';
import { reducaoExcentricaAsme } from './asme-b16-9-mssp-95';
import { perpendicularidadeExc } from './perpendicularidade';

export const groupReducaoExcentrica: TableItem = {
    id: "group-reducao-excentrica",
    name: "Redução Excêntrica",
    items: [reducaoExcentricaAsme, perpendicularidadeExc]
};