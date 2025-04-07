import { useEffect, useState } from "react";
import { createContext } from "react";
import axios from 'axios'

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});

  const [food_list, setFoodList] = useState([]);

  const fetchFoodList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      setFoodList(response.data.data);
    } catch (error) {
      console.error("Error fetching food list:", error);
    }
  };

  useEffect(() => {
    fetchFoodList();
  }, []);

  const addTocart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
    if(token){
      axios.post(`${url}/api/cart/add`,{itemId},{headers:{token}})
        .then(res=>console.log(res))
    }
  };

  const url = 'http://localhost:4000'

  const [token,setToken]  = useState("");

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
    if(token){
      const response = await axios.post(`${url}/api/cart/remove`, {itemId}, {headers:{token}})
    }
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = food_list.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };

  const loadCartData = async (token)=>{
    const response = await axios.post(`${url}/api/cart/get`, {}, {headers:{token}})
    setCartItems(response.data.cartData)
  }

  useEffect(()=>{
    async function loadData(){
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if(storedToken){
        setToken(storedToken)
        await loadCartData(storedToken)
      }
    }
    loadData();
  },[])

  const contextValue = {
    food_list,
    cartItems,
    setCartItems,
    addTocart,
    removeFromCart,
    getTotalCartAmount,
    url,
    token,
    setToken 
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
