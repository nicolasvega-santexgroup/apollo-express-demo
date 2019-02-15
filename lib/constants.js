//cell
const cellStatus = {
    HITTED: -2,
    MISS: -1,
    WATER: 0,
};

const maxPositions = {
    X: 9,
    Y: 9,
};

//game
const gameActionTypes = {
    CELL_SELECTED: 'CELL_SELECTED',
    NEW_GAME: 'NEW_GAME',
    REQUEST_SHIPS_MATRIX: 'REQUEST_SHIPS_MATRIX',
    RECEIVE_SHIPS_MATRIX: 'RECEIVE_SHIPS_MATRIX',
};

const gameStatus = {
    WON: 'Won',
    LOST: 'Lost',
};

const defaultGameMatrix = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];


const shipStatus = {
    AFLOAT: 'Afloat',
    SUNKEN: 'Sunken',
};

const ships = [
    {
        id: 1,
        size: 4,
        status: shipStatus.AFLOAT,
    },
    {
        id: 2,
        size: 3,
        status: shipStatus.AFLOAT,
    },
    {
        id: 3,
        size: 3,
        status: shipStatus.AFLOAT,
    },
    {
        id: 4,
        size: 2,
        status: shipStatus.AFLOAT,
    },
    {
        id: 5,
        size: 2,
        status: shipStatus.AFLOAT,
    },
    {
        id: 6,
        size: 2,
        status: shipStatus.AFLOAT,
    },
    {
        id: 7,
        size: 1,
        status: shipStatus.AFLOAT,
    },
    {
        id: 8,
        size: 1,
        status: shipStatus.AFLOAT,
    },
    {
        id: 9,
        size: 1,
        status: shipStatus.AFLOAT,
    },
    {
        id: 10,
        size: 1,
        status: shipStatus.AFLOAT,
    },
];


export {
    cellStatus,
    maxPositions,
    gameActionTypes,
    gameStatus,
    defaultGameMatrix,
    ships
}