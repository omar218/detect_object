import React from "react";
import "./index.css";
import { ratio2percent } from "../../utils";

interface Props {
  block: any;
}
const BlockCmp: React.FC<Props> = ({ block }) => {
  return (
    <span
      className={"block"}
      style={{
        top: ratio2percent(block.y),
        left: ratio2percent(block.x),
        width: ratio2percent(block.w),
        height: ratio2percent(block.h),
      }}
    >
      <label className="label">{block.label}</label>
    </span>
  );
};

export default BlockCmp;
