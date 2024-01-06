import Product from '../../../domain/product/entity/product';
import FindProductUseCase from './find.product.usecase';

const product = new Product('1', 'TV', 6000);

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe('Unit test find product use case', () => {
  test('should find a product', async () => {
    const usecase = new FindProductUseCase(MockRepository());
    const input = { id: '1' };
    const output = await usecase.execute(input);

    expect(output).toEqual({
      id: '1',
      name: 'TV',
      price: 6000,
    });
  });

  test('should throw error product not found', async () => {
    const productRepository = MockRepository();

    productRepository.find.mockImplementation(() => {
      throw new Error('Product not found');
    });

    const usecase = new FindProductUseCase(productRepository);
    const input = { id: '2' };
    expect(() => usecase.execute(input)).rejects.toThrow('Product not found');
  });
});
