export interface Pagination {
    currentPage?: number;
    pageSize?: number;
    totalItems: number;
    totalPages?: number;
}

export class PaginatedResult<T> {
    result: T;
    pagination: Pagination;
}
