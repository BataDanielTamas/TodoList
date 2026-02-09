import React, { useEffect } from "react";
import { HomeScreen } from "./src/screens/HomeScreen";
import { StoreProvider } from "./src/stores/StoreContext";
import { rootStore } from "./src/stores/rootStore";

export default function App() {
  useEffect(() => {
    rootStore.todoStore.hydrate();
  }, []);

  return (
    <StoreProvider value={rootStore}>
      <HomeScreen />
    </StoreProvider>
  );
}
