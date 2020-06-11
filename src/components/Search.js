import React from "react";
import "./Search.css";
import {
    FacebookShareButton, TwitterShareButton, EmailShareButton, EmailIcon,
    FacebookIcon, TwitterIcon
} from "react-share";
import Modal from 'react-bootstrap/Modal';
import { MdShare, MdEmail, MdDelete } from 'react-icons/md';
import { Link } from "react-router-dom";
import Loader from "./Loader";
import SearchNY from "./SearchNY";
import SearchG from "./SearchG";


class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            itemsGuard: {},
            itemsNY: {},
            value: this.props.value.label
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


    componentDidMount() {
        Promise.all([
            fetch("https://high-bedrock-268705.appspot.com/searchGuardian?key=" + this.props.value.label).then(valueSearchG => valueSearchG.json()),
            fetch("https://high-bedrock-268705.appspot.com/searchNY?key=" + this.props.value.label).then(valueSearchNY => valueSearchNY.json())
        ])
            .then(([valueSearchNY, valueSearchG]) => {

                this.setState({
                    isLoaded: true,
                    itemsGuard: valueSearchNY.data.response,
                    itemsNY: valueSearchG.data.response
                }
                );
                console.log("Ny: ", valueSearchG);
                console.log("Guard: ", valueSearchNY);
                //json response
            })
            .catch((err) => {
                console.log(err);
            });

    }




    render() {

        const { isLoaded, itemsGuard, itemsNY } = this.state;
        // console.log(itemsG);
        let searchNYRes = '';
        let searchGuardRes = '';
        let imgForNY = "";
        let imgForGuard = "";



        if (this.state.isLoaded) {
            searchNYRes = itemsNY.docs.slice(0, 5);
            searchGuardRes = itemsGuard.results.slice(0, 5);
            // console.log(searchLoad);
            // console.log(searchLoad[0]);

            return (

                <div style={{margin: "auto", width:"96%"}}>
                    <h2>Results</h2>
                    <div class="row">
                        {searchNYRes.map((item) => {
                            return (<SearchNY article={item} key={item.web_url}/>);
                        })

                        }{
                            searchGuardRes.map((itemGuard) => {
                                return (<SearchG article={itemGuard} />); 
                            })
                        }
                    </div>

                </div>
            );
        }
        else {
            return (<Loader />);
        }

    }

}


export default Search;