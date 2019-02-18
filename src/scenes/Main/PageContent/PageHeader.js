import React from 'react';
import styled from 'styled-components';
import Config from 'config';
import ComponentWithTransitionStates from 'components/ComponentWithTransitionStates';


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
        
        <TitleLabel>My Portfolio</TitleLabel>
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
  height: ${118 * Config.PX_SCALE_ARG}px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const TitleLabel = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: 30px;
  text-align: center;
  color: #000000;
  margin-left: ${136 * Config.PX_SCALE_ARG}px;
`;
