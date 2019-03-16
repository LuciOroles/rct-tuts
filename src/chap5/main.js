import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";


// v1 STAR MATCH - Starting Template

const PlayAgain = (props) => {

    return (
        <div className="game-done" >
            <div className="message" style={{
                color: props.gameStatus==='lost'? 'red' : 'green'
            }} >
            { props.gameStatus === 'lost' ? 'Game Over' : 'Nice'}
            </div>
            <button onClick={props.onClick} >Play again</button>
        </div>)
}




const NumberX = props => (
    <button className="number"
        style={{
            backgroundColor: colors[props.status]
        }}
        onClick={() => props.onClick(props.number, props.status)} >
        {props.number}</button>
)

const StarsDisplay = props => (
    <React.Fragment>
        {utils.range(1, props.count).map(startID => <div key={startID} className="star"></div>)}
    </React.Fragment>
)

const Game = (props) => {
    const [stars, setStarts] = useState(utils.random(1, 9));
    const [availabeNums, setAvailabeNums] = useState(utils.range(1, 9));
    const [candidateNums, setCandidateNums] = useState([]);
    const candidatesAreWrong = utils.sum(candidateNums) > stars;
    const numberStatus = (number) => {
        if (!availabeNums.includes(number)) {
            return 'used';
        }
        if (candidateNums.includes(number)) {
            return candidatesAreWrong ? 'wrong' : 'candidate';
        }
        return 'available'
    }
    const [secondsLeft, setSecondsLeft] = useState(20);

    const resetGame = () => {
        setStarts(utils.random(1, 9));
        setAvailabeNums(utils.range(1, 9))
        setCandidateNums([]);

    }

    const onNumberClick = (number, currentStatus) => {

        if (currentStatus === 'used' || gameStats!=='active') return;
        //candidate numbers
        const newCandidateNums = (currentStatus === 'available' ? candidateNums.concat(number) : candidateNums.filter(cn => cn !== number));

        if (utils.sum(newCandidateNums) !== stars) {
            setCandidateNums(newCandidateNums)
        } else {
            const newAvailabeNums = availabeNums.filter(n => !newCandidateNums.includes(n));
            setAvailabeNums(newAvailabeNums);
            setCandidateNums([]);
            // redraw from available nr of stars
            setStarts(utils.randomSumIn(newAvailabeNums, 9));
        }

    }
    const gameStats =  availabeNums.length === 0 ? 'won' : secondsLeft === 0? 'lost' : 'active';
    useEffect(() => {
        console.log('Render....');
        if (secondsLeft > 0 && availabeNums.length>0) {
            const timeout= setTimeout(() => {
                setSecondsLeft(secondsLeft - 1);

            }, 1000)
            return ()=>clearTimeout(timeout);
        }
    })
    return (
        <div className="game">
            <div className="help">
                Pick 1 or more numbers that sum to the number of stars
        </div>
            <div className="body">
                <div className="left">
                    {
                        gameStats!=='active' ? (
                            <PlayAgain onClick={props.startNewGame} gameStatus={gameStats} />
                        ) : (
                                <StarsDisplay count={stars} />
                            )
                    }

                </div>
                <div className="right">
                    {utils.range(1, 9).map(number =>
                        <NumberX
                            key={number}
                            status={numberStatus(number)}
                            number={number}
                            onClick={onNumberClick} />
                    )}
                </div>
            </div>
            <div className="timer">Time Remaining: {secondsLeft}</div>
        </div>
    );
};

// Color Theme
const colors = {
    available: 'lightgray',
    used: 'lightgreen',
    wrong: 'lightcoral',
    candidate: 'deepskyblue',
};

// Math science
const utils = {
    // Sum an array
    sum: arr => arr.reduce((acc, curr) => acc + curr, 0),

    // create an array of numbers between min and max (edges included)
    range: (min, max) => Array.from({ length: max - min + 1 }, (_, i) => min + i),

    // pick a random number between min and max (edges included)
    random: (min, max) => min + Math.floor(max * Math.random()),

    // Given an array of numbers and a max...
    // Pick a random sum (< max) from the set of all available sums in arr
    randomSumIn: (arr, max) => {
        const sets = [[]];
        const sums = [];
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0, len = sets.length; j < len; j++) {
                const candidateSet = sets[j].concat(arr[i]);
                const candidateSum = utils.sum(candidateSet);
                if (candidateSum <= max) {
                    sets.push(candidateSet);
                    sums.push(candidateSum);
                }
            }
        }
        return sums[utils.random(0, sums.length)];
    },
};

const StarMatch = ()=>{
    const [gameId, setGameId]= useState(1)
    return <Game key={gameId} startNewGame={()=> setGameId(gameId+1)} />;
}

document.addEventListener("DOMContentLoaded", function () {
    ReactDOM.render(<StarMatch />, document.getElementById("mount"));
});
