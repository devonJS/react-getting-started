var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

const Stars = (props) => {
  let stars = [];
  
  for(let i = 0; i < props.numStars; i++) {
    stars.push(<span key={i} className="glyphicon glyphicon-star"></span>);
  }
  return (
    <div className="col-xs-5">
      {stars}
    </div>
  );
};

const Button = (props) => {
  let button;
  
  switch(props.isCorrectAnswer) {
    case true:
      button = <button 
                  className="btn btn-success"
                  onClick={props.acceptAnswer}><span className="glyphicon glyphicon-ok"></span>
               </button>
      break;
    case false:
      button = <button className="btn btn-danger"><span className="glyphicon glyphicon-remove"></span></button>
      break;
    default: 
      button =  <button className="btn" 
                        disabled={props.selectedNumbers.length === 0} 
                        onClick={props.checkForCorrectAnswer}>=
                </button>

  }
  return (
    <div className="col-xs-2 text-center">
      {button}
      <br/>
      <br/>
      <button className="btn btn-warning btn-sm" 
              onClick={props.resetStars}
              disabled={props.resets === 0}><span className="glyphicon glyphicon-refresh"></span>  {props.resets}</button>
    </div>
  )
};

const Answer = (props) => {
  return (
    <div className="answer col-xs-5">
      {props.selectedNumbers.map((num, i) => <span key={i} onClick={() => props.removeSelectedNumber(num)}>{num}</span>)}
    </div>
  )
};

const Numbers = (props) => {
  const getNumberClass = (num) => {
    if(props.usedNumbers.indexOf(num) > -1) {
      return 'used';
    }
    
    if(props.selectedNumbers.indexOf(num) > -1) {
      return 'selected';
    } 
  } 
   
  return(
    <div className="well well-sm text-center">
      <div>
        {Numbers.selections.map(i => 
          <span 
            className={getNumberClass(i)} 
            key={i}
            onClick={() => props.addSelectedNumber(i)}>{i}
          </span>)}
      </div>
    </div>
  );
};

Numbers.selections =  [...Array(9)].map((d, i) => ++i);

const Status = (props) => {
  return(
    <div className="text-center">
      <h2>{props.gameStatus}</h2>
      <button className="btn btn-default" onClick={props.resetGame}>Play Again</button>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);
    const randomStars = () => (1 + Math.floor(Math.random() * 9));
    const initializedState = {
      selectedNumbers: [],
      usedNumbers: [],
      numStars: randomStars(),
      isCorrectAnswer: null,
      resets: 5,
      gameStatus: ""
    }
    
    this.state = initializedState
    
    this.addSelectedNumber = (num) => {
      if(this.state.selectedNumbers.indexOf(num) === -1) {
        this.setState(prevState => ({
          isCorrectAnswer: null,
          selectedNumbers: prevState.selectedNumbers.concat([num])
        }));
      }
    }
    
    this.removeSelectedNumber = (num) => {
      this.setState(prevState => ({
        isCorrectAnswer: null,
        selectedNumbers: prevState.selectedNumbers.filter(d => d !== num)
      }));
    }
    
    this.checkForCorrectAnswer = () => {
      this.setState(prevState => ({
        isCorrectAnswer: prevState.numStars === prevState.selectedNumbers.reduce((acc, d) => acc + d, 0)
      }));
    }
    
    this.acceptAnswer = () => {
      this.setState(prevState => ({
        usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        numStars: randomStars(),
        isCorrectAnswer: null
      }), this.checkGameStatus);
    }
    
    this.resetStars = () => {
      if(this.state.resets > 0) {
        this.setState(prevState => ({
          numStars: randomStars(),
          selectedNumbers: [],
          isCorrectAnswer: null,
          resets: prevState.resets - 1
        }), this.checkGameStatus);
      }
    }
    
    this.solutionsAvailable = ({numStars, usedNumbers}) => {
      const possibleNumbers = [...Array(9)].map((d, i) => ++i).filter(d => usedNumbers.indexOf(d) === -1);
      return possibleCombinationSum(possibleNumbers, numStars);
    }
    
    this.checkGameStatus = () => {
      this.setState(prevState => {
        if(prevState.usedNumbers.length === 9) {
          return {gameStatus: 'You Win! Nice!'};
        }
        if(prevState.resets === 0 && !this.solutionsAvailable(prevState)) {
          return {gameStatus: 'Game Over!'}
        }
      })
    }
    
    this.resetGame = () => {
      this.setState(initializedState);
    }
  }
  
  render() {
    const {
      numStars, 
      selectedNumbers, 
      usedNumbers, 
      isCorrectAnswer, 
      resets,
      gameStatus
    } = this.state;
    
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr/>
        <div className="row">
          <Stars numStars={numStars}/>
          <Button 
            selectedNumbers={selectedNumbers}
            checkForCorrectAnswer={this.checkForCorrectAnswer}
            isCorrectAnswer={isCorrectAnswer}
            acceptAnswer={this.acceptAnswer}
            resetStars={this.resetStars}
            resets={resets}
          />
          <Answer 
            selectedNumbers={selectedNumbers}
            removeSelectedNumber={this.removeSelectedNumber}
          />
        </div>
        <br/>
        {gameStatus !== "" ?
          <Status 
            gameStatus={gameStatus}
            resetGame={this.resetGame}
          /> :
          <Numbers 
            selectedNumbers={selectedNumbers}
            usedNumbers={usedNumbers}
            addSelectedNumber={this.addSelectedNumber}
          />
        }
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));