import React from "react";
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon,
    FacebookIcon, TwitterIcon
} from "react-share";
import Modal from 'react-bootstrap/Modal';
import { MdShare, MdEmail, MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import Loader from "./Loader";
import "./SearchG.css";

class SearchG extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            error: null,
            loading: false,
            itemGuard: this.props.article,
            show: false,
            
        };
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


    render(){
        let itemGuard = this.state.itemGuard;
        let imgForGuard="";
        let len='';
        let urlToGuardDet=itemGuard.webUrl.substring(28);
        
                                try {
                                     len = itemGuard.blocks.main.elements[0].assets.length;
                                        len = len - 1;
                               
                                    
                                    if(len!=0){
                                        imgForGuard = itemGuard.blocks.main.elements[0].assets[len].file;
                                    }
                                    else{
                                        imgForGuard = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
                                    }
                                    
                                }
                                catch (error) {
                                    imgForGuard = "https://assets.guim.co.uk/images/eada8aa27c12fe2d5afa3a89d3fbae0d/fallback-logo.png";
                                }
                                return (<div class="column">
                                    <Link to={"/article?id=" + urlToGuardDet} style={{ textDecoration: "none", color: "black" }}>
                                        <div class="card" style={{backgroundColor:"white"}}>
                                            <h5 className="title">{itemGuard.webTitle}<span onClick={this.handleShow}><MdShare /></span>
                                            </h5>
                                            <Modal show={this.state.show} onClick={this.handleClick} onHide={this.handleClose}>

                                                <Modal.Header closeButton>
                                                    <Modal.Title>
                                                        <h3>
                                                            GUARDIAN
                                                        </h3>
                                                        <div>
                                                        {itemGuard.webTitle}
                                                        </div>
                                                        </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body><p className="shareIconBody">Share via</p>
                                                <div className="iconsAlign">
                                                    <FacebookShareButton url={itemGuard.webUrl} hashtag={"CSCI_571_NewsApp"} style={{paddingLeft:"5%", float: "left"}}>
                                                        <FacebookIcon round={true} size={45} />
                                                    </FacebookShareButton>
                                                    <TwitterShareButton url={itemGuard.webUrl + "#CSCI_571_NewsApp"} hashtag={"CSCI_571_NewsApp"}>
                                                        <TwitterIcon round={true} size={45} />
                                                    </TwitterShareButton>
                                                    <EmailShareButton subject={"CSCI_571_NewsApp"} url={itemGuard.webUrl} style={{paddingRight:"5%", float: "right"}}>
                                                        <EmailIcon round={true} size={45} />
                                                    </EmailShareButton>
                                                </div>
                                                </Modal.Body>
                                            </Modal>
                                            <img className="imgBK" src={imgForGuard} style={{ height: "100%", width: "100%" }} alt='imgage' />
                                            <br />
                                            <p>

                                                <span className="date">
                                                    {itemGuard.webPublicationDate.substring(0, 10)}
                                                </span>
                                                <span>
                                                    {(() => {
                                                          if(itemGuard.sectionId!='' || itemGuard.sectionId!=' ' || itemGuard.sectionId!=null){
                                                        switch (itemGuard.sectionId) {
                                                            case "world": return <p className={itemGuard.sectionId}>WORLD</p>;
                                                            case "politics": return <p className={itemGuard.sectionId}>POLITICS</p>;
                                                            case "business": return <p className={itemGuard.sectionId}>BUSINESS</p>;
                                                            case "technology": return <p className={itemGuard.sectionId}>TECHNOLOGY</p>;
                                                            case "sport": return <p className={itemGuard.sectionId}>SPORTS</p>;
                                                            case "": return <p className="health">NONE</p>;

                                                            default: return <p className="health">{itemGuard.sectionId.toUpperCase()}</p>;
                                                        }
                                                    }else{
                                                        return <p className="health">None</p>;
                                                    }
                                                    })()}
                                                </span>

                                            </p>
                                        </div>
                                    </Link>
                                </div>);
    }

}

export default SearchG;