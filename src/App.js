import { Toaster } from "react-hot-toast";
import PageTitle from "./components/PageTitle";
import AppHeader from "./components/AppHeader";
import AppContent from "./components/AppContent";
import WeatherContent from "./components/WeatherContent";

function App() {
  return (
    <>
      <div className="flex justify-center w-full">
        <div className="w-2/4">
          <div className="flex items-center justify-between mt-10">
            <PageTitle>TODO APP</PageTitle>
            <WeatherContent />
          </div>
          <div className="flex flex-col mt-10">
            <AppHeader />
            <AppContent />
          </div>
        </div>
      </div>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            fontSize: "1.4rem",
          },
        }}
      />
    </>
  );
}

export default App;
