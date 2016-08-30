import React, { Component, PropTypes } from 'react'
import { UserInfoCardModal } from '../components'
import { asyncConnect } from 'redux-connect'
import { Admin } from '../containers/Admin'
// import { Card } from 'material-ui'
// import { connect } from 'react-redux'
// import { push } from 'react-router-redux'
// import { RaisedButton } from 'material-ui'

// @asyncConnect([{
//   promise: ({ store: { dispatch, getState } }) => {
//     if (getState().getIn(['user', 'loaded']) === false) {
//       return dispatch(getUser())
//     }
//   }
// }],
//   state => ({
//     email: state.getIn(['user', 'email'])
// }))
export class Account extends Component {
  render () {
    /* <UserInfoCardModal
      backgroundNode={<Admin />}
      title={'Account'}
       />
    */
    return (
      <div> Account Page </div>
    )
  }
}
