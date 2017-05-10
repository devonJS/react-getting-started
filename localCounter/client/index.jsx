class Button extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = () => {
      this.props.onClickFunction(this.props.incrementValue)
    };
  }
  
  render() {
    return (
      <button onClick={this.handleClick}>+{this.props.incrementValue}</button>
    );
  }
};

const Result = (props) => {
  return(
    <div>{props.count}</div>
  );
}

class App extends React.Component {
  constructor(props) {
      super(props);
      this.state = {counter: 0};
      this.incrementCounter = (inc) => {
        this.setState((prevState) => ({
          counter: prevState.counter + inc
        }));
      } 
  }
  render() {
    return(
      <div>
        <Button incrementValue={1} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={5} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={10} onClickFunction={this.incrementCounter}/>
        <Button incrementValue={100} onClickFunction={this.incrementCounter}/>
        <Result count={this.state.counter}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'));