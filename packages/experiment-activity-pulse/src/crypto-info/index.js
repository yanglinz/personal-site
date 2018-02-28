import React, { Component } from "react";

import "./index.css";

class CryptoInfo extends Component {
  render() {
    const title = "Bitcoin";
    const price = 2204;
    const changeAbs = -233;
    const changePercent = "-1.2%";
    const time = "Jul 16";

    return (
      <div className="CryptoInfo">
        <div className="CryptoInfo-title">{title}</div>
        <div className="CryptoInfo-price-change">{changeAbs}</div>
        <div className="CryptoInfo-price">{price}</div>
        <div className="CryptoInfo-price">{time}</div>

        <div className="CryptoInfo-plot">{this.props.children}</div>
      </div>
    );
  }
}

export default CryptoInfo;
