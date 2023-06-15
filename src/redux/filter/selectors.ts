import { RootState } from '..'

export const selectFilter = (state: RootState) => state.filter
export const selectFilterSort = (state: RootState) => state.filter.sort
