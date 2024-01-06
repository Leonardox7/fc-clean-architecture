import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import UpdateProductUseCase from './update.product.usecase';

describe('Integration test find product use case', () => {
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

  const repository = new ProductRepository();

  test('should find a product', async () => {
    await repository.create(new Product('1', 'TV', 6000));

    const usecase = new UpdateProductUseCase(repository);
    const input = {
      id: '1',
      name: 'TV 42',
      price: 5500,
    };
    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: '1',
      name: 'TV 42',
      price: 5500,
    });
  });

  test('should throw error product not found', async () => {
    const usecase = new UpdateProductUseCase(repository);
    const input = { id: '2', name: 'Bike', price: 1500 };
    expect(() => usecase.execute(input)).rejects.toThrow('Product not found');
  });
});
