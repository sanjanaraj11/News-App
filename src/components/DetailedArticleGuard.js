import React from "react";
import {FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon,
    FacebookIcon,TwitterIcon} from "react-share";
import CommentBoxG from "./CommentBoxG";
import ToggleShowLessG from "./ToggleShowLessG";
import ToggleShowMoreG from "./ToggleShowMoreG";
import {FaAngleDown} from "react-icons/fa";
import Loader from "./Loader";
import Card from 'react-bootstrap/Card';
import "./DetailedArticle.css";
import { MdBookmarkBorder, MdBookmark } from 'react-icons/md';
import Toast from "./Toast";
import ReactTooltip from 'react-tooltip';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

let url ="";
let titleBk="";
let imgurlBk="";
let dateBk="";
let sectionBk="";
let typeBk="";
let urlToPass="";
let x=5;
let marker=0;
let book;
let query="";
//this detailed article is for Guardian pages 
class DetailedArticleGuard extends React.Component {
  
    constructor(props) {
        super(props);
         query = this.props.location.search.substring(4);
      
        console.log(query);
         var aaa = JSON.parse(localStorage.getItem('storeTest'));
        // if(aaa == null) aaa={};
        var test = aaa[query]!=null?true:false;
        console.log(aaa);
        
        //console.log(dataInLS[urlToPass]!=null?true:false);
        this.state = {
            error: null,
            loading: false,
            items: [],
            articleId: query,
            xyz:9,
            bookmarkChecker: test
        };
        // console.log(this.props.location.query.id);
        this.shortenString = this.shortenString.bind(this);
        this.storeData = this.storeData.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.checkEmpty = this.checkEmpty.bind(this);
      
    }
    
    handleDelete(urlToDel){

        // alert("delte selected!");
        // e.stopPropagation();
        // e.preventDefault();
        var aaa = JSON.parse(localStorage.getItem('storeTest'));
        
        delete aaa[urlToDel];
        
      
      localStorage.setItem('storeTest', JSON.stringify(aaa));
      this.setState({
          bookmarkChecker: false,
        xyz: 36
      });
      book=false;

      toast("Removing "+ titleBk, {
        className: css({
            color: "#000000 !important"
        })
    });
      
      }


