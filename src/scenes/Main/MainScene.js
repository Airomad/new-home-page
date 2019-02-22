import React, { Component } from 'react';
import styled from 'styled-components';

import GreetingBlock from './GreetingBlock';
import NavigationButtons from './NavigationButtons';
import PageContent from './PageContent';

export default class MainScene extends Component {
  buttonsRef = [];

  componentDidMount() {
    setTimeout(() => {
      if (this.greetingBlockRef) {
        this.greetingBlockRef.show();
      }
    }, 100);

    setTimeout(() => {
      if (this.navigationButtonsRef) {
        this.navigationButtonsRef.splitButtonsFromCenter();
      }
    }, 2500);
  }

  handleContactClick = () => {
    this.handleButtonClick(4);
  }

  handleButtonClick = (buttonId) => {
    if (this.greetingBlockRef) {
      this.greetingBlockRef.hide();
    }
    if (this.navigationButtonsRef) {
      this.navigationButtonsRef.openPageContent(buttonId);
    }

    setTimeout(() => {
      if (this.pageContentRef) {
        this.pageContentRef.showPageContent();
      }
    }, 2000);
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
        <PageContent ref={ref => this.pageContentRef = ref} />
        <NavigationButtons
          ref={ref => this.navigationButtonsRef = ref}
          onButtonClick={this.handleButtonClick}
        />
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
