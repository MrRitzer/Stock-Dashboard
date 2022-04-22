import { Results } from './Results';

export interface Aggreates {
    adjusted: boolean,
    queryCount?: number | undefined,
    results: Array<Results>,
    resultsCount?: number | undefined,
    status: string,
    ticker: string
}