import ValidatorInterface from '../../@shared/validator/validator.interface';
import ProductInterface from '../entity/product.interface';
import * as yup from 'yup';

export default class ProductYupValidator
  implements ValidatorInterface<ProductInterface>
{
  validate(entity: ProductInterface): void {
    try {
      yup
        .object()
        .shape({
          id: yup.string().required('Id is required'),
          name: yup.string().required('Name is required'),
          price: yup.number().typeError('Price must be greater than zero').min(1, 'Price must be greater than zero'),
        })
        .validateSync({
          id: entity.id,
          name: entity.name,
          price: entity.price
        }, {abortEarly: false});
    } catch (error) {
        const e = error as yup.ValidationError;
        e.errors.forEach((error) => {
          entity.notification.addError({
            context: "product",
            message: error,
          });
        });
    }
  }
}
