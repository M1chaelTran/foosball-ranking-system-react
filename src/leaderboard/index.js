import React from "react"
import Layout from "../../components/Layout"
import Link from "../../components/Link"
import Text from "../../components/Text"
import s from "./styles.css"
import AddMatchButton from "../match/AddMatchButton"
import _ from "lodash"

class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      players: _.orderBy(JSON.parse(localStorage.getItem('players')), ['ranking']) || [],
      searchText: ''
    }
  }

  componentDidMount() {
    document.title = 'Leaderboard'
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this._filterList(this.state.searchText)
    }
  }

  _filterList = (searchText) => {
    const allPlayers = _.orderBy(JSON.parse(localStorage.getItem('players')), ['ranking']) || []
    if (searchText && searchText.trim().length === 0) {
      this.setState({
        players: allPlayers,
        searchText
      })
    }
    else {
      this.setState({
        players: _.filter(allPlayers, p => _.startsWith(p.name, searchText)),
        searchText
      })
    }
  }

  render() {
    return (
      <Layout className={s.content}>
        <h3>Leader Board</h3>
        <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text onBlur={() => this._filterList(this.state.searchText)}
                onChange={(e) => this._filterList(e.target.value)}
                onKeyPress={this._handleKeyPress}
                text={this.state.searchText}
                label='Search player'
                icon='search'
          />
          <AddMatchButton />
        </div>
        <ul className="mdl-list" style={{textAlign: 'center'}}>
          {
            this.state.players.map((player, key) => <li className="mdl-list__item mdl-list__item--three-line" key={key}>
                <span className="mdl-list__item-primary-content">
                  <i className="material-icons mdl-list__item-icon">person</i>
                  <Link to={`/stats/${player.name}`}><strong>{player.name}</strong></Link>
                  <span className="mdl-list__item-text-body">
                  <span>Wins: {player.wins}</span>
                  </span>
                </span>
                <span className="mdl-list__item-secondary-content">
                  <span>Ranking: <strong>{player.ranking}</strong></span>
                </span>
            </li>)
          }
        </ul>
      </Layout>
    );
  }

}

export default HomePage;
