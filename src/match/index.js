import React from "react"
import Layout from "../../components/Layout"
import s from "./styles.css"
import PlayerList from "../../components/PlayerList"
import _ from "lodash"
import uuid from "uuid"
import history from "../history"

class AddMatchPage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      teamWon: [],
      teamLost: [],
      allPlayers: [],
    }
  }

  componentDidMount() {
    const allPlayers = JSON.parse(localStorage.getItem('players'))
    this.setState({allPlayers})
  }

  _handleAddPlayer = (team, playerName) => {
    this.setState({allPlayers: _.filter(this.state.allPlayers, p => p.name !== playerName)})

    if (team === 1) {
      const exist = _.includes(this.state.teamWon, playerName)
      if (!exist)
        this.state.teamWon.push(playerName)
    }
    else {
      const exist = _.includes(this.state.teamLost, playerName)
      if (!exist)
        this.state.teamLost.push(playerName)
    }
  }

  _handleRemovePlayer = (team, playerName) => {
    if (team === 1)
      this.setState({teamWon: _.filter(this.state.teamWon, p => p !== playerName)})
    else
      this.setState({teamLost: _.filter(this.state.teamLost, p => p !== playerName)})
  }

  _handleAddMatch = () => {
    if (this.state.teamWon.length === 0 || this.state.teamLost.length === 0)
      return null

    const matchId = uuid.v4()

    // save players
    const existingPlayers = JSON.parse(localStorage.getItem('players')) || []
    this.state.teamWon.map(player => this._addToExisting(matchId, existingPlayers, player, true))
    this.state.teamLost.map(player => this._addToExisting(matchId, existingPlayers, player, false))
    const rankedPlayers = this._reRankingPlayers(existingPlayers)
    localStorage.setItem('players', JSON.stringify(rankedPlayers));

    // save matches
    this._storeMatch(matchId)

    history.push({pathname: '/leaderboard'});
  }

  _reRankingPlayers = (players) => {
    const rankedPlayers = _.orderBy(players, ['wins', 'time'], ['desc'])
    for(let i = 0; i < rankedPlayers.length; i++) {
      Object.assign(rankedPlayers[i], {ranking: i+1})
    }
    return rankedPlayers
  }

  _addToExisting = (matchId, existingPlayers, player, win) => {
    const existingPlayer = _.find(existingPlayers, {name: player})

    if (existingPlayer) {
      const matchIdExist = _.includes(existingPlayer.matchIds, matchId)
      if (!matchIdExist)
        existingPlayer.matchIds.push(matchId)

      Object.assign(existingPlayer, {
        wins: win ? existingPlayer.wins + 1 : existingPlayer.wins,
      })
    } else {
      existingPlayers.push({
        name: player,
        wins: win ? 1 : 0,
        matchIds: [matchId]
      })
    }
  }

  _storeMatch = (matchId) => {
    const existingMatches = JSON.parse(localStorage.getItem('matches')) || []
    existingMatches.push({
      id: matchId,
      time: new Date().toISOString(),
      teamWon: this.state.teamWon,
      teamLost: this.state.teamLost,
      players: _.concat(this.state.teamWon, this.state.teamLost)
    })
    localStorage.setItem('matches', JSON.stringify(existingMatches));
  }

  render() {
    return <Layout className={s.content}>
      <h3>Add Match</h3>
      <div className="mdl-grid" style={{textAlign: 'center'}}>
        <div className="mdl-cell mdl-cell--4-col">
          <h4>
            <i className="material-icons" style={{color: 'gold'}}>star</i>
            Team Won
            <i className="material-icons" style={{color: 'gold'}}>star</i>
          </h4>
          <PlayerList players={this.state.teamWon}
                      addPlayer={(playerName) => this._handleAddPlayer(1, playerName)}
                      removePlayer={(playerName) => this._handleRemovePlayer(1, playerName)}
                      allPlayers={this.state.allPlayers}
          />
        </div>
        <div className="mdl-cell mdl-cell--4-col"
             style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          <h4>VS</h4>
        </div>
        <div className="mdl-cell mdl-cell--4-col">
          <h4>Team Lost</h4>
          <PlayerList players={this.state.teamLost}
                      addPlayer={(playerName) => this._handleAddPlayer(2, playerName)}
                      removePlayer={(playerName) => this._handleRemovePlayer(2, playerName)}
                      allPlayers={this.state.allPlayers}
          />
        </div>
      </div>
      <div style={{textAlign: 'center'}}>
        <button className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
                onClick={this._handleAddMatch}
        >
          Add Match
        </button>
      </div>
    </Layout>
  }
}

export default AddMatchPage