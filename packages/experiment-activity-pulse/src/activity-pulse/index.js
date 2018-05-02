import _ from "lodash";
import * as d3 from "d3";
import React, { Component } from "react";
import uuid from "uuid/v4";

import "./index.css";

function renderPulse(dataset, mount, width = 100, height = 100) {
  const margin = { top: 5, right: 5, bottom: 5, left: 5 };
  const plotWidth = width - margin.left - margin.right;
  const plotHeight = height - margin.top - margin.bottom;

  const xMin = _.minBy(dataset, d => d.x).x;
  const xMax = _.maxBy(dataset, d => d.x).x;
  const yMin = _.minBy(dataset, d => d.y).y;
  const yMax = _.maxBy(dataset, d => d.y).y;

  const xScale = d3
    .scaleLinear()
    .domain([xMin, xMax])
    .range([0, plotWidth]);

  const yScale = d3
    .scaleLinear()
    .domain([yMin, yMax])
    .range([plotHeight, 0]);

  const line = d3
    .line()
    .x(d => xScale(d.x))
    .y(d => yScale(d.y))
    .curve(d3.curveMonotoneX);

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
    const { data, width, height } = this.props;
    renderPulse(data, `#${this.state.mountId}`, width, height);
  }

  render() {
    return (
      <div
        id={this.state.mountId}
        className="ActivityPulse"
        ref={ref => {
          this.plotRef = ref;
        }}
      />
    );
  }
}

export default ActivityPulse;
