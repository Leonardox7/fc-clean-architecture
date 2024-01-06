import ProductInterface from '../../../domain/product/entity/product.interface';
import ProductRepositoryInterface from '../../../domain/product/repository/product-repository.interface';
import { InputListProductDto, OutputListProductDto } from './list.product.dto';

export default class ListProductUseCase {
  private readonly productRepository: ProductRepositoryInterface;

  public constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  public async execute(_: InputListProductDto): Promise<OutputListProductDto> {
    const products = await this.productRepository.findAll();
    return this.toOutputMap(products)
  }

  private toOutputMap(products: ProductInterface[]): OutputListProductDto {
    return {
      products: products.map((product) => ({
        id: product.id,
        name: product.name,
        price: product.price,
      })),
    };
  }
}
