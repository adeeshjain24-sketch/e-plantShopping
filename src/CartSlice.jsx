
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const CartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        // Add plant to cart
        addItem: (state, action) => {
            const plant = action.payload;

            const existingItem = state.items.find(
                (item) => item.id === plant.id
            );

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({
                    ...plant,
                    quantity: 1,
                });
            }
        },

        // Remove plant from cart
        removeItem: (state, action) => {
            state.items = state.items.filter(
                (item) => item.id !== action.payload
            );
        },

        // Update plant quantity
        updateQuantity: (state, action) => {
            const { id, quantity } = action.payload;

            const existingItem = state.items.find(
                (item) => item.id === id
            );

            if (existingItem) {
                existingItem.quantity = Math.max(1, quantity);
            }
        },
    },});

export const {
    addItem,
    removeItem,
    updateQuantity,
} = CartSlice.actions;

export default CartSlice.reducer;
