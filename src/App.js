import 'leaflet/dist/leaflet.css';
import "./assets/styles/global.css";
import Routes from './routes/index';
import MainTheme from "./theme";


function App() {

  return (
    <>
      <MainTheme>
        <Routes/>
      </MainTheme>
    </>
  );
}

export default App;
