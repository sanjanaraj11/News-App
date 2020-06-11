import React from "react";
import { Nav, Container, FormControl, Button, Form } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
import AsyncSelect from 'react-select/lib/Async';
import ReactTooltip from 'react-tooltip';
import { MdBookmarkBorder,MdBookmark } from 'react-icons/md';
import Switch from "react-switch";
import {
  Link
} from "react-router-dom";
import Select from 'react-select';
import ReactDOM from 'react-dom';


import './HeaderNavBar.css';

import Home from "./Home";
import { World } from "./World";
import { Router, Route, browserHistory, IndexRoute, useParams, withRouter } from "react-router";
import DetailedArticle from "./DetailedArticleGuard";
import NewsArticle from "./NewsArticle";
import Bookmark from "./Bookmark";

let searchOptions = {};


class HeaderNavBar extends React.Component {

  constructor(props) {
    super(props);
    
    console.log(localStorage.getItem("switch"));
    let val = localStorage.getItem("switch")==null?true:localStorage.getItem("switch")=="false"?false:true;
    this.state = { checked: val, url: '' };
    this.handleChange = this.handleChange.bind(this);
    this.onArticleClick = this.onArticleClick.bind(this);
    this.onBookmarkHandle = this.onBookmarkHandle.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.debounce = this.debounce.bind(this);
    this.loadAutoSuggestSearchOptions = this.debounce(this.loadAutoSuggestSearchOptions.bind(this), 1000);
  }


  debounce(func, wait, immediate) {
    var timeout;

    return function executedFunction() {
      var context = this;
      var args = arguments;

      var later = function () {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };

      var callNow = immediate && !timeout;

      clearTimeout(timeout);

      timeout = setTimeout(later, wait);

      if (callNow) func.apply(context, args);
    };
  };

  handleChange(checked) {
    if (this.state.checked) this.setState({ checked });
    else if (!this.state.checked) this.setState({ checked });
    //  alert(this.state.checked?"true":"false")
    // console.log(checked);
    localStorage.setItem("switch", checked);
    this.props.callback(checked);
    // this.props.history.push("/bookmark");
  }

  onArticleClick(url) {
    this.setState({ url });
  }


  loadAutoSuggestSearchOptions(input, func) {
    let urlAuto = "https://monil-shah.cognitiveservices.azure.com/bing/v7.0/suggestions?q=" + input;
    fetch(urlAuto,
      {
        method: "GET", headers: { 'Ocp-Apim-Subscription-Key': "3af516123eab4a8e95f8a8aefe283604" }
      }).then(response => response.json())
      .then(data => {
        if (data.suggestionGroups) {
          let suggestions = data.suggestionGroups["0"].searchSuggestions;
          func(suggestions.map((row, i) => ({ label: row.displayText, value: i })));
        }
      })
  }



  onBookmarkHandle() {
    // Retrieve the object from storage
    this.props.history.push("/bookmark");
    // <Bookmark/>

  }

  handleInputChange = (newValue) => {
    if(newValue==null)
    return;
    searchOptions=newValue;
    this.props.searchCallBack(newValue);
    //this.props.history.push("/search");
  };


  render() {

    console.log("loaction in nav bar name:",this.props.location.pathname); 
    if(this.props.location.pathname=='/article' || this.props.location.pathname=='/articleny' || this.props.location.pathname=='/bookmark' ||
    this.props.location.pathname=='/search'){
      return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navBar">
          {/* <Select className="searchBox" options={searchOptions} placeholder= {"Enter Keyword..."}/> */}
          <AsyncSelect
          className="searchBox"
            isClearable
            name="search"
            onChange={this.handleInputChange}
            loadOptions={this.loadAutoSuggestSearchOptions}
            placeholder= {"Enter Keyword..."}
            value={ this.props.location.pathname=="/search"?searchOptions:''}
            
          />
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} active={this.props.location.pathname=="/"?true:false} to="/">Home</Nav.Link>
              <Nav.Link as={Link} active={this.props.location.pathname=="/world"?true:false} to="/world">World</Nav.Link>
              <Nav.Link as={Link} active={this.props.location.pathname=="/politics"?true:false} to="/politics">Politics</Nav.Link>
              <Nav.Link as={Link} active={this.props.location.pathname=="/business"?true:false} to="/business">Business</Nav.Link>
            <Nav.Link as={Link} active={this.props.location.pathname=="/technology"?true:false} to="/technology">Technology</Nav.Link>
            <Nav.Link as={Link} active={this.props.location.pathname=="/sports"?true:false} to="/sports">Sports</Nav.Link>
  
            </Nav>
            {this.props.location.pathname=='/bookmark'?<Nav className="bookmark" ><div onClick={this.onBookmarkHandle}>
              <MdBookmark color="white" data-tip="Bookmark" data-for='bookmarkNav' size={35}/>
            </div></Nav>:
            <Nav className="bookmark" ><div onClick={this.onBookmarkHandle}>
              <MdBookmarkBorder color="white" data-tip="Bookmark" data-for='bookmarkNav'size={35}/>
                                           
            </div></Nav>}
            <ReactTooltip place="bottom" type="dark" effect="solid" id='bookmarkNav'/>
  
          </Navbar.Collapse>
        </Navbar>
  
      );

    }
    else{

    
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" className="navBar">
        {/* <Select className="searchBox" options={searchOptions} placeholder= {"Enter Keyword..."}/> */}
        <AsyncSelect
        className="searchBox"
          isClearable
          name="search"
          onChange={this.handleInputChange}
          loadOptions={this.loadAutoSuggestSearchOptions}
          placeholder= {"Enter Keyword..."}
          value={ this.props.location.pathname=="/search"?searchOptions:''}
          
        />
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
              <Nav.Link as={Link} active={this.props.location.pathname=="/"?true:false} to="/">Home</Nav.Link>
              <Nav.Link as={Link} active={this.props.location.pathname=="/world"?true:false} to="/world">World</Nav.Link>
              <Nav.Link as={Link} active={this.props.location.pathname=="/politics"?true:false} to="/politics">Politics</Nav.Link>
              <Nav.Link as={Link} active={this.props.location.pathname=="/business"?true:false} to="/business">Business</Nav.Link>
            <Nav.Link as={Link} active={this.props.location.pathname=="/technology"?true:false} to="/technology">Technology</Nav.Link>
            <Nav.Link as={Link} active={this.props.location.pathname=="/sports"?true:false} to="/sports">Sports</Nav.Link>
  
            </Nav>
          <Nav className="bookmark" ><div onClick={this.onBookmarkHandle}><MdBookmarkBorder data-tip="Bookmark" data-for='bookmarkNav'size={25}/>
                                          <ReactTooltip place="bottom" type="dark" effect="solid" id='bookmarkNav'/>
          </div></Nav>
          <span>    </span>
          <Nav className="toggleText">NYTimes</Nav>
          <label htmlFor="material-switch" style={{paddingTop:"1%"}}>

            <Switch
              checked={this.state.checked}
              onChange={this.handleChange}
              onColor="#44ABF7"
              onHandleColor="#FFFFFF"
              handleDiameter={30}
              uncheckedIcon={false}
              checkedIcon={false}
              className="react-switch"
              id="material-switch"
              offHandleColor="#FFFFFF"

              offColor="#DDDDDD" />
              
          </label>
          <Nav className="toggleTextG" style={{paddingLeft:"1%"}}>Guardian</Nav>

        </Navbar.Collapse>
      </Navbar>




    );
    }
  }
}

export default withRouter(HeaderNavBar);