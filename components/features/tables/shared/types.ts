export interface HeaderGroupCell {
    text: string;
    colSpan: number;
    rowSpan?: number;
    className?: string;
}

export interface TableItem {
    id: string;
    name: string;
    description?: string;
    norm?: string;
    imageUrls?: string[];
    headerGroups?: HeaderGroupCell[][];
    headers?: string[];
    rows?: string[][];
    items?: TableItem[]; // Para subcategorias ou grupos de tabelas
    _path?: string;      // Gerado internamente para navegação
    _isMatch?: boolean;  // Usado pela engine de busca
    _isContentMatch?: boolean; // Flag para destacar que o termo foi achado no conteúdo
}