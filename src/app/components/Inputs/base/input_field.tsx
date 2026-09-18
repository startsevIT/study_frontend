import React, {FC} from "react";
import {Input_type} from "./Input_type";

export const InputField: FC<{
    onChange: (value: string) => void;
    type: Input_type;
    placeholder: string;
    value: string;
}> = (p) =>
    <input style={{width: "100%"}} value={p.value} type={p.type} placeholder={p.placeholder}
           onChange={e => p.onChange(e.target.value)}/>

