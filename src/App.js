import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContextProvider } from './context/AuthContext';
// import pages
import Home from "./pages/Home";
import Search from "./pages/Search";
import Ship from "./pages/Ship";
import About from "./pages/About";
import Footer from './components/Footer'
import Review from './pages/Review'

// import components

import NavigationBar from './components/NavigationBar'
//import {StarRating} from './components/StarRatingComponent'

// import CSS

import './NavigationBar.css'
import "./styles/global.css";
import "./styles/home.css";
import "./styles/search.css";
import "./styles/ship.css";
import "./styles/about.css";
import "./styles/Review.css";
import "./styles/MainPage.css";
import "./styles/homemenu.css";


class App extends Component {
  state = { ship: []}
  render() {
    const { ships } = this.state;
    return (
      <AuthContextProvider>
        <BrowserRouter>
          <NavigationBar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/search/:searchTerm?" render={() => <Search ships={ships} />} />
            <Route path="/ship/:id" component={Ship} />
            <Route exact path="/review" component={Review} />
            </Switch>
          <Footer/>
        </BrowserRouter>
      </AuthContextProvider>
    );
  }

}

export default App;