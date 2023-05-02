import React, { useRef, useEffect } from 'react';
import * as d3 from "d3";
import * as d3d from "d3-dag"

function ML() {
  function mouseover(event) {
    /*console.log(event.target)
    const rx = d3.select(this).select('ellipse').attr('rx');
    const ry = d3.select(this).select('ellipse').attr('ry');
    console.log(rx, ry)
    d3.select(this).select("ellipse").transition()
      .duration(75)
      .attr("rx", rx + 2)
      .attr('ry', ry + 2);*/
  }
  function mouseout() {
    /*const rx = d3.select(this).select('ellipse').attr('rx');
    const ry = d3.select(this).select('ellipse').attr('ry');
    d3.select(this).select("ellipse").transition()
      .duration(75)
      .attr("rx", rx - 2)
      .attr('ry', ry - 2);*/
  }
  const data2 = {
    id: 'A',
    children: [
      {
        id: 'B',
        children: [
          {
            id: 'D'
          },
          {
            id: 'E'
          }
        ]
      },
      {
        id: 'C',
        children: [
          {
            id: 'F'
          },
          {
            id: 'G'
          }
        ]
      }
    ]
  };

  const svgRef = useRef()
  const testRef = useRef()


  useEffect(() => {
    let data = [{ "id": "0", "parentIds": [] }, { "id": "1", "parentIds": ["0"] }, { "id": "2", "parentIds": ["0"] }, { "id": "3", "parentIds": ["0"] }, { "id": "4", "parentIds": ["0", "5"] }, { "id": "5", "parentIds": ["0"] }, { "id": "6", "parentIds": ["1"] }, { "id": "7", "parentIds": ["1"] }, { "id": "8", "parentIds": ["1"] }, { "id": "9", "parentIds": ["2"] }, { "id": "10", "parentIds": ["2"] }, { "id": "11", "parentIds": ["2"] }, { "id": "12", "parentIds": ["3"] }, { "id": "13", "parentIds": ["3"] }, { "id": "14", "parentIds": ["3"] }, { "id": "15", "parentIds": ["3"] }, { "id": "16", "parentIds": ["3"] }, { "id": "17", "parentIds": ["4"] }, { "id": "18", "parentIds": ["4"] }, { "id": "19", "parentIds": ["4"] }, { "id": "20", "parentIds": ["4"] }, { "id": "21", "parentIds": ["4"] }, { "id": "22", "parentIds": ["5"] }, { "id": "23", "parentIds": ["5"] }, { "id": "24", "parentIds": ["6"] }, { "id": "25", "parentIds": ["6"] }, { "id": "26", "parentIds": ["6"] }, { "id": "27", "parentIds": ["6"] }, { "id": "28", "parentIds": ["6"] }, { "id": "29", "parentIds": ["7"] }, { "id": "30", "parentIds": ["7"] }, { "id": "31", "parentIds": ["7"] }, { "id": "32", "parentIds": ["8"] }, { "id": "33", "parentIds": ["8"] }, { "id": "34", "parentIds": ["8"] }, { "id": "35", "parentIds": ["8"] }, { "id": "36", "parentIds": ["8"] }, { "id": "37", "parentIds": ["10"] }, { "id": "38", "parentIds": ["11"] }, { "id": "39", "parentIds": ["11"] }, { "id": "40", "parentIds": ["11"] }, { "id": "41", "parentIds": ["11"] }, { "id": "42", "parentIds": ["13"] }, { "id": "43", "parentIds": ["15"] }, { "id": "44", "parentIds": ["15"] }, { "id": "45", "parentIds": ["15"] }, { "id": "46", "parentIds": ["16"] }, { "id": "47", "parentIds": ["22"] }, { "id": "48", "parentIds": ["22"] }, { "id": "49", "parentIds": ["22"] }, { "id": "50", "parentIds": ["22"] }, { "id": "51", "parentIds": ["22"] }, { "id": "52", "parentIds": ["23"] }, { "id": "53", "parentIds": ["23"] }, { "id": "54", "parentIds": ["23"] }, { "id": "55", "parentIds": ["0", "1"] }, { "id": "56", "parentIds": ["5"] }, { "id": "57", "parentIds": ["4", "5"] }, { "id": "58", "parentIds": ["61"] }, { "id": "59", "parentIds": ["61"] }, { "id": "60", "parentIds": ["0", "58", "59"] }, { "id": "61", "parentIds": ["0"] }, { "id": "62", "parentIds": ["61"] }, { "id": "63", "parentIds": ["61"] }]
    //let data = [{ "id": "0", "parentIds": [] }, { "id": "1", "parentIds": ["0"] }, { "id": "2", "parentIds": ["0"] }, { "id": "3", "parentIds": ["0"] }, { "id": "4", "parentIds": ["0", "5"] }, { "id": "5", "parentIds": ["0"] }, { "id": "6", "parentIds": ["1"] }, { "id": "7", "parentIds": ["1"] }, { "id": "8", "parentIds": ["1"] }, { "id": "9", "parentIds": ["2"] }, { "id": "10", "parentIds": ["2"] }, { "id": "11", "parentIds": ["2"] }, { "id": "12", "parentIds": ["3"] }, { "id": "13", "parentIds": ["3"] }, { "id": "14", "parentIds": ["3"] }, { "id": "15", "parentIds": ["3"] }, { "id": "16", "parentIds": ["3"] }]//, { "id": "17", "parentIds": ["4"] }, { "id": "18", "parentIds": ["4"] }, { "id": "19", "parentIds": ["4"] }, { "id": "20", "parentIds": ["4"] }, { "id": "21", "parentIds": ["4"] }, { "id": "22", "parentIds": ["5"] }, { "id": "23", "parentIds": ["5"] }, { "id": "24", "parentIds": ["6"] }, { "id": "25", "parentIds": ["6"] }, { "id": "26", "parentIds": ["6"] }, { "id": "27", "parentIds": ["6"] }, { "id": "28", "parentIds": ["6"] }, { "id": "29", "parentIds": ["7"] }, { "id": "30", "parentIds": ["7"] }, { "id": "31", "parentIds": ["7"] }, { "id": "32", "parentIds": ["8"] }, { "id": "33", "parentIds": ["8"] }, { "id": "34", "parentIds": ["8"] }, { "id": "35", "parentIds": ["8"] }, { "id": "36", "parentIds": ["8"] }, { "id": "37", "parentIds": ["10"] }, { "id": "38", "parentIds": ["11"] }, { "id": "39", "parentIds": ["11"] }, { "id": "40", "parentIds": ["11"] }, { "id": "41", "parentIds": ["11"] }, { "id": "42", "parentIds": ["13"] }, { "id": "43", "parentIds": ["15"] }, { "id": "44", "parentIds": ["15"] }, { "id": "45", "parentIds": ["15"] }, { "id": "46", "parentIds": ["16"] }, { "id": "47", "parentIds": ["22"] }, { "id": "48", "parentIds": ["22"] }, { "id": "49", "parentIds": ["22"] }, { "id": "50", "parentIds": ["22"] }, { "id": "51", "parentIds": ["22"] }, { "id": "52", "parentIds": ["23"] }, { "id": "53", "parentIds": ["23"] }, { "id": "54", "parentIds": ["23"] }, { "id": "55", "parentIds": ["0", "1"] }, { "id": "56", "parentIds": ["5"] }, { "id": "57", "parentIds": ["4", "5"] }, { "id": "58", "parentIds": ["61"] }, { "id": "59", "parentIds": ["61"] }, { "id": "60", "parentIds": ["0", "58", "59"] }, { "id": "61", "parentIds": ["0"] }, { "id": "62", "parentIds": ["61"] }, { "id": "63", "parentIds": ["61"] }]
    var names = {
      0: 'Machine Learning',
      1: 'Unsupervised Learning',
      2: 'Ensemble Learning',
      3: 'Neural Networks and Deep Learning',
      4: 'Reinforcement Learning',
      5: 'Supervised Learning',
      6: 'Clustering',
      7: 'Association Rule Learning',
      8: 'Dimensionality Reduction',
      9: 'Stacking',
      10: 'Bagging',
      11: 'Boosting',
      12: 'Perceptrons',
      13: 'Autoencoders',
      14: 'Generative Aderserial Networks',
      15: 'Recurrent Neural Networks',
      16: 'Convolutional Neural Networks',
      17: 'A3C',
      18: 'Genetic Algorithm',
      19: 'SARSA',
      20: 'DON',
      21: 'Q-Learning',
      22: 'Classification',
      23: 'Regression',
      24: 'Agglomerative',
      25: 'Fuzzy C-Means',
      26: 'Mean Shift',
      27: 'K-Means',
      28: 'DBSCAN',
      29: 'FP Growth',
      30: 'Euclat',
      31: 'Apriori',
      32: 'I-SNE',
      33: 'PCA',
      34: 'LSA',
      35: 'SVD',
      36: 'LDA',
      37: 'Random Forest',
      38: 'XGBoost',
      39: 'LightGBM',
      40: 'CatBoost',
      41: 'AdaBoost',
      42: 'seq2seq',
      43: 'GRU',
      44: 'LSTM',
      45: 'LSM',
      46: 'DCNN',
      47: 'Decision Trees',
      48: 'K-NN',
      49: 'Naive Bayes',
      50: 'Logistic Regression',
      51: 'SVM',
      52: 'Polynomial Regression',
      53: 'Ridge/Lasso Regression',
      54: 'Linear Regression',
      55: 'Semi-supervised Learning',
      56: 'Batch Learning',
      57: 'Online Learning',
      58: 'Overfitting',
      59: 'Underfitting',
      60: 'Regularization',
      61: 'Model Selection',
      62: 'Cross-validation',
      63: 'Evaluation Metrics'
    }

    const data1 = // [object Array] (22)
      [// [object Object] 
        {
          "id": "0",
          "parentIds": [
            "8"
          ]
        },// [object Object] 
        {
          "id": "1",
          "parentIds": []
        },// [object Object] 
        {
          "id": "2",
          "parentIds": []
        },// [object Object] 
        {
          "id": "3",
          "parentIds": [
            "11"
          ]
        },// [object Object] 
        {
          "id": "4",
          "parentIds": [
            "12"
          ]
        },// [object Object] 
        {
          "id": "5",
          "parentIds": [
            "18"
          ]
        },// [object Object] 
        {
          "id": "6",
          "parentIds": [
            "9",
            "15",
            "17"
          ]
        },// [object Object] 
        {
          "id": "7",
          "parentIds": [
            "3",
            "17",
            "20",
            "21"
          ]
        },// [object Object] 
        {
          "id": "8",
          "parentIds": []
        },// [object Object] 
        {
          "id": "9",
          "parentIds": [
            "4"
          ]
        },// [object Object] 
        {
          "id": "10",
          "parentIds": [
            "16",
            "21"
          ]
        },// [object Object] 
        {
          "id": "11",
          "parentIds": [
            "2"
          ]
        },// [object Object] 
        {
          "id": "12",
          "parentIds": [
            "21"
          ]
        },// [object Object] 
        {
          "id": "13",
          "parentIds": [
            "4",
            "12"
          ]
        },// [object Object] 
        {
          "id": "14",
          "parentIds": [
            "1",
            "8"
          ]
        },// [object Object] 
        {
          "id": "15",
          "parentIds": []
        },// [object Object] 
        {
          "id": "16",
          "parentIds": [
            "0"
          ]
        },// [object Object] 
        {
          "id": "17",
          "parentIds": [
            "19"
          ]
        },// [object Object] 
        {
          "id": "18",
          "parentIds": [
            "9"
          ]
        },// [object Object] 
        {
          "id": "19",
          "parentIds": []
        },// [object Object] 
        {
          "id": "20",
          "parentIds": [
            "13"
          ]
        },// [object Object] 
        {
          "id": "21",
          "parentIds": []
        }]

    data = data.map((node) => ({ id: node.id, parentIds: node.parentIds.map(pid => pid) }))
    const dag = d3d.dagStratify()(data);

    const nodeRadius = 20;
    const layout = d3d
      .sugiyama() // base layout
      //.decross(d3d.decrossOpt().large("medium")) // minimize number of crossings
      //.decross(d3d.decrossTwoLayer()).order(d3d.twolayerAgg()).large('medium')
      //.layering(d3d.layeringTopological())
      .layering(d3d.layeringCoffmanGraham())
      .decross(d3d.decrossTwoLayer())//.order(d3d.twolayerOpt().large("medium")))
      .nodeSize((node) => { if (node) { testRef.current.innerHTML = names[node.data.id]; return [testRef.current.clientWidth * 2, testRef.current.clientWidth * 2] } else { return [20, 20] } }); //[(node ? 3.6 : 0.25) * nodeRadius, 3 * nodeRadius] }); // set node size instead of constraining to fit
    const { width, height } = layout(dag);
    const svgSelection = d3.select(svgRef.current);
    svgSelection.attr("viewBox", [0, 0, width, height].join(" "));
    const defs = svgSelection.append("defs"); // For gradients
    const steps = dag.size();
    const interp = d3.interpolateRainbow;
    const colorMap = new Map();
    for (const [i, node] of dag.idescendants().entries()) {
      colorMap.set(node.data.id, interp(i / steps));
    }
    // How to draw edges
    const line = d3
      .line()
      .curve(d3.curveCatmullRom)
      .x((d) => d.x)
      .y((d) => d.y);

    svgSelection
      .append("g")
      .selectAll("path")
      .data(dag.links())
      .enter()
      .append("path")
      .attr("d", ({ points }) => line(points))
      .attr("fill", "none")
      .attr("stroke-width", 3)
      .attr("stroke", ({ source, target }) => {
        const gradId = encodeURIComponent(`${source.data.id}--${target.data.id}`);
        const grad = defs
          .append("linearGradient")
          .attr("id", gradId)
          .attr("gradientUnits", "userSpaceOnUse")
          .attr("x1", source.x)
          .attr("x2", target.x)
          .attr("y1", source.y)
          .attr("y2", target.y);
        grad
          .append("stop")
          .attr("offset", "0%")
          .attr("stop-color", colorMap.get(source.data.id));
        grad
          .append("stop")
          .attr("offset", "100%")
          .attr("stop-color", colorMap.get(target.data.id));
        return `url(#${gradId})`;
      });
    // encodeURIComponents for spaces, hope id doesn't have a `--` in it
    // Select nodes
    const nodes = svgSelection
      .append("g")
      .selectAll("g")
      .data(dag.descendants())
      .enter()
      .append("g")
      .attr("transform", ({ x, y }) => `translate(${x}, ${y})`);

    // Plot node circles
    nodes
      .append("ellipse")
      .attr("rx", (node) => { if (node) { testRef.current.innerHTML = names[node.data.id]; return testRef.current.clientWidth } else { return 20 } })
      .attr("ry", (node) => { if (node) { testRef.current.innerHTML = names[node.data.id]; return testRef.current.clientWidth / 4 } else { return 20 } })
      .attr("fill", (n) => colorMap.get(n.data.id))
      ;
    // Add text to nodes
    nodes
      .append("text")
      .text((d) => names[d.data.id])
      .on('mouseover', function (d, i) {
        d3.select(this).transition()
          .duration('200')
          .attr('transform', 'scale(3)');
        d3.select(this.previousSibling).transition()
          .duration('200')
          .attr('transform', 'scale(3)')
      })
      .on('mouseout', function (d, i) {
        d3.select(this).transition()
          .duration('200')
          .attr('transform', 'scale(1)');
        d3.select(this.previousSibling).transition()
          .duration('200')
          .attr('transform', 'scale(1)')
      })
      .attr("font-family", "sans-serif")
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", "black");

    d3.selectAll("text")
      .each(function () {
        var bbox = this.getBBox();
        d3.select(this.parentNode)
          .insert("rect", "text")
          .attr("x", bbox.x)
          .attr("y", bbox.y)
          .attr("width", bbox.width + 5)
          .attr("height", bbox.height + 5)
          .attr("fill", "white");
      });

  }, [])

  return (
    <><svg ref={svgRef}>
    </svg>
      <div ref={testRef} id="test">
      </div></>

  )
}

export default ML;
