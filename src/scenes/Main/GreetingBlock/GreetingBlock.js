import React from 'react';
import styled from 'styled-components';
import Config from 'config';
import ComponentWithTransitionStates from 'components/ComponentWithTransitionStates';
import BlockWithHidingTransition from './BlockWithHidingTransition';
import ContactButton from './ContactButton';
import theme from 'common/theme';

import YoImage from './YoImage';

export default class GreetingBlock extends ComponentWithTransitionStates {
  show = () => {
    this.changeViewState('TRANSIT')
      .then(() => this.changeViewState('NORMAL')
        .then(this.showUpContent)
      );
  }

  hide = () => {
    this.hideInContent();
    setTimeout(() => {
      this.changeViewState('TRANSIT')
        .then(() => this.changeViewState('HIDDEN'));
    }, 900);
  }

  showUpContent = () => {
    if (this.yoImgRef) {
      this.yoImgRef.show();
    }
    setTimeout(
      () => {
        if (this.helloLineRef) {
          this.helloLineRef.show();
        }
      },
      100
    );
    setTimeout(
      () => {
        if (this.contactBtnRef) {
          this.contactBtnRef.show();
        }
      },
      300
    );
  }

  hideInContent = () => {
    if (this.contactBtnRef) {
      this.contactBtnRef.hide();
    }
    setTimeout(
      () => {
        if (this.helloLineRef) {
          this.helloLineRef.hide();
        }
      },
      500
    );
    setTimeout(
      () => {
        if (this.yoImgRef) {
          this.yoImgRef.hide();
        }
      },
      510
    );
  }

  render() {
    const { onContactClick } = this.props;

    return (
      <Wrapper
        nextCSS={transitionStyles[this.getViewState()]}
        transitionTime={this.getTransitionTime()}
      >
          <YoImage
            ref={ref => {
              this.yoImgRef = ref;
            }}
          />
        <BlockWithHidingTransition
          ref={ref => {
            this.helloLineRef = ref;
          }}
        >
          <HelloLabel>
            Hello, I’m Ivan Stinsky<br />
            <ProfLabel>JS Fullstack Developer</ProfLabel><br />
            <FromLabel>from Kharkiv, Ukraine</FromLabel>
          </HelloLabel>
        </BlockWithHidingTransition>
        <ContactButton
          ref={ref => {
            this.contactBtnRef = ref;
          }}
          onClick={onContactClick}
        >
          Get in Touch
        </ContactButton>
      </Wrapper>
    );
  }
}

const wrapperSideNormal = 568 * Config.PX_SCALE_ARG;
const wrapperSideTransit = 100 * Config.PX_SCALE_ARG;

const transitionStyles = {
  NORMAL: `
    width: ${wrapperSideNormal}px;
    height: ${wrapperSideNormal}px;
    box-shadow: ${theme.greetingBlockShadow};
  `,
  TRANSIT: `
    width: ${wrapperSideTransit}px;
    height: ${wrapperSideTransit}px;
    box-shadow: 0px 0px 250px rgba(0, 0, 0, 0);
  `,
  HIDDEN: `
    opacity: 0;
    width: 0px;
    height: 0px;
    box-shadow: 0px 0px 250px rgba(0, 0, 0, 0);
  `
};

const Wrapper = styled.div`
  z-index: 200;
  box-shadow: ${theme.greetingBlockShadow};
  ${({ nextCSS }) => nextCSS};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  border-radius: ${wrapperSideNormal / 2}px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: ${theme.bgMainColor};
  align-items: center;
`;

const HelloLabel = styled.div`
  font-family: Quicksand;
  font-style: normal;
  font-weight: 300;
  line-height: normal;
  font-size: ${35 * Config.PX_SCALE_ARG}px;
  text-align: center;
  color: ${theme.textMainColor};
  margin-top: ${54 * Config.PX_SCALE_ARG}px;
  margin-bottom: ${64 * Config.PX_SCALE_ARG}px;
`;

const ProfLabel = styled.span`
  font-weight: 500;
  color: ${theme.textHighlightColor};
`;

const FromLabel = styled.span`
  font-size: ${26 * Config.PX_SCALE_ARG}px;
`;
