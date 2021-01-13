import React from 'react'

import Nanobar from 'components/base/Nanobar'

import { setup } from 'lib/progress'

class Core extends React.Component {
  initialize = async () => {
    // setup nanobar
    setup()
  }

  componentDidMount() {
    this.initialize()
  }

  render() {
    return <Nanobar />
  }
}

export default Core
