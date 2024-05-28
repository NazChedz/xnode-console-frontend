import { IconProps } from '@/utils/icons'

export function CommunityIcon({ fill = '#4D4D4D', ...rest }: IconProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M10 6.875C10 6.21196 10.2634 5.57607 10.7322 5.10723C11.2011 4.63839 11.837 4.375 12.5 4.375H17.5C17.6658 4.375 17.8247 4.44085 17.9419 4.55806C18.0592 4.67527 18.125 4.83424 18.125 5V15C18.125 15.1658 18.0592 15.3247 17.9419 15.4419C17.8247 15.5592 17.6658 15.625 17.5 15.625H12.5C11.837 15.625 11.2011 15.8884 10.7322 16.3572C10.2634 16.8261 10 17.462 10 18.125"
        stroke={fill}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.875 15C1.875 15.1658 1.94085 15.3247 2.05806 15.4419C2.17527 15.5592 2.33424 15.625 2.5 15.625H7.5C8.16304 15.625 8.79893 15.8884 9.26777 16.3572C9.73661 16.8261 10 17.462 10 18.125V6.875C10 6.21196 9.73661 5.57607 9.26777 5.10723C8.79893 4.63839 8.16304 4.375 7.5 4.375H2.5C2.33424 4.375 2.17527 4.44085 2.05806 4.55806C1.94085 4.67527 1.875 4.83424 1.875 5V15Z"
        stroke={fill}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
