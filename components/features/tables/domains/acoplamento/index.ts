import { TableItem } from '../../shared/types';
import { tubosHelicoidais } from './tubos-helicoidais';
import { modeloK10 } from './modelo-k10';
import { relacaoTubosAcoplamento } from './relacao-tubos';

export {
    tubosHelicoidais,
    modeloK10,
    relacaoTubosAcoplamento
};

// Added missing id property
export const acoplamentoDomain: TableItem = {
    id: "acoplamento-domain",
    name: "Acoplamento K",
    items: [
        tubosHelicoidais,
        modeloK10,
        relacaoTubosAcoplamento
    ]
}