import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for customer', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should list all products', async () => {
    const response = await request(app).post('/products').send({
      name: 'Bike',
      price: 20000,
      type: 'a',
    });
    expect(response.status).toBe(200);
    
    const response2 = await request(app).post('/products').send({
      name: 'Car',
      price: 500000,
      type: 'b',
    });
    expect(response2.status).toBe(200);

    const listResponse = await request(app).get('/products').send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    
    const product = listResponse.body.products[0];
    expect(product.name).toBe('Bike');
    expect(product.price).toBe(20000);

    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe('Car');
    expect(product2.price).toBe(1000000);
  });
});
