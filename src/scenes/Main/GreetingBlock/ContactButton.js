import React from 'react';
import styled from 'styled-components';
import Config from 'config';
import ComponentWithTransitionStates from 'components/ComponentWithTransitionStates';

export default class ContactButton extends ComponentWithTransitionStates {
  render() {
    const { children, onClick } = this.props;
    const isButtonReady = this.isTransitionFinished() && this.getViewState() === 'NORMAL';

    return (
      <WrapperButton
        nextCSS={transitionStyles[this.getViewState()]}
        transitionTime={this.getTransitionTime()}
        onClick={onClick}
        disabled={!isButtonReady}
      >
        {this.isTransitionFinished() && children}
      </WrapperButton>
    );
  }
}

const wrapperNormalHeight = 62 * Config.PX_SCALE_ARG;
const transitionStyles = {
  NORMAL: `
    opacity: 1;
    width: ${240 * Config.PX_SCALE_ARG}px;
    height: ${wrapperNormalHeight}px;
  `,
  TRANSIT: `
    opacity: 1;
    width: ${wrapperNormalHeight}px;
    height: ${wrapperNormalHeight}px;
  `,
  HIDDEN: `
    opacity: 0;
    width: 0px;
    height: 0px;
  `
};

const WrapperButton = styled.button`
  ${({ nextCSS }) => nextCSS};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: ${25 * Config.PX_SCALE_ARG}px;
  text-align: center;
  color: #3f9b06;
  background-color: transparent;
  border-radius: 999px;
  border: ${2.5 * Config.PX_SCALE_ARG}px solid #3f9b06;
  outline: none;
  cursor: pointer;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #3f9b06;
    color: #ffffff;
  }
`;
