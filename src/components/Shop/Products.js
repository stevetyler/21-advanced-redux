import ProductItem from './ProductItem';
import classes from './Products.module.css';
import availableProducts from '../../data/availableProducts';

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
