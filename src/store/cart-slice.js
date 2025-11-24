import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from './ui-slice';

const initialCartState = { items: [], totalQuantity: 0};

const cartSlice = createSlice({
    name: 'cart',
    initialState: initialCartState,
    reducers: {
        addItem(state, action) {
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            state.totalQuantity++;
            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }   
        },
        removeItem(state, action) {
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload);
            if (existingItemIndex >= 0) {
                const existingItem = state.items[existingItemIndex];
                state.totalQuantity--;
                if (existingItem.quantity === 1) {
                    state.items.splice(existingItemIndex, 1);
                }   else {
                    state.items[existingItemIndex].quantity--;
                }
            }
        }
    }
});

const sendCartData = (cart) => {    
   return async (dispatch) => {
        dispatch(uiActions.showNotification({
            status: 'pending',
            title: 'Sending...',
            message: 'Sending cart data!'
        }));

        const sendRequest = async () => {
            const response = await fetch('https://react-udemy-ba241-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT', // overwrite existing data, idempotent
                body: JSON.stringify(cart)
            }); 
            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }  
        };

        try {
            await sendRequest();

            dispatch(uiActions.showNotification({
                status: 'success',
                title: 'Success!',
                message: 'Sent cart data successfully!'
            }));
        } catch (error) {
            dispatch(uiActions.showNotification({
                status: 'error',
                title: 'Error!',
                message: 'Sending cart data failed!'
            }));
            return;
        }
   };
};

export const cartActions = cartSlice.actions; // this exports the generated action creators based on the reducer functions defined in the slice
export default cartSlice.reducer;