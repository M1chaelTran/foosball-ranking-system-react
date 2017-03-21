import React from "react"
import Button from "../../components/Button"
import Link from '../../components/Link'

class AddMatchButton extends React.Component {
  render() {
    return <div style={{textAlign: 'right'}}>
      <Button type='fab' colored={true} ripple={true} to="/matches/add">
        <i className="material-icons">add</i>
      </Button>
    </div>
  }
}

export default AddMatchButton