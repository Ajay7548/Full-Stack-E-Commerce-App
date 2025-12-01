import { createContext, useContext, useEffect, useState } from "react";
// import { products as initialProducts } from "../assets/frontend_assets/assets";
import { currency, delivery_fee } from "./index";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios'


// Create the ShopContext with a default value of null
export const ShopContext = createContext(null);
// This will store and share the shop-related data across multiple components

// Custom hook to easily access ShopContext from any component
export const useShop = () => {
    return useContext(ShopContext); // Allows any component to access shop data
};

// export const backendUrl = import.meta.env.VITE_BACKEND_URL

// The main provider component that wraps the app and provides context data
export const ShopProvider = ({ children }) => {
    // Initialize the products state with the imported product list
    // const [products, setProducts] = useState(initialProducts);
    const [search, setSearch] = useState('')
    const [showSearch, setShowSearch] = useState(false)
    const [cartItems, setCartItems] = useState({})
    const [subtotal, setSubtotal] = useState(0);
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('')

    const navigate = useNavigate()

    const [wishlistItems, setWishlistItems] = useState({});

    useEffect(() => {
        let total = 0;
        for (const itemID in cartItems) {
            for (const size in cartItems[itemID]) {
                const product = products.find((p) => p._id === itemID);
                if (product) {
                    total += product.price * cartItems[itemID][size];
                }
            }
        }
        setSubtotal(total); // ✅ Update subtotal
    }, [cartItems, products]);

    const addToCart = async (itemID, size) => {
        let cardData = structuredClone(cartItems)

        //Providing alert if size not selected
        if (!size) {
            toast.error('Select Product Size')
            return
        }

        if (cardData[itemID]) {
            if (cardData[itemID][size]) {
                cardData[itemID][size] += 1
            }
            else {
                cardData[itemID][size] = 1
            }
        } else {
            cardData[itemID] = {}
            cardData[itemID][size] = 1
        }
        setCartItems(cardData)//for saving cardData

        if (token) {
            try {
                await axios.post('/api/cart/add', {
                    itemID,
                    size,
                }, { headers: { token } })
            } catch (error) {
                console.error(error)
                toast.error(error.message)
            }
        }

    }

    // Wishlist Logic
    const addToWishlist = async (itemId) => {
        let wishlistData = structuredClone(wishlistItems);
        
        if (wishlistData[itemId]) {
            delete wishlistData[itemId];
            toast.info("Removed from Wishlist");
        } else {
            wishlistData[itemId] = true;
            toast.success("Added to Wishlist");
        }
        setWishlistItems(wishlistData);

        // Optional: Persist to backend if needed
        // if (token) { ... }
    };

    const getCartCount = () => {
        let totalCount = 0
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) totalCount += cartItems[items][item]

                } catch (error) {
                    console.log(error)
                }
            }
        }
        return totalCount
    }

    const updateQuantity = async (itemID, size, quantity) => {

        let cardData = structuredClone(cartItems)

        cardData[itemID][size] = quantity

        setCartItems(cardData)

        if (token) {
            try {
                await axios.post('/api/cart/update', { itemID, size, quantity }, { headers: { token } })
            } catch (error) {
                console.error(error)
                toast.error(error.message)
            }
        }
    }

    const getProductData = async () => {
        try {
            const response = await axios.get('/api/products/listProduct')
            console.log(response.data);
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const res = await axios.post('/api/cart/get', {}, { headers: { token } })
            if (res.data.success) {
                setCartItems(res.data.cardData)
            }
            console.log("BACKEND CART SHAPE ===>", res.data.cardData);
        } catch (error) {
            console.error(error)
            toast.error(error.message)
        }

    }

    const getCartAmount = () => {
        let total = 0;
        for (const itemID in cartItems) {
            for (const size in cartItems[itemID]) {
                const product = products.find((p) => p._id === itemID);
                if (product) {
                    total += product.price * cartItems[itemID][size];
                }
            }
        }
        return total;
    };

    useEffect(() => {
        getProductData()
    }, [])

    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getUserCart(localStorage.getItem('token'))
        }
    }, [])

    // Create an object with all the values to be shared in the context
    const value = {
        products,      // List of available products
        setProducts,   // Function to update the products list
        currency,      // Currency symbol
        delivery_fee,  // Delivery fee amount
        search, setSearch, showSearch, getCartAmount, setShowSearch, cartItems, addToCart,
        getCartCount, updateQuantity, navigate, subtotal, token, setToken, setCartItems,
        wishlistItems, addToWishlist
    };

    // Return the provider component, passing the value to all children
    return (
        <ShopContext.Provider value={value}>
            {children}
            {/* "children" represents all components wrapped inside <ShopProvider> */}
        </ShopContext.Provider>
    );
};

