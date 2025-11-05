import { MatPaginatorIntl } from '@angular/material/paginator';

export function getTurkishPaginatorIntl(): MatPaginatorIntl {
  const paginatorIntl = new MatPaginatorIntl();

  paginatorIntl.itemsPerPageLabel = 'Sayfa başına kayıt:';
  paginatorIntl.nextPageLabel = 'Sonraki sayfa';
  paginatorIntl.previousPageLabel = 'Önceki sayfa';
  paginatorIntl.firstPageLabel = 'İlk sayfa';
  paginatorIntl.lastPageLabel = 'Son sayfa';
  paginatorIntl.getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length === 0 || pageSize === 0) {
      return `0 / ${length}`;
    }
    const startIndex = page * pageSize;
    // Son sayfa kontrolü
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return `${startIndex + 1} - ${endIndex} / ${length}`;
  };

  return paginatorIntl;
}
