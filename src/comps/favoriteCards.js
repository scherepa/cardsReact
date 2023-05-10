import React, { useEffect, useState } from 'react';
import { API_URL, doApiMethod } from '../services/apiSer';


import CardsList from './CardsList';
import PageHeader from './common/pageHeader';
import CardSkel2 from './common/CardSkel2';

function FavoriteCards(props){
  let [cards_ar,setCardsAr] = useState([]);
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = API_URL + "/users/userCardsFav";
    doApi(url)
  },[])

  const doApi = async(_url) => {
    try{
    let data = await doApiMethod(_url,"GET");
    setCardsAr(data);
    setLoading(false);
    }
    catch(err) {
    }
  }

  return(
    <>
      <PageHeader title="Your favorite business cards" />
      { loading ?
      <CardSkel2 />
      : <CardsList ar={cards_ar}/>}   
    </> 
  )
}

export default FavoriteCards