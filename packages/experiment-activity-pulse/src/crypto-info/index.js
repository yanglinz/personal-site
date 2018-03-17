import React, { Component } from "react";

import "./index.css";

class CryptoInfo extends Component {
  render() {
    const title = "Bitcoin";
    const price = "2204.00";
    const changeAbs = "+42.00";
    const changePercent = "-1.2%";
    const time = "Jul 16";

    return (
      <div className="CryptoInfo">
        <div className="CryptoInfo-info-main">
          <div className="CryptoInfo-title">{title}</div>
          <div className="CryptoInfo-change-abs">{changeAbs}</div>
        </div>

        <div className="CryptoInfo-info-alt">
          <div className="CryptoInfo-price">{price}</div>
          <div className="CryptoInfo-change-pct">{changePercent}</div>
        </div>

        <div className="CryptoInfo-info-meta">
          <div className="CryptoInfo-price">{time}</div>
        </div>

        <div className="CryptoInfo-plot">{this.props.children}</div>
      </div>
    );
  }
}

export default CryptoInfo;
