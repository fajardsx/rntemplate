import React, { Component } from "react";
import config_store from "./redux/config_store";
import AppContainer from "./routers";
//REDUX
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

//Check Orientation
import { isPortait } from "./components/deviceOrientation";
import { Dimensions, BackHandler } from "react-native";
import NavigationServices from "./NavigationServices";
import { handleBackButtonClick } from "./config/global";

//YellowBox.ignoreWarnings(["Require cycle:", "Remote debugger"]);
console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
console.disableYellowBox = true;

const { store, presistor } = config_store();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    Dimensions.addEventListener("change", () => {
      console.log("Orentation ", isPortait() ? "Portait" : "Landscape");
    });
  }

  render() {
    return (
      <Provider store={store} style={{ flex: 1 }}>
        <PersistGate loading={null} persistor={presistor}>
          <AppContainer />
        </PersistGate>
      </Provider>
    );
  }
}
