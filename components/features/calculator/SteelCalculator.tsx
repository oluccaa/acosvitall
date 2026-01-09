
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
    Calculator, Circle, Square, Box, Layers, Disc, Grid, LayoutGrid, 
    Cylinder, CornerDownRight, ShoppingCart, BoxSelect, RefreshCcw, Plus, Trash2, Info, ChevronDown,
    Filter, Split, Package, Printer, Share2, Zap, Ruler, Scale, Paintbrush, ArrowRight, MousePointerClick,
    Wrench, Settings2, Loader2, Sparkles
} from 'lucide-react';
import WhatsappIcon from '../../common/icons/WhatsappIcon';
import MeasurementInput, { ForcedUnit } from '../../common/MeasurementInput';
import Tooltip from '../../common/Tooltip';
import { useSteelCalculator, ProductType, DENSITIES } from '../../../hooks/useSteelCalculator';
import { useEngineering, ProjectItem, CalculatorState } from '../../../context/EngineeringContext';

const generateId = () => Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
const safeParseUI = (val: string | number): number => {
    if (typeof val === 'number') return val;
    if (!val) return 0;
    return parseFloat(val.toString().replace(',', '.')) || 0;
};

const COMMON_PRESETS = [
    { label: '1/8"', val: '3,17' },
    { label: '3/16"', val: '4,76' },
    { label: '1/4"', val: '6,35' },
    { label: '3/8"', val: '9,52' },
    { label: '1/2"', val: '12,7' },
    { label: '5/8"', val: '15,88' },
    { label: '3/4"', val: '19,05' },
    { label: '1"', val: '25,4' }
];

const EXPANDED_PATTERNS = [
    { id: "xp-13", label: "XP-13", swd: 13, strand: 1.5, thickness: 1.5 },
    { id: "gme-13", label: "GME-13", swd: 13, strand: 2.0, thickness: 2.0 },
    { id: "gme-20", label: "GME-20", swd: 25, strand: 3.0, thickness: 2.65 },
    { id: "gme-38", label: "GME-38", swd: 38, strand: 3.5, thickness: 3.0 },
    { id: "gr-500", label: "GR-500", swd: 50, strand: 5.0, thickness: 4.75 },
    { id: "custom", label: "Outro", swd: 0, strand: 0, thickness: 0 }
];

type TubeField = 'outerDiameter' | 'innerDiameter' | 'thickness';

const MESH_OPTIONS = [
    { id: "25-100", pitch: "25", label: "25x100mm" },
    { id: "30-100", pitch: "30", label: "30x100mm" },
    { id: "30-50",  pitch: "30", label: "30x50mm" },
    { id: "34-38",  pitch: "34", label: "34x38mm" },
    { id: "custom", pitch: "",   label: "Outra" }
];

