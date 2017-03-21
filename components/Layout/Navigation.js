import React from 'react';
import Link from '../Link';

class Navigation extends React.Component {

  componentDidMount() {
    window.componentHandler.upgradeElement(this.root);
  }

  componentWillUnmount() {
    window.componentHandler.downgradeElements(this.root);
  }

  render() {
    return (
      <nav className="mdl-navigation" ref={node => (this.root = node)}>
        <Link className="mdl-navigation__link" to="/">Leader Board</Link>
        <Link className="mdl-navigation__link" to="/games">Games</Link>
        <Link className="mdl-navigation__link" to="/stats">Statistic</Link>
      </nav>
    );
  }

}

export default Navigation;
