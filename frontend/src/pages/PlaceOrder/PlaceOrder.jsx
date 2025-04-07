import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../Context/Storecontext'
import axios from 'axios'

const PlaceOrder = () => {

  const {getTotalCartAmount,token,food_list,cartItems,url} = useContext(StoreContext)

  const [data,setData] = useState({
    name:"",
    lastname:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:"",
  })

  const onChangeHandler = (e) => {
    const {name,value} = e.target
    setData(data=>({...data,[name]:value}))
  }

  const placeOrder= async (e)=>{
    e.preventDefault()
    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        orderItems.push(item)
      }
    })
    let orderData = {
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }
    let response = await axios.post(url+'/api/order/place',orderData,{headers:{token}})
    if(response.data.success){
      setData({
        name:"",
        lastname:"",
        email:"",
        street:"",
        city:"",
        state:"",
        zipcode:"",
        country:"",
        phone:"",
      })
      for(const key in cartItems){
        if(cartItems.hasOwnProperty(key)){
          cartItems[key]=0
        }
      }
    }else{
      alert("Error")
    }
  }

  return (
    <form className='place-order'>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input name="firstname" onChange={onChangeHandler} value={data.firstname} type="text" placeholder='First Name' required/>
          <input name="lastname" onChange={onChangeHandler} value={data.lastnamename} type="text" placeholder='Last Name' required/>
        </div>
        <input name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email Address' required/>
        <input name="street" onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'  required/>
        <div className="multi-fields">
          <input name="city" onChange={onChangeHandler} value={data.city} type="text" placeholder='City' required/>
          <input name="state" onChange={onChangeHandler} value={data.state} type="text" placeholder='State' required/>
        </div>
        <div className="multi-fields">
          <input name="zipcode" onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip-Code' required/>
          <input name="country" onChange={onChangeHandler} value={data.country} type="text" placeholder='Country' required/>
        </div>
        <input name="phone" onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone' required />
      </div>
      <div className="place-order-right">
      <div className="cart-total">
          <h2>Cart Total</h2>
          <div className="cart-total-details">
            <div className="cart-total-details-item">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details-item">
              <p>Delivery Fee</p>
              <p> ${2} </p>
            </div>
            <hr />
            <div className="cart-total-details-item">
              <b>Total</b>
              <b> ${getTotalCartAmount() + 2} </b>
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO Payment</button>
        </div>
        </div>
    </form>
  )
}

export default PlaceOrder
