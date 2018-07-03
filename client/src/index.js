import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';
import withSession from './components/withSession';

const client = new ApolloClient({
    uri: 'http://localhost:4444/graphql',
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

const Root = () => (
    <Router>
    <Switch>
        <Route path="/" exact component={App} />
        <Route path="/signin" component={Signin} />
        <Route path="/signup" component={Signup} />
        <Redirect to="/" />
    </Switch>
    </Router>
);

const RootWithSession = withSession(Root);

ReactDOM.render(<ApolloProvider client={client}> 
                    <RootWithSession />
                </ApolloProvider>, 
                document.getElementById('root'));
registerServiceWorker();
