import Product from '../../../domain/product/entity/product';
import ListProductUseCase from './list.product.usecase';

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([new Product('1', 'TV', 6000), new Product('2', 'Bike', 7000)])),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test list product use case', () => {
  test('should list products', async () => {
    const usecase = new ListProductUseCase(MockRepository());
    const output = await usecase.execute({ id: '1' });

    expect(output.products.sort()).toEqual(
      [
        { id: '1', name: 'TV', price: 6000 },
        { id: '2', name: 'Bike', price: 7000 },
      ].sort()
    );
  });
});
