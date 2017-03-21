import React, {PropTypes} from "react"

class Text extends React.Component {

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    onKeyPress: PropTypes.func.isRequired,
    onBlur: PropTypes.func.isRequired,
    text: PropTypes.string,
    label: PropTypes.string,
    icon: PropTypes.string,
  }

  componentDidMount() {
    componentHandler.upgradeDom()
  }

  componentDidUpdate() {
    componentHandler.upgradeDom()
  }

  render() {
    return <div >
      <div className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label">
        <input className="mdl-textfield__input"
               type="text"
               onChange={this.props.onChange}
               onKeyPress={this.props.onKeyPress}
               onBlur={this.props.onBlur}
               value={this.props.text}
        />
        <label className="mdl-textfield__label">{this.props.label}</label>
      </div>
      {this.props.icon && <span><label className="mdl-button mdl-js-button mdl-button--icon">
        <i className="material-icons">{this.props.icon}</i>
      </label></span>}
    </div>
  }
}

export default Text