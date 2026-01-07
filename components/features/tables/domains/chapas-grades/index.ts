import { TableItem } from '../../shared/types';
import { chapaFinaFrio } from './chapa-fina-frio';
import { chapaFinaQuente } from './chapa-fina-quente';
import { chapaGrossa } from './chapa-grossa';
import { chapaXadrez } from './chapa-xadrez';
import { chapaZincada } from './chapa-zincada';
import { chapaExpandida } from './chapa-expandida';
import { chapaPerfuradaRedondo } from './chapa-perfurada-redondo';
import { gradeMalha25Av } from './grade-malha-25-av';
import { gradeMalha30Av } from './grade-malha-30-av';
import { vergalhoes } from './vergalhoes';
import { telaSoldadaNervurada } from './tela-soldada-nervurada';
import { trelica } from './trelica';
import { aramesBarras, barraTransferencia } from './arames-barras';
import { eletroliticoPreZincado } from './eletrolitico-pre-zincado';
import { eletroliticoGalvanizadoFogo } from './eletrolitico-galvanizado-fogo';
import { atmosferaExplosivaRir } from './atmosfera-explosiva-rir';
import { eletrodutosInox } from './eletrodutos-inox';

export const chapasGradesDomain: TableItem = {
    id: "chapas-grades-domain",
    name: "Chapas e Construção Civil",
    items: [
        {
            id: "group-chapas-aco",
            name: "Chapas de Aço",
            items: [chapaFinaFrio, chapaFinaQuente, chapaGrossa, chapaXadrez, chapaZincada, chapaExpandida, chapaPerfuradaRedondo]
        },
        {
            id: "group-grades-piso",
            name: "Grades de Piso",
            items: [gradeMalha25Av, gradeMalha30Av]
        },
        {
            id: "group-construcao-civil",
            name: "Aço para Construção",
            items: [vergalhoes, telaSoldadaNervurada, trelica, aramesBarras, barraTransferencia]
        },
        {
            id: "group-eletrodutos",
            name: "Eletrodutos e Instalações",
            items: [eletroliticoPreZincado, eletroliticoGalvanizadoFogo, atmosferaExplosivaRir, eletrodutosInox]
        }
    ]
};