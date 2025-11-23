import classes from './CartButton.module.css';
import { useDispatch } from 'react-redux';
import { cartActions } from '../../store/cart';
import { useSelector } from 'react-redux';

const CartButton = (props) => {
  const totalItems = useSelector(state => state.cart.totalQuantity); 

  const dispatch = useDispatch();
  
  const toggleCart = () => {
    dispatch(cartActions.toggleCart());
  }

  return (
    <button className={classes.button} onClick={toggleCart}>
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
