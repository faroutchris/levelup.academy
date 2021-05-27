import { MouseEventHandler } from 'react';

const btnType = {
  primary:
    'whitespace-nowrap inline-flex items-center justify-center px-5 py-2 border border-indigo-500 rounded-xl shadow-l hover:shadow-xl text-base font-medium text-white bg-indigo-500',
  secondary:
    'whitespace-nowrap inline-flex items-center justify-center px-5 py-2 border border-gray-400 rounded-xl shadow-l hover:shadow-xl text-base font-medium text-gray-600 bg-transparent',
  tertiary:
    'whitespace-nowrap inline-flex items-center justify-center px-5 py-2 border border-white rounded-xl shadow-l hover:shadow-xl text-base font-medium text-white bg-transparent',
};

interface Props {
  children: React.ReactChildren | string;
  type: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<Props> = ({ children, onClick, type, ...props }) => {
  return (
    <button className={btnType[type]} {...props}>
      {children}
    </button>
  );
};

export default Button;
