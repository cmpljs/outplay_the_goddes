import {SET_RIVER, SET_TURN, SET_FLOP, SET_HAND, SET_STACKS, SET_POTSIZE} from './actionTypes';

const initialState = {
    yourHand: [null, null],
    oppHand: [null, null],
    flop: [null, null, null],
    turn: null,
    river: null,
    yourStack: 5000,
    oppStack: 10000,
    potSize: 0,
}

export const reducers = (state = initialState, action) => {
    switch (action.type) {

        case SET_HAND:
            return {...state, 
                yourHand: action.payload[1], 
                oppHand: action.payload[0]
            };

        case SET_RIVER:
            return {...state, river: action.payload};

        case SET_TURN:
            return {...state, turn: action.payload};

        case SET_FLOP:
            return {...state, flop: action.payload};

        case SET_STACKS:
            return {...state, 
                yourStack: action.payload[1],
                oppStack: action.payload[0]
            }

        case SET_POTSIZE:
            return {...state, potSize: action.payload}

        default: 
            return state;
    }
}