import './css/styles.scss';

// This function stores our state.
const storeState = () => {
    let currentState = {};
    return (stateChangeFunction = state => state) => {
        const newState = stateChangeFunction(currentState);
        currentState = { ...newState };
        return newState;
    };
};

const stateControl = storeState();

// This is a function factory. 
// We can easily create more specific functions that 
// alter a plant's soil, water, and light to varying degrees.
const changeState = (prop) => {
    return (value) => {
        return (state) => ({
            ...state,
            [prop]: (state[prop] || 0) + value
        });
    };
};

const feed = changeState("soil")(1);
const worm = changeState("soil")(-1);
const hydrate = changeState("water")(1);
const drought = changeState("water")(-1);
const sunny = changeState("light")(1);
const cloudy = changeState("light")(-1);


const createPlant = (name, intro, ability = []) => {
    return {
        name: name,
        intro: intro,
        soil: 0,
        water: 0,
        light: 0,
        ability: [...ability]
    };
};

// Ability functions
const repelWorm = (value) => (state) => ({
    ...state,
    soil: (state.soil || 0) + value
});
  
const absorbWater = (value) => (state) => ({
    ...state,
    water: (state.water || 0) + value
});
  
const photosynthesize = (value) => (state) => ({
    ...state,
    light: (state.light || 0) + value
});

window.onload = function () {

    function getRandomPlants() {
        const random = Math.floor(Math.random() * 3);
        let plant = {};
        if (random === 0) {
            plant = createPlant('Petunias', 'repel worms', [repelWorm(3)]);
        } else if (random === 1) {
            plant = createPlant('Prim Rose', 'absorb more water', [absorbWater(3)]);
        } else if (random === 2) {
            plant = createPlant('Sorghum', 'photosynthesize more efficiently', [photosynthesize(3)]);
        } else {
            return;
        }
        const initialState = plant.ability.reduce((state, abilityFn) => abilityFn(state), {});
        plant = { ...plant, ...initialState };
        return plant;
    }

    function getPlantsIntro(obj) {
        if (!obj) {
            return `Unable to retrieve plant data this time.`;
        }
        const plant = obj.name;
        const intro = obj.intro;
        return `Your plant is ${plant}. ${plant} is well known for its ability to ${intro}.`;
    }

    document.getElementById('1P-button').onclick = function () {
        const plantObj = getRandomPlants();
        document.getElementById('1P-plant').innerText = getPlantsIntro(plantObj);
        document.getElementById('1P-plantName').innerText = plantObj.name;
        document.getElementById('1P-soil').innerText = plantObj.soil;
        document.getElementById('1P-water').innerText = plantObj.water;
        document.getElementById('1P-light').innerText = plantObj.light;
    };
    document.getElementById('2P-button').onclick = function () {
        const plantObj = getRandomPlants();
        document.getElementById('2P-plant').innerText = getPlantsIntro(plantObj);
        document.getElementById('2P-plantName').innerText = plantObj.name;
        document.getElementById('2P-soil').innerText = plantObj.soil;
        document.getElementById('2P-water').innerText = plantObj.water;
        document.getElementById('2P-light').innerText = plantObj.light;
    };
    document.getElementById('start').onclick = function () {
        document.getElementById('pickPlants').classList.add('hidden');
        document.getElementById('game').classList.remove('hidden');
    };

    function buttonAction(success, failure, elementId, resultId, stateProperty, gain, loss) {
        const element = document.getElementById(elementId);
        const result = document.getElementById(resultId);
        const random = Math.floor(Math.random() * 3);
        let newState;
        if (random === 0) {
            newState = stateControl(failure);
            result.innerText = loss;
        } else {
            newState = stateControl(success);
            result.innerText = gain;
        }
        element.innerText = newState ? newState[stateProperty] : '';
    }

    document.getElementById('1P-feed').onclick = function () {
        buttonAction(
            feed,
            worm,
            '1P-soil',
            '1P-result',
            'soil',
            'Yay! Successfully added healthy soil.',
            'Oops! Unexpected worm came by!'
        );
    };
    document.getElementById('1P-hydrate').onclick = function () {
        buttonAction(
            hydrate,
            drought,
            '1P-water',
            '1P-result',
            'water',
            'Yay! Successfully watered your plant.',
            'Oh no. We are experiencing drought in the area.'
        );
    };
    document.getElementById('1P-photo').onclick = function () {
        buttonAction(
            sunny,
            cloudy,
            '1P-light',
            '1P-result',
            'light',
            'The sun came out! Your plant is photosynthesizing...',
            'Darn it. We have not seen the sun come up yet.'
        );
    };
    document.getElementById('2P-feed').onclick = function () {
        buttonAction(
            feed,
            worm,
            '2P-soil',
            '2P-result',
            'soil',
            'Yay! Successfully added healthy soil.',
            'Oops! Unexpected worm came by!'
        );
    };
    document.getElementById('2P-hydrate').onclick = function () {
        buttonAction(
            hydrate,
            drought,
            '2P-water',
            '2P-result',
            'water',
            'Yay! Successfully watered your plant.',
            'Oh no. We are experiencing drought in the area.'
        );
    };
    document.getElementById('2P-photo').onclick = function () {
        buttonAction(
            sunny,
            cloudy,
            '2P-light',
            '2P-result',
            'light',
            'The sun came out! Your plant is photosynthesizing...',
            'Darn it. We have not seen the sun come up yet.'
        );
    };
};