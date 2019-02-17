import React, { Component } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';

const ShowUpKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

const HideInKeyframes = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0px);
  }
  100% {
    opacity: 0;
    transform: translateY(-20px);
  }
`;

const Wrapper = styled.div`
  width: 76px;
  height: 76px;
`;

const Image = styled.div`
  ${({ animationState, delay }) =>
    animationState === ANIMATION_STATE_SHOW_UP
      ? `
    opacity: 0;
    transform: translateY(-20px);
    animation: ${ShowUpKeyframes} 0.5s ease-in-out ${delay + 0.5}s forwards;
  `
      : `
    opacity: 1;
    transform: translateY(0px);
    animation: ${HideInKeyframes} 0.5s ease-in-out ${delay + 2.5}s forwards;
  `};
  width: 76px;
  height: 76px;
  background-image: url('images/cool.svg');
  background-position: center;
  bacgkround-size: contain;
`;

const ANIMATION_STATE_SHOW_UP = 1;
const ANIMATION_STATE_HIDE_IN = 2;

export default class YoImage extends Component {
  isFirstTimeRendered = false;

  state = {
    animationState: ANIMATION_STATE_SHOW_UP,
  };

  show = () => {
    this.setState({ animationState: ANIMATION_STATE_SHOW_UP });
  };

  hide = () => {
    this.setState({ animationState: ANIMATION_STATE_HIDE_IN });
  };

  render() {
    const { animationState } = this.state;
    const delay = this.isFirstTimeRendered ? 0 : this.props.initDelay;
    if (!this.isFirstTimeRendered) {
      this.isFirstTimeRendered = true;
    }

    return (
      <Wrapper>
        <Image animationState={animationState} delay={delay} />
      </Wrapper>
    );
  }
}
