import React, { useState } from 'react';

const MiniCalculator = () => {
  const [display, setDisplay] = useState('0');

  const handleBtn = (val) => {
    if (val === 'C') {
      setDisplay('0');
    } else if (val === '⌫') {
      if (display === 'Error' || display.length <= 1) {
        setDisplay('0');
      } else {
        setDisplay(display.slice(0, -1));
      }
    } else if (val === '=') {
      try {
        let formula = display
          .replace(/x/g, '*')
          .replace(/\^/g, '**')
          .replace(/π/g, 'Math.PI')
          .replace(/e/g, 'Math.E')
          .replace(/√\(/g, 'Math.sqrt(')
          .replace(/sin\(/g, 'Math.sin(')
          .replace(/cos\(/g, 'Math.cos(')
          .replace(/tan\(/g, 'Math.tan(')
          .replace(/log\(/g, 'Math.log10(')
          .replace(/ln\(/g, 'Math.log(');

        const openBrackets = (formula.match(/\(/g) || []).length;
        const closeBrackets = (formula.match(/\)/g) || []).length;
        if (openBrackets > closeBrackets) {
          formula += ')'.repeat(openBrackets - closeBrackets);
        }

        const evaluation = new Function(`return ${formula}`)();
        
        if (evaluation === Infinity || isNaN(evaluation)) throw new Error();
        
        setDisplay(Number(evaluation).toLocaleString('id-ID', { maximumFractionDigits: 6 }));
      } catch {
        setDisplay('Error');
      }
    } else {
      let insertValue = val;
      if (['sin', 'cos', 'tan', 'log', 'ln', '√'].includes(val)) {
        insertValue = val + '(';
      }

      if (display === '0' || display === 'Error') {
        if (['+', 'x', '/', '%', '^', ')'].includes(val)) return;
        setDisplay(insertValue);
      } else {
        setDisplay(display + insertValue);
      }
    }
  };

  // 1. Kelompok Fungsi Saintifik Atas (Grid 4 Kolom)
  const scientificKeys = [
    'sin', 'cos', 'tan', '^',
    '√', 'log', 'ln', '%',
    '(', ')', 'π', 'e'
  ];

  // 2. Kelompok Numpad Tradisional Bawah (Grid 4 Kolom)
  const numpadKeys = [
    'C', '⌫', '/', 'x',
    '7', '8', '9', '-',
    '4', '5', '6', '+',
    '1', '2', '3', '=',
    '0', '.'
  ];

  return (
    <div className="p-3.5 flex flex-col h-full bg-[#070707] justify-between select-none font-mono">
      
      {/* Layar Monitor Hasil */}
      <div className="bg-black/60 border border-white/5 rounded-xl p-4 text-right text-lg tracking-tight text-white mb-4 shadow-inner min-h-[54px] flex items-center justify-end overflow-x-auto scrollbar-none whitespace-nowrap font-semibold">
        {display}
      </div>

      <div className="flex-1 flex flex-col justify-between gap-4">
        
        {/* BLOK 1: MATRIKS SCIENTIFIC (Aksen Oranye Tipis) */}
        <div className="space-y-1.5">
          <div className="text-[9px] text-gray-600 uppercase tracking-widest pl-1 font-bold">Scientific Functions</div>
          <div className="grid grid-cols-4 gap-1.5">
            {scientificKeys.map((btn) => (
              <button
                key={btn}
                onClick={() => handleBtn(btn)}
                className="text-[10px] py-2 bg-[#ff6b00]/5 text-[#ff6b00] border border-[#ff6b00]/10 rounded-lg font-bold hover:bg-[#ff6b00]/15 active:scale-95 transition-all"
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* BLOK 2: MATRIKS NUMPAD UTAMA (Padat, Seimbang, Mengisi Ruang Bawah) */}
        <div className="space-y-1.5 flex-1 flex flex-col justify-start">
          <div className="text-[9px] text-gray-600 uppercase tracking-widest pl-1 font-bold">Standard Pad</div>
          <div className="grid grid-cols-4 gap-1.5 auto-rows-fr">
            {numpadKeys.map((btn) => {
              const isOperator = ['/', 'x', '-', '+'].includes(btn);
              const isClear = btn === 'C' || btn === '⌫';
              const isExecute = btn === '=';

              return (
                <button
                  key={btn}
                  onClick={() => handleBtn(btn)}
                  className={`text-xs font-bold rounded-lg transition-all border active:scale-95 flex items-center justify-center p-3
                    ${btn === '0' ? 'col-span-2' : ''}
                    ${isExecute 
                      ? 'bg-[#ff6b00] text-black border-[#ff6b00]/30 shadow-[0_0_15px_rgba(255,107,0,0.2)] hover:bg-[#ff8533]' 
                      : isClear
                        ? 'bg-red-950/20 text-red-400 border-red-500/10 hover:bg-red-950/40'
                        : isOperator
                          ? 'bg-white/[0.03] text-[#ff6b00] border-white/5 hover:bg-white/[0.08]'
                          : 'bg-white/[0.01] text-gray-300 border-white/5 hover:bg-white/[0.06] hover:text-white'
                    }
                  `}
                >
                  {btn}
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default MiniCalculator;