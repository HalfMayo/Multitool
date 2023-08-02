import {ReactNode} from 'react'

interface TipProps {
    children: ReactNode
}

export default function Tip({children} : TipProps) {
    return(
        <div className="flex items-center justify-center gap-4 w-full bg-secondary-container text-on-secondary-container p-2 rounded-md">
            {children}
        </div>)
}