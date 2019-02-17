import React, { Component } from 'react';

const DEFAULT_TRANSITION_TIME = 500;

const TRANSITION_STATE_NORMAL = 'NORMAL';
const TRANSITION_STATE_HIDDEN = 'HIDDEN';
const TRANSITION_STATE_TRANSIT = 'TRANSIT';

const CHANGING_STATE_STARTED = 1;
const CHANGING_STATE_FINISHED = 2;

export default function withTransitionStates(WrappedComponent, transitionStyles) {
  return class extends Component {
    state = {
      transitionTime: DEFAULT_TRANSITION_TIME,
      viewState: TRANSITION_STATE_NORMAL,
      viewChangingState: CHANGING_STATE_FINISHED
    };
  
    show = () => {
      this.changeViewState(TRANSITION_STATE_TRANSIT).then(() => this.changeViewState(TRANSITION_STATE_NORMAL));
    };
  
    hide = () => {
      this.changeViewState(TRANSITION_STATE_TRANSIT).then(() => this.changeViewState(TRANSITION_STATE_HIDDEN));
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

    render() {
      const { viewState, viewChangingState, transitionTime } = this.state;
      let nextStyles = '';
      if (transitionStyles && transitionStyles.hasOwnProperty(viewState)) {
        nextStyles = transitionStyles[viewState];
      }

      return (
        <WrappedComponent
          nextCSS={nextStyles}
          isTransitionFinished={viewChangingState === CHANGING_STATE_FINISHED}
          {...this.props}
        />
      );
    }
  }
}