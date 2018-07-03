import React from 'react';
import { Mutation } from 'react-apollo';
import { SIGNUP_USER } from '../../queries';
import Error from '../Error';



class Signup extends React.Component{

    state = {
        username : "",
        email : "",
        password : "",
        passwordConfirmation : ""
    };

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event, signupUser) => {
        event.preventDefault();
        signupUser().then(data => {
            console.log(data);
        });
    };

    render(){

        const { username, email, password, passwordConfirmation } = this.state;

        return <div className="App">
            <h2 className="App">Signup</h2>
            <Mutation mutation={SIGNUP_USER} variables= {{ username, email, password }}>
                { (signupUser, { data, loading, error })=> {return (
                        <form className="form" onSubmit= {event => this.handleSubmit(event, signupUser)}>
                            <input type="text" name="username" placeholder="Enter Username" value={username} onChange={ this.handleChange }/>
                            <input type="email" name="email" placeholder="Enter Email" value={email} onChange={ this.handleChange }/>
                            <input type="password" name="password" placeholder="Enter Password" value={password} onChange={ this.handleChange }/>
                            <input type="password" name="passwordConfirmation" placeholder="Confirm Password" value={passwordConfirmation} onChange={ this.handleChange }/>
                            <button type="submit" className="button-primary">Submit</button>
                            {error && <Error error={error} />}
                        </form>    
                    )}}
            </Mutation>
            </div>;
    }
}

export default Signup;
