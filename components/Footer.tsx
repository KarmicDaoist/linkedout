import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 py-6 mt-12">
      <div className="container mx-auto px-4 text-center text-slate-500 text-sm">
        <p className="mb-2">
            LinkedOut Formatter &copy; {new Date().getFullYear()}
        </p>
        <p>
            Built for creators. Not affiliated with LinkedIn Corporation.
        </p>
      </div>
    </footer>
  );
};

export default Footer;