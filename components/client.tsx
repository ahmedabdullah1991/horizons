"use client"

import * as React from "react"
import {useState} from "react";

export function CompanyCard() {
    const [state, setState] = useState(0)
    return (
        <div onClick={()=> setState(state+1)}>
            {state}
        </div>
    )
}