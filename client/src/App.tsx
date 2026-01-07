import { Button } from "@/components/ui/button";
import { Outlet } from "react-router";

function App() {
  const portNumber = import.meta.env.VITE_PORT_NUMBER;

  console.log(portNumber);

  return (
    <div className="App">
      <h1 className="text-yellow-800 text-bold text-4xl">Hello World</h1>
      <Button>Click me</Button>

      <Outlet />
    </div>
  );
}

export default App;
