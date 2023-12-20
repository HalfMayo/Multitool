import { ReactNode } from "react";

interface TipProps {
  children: ReactNode;
  className?: string;
}

export default function Tip({ children, className }: TipProps) {
  return (
    <div
      className={`${
        className ? className : ""
      } flex items-center justify-center gap-4 bg-secondary-container text-on-secondary-container py-2 px-4 rounded-md`}
    >
      {children}
    </div>
  );
}
