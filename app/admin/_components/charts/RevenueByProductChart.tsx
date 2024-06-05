'use client'

import { formatCurrency } from "@/lib/formatter"
import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"

type RevenueByProductChartProps = {
    data: {
        name: string
        revenue: number
    }[]
}

const RevenueByProductChart = ({ data }: RevenueByProductChartProps) => {
    return (
        <ResponsiveContainer width={'100%'} minHeight={300}>
            <PieChart >
                <Tooltip formatter={value => formatCurrency(value as number)} />
                <Pie
                    data={data}
                    label={item => item.name}
                    dataKey={'revenue'}
                    nameKey={'name'}
                    fill="hsl(var(--primary))"
                />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default RevenueByProductChart