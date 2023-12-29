import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  left: () => void;
  middle: () => void;
  right: () => void;
}
const TouchAreaOverlay = React.forwardRef<HTMLDivElement, Props>(
  ({ left, middle, right, className }, ref) => {
    return (
      <div id="touch-area" className={className} ref={ref}>
        <div onClick={left} className="fixed top-0 left-0 h-full w-1/3"></div>
        <div
          onClick={middle}
          className="fixed top-0 left-1/3 h-full w-1/3"
        ></div>
        <div
          onClick={right}
          className="fixed top-0 left-2/3 h-full w-1/3"
        ></div>
      </div>
    );
  },
);
TouchAreaOverlay.displayName = "TouchAreaOverlay";
export default TouchAreaOverlay;
