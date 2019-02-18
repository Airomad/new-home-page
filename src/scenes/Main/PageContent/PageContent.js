import React from 'react';
import styled from 'styled-components';
import Config from 'config';
import ComponentWithTransitionStates from 'components/ComponentWithTransitionStates';
import PageHeader from './PageHeader';

export default class MainScene extends ComponentWithTransitionStates {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.showPageContent();
    //   // this.changeViewState('TRANSIT').then(() => this.changeViewState('NORMAL', 2000))
    // }, 2200);
  }

  showPageContent = () => {
    this.changeViewState('TRANSIT')
      .then(() => {
        setTimeout(() => {
          this.changeViewState('NORMAL', 600)
            .then(() => {
              if (this.headerRef) {
                this.headerRef.show();
              }
            });
        }, 1000);
      });
  }

  render() {
    return (
      <Wrapper>
        <InnerScrollRemover>
          <ContentContainer
            nextCSS={transitionStyles[this.getViewState()]}
            transitionTime={this.getTransitionTime()}
          >
            <PageHeader ref={ref => this.headerRef = ref } />
          {/* {this.isTransitionFinished() && <div>
            sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
       sdfsdfsdf sdf<br/>
          </div>} */}
        </ContentContainer>
       </InnerScrollRemover>
      </Wrapper>
    );
  }
}

const wrapperTransitSide = 100 * Config.PX_SCALE_ARG;
const wrapperNormalLeftOffset = 145 * Config.PX_SCALE_ARG;
const wrapperNormalVerticalOffset = 30 * Config.PX_SCALE_ARG;
const transitionStyles = {
  NORMAL: `
    opacity: 1;
    left: ${wrapperNormalLeftOffset}px;
    top: ${wrapperNormalVerticalOffset}px;
    margin-bottom: ${wrapperNormalVerticalOffset}px;
    width: ${Config.WINDOW_WIDTH - wrapperNormalLeftOffset - 26 * Config.PX_SCALE_ARG}px;
    min-height: ${Config.WINDOW_HEIGHT - wrapperNormalVerticalOffset * 2}px;
    border-radius: ${28 * Config.PX_SCALE_ARG}px;
  `,
  TRANSIT: `
    left: ${176 * Config.PX_SCALE_ARG}px;
    top: ${41 * Config.PX_SCALE_ARG}px;
    width: ${wrapperTransitSide}px;
    height: ${wrapperTransitSide}px;
    border-radius: ${wrapperTransitSide / 2}px;
    opacity: 1;
  `,
  HIDDEN: `
    opacity: 0;
    left: ${153 * Config.PX_SCALE_ARG}px;
    top: ${15 * Config.PX_SCALE_ARG}px;
    width: ${wrapperTransitSide}px;
    height: ${wrapperTransitSide}px;
    border-radius: ${wrapperTransitSide / 2}px;
  `
};

const Wrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: 0px;
  z-index: 150;
  overflow: hidden;
`;

const InnerScrollRemover = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  bottom: 0px;
  right: -20px;
  overflow-y: scroll;
`;

const ContentContainer = styled.div`
  min-height: auto;
  ${({ nextCSS }) => nextCSS};
  transition: all ${({ transitionTime }) => (transitionTime ? transitionTime / 1000 : 0.5)}s;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  position: absolute;
  background: #FFFFFF;
  box-shadow: 0px 0px 250px rgba(0, 0, 0, 0.14);
`;
