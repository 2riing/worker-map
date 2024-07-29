import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import MyMap2 from './components/MyMap2';
import MyMap3 from './components/MyMap3';


function App() {

  return (
    <div>
      <MyMap2/>
      {/* <MyMap3/> */}
      <img src="https://naveropenapi.apigw.ntruss.com/map-static/v2/raster-cors?w=300&h=300&center=127.1054221,37.3591614&level=16&X-NCP-APIGW-API-KEY-ID=0wu9upiroj"></img>
    </div>
  );
}

export default App;
