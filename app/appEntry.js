'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

const events = window.require('events');
const path = window.require('path');
const fs = window.require('fs');

const electron = window.require('electron');
const {ipcRenderer, shell} = electron;
const {dialog} = electron.remote;

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';


let muiTheme = getMuiTheme({
    fontFamily: 'Microsoft YaHei'
});


class MainWindow extends React.Component {

    constructor(props) {
        super(props);
        injectTapEventPlugin();

        this.state = {
            userName: null,
            password: null
        };
    }

    render() {
        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.root}>
                    <img style={styles.icon} src='public/img/app-icon.png'/>

                    <TextField
                        hintText='用户名'
                        value={this.state.userName}
                        onChange={(event) => {this.setState({userName: event.target.value})}}/>
                    <TextField
                        hintText='密码'
                        type='password'
                        value={this.state.password}
                        onChange={(event) => {this.setState({password: event.target.value})}}/>

                    <div style={styles.buttons_container}>
                        <RaisedButton
                            label="登录" primary={true}
                            onClick={this._handleLogin.bind(this)}/>
                        <RaisedButton
                            label="注册" primary={false} style={{marginLeft: 60}}
                            onClick={this._handleRegistry.bind(this)}/>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }

    _handleLogin() {
        let options = {
            type: 'info',
            buttons: ['确定'],
            title: '登录',
            message: this.state.userName,
            defaultId: 0,
            cancelId: 0
        };

        dialog.showMessageBox(options, (response) => {
            if (response == 0) {
                console.log('OK pressed!');
            }
        });
    }

    _handleRegistry() {
    }
}

const styles = {
    root: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    icon: {
        width: 100,
        height: 100,
        marginBottom: 40
    },
    buttons_container: {
        paddingTop: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    }
};


let mainWndComponent = ReactDOM.render(
    <MainWindow />,
    document.getElementById('content'));