import { isValid, subDays } from "date-fns";
import { formatDate } from "./formatter";

export const RANGE_OPTIONS = {
    last_7_days: {
        label: 'Last 7 Days',
        startDate: subDays(new Date(), 6),
        endDate: null
    },
    last_30_days: {
        label: 'Last 30 Days',
        startDate: subDays(new Date(), 29),
        endDate: null
    },
    last_90_days: {
        label: 'Last 90 Days',
        startDate: subDays(new Date(), 89),
        endDate: null
    },
    last_365_days: {
        label: 'Last 365 Days',
        startDate: subDays(new Date(), 364),
        endDate: null
    },
    all_time: {
        label: 'All Time',
        startDate: null,
        endDate: null
    }
}

export const getRangeOption = (key?: string, from?: string, to?: string) => {
    if (key == null) {
        const startDate = new Date(from || '')
        const endDate = new Date(to || '')
        if (!isValid(startDate) || !isValid(endDate)) return
        return {
            label: `${formatDate(startDate)} - ${formatDate(endDate)}`,
            startDate,
            endDate
        }
    }

    return RANGE_OPTIONS[key as keyof typeof RANGE_OPTIONS]
}