import { IconProps } from '@/utils/icons'

export function HomeIcon({ fill, ...rest }: IconProps) {
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
        d="M10 12.5C12.7614 12.5 15 10.2614 15 7.5C15 4.73858 12.7614 2.5 10 2.5C7.23858 2.5 5 4.73858 5 7.5C5 10.2614 7.23858 12.5 10 12.5Z"
        stroke={fill}
        strokeWidth="1.25"
        strokeMiterlimit="10"
      />
      <path
        d="M2.42188 16.8743C3.19028 15.5442 4.29517 14.4398 5.62553 13.672C6.9559 12.9042 8.4649 12.5 10.0009 12.5C11.537 12.5 13.046 12.9043 14.3763 13.6721C15.7067 14.44 16.8116 15.5444 17.5799 16.8744"
        stroke={fill}
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
