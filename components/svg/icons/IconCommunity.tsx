import * as React from 'react';

const IconCommunity = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width={48}
      height={48}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        opacity={0.4}
        d="M16 3C8.82 3 3 8.82 3 16c0 3.166 1.133 6.069 3.013 8.323L4.64 28.029a1 1 0 001.253 1.297l4.628-1.534A12.954 12.954 0 0016 29c7.18 0 13-5.82 13-13S23.18 3 16 3z"
        fill="#728191"
      />
      <circle cx={10.667} cy={16} fill="#6B58DE" r={1.333} />
      <circle cx={16} cy={16} fill="#6B58DE" r={1.333} />
      <circle cx={21.333} cy={16} fill="#6B58DE" r={1.333} />
    </svg>
  );
};

IconCommunity.toString = () => '.icon-community';

export default IconCommunity;
