import * as React from "react";
import { SVGProps } from "react";
const BackIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={800}
    height={800}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="currentColor"
      d="M16.18 3.269a1 1 0 0 0-1.415 0L8.121 9.913a3 3 0 0 0-.001 4.242l6.57 6.575a1 1 0 1 0 1.415-1.414l-6.573-6.572a1 1 0 0 1 0-1.414l6.648-6.647a1 1 0 0 0 0-1.414Z"
    />
  </svg>
);
export default BackIcon;
