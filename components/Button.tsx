import React from 'react';

interface ButtonProps {
  onClick: () => void;
  label: string;
  active?: boolean;
  icon?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'toolbar';
  className?: string;
  title?: string;
  'aria-label'?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  onClick, 
  label, 
  active = false, 
  icon, 
  variant = 'toolbar', 
  className = '',
  title
}) => {
  
  const baseStyles = "inline-flex items-center justify-center transition-colors duration-200 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2";
  
  const variants = {
    toolbar: `p-2 min-h-[44px] min-w-[44px] rounded hover:bg-slate-100 ${active ? 'bg-blue-100 text-blue-700' : 'text-slate-600'} focus-visible:ring-[#0a66c2]`,
    primary: "px-4 py-3 min-h-[44px] whitespace-nowrap bg-[#0a66c2] text-white rounded-full hover:bg-[#004182] focus-visible:ring-[#0a66c2]",
    secondary: "px-4 py-2 min-h-[44px] bg-white border border-slate-300 text-slate-700 rounded-full hover:bg-slate-50 focus-visible:ring-slate-400"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      title={title || label}
      aria-label={title || label}
      type="button"
    >
      {icon ? <span className="mr-0">{icon}</span> : null}
      {variant !== 'toolbar' && <span>{label}</span>}
      {variant === 'toolbar' && !icon && <span className="text-lg">{label}</span>}
    </button>
  );
};

export default Button;