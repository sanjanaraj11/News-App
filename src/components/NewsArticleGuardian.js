import React from "react";
import DetailedArticle from "./DetailedArticleGuard";
import Loader from "./Loader";
import { withRouter } from "react-router";
import { MdShare, MdEmail } from 'react-icons/md';
import { PropTypes } from 'react';
import { FaFacebook, FaTwitter } from 'react-icons/fa';
import { Link } from "react-router-dom";

import './NewsArticleGuardian.css';
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap';
import { render } from 'react-dom';
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon,
    FacebookIcon, TwitterIcon
} from "react-share";


var divStyle = {
    
    paddingLeft: "20px"
  };

class NewsArticleGuardian extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            loading: false,
            item: this.props.article,
            show: false,
            
        };
        // this.handleClick = this.handleClick.bind(this);

        this.handleClose = this.handleClose.bind(this);
        this.handleShow = this.handleShow.bind(this);
        this.handleerr = this.handleerr.bind(this);
        this.shortenString = this.shortenString.bind(this);
        this.handleClick = this.handleClick.bind(this);


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

    shortenString(str, maxLen, separator = '.') {
        if (str.length <= maxLen) return str;
        return str.substring(0, str.lastIndexOf(separator, maxLen));
    }



    render() {

        let imgsrc = "";
        let dateString = "";
        let item = this.state.item;
        let keyValue = this.state.key;
        // console.log("id passed: Naguard "+item.id);
        // console.log(" keyvalue passed from home : "+{keyValue});
        
        try {
            let len = item.blocks.main.elements[0].assets.length;
                len = len-1;
            imgsrc = item.blocks.main.elements[0].assets[len].file;
            dateString = item.webPublicationDate.substring(0, 10);
        } catch (error) {
            imgsrc = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
        }
        return (

            <Link to={"/article?id=" + item.id} style={{ textDecoration: "none", color: "black" }}>

                <div className="card mb-3" style={{backgroundColor:"white",width:"98%"}}>
                    <div className="row no-gutters">
                        <div className="col-md-2" style={{border:"1px solid",color:"#dedbd2"}}>
                        <img src={imgsrc} alt="Guardian" className="card-img" style={{padding:"4px", height:"100%"}}></img>
                        </div>
                        <div className="col-md-10">
                        <div className="card-body" style={divStyle}>
                            <h5 style={{fontSize:"1.25rem",fontStyle:"italic",fontWeight:"bold"}}>{item.webTitle}<span onClick={this.handleShow}><MdShare /></span></h5>
                            <Modal show={this.state.show} onClick={this.handleClick} onHide={this.handleClose}>

                                <Modal.Header closeButton>
                                    <Modal.Title>{item.webTitle}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body><p className="shareIconBody">Share via</p>
                                <div className="iconsAlign">                                    
                                <FacebookShareButton url={item.webUrl} hashtag={"CSCI_571_NewsApp"} style={{paddingLeft:"5%", float: "left"}}>
                                        <FacebookIcon round={true} size={45} />
                                    </FacebookShareButton>
                                    <TwitterShareButton url={item.webUrl + "#CSCI_571_NewsApp"} hashtag={"CSCI_571_NewsApp"}>
                                        <TwitterIcon round={true} size={45} />
                                    </TwitterShareButton>
                                    <EmailShareButton subject={"CSCI_571_NewsApp"} url={item.webUrl} style={{paddingRight:"5%", float: "right"}}>
                                        <EmailIcon round={true} size={45} />
                                    </EmailShareButton>
                                    </div>
                                </Modal.Body>
                            </Modal>


                            <p className="block-with-text">
                                {/* {this.shortenString(item.blocks.body[0].bodyTextSummary, 450, '.')}. */}
                                {item.blocks.body[0].bodyTextSummary}
                            </p>
                            <p className="dateNsection" >
                            <span style={{ fontStyle: "italic"}}>
                                {dateString}
                            </span>
                            <span>
                                {(() => {
                                    switch (item.sectionId) {
                                        case "world": return <p className={item.sectionId}>WORLD</p>;
                                        case "politics": return <p className={item.sectionId}>POLITICS</p>;
                                        case "business": return <p className={item.sectionId}>BUSINESS</p>;
                                        case "technology": return <p className={item.sectionId}>TECHNOLOGY</p>;
                                        case "sport": return <p className={item.sectionId}>SPORTS</p>;
                                        case "sports": return <p className={item.sectionId}>SPORTS</p>;

                                        default: return <p className="health">{item.sectionId.toUpperCase()}</p>;
                                    }
                                })()}
                            </span>
                        </p>
                        </div>
                        </div>
                    </div>
                </div>
            </Link>
        )
    }

}

export default withRouter(NewsArticleGuardian);

