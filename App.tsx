import React, { useEffect } from "react";
import { HomeScreen } from "@/screens/HomeScreen";
import todoStore from "@/stores/todoStore";

export default function App() {
  useEffect(() => {
    todoStore.hydrate();
  }, []);

  return <HomeScreen />;
}
