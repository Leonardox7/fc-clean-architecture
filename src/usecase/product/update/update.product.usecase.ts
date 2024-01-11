import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import { InputUpdateProductDto, OutpuUpdateProductDto } from "./update.product.dto";

export default class UpdateProductUseCase {
    private readonly productRepository: ProductRepositoryInterface

    public constructor(productRepository: ProductRepositoryInterface) {
        this.productRepository = productRepository
    }

    public async execute(input: InputUpdateProductDto): Promise<OutpuUpdateProductDto> {
        const productToBeUpdated = await this.productRepository.find(input.id)
        
        if (input.name && input.name != "") productToBeUpdated.changeName(input.name)
        if (input.price) productToBeUpdated.changePrice(input.price)

        await this.productRepository.update(productToBeUpdated)

        return {
            id: input.id,
            name: input.name,
            price: input.price
        }
    }
}