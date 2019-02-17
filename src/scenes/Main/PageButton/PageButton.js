import React, { Component } from 'react';
import styled from 'styled-components';
import Config from 'config';

import portfolioImgSrc from 'images/portfolio.svg';
import liveImgSrc from 'images/live.svg';
import aboutImgSrc from 'images/about.svg';
import cvImgSrc from 'images/cv.svg';
import mailImgSrc from 'images/mail.svg';
import settingsImgSrc from 'images/settings.svg';

const DEFAULT_TRANSITION_TIME = 500;

const CHANGING_STATE_STARTED = 1;
const CHANGING_STATE_FINISHED = 2;

const iconSet = [
  portfolioImgSrc,
  liveImgSrc,
  cvImgSrc,
  settingsImgSrc,
  mailImgSrc,
  aboutImgSrc
];

export default class PageButton extends Component {
    excludedStates = [];

    state = {
      transitionTime: DEFAULT_TRANSITION_TIME,
      viewState: 'DESTINATION_CENTER',
      viewChangingState: CHANGING_STATE_FINISHED
    };
  
    changeViewState = (viewState, transitionTime = DEFAULT_TRANSITION_TIME) =>
      new Promise((resolve, reject) => {
        if (
          this.state.viewState === viewState ||
          this.state.viewChangingState === CHANGING_STATE_STARTED
        ) {
          reject();
        } else {
          this.setState(
            { viewState, viewChangingState: CHANGING_STATE_STARTED, transitionTime },
            () =>
              setTimeout(
                () => this.setState({ viewChangingState: CHANGING_STATE_FINISHED }, resolve),
                transitionTime
              )
          );
        }
      });

    toggleVisibility = () => {
      if (this.state.viewChangingState === CHANGING_STATE_FINISHED) {
        this.changeViewState(this.state.viewState === 'VISIBLE' ? 'HIDDEN' : 'VISIBLE');
      }
    }

    togglePosition = () => {
      if (this.state.viewChangingState === CHANGING_STATE_FINISHED) {
        this.changeViewState(this.state.viewState === 'DESTINATION_RIGHT' ? 'DESTINATION_LEFT' : 'DESTINATION_RIGHT');
      }
    }

    hide = () => this.changeViewState('HIDDEN');

    moveToCircle = () => this.changeViewState('DESTINATION_CIRCLE', 1000);

    moveToCenter = () => this.changeViewState('DESTINATION_CENTER', 1000);

    render() {
      const { viewState, transitionTime } = this.state;
      const { circlePosition } = this.props;

      return (
        <Wrapper
          nextCSS={transitionStyles(circlePosition)[viewState]}
          transitionTime={transitionTime}
        >
          <IconContainer icon={iconSet[circlePosition]} />
        </Wrapper>
      );
    }
}

const wrapperSide = 100 * Config.PX_SCALE_ARG;

const MID_X = Config.WINDOW_WIDTH / 2 - wrapperSide / 2;
const MID_Y = Config.WINDOW_HEIGHT / 2 - wrapperSide / 2;
const POINTS_POS = [
  {
    x: MID_X - Config.PX_SCALE_ARG * 372,
    y: MID_Y - Config.PX_SCALE_ARG * 153
  },
  {
    x: MID_X - Config.PX_SCALE_ARG * 424,
    y: MID_Y
  },
  {
    x: MID_X - Config.PX_SCALE_ARG * 372,
    y: MID_Y + Config.PX_SCALE_ARG * 153
  },
  {
    x: MID_X + Config.PX_SCALE_ARG * 372,
    y: MID_Y - Config.PX_SCALE_ARG * 153
  },
  {
    x: MID_X + Config.PX_SCALE_ARG * 424,
    y: MID_Y
  },
  {
    x: MID_X + Config.PX_SCALE_ARG * 372,
    y: MID_Y + Config.PX_SCALE_ARG * 153
  }
];

const transitionStyles = circlePosition => ({
  DESTINATION_CENTER: `
    opacity: 0;
    box-shadow: 0px 0px 150px rgba(0, 0, 0, 0);
  `,
  DESTINATION_CIRCLE: `
    opacity: 1;
    left: ${POINTS_POS[circlePosition].x}px;
    top: ${POINTS_POS[circlePosition].y}px;
    box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.15);
  `,
  HIDDEN: `
    opacity: 0;
  `
});

const Wrapper = styled.button`
  z-index: 100;
  position: absolute;
  left: ${Config.WINDOW_WIDTH / 2 - wrapperSide / 2}px;
  top: ${Config.WINDOW_HEIGHT / 2 - wrapperSide / 2}px;
  opacity: 0;
  ${({ nextCSS }) => nextCSS};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  width: ${wrapperSide}px;
  height: ${wrapperSide}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${wrapperSide / 2}px;
  background: #FFFFFF;
  outline: none;
  border: none;
  cursor: pointer;
  &:hover {
    transform: scale(1.2);
    box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.25);
  }
`;

const iconSide = 56 * Config.PX_SCALE_ARG;
const IconContainer = styled.div`
  width: ${iconSide}px;
  height: ${iconSide}px;
  background-image: url(${({ icon }) => icon});
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
`;