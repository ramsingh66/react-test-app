import React from "react";
import { Timer } from "./Timer";
import { ErrorBoundry } from "./ErrorBoundry";
import { NewClassBased } from "./NewClassBased";
import { ThemeContext } from "../ThemeContext";



export class ClassBased extends React.Component<
  {readonly type?:string;},
  {
    readonly showTimer: boolean;
    readonly date: number;
  }
> {
  constructor(props: any) {
    super(props);
    this.state = { showTimer: false, date: 0 };
    this.toggleTimerShown = this.toggleTimerShown.bind(this);
    this.startTimer = this.startTimer.bind(this);
  }
  interval: any;
  static contextType = ThemeContext;

  startTimer() {
    console.log(this.state.showTimer);
    this.interval = setInterval(() => {
      console.log("setting interval ");
      this.setState((state) => ({ ...state, date: this.state.date + 1 }));
    }, 1000);
  }

  componentWillUnmount() {
    console.log("class unmount");
    clearInterval(this.interval);
  }

  toggleTimerShown() {
    const { showTimer: wasShown } = this.state;

    this.setState((state) => ({
      ...state,
      date: 0,
      showTimer: !state.showTimer,
    }));

    console.log("expect state to be but is ", !wasShown, this.state.showTimer);

    if (!wasShown) {
      this.startTimer();
    } else {
      clearInterval(this.interval);
      console.log("cleard interval");
    }
  }
  shouldComponentUpdate() {
    console.log("class should update");
    return true;
  }

  componentDidUpdate() {
    console.log("updated class", this.state);
  }

  render() {
    return (
      <ThemeContext.Consumer>
        {(theme) => (
          <>
            <NewClassBased />
            {this.state.showTimer && (
              <ErrorBoundry onClick={this.toggleTimerShown}>
                {" "}
                <Timer value={this.state.date} />
              </ErrorBoundry>
            )}
            {theme}
            <button onClick={this.toggleTimerShown}>
              {this.state.showTimer ? "Hide" : "Show"} Timer{" "}
            </button>
          </>
        )}
      </ThemeContext.Consumer>
    );
  }
}

