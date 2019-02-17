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
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 54px;
`;

const TextContainer = styled.div`
  ${({ animationState, delay }) =>
    animationState === ANIMATION_STATE_SHOW_UP
      ? `
    opacity: 0;
    transform: translateY(-20px);
    animation: ${ShowUpKeyframes} 0.5s ease-in-out ${delay}s forwards;
  `
      : `
    opacity: 1;
    transform: translateY(0px);
    animation: ${HideInKeyframes} 0.5s ease-in-out ${delay + 2}s forwards;
  `};
  text-align: center;
  display: flex;
`;

const TitleLabel = styled.span`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 300;
  line-height: 1.5;
  font-size: 35px;
  text-align: center;
  color: #000000;
`;

const ProfLabel = styled.span`
  font-weight: 500;
  font-size: 35px;
  color: #3f9b06;
`;

const AddressLabel = styled.span`
  font-size: 25px;
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
        <TextContainer animationState={animationState} delay={delay}>
          <TitleLabel>
            {/* Hello, I’m Ivan Stinsky<br/>
              <ProfLabel>JS Fullstack Developer</ProfLabel><br/>
              <AddressLabel>from Kharkiv, Ukraine</AddressLabel> */}
          </TitleLabel>
        </TextContainer>
      </Wrapper>
    );
  }
}
