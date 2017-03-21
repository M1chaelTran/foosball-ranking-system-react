import React, {PropTypes} from "react"
import Text from "../../components/Text"
import Link from "../../components/Link"
import Button from "../../components/Button"
import Menu from "../../components/Menu"

class PlayerList extends React.Component {

  static defaultProps = {
    allowRemove: true,
    allowAdd: true,
    allPlayers: [],
  }

  static propTypes = {
    players: PropTypes.array.isRequired,
    allPlayers: PropTypes.array,
    addPlayer: PropTypes.func,
    removePlayer: PropTypes.func,
    allowRemove: PropTypes.bool,
    allowAdd: PropTypes.bool,
  }

  state = {
    playerName: '',
  }

  componentDidUpdate() {
    componentHandler.upgradeDom()
  }

  _handleOnChange = (event) => {
    this.setState({playerName: event.target.value})
  }

  _handleOnBlur = () => {
    this._validatePlayer()
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this._validatePlayer()
    }
  }

  _validatePlayer = () => {
    const playerName = this.state.playerName.trim()
    if (playerName)
      this._handleAddPlayer()
  }

  _handleAddPlayer = () => {
    this.props.addPlayer(this.state.playerName)
    this.setState({playerName: ''})
  }

  _renderPlayerName = (player) => {
    if (this.props.allowAdd)
      return <strong>{player}</strong>
    else
      return <Link to={`/stats/${player}`}><strong>{player}</strong></Link>
  }

  _handleOnItemClick = (player) => {
    this.props.addPlayer(player.name)
    this.setState({playerName: ''})
  }

  render() {
    return <div>
      {this.props.allowAdd && <div style={{display:'flex', alignItems: 'center'}}>
        <Text onChange={this._handleOnChange}
              onKeyPress={this._handleKeyPress}
              onBlur={this._handleOnBlur}
              text={this.state.playerName}
              label="Player name"
        />
        {this.props.allPlayers && <Menu players={this.props.allPlayers}
              onItemClick={(player) => this._handleOnItemClick(player)}
        />}
      </div>}
      <div style={{display: 'flex', alignItems: 'center'}}>
        <ul className="mdl-list">
          {
            this.props.players.map((player, key) => {
              return <li className="mdl-list__item" key={key}>
              <span className="mdl-list__item-primary-content">
                <i className="material-icons mdl-list__item-icon">person</i>
                {this._renderPlayerName(player)}
              </span>
                { this.props.allowRemove && <span>
                  <Button type='icon' style={{color: 'grey'}}
                          onClick={() => this.props.removePlayer(player)}
                          ripple={true}
                  >
                  <i className="material-icons">delete</i>
                </Button>
                </span>}
              </li>
            })
          }
        </ul>
        {this.props.children}
      </div>
    </div>
  }
}

export default PlayerList