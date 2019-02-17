import { Component } from 'react';

const DEFAULT_TRANSITION_TIME = 500;

const TRANSITION_STATE_NORMAL = 'NORMAL';
const TRANSITION_STATE_HIDDEN = 'HIDDEN';
const TRANSITION_STATE_TRANSIT = 'TRANSIT';

const CHANGING_STATE_STARTED = 1;
const CHANGING_STATE_FINISHED = 2;

export default class ComponentWithTransitionStates extends Component {
    excludedStates = [];

    state = {
      transitionTime: DEFAULT_TRANSITION_TIME,
      viewState: TRANSITION_STATE_HIDDEN,
      viewChangingState: CHANGING_STATE_FINISHED
    };

    setInitViewState = (viewState) => {
      this.state.viewState = viewState;
    }

    excludeViewState = (viewStateToExclude) => {
      if (!this.excludedStates.includes(viewStateToExclude)) {
        this.excludedStates = [...this.excludedStates, viewStateToExclude];
      }
    }
  
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
          if (this.excludedStates.includes(viewState)) {
            resolve();
            return;
          }
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

    getViewState = () => this.state.viewState;

    getTransitionTime = () => this.state.transitionTime;

    isTransitionFinished = () => this.state.viewChangingState === CHANGING_STATE_FINISHED;
}