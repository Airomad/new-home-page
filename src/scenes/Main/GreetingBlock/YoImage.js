import React from 'react';
import styled from 'styled-components';
import Config from 'config';
import ComponentWithTransitionStates from 'components/ComponentWithTransitionStates';
import img from 'images/cool.svg';

export default class YoImage extends ComponentWithTransitionStates {
  constructor(props) {
    super(props);
    this.excludeViewState('TRANSIT');
  }

  render() {
    return (
      <WrapperImage
        nextCSS={transitionStyles[this.getViewState()]}
        transitionTime={this.getTransitionTime()}
      />
    );
  }
}

const wrapperSideNormal = 76 * Config.PX_SCALE_ARG;

const transitionStyles = {
  NORMAL: `
    transform: translateY(0);
    opacity: 1;
  `,
  HIDDEN: `
    transform: translateY(-20px);
    opacity: 0;
  `
};

const WrapperImage = styled.div`
  ${({ nextCSS }) => nextCSS};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  width: ${wrapperSideNormal}px;
  height: ${wrapperSideNormal}px;
  display: block;
  background-image: url(${img});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;
