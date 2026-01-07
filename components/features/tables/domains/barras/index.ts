import { TableItem } from '../../shared/types';
import { barraChata } from './barra-chata';
import { barraRedondaLaminada } from './barra-redonda-laminada';
import { barraRedondaTrefilada } from './barra-redonda-trefilada';
import { barraQuadradaLaminada } from './barra-quadrada-laminada';
import { barraQuadradaTrefilada } from './barra-quadrada-trefilada';
import { barraSextavadaTrefilada } from './barra-sextavada-trefilada';
import { cantoneiraAbasIguais } from './cantoneira-abas-iguais';
import { perfilIAbasInclinadas } from './perfil-i-abas-inclinadas';
import { perfilUAbasInclinadas } from './perfil-u-abas-inclinadas';
import { perfilUEstruturalSimples } from './perfil-u-estrutural-simples';
import { perfilUEstruturalEnrijecido } from './perfil-u-estrutural-enrijecido';
import { perfilLaminadoTee } from './perfil-laminado-tee';
import { perfilWHHP } from './perfil-w-h-hp';
import { perfilWI } from './perfil-w-i';
import { ferroFundido } from './ferro-fundido';
import { conversaoPolMm } from './conversao-pol-mm';

export const barrasDomain: TableItem = {
    id: "barras-domain",
    name: "Barras e Perfis",
    items: [
        {
            id: "group-barras-laminadas",
            name: "Barras Laminadas",
            items: [barraChata, barraRedondaLaminada, barraQuadradaLaminada, perfilLaminadoTee]
        },
        {
            id: "group-barras-trefiladas",
            name: "Barras Trefiladas",
            items: [barraRedondaTrefilada, barraQuadradaTrefilada, barraSextavadaTrefilada]
        },
        {
            id: "group-perfis-estruturais",
            name: "Perfis Estruturais",
            items: [
                cantoneiraAbasIguais, 
                perfilIAbasInclinadas, 
                perfilUAbasInclinadas, 
                perfilUEstruturalSimples, 
                perfilUEstruturalEnrijecido,
                perfilWHHP,
                perfilWI
            ]
        },
        ferroFundido,
        conversaoPolMm
    ]
};