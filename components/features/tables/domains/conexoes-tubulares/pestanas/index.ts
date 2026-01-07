import { TableItem } from '../../../shared/types';
import { pestanaAsme } from './asme-b16-9';
import { pestanaInoxMss } from './inox-mss-sp-43';

export const groupPestanas: TableItem = {
    id: "group-pestanas",
    name: "Pestanas (Stub Ends)",
    items: [pestanaAsme, pestanaInoxMss]
};