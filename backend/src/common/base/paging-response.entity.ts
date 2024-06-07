export class PagingResponse<T> {
  data: T[];
  total: number;
  currentPage: number;
  size: number;

  constructor(data: T[], total: number, currentPage: number, size: number) {
    this.data = data;
    this.total = total;
    this.currentPage = currentPage;
    this.size = size;
  }
}
