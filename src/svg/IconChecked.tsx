type IconCheckedProps = {
  testId: string;
  className?: string;
};

export default function IconChecked({ testId, className = '' }: IconCheckedProps) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      data-testid={testId}
      className={className}
    >
      <g id='Group 4'>
        <circle
          id='Oval'
          cx='12'
          cy='12'
          r='11.5'
          fill='white'
          stroke='#E3E4F1'
        />
        <g id='Group 3'>
          <circle
            id='Oval_2'
            cx='12'
            cy='12'
            r='12'
            fill='url(#paint0_linear_0_595)'
          />
          <path
            id='Path'
            d='M8 12.3041L10.6959 15L16.6959 9'
            stroke='white'
            strokeWidth='2'
          />
        </g>
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_0_595'
          x1='-12'
          y1='12'
          x2='12'
          y2='36'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#55DDFF' />
          <stop
            offset='1'
            stopColor='#C058F3'
          />
        </linearGradient>
      </defs>
    </svg>
  );
}
