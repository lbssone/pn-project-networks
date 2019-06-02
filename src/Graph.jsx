import 'vis/dist/vis-network.min.css';
import React, { Component } from 'react';
import { DataSet, Network } from 'vis';

const style = {
  height: '800px',
};

export default class GraphView extends Component {
  constructor(props) {
    super(props);
    this.graphRef = React.createRef();
  }

  componentDidMount() {
    this.initializeGraph();
  }

  initializeGraph() {
    const nodes = new DataSet();
    const edges = new DataSet();
    for (const node of this.props.data.nodes) {
      // node.label = node.name;
      node.group = node.community.toString();
      node.value = node.degree;
      node.title = `
      <div>
        <p>${node.name}</p>
        <p>community: ${node.group}</p>
        <p>連接節點數: ${node.degree}</p>
      </div>
      `;
      nodes.add(node);
    }
    for (const edge of this.props.data.edges) {
      edge.value = edge.weight;
      edge.title = `
      <div>
        <p>weight: ${edge.weight}</p>
      </div>
      `;
      edges.add(edge);
    }
    if (this.graphRef.current) {
      this.network = new Network(this.graphRef.current, {
        edges,
        nodes,
      }, {
          edges: {
            smooth: false,
            scaling: {
              customScalingFunction: function (min,max,total,value) {
                if (max === min) {
                  return 0.03;
                }
                else {
                  var scale = 1 / (max - min);
                  return Math.max(0,(value - min)*scale);
                }
              },
              max: 80,
              min: 1
            },
          },
          layout: {
            improvedLayout: false,
            randomSeed: 5
          },
          nodes: {
            title: 'a',
            scaling: {
              customScalingFunction: function (min, max, total, value){
                if (max === min) {
                  return 0.5;
                }
                else {
                  var scale = 1 / (max - min);
                  return Math.max(0, (value - min) * scale);
                }
              },
              label: {
                enabled: false,
              },
              max: 160,
              min: 60,
            },
            shape: 'dot',
          },
          physics: {
            barnesHut: {
              springLength: 500,
              centralGravity: 0.065,
              gravitationalConstant: -12000,
              // avoidOverlap: 0.9,
            },
            stabilization: true,
            minVelocity: 2
          },
          interaction: {
            hover: true,
            tooltipDelay: 100
          }
        });
    }
  }
  render() {
    return (
      <div id='pn-graph' style={style} ref={this.graphRef} />
    );
  }
}
