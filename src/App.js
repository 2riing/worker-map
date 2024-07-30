import logo from './logo.svg';
import axios from 'axios';
import './App.css';
import MyMap2 from './components/MyMap2';
import MyMap4 from './components/MyMap4';
import ReactNaverMap from './components/ReactNaverMap';
import ReactNaverGpt from './components/ReactNaverGpt';
import ReactNaverWrkrMap from './components/ReactNaverWrkrMap';



function App() {

  return (
    <div>
      {/* <ReactNaverMap/> */}
      {/* <ReactNaverGpt/> */}
      <ReactNaverWrkrMap />
    </div>
  );
}

export default App;
