import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

const DEFAULT_TRANSITION_TIME = 500;

const STATE_NORMAL = 'STATE_NORMAL';
const STATE_HIDDEN = 'STATE_HIDDEN';
const STATE_WAITING = 'STATE_WAITING';
const STATE_TRANSIT = 'STATE_TRANSIT';

const CHANGING_STATE_STARTED = 1;
const CHANGING_STATE_FINISHED = 2;

export default class MainButtonWithViewStates extends Component {
  state = {
    transitionTime: DEFAULT_TRANSITION_TIME,
    viewState: STATE_HIDDEN,
    viewChangingState: CHANGING_STATE_FINISHED
  };

  show = () => {
    this.changeViewState(STATE_TRANSIT).then(() => this.changeViewState(STATE_NORMAL));
  };

  hide = () => {
    this.changeViewState(STATE_TRANSIT).then(() => this.changeViewState(STATE_HIDDEN));
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

  componentDidMount() {
    setTimeout(() => {
      this.show();
    }, 1000);
    setTimeout(() => {
      this.hide();
    }, 3000);
  }

  render() {
    const { viewState, viewChangingState, transitionTime } = this.state;
    const { children } = this.props;

    return (
      <Wrapper state={viewState} transitionTime={transitionTime}>
        <Button state={viewState} transitionTime={transitionTime}>
          {viewState === STATE_NORMAL && viewChangingState === CHANGING_STATE_FINISHED && children}
          {viewState === STATE_WAITING && viewChangingState === CHANGING_STATE_FINISHED && (
            <Loader type="Bars" color="#3F9B06" height="28" width="40" />
          )}
        </Button>
      </Wrapper>
    );
  }

  static propTypes = {
    children: PropTypes.any.isRequired
  };
}

const Wrapper = styled.div`
  ${({ state }) => {
    switch (state) {
      case STATE_NORMAL:
        return `
          width: 240px;
        `;
      case STATE_HIDDEN:
      case STATE_WAITING:
      case STATE_TRANSIT:
        return `
          width: 62px;
        `;
      default:
        return '';
    }
  }};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  height: 62px;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: visible;
`;

const Button = styled.button`
  ${({ state }) => {
    switch (state) {
      case STATE_NORMAL:
        return `
          opacity: 1;
          width: 240px;
          height: 62px;
        `;
      case STATE_HIDDEN:
        return `
          opacity: 0;
          width: 0px;
          height: 0px;
        `;
      case STATE_WAITING:
      case STATE_TRANSIT:
        return `
          opacity: 1;
          width: 62px;
          height: 62px;
        `;
      default:
        return '';
    }
  }};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  font-family: Quicksand;
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  font-size: 25px;
  text-align: center;
  color: #3f9b06;
  background-color: transparent;
  border-radius: 999px;
  border: 2.5px solid #3f9b06;
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
