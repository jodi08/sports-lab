class Team extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      shots: 0,
      score: 0
    };
    this.shotSound = new Audio("./assets/audio/smb_fireball.mp3");
    this.scoreSound = new Audio("./assets/audio/smb_1-up.mp3");
  }
  shotHandler = () => {
    let score = this.state.score;
    this.shotSound.play();

    if (Math.random() > 0.5) {
      score += 1;

      setTimeout(() => {
        this.scoreSound.play();
      }, 100);
    }
    this.setState((state, props) => ({
      shots: state.shots + 1,
      score
    }));
  };
  render() {
    let shotPercentageDiv;
    if (this.state.shots) {
      const shotPercentage = Math.round(
        (this.state.score / this.state.shots) * 100
      );
      shotPercentageDiv = (
        <div>
          <strong>Shooting %: {shotPercentage} </strong>
        </div>
      );
    }
    return (
      <div className="Team">
        <h2>{this.props.name}</h2>
        <div className="identity">
          <img src={this.props.logo} alt={this.props.name} />
        </div>
        <div>
          <strong>Shots:</strong> {this.state.shots}
        </div>
        <div>
          <strong>Score:</strong>
          {this.state.score}
        </div>
        {shotPercentageDiv}

        <button className="button" onClick={this.shotHandler}>
          Shoot!
        </button>
      </div>
    );
  }
}

function Game(props) {
  return (
    <div className="Game">
      <h1>Welcome to {props.venue}</h1>
      <div className="stats">
        <div className="home">
          <Team
            name={props.visitingTeam.name}
            logo={props.visitingTeam.logoSrc}
          />
        </div>
        <div className="versus" style={{ marginTop: "10px", fontSize: "50px" }}>
          <h1>VS</h1>
        </div>
        <div className="visitors">
          <Team name={props.homeTeam.name} logo={props.visitingTeam.logoSrc} />
        </div>
      </div>
    </div>
  );
}

// Deafault App component that all other compents are rendered through
function App(props) {
  const wolves = {
    name: "Wilsonville Wolves",
    logoSrc: "assets/images/wolf.png"
  };

  const bears = {
    name: "Beaverton Bears",
    logoSrc: "assets/images/bear.png"
  };
  const longhorns = {
    name: "LaGrande Longhorns",
    logoSrc: "assets/images/longhorn.png"
  };
  const dragons = {
    name: "Deschutes Dragons",
    logoSrc: "assets/images/dragon.png"
  };
  return (
    <div className="App">
      <Game venue="Union 525 Gem" homeTeam={bears} visitingTeam={wolves} />
      <Game
        venue="Halsey Event Center"
        homeTeam={dragons}
        visitingTeam={longhorns}
      />
    </div>
  );
}

//Render the application
ReactDOM.render(<App />, document.getElementById("root"));
