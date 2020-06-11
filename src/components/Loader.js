import React from "react";
import { css } from "@emotion/core";
import BounceLoader from "react-spinners/BounceLoader";

// Can be a string as well. Need to ensure each key-value pair ends with ;
const override = css`
  display: block;
  margin: 0 auto;
  border-color: red;
 
`;

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    };
  }

  render() {
    return (
      <div className="sweet-loading" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <p>
        <BounceLoader
          css={override}
          size={45}
         
          color={"#123abc"}
          loading={this.state.loading}
        />
        <h5 className="loadingString" style={{fontWeight:"bold"}}>Loading</h5>
        </p>     
      </div>
    );
  }
}

export default Loader;