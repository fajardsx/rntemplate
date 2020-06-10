import { createStore } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-community/async-storage";
import FilesystemStorage from "redux-persist-filesystem-storage";
import RNFetchBlob from "rn-fetch-blob";
import reducer from "./reducers/indexreducer";
FilesystemStorage.config({
  storagePath: `${RNFetchBlob.fs.dirs.DocumentDir}/persistStore`
});
const presistConfig = {
  timeout: null,
  key: "root",
  storage: FilesystemStorage,
  blacklist: ["serviceProvidedDetails", "isStudentListModalVisible"] // will not be persisted
};

const presistreducer = persistReducer(presistConfig, reducer);

export default () => {
  let store = createStore(presistreducer);
  let presistor = persistStore(store);
  return { store, presistor };
};
