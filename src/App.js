import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import Notification from './components/UI/Notification';
import { sendCartData } from './store/cart-actions';
import { fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const isCartVisible = useSelector(state => state.ui.cartIsVisible);
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch]); // dispatch is stable, won't change between renders

  useEffect(() => {
    if (isInitial) {
      isInitial = false; // prevent overwriting data on initial load
      return;
    }
    if (cart.changed) {
      dispatch(sendCartData(cart)); // redux accepts thunks like normal actions
    }
  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && 
        <Notification 
          status={notification.status} 
          title={notification.title} 
          message={notification.message} 
        />
      }
      <Layout>
      {isCartVisible && 
        <Cart />}
      <Products />
    </Layout>
    </Fragment>
    
  );
}

export default App;
