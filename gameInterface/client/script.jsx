const Stars = (props) => {
  const numStars = 1 + Math.floor(Math.random() * 9);
  let stars = [];
  
  for(let i = 0; i < numStars; i++) {
    stars.push(<span key={i} className="glyphicon glyphicon-star"></span>);
  }
  return (
    <div className="col-xs-5">
      {stars}
    </div>
  );
};

const Button = (props) => {
  return (
    <div className="col-xs-2">
      <button>=</button>
    </div>
  )
};

const Answer = (props) => {
  return (
    <div className="answer col-xs-5">
      <span>4</span>
      <span>5</span>
    </div>
  )
};

const Numbers = (props) => {
  let nums = Numbers.selections.map(i => <span key={i}>{i}</span>);
  
  return(
    <div className="card text-center">
      <div>
        {nums}
      </div>
    </div>
  );
};

Numbers.selections =  [...Array(9)].map((d, i) => ++i);

class App extends React.Component {
  render() {
    return (
      <div className="container">
        <h3>Play Nine</h3>
        <hr/>
        <div className="row">
          <Stars/>
          <Button/>
          <Answer/>
        </div>
        <br/>
        <Numbers/>
      </div>
    );
  }
}


ReactDOM.render(<App/>, document.getElementById('root'));