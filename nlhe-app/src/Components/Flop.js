import React from 'react';


export default function Flop(props) {
    const cards = props.value;
    const images = props.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

    return (
        <div className={props.className} >
            <img className='Card' src={images[`${cards[0]}.png`]} alt={props.value[0]} />
            <img className='Card' src={images[`${cards[1]}.png`]} alt={props.value[1]} />
            <img className='Card' src={images[`${cards[2]}.png`]} alt={props.value[2]} />
        </div>
    )
}