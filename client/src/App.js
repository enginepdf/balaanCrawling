import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

// import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Header from './components/header/header.component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      isLogin: false,
      items:[]
    };
  }

  componentDidMount() {
    fetch('http://localhost:3050/items')
      .then(res => res.json())
      .then((data) => {
        this.setState({ items: data });
      });
  }

  toggleLogin() {
    if(this.state.isLogin){
      fetch('http://localhost:3050/signout')
        .then(res=>res.json())
        .then((data) => {
          console.log('logged out');
        });
    } 
    this.setState(prevState => ({ isLogin: !prevState.isLogin }));
  }
  render(){
    return (
     <div>
        <Header isLogin={this.state.isLogin} toggleLogin={this.toggleLogin.bind(this)}/>
        <Switch>
          <Route exact path='/' render={()=><ShopPage items={this.state.items} />} />
          <Route
            exact
            path='/signin'
            render={() =>
              this.state.isLogin ? (
                <Redirect to='/' />
              ) : (
                <SignInAndSignUpPage toggleLogin={this.toggleLogin.bind(this)} />
              )
            }
          />
        </Switch>
      </div>
    );
  }
}
export default App;
