import './index.scss'
import axios from 'axios'
import React, { Component } from 'react'
import { Form, Icon, Input, Button, Checkbox, message } from 'antd';
import { Link, withRouter } from 'react-router-dom';

// import React from 'react'

function index(props) {
  return (
    <div className="login-container">
      <div className="header">
        后台管理系统
        <span>
          <Link to="/preview">预览新闻</Link>
        </span>
      </div>
      <div className="form-container">
        <WrappedNormalLoginForm  {...props} />
      </div>
    </div>
  )
}

export default withRouter(index)

class NormalLoginForm extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let res = await axios.get(`http://localhost:3004/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`)
        if (res.data.length) {
          localStorage.setItem('token', JSON.stringify(res.data[0]))
          this.props.history.push('/home')
        } else {
          message.error('没用！')
        }
      }
    });
    // const values = this.props.form.getFieldsValue()
  };

  validatePwd = (rule, value, callback) => {
    if (!value) {
      callback('密码必须输入')
    } else if (value.length < 2) {
      callback('太短了')
    }
    callback()
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <Form.Item>
          {getFieldDecorator('username', {
            rules: [
              { required: true, message: 'Please input your username!' },
              { min: 2, message: '用户名至少2位' },
            ],
            initialValue: 'admin'
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Username"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {getFieldDecorator('password', {
            rules: [
              { required: true, message: 'Please input your Password!' },
              { validator: this.validatePwd }
            ],


          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Password"
            />,
          )}
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            登录
          </Button>
          或者<a href="">现在就注册!</a>
        </Form.Item>
      </Form>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

