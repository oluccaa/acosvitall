import { TableItem } from '../../shared/types';
import { ansiAsmeB165, flange300lbs, flange400lbs, flange600lbs, flange900lbs, flange1500lbs } from './ansi-asme-b16-5';
import { awwaC207, awwaC207Tab3, awwaC207Tab4, awwaC207Tab5, awwaC207Tab6, awwaC207Tab7 } from './awwa-c207';
import { dinEn10921, dinEn10921Pn16, dinEn10921Pn25, dinEn10921Pn40, dinEn10921Pn63, dinEn10921Pn100 } from './din-en-1092-1';
import { flangeSoltoPead, flangeSoltoPeadPn16, flangeSoltoPeadPn26 } from './flange-solto-pead';
import { flangeSoltoPeadAwwaAsme, flangeSoltoPeadAwwaC207Tab6, flangeSoltoPeadAsmeB165 } from './flange-solto-pead-awwa-asme';

export const flangesDomain: TableItem = {
    id: "flanges-domain",
    name: "Flanges",
    items: [
        {
            id: "group-ansi-asme",
            name: "ANSI | ASME B16.5",
            items: [ansiAsmeB165, flange300lbs, flange400lbs, flange600lbs, flange900lbs, flange1500lbs]
        },
        {
            id: "group-awwa",
            name: "AWWA C-207",
            items: [awwaC207, awwaC207Tab3, awwaC207Tab4, awwaC207Tab5, awwaC207Tab6, awwaC207Tab7]
        },
        {
            id: "group-din-en",
            name: "DIN | EN 1092-1",
            items: [dinEn10921, dinEn10921Pn16, dinEn10921Pn25, dinEn10921Pn40, dinEn10921Pn63, dinEn10921Pn100]
        },
        {
            id: "group-pead",
            name: "Flanges para PEAD",
            items: [
                {
                    id: "pead-din-nbr",
                    name: "Norma DIN / NBR",
                    items: [flangeSoltoPead, flangeSoltoPeadPn16, flangeSoltoPeadPn26]
                },
                {
                    id: "pead-awwa-asme",
                    name: "Norma AWWA / ASME",
                    items: [flangeSoltoPeadAwwaAsme, flangeSoltoPeadAwwaC207Tab6, flangeSoltoPeadAsmeB165]
                }
            ]
        }
    ]
};