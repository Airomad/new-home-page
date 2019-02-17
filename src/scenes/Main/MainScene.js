import React, { Component } from 'react';
import styled from 'styled-components';

import GreetingBlock from './GreetingBlock';
import ButtonsTransferBlock from './ButtonsTransferBlock';
import PageButton from './PageButton';

export default class MainScene extends Component {
  buttonsRef = [];

  componentDidMount() {
    setTimeout(() => {
      if (this.greetingBlockRef) {
        this.greetingBlockRef.show();
      }
    }, 100);

    setTimeout(() => {
      this.buttonsRef.forEach(node => node.moveToCircle());
    }, 2500);
  }

  handleContactClick = () => {
    this.buttonsRef.forEach(node => node.moveToCenter());
    setTimeout(
      () => {
        this.buttonsRef.forEach(node => node.hide());
      },
      1200
    );

    
      if (this.greetingBlockRef) {
        this.greetingBlockRef.hide();
      }
  
      // setTimeout(() => {
      //   if (this.buttonsTransferRef) {
      //     this.buttonsTransferRef.toggleVisibility();
      //   }
      // }, 1500);
      setTimeout(() => {
        if (this.buttonsTransferRef) {
          this.buttonsTransferRef.moveLeft();
        }
      }, 2600);
    
  }

  render() {
    this.buttonsRef = [];

    return (
      <Wrapper>
        <GreetingBlock
          ref={ref => {
            this.greetingBlockRef = ref;
          }}
          onContactClick={this.handleContactClick}
        />
        <ButtonsTransferBlock
          ref={ref => {
            this.buttonsTransferRef = ref;
          }}
        />
        <PageButton circlePosition={0} ref={ref => this.buttonsRef.push(ref)} />
        <PageButton circlePosition={1} ref={ref => this.buttonsRef.push(ref)} />
        <PageButton circlePosition={2} ref={ref => this.buttonsRef.push(ref)} />
        <PageButton circlePosition={3} ref={ref => this.buttonsRef.push(ref)} />
        <PageButton circlePosition={4} ref={ref => this.buttonsRef.push(ref)} />
        <PageButton circlePosition={5} ref={ref => this.buttonsRef.push(ref)} />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  display: flex;
  background-color: #fff;
  flex: 1;
  justify-content: center;
  align-items: center;
`;
