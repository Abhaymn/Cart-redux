import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { useSelector ,useDispatch} from 'react-redux';

import { Fragment, useEffect } from 'react';
import { uiActions } from './store/ui-slice';


let isInitial=true;

function App() {
const dispatch=useDispatch();
  const cartShow=useSelector(state=>state.ui.cartVisible);
  const cart=useSelector((state)=>state.cart);
  const notification=useSelector(state=>state.ui.notification);

  useEffect(()=>{
    const sendData=async()=>{
      dispatch(
        uiActions.showNotification({
          status:'pending',
          title:'Sending...',
          message:'Sending Cart Data'
        })
      );
     const response=await fetch('https://react-http-da031-default-rtdb.firebaseio.com/cart.json',{
      method:'PUT',
      body:JSON.stringify(cart),
    });

    if(!response.ok){
      throw new Error('Seing Faildnd...');
    }

    dispatch(
      uiActions.showNotification({
        status:'success',
        title:'Success',
        message:'Sent Data Successfully.',
      })
    );

    }

    if( isInitial ){
      isInitial=false;
      return;
    }

    sendData().catch(error=>{
      dispatch(
        uiActions.showNotification({
          status:'error',
          title:'Error..',
          message:'Sending failed try again..',
        })
      );
    });
    
  },[cart,dispatch]);

  return (
    <Fragment>
      
      {notification && (
        <Notification 
          status={notification.status} 
          title={notification.title}
          message={notification.message}
        />
      )}

      <Layout>
        {cartShow && <Cart />}
        <Products />
      </Layout>

    </Fragment>
  );
}

export default App;
