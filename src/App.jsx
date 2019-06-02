import React from 'react';
import data from './default';
import data_group from './default_group';
import data_pin from './default_pin';
import data_original from './default_original';
import data_mod from './default_mod';
import data_pruned from './default_pruned';
import Graph from './Graph';
import './App.css';

function App() {
  const style = {
    border:'1px solid lightgray', 
    width:'70%',
    margin:'0 auto'
  }
  return (
    <div className="App">
      <h2>商品↓</h2>
      <div style={style}>
        <h4>degree+price: 未刪減</h4>
        <Graph data={data} />
        <hr/>
        <h4>degree+price: 刪除代收</h4>
        <Graph data={data_pruned} />
        <hr/>
        <h4>原始degree</h4>
        <Graph data={data_original} />
        <hr/>
        <h4>調整後degree</h4>
        <Graph data={data_mod} />
      </div>
      <h2>群號↓</h2>
      <div style={style}>
        <Graph data={data_group} />
      </div>
      <h2>品號↓</h2>
      <div style={style}>
        <Graph data={data_pin} />
      </div>
    </div>
  );
}

export default App;
