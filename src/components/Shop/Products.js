import ProductItem from './ProductItem';
import classes from './Products.module.css';

const availableProducts = [
  {
    id: 1,
    title: 'Test',
    price: 6,
    description: 'first product'
  }
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>

      {availableProducts.map(product => (
        <ul key={product.id}>
          <ProductItem
            product={product}
          />
        </ul>
      ))}
      
    </section>
  );
};

export default Products;
