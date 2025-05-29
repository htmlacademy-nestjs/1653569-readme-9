import { Expose } from 'class-transformer';
import { PostRDO } from './post.rdo';

export class PostWithPaginationRDO {
  @Expose()
  public entities!: PostRDO[];

  @Expose()
  public totalPages!: number;

  @Expose()
  public totalItems!: number;

  @Expose()
  public currentPage!: number;

  @Expose()
  public itemsPerPage!: number;
}
