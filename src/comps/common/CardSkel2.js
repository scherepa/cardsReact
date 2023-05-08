import React,{Component} from 'react';
import CardSkelBody from './CardSkelBody';

class CardSkel2 extends Component{
    render() {
        return (
            <div className="row">
                <CardSkelBody />
                <CardSkelBody />
                <CardSkelBody />
                <CardSkelBody />
                <CardSkelBody />
                <CardSkelBody />
        </div>
        )
    }
}

export default CardSkel2
