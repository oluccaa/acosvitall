import { TableItem } from '../../shared/types';
import { tubosAcoCarbono } from './tubos-aco-carbono';
import { tubosAcoInox } from './tubos-aco-inox';
import { tuboIndustrialQuadrado } from './tubo-industrial-quadrado';
import { tuboIndustrialRetangular } from './tubo-industrial-retangular';
import { tuboIndustrialRedondo } from './tubo-industrial-redondo';
import { tubosNbr5580 } from './tubos-nbr-5580';
import { tubosDinNbr5580 } from './tubos-din-nbr-5580';
import { tubosNbr5590 } from './tubos-nbr-5590';
import { tubosMecanicosLaminados } from './tubos-mecanicos-laminados';
import { tubosCalandrados } from './tubos-calandrados';
import { valvulaEsfera } from './valvula-esfera';
import { valvulaGaveta } from './valvula-gaveta';
import { valvulaGlobo } from './valvula-globo';
import { valvulaBorboleta } from './valvula-borboleta';
import { valvulaRetencaoDupla } from './valvula-retencao-dupla';
import { valvulaGuilhotina } from './valvula-guilhotina';

export const valvulasTubosDomain: TableItem = {
    id: "valvulas-tubos-domain",
    name: "Válvulas e Tubos",
    items: [
        {
            id: "cat-tubos-conducao",
            name: "Tubos de Condução",
            items: [tubosAcoCarbono, tubosAcoInox, tubosNbr5580, tubosDinNbr5580, tubosNbr5590]
        },
        {
            id: "cat-tubos-industriais-especiais",
            name: "Tubos Industriais e Especiais",
            items: [tuboIndustrialQuadrado, tuboIndustrialRetangular, tuboIndustrialRedondo, tubosMecanicosLaminados, tubosCalandrados]
        },
        {
            id: "cat-valvulas-industriais",
            name: "Válvulas Industriais",
            items: [valvulaEsfera, valvulaGaveta, valvulaGlobo, valvulaBorboleta, valvulaRetencaoDupla, valvulaGuilhotina]
        }
    ]
};