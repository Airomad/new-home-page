import React, { Component } from 'react';
import styled from 'styled-components';

import GreetingBlock from './GreetingBlock';
import NavigationButtons from 'components/NavigationButtons';
import PageContent from './PageContent';
import theme from 'common/theme';

export default class MainScene extends Component {
  buttonsRef = [];

  state = {
    isReady: false,
  };

  componentDidMount() {
    // this.pageContentRef.showPageContent();
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

    setTimeout(() => this.setState({ isReady: true }), 5000);
  }

  handleContactClick = () => {
    this.handleButtonClick(4);
  }

  handleButtonClick = (buttonId) => {
    // if (this.state.isReady) {
    if (this.navigationButtonsRef) {
      this.navigationButtonsRef.collectButtonsOnCenter();
    }
    // setTimeout(() => {

    // }, 1000);
    if (this.greetingBlockRef) {
      this.greetingBlockRef.hide();
    }

    // }

    // setTimeout(() => {
    //   if (this.pageContentRef) {
    //     this.pageContentRef.showPageContent();
    //   }
    // }, 2000);
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
  background-color: ${theme.bgMainColor};
  flex: 1;
  justify-content: center;
  align-items: center;
`;
