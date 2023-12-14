import { InputCreateProductDto } from "./create.product.dto";
import CreateProductUseCase from "./create.product.usecase";



const MockRepository = () => {
    return {
      find: jest.fn(),
      findAll: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    };
  };
  

  describe("Unit test create product use case", () => {

    const usecase = new CreateProductUseCase(MockRepository());

    it("should create a product with type a", async () => {
        
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
    })

    it("should create a product with type b", async () => {

        const input: InputCreateProductDto = {
            name: "Gin",
            price: 60,
            type: "b"
        }
        const output = await usecase.execute(input)

        expect(output).toEqual({
            id: expect.any(String),
            name: "Gin",
            price: 120,
        })

    })

    it("should thrown an error when type is not mapped", async () => {

        const input: InputCreateProductDto = {
            name: "Cerveja Longneck",
            price: 15,
            type: ""
        }

        await expect(usecase.execute(input)).rejects.toThrow("Product type not supported")
    })

    it("should thrown an error when name is missing", async () => {
        
        const input: InputCreateProductDto = {
            name: "",
            price: 15,
            type: "a"
        }
        await expect(usecase.execute(input)).rejects.toThrow("Name is required")
    })

    it("should thrown an error when price is less than zero", async () => {
                
        const input: InputCreateProductDto = {
            name: "Cerveja Longneck",
            price: -1,
            type: "a"
        }

        await expect(usecase.execute(input)).rejects.toThrow("Price must be greater than zero")

    })

  })