const SteelCalculator: React.FC = () => {
    const { t } = useTranslation();
    const { 
        projectItems, 
        addToProject: addProjectItem, 
        removeFromProject, 
        clearProject,
        calculatorState,
        updateCalculatorField
    } = useEngineering();

    const CATEGORIES = {
        raw: { id: 'raw', label: t('calculatorPage.categories.raw'), items: [
            { id: 'plate', icon: <Layers size={14} />, label: t('calculatorPage.products.plate') },
            { id: 'bar_round', icon: <Disc size={14} />, label: t('calculatorPage.products.bar_round') },
            { id: 'bar_square', icon: <Box size={14} />, label: t('calculatorPage.products.bar_square') },
        ]},
        piping: { id: 'piping', label: t('calculatorPage.categories.piping'), items: [
            { id: 'tube_round', icon: <Circle size={14} />, label: t('calculatorPage.products.tube_round') },
            { id: 'fitting_elbow', icon: <CornerDownRight size={14} />, label: t('calculatorPage.products.fitting_elbow') },
            { id: 'fitting_reducer', icon: <Filter size={14} />, label: t('calculatorPage.products.fitting_reducer') },
            { id: 'fitting_tee', icon: <Split size={14} />, label: t('calculatorPage.products.fitting_tee') },
            { id: 'flange_square', icon: <Square size={14} className="fill-current" />, label: t('calculatorPage.products.flange_square') },
            { id: 'tube_calendered', icon: <Cylinder size={14} />, label: t('calculatorPage.products.tube_calendered') },
        ]},
        structural: { id: 'structural', label: t('calculatorPage.categories.structural'), items: [
            { id: 'grating', icon: <Grid size={14} />, label: t('calculatorPage.products.grating') },
            { id: 'expanded_metal', icon: <LayoutGrid size={14} />, label: t('calculatorPage.products.expanded_metal') },
        ]}
    };

    const selectedType = (calculatorState.selectedType as ProductType) || 'plate';
    const setSelectedType = (type: ProductType) => {
        updateCalculatorField('selectedType', type);
        setActiveField('thickness'); 
    };

    const [meshId, setMeshId] = useState<string>('30-100');
    const [expandedPatternId, setExpandedPatternId] = useState<string>('gme-13');
    const [isCustomExpanded, setIsCustomExpanded] = useState<boolean>(false);
    const [editHistory, setEditHistory] = useState<TubeField[]>([]);
    const [copied, setCopied] = useState(false);
    const [isResetting, setIsResetting] = useState(false);
    
    const [activeField, setActiveField] = useState<keyof CalculatorState>('thickness');
    const [thicknessUnitForce, setThicknessUnitForce] = useState<ForcedUnit | undefined>(undefined);

    const { 
        values, totalWeight, unitWeight, engData, 
        handleInputChange, calculate, reset, setValues
    } = useSteelCalculator();

    useEffect(() => {
        calculate(selectedType);
    }, [calculatorState, calculate, selectedType]);

    const totalArea = (engData.surfaceArea || 0) * safeParseUI(values.quantity);

    const handleTubeInput = (field: TubeField, value: string) => {
        const currentValues = { ...calculatorState, [field]: value };
        let newHistory = editHistory.filter(f => f !== field);
        if (value && value.trim() !== '') {
            newHistory.push(field);
        }
        if (newHistory.length > 2) {
            newHistory.shift(); 
        }
        
        const allFields: TubeField[] = ['outerDiameter', 'innerDiameter', 'thickness'];
        
        if (newHistory.length === 2) {
            const input1 = newHistory[0];
            const input2 = newHistory[1];
            const target = allFields.find(f => f !== input1 && f !== input2);
            
            if (target) {
                 const v1 = parseFloat(currentValues[input1]?.replace(',', '.') || '0');
                 const v2 = parseFloat(currentValues[input2]?.replace(',', '.') || '0');
                 
                 if (v1 > 0 && v2 > 0) {
                     let res = 0;
                     let isValid = true;
                     const getVal = (name: TubeField) => (input1 === name ? v1 : v2);

                     if (target === 'thickness') {
                          const od = getVal('outerDiameter');
                          const id = getVal('innerDiameter');
                          if (od > id) res = (od - id) / 2;
                          else isValid = false;
                     } else if (target === 'outerDiameter') {
                          const id = getVal('innerDiameter');
                          const th = getVal('thickness');
                          res = id + (2 * th);
                     } else if (target === 'innerDiameter') {
                          const od = getVal('outerDiameter');
                          const th = getVal('thickness');
                          if (od > (2*th)) res = od - (2 * th);
                          else isValid = false;
                     }
                     
                     if (isValid && res > 0) {
                         currentValues[target] = res.toFixed(2).replace('.', ',');
                     } else {
                         currentValues[target] = '';
                     }
                 } else {
                     currentValues[target] = '';
                 }
            }
        }
        setEditHistory(newHistory);
        setValues(currentValues);
    };
    
    const getCalculatedField = (): TubeField | null => {
        if (editHistory.length < 2) return null;
        const allFields: TubeField[] = ['outerDiameter', 'innerDiameter', 'thickness'];
        const target = allFields.find(f => !editHistory.includes(f));
        if (target && values[target]) return target;
        return null;
    };

    const calculatedField = getCalculatedField();

    const renderTubeInput = (field: TubeField, label: string) => {
        const isAuto = calculatedField === field;
        
        return (
            <MeasurementInput 
                value={values[field] || ''} 
                onChange={(newValue) => handleTubeInput(field, newValue)}
                label={label}
                isAuto={isAuto}
                forceUnit={activeField === field ? thicknessUnitForce : undefined}
                onFocus={() => setActiveField(field)}
                isActiveField={activeField === field}
            />
        );
    };

    const handleMeshSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setMeshId(id);
        const option = MESH_OPTIONS.find(opt => opt.id === id);
        if (option) {
            if (id !== 'custom') {
                handleInputChange('pitch', option.pitch);
            }
        }
    };

    const handleExpandedPatternSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const id = e.target.value;
        setExpandedPatternId(id);
        if (id === 'custom') {
            setIsCustomExpanded(true);
        } else {
            setIsCustomExpanded(false);
            const pattern = EXPANDED_PATTERNS.find(p => p.id === id);
            if (pattern) {
                setValues(prev => ({
                    ...prev,
                    meshSWD: String(pattern.swd),
                    strandWidth: String(pattern.strand),
                    thickness: String(pattern.thickness)
                }));
            }
        }
    };

    const isTubeType = ['tube_round', 'tube_calendered', 'flange_square', 'fitting_elbow'].includes(selectedType);
    const typesWithoutThickness = ['bar_round', 'bar_square']; 

    const handlePresetClick = (val: string) => {
        if (activeField) {
            if (['outerDiameter', 'innerDiameter', 'thickness'].includes(activeField) && isTubeType) {
                handleTubeInput(activeField as TubeField, val);
            } else {
                handleInputChange(activeField, val);
            }
            setThicknessUnitForce({ unit: 'mm', timestamp: Date.now() });
        }
    };

    const handleReset = () => {
        setIsResetting(true);
        reset();
        setTimeout(() => setIsResetting(false), 600);
    };

    const generateTechnicalSpec = () => {
        const matKey = values.material === 'carbon' ? "carbon" : 
                   values.material === 'inox304' ? "inox304" : 
                   values.material === 'inox316' ? "inox316" : "aluminum";
        const mat = t(`calculatorPage.materials.${matKey}`);
                   
        const fmt = (v: string, suffix: string = "mm") => v ? `${v}${suffix}` : "?";
        const prodName = t(`calculatorPage.products.${selectedType}` as any);
        
        switch(selectedType) {
            case 'plate': return `${prodName} ${mat} - ${fmt(values.thickness)} x ${fmt(values.width)} x ${fmt(values.length)}`;
            case 'bar_round': return `${prodName} ${mat} - Ø ${fmt(values.outerDiameter)} x ${fmt(values.length)}`;
            case 'bar_square': return `${prodName} ${mat} - ${fmt(values.width)} x ${fmt(values.length)}`;
            case 'tube_round': return `${prodName} ${mat} - Ø ${fmt(values.outerDiameter)} x ${t('calculatorPage.inputs.wallThickness')} ${fmt(values.thickness)} x ${fmt(values.length)}`;
            case 'tube_calendered': return `${prodName} ${mat} - Ø ${fmt(values.outerDiameter)} x ${fmt(values.thickness)} x ${fmt(values.length)}`;
            case 'flange_square': return `${prodName} ${mat} - Ø Ext ${fmt(values.outerDiameter)} x Ø Int ${fmt(values.innerDiameter)} x ${fmt(values.thickness)}`;
            case 'fitting_elbow': return `${prodName} ${mat} - Ø ${fmt(values.outerDiameter)} x ${fmt(values.thickness)} - R ${fmt(values.radius)} (${values.angle}°)`;
            case 'fitting_reducer': return `${prodName} ${mat} - Ø Maior ${fmt(values.outerDiameter)} x Ø Menor ${fmt(values.innerDiameter)} x ${fmt(values.thickness)} x H ${fmt(values.length)}`;
            case 'fitting_tee': return `${prodName} ${mat} - Ø ${fmt(values.outerDiameter)} x ${fmt(values.thickness)} - Corpo ${fmt(values.length)} / Deriv. ${fmt(values.height)}`;
            case 'grating': return `${prodName} ${mat} - ${values.length}x${values.width} - Barra ${values.height}x${values.thickness}`;
            case 'expanded_metal': return `${prodName} ${mat} - ${values.width}x${values.length}`;
            default: return `Item ${mat}`;
        }
    };

    const addItem = () => {
        if (totalWeight <= 0) return;
        const qty = safeParseUI(values.quantity) > 0 ? safeParseUI(values.quantity) : 1;
        const mainItem: ProjectItem = {
            id: generateId(),
            type: selectedType,
            material: values.material,
            specs: generateTechnicalSpec(),
            quantity: qty,
            unitWeight: unitWeight,
            totalWeight: totalWeight,
            timestamp: Date.now(),
            meta: engData.meta
        };
        addProjectItem(mainItem);
    };

    const handleWhatsAppQuote = () => {
        if (projectItems.length === 0) return;
        let message = "*Cotação Aços Vital*\n\n";
        projectItems.forEach((item, index) => {
            message += `*${index + 1}.* ${item.specs}\nQtd: ${item.quantity} | Peso: ${item.totalWeight.toFixed(2)}kg\n\n`;
        });
        message += `*Total: ${projectItems.reduce((acc, i) => acc + i.totalWeight, 0).toFixed(2)} kg*`;
        window.open(`https://wa.me/551147972352?text=${encodeURIComponent(message)}`, '_blank');
    };

    const copyResult = () => {
        navigator.clipboard.writeText(`${totalWeight.toFixed(2)} kg`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const renderInput = (field: keyof CalculatorState, label: string, helpText?: string) => (
        <div className="h-full flex flex-col justify-center">
            <MeasurementInput 
                value={values[field] || ''} 
                onChange={(v) => handleInputChange(field, v)} 
                label={label}
                helpText={helpText}
                onFocus={() => setActiveField(field)}
                isActiveField={activeField === field}
                forceUnit={activeField === field ? thicknessUnitForce : undefined}
            />
        </div>
    );

    return (
        <div className={`flex flex-col gap-6 font-sans transition-all duration-500 ${isResetting ? 'scale-[0.99] blur-[1px] opacity-70' : ''}`}>
            
            {/* WORKSTATION CONSOLE - UNIFIED VERSION */}
            <div className={`bg-[#0f172a] border border-white/5 rounded-2xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${isResetting ? 'ring-4 ring-brand-blue-light/20 shadow-[0_0_40px_rgba(56,127,217,0.2)]' : ''}`}>
                
                {/* 1. SELECTION HEADER (Horizontal Integration) */}
                <div className="p-4 border-b border-white/5 bg-[#131d33] flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                         <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                            <BoxSelect size={18} />
                         </div>
                         <div>
                            <h3 className="text-white text-xs font-black uppercase tracking-widest">{t('calculatorPage.common.selection')}</h3>
                            <p className="text-[9px] text-gray-500 uppercase font-bold tracking-tighter">{t('calculatorPage.common.selectionDesc')}</p>
                         </div>
                    </div>

                    <div className="flex items-center gap-3 bg-black/20 p-1.5 rounded-xl border border-white/5">
                        <span className="text-[10px] text-gray-400 font-bold uppercase px-2">{t('calculatorPage.common.clear')}</span>
                        <button onClick={handleReset} className="p-2 bg-white/5 hover:bg-red-500/20 text-gray-400 hover:text-red-400 rounded-lg transition-all active:scale-90 group" title={t('calculatorPage.common.clear')}>
                            <RefreshCcw size={16} className={`group-active:rotate-180 transition-transform duration-500 ${isResetting ? 'animate-spin' : ''}`} />
                        </button>
                    </div>
                </div>

                {/* 2. PRODUCT PICKER GRID (Horizontal Layout) */}
                <div className="p-6 bg-[#0f172a] border-b border-white/5">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {(Object.values(CATEGORIES) as any[]).map((cat) => (
                            <div key={cat.id} className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-orange shadow-[0_0_8px_rgba(255,117,26,0.5)]"></div>
                                    <h4 className="text-[10px] text-gray-400 font-black uppercase tracking-widest">{cat.label}</h4>
                                </div>
                                <div className="grid grid-cols-1 gap-2">
                                    {cat.items.map((prod: any) => (
                                        <button
                                            key={prod.id}
                                            onClick={() => setSelectedType(prod.id as ProductType)}
                                            className={`
                                                relative flex items-center gap-3 px-4 py-2.5 rounded-xl border transition-all duration-300 group
                                                ${selectedType === prod.id 
                                                    ? 'bg-brand-orange text-white border-brand-orange shadow-[0_8px_20px_rgba(234,97,0,0.25)] scale-[1.02]' 
                                                    : 'bg-[#1e293b]/30 border-white/5 text-gray-400 hover:bg-[#1e293b] hover:border-white/20 hover:text-white'
                                                }
                                            `}
                                        >
                                            <div className={`${selectedType === prod.id ? 'text-white' : 'text-gray-500 group-hover:text-brand-orange'} transition-colors`}>
                                                {React.cloneElement(prod.icon, { size: 18 })}
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-tight text-left truncate flex-1">
                                                {prod.label}
                                            </span>
                                            {selectedType === prod.id && <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></div>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* 3. CONSOLE PARAMS (Integrated Inputs) */}
                <div className="bg-[#0f172a] relative">
                    <div className="px-6 py-4 flex items-center justify-between border-b border-white/5 bg-black/5">
                        <div className="flex items-center gap-2">
                            <Settings2 size={14} className="text-brand-blue-light" />
                            <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{t('calculatorPage.common.techParams')}</span>
                        </div>
                        <div className="relative min-w-[200px] z-20">
                                <select 
                                value={values.material} 
                                onChange={(e) => handleInputChange('material', e.target.value)} 
                                className="w-full bg-[#1e293b] border border-white/10 rounded-lg text-[10px] uppercase font-black text-white py-2 pl-3 pr-8 outline-none appearance-none cursor-pointer hover:border-brand-orange transition-all shadow-lg"
                                >
                                <option value="carbon">{t('calculatorPage.materials.carbon')}</option>
                                <option value="inox304">{t('calculatorPage.materials.inox304')}</option>
                                <option value="inox316">{t('calculatorPage.materials.inox316')}</option>
                                <option value="aluminum">{t('calculatorPage.materials.aluminum')}</option>
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" size={12} />
                        </div>
                    </div>

                    <div className="p-6 sm:p-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 sm:gap-y-8 items-center">
                            {/* Inputs Standalone */}
                            {(selectedType === 'plate' || selectedType === 'bar_square' || selectedType === 'flange_square') && (
                                renderInput('width', (selectedType === 'flange_square' || <span className=""></span> && selectedType === 'bar_square') ? t('calculatorPage.inputs.side') : t('calculatorPage.inputs.width'))
                            )}

                            {selectedType === 'grating' && (
                            <>
                                <div className="col-span-1 sm:col-span-2 grid grid-cols-2 gap-4 bg-[#1e293b]/30 p-4 rounded-xl border border-white/5">
                                        {renderInput('length', t('calculatorPage.inputs.length') + " (" + t('calculatorPage.inputs.gap') + ")")}
                                        {renderInput('width', t('calculatorPage.inputs.width'))}
                                </div>
                                {renderInput('height', t('calculatorPage.inputs.barHeight'))}
                                {renderInput('thickness', t('calculatorPage.inputs.barThickness'))}
                                
                                <div className="col-span-1 sm:col-span-2 h-full flex flex-col justify-center">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <label className="text-[10px] text-gray-400 uppercase font-bold">{t('calculatorPage.inputs.mesh')}</label>
                                    </div>
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <select value={meshId} onChange={handleMeshSelect} className="w-full bg-[#1e293b] border border-white/10 rounded-lg py-2 pl-3 text-white text-[10px] outline-none appearance-none h-8">
                                                {MESH_OPTIONS.map(opt => (<option key={opt.id} value={opt.id}>{opt.label}</option>))}
                                            </select>
                                            <ChevronDown size={10} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"/>
                                        </div>
                                        {meshId === 'custom' && (renderInput('pitch', "", "mm"))}
                                    </div>
                                </div>
                            </>
                        )}

                        {selectedType === 'expanded_metal' && (
                            <>
                                <div className="col-span-1 sm:col-span-2 h-full flex flex-col justify-center">
                                    <label className="text-[10px] text-gray-400 uppercase font-bold mb-1 block">{t('calculatorPage.inputs.mesh')}</label>
                                    <div className="relative">
                                        <select value={expandedPatternId} onChange={handleExpandedPatternSelect} className="w-full bg-[#1e293b] border border-white/10 rounded-lg py-2 pl-3 text-white text-[10px] outline-none appearance-none mb-2 h-8">
                                            {EXPANDED_PATTERNS.map(opt => (<option key={opt.id} value={opt.id}>{opt.label}</option>))}
                                        </select>
                                        <ChevronDown size={10} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none -mt-1"/>
                                    </div>
                                </div>
                                {isCustomExpanded && (
                                    <>
                                        {renderInput('thickness', t('calculatorPage.inputs.thickness'))}
                                        {renderInput('strandWidth', t('calculatorPage.inputs.strandWidth'))}
                                        {renderInput('meshSWD', t('calculatorPage.inputs.meshSWD'))}
                                    </>
                                )}
                                {renderInput('width', t('calculatorPage.inputs.width'))}
                                {renderInput('length', t('calculatorPage.inputs.length'))}
                            </>
                        )}

                        {(selectedType !== 'flange_square' && selectedType !== 'fitting_elbow' && selectedType !== 'grating' && selectedType !== 'expanded_metal' && selectedType !== 'fitting_reducer' && selectedType !== 'fitting_tee') && (
                            renderInput('length', t('calculatorPage.inputs.length'))
                        )}

                        {/* GRUPO AUTO SYSTEM */}
                        {isTubeType && (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-3 relative group mt-4 sm:mt-0">
                                <div className="absolute -top-7 right-0 z-10">
                                    <div className="bg-brand-orange text-white text-[8px] px-3 py-1 rounded-t-lg font-black uppercase tracking-[0.2em] flex items-center gap-1.5 shadow-lg border-x border-t border-brand-orange/30">
                                        <Zap size={10} className="animate-pulse" /> {t('calculatorPage.common.autoSystem')}
                                    </div>
                                </div>
                                
                                <div className="grid grid-cols-3 gap-4 bg-white/5 p-4 rounded-xl rounded-tr-none border border-white/10 relative shadow-inner">
                                    {renderTubeInput('outerDiameter', t('calculatorPage.inputs.outerDiameter'))}
                                    {renderTubeInput('innerDiameter', t('calculatorPage.inputs.innerDiameter'))}
                                    {renderTubeInput('thickness', t('calculatorPage.inputs.wallThickness'))}
                                </div>
                            </div>
                        )}

                        {selectedType === 'bar_round' && (renderInput('outerDiameter', t('calculatorPage.inputs.diameter')))}
                        
                        {selectedType === 'fitting_elbow' && (
                            <>
                                {renderInput('radius', t('calculatorPage.inputs.radius'))}
                                <div className="h-full flex flex-col justify-center">
                                    <div className="flex items-center gap-1 mb-0.5">
                                        <label className="text-[10px] text-gray-400 uppercase font-bold">{t('calculatorPage.inputs.angle')}</label>
                                    </div>
                                    <input type="text" value={values.angle} onChange={(e) => handleInputChange('angle', e.target.value)} className="w-full bg-[#1e293b] border border-white/10 rounded-lg py-2 px-3 text-white text-xs outline-none focus:border-brand-orange transition-colors h-8" />
                                </div>
                            </>
                        )}

                        {selectedType === 'fitting_reducer' && (
                            <>
                                {renderInput('outerDiameter', "Ø Maior (Ext)")}
                                {renderInput('innerDiameter', "Ø Menor (Ext)")}
                                {renderInput('length', t('calculatorPage.inputs.height'))}
                                {renderInput('thickness', t('calculatorPage.inputs.thickness'))}
                            </>
                        )}

                        {selectedType === 'fitting_tee' && (
                            <>
                                {renderInput('outerDiameter', "Ø Corpo (Ext)")}
                                {renderInput('thickness', t('calculatorPage.inputs.thickness'))}
                                {renderInput('length', "Comp. Corpo")}
                                {renderInput('height', "Comp. Derivação")}
                            </>
                        )}

                        {(selectedType === 'plate') && (
                            renderInput('thickness', t('calculatorPage.inputs.thickness'))
                        )}

                        {(!typesWithoutThickness.includes(selectedType) && !isCustomExpanded) && (
                            <div className="col-span-1 sm:col-span-2 lg:col-span-4 flex flex-col gap-2 mt-2 pt-4 border-t border-white/5">
                                <div className="flex items-center gap-2 text-[10px] text-brand-orange font-black uppercase tracking-widest">
                                    <MousePointerClick size={12} /> {t('calculatorPage.common.presets')}
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {COMMON_PRESETS.map((t_preset) => (
                                        <button 
                                            key={t_preset.label} 
                                            onClick={() => handlePresetClick(t_preset.val)}
                                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold text-gray-400 hover:text-white hover:bg-white/10 hover:border-brand-orange transition-all active:bg-brand-orange/20"
                                            title={t('calculatorPage.common.presetsHelp')}
                                        >
                                            {t_preset.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {(selectedType !== 'plate' && !isTubeType && !typesWithoutThickness.includes(selectedType) && !['fitting_reducer', 'fitting_tee', 'grating', 'expanded_metal'].includes(selectedType)) && (
                            renderInput('thickness', t('calculatorPage.inputs.thickness'))
                        )}
                        </div>
                    </div>

                    {/* 4. TELEMETRY SLIM ROW */}
                    <div className="px-6 py-4 bg-black/10 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between hover:bg-white/10 transition-colors group">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                                    <Paintbrush size={16} />
                                </div>
                                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{t('calculatorPage.common.surfaceArea')}</span>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-mono font-black text-white">
                                    {(engData.surfaceArea || 0).toFixed(2)}
                                </span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase">m²</span>
                            </div>
                        </div>

                        <div className="bg-white/5 border border-white/10 rounded-xl p-3 flex items-center justify-between hover:bg-white/10 transition-colors group">
                                <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-blue-light/10 rounded-lg text-brand-blue-light">
                                    <Ruler size={16} />
                                </div>
                                <span className="text-[10px] text-gray-400 uppercase font-black tracking-widest">{t('calculatorPage.common.density')}</span>
                                </div>
                            <div className="flex items-baseline gap-1">
                                <span className="text-xl font-mono font-black text-gray-300">
                                    {DENSITIES[values.material]}
                                </span>
                                <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">{t('calculatorPage.common.densityUnit')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5. RESULTS ACTION BAR */}
                <div className="bg-gradient-to-r from-[#050c21] via-[#0b162e] to-[#050c21] border-t border-brand-orange/40 p-6 lg:px-10 lg:py-8 relative z-10 flex flex-col gap-6 shadow-[0_-15px_40px_rgba(0,0,0,0.5)]">
                    <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-orange/60 to-transparent"></div>

                    {/* Row 1: Primary Metrics */}
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
                        {/* Primary Results - Total Weight */}
                        <div className="flex flex-col items-center lg:items-start flex-shrink-0">
                            <span className="text-[10px] font-black uppercase text-brand-orange tracking-[0.2em] mb-1 flex items-center gap-2">
                                <Info size={14} /> {t('calculatorPage.common.totalWeight')}
                            </span>
                            
                            {totalWeight > 0 ? (
                                <div 
                                    className="flex items-baseline gap-2 cursor-pointer group/copy animate-in zoom-in-95 duration-300" 
                                    onClick={copyResult} 
                                    title="Click to copy"
                                >
                                    <span className="text-5xl lg:text-7xl font-mono font-black text-white tracking-tighter leading-none group-hover/copy:text-brand-orange transition-all drop-shadow-[0_0_15px_rgba(255,255,255,0.15)]">
                                        {totalWeight.toFixed(2)}
                                    </span>
                                    <span className="text-xl lg:text-2xl font-bold text-gray-500 mb-1">kg</span>
                                    {copied && <span className="text-[10px] text-green-400 font-black animate-pulse bg-green-900/30 px-2 py-1 rounded border border-green-500/30 ml-2">COPIED!</span>}
                                </div>
                            ) : (
                                <div className="flex items-center gap-4 py-4 opacity-30 select-none animate-in fade-in duration-700">
                                    <div className="flex flex-col">
                                        <div className="flex gap-1 mb-2">
                                            {[1,2,3,4,5].map(i => <div key={i} className="w-8 h-1.5 bg-white/20 rounded-full"></div>)}
                                        </div>
                                        <span className="text-xl font-black uppercase tracking-widest text-white/50">{t('calculatorPage.common.waiting')}</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="hidden lg:block w-px h-16 bg-white/10 mx-4"></div>

                        {/* Secondary Metrics - Unit Weight & Total Area */}
                        <div className="flex flex-col sm:flex-row lg:flex-row justify-center lg:justify-end gap-10 lg:gap-16 flex-1 overflow-hidden">
                            <div className="flex flex-col items-center lg:items-end gap-1">
                                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{t('calculatorPage.common.unitWeight')}</span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className={`text-xl md:text-3xl font-mono font-black tracking-tight transition-all duration-300 ${unitWeight > 0 ? 'text-gray-300' : 'text-white/10'}`}>
                                        {unitWeight > 0 ? unitWeight.toFixed(2) : '---'}
                                    </span>
                                    <span className="text-[9px] text-gray-600 font-black uppercase">kg</span>
                                </div>
                            </div>
                            
                            <div className="flex flex-col items-center lg:items-end gap-1">
                                <span className="text-[9px] text-gray-500 uppercase font-black tracking-widest">{t('calculatorPage.common.totalArea')}</span>
                                <div className="flex items-baseline gap-1.5">
                                    <span className={`text-xl md:text-3xl font-mono font-black tracking-tight transition-all duration-300 ${totalArea > 0 ? 'text-gray-300' : 'text-white/10'}`}>
                                        {totalArea > 0 ? totalArea.toFixed(2) : '---'}
                                    </span>
                                    <span className="text-[9px] text-gray-600 font-black uppercase">m²</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Row 2: Action Controls */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-4 pt-4 border-t border-white/5">
                        <div className="flex flex-col w-full sm:w-40 shrink-0">
                             <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1.5 ml-1">{t('calculatorPage.common.quantity')}</label>
                             <div className="flex items-center bg-[#1e293b] border border-white/10 rounded-xl overflow-hidden h-14 focus-within:border-brand-orange transition-all shadow-lg ring-1 ring-inset ring-white/5">
                                <input 
                                    type="number" 
                                    value={values.quantity} 
                                    onChange={(e) => handleInputChange('quantity', e.target.value)} 
                                    min="1" 
                                    className="w-full bg-transparent pl-4 pr-1 text-white text-xl font-black outline-none h-full text-center appearance-none" 
                                />
                                <div className="bg-white/10 h-full flex items-center px-4 border-l border-white/10 text-[10px] font-black text-gray-400 uppercase pointer-events-none tracking-tighter">
                                    UN
                                </div>
                            </div>
                        </div>

                        <button 
                            type="button" 
                            onClick={addItem} 
                            disabled={totalWeight <= 0}
                            className="flex-1 bg-brand-orange hover:bg-white hover:text-brand-orange text-white font-black h-14 px-8 rounded-xl shadow-[0_10px_30px_rgba(234,97,0,0.3)] hover:shadow-[0_15px_40px_rgba(234,97,0,0.5)] transition-all active:scale-[0.98] disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-4 uppercase tracking-[0.15em] text-sm whitespace-nowrap transform hover:-translate-y-1 group relative overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out"></div>
                            <Plus size={22} strokeWidth={4} className="shrink-0" /> 
                            <span className="truncate">{t('calculatorPage.common.addToList')}</span>
                            <ArrowRight size={20} className="opacity-0 group-hover:opacity-100 -translate-x-3 group-hover:translate-x-0 transition-all duration-300 hidden sm:block" />
                        </button>
                    </div>
                </div>
            </div>

            {/* MATERIAL LIST - FULL WIDTH */}
            <div className="w-full">
                 <div className="bg-[#0f172a] border border-white/5 rounded-2xl shadow-2xl flex flex-col overflow-hidden min-h-[350px]">
                        <div className="px-6 py-4 border-b border-white/5 bg-[#131d33] flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-brand-orange/10 rounded-lg text-brand-orange">
                                    <ShoppingCart size={18} />
                                </div>
                                <div>
                                    <h3 className="font-black text-white uppercase text-xs tracking-widest">{t('calculatorPage.common.materialList')}</h3>
                                    <p className="text-[9px] text-gray-500 font-bold uppercase">{t('calculatorPage.common.materialListDesc')}</p>
                                </div>
                            </div>
                            <div className="flex gap-3">
                                 <button onClick={clearProject} className="text-red-400 hover:text-white flex items-center gap-2 px-4 py-2 rounded-xl border border-red-500/20 hover:bg-red-500 transition-all text-[10px] font-black uppercase tracking-widest">
                                    <Trash2 size={14} /> {t('calculatorPage.common.clear')}
                                </button>
                            </div>
                        </div>

                        <div className="flex-1 overflow-auto max-h-[400px] scrollbar-thin scrollbar-thumb-gray-600 p-0">
                            {projectItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-56 text-gray-600 animate-in fade-in slide-in-from-top-4 duration-700">
                                    <div className="p-6 bg-white/5 rounded-full mb-4 border border-white/5">
                                        <Sparkles size={48} className="text-brand-orange/20" />
                                    </div>
                                    <p className="text-sm font-black uppercase tracking-widest opacity-30">{t('calculatorPage.common.emptyList')}</p>
                                </div>
                            ) : (
                                <table className="w-full text-left border-collapse animate-in fade-in duration-500">
                                    <thead className="bg-[#1e293b] text-gray-400 font-black text-[10px] uppercase tracking-widest sticky top-0 z-10 shadow-sm">
                                        <tr>
                                            <th className="px-6 py-4 border-b border-white/5">{t('calculatorPage.project.item')}</th>
                                            <th className="px-6 py-4 border-b border-white/5 text-center">{t('calculatorPage.project.qty')}</th>
                                            <th className="px-6 py-4 border-b border-white/5 text-right">{t('calculatorPage.result.weightPerPiece')}</th>
                                            <th className="px-6 py-4 border-b border-white/5 text-right">{t('calculatorPage.result.totalWeight')}</th>
                                            <th className="px-6 py-4 border-b border-white/5 w-12 text-center">{t('calculatorPage.common.action')}</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {projectItems.map((item, idx) => (
                                            <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-black text-gray-200 text-xs leading-tight mb-1">{idx + 1}. {t(`calculatorPage.products.${item.type}` as any).toUpperCase()}</div>
                                                    <div className="text-[10px] text-gray-500 font-mono leading-tight bg-black/20 inline-block px-2 py-0.5 rounded border border-white/5">{item.specs}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="inline-block px-3 py-1 bg-white/5 rounded-lg text-xs font-black text-gray-400 border border-white/5">{item.quantity}</span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono text-xs text-gray-500">
                                                    {item.unitWeight.toFixed(2)} <span className="text-[10px]">kg</span>
                                                </td>
                                                <td className="px-6 py-4 text-right font-mono text-sm font-black text-brand-orange drop-shadow-sm">
                                                    {item.totalWeight.toFixed(2)} <span className="text-[10px] font-normal opacity-60">kg</span>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <button onClick={() => removeFromProject(item.id)} className="text-gray-600 hover:text-red-400 transition-all p-2 rounded-lg hover:bg-red-500/10 active:scale-90" title="Remover item">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>

                        {projectItems.length > 0 && (
                            <div className="p-6 bg-[#1e293b]/40 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
                                <div>
                                    <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] block mb-1">{t('calculatorPage.common.projectTotal')}</span>
                                    <div className="text-4xl font-black text-white leading-none tracking-tighter">
                                        {projectItems.reduce((acc, i) => acc + i.totalWeight, 0).toFixed(2)} <span className="text-base text-gray-500 font-bold tracking-normal uppercase">kg</span>
                                    </div>
                                </div>
                                <button onClick={handleWhatsAppQuote} className="w-full md:w-auto bg-[#25D366] hover:bg-white hover:text-[#25D366] text-white font-black py-4 px-8 rounded-xl transition-all shadow-[0_10px_30px_rgba(37,211,102,0.3)] flex items-center justify-center gap-3 text-sm uppercase tracking-widest transform hover:-translate-y-1">
                                    <WhatsappIcon size={20} /> <span>{t('calculatorPage.common.requestQuote')}</span>
                                </button>
                            </div>
                        )}
                    </div>
            </div>
        </div>
    );
};

export default SteelCalculator;
