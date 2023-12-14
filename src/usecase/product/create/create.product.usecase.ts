import ProductFactory from '../../../domain/product/factory/product.factory';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import {
  InputCreateProductDto,
  OutputCreateProductDto,
} from './create.product.dto';

export default class CreateProductUseCase {
  
    private readonly productRepository: ProductRepository;

  public constructor(productRepository: ProductRepository) {
    this.productRepository = productRepository;
  }

  public async execute(inputCreateProductDto: InputCreateProductDto): Promise<OutputCreateProductDto> {
    
    const product = ProductFactory.create(
      inputCreateProductDto.type,
      inputCreateProductDto.name,
      inputCreateProductDto.price
    );

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
