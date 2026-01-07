import { TFunction } from 'i18next';
import { TableItem } from '../components/features/tables/shared/types';

import { valvulasTubosDomain } from '../components/features/tables/domains/valvulas-tubos';
import { flangesDomain } from '../components/features/tables/domains/flanges';
import { conexoesForjadasDomain } from '../components/features/tables/domains/conexoes-forjadas';
import { conexoesTubularesDomain } from '../components/features/tables/domains/conexoes-tubulares';
import { barrasDomain } from '../components/features/tables/domains/barras';
import { chapasGradesDomain } from '../components/features/tables/domains/chapas-grades';
import { acoplamentoDomain } from '../components/features/tables/domains/acoplamento';

/**
 * Retorna a árvore hierárquica completa de dados técnicos.
 * Centraliza todos os domínios de produtos da Aços Vital.
 */
export const getTablesData = (t: TFunction): TableItem[] => {
    return [
        valvulasTubosDomain,
        flangesDomain,
        conexoesTubularesDomain,
        conexoesForjadasDomain,
        barrasDomain,
        chapasGradesDomain,
        acoplamentoDomain
    ];
};