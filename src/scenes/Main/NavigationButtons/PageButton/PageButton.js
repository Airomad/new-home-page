import React, { Component } from 'react';
import styled from 'styled-components';
import Config from 'config';
import theme from 'common/theme';

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

  hideFocused = () => this.changeViewState('HIDDEN_FOCUSED');

  moveToCircle = () => this.changeViewState('DESTINATION_CIRCLE', 1000);

  moveToCenter = () => this.changeViewState('DESTINATION_CENTER', 1000);

  moveToLeft = () => this.changeViewState('DESTINATION_LEFT_MIDDLE');

  moveToVerticalLine = () => this.changeViewState('DESTINATION_VERTICAL_LINE');

  focus = () => this.changeViewState('FOCUSED');

  render() {
    const { viewState, transitionTime } = this.state;
    const { circlePosition, onClick } = this.props;

    return (
      <WrapperButton
        onClick={() => viewState === 'DESTINATION_CIRCLE' ? onClick(circlePosition) : null}
        nextCSS={transitionStyles(circlePosition)[viewState]}
        transitionTime={transitionTime}
      >
        <IconContainer icon={iconSet[circlePosition]} />
      </WrapperButton>
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

const offsetVertical = 20 * Config.PX_SCALE_ARG;
const wrapperSideSmall = (Config.WINDOW_HEIGHT - 200 - 120 * Config.PX_SCALE_ARG) / 6;
const wrapperSmallXPos = (72 * Config.PX_SCALE_ARG) - wrapperSideSmall / 2;
const VERTICAL_Y_START = (Config.WINDOW_HEIGHT - (offsetVertical + wrapperSideSmall) * 6) / 2;
const VERTICAL_LINE_POINTS_POS_Y = [
  VERTICAL_Y_START,
  VERTICAL_Y_START + wrapperSideSmall + offsetVertical,
  VERTICAL_Y_START + (offsetVertical + wrapperSideSmall) * 2,
  VERTICAL_Y_START + (offsetVertical + wrapperSideSmall) * 3,
  VERTICAL_Y_START + (offsetVertical + wrapperSideSmall) * 4,
  VERTICAL_Y_START + (offsetVertical + wrapperSideSmall) * 5,
]

const transitionStyles = circlePosition => ({
  DESTINATION_CENTER: `
    opacity: 0;
    position: absolute;
    box-shadow: 0px 0px 150px rgba(0, 0, 0, 0);
    left: ${Config.WINDOW_WIDTH / 2 - wrapperSide / 2}px;
    top: ${Config.WINDOW_HEIGHT / 2 - wrapperSide / 2}px;
  `,
  DESTINATION_CIRCLE: `
    opacity: 1;
    position: absolute;
    left: ${POINTS_POS[circlePosition].x}px;
    top: ${POINTS_POS[circlePosition].y}px;
    box-shadow: ${theme.pageButtonShadow};
    &:hover {
      transform: scale(1.2);
      box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.25);
    }
    cursor: pointer;
  `,
  DESTINATION_VERTICAL_LINE: `
    opacity: 1;
    position: absolute;
    width: ${wrapperSideSmall}px;
    height: ${wrapperSideSmall}px;
    border-radius: ${wrapperSideSmall / 2}px;
    left: ${wrapperSmallXPos}px;
    top: ${VERTICAL_LINE_POINTS_POS_Y[circlePosition]}px;
    box-shadow: ${theme.pageButtonShadow};
  `,
  DESTINATION_LEFT_MIDDLE: `
    position: absolute;
    opacity: 1;
    width: ${wrapperSideSmall}px;
    height: ${wrapperSideSmall}px;
    border-radius: ${wrapperSideSmall / 2}px;
    top: ${Config.WINDOW_HEIGHT / 2 - wrapperSideSmall / 2}px;
    left: ${28 * Config.PX_SCALE_ARG}px;
  `,
  FOCUSED: `
    z-index: 160;
    opacity: 1;
    position: absolute;
    left: ${176 * Config.PX_SCALE_ARG}px;
    top: ${41 * Config.PX_SCALE_ARG}px;
    box-shadow: 0px 0px 150px rgba(0, 0, 0, 0);
    cursor: normal;
    &:hover {
      transform: scale(1);
      box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
    }
  `,
  HIDDEN_FOCUSED: `
    opacity: 0;
    position: absolute;
    left: ${176 * Config.PX_SCALE_ARG}px;
    top: ${41 * Config.PX_SCALE_ARG}px;
  `
});

const WrapperButton = styled.button`
  z-index: 160;
  opacity: 0;
  &:hover {
    transform: scale(1.2);
    box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.25);
  }
  cursor: pointer;
  width: ${wrapperSide}px;
  height: ${wrapperSide}px;
  border-radius: ${wrapperSide / 2}px;
  ${({ nextCSS }) => nextCSS};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  background: ${theme.bgMainColor};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  border: none;
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
