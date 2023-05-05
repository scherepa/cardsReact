import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet } from '../services/apiSer';

import CardsList from './CardsList';
import PageHeader from './common/pageHeader';
import Pagenation from './common/pagenation';
import { useLocation } from 'react-router-dom';


function Home(props){
  let [cards_ar,setCardsAr] = useState([]);
  var location = useLocation();

  useEffect(() => {
    const quries = new URLSearchParams(window.location.search);
    let page = quries.get("page") ? quries.get("page")-1 : 0;
    let url = API_URL+"/cards?reverse=yes&page="+page;
    doApi(url)
// props.location -> changes with route in address line
  },[location])

  const doApi = async(_url) => {
    let data = await doApiGet(_url);
    setCardsAr(data);
  }


  return(
    <div>
      <PageHeader title="Welcome to home page" />
      <Pagenation urlOfItemNum="/cards/totalCards" linkTo="?page="></Pagenation>
      <CardsList ar={cards_ar}/>
  </div> 
  )
}

export default Home