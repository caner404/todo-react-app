type IconUncheckedObject = {
  fillColor: string;
  stroke: string;
};
type IconUnCheckedProps = {
  iconValues: IconUncheckedObject;
  testId?: string;
  className?: string;
};
export default function IconUnChecked({ iconValues, testId = '', className = '' }: IconUnCheckedProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      data-testid={testId}
      className={className}
    >
      <circle
        cx='12'
        cy='12'
        r='11.5'
        fill={iconValues.fillColor}
        stroke={iconValues.stroke}
      />
      <g opacity='0.01'>
        <circle
          cx='12'
          cy='12'
          r='12'
          fill='url(#paint0_linear_0_614)'
        />
        <path
          d='M8 12.3041L10.6959 15L16.6959 9'
          stroke='white'
        />
      </g>
      <defs>
        <linearGradient
          id='paint0_linear_0_614'
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
