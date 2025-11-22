import { createSlice } from '@reduxjs/toolkit';

const initialCartState = { items: [], isVisible: false, totalQuantity: 0};

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
        },
        toggleCart(state) {
            //console.log('toggling cart visibility');
            state.isVisible = !state.isVisible;
        },
    }
});

export const cartActions = cartSlice.actions; // this exports the generated action creators based on the reducer functions defined in the slice
export default cartSlice.reducer;