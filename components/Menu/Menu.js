import React, {PropTypes} from "react"
import uuid from 'uuid'

class Menu extends React.Component {

  static defaultProps = {}

  static propTypes = {
    players: PropTypes.array.isRequired,
    onItemClick: PropTypes.func,
  }

  constructor(props) {
    super(props)

    this.state = {
      id: uuid.v4()
    }
  }

  componentDidMount() {
    componentHandler.upgradeDom()
  }

  componentDidUpdate() {
    componentHandler.upgradeDom()
  }

  render() {
    return <div>
      <button id={this.state.id}
              className="mdl-button mdl-js-button mdl-button--icon">
        <i className="material-icons">more_vert</i>
      </button>

      <ul className="mdl-menu mdl-js-menu mdl-js-ripple-effect"
          htmlFor={this.state.id}>
        {
          this.props.players.map((data, key) =>
            <li key={key} className="mdl-menu__item" onClick={() => this.props.onItemClick(data)} >{data.name}</li>
          )
        }
      </ul>
    </div>
  }
}

export default Menu