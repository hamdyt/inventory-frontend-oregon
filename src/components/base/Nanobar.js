import { Component } from 'react'
import Nano from 'nanobar'

class Nanobar extends Component {
  nanobar = null

  componentDidMount() {
    this.nanobar = new Nano({
      classname: 'nanobar',
      id: 'nanobar'
    })
    window.nanobar = this.nanobar
  }

  remove = () => {
    window.nanobar = null
    delete this.nanobar
  }

  render() {
    return null
  }
}

export default Nanobar
