import React from "react";

export class NewClassBased extends React.PureComponent<any, any> {
//   shouldComponentUpdate() {
//     console.log("new lass should update");
//     return false;
//   }

  componentDidUpdate() {
    console.log("new class updated");
  }

  render() {
    console.log("new class in render");
    return <>THIS IS NEW CLASS</>;
  }
}
