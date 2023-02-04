import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

import { useSelector } from 'react-redux';

function App() {

  const cartShow=useSelector(state=>state.ui.cartVisible);

  return (
    <Layout>
      {cartShow && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
