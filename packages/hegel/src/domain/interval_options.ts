export type Interval = 'day' | 'week' | 'month' | 'year';
export type IntervalOptions = {
    id: Interval;
    label: string;
    sublabel?: string;
}
