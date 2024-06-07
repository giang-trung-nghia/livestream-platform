import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/base/base.dto';
import { ProductEntity } from 'src/modules/products/product.entity';

export class CreateGiftDto extends BaseDto {
  @Expose()
  fromUserId: string;

  @Expose()
  toUserId: string;

  @Expose()
  livestreamId: string;

  @Expose()
  product: ProductEntity;
}
