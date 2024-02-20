import { createContext,useReducer,useState } from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";
export const ShoppingContext=createContext({
    cart:{items:[]}
})

export function combinedReducers(prevState,action){
   switch(action.type){
    case 'ADD_ITEM':

            {
                const updatedItems = [...prevState.cart.items];
      
            const existingCartItemIndex = updatedItems.findIndex(
              (cartItem) => cartItem.id === action.payload
            );
            const existingCartItem = updatedItems[existingCartItemIndex];
      
            if (existingCartItem) {
              const updatedItem = {
                ...existingCartItem,
                quantity: existingCartItem.quantity + 1,
              };
              updatedItems[existingCartItemIndex] = updatedItem;
            } else {
              const product = DUMMY_PRODUCTS.find((product) => product.id === action.payload);
              updatedItems.push({
                id: action.payload,
                name: product.title,
                price: product.price,
                quantity: 1,
              });
            }
        
            return {
                cart:{...prevState.cart,
              items: updatedItems}
            };}
        
    case 'UPDATE_ITEM':
       
       { const updatedItems = [...prevState.cart.items];
        const updatedItemIndex = updatedItems.findIndex(
          (item) => item.id === action.payload.id
        );
  
        const updatedItem = {
          ...updatedItems[updatedItemIndex],
        };

        updatedItem.quantity += action.payload.amount;

  
        if (updatedItem.quantity <= 0) {
          updatedItems.splice(updatedItemIndex, 1);
        } else {
          updatedItems[updatedItemIndex] = updatedItem;
        }

        return {cart:{
          items: updatedItems}
        };    
   }

} 

}
export function addItemAction(id){

    return {
        type:'ADD_ITEM',
        payload:id
    }
}
export function updateItemAction(id,amount){

    return {
        type:'UPDATE_ITEM',
        payload:{id:id,amount:amount}
    }
}

export default function ShoppingContextProvider({children}){
    const[{cart},dispatch]=useReducer(combinedReducers,{cart:{items:[]}})
    // const [shoppingCart, setShoppingCart] = useState({
    //     items: [],
    //   });
    
 function handleUpdateCartItemQuantity(productId,amount){
  
dispatch(updateItemAction(productId,amount))
 }
 function handleAddItemToCart(productId){

    dispatch(addItemAction(productId))
 }
    //   function handleUpdateCartItemQuantity(productId, amount) {
    //     setShoppingCart((prevShoppingCart) => {
         
    //     });
    //   }
    const store={
      cart:cart,
      onUpdateCartItemQuantity:handleUpdateCartItemQuantity,
      onAddItemToCart:handleAddItemToCart
    }
    return <ShoppingContext.Provider value={store}>
        {children}
    </ShoppingContext.Provider>
}