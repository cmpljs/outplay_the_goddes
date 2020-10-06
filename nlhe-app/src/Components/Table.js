import React, { useState } from 'react';
import Flop from './Flop';
import Turn from './Turn';
import River from './River';
import {createDeck, dealHand, dealBoard} from '../Calculations.js';
import { store } from '../Store/store';
import {setPotSizeAction, setStacksAction, setRiverAction, 
        setTurnAction, setFlopAction, setHandAction} from '../Store/actions'

export default function Table(props) {
    const [handOne, setHandOne] = useState([null, null]);
    const [handTwo, setHandTwo] = useState([null, null]);
    const [optionsDisabled, setOptionsDisabled] = useState(true);
    const [flopCards, setFlopCards] = useState([null, null, null]);
    const [turnCard, setTurnCard] = useState(null);
    const [riverCard, setRiverCard] = useState(null);
    const [oppComb, setOppComb] = useState('');
    const [yourComb, setYourComb] = useState('');
    const [buttonPos, setButtonPos] = useState(false);
    const [option, setOption] = useState('Push');

    const resetBoard = () => {
        setFlopCards([null, null, null]);
        setTurnCard(null);
        setRiverCard(null);
        setHandOne([null, null]);
        setHandTwo([null, null]);
        setOppComb('');
        setYourComb('');
    }

    const resetGame = () => {
        window.location.reload();
    }

    const play = () => {
        resetBoard();
        store.dispatch(setPotSizeAction(0));
        let oppStack = store.getState().oppStack;
        let yourStack = store.getState().yourStack;
        let pot = store.getState().potSize;

        if (!yourStack || !oppStack) {
            alert(`You ${yourStack ? 'won' : 'lost'}`);
            setTimeout(() => resetGame(), 1000);
            return;
        }

        if (!buttonPos) {
            pot += oppStack > yourStack ? yourStack : oppStack;
            oppStack = oppStack > yourStack ? oppStack - yourStack : 0;
            store.dispatch(setStacksAction([oppStack, yourStack]));
            store.dispatch(setPotSizeAction(pot));
            setOption('Call');
            setButtonPos(!buttonPos);
        } else {
            setOption('Push');
            setButtonPos(!buttonPos);
        }

        let currentDeck = createDeck();
        let handOne = dealHand(currentDeck);
        let handTwo = dealHand(currentDeck);
        let currentBoard = dealBoard(currentDeck);

        setHandOne(['gray_back', 'gray_back']);
        setHandTwo(handTwo);
        setOptionsDisabled(false);
        store.dispatch(setHandAction([handOne, handTwo]));
        store.dispatch(setFlopAction(currentBoard.next().value))
        store.dispatch(setTurnAction(currentBoard.next().value))
        store.dispatch(setRiverAction(currentBoard.next().value))
    }

    const renderBoard = () => {
        const flop = store.getState().flop;
        const turn = store.getState().turn;
        const river = store.getState().river;
        const oppHand = store.getState().oppHand;

        setTimeout(() => setHandOne(oppHand), 500);
        setTimeout(() => setFlopCards([...flop]), 2000);
        setTimeout(() => setTurnCard(turn), 3000);
        setTimeout(() => setRiverCard(river), 4000);
        setOptionsDisabled(true);
    }

    const defineWinner = () => {
        const Hand = require('pokersolver').Hand;
        let oppHand = [].concat(store.getState().flop,
            store.getState().turn, 
            store.getState().river, 
            store.getState().oppHand).toString().split(',');
        let yourHand = [].concat(store.getState().flop,
            store.getState().turn, 
            store.getState().river, 
            store.getState().yourHand).toString().split(',');

        oppHand = Hand.solve(oppHand);
        yourHand = Hand.solve(yourHand);

        setTimeout(() => setOppComb(oppHand.descr), 4000);
        setTimeout(() => setYourComb(yourHand.descr), 4000);

        let yourStack = store.getState().yourStack;
        let oppStack = store.getState().oppStack;
        let stackDiff = yourStack > oppStack ? yourStack - oppStack : oppStack - yourStack;
        let pot = store.getState().potSize;

        pot += yourStack + oppStack - stackDiff;
        console.log(`pot: ${pot}, stack diff: ${stackDiff}`)
        yourStack = pot/2 > yourStack ? 0 : yourStack - pot/2;
        oppStack = pot/2 > oppStack ? 0 : oppStack - pot/2;
        store.dispatch(setStacksAction([oppStack, yourStack]));
        store.dispatch(setPotSizeAction(pot));
        setButtonPos(!buttonPos);

        if (Hand.winners([oppHand, yourHand]).toString() === yourHand.toString()) {
            yourStack += pot;
        } else if (Hand.winners([oppHand, yourHand]).toString() === oppHand.toString()) {
            oppStack += pot;
        } else {
            yourStack += pot/2;
            oppStack += pot/2;
        }

        setTimeout(() => {
            store.dispatch(setStacksAction([oppStack, yourStack]));
            store.dispatch(setPotSizeAction(0));

        }, 4000);
    }

    const importAll = (r) => {
        let images = {};
        r.keys().forEach((item) => images[item.replace('./', '')] = r(item));
        return images;
    }

    const onFoldClick = () => {
        setButtonPos(!buttonPos);
        store.dispatch(setStacksAction([store.getState().oppStack + store.getState().potSize,
                                        store.getState().yourStack]));
        resetBoard();
        play();
    }

    const onPushClick = () => {
        renderBoard();
        defineWinner();
        setTimeout(() => play(), 10100);
    }

    const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

    return (
        <div>
            <button onClick={play} className='Temp-btn' disabled={!optionsDisabled}>Play</button>
           
            <div className='Hand-one'>
                <img className='Card' src={images[`${handOne[0]}.png`]} alt={handOne[0]}></img>
                <img className='Card' src={images[`${handOne[1]}.png`]} alt={handOne[1]}></img>
            </div>

            <div className='Hand-one-combination'>
                {oppComb}
            </div>

            <div className='Table-border'>

                <div className='Table-outside'>

                    <div className='Hand-one-stack'>
                        <p>
                        {store.getState().oppStack} { !store.getState().oppStack ? 'Eduard is All in!' : ''}
                        </p>
                    </div>

                    <div className='Table-inside'>
                        <Flop className='Flop' value={flopCards} importAll={importAll} />
                        <Turn className='Turn' value={turnCard} importAll={importAll}/>
                        <River className='River' value={riverCard} importAll={importAll}/>
                    </div>

                    <div className='Hand-two-stack'>
                        <p>
                        {store.getState().yourStack} {!store.getState().yourStack ? 'Your are All in!' : ''}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className='Pot-size'>
                {`pot: ${store.getState().potSize}`}
            </div>

            <div className='Hand-two-combination'>
                {yourComb}
            </div>

            <div className='Hand-two'>
                <img className='Card' src={images[`${handTwo[0]}.png`]} alt={handTwo[0]}></img>
                <img className='Card' src={images[`${handTwo[1]}.png`]} alt={handTwo[1]}></img>
            </div>

            <button className='Btn-fold' disabled={optionsDisabled} onClick={onFoldClick}>Fold</button>
            <button className='Btn-push' disabled={optionsDisabled} onClick={onPushClick}>{option}</button>
        </div>

    )
}