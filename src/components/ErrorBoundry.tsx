import React from "react";

export class ErrorBoundry extends React.Component<any, any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError:false };
  }



  componentDidCatch(e: any, f: any) {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div onClick={this.props.onClick}>You had an Error </div>;
    }
    return this.props.children;
  }
}
