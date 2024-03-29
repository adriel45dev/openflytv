import * as React from "react";
import { SVGProps } from "react";
const NetworkErrorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16.003 16.003"
    {...props}
  >
    <path
      fill="gray"
      d="M6.428 1c-.45.005-.778-.012-1.047.137a.676.676 0 0 0-.3.357c-.06.157-.08.343-.08.578V3.93c0 .235.021.42.08.576a.677.677 0 0 0 .3.357c.269.148.597.132 1.047.137H7v2H3.5c-.666 0-1.137.408-1.322.777C1.993 8.147 2 8.5 2 8.5V10h-.572c-.45.005-.778-.012-1.047.137a.676.676 0 0 0-.3.357c-.06.157-.08.343-.08.578v1.858c0 .235.021.42.08.576a.677.677 0 0 0 .3.357c.269.148.597.132 1.047.137h2.144c.45-.005.779.012 1.047-.137.135-.074.24-.2.3-.357.058-.157.08-.341.08-.576v-1.858c0-.235-.022-.421-.08-.578a.673.673 0 0 0-.3-.357c-.268-.15-.597-.132-1.046-.137H3V8.5s.01-.145.072-.275C3.137 8.094 3.166 8 3.5 8h9.41a1.548 1.548 0 0 0-.088-.223A1.485 1.485 0 0 0 11.5 7H8V5h.572c.45-.005.778.012 1.047-.137.134-.074.24-.2.299-.357.059-.157.08-.341.08-.576V2.072c0-.235-.021-.421-.08-.578a.673.673 0 0 0-.299-.357C9.35.987 9.022 1.005 8.572 1zm-.426 1h3v2h-3zm-5 9h3v2h-3z"
      color="#000"
      fontFamily="sans-serif"
      fontWeight={400}
      opacity={0.5}
      overflow="visible"
      style={{
        lineHeight: "normal",
        fontVariantLigatures: "normal",
        fontVariantPosition: "normal",
        fontVariantCaps: "normal",
        fontVariantNumeric: "normal",
        fontVariantAlternates: "normal",
        fontFeatureSettings: "normal",
        textIndent: 0,
        textAlign: "start",
        textDecorationLine: "none",
        textDecorationStyle: "solid",
        textDecorationColor: "#000",
        textTransform: "none",
        textOrientation: "mixed",
        isolation: "auto",
        mixBlendMode: "normal",
        marker: "none",
      }}
    />
    <path
      fill="#f22c42"
      d="M12.502 9a3.5 3.5 0 0 0-3.5 3.5 3.5 3.5 0 0 0 3.5 3.5 3.5 3.5 0 0 0 3.5-3.5 3.5 3.5 0 0 0-3.5-3.5zm-.5 1h1v1.168c0 .348-.016.667-.047.957-.03.29-.069.581-.115.875h-.666a12.898 12.898 0 0 1-.125-.875 9.146 9.146 0 0 1-.047-.957zm.5 4a.5.5 0 0 1 .5.5.5.5 0 0 1-.5.5.5.5 0 0 1-.5-.5.5.5 0 0 1 .5-.5z"
      className="error"
      color="#000"
      overflow="visible"
      style={{
        marker: "none",
      }}
    />
  </svg>
);
export default NetworkErrorIcon;
