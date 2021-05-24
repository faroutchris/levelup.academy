import { MouseEventHandler } from 'react';

const btnType = {
  primary:
    'whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-blue-500 rounded-md shadow-l hover:shadow-xl text-base font-medium text-white bg-blue-500',
  secondary:
    'whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-gray-400 rounded-md shadow-l hover:shadow-xl text-base font-medium text-gray-600 bg-transparent',
  tertiary:
    'whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-white rounded-md shadow-l hover:shadow-xl text-base font-medium text-white bg-transparent',
};

interface Props {
  children: React.ReactChildren | string;
  type: 'primary' | 'secondary' | 'tertiary';
}

const Button: React.FC<Props> = ({ children, onClick, type }) => {
  return <button className={btnType[type]}>{children}</button>;
};

export default Button;
