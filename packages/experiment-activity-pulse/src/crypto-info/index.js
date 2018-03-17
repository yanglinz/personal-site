import React, { Component } from "react";
import fecha from "fecha";

import "./index.css";

class CryptoInfo extends Component {
  render() {
    const { title, data } = this.props;

    const lastDatum = data[data.length - 1];
    const compIndex = Math.floor(data.length * 2 / 100);
    const compDatum = data[data.length - compIndex];

    const price = lastDatum.y;
    const changeAbs = lastDatum.y - compDatum.y;
    const changePercent = changeAbs / lastDatum.y * 100;
    const time = fecha.format(new Date(lastDatum.x), "MMM	YYYY");

    return (
      <div className="CryptoInfo">
        <div className="CryptoInfo-info-main">
          <div className="CryptoInfo-title">{title}</div>
          <div
            className="CryptoInfo-change-abs"
            style={{ color: changeAbs > 0 ? "#1dcc92" : "#ff433d" }}
          >
            {changeAbs > 0 ? `+${changeAbs.toFixed(2)}` : changeAbs.toFixed(2)}
          </div>
        </div>

        <div className="CryptoInfo-info-alt">
          <div className="CryptoInfo-price">{price.toFixed(2)}</div>
          <div className="CryptoInfo-change-pct">
            {changePercent > 0
              ? `+${changePercent.toFixed(2)}%`
              : `${changePercent.toFixed(2)}%`}
          </div>
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
