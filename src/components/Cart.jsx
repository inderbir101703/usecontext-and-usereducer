import { useContext } from "react";
import { ShoppingContext } from "../store/shopping-cart-index";
export default function Cart() {
  const{cart,onUpdateCartItemQuantity}=useContext(ShoppingContext)
  // items={cart.items} onUpdateItemQuantity={onUpdateCartItemQuantity}
  const totalPrice = cart?.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const formattedTotalPrice = `$${totalPrice.toFixed(2)}`;

  return (
    <div id="cart">
      {cart?.items.length === 0 && <p>No items in cart!</p>}
      {cart?.items.length > 0 && (
        <ul id="cart-items">
          {cart?.items.map((item) => {
            const formattedPrice = `$${item.price.toFixed(2)}`;

            return (
              <li key={item.id}>
                <div>
                  <span>{item.name}</span>
                  <span> ({formattedPrice})</span>
                </div>
                <div className="cart-item-actions">
                  <button onClick={() => onUpdateCartItemQuantity(item.id, -1)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => onUpdateCartItemQuantity(item.id, 1)}>
                    +
                  </button>
                </div>
              </li>
            );
          })}
        </ul>
      )}
      <p id="cart-total-price">
        Cart Total: <strong>{formattedTotalPrice}</strong>
      </p>
    </div>
  );
}
