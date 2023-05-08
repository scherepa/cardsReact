import React,{Component} from 'react';

class CardSkelBody extends Component{
    render(){
        return(
            <div className="col-lg-4 col-md-6 col-sm-8 col-12 p-3">
            <div className="border card">
              {/* style for cards can be found in card.css */}
              <div className="biz_img" style={{backgroundColor: `#f3f3f3`}}></div>
              <article className="card-body">
                <div className="row">
                  <div className="col-12 px-6 py-1" style={{ backgroundColor: `#f3f3f3`}}></div> 
                  <div className="col-12 px-6 py-1" style={{backgroundColor: `#f3f3f3`}}></div>
                </div>
                <hr />
                <div className="row my-2">
                  <div className="col-6 px-6 py-1" style={{backgroundColor: `#f3f3f3`}}></div>
                </div>
              </article>
            </div>
          </div> 
        )
}
}

export default CardSkelBody