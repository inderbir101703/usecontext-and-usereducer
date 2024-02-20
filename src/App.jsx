
import ShoppingContextProvider from './store/shopping-cart-index.jsx';
import Header from './components/Header.jsx';
import Product from './components/Product.jsx';
import Shop from './components/Shop.jsx';
import { DUMMY_PRODUCTS } from './dummy-products.js';

function App() {

  return (
    <ShoppingContextProvider>
      <Header/>
      <Shop>
      {DUMMY_PRODUCTS.map((product) => (
          <li key={product.id}>
            <Product {...product} />
          </li>
        ))}
      </Shop>
    </ShoppingContextProvider>
    
  );
}

export default App;
