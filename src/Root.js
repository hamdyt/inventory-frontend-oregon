import App from 'components/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'

// import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

import store from './store'

function Root() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        {/* <AmplifySignOut /> */}
        <App />
      </BrowserRouter>
    </Provider>
  )
}

export default Root
// export default withAuthenticator(Root)
