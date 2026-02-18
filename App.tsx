import ChildScreen from "./screens/ChildScreen";
import { StatusBar } from "expo-status-bar";

const App = () => {
    const test = true;
    const speed = 2000;

  return (
    <>
      <ChildScreen speed={speed} test={test} />
      <StatusBar style="auto" />
    </>
  );
};

export default App;