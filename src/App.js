import "./css/App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MainComponent from "./components/MainComponent";

function App() {
  return (
    <div className="App">
      <Header />
      <MainComponent />
      <Footer />
    </div>
  );
}

export default App;
