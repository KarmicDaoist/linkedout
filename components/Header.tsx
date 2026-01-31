import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#0a66c2] rounded text-white flex items-center justify-center font-bold text-xl">
                in
            </div>
            <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                Linked<span className="text-[#0a66c2]">Out</span>
            </h1>
        </div>
        <div>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-sm font-medium text-slate-500 hover:text-[#0a66c2] transition-colors">
                Go to LinkedIn &rarr;
            </a>
        </div>
      </div>
    </header>
  );
};

export default Header;