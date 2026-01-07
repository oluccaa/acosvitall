
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
// Fixed: Added 'Info' to the imported icons from lucide-react
import { FileText, Download, Printer, Info } from 'lucide-react';

interface TableViewProps {
    tableId: string;
    searchTerm: string;
}

const TableView: React.FC<TableViewProps> = ({ tableId, searchTerm }) => {
    const { t } = useTranslation();

    // MOCK DATA: Em uma aplicação real, estes dados viriam de um JSON ou do t('tables.data')
    const getTableData = (id: string) => {
        if (id === 'carbon-tubes') {
            return {
                title: "Tubos de Aço Carbono - SCH 40",
                norm: "NBR 5590 / ASTM A53",
                headers: ["DN (Pol)", "DN (mm)", "OD (mm)", "Espessura (mm)", "Peso (kg/m)"],
                rows: [
                    ["1/2\"", "15", "21.3", "2.77", "1.27"],
                    ["3/4\"", "20", "26.7", "2.87", "1.69"],
                    ["1\"", "25", "33.4", "3.38", "2.50"],
                    ["1.1/4\"", "32", "42.2", "3.56", "3.39"],
                    ["1.1/2\"", "40", "48.3", "3.68", "4.05"],
                    ["2\"", "50", "60.3", "3.91", "5.44"],
                    ["2.1/2\"", "65", "73.0", "5.16", "8.63"],
                    ["3\"", "80", "88.9", "5.49", "11.29"],
                ]
            };
        }
        if (id === 'flange-150') {
            return {
                title: "Flanges Classe 150# - Dimensões",
                norm: "ASME B16.5",
                headers: ["DN (Pol)", "O (mm)", "T (mm)", "R (mm)", "Furo (mm)", "Qtd Furos"],
                rows: [
                    ["1/2\"", "88.9", "11.2", "35.1", "15.7", "4"],
                    ["3/4\"", "98.6", "12.7", "42.9", "15.7", "4"],
                    ["1\"", "108.0", "14.2", "50.8", "15.7", "4"],
                    ["2\"", "152.4", "19.1", "92.1", "19.1", "4"],
                    ["4\"", "228.6", "23.9", "157.2", "19.1", "8"],
                ]
            };
        }
        // Fallback genérico para outros IDs não implementados no mock
        return {
            title: `Tabela de Especificações - ${id}`,
            norm: "Padrão de Fábrica",
            headers: ["Especificação", "Medida A", "Medida B", "Peso"],
            rows: [
                ["Item Exemplo 1", "100", "200", "5.5"],
                ["Item Exemplo 2", "150", "250", "7.2"],
                ["Item Exemplo 3", "200", "300", "9.8"],
            ]
        };
    };

    const data = useMemo(() => getTableData(tableId), [tableId]);

    const filteredRows = useMemo(() => {
        if (!searchTerm) return data.rows;
        const lowerSearch = searchTerm.toLowerCase();
        return data.rows.filter(row => 
            row.some(cell => cell.toLowerCase().includes(lowerSearch))
        );
    }, [data, searchTerm]);

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Table Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
                <div>
                    <div className="inline-block px-3 py-1 bg-brand-orange/10 text-brand-orange text-[10px] font-bold uppercase tracking-widest rounded mb-3">
                        {data.norm}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-brand-blue-dark">{data.title}</h1>
                </div>
                
                <div className="flex gap-2">
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-xs font-bold text-gray-600 hover:bg-gray-50 transition-colors">
                        <Printer size={16} /> Imprimir
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-brand-blue-dark text-white rounded-lg text-xs font-bold hover:bg-brand-blue-light transition-colors">
                        <Download size={16} /> PDF
                    </button>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden">
                <div className="overflow-x-auto custom-scrollbar">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-brand-blue-dark text-white">
                                {data.headers.map((header, idx) => (
                                    <th key={idx} className="px-6 py-5 text-[11px] font-bold uppercase tracking-wider border-r border-white/5 last:border-0">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRows.length > 0 ? (
                                filteredRows.map((row, rowIdx) => (
                                    <tr key={rowIdx} className="hover:bg-brand-orange/5 transition-colors group">
                                        {row.map((cell, cellIdx) => (
                                            <td key={cellIdx} className="px-6 py-4 text-sm font-mono text-gray-600 group-hover:text-brand-blue-dark border-r border-gray-50 last:border-0">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={data.headers.length} className="px-6 py-12 text-center text-gray-400 italic">
                                        Nenhum registro encontrado para "{searchTerm}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                
                {/* Table Footer / Info */}
                <div className="p-4 bg-gray-50 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                    <span>Exibindo {filteredRows.length} de {data.rows.length} registros</span>
                    <div className="flex items-center gap-1">
                        <FileText size={12} className="text-brand-orange" />
                        Catálogo Aços Vital Edição 2025
                    </div>
                </div>
            </div>
            
            {/* Disclaimer */}
            <div className="mt-8 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-4">
                 <Info size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                 <p className="text-xs text-blue-700 leading-relaxed">
                    <strong>Nota Técnica:</strong> As dimensões e pesos informados nesta tabela são teóricos e baseados na normas técnicas mencionadas. Pequenas variações podem ocorrer de acordo com as tolerâncias permitidas por cada norma e pelo processo de fabricação de cada usina fornecedora.
                 </p>
            </div>
        </div>
    );
};

export default TableView;
