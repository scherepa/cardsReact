import { toast } from "react-toastify";
import { API_URL, doApiMethod } from "./apiSer";

let user = {};


export const updateUserData = async () => {
  if (localStorage["tok"]) {
    //if there is a token and it is valid we will  get info from it
    //otherwise we will redirect to login page
    //for redirecting we will clean tok from localstorage and set user{}
    let url = API_URL + "/users/userInfo";
    try{
      let data = await doApiMethod(url,"GET");
      if(data._id){
        user = data
      }
      else{
        localStorage.removeItem("tok");
        user = {}
      }
      return user
    }
    catch(err){
      localStorage.removeItem("tok");
      user = {};
      return user
    }
  }
  else{
    user = {}
    return user;
  }
}



export const getUserData = () => {
  return user;
}
//updates user favorite cards array
export const updateUserCardsAddFav = async(_bizCardNumber) => {
  //no same cards in array
  let temp_ar  = [...user.cards,_bizCardNumber];
   temp_ar = new Set([...temp_ar]);
  user.cards.splice(0, user.cards.length, ...temp_ar);
  
  let url = API_URL+"/users/cards"
  try{

    let data = await doApiMethod(url,"PATCH",{cards:user.cards});
     //in case of success we will get 1 in response
      if(data.n == 1){
      toast.success("Cards fav update")
    }
    return data;
  }
  catch(err){
    console.log(err)
    toast.error("There problem , try again later !")
    throw err
  }
}

//remove card from favorite cards
export const removeUserCardFav = async(_bizCardNumber) => {
  //copy everything but the card we want to delete into temp_ar
  let temp_ar  = user.cards.filter(item => item != _bizCardNumber)
  user.cards.splice(0, user.cards.length, ...temp_ar);
  
  let url = API_URL+"/users/cards"
  try{

    let data = await doApiMethod(url,"PATCH",{cards:user.cards});
//in case of success we will get 1 in response    
  if(data.n == 1){
      toast.warning("Cards fav removed")
    }
    return data;
  }
  catch(err){
    console.log(err)
    toast.error("There problem , try again later !")
    throw err
  }
}