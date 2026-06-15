import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "./components/ui/button";
import { ModeToggle } from "./components/mode-toggle";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Button>Hello Voyageur</Button>
      <ModeToggle />
    </ThemeProvider>
  );
}

export default App;
