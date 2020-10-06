import React from 'react';

export default function River(props) {
    const images = props.importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));
    
    return (
        <div className={props.className} >
            <img className='Card' src={images[`${props.value}.png`]} alt={props.value} />
        </div>
    )
}