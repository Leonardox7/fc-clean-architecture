import express, { Request, Response } from 'express';
import CreateProductUseCase from '../../../usecase/product/create/create.product.usecase';
import ProductRepository from '../../product/repository/sequelize/product.repository';
import ListProductUseCase from '../../../usecase/product/list/list.product.usecase';

export const productRoute = express.Router();

const createProductUsecase = new CreateProductUseCase(new ProductRepository());
const listProductUsecase = new ListProductUseCase(new ProductRepository());

productRoute.post('/', async (req: Request, res: Response) => {
  try {
    const productDto = {
      name: req.body.name,
      price: req.body.price,
      type: req.body.type,
    };
    const output = await createProductUsecase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

productRoute.get('/', async (req: Request, res: Response) => {
  const output = await listProductUsecase.execute({});
  res.send(output);
});
