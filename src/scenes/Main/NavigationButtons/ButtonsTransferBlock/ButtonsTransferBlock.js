import React, { Component } from 'react';
import styled from 'styled-components';
import Config from 'config';

const DEFAULT_TRANSITION_TIME = 500;

const CHANGING_STATE_STARTED = 1;
const CHANGING_STATE_FINISHED = 2;

export default class ButtonsTransferBlock extends Component {
    excludedStates = [];

    state = {
      transitionTime: DEFAULT_TRANSITION_TIME,
      viewState: 'VISIBLE',
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

    hide = () => this.changeViewState('HIDDEN');

    show = () => this.changeViewState('VISIBLE');

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

    moveLeft = () => this.changeViewState('DESTINATION_LEFT');

    focus = () => this.changeViewState('FOCUSED');

    render() {
      const { viewState, transitionTime } = this.state;

      return (
        <Wrapper
          nextCSS={transitionStyles[viewState]}
          transitionTime={transitionTime}
        />
      );
    }
}

const wrapperSide = 100 * Config.PX_SCALE_ARG;
const transitionStyles = {
  VISIBLE: `
    opacity: 1;
  `,
  DESTINATION_RIGHT: `
    left: ${Config.WINDOW_WIDTH / 2 - wrapperSide / 2}px;
  `,
  DESTINATION_LEFT: `
    left: ${28 * Config.PX_SCALE_ARG}px;
  `,
  HIDDEN: `
    opacity: 0;
  `
};

const Wrapper = styled.div`
  position: absolute;
  left: ${Config.WINDOW_WIDTH / 2 - wrapperSide / 2}px;
  ${({ nextCSS }) => nextCSS};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  width: ${wrapperSide}px;
  height: ${wrapperSide}px;
  display: block;
  top: ${Config.WINDOW_HEIGHT / 2 - wrapperSide / 2}px;
  border-radius: ${wrapperSide / 2}px;
  background: #FFFFFF;
  box-shadow: 0px 0px 150px rgba(0, 0, 0, 0.15);
`;
