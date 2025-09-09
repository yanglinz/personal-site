import { render, Component } from "preact";
import { signal } from "@preact/signals";

import "./main.css";

const STATUS_INITIAL = Symbol("initial");
const STATUS_COMPLETE = Symbol("complete");

function random(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const state = {
  status: signal(STATUS_INITIAL),
  current: signal(0),
  cells: [
    // Area code
    signal(random(0, 9)),
    signal(random(0, 9)),
    signal(random(0, 9)),

    // Telephone prefix
    signal(random(0, 9)),
    signal(random(0, 9)),
    signal(random(0, 9)),

    // Line number
    signal(random(0, 9)),
    signal(random(0, 9)),
    signal(random(0, 9)),
    signal(random(0, 9)),
  ],
};

function handleSelect() {
  if (state.current.value >= state.cells.length - 1) {
    state.status.value = STATUS_COMPLETE;
  }

  state.current.value++;
  moveIndicator();
}

function handleReset() {
  state.status.value = STATUS_INITIAL;
  state.current.value = 0;
  moveIndicator();
}

function increment(num) {
  if (num === 9) return 0;
  return num + 1;
}

function animateCells() {
  const currentIndex = state.current.value;
  for (let i = currentIndex; i < state.cells.length; i++) {
    const cell = state.cells[i];
    cell.value = increment(cell.value);
  }

  const delay = 15;
  setTimeout(() => requestAnimationFrame(animateCells), delay);
}

function moveIndicator() {
  if (state.status.value === STATUS_COMPLETE) {
    return;
  }

  const index = state.current.value;
  const targetCell = document.querySelector(`[data-cell-index="${index}"]`);
  const pointer = document.getElementById("pointer");

  const targetCellDimensions = targetCell.getBoundingClientRect();
  const pointerDimensions = pointer.getBoundingClientRect();

  const shouldAnimateIndicator = !(
    state.status.value === STATUS_INITIAL && state.current.value === 0
  );
  pointer.style.transition = shouldAnimateIndicator
    ? "transform 0.05s ease-in-out"
    : "";
  let indicatorOffset =
    (targetCellDimensions.width - pointerDimensions.width) / 2 +
    targetCellDimensions.x;
  pointer.style.transform = `translate(${indicatorOffset}px)`;
}

class NumberCell extends Component {
  render() {
    const { index } = this.props;
    const num = state.cells[index].value;
    return (
      <div className="Cell" data-cell-index={index}>
        {num}
      </div>
    );
  }
}

class App extends Component {
  componentDidMount() {
    moveIndicator();
    animateCells();
    window.onresize = moveIndicator;
  }

  render() {
    return (
      <div className="App">
        <div class="Indicator">
          <div className="Indicator-pointer" id="pointer">
            &#10597;
          </div>
        </div>

        <div className="Cells">
          {/* Area code */}
          <span className="Cells-divider">(</span>
          <NumberCell index={0} />
          <NumberCell index={1} />
          <NumberCell index={2} />
          <span className="Cells-divider">)</span>
          <span className="Cells-spacer"></span>

          {/* Telephone prefix */}
          <NumberCell index={3} />
          <NumberCell index={4} />
          <NumberCell index={5} />

          <span className="Cells-spacer"></span>
          <span className="Cells-divider">-</span>
          <span className="Cells-spacer"></span>

          {/* Line number */}
          <NumberCell index={6} />
          <NumberCell index={7} />
          <NumberCell index={8} />
          <NumberCell index={9} />
        </div>

        <div className="Controls">
          <button
            onClick={handleSelect}
            disabled={state.status.value === STATUS_COMPLETE}
          >
            Lock
          </button>
          <button
            onClick={handleReset}
            disabled={
              state.status.value === STATUS_INITIAL && state.current.value === 0
            }
          >
            Reset
          </button>
        </div>
      </div>
    );
  }
}

render(<App />, document.querySelector("#app"));
