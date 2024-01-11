import Product from "../../../domain/product/entity/product";
import UpdateProductUseCase from "./update.product.usecase";

const product = new Product("1", "TV", 20)

const MockRepository = () => {
    return {
      create: jest.fn(),
      findAll: jest.fn(),
      find: jest.fn().mockReturnValue(Promise.resolve(product)),
      update: jest.fn(),
    };
  };
  
  describe("Unit test for product update use case", () => {
    it("should update a product", async () => {
      const customerRepository = MockRepository();
      const customerUpdateUseCase = new UpdateProductUseCase(customerRepository);
      const input = { id: "1", name: "TV 42", price: 3000 }
      const output = await customerUpdateUseCase.execute(input);
  
      expect(output).toEqual(input);
    });
  });
  