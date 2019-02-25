import React, { Component } from 'react';
import styled from 'styled-components';

// import GreetingBlock from 'components/GreetingBlock';
import MainScene from './Main';
import AboutScene from './About';
// import SandBox from './Sandbox';

// const Wrapper = styled.div`
//   display: flex;
//   flex: 1;
//   border: 1px solid red;
//   overflow-y: scroll;
//   justify-content: center;
//   align-items: center;
// `;

export default class App extends Component {
  render() {
    return <AboutScene />;
  }
}
