import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  withRouter
} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

import Home from "./components/Home";
import World from "./components/World";
import Politics from "./components/Politics";
import Business from "./components/Business";
import Technology from "./components/Technology";
import Sports from "./components/Sports";
import DetailedArticle from "./components/DetailedArticleGuard";
import HeaderNavBar from "./components/HeaderNavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import Bookmark from "./components/Bookmark";
import Search from './components/Search';
import DetailedArticleNY from './components/DetailedArticleNY';

const articles = {id: {name:"dummy"}};
// var aaa = JSON.parse(localStorage.getItem('storeTest'));
// if(aaa == null) aaa={};

class App extends React.Component {

  constructor() {
    super();
    let val = localStorage.getItem("switch")==null?true:localStorage.getItem("switch")=="false"?false:true;
    this.state = { checked: val, url: '' };

    this.toggleCallback = this.toggleCallback.bind(this);
    this.searchCallBack = this.searchCallBack.bind(this);
    var aaa = JSON.parse(localStorage.getItem('storeTest'));
if(aaa == null) aaa={};
localStorage.setItem('storeTest', JSON.stringify(aaa));

  }

  searchCallBack(val){
    this.setState({
      searchKeyWord: val

    });
    this.props.history.push("/search");
    
  }

  
  toggleCallback(val) {
    this.setState({
      checked: val
    });
  }

render(){
  // console.log(this.state);

  return (
   <div>
     <ToastContainer
                    position="top-center"
                    autoClose={2000}
                    hideProgressBar
                    newestOnTop={false}
                    closeOnClick={false}
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                   
                     />
      <HeaderNavBar callback={this.toggleCallback} searchCallBack={this.searchCallBack}/>     
        <Switch>
      
          <Route exact path="/" render={(props)=><Home {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
          <Route exact path="/world" render={(props)=><World {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
          <Route exact path="/politics" render={(props)=><Politics {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
          <Route exact path="/business" render={(props)=><Business {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
          <Route exact path="/technology" render={(props)=><Technology {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
          <Route exact path="/sports" render={(props)=><Sports {...props} checked={this.state.checked} callback={this.onArticleClick} />}/>
          <Route exact path="/article" render={(props)=><DetailedArticle {...props} checked={this.state.checked} callback={this.onArticleClick} id={this.props}/>}/>
          <Route exact path="/bookmark" render={(props)=><Bookmark {...props} checked={this.state.checked} />}/>
          <Route exact path="/search" render={(props)=><Search {...props} checked={this.state.checked} value={this.state.searchKeyWord} />} />
          <Route exact path="/articleny" render={(props)=><DetailedArticleNY {...props} checked={this.state.checked} callback={this.onArticleClick} url={this.props}/>}/>
        </Switch>
     
    
   </div>
  );
      }
}



export default withRouter(App);


