import React from "react";
import {RedBorderBox} from "../../components/BorderBoxes/RedBorderBox";
import {BlueBorderBox} from "../../components/BorderBoxes/BlueBorderBox";

export const contactSpan = (exists: string[], value: string) => exists.includes(value)
    ? <RedBorderBox children={value} inline/>
    : <BlueBorderBox children={value} inline/>