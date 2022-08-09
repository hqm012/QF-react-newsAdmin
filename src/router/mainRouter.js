import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import News from '../pages/News'

export default class mainRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/' render={() => localStorage.getItem('token') ? <News /> : <Redirect to="/login"></Redirect>} />
                </Switch>
            </div>
        )
    }
}
