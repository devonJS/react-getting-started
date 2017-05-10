const Card = (props) => {
  var props = Object.assign({}, props.data);
  
  return (
    <div style={{margin: '1em', position: 'relative'}}>
      <img width="75" src={props.avatar}/>
      <div style={{display: 'inline-block', marginLeft: 10, position: 'absolute'}}>
        <div style={{fontSize: '1.25em', fontWeight: 'bold'}}>{props.name}</div>
        <div>{props.company}</div>
      </div>
    </div>
  );
};

const CardList = (props) => {
  return(
    <div>
      {props.cards.map(card => <Card key={card.id} data={card}/>)}
    </div>
  );
};

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userName: '' }
    this.handleSubmit = (event) => {
      event.preventDefault();
      fetch(`https://api.github.com/users/${this.state.userName}`).then((res) => {
        if(res.status !== 200) {
          return;
        }
        res.json().then((data) => {
          this.props.onSubmit(data);
          this.setState({userName: ''});
        });
      });
    }
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input type="text" 
          placeholder="Enter Github username"
          // ref={(input) => this.userInput = input}
          //Bind input value to reference state, so that when you update the state, it updates the field
          value={this.state.userName}
          onChange={(event) => this.setState({ userName: event.target.value})}
          required/>
        <button type="submit">Add card</button>
      </form>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    
    this.addNewCard = (data) => {
      this.setState(prevState => ({
        cards: prevState.cards.concat([{
          id: data.id,
          name: data.name,
          avatar: data.avatar_url,
          company: data.company
        }])
      }));
    };
  }
  
  render() {
    return(
      <div>
        <Form onSubmit={this.addNewCard}/>
        <CardList cards={this.state.cards}/>
      </div>
    );
  }
}

ReactDOM.render(<App/>, document.getElementById('root'))