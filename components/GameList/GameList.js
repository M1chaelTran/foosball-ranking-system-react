import React, {PropTypes} from "react"
import PlayerList from "../PlayerList"
import moment from 'moment'

class PlayerListItem extends React.Component {

  static propTypes = {
    games: PropTypes.array.isRequired,
  }

  componentDidMount() {
    componentHandler.upgradeDom()
  }

  componentDidUpdate() {
    componentHandler.upgradeDom()
  }

  render() {
    return <ul className="mdl-list">
      {
        this.props.games.map((match, key) => {
          return <li className="mdl-list__item" key={key}>
            <div className="mdl-grid" style={{display: 'flex', justifyContent: 'space-around', width: '100%'}}>
              <div className="mdl-cell mdl-cell--4-col" style={{display:'flex', justifyContent: 'center'}}>
                {match.teamWon && <PlayerList players={match.teamWon}
                            allowRemove={false}
                            allowAdd={false}
                >
                  <i className="material-icons" style={{color: 'gold'}}>star</i>
                </PlayerList>}
              </div>
              <div className="mdl-cell mdl-cell--4-col" style={{display:'flex', flexDirection:'column', alignItems: 'center', justifyContent: 'center'}}>
                <h4>
                  VS
                </h4>
                <span style={{fontSize: 10}}>{moment(match.time).from(moment())}</span>
              </div>
              <div className="mdl-cell mdl-cell--4-col" style={{display:'flex', justifyContent: 'center'}}>
                {match.teamLost && <PlayerList players={match.teamLost}
                            allowRemove={false}
                            allowAdd={false}
                />}
              </div>
            </div>
          </li>
        })
      }
    </ul>
  }
}

export default PlayerListItem