import React from 'react';
import styled from 'styled-components';
import ComponentWithTransitionStates from 'components/ComponentWithTransitionStates';

export default class BlockWithHidingTransition extends ComponentWithTransitionStates {
  constructor(props) {
    super(props);
    this.excludeViewState('TRANSIT');
  }

  render() {
    const { children } = this.props;

    return (
      <Wrapper
        nextCSS={transitionStyles[this.getViewState()]}
        transitionTime={this.getTransitionTime()}
      >
        {children}
      </Wrapper>
    );
  }
}

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

const Wrapper = styled.div`
  ${({ nextCSS }) => nextCSS};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
`;
