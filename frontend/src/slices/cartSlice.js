import { createSlice } from "@reduxjs/toolkit";

const initialState = {

    cartItems: []

};

const cartSlice = createSlice({

    name: "cart",

    initialState,

    reducers: {

        addToCart: (state, action) => {

            const item = state.cartItems.find(

                p => p._id === action.payload._id

            );

            if (item) {

                item.quantity += 1;

            }

            else {

                state.cartItems.push({

                    ...action.payload,

                    quantity: 1

                });

            }

        },

        removeFromCart: (state, action) => {

            state.cartItems = state.cartItems.filter(

                item => item._id !== action.payload

            );

        },

        increaseQty: (state, action) => {

            const item = state.cartItems.find(

                p => p._id === action.payload

            );

            if (item) {

                item.quantity++;

            }

        },

        decreaseQty: (state, action) => {

            const item = state.cartItems.find(

                p => p._id === action.payload

            );

            if (item && item.quantity > 1) {

                item.quantity--;

            }

        },

        clearCart: (state) => {

            state.cartItems = [];

        }

    }

});

export const {

    addToCart,

    removeFromCart,

    increaseQty,

    decreaseQty,

    clearCart

} = cartSlice.actions;

export default cartSlice.reducer;