    componentDidMount() {
        let url = "https://high-bedrock-268705.appspot.com/detailedGuardian?key=" + this.state.articleId;
         //console.log("bookmark url",url);
        //fetch()
    fetch(url)
            .then(res => res.json())
            .then(
                (result) => {
                     //console.log("result", result);
                    this.setState({
                        isLoaded: true,
                        items: result.data.response.content
                    });
                   
                },
                (error) => {
                    console.log(error);
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            ).catch((err) => {
                console.log(err);
            });
            
        }

        shortenString(str, maxLen, separator = '.') {
            if (str.length <= maxLen) return str;
            return str.substring(0, str.lastIndexOf(separator, maxLen));
          }

          checkEmpty(str) {
            if (str.length == 0|| str.length==null || str=="" || str==' ') return true;
            return false;
          }
        storeData(){
            var storeTest = { 'title': titleBk, 'img': imgurlBk, 'date': dateBk, 'section':sectionBk, 'type':typeBk, 'url':urlToPass, 'quer':query };
            
            var aaa = JSON.parse(localStorage.getItem('storeTest'));
            //  if(aaa == null) aaa={};
            aaa[query]=storeTest;
       
         localStorage.setItem('storeTest', JSON.stringify(aaa));
       
         toast("Saving "+ titleBk, {
            className: css({
                color: "#000000 !important"
            })
        });
         
         this.setState({
            xyz:45,
            bookmarkChecker: true
        });
        book=true;
          }

    render() { 
        const { error, isLoaded, items } = this.state;
         //console.log(items)
        let imgsrc = ""
        let dateString=""
        let month=""
        let strLess = ""
        let strMore =""
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return (<Loader />);
            
        } else {
            titleBk=items.webTitle;
            
            dateBk=items.webPublicationDate.substring(0,10);
            sectionBk=items.sectionId;
            typeBk='Guardian';
            urlToPass=items.webUrl;
            // console.log("url passing to bk:",urlToPass);
            
                dateString=items.webPublicationDate.substring(0,10);
                // console.log("date got:", dateBk);
               
                strMore = items.blocks.body[0].bodyTextSummary.substring(601,602).toUpperCase()+items.blocks.body[0].bodyTextSummary.substring(602);

            try {
                let len = items.blocks.main.elements[0].assets.length;
                len = len-1;
                imgsrc = items.blocks.main.elements[0].assets[len].file
                 imgurlBk=imgsrc;
                
           } catch (error) {
                imgsrc = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
                imgurlBk=imgsrc;
           }

           if(this.state.bookmarkChecker==true){
            // console.log("$#$",strMore);
            return (
                <div>
                    
                    {<div style={{marginLeft:"1.5%"}}>
                        <br></br>
                    <div className="card" style={{width:"98%",backgroundColor:"white"}}>
                         <h3 className="card-title">{items.webTitle}</h3>
                         <p className="para">
                    <span style={{fontStyle:"italic"}}>{dateString}</span>
                    
                   
                    <div className="share-bookmark">
                                          
                            <span className="shareButton" style={{paddingRight:"30px"}}>
                            
                            <FacebookShareButton url={items.webUrl} hashtag={"CSCI_571_NewsApp"}  data-tip="Facebook"
                    data-for='facebook'>
                                <FacebookIcon size={30} round={true} />
                                    <ReactTooltip place="top" type="dark" effect="solid" id='facebook'/>
                            </FacebookShareButton>
                            <TwitterShareButton url={items.webUrl+"#CSCI_571_NewsApp"} hashtag={"CSCI_571_NewsApp"} data-tip="Twitter"
                            data-for='twitter'>
                                <TwitterIcon round={true} size={30}/>
                                    <ReactTooltip place="top" type="dark" effect="solid" id='twitter'/>
                            </TwitterShareButton>
                            <EmailShareButton subject={"CSCI_571_NewsApp"} url={items.webUrl} data-tip="Email" data-for='email'>
                                <EmailIcon round={true} size={30}/>
                                    <ReactTooltip place="top" type="dark" effect="solid" id='email'/>
                            </EmailShareButton>
                            </span>

                         <span onClick={() => this.handleDelete(items.webUrl)}> 
                             <MdBookmark data-tip="Bookmark" data-for='bookmarkColor' color="red" size={32}/>
                         <ReactTooltip place="top" type="dark" effect="solid" id='bookmarkColor'/>
                          </span>
                         
                    </div>
                         
                         </p>
                         
                    <img className="card-img-top" style={{width:"100%"}} src={imgsrc} alt="Card image cap"></img>
                    <div className="card-body">
                     
                    <p>{this.shortenString(items.blocks.body[0].bodyTextSummary,600,'.')}.</p>
                    
                    <ToggleShowLessG title={<FaAngleDown/>} article={strMore}>
                            <ToggleShowMoreG article={strMore}/>
                        </ToggleShowLessG>
                    {/* {this.checkEmpty(strMore)==false?<ToggleShowLessG title={<FaAngleDown/>} >
                            <ToggleShowMoreG article={strMore}/>
                        </ToggleShowLessG>:" "} */}
                        
                    
                    </div>
                    </div>                 
                
                </div>}
                         <CommentBoxG id={this.state.articleId}/>
                </div>


            );
            

           }
           else{
            return (
                <div>
                    
                    {<div style={{marginLeft:"1.5%"}}>
                        <br></br>
                    <div className="card" style={{width:"98%",backgroundColor:"white"}}>
                         <h3 className="card-title">{items.webTitle}</h3>
                         <p className="para">
                    <span style={{fontStyle:"italic"}}>{dateString}</span>
                    
                   
                    <div className="share-bookmark">
                    <span className="shareButton" style={{paddingRight:"30px"}}>
                        <FacebookShareButton url={items.webUrl} hashtag={"CSCI_571_NewsApp"}  data-tip="Facebook"
                    data-for='facebook'>
                                <FacebookIcon size={30} round={true} />
                                    <ReactTooltip place="top" type="dark" effect="solid" id='facebook'/>
                            </FacebookShareButton>
                            <TwitterShareButton url={items.webUrl+"#CSCI_571_NewsApp"} hashtag={"CSCI_571_NewsApp"} data-tip="Twitter"
                            data-for='twitter'>
                                <TwitterIcon round={true} size={30}/>
                                    <ReactTooltip place="top" type="dark" effect="solid" id='twitter'/>
                            </TwitterShareButton>
                            <EmailShareButton subject={"CSCI_571_NewsApp"} url={items.webUrl} data-tip="Email" data-for='email'>
                                <EmailIcon round={true} size={30}/>
                                    <ReactTooltip place="top" type="dark" effect="solid" id='email'/>
                            </EmailShareButton>
                            </span>
                         <span onClick={this.storeData}> 
                         
                             <MdBookmarkBorder data-tip="Bookmark" data-for='bookmark' color="red" size={32}/>
                         <ReactTooltip place="top" type="dark" effect="solid" id='bookmark'/>
                          </span>
                         
                    </div>
                         
                         </p>
                         
                    <img className="card-img-top" style={{width:"100%"}} src={imgsrc} alt="Card image cap"></img>
                    <div className="card-body">
                     
                    <p>{this.shortenString(items.blocks.body[0].bodyTextSummary,600,'.')}.</p>
                        <ToggleShowLessG title={<FaAngleDown/>} article={strMore}>
                            <ToggleShowMoreG article={strMore}/>
                        </ToggleShowLessG>
                    
                    </div>
                    </div>                 
                
                </div>}
                         <CommentBoxG id={this.state.articleId}/>
                </div>


            );
           }
            
        //    console.log(this.state.articleId.id);
               
        }
           
            
        }

    // render(){
    //     return(
    //     <CommentBox  id={"id for "}/>
    //     );
    // }
        
}

export default DetailedArticleGuard;