import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../../infrastructure/customer/repository/sequelize/customer.model';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import CreateProductUseCase from './create.product.usecase';
import { InputCreateProductDto } from './create.product.dto';

describe('Integration test create product use case', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  const repository = new ProductRepository()
  const usecase = new CreateProductUseCase(repository);

  test("should create a product",async () => {
    const input: InputCreateProductDto = {
        name: "Cerveja Longneck",
        price: 15,
        type: "a"
    }
    const output = await usecase.execute(input)

    expect(output).toEqual({
        id: expect.any(String),
        name: "Cerveja Longneck",
        price: 15,
    })

    const founded = await repository.find(output.id)
    expect(output).toEqual({
        id: founded.id,
        name: founded.name,
        price: founded.price
    })
  })
});
