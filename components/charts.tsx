'use client'

import {Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from "recharts"

const data = [
    { name: "Jan", total: 167 },
    { name: "Feb", total: 190 },
    { name: "Mar", total: 210 },
    { name: "Apr", total: 252 },
    { name: "May", total: 265 },
    { name: "Jun", total: 280 },
    { name: "Jul", total: 290 },
    { name: "Aug", total: 305 },
    { name: "Sep", total: 270 },
    { name: "Oct", total: 285 },
    { name: "Nov", total: 320 },
    { name: "Dec", total: 345 },
]

export function ApplicationsChart() {
    return (<ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false}/>
                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false}
                       tickFormatter={(value) => `${value}`}/>
                <Tooltip/>
                <Line type="monotone" dataKey="total" stroke="#8884d8" strokeWidth={2}/>
            </LineChart>
        </ResponsiveContainer>)
}