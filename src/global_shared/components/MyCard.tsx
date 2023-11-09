import { RoundedClass } from "global_shared/enum/RoundedClass";
import React, { FC } from "react";

interface MyCardProps {
  rounded?: RoundedClass;
  shadow?: string | null;
  bgColor?: string | null;
  borderColor?: string | null;
  minimumHeight?: number;
  children?: React.ReactNode;
}

const MyCard: FC<MyCardProps> = ({
  rounded,
  shadow,
  minimumHeight = 50,
  bgColor = "bg-surface",
  borderColor = "border border-gray-100",
  children,
}) => {
  return (
    <div
      className={`group flex items-center gap-2 ${borderColor} overflow-hidden ${bgColor} shadow-${shadow} hover:cursor-pointer hover:shadow-md ${rounded}`}
      style={{ minHeight: minimumHeight }}
    >
      {children}
    </div>
  );
};

export default MyCard;
