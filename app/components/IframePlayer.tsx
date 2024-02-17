// components/ResponsiveIframe.tsx
import React from "react";

interface ResponsiveIframeProps {
  src: string;
}

const IframePlayer: React.FC<ResponsiveIframeProps> = ({ src }) => {
  return (
    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
      {/* 16:9 Aspect Ratio */}
      <iframe
        src={src}
        frameBorder="0"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full"
      ></iframe>
    </div>
  );
};

export default IframePlayer;

// IframePlayer
