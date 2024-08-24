export interface IPagination {
  previous?: {
    page: number
    limit: number
  }
  next?: {
    page: number
    limit: number
  }
}
