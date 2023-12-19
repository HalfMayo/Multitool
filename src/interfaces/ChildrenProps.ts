import { ReactNode } from "react";

export interface ChildrenProps {
    children: ReactNode
}

export interface ChildrenWProps extends ChildrenProps {
    type: "center" | "top"
}