import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
        changed: false
    },
    reducers: {
        addItem(state, action) {
            const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
            state.totalQuantity++;
            state.changed = true;
            if (existingItemIndex >= 0) {
                state.items[existingItemIndex].quantity++;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }   
        },
        removeItem(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            
            if (existingItem) { 
                state.totalQuantity--;
                state.changed = true;
                if (existingItem.quantity === 1) {
                    state.items = state.items.filter(item => item.id !== id);
                }   else {
                    existingItem.quantity--;
                    existingItem.totalPrice -= existingItem.price;
                }
            }
        },
        replaceCart(state, action) {
            state.totalQuantity = action.payload.totalQuantity;
            state.items = action.payload.items;
        }
    }
});

export const cartActions = cartSlice.actions; // this exports the generated action creators based on the reducer functions defined in the slice
export default cartSlice.reducer;