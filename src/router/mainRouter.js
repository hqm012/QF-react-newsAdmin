import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import Login from '../pages/Login'
import News from '../pages/News'
import VisitorPreview from '../pages/Visitor/Preview'
import VisitorRead from '../pages/Visitor/Read'

export default class mainRouter extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route path='/login' component={Login}></Route>
                    <Route path='/preview' component={VisitorPreview}></Route>
                    <Route path='/read/:id' component={VisitorRead}></Route>
                    <Route path='/' render={() => localStorage.getItem('token') ? <News /> : <Redirect to="/login"></Redirect>} />
                </Switch>
            </div>
        )
    }
}
