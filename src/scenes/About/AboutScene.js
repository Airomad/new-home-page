import React, { Component } from 'react';
import styled from 'styled-components';

import NavigationButtons from 'components/NavigationButtons';
import PageContent from 'components/PageContent';
import theme from 'common/theme';

export default class AboutScene extends Component {
  componentDidMount() {
    this.navigationButtonsRef.setInitOriginPosition('left');
    setTimeout(() => {
      this.pageContentRef.showPageContent();
      
    }, 100);
    setTimeout(() => {
      this.navigationButtonsRef.splitButtonsVertical();
    }, 600);
  }

  render() {
    return (
      <Wrapper>
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
