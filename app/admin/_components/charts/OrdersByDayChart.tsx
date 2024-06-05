'use client'

import { formatCurrency } from "@/lib/formatter"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

type OrdersByDayChartProps = {
    data: {
        date: string
        totalSales: number
    }[]
}

const OrdersByDayChart = ({ data }: OrdersByDayChartProps) => {
    return (
        <ResponsiveContainer width={'100%'} minHeight={300}>
            <LineChart data={data}>
                <CartesianGrid stroke="hsl(var(--muted))" />
                <XAxis dataKey={'date'} stroke="hsl(var(--primary))" />
                <YAxis tickFormatter={value => formatCurrency(value)} stroke="hsl(var(--primary))" />
                <Tooltip formatter={value => formatCurrency(value as number)} />
                <Line
                    dot={false}
                    dataKey={'totalSales'}
                    type={'monotone'}
                    name="Total Sales"
                    stroke="hsl(var(--primary))"
                />
            </LineChart>
        </ResponsiveContainer>
    )
}

export default OrdersByDayChart