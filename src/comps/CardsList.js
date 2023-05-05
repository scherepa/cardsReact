import React, { useEffect, useState } from 'react';
import { getUserData, removeUserCardFav, updateUserCardsAddFav } from '../services/userSer';

function CardsList(props) {

  let [userData, setUserData] = useState();
  let [update,forceUpdate] = useState(1)

  useEffect(() => {
    // getting user info to show relevant cards for example
    setUserData(getUserData());
  }, [])


  const showBtnFav = (item) => {
    // adding and removing favorites
    // if there is no such card in user favorite cards:
    if (!userData.cards.includes(item.bizNumber)) {
      return (
        <button onClick={async () => {
          // updates user cards array
          await updateUserCardsAddFav(item.bizNumber);
          forceUpdate(update + 1);
        
        }} className="btn btn-success">+ fav</button>
      )
    }
    //if there is such card and the user wants to remove it 
    //the button is orange for removing card from user favorite cards array
    else {
      return (<button onClick={async() => {
        await removeUserCardFav(item.bizNumber)
        forceUpdate(update+1);
      }}  className="btn btn-warning">- fav</button>)
    }
  }

  return (
    <div className="row">
      {props.ar.map(item => {
        let bg = item.bizImage?.length > 2 ? item.bizImage : '/images/default.jpg'
        return (
          <div key={item._id} className="col-lg-4 p-3">
            <div className="border">
              {/* style for cards can be found in card.css */}
              <div className="biz_img" style={{
                backgroundImage: `url(${bg})`
              }} >

              </div>
              <article className="p-3">
                <h2>{item.bizName}</h2>
                <p>{item.bizDescription}</p>
                <hr />
                <div><strong>Phone:</strong> {item.bizPhone}</div>
                <div><strong>Address:</strong> {item.bizAddress}</div>
                <div><strong>Biz number:</strong> {item.bizNumber}</div>
                {userData._id ? showBtnFav(item) :
                  <small className="text text-danger">* log in to add to favorite</small>}
              </article>
            </div>
          </div>
        )
      })}
    </div>

  )
}

export default CardsList