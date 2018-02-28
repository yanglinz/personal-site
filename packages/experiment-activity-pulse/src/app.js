import React, { Component } from "react";
import * as d3 from "d3";
import fecha from "fecha";

import Fullscreen from "./publishable/fullscreen";
import Demo from "./publishable/demo";
import ActivityPulse from "./activity-pulse";

import bitcoinCsv from "./data/bitcoin-price.csv";
import ethereumCsv from "./data/ethereum-price.csv";
import litecoinCsv from "./data/litecoin-price.csv";
import dashCsv from "./data/dash-price.csv";
import rippleCsv from "./data/ripple-price.csv";

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

    return (
      <div className="App">
        <Fullscreen>
          <Demo>
            <ActivityPulse data={bitcoinData} width={420} height={40} />
            <ActivityPulse data={ethereumData} width={420} height={40} />
            <ActivityPulse data={litecoinData} width={420} height={40} />
            <ActivityPulse data={dashData} width={420} height={40} />
            <ActivityPulse data={rippleData} width={420} height={40} />
          </Demo>
        </Fullscreen>
      </div>
    );
  }
}

export default App;
