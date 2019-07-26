import React, { Component } from "react";
import Button from "./Button";

const UPDATE_TIME = 1000;

class Stopwatch extends Component {
  state = {
    running: false,
    time: 0
  };

  interval = null;

  handleStart = () => {
    this.startTick();

    this.lastTime = Date.now();

    this.setState({
      running: true
    });
  };

  handlePause = () => {
    this.setState({
      running: false
    });
  };

  handleStop = () => {
    this.stopTick();

    this.setState({
      running: false,
      time: 0
    });
  };

  startTick = () => {
    if (!this.interval) this.interval = setInterval(this.tick, UPDATE_TIME);
  };

  stopTick = () => {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  };

  tick = () => {
    const currentTime = Date.now();
    const diff = currentTime - this.lastTime;

    this.lastTime = currentTime;

    if (this.state.running) {
      this.setState({
        time: this.state.time + diff
      });
    }
  };

  formatTime = ms => {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = ("0" + Math.floor(totalSeconds / 60)).slice(-2);
    const seconds = ("0" + (totalSeconds % 60)).slice(-2);
    return `${minutes} : ${seconds}`;
  };

  render() {
    const time = this.formatTime(this.state.time);

    return (
      <section className="stopwatch">
        <div className="stopwatch-time">{time}</div>
        <div className="stopwatch-controls">
          {this.state.running ? (
            <Button
              className="icon"
              icon="pause_arrow"
              onClick={this.handlePause}
            />
          ) : (
            <Button
              className="icon"
              icon="play_arrow"
              onClick={this.handleStart}
            />
          )}

          <Button className="icon" icon="stop" onClick={this.handleStop} />
        </div>
      </section>
    );
  }
}

export default Stopwatch;
