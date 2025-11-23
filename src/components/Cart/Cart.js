import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useSelector } from 'react-redux';
import { cartActions } from '../../store/cart-slice';
import { useDispatch } from 'react-redux';

const Cart = (props) => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.cart.items);

  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {items.map(item => (
          <CartItem
            key={item.id}
            title={item.title}
            quantity={item.quantity}
            total={item.totalPrice}
            price={item.price}
            onAddItem={() => dispatch(cartActions.addItem(item))}
            onRemoveItem={() => dispatch(cartActions.removeItem(item.id))}
          />
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
