import './App.css';
import MyHeatmap from './Components/Map';
// import NiftyPEChart from './Components/NIfty_Pie_Chart';
// import Map_2 from './Components/Map_2';
// import Nifty_chart_2 from './Components/Nifty_chart_2';
// import Map_3 from './Components/Map_3';
// import Nifty_chart_3 from './Components/Nifty_Chart_3';
// import Nifty_chart_4 from './Components/Nifty_chart_4';
import Nifty_chart_5 from './Components/Nifty_chart_5';


function App() {
  return (
    <div className="App">
      
        {/* <div className="my-heat-map"> <Map_2/>  </div>
      <div className="my-heat-map">  <NiftyPEChart/> </div>
      <div className="my-heat-map"> <Nifty_chart_2/> </div> */}
      {/* <div className="my-heat-map"><Map_3/></div>   */}
      {/* <div className="my-heat-map"><Nifty_chart_3/></div> */}
      {/* <div className="my-heat-map"><Nifty_chart_4/></div> */}

    <div className="my-heat-map"> <MyHeatmap/> </div>
      <div className="my-heat-map"><Nifty_chart_5/></div>
    </div>
  );
}

export default App;


// <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
