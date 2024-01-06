import { Sequelize } from 'sequelize-typescript';
import Product from '../../../domain/product/entity/product';
import ProductModel from '../../../infrastructure/product/repository/sequelize/product.model';
import ProductRepository from '../../../infrastructure/product/repository/sequelize/product.repository';
import ListProductUseCase from './list.product.usecase';

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
    await Promise.all([
      repository.create(new Product('1', 'TV', 6000)),
      repository.create(new Product('2', 'Bike', 7000)),
    ]);

    const usecase = new ListProductUseCase(repository);
    const input = { id: '1' };
    const output = await usecase.execute(input);

    expect(output.products.sort()).toEqual(
        [
          { id: '1', name: 'TV', price: 6000 },
          { id: '2', name: 'Bike', price: 7000 },
        ].sort()
      );
  });
});
