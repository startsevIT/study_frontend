import React, {MouseEventHandler} from "react";

export interface MainButtonProps {
    disabled?: boolean
    onClick: MouseEventHandler
    children: React.ReactNode
    full?: boolean
}