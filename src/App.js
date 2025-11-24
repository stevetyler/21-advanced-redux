import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';


function App() {
  const cart = useSelector(state => state.cart);
  const isCartVisible = useSelector(state => state.ui.cartIsVisible);

  useEffect(() => {
    fetch('https://react-udemy-ba241-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT', 
      body: JSON.stringify(cart)
    })
  } , [ cart ]);


  return (
    <Layout>
      {isCartVisible && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
