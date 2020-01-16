import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import axios from 'axios'
import 'react-datepicker/dist/react-datepicker.css' 

export default class CreateExercise extends Component {
    constructor(props){
        super(props);

   
        this.state = {
            username: '',
            description: '',
            duration: 0,
            date: new Date(),
            users: []
        }
    }

    componentDidMount(){
        axios.get('http://localhost:5000/users')
            .then(response => {
                if(response.data.length > 0){
                    this.setState({
                        users: response.data.map(user => user.username),
                        username: response.data[0].username
                    })
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    onChangeHandler(e){
        this.setState({
            [e.target.name]: e.target.value
        })
        
    }



    onChangeDate=(date)=>{
        this.setState({
            date: date
        })
    }

    onSubmit(e){
        e.preventDefault();
        const exercise = {
            username: this.state.username,
            description: this.state.description,
            duration: this.state.duration,
            date: this.state.date
        }
        console.log(exercise)

        axios.post('http://localhost:5000/exercises/add', exercise)
            .then(res => console.log(res.data))

        
       // window.location = '/'

    }

    render() {
        return (
            <div>
            <h3>Create a new Ex</h3>
            <form onSubmit={e=>this.onSubmit(e)}>
                <div className="form-group">
                <label>Username:</label>
                    <select 
                        name="username"
                        ref="userInput" 
                        required
                        className="form-control"
                        value={this.state.username} 
                        onChange={e=>this.onChangeHandler(e)}>
                        {
                            this.state.users.map(user => {
                                return (
                                    <option
                                        key={user}
                                        value={user}
                                        > {user}
                                    </option>
                                )
                             })
                        }
                    </select>
                </div>
                <div className="form-group">
                <label>Description:</label>
                <input 
                name="description"
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.description} 
                    onChange={(e)=>this.onChangeHandler(e)} 
                    />
                </div>
                <div className="form-group">
                <label>Duration:</label>
                <input 
                name="duration"
                    type="text" 
                    required
                    className="form-control"
                    value={this.state.duration} 
                    onChange={(e)=>this.onChangeHandler(e)} 
                    />
                </div>
                <div className="form-group">
                <label>Date:</label>
                <div>
                    <DatePicker 
                        selected={this.state.date}
                        onChange={this.onChangeDate}
                    />
                </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Create ex." className="btn btn-primary"/>
                </div>
            
            </form>
            </div>
        )
    }
}



