import { TOGGLE_APP_DRAWER_ACTIVE } from '../../actions/ui/app'
import { handleAction } from 'redux-actions'
import { default as Immutable } from 'immutable'

const initialState = Immutable.Map({
  drawerActive: false
})

export const reducer = handleAction(TOGGLE_APP_DRAWER_ACTIVE, {
  next: (state, action) => {
    return state.set('drawerActive', !state.get('drawerActive'))
  },
  throw: (state) => state
}, initialState)
