import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Navbar from './components/Navbar';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Search from './components/Job/Search';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import withSession from './components/withSession';

const client = new ApolloClient({
    uri: 'https://reactathon-techcrusaders.herokuapp.com/graphql',
    fetchOptions: {
        credentials: 'include'
    },
    request: operation=> {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },

    onError: ({ networkError }) => {
        if (networkError) {
            console.log("Network Error", networkError);

            if (networkError.statusCode) {
                localStorage.removeItem('token');
            }
        }
    }
});

const Root = ({ refetch }) => (
    <Router>
        <Fragment>
            <Navbar />
            <Switch>
                <Route path="/" exact component={App} />
                <Route path="/signin" render={() => <Signin refetch={refetch}/>} />
                <Route path="/signup" render={() => <Signup refetch={refetch}/>} />
                <Route path="/search" component={Search} />
                <Redirect to="/" />
            </Switch>
        </Fragment> 
    </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(<ApolloProvider client={client}> 
                    <RootWithSession />
                </ApolloProvider>, 
                document.getElementById('root'));
registerServiceWorker();
