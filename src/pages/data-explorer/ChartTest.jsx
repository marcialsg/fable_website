import React, { Component } from "react";
import { HorizontalBar } from 'react-chartjs-2'
import { Card } from "react-bootstrap";

import styled from 'styled-components';

const Styles = styled.div`
.pane-info {
  width: 450px;
  max-height: 89.25vh;
  background: #fff;
}
#pane-body .card-body{
  overflow: auto;
}
`;


class ChartTest extends Component {
  render() {
    return (
      <Styles>
        <Card className="pane-info">
          <Card.Header><strong>Information</strong></Card.Header>
          <Card.Body id="pane-body">
            <Card.Title>Country Name Text</Card.Title>
            <Card.Text>
              Placeholder Text
            </Card.Text>
            <strong>Charts</strong>
            <HorizontalBar data={data} options={options} />
          </Card.Body>
        </Card>
      </Styles>
    );
  }
}
const rand = () => Math.floor(Math.random() * 255)
const data = {
  labels: ['One','Two','Three'],
  datasets: [
    {
      label: 'A',
      data: [rand(), rand(), rand()],
      backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
    },
    {
      label: 'B',
      data: [rand(), rand(), rand()],
      backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
    },
    {
      label: 'C',
      data: [rand(), rand(), rand()],
      backgroundColor: `rgb(${rand()}, ${rand()}, ${rand()})`,
    },
  ],
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
}

export default ChartTest;