import React from 'react';
import styled from 'styled-components';
import Config from 'config';
import theme from 'common/theme';
import ComponentWithTransitionStates from 'components/ComponentWithTransitionStates';
import closeIconSrc from './close-icon.svg';

export default class PageHeader extends ComponentWithTransitionStates {
  constructor(props) {
    super(props);
    this.excludeViewState('TRANSIT');
  }

  render() {
    return (
      <Wrapper
        nextCSS={transitionStyles[this.getViewState()]}
        transitionTime={this.getTransitionTime()}
      >
        <ContentContainer>
          <TitleLabel>My Portfolio</TitleLabel>
          <CloseButton />
        </ContentContainer>
        <Underline />
      </Wrapper>
    );
  }
}

const transitionStyles = {
  NORMAL: `
    opacity: 1;
  `,
  HIDDEN: `
    opacity: 0;
  `
};

const Wrapper = styled.div`
  ${({ nextCSS }) => nextCSS};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  z-index: 300;
  height: ${70 * Config.PX_SCALE_ARG}px;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-direction: column;
  align-items: stretch;
`;

const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  flex-direction: row;
  margin-left: ${50 * Config.PX_SCALE_ARG}px;
  margin-right: ${50 * Config.PX_SCALE_ARG}px;
`;

const TitleLabel = styled.div`
  display: flex;
  flex: 1;
  font-family: Quicksand;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: ${30 * Config.PX_SCALE_ARG}px;
  text-align: left;
  color: ${theme.pageContentTextColor};
`;

const Underline = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${theme.pageContentHeaderUnderlineColor};
`;

const CloseButton = styled.button`
  display: block;
  outline: none;
  border: none;
  cursor: pointer;
  background-color: transparent;
  width: ${16 * Config.PX_SCALE_ARG}px;
  height: ${16 * Config.PX_SCALE_ARG}px;
  background-image: url(${closeIconSrc});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  opacity: 0.3;
  &:hover {
    opacity: 1;
  }
  transition: 0.5s;
`;
