import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home } from './component/Home';
import { CustomeNavbar } from './component/CustomeNavbar';
import { AllFood } from './component/AllFood';
import { FoodCard } from './component/FoodCard';
import { MFBNavBar } from './component/MFBNavBar';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AddFastFood } from './component/AddFastFood';
import { CartFood } from './component/CartFood';
import { Register } from './component/Register';
import Login from './component/Login';
import { ShowAllFastFood } from './component/ShowAllFastFood';
import { UpdateFood } from './component/UpdateFood';
import { Footer } from './component/Footer';
import {ErrorElement} from "./component/ErrorElement"
import { UserData } from './component/UserData';


function App() {

//store food details...............................................
 const [FastFoods,setFastFoods]=useState([]);
 const [cart ,setCart]=useState([])
 let flag=false;


 //for cart item............................................
 const addToCart = (data) => {
  for(let item of cart)
  {
    if(data.id==item.id)
    {
      flag=true;
      break;
    }
  }
  if(!flag)
  {
     setCart([...cart, { ...data, qty: 1 }])
     alert("item added to cart")
  }
  else{
     alert("item already present")
  }
}



//remove cart item...............................................................
const removeCartItem =(id)=>{
 const newCartItem=cart.filter((cartitem)=>cartitem.id!==id);
 setCart(newCartItem);
}

//  useEffect(()=>{
//   console.log("cart item="+cart)
//  },[cart])

 //get food data..............................................................
  useEffect(() => {
    axios.get(`http://localhost:8080/getFastFoodDeatils`).then(
      (response) => {
        //console.log(response.data);
        setFastFoods(response.data);
        //console.log("--" + FastFoods);
    
      },
      (error) => {
        alert(error);
        //console.log(error);
      }
    );
  },[]);

  //this method call when any change in FastFoods item  
    // useEffect(() => {
    //   console.log(">> "+ FastFoods);
    // }, [FastFoods]);
  



  return (
    <div >
     <CustomeNavbar count={cart.length}/>
     
     {/* <pre>{JSON.stringify(cart, null, 2)}</pre> */}
     <Routes >
     <Route exact path='/Home' element={<Home />}></Route>
     <Route exact path='/AllFood' element={<AllFood  foods={FastFoods} 
         addToCart={addToCart}/>}></Route>
     <Route exact path='/CartFood' element={<CartFood  foods={cart} resetcart={setCart} removeCartItem={removeCartItem} />}></Route>
     <Route exact path='/FoodCard' element={<FoodCard/>}></Route>
     <Route exact path='/AddFastFood' element={<AddFastFood/>}></Route>
     <Route exact path='/Register' element={<Register/>}></Route>
     <Route exact path='/Login' element={<Login/>}></Route>
     <Route exact path='/ShowAllFastFood' element={<ShowAllFastFood/>}></Route>
     <Route exact path='/UpdateFood/:id' element={<UpdateFood/>}></Route>
     <Route exact path='/UserData' element={<UserData/>}></Route>
     <Route path='*' element={<ErrorElement />}/>
     </Routes>
     <Footer/>
    
    </div>
  );
}

export default App;
