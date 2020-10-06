import {SET_RIVER, SET_TURN, SET_FLOP, SET_HAND, SET_STACKS, SET_POTSIZE} from './actionTypes';

export const setRiverAction = payload => {
    return {type: SET_RIVER, payload}
}

export const setTurnAction = payload => {
    return {type: SET_TURN, payload}
}

export const setFlopAction = payload => {
    return {type: SET_FLOP, payload}
}

export const setHandAction = payload => {
    return {type: SET_HAND, payload}
}

export const setStacksAction = payload => {
    return {type: SET_STACKS, payload}
}

export const setPotSizeAction = payload => {
    return {type: SET_POTSIZE, payload}
}