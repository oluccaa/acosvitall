import { useMemo, useState, useCallback } from 'react';
import { TableItem } from '../components/features/tables/shared/types';

export const useTableRegistry = (initialData: TableItem[]) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);

    // Processa os dados para adicionar metadados de busca e caminhos
    const registry = useMemo(() => {
        const lowerTerm = searchTerm.toLowerCase().trim();

        const process = (items: TableItem[], path = ''): TableItem[] => {
            return items.map(item => {
                const currentPath = path ? `${path} / ${item.name}` : item.name;
                const nameMatch = item.name.toLowerCase().includes(lowerTerm);
                const contentMatch = item.rows?.some(row => 
                    row.some(cell => cell?.toLowerCase().includes(lowerTerm))
                ) || false;

                const hasMatch = nameMatch || contentMatch;
                
                let processedChildren: TableItem[] = [];
                if (item.items) {
                    processedChildren = process(item.items, currentPath);
                }

                const childHasMatch = processedChildren.some(c => c._isMatch);

                return {
                    ...item,
                    _path: currentPath,
                    _isMatch: hasMatch || childHasMatch,
                    items: processedChildren.length > 0 ? processedChildren : undefined
                };
            }).filter(item => !searchTerm || item._isMatch);
        };

        return process(initialData);
    }, [initialData, searchTerm]);

    // Encontra uma tabela pelo ID na árvore
    const findTable = useCallback((items: TableItem[], id: string): TableItem | null => {
        for (const item of items) {
            if (item.id === id) return item;
            if (item.items) {
                const found = findTable(item.items, id);
                if (found) return found;
            }
        }
        return null;
    }, []);

    const selectedTable = useMemo(() => 
        selectedTableId ? findTable(registry, selectedTableId) : null
    , [selectedTableId, registry, findTable]);

    return {
        registry,
        searchTerm,
        setSearchTerm,
        selectedTable,
        setSelectedTableId,
        selectedTableId
    };
};