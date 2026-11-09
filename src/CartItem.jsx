
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    // Get numeric price from cost
    const getPrice = (cost) => {
        return Number(String(cost).replace(/[^0-9.]/g, '')) || 0;
    };

    // Calculate total cart amount
    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => {
            return total + getPrice(item.cost) * item.quantity;
        }, 0).toFixed(2);
    };

    // Continue shopping
    const handleContinueShopping = (e) => {
        e.preventDefault();

        if (onContinueShopping) {
            onContinueShopping(e);
        }
    };

    // Increase quantity
    const handleIncrement = (item) => {
        dispatch(updateQuantity({
            id: item.id,
            quantity: item.quantity + 1
        }));
    };

    // Decrease quantity
    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({
                id: item.id,
                quantity: item.quantity - 1
            }));
        }
    };

    // Remove item
    const handleRemove = (item) => {
        dispatch(removeItem(item.id));
    };

    // Calculate individual item total
    const calculateTotalCost = (item) => {
        return (getPrice(item.cost) * item.quantity).toFixed(2);
    };

    return (
        <div className="cart-container">

            <h2 style={{ color: 'black' }}>
                Total Cart Amount: ${calculateTotalAmount()}
            </h2>

            {cart.length === 0 ? (
                <h3>Your cart is empty!</h3>
            ) : (
                <div>
                    {cart.map((item) => (
                        <div className="cart-item" key={item.id}>

                            <img
                                className="cart-item-image"
                                src={item.image}
                                alt={item.name}
                            />

                            <div className="cart-item-details">

                                <div className="cart-item-name">
                                    {item.name}
                                </div>

                                <div className="cart-item-cost">
                                    {item.cost}
                                </div>

                                <div className="cart-item-quantity">

                                    <button
                                        className="cart-item-button cart-item-button-dec"
                                        onClick={() => handleDecrement(item)}
                                    >
                                        -
                                    </button>

                                    <span className="cart-item-quantity-value">
                                        {item.quantity}
                                    </span>

                                    <button
                                        className="cart-item-button cart-item-button-inc"
                                        onClick={() => handleIncrement(item)}
                                    >
                                        +
                                    </button>

                                </div>

                                <div className="cart-item-total">
                                    Total: ${calculateTotalCost(item)}
                                </div>

                                <button
                                    className="cart-item-delete"
                                    onClick={() => handleRemove(item)}
                                >
                                    Delete
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            )}

            <div className="continue_shopping_btn">

                <button
                    className="get-started-button"
                    onClick={handleContinueShopping}
                >
                    Continue Shopping
                </button>

                <br />

                <button className="get-started-button1">
                    Checkout
                </button>

            </div>

        </div>
    );
};
export default CartItem;