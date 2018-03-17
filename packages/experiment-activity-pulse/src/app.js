import React, { Component } from "react";
import * as d3 from "d3";
import fecha from "fecha";

import Fullscreen from "./publishable/fullscreen";
import Demo from "./publishable/demo";
import CryptoInfo from "./crypto-info";
import ActivityPulse from "./activity-pulse";

import bitcoinCsv from "./data/bitcoin-price.csv";
import ethereumCsv from "./data/ethereum-price.csv";
import litecoinCsv from "./data/litecoin-price.csv";
import dashCsv from "./data/dash-price.csv";
import rippleCsv from "./data/ripple-price.csv";

import "./app.css";

function parsePriceDataset(data) {
  return data.map(d => ({
    x: fecha.parse(d.Date, "MMM DD, YYYY").getTime(),
    y: Number.parseFloat(d.Open)
  }));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { bitcoinData: undefined };
  }

  componentDidMount() {
    d3.csv(bitcoinCsv, d => {
      this.setState({ bitcoinData: parsePriceDataset(d) });
    });

    d3.csv(ethereumCsv, d => {
      this.setState({ ethereumData: parsePriceDataset(d) });
    });

    d3.csv(litecoinCsv, d => {
      this.setState({ litecoinData: parsePriceDataset(d) });
    });

    d3.csv(dashCsv, d => {
      this.setState({ dashData: parsePriceDataset(d) });
    });

    d3.csv(rippleCsv, d => {
      this.setState({ rippleData: parsePriceDataset(d) });
    });
  }

  render() {
    const {
      bitcoinData,
      ethereumData,
      litecoinData,
      dashData,
      rippleData
    } = this.state;
    const loading =
      !bitcoinData ||
      !ethereumData ||
      !litecoinData ||
      !dashData ||
      !rippleData;

    if (loading) {
      return null;
    }

    const data = [
      { title: "Bitcoin", data: bitcoinData },
      { title: "Ethereum", data: ethereumData },
      { title: "Litecoin", data: litecoinData },
      { title: "Dash", data: dashData },
      { title: "Ripple", data: rippleData }
    ];

    return (
      <div className="App">
        <Fullscreen>
          <Demo>
            <div className="App-demo">
              {data.map(d => (
                <div key={d.title} className="App-item">
                  <CryptoInfo title={d.title} data={d.data}>
                    <ActivityPulse data={d.data} width={100} height={40} />
                  </CryptoInfo>
                </div>
              ))}
            </div>
          </Demo>
        </Fullscreen>
      </div>
    );
  }
}

export default App;
