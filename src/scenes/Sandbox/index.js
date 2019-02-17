import React, { Component } from 'react';
import styled from 'styled-components';

import MainButtonWithViewStates from '../../components/MainButtonWithViewStates';

export default class SandBox extends Component {
  render() {
    return (
      <W>
        <MainButtonWithViewStates>Test button</MainButtonWithViewStates>
      </W>
    );
  }
}

const W = styled.div`
  display: flex;
  height: 400px;
  flex: 1;
  justify-content: center;
`;
