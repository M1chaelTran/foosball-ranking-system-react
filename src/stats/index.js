import React from "react"
import Layout from "../../components/Layout"
import Menu from "../../components/Menu"
import Text from "../../components/Text"
import GameList from "../../components/GameList"
import s from "./styles.css"
import _ from "lodash"

class StatsPage extends React.Component {

  static defaultProps = {}

  static propTypes = {}

  constructor(props) {
    super(props)

    this.state = {
      allMatches: [],
      allPlayers: [],
      player1Name: this.props.route.params.name || '',
      player2Name: '',
      player1: null,
      player2: null,
    }
  }

  componentDidMount() {
    componentHandler.upgradeDom()
    document.title = 'Player Statistic'

    this._lookupPlayer(this.props.route.params.name, 1)
  }

  componentDidUpdate() {
    componentHandler.upgradeDom()
  }

  _handleKeyPress = (e, playerName, team) => {
    if (e.key === 'Enter') {
      this._lookupPlayer(playerName, team)
    }
  }

  _lookupPlayer = (playerName, team) => {
    const allPlayers = JSON.parse(localStorage.getItem('players'))
    let player1 = this.state.player1
    let player2 = this.state.player2
    if (team === 1)
      player1 = _.find(allPlayers, {name: playerName})

    if (team === 2)
      player2 = _.find(allPlayers, {name: playerName})

    let allMatches = []
    let filterMatches = JSON.parse(localStorage.getItem('matches')) || []
    filterMatches.map(m => {
      const player1Exist = (player1 && _.includes(m.players, player1.name))
      const player2Exist = (player2 && _.includes(m.players, player2.name))
      if (player1Exist || player2Exist)
        allMatches.push(m)
    })
    allMatches = _.orderBy(allMatches, ['time'], ['desc'])
    this.setState({allMatches, allPlayers, player1, player2})
  }

  _handleOnItemClick = (player, team) => {
    if (team === 1)
      this.setState({player1Name: player.name})
    else
      this.setState({player2Name: player.name})

    this._lookupPlayer(player.name, team)
  }

  render() {
    return <Layout className={s.content}>
      <h3>Player Statistic</h3>
      <div className="mdl-grid" style={{textAlign: 'center', width: '100%'}}>
        <div className="mdl-cell mdl-cell--5-col" style={{display: 'flex', alignItems: 'center'}}>
          <Text onChange={(e) => this.setState({player1Name: e.target.value})}
                onKeyPress={(e) => this._handleKeyPress(e, this.state.player1Name, 1)}
                onBlur={() => this._lookupPlayer(this.state.player1Name, 1)}
                text={this.state.player1Name}
                label='Player name'
          />
          {this.state.allPlayers && <Menu players={this.state.allPlayers}
                onItemClick={(player) => this._handleOnItemClick(player, 1)}
          />}
          {this.state.player1 && <div className={s.wins_ranking}>
            <div>Wins: {this.state.player1.wins}</div>
            <div>Ranking: <strong>{this.state.player1.ranking}</strong></div>
          </div>}
        </div>
        <div className="mdl-cell mdl-cell--2-col">
          {this.state.player1 && this.state.player2 && <h3>VS</h3>}
        </div>
        <div className="mdl-cell mdl-cell--5-col" style={{display: 'flex', alignItems: 'center'}}>
          <Text onChange={(e) => this.setState({player2Name: e.target.value})}
                onKeyPress={(e) => this._handleKeyPress(e, this.state.player2Name, 2)}
                onBlur={() => this._lookupPlayer(this.state.player2Name, 2)}
                text={this.state.player2Name}
                label='Player name'
          />
          {this.state.allPlayers && <Menu players={this.state.allPlayers}
                onItemClick={(player) => this._handleOnItemClick(player, 2)}
          />}
          {this.state.player2 && <div className={s.wins_ranking}>
            <div>Wins: {this.state.player2.wins}</div>
            <div>Ranking: <strong>{this.state.player2.ranking}</strong></div>
          </div>}
        </div>
      </div>
      {this.state.allMatches.length > 0 && <div>
        <h5>Match history</h5>
        <GameList games={this.state.allMatches}/>
      </div>}
    </Layout>
  }
}

export default StatsPage