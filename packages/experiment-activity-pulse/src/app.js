import React, { Component } from "react";
import uuid from "uuid/v4";
import * as d3 from "d3";

function renderPulse(mount, width = 100, height = 100) {
  const margin = { top: 5, right: 5, bottom: 5, left: 5 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const n = 180;

  const xScale = d3
    .scaleLinear()
    .domain([0, n - 1])
    .range([0, plotWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([0, 1])
    .range([plotHeight, 0]);

  const line = d3
    .line()
    .x((d, i) => xScale(i))
    .y(d => yScale(d.y))
    .curve(d3.curveMonotoneX);

  const dataset = d3.range(n).map(function(d) {
    return { y: d3.randomUniform(1)() };
  });

  const svg = d3
    .select(mount)
    .append("svg")
    .attr("width", plotWidth + margin.left + margin.right)
    .attr("height", plotHeight + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  svg
    .append("path")
    .datum(dataset)
    .attr("class", "line")
    .attr("d", line);
}

class ActivityPulse extends Component {
  constructor(props) {
    super(props);
    const mountId = "ap-" + uuid();
    this.state = { mountId };
  }

  componentDidMount() {
    const{ width, height } = this.props;
    renderPulse(`#${this.state.mountId}`, width, height);
  }

  render() {
    return (
      <div
        id={this.state.mountId}
        className="activity-pulse"
        ref={ref => {
          this.plotRef = ref;
        }}
      />
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="app">
        <ActivityPulse width={420} height={80} />
        <ActivityPulse width={420} height={80} />
        <ActivityPulse width={420} height={80} />
      </div>
    );
  }
}

export default App;
