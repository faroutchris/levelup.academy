interface Props {
  children: React.ReactChild[];
  className?: string;
}

const ButtonGroup: React.FC<Props> = ({ children, className }) => {
  return <div className={`${className ? className : ''} inline-flex space-x-4`}>{children}</div>;
};

export default ButtonGroup;
