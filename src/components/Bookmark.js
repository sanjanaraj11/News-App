import React from "react";

import {FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon,
  FacebookIcon,TwitterIcon} from "react-share";
  import Modal from 'react-bootstrap/Modal';
  import { MdShare, MdEmail,MdDelete } from 'react-icons/md';
  import { Link } from "react-router-dom";
  import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { css } from 'glamor';
  
  import "./Bookmark.css";
import BookmarkG from "./BookmarkG";
import BookmarkNY from "./BookmarkNY";

class Bookmark extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
        error: null,
        loading: false,
        show: false,
        x:0
        
    };
    // this.handleClick = this.handleClick.bind(this);

    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
    this.handleerr = this.handleerr.bind(this);
    this.shortenString = this.shortenString.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleDelete=this.handleDelete.bind(this);

    // this.add=this.add.bind(this);


}

// handleClick = (x,y) => {
//   let z =x+y;
 
// }
// add(x,y){
  
// }

handleDelete(){

  // alert("delte selected!");
  
this.setState({
  x: 9
});

}



shortenString(str, maxLen, separator = '.') {
  if (str.length <= maxLen) return str;
  return str.substring(0, str.lastIndexOf(separator, maxLen));
}

  handleClick = (e) => {
    e.stopPropagation();
   
}

handleClose() {
    // e.stopPropagation();
    // this.handleerr(e);
    this.setState({
        show: false,
        
    });

}

handleShow(e) {
    e.stopPropagation();
    this.handleerr(e);
    this.setState({
        show: true,
    
    });


}


handleerr(e) {
    e.preventDefault();
}
    render(){
      
      
        //console.log("length:",localStorage.length);
        var retrievedObject = localStorage.getItem('storeTest');
        //console.log('retrievedObject: ', JSON.parse(retrievedObject));
        var str = JSON.parse(retrievedObject);
        var cards_data=[]
        

        for (var prop in str){
          cards_data.push(str[prop])
        }
        
        let cards=[]
        for(let i=0;i<cards_data.length;i++){
         // console.log("url from dt: ",cards_data[i].url); 
          
          
          if(cards_data[i].type=='Guardian'){
            let urlToDetailed = cards_data[i].url.substring(28);
            cards.push(
              <BookmarkG data={cards_data[i]} url={urlToDetailed} callback={this.handleDelete} key={urlToDetailed}/>
             
            )
          }
          else{
            let urlToNyDet = cards_data[i].url;
            cards.push(
            
             <BookmarkNY data={cards_data[i]} url={urlToNyDet} callback={this.handleDelete} key={urlToNyDet}/>
              
            )
          }
         
        }

      if(cards_data.length==0 || cards_data.length==null)
        return(<h3 style={{paddingTop: "1%",textAlign:"center"}}>You have no saved articles</h3>);
        else
        {
          return (
            <div style={{margin: "auto", width: "96%"}}>
              
                <h3>Favorites</h3>
                <div class="row">
                {cards}
                </div>
               
                
             </div>
          );
        }
        
    }
}

export default Bookmark;