import React, { useContext } from 'react'
import './FoodItem.css'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../Context/Storecontext';


const FoodItem = ({id,name,price,description,image}) => {

  const {cartItems, addTocart, removeFromCart,url} = useContext(StoreContext);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-image' src={url+"/images/"+image} alt="" />
        {!cartItems[id]
            ?<img className='add' onClick={()=>addTocart(id)} src={assets.add_icon_white}/>
            :<div>
              <div className="food-item-counter">
                <img onClick={()=>removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                {cartItems[id]}
                <img onClick={()=>addTocart(id)} src={assets.add_icon_green} alt="" />
              </div>
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="" />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  )
}

export default FoodItem
