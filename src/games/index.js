import React from "react"
import Layout from "../../components/Layout"
import s from "./styles.css"
import AddMatchButton from "../match/AddMatchButton"
import GameList from "../../components/GameList"
import _ from "lodash"

class GamesPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      title: 'Games',
      games: _.orderBy(JSON.parse(localStorage.getItem('matches')), ['time'], ['desc']) || [],
    }
  }

  componentDidMount() {
    componentHandler.upgradeDom()
    document.title = 'Games';
  }

  componentDidUpdate() {
    componentHandler.upgradeDom()
  }

  render() {
    return (
      <Layout className={s.content}>
        <h3>Games</h3>
        <AddMatchButton />
        <GameList games={this.state.games} />
      </Layout>
    );
  }

}

export default GamesPage;
