import React, { ErrorInfo } from "react";

export class Timer extends React.Component<
  { readonly value?: number },
  { readonly timer: number | { readonly data: number } },
  any
> {
  constructor(props: any) {
    super(props);
    this.state = { timer: 0 };
  }

  static getDerivedStateFromProps(props: any) {
    console.log("getDerivedStateFromProps");
    
    if (props.value === undefined) {
      return { timer: -1 };
    }
    return { timer: props.value };
    
  }

  componentDidMount() {
    console.log("did mount");
  }

  componentDidUpdate() {
    console.log("did update");
  }

  componentWillUnmount() {
    console.log("timer will unmount");
  }

  shouldComponentUpdate(nextProps: any, nextState: any) {
    console.log("should update");

    return nextState.timer !== this.state.timer;
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // this.setState({ timer: { data: 200 } });
    console.log("catch error", error.message);
  }

  render() {
    if(this.props.value && this.props.value === 3){
        throw new Error("Wrong timer value");
        
    }
    return <div>{this.state.timer}</div>;
  }
}
