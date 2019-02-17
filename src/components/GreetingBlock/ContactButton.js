import React, { Component } from 'react';
import styled from 'styled-components';
import { keyframes } from 'styled-components';
import ReactLoading from 'react-loading';

const WrapperShowUpKeyframes = keyframes`
  0% {
    opacity: 0;
    width: 0px;
    height: 0px;
  }
  50% {
    opacity: 1;
    width: 62px;
    height: 62px;
  }
  100% {
    opacity: 1;
    width: 240px;
    height: 62px;
  }
`;

const WrapperHideInKeyframes = keyframes`
0% {
  opacity: 1
  width: 240px;
  height: 62px;
}
50% {
  opacity: 1;
  width: 62px;
  height: 62px;
}
100% {
  opacity: 0;
  width: 0px;
  height: 0px;
}
`;

const ShowUpKeyframes = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const HideInKeyframes = keyframes`
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
`;

const Wrapper = styled.div`
  min-height: 62px;
  margin-top: 64px;
`;

const Button = styled.button`
  ${({ animationState, delay }) => animationState === ANIMATION_STATE_SHOW_UP ? `
    opacity: 0;
    width: 0px;
    height: 0px;
    animation: ${WrapperShowUpKeyframes} 1s ease-in-out ${delay}s forwards;
  ` : `
    opacity: 1;
    width: 240px;
    height: 62px;
    animation: ${WrapperHideInKeyframes} 1s ease-in-out ${delay + 1}s forwards;
  `};
  display: block;
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 25px;
  text-align: center;
  color: #3F9B06;
  background-color: transparent;
  border-radius: 999px;
  border: 2.5px solid #3F9B06;
  outline: none;
  cursor: pointer;
  
  transition: 0.5s;
  padding: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #3F9B06;
    color: #ffffff;
  }
`;

const Label = styled.span`
  ${({ animationState, delay }) => animationState === ANIMATION_STATE_SHOW_UP ? `
    opacity: 0;
    animation: ${ShowUpKeyframes} 1s ease-in-out ${delay + 1}s forwards;
  ` : `
    opacity: 1;
    animation: ${HideInKeyframes} 1s ease-in-out ${delay}s forwards;
  `};
`;

const ANIMATION_STATE_SHOW_UP = 1;
const ANIMATION_STATE_HIDE_IN = 2;

export default class ContactButton extends Component {
  isFirstTimeRendered = false;

  state = {
    animationState: ANIMATION_STATE_SHOW_UP
  };

  show = () => {
    this.setState({ animationState: ANIMATION_STATE_SHOW_UP });
  }

  hide = () => {
    this.setState({ animationState: ANIMATION_STATE_HIDE_IN });
  }

  render() {
    const { animationState } = this.state;
    const delay = this.isFirstTimeRendered ? 0 : this.props.initDelay;
    if (!this.isFirstTimeRendered) {
      this.isFirstTimeRendered = true;
    }

    return (
      <Wrapper>
        <Button animationState={animationState} delay={delay}>
          <Label animationState={animationState} delay={delay}>Get in touch</Label>
        </Button>
      </Wrapper>
    )
  }
}