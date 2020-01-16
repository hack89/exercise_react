import React, { Component } from 'react'
import axios from 'axios'

export default class CreateUser extends Component {

    constructor(props){
        super(props);

        this.state = {
            username: ''
        }
    }

    
    onChangeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault()
        const user = {
            username: this.state.username
        }
     
        axios.post('http://localhost:5000/users/add', user)
             .then(res => console.log(res.data))

        this.setState({
            username: ''
        })
    }

    render() {
        return (
        <div>
            <h3>Create new user</h3>
            <form onSubmit={e=>this.onSubmit(e)}>

            <div className="form-group">
                <label>Username:</label>
                <input 
                    name="username"
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.username} 
                    onChange={e=>this.onChangeHandler(e)} 
                    />
                </div>
                <div className="form-group">
                    <input type="submit" valur="Create user" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}
