import React, { Component } from 'react';
import styled from 'styled-components';
import theme from 'common/theme';

import PageButton from './PageButton';

const INIT_SPLIT_DELAY = 0; // 2400
const INIT_COLLECT_DELAY = 0;

export default class NavigationButtons extends Component {
  buttons = [];


  setInitOriginPosition = (position = 'center') => {
    this.buttons.forEach(button => {
      if (position === 'center') {
        button.ref.moveToCenter();
      } else if (position === 'left') {
        button.ref.moveToLeft();
      }
    });
  }

  openPageContent = () => {
    setTimeout(() => {
      this.collectButtonsOnCenter();
    }, 1000);
    setTimeout(() => this.transferButtonsToLeft(), 2300);
    setTimeout(() => this.splitButtonsVertical(), 3000);
  }

  splitButtonsFromCenter = () => {
    setTimeout(() => {
      this.buttons.forEach(button => {
        button.ref.moveToCircle();
      });
      if (this.buttonsTransferRef) {
        this.buttonsTransferRef.hide();
      }
    }, INIT_SPLIT_DELAY);
  }

  collectButtonsOnCenter = (buttonIdExcept) => {
    setTimeout(() => {
      this.buttons.forEach(button => {
        button.ref.moveToCenter();
      });
      if (this.buttonsTransferRef) {
        this.buttonsTransferRef.show();
      }
    }, INIT_COLLECT_DELAY);
  }

  splitButtonsVertical = () => {
    this.buttons.forEach(button => {
      button.ref.moveToVerticalLine();
    });
    if (this.buttonsTransferRef) {
      this.buttonsTransferRef.hide();
    }
  }

  transferButtonsToLeft = () => {
    this.buttons.forEach(button => {
      button.ref.moveToLeft();
    });
    if (this.buttonsTransferRef) {
      this.buttonsTransferRef.moveLeft();
    }
  }

  handleButtonClick = (buttonId) => {
    const { onButtonClick } = this.props;
    onButtonClick(buttonId);
  }

  onButtonRef = (id, ref) => {
    const f = this.buttons.filter(btn => btn.id === id);
    if (f && f.length > 0) {
      return;
    }
    this.buttons.push({
      id,
      ref
    });
  }

  render() {
    return (
      <Wrapper>
        <PageButton
          circlePosition={0}
          onClick={this.handleButtonClick}
          ref={ref => this.onButtonRef(0, ref)}
          active
        />
        <PageButton
          circlePosition={1}
          onClick={this.handleButtonClick}
          ref={ref => this.onButtonRef(1, ref)}
        />
        <PageButton
          circlePosition={2}
          onClick={this.handleButtonClick}
          ref={ref => this.onButtonRef(2, ref)}
        />
        <PageButton
          circlePosition={3}
          onClick={this.handleButtonClick}
          ref={ref => this.onButtonRef(3, ref)}
        />
        <PageButton
          circlePosition={4}
          onClick={this.handleButtonClick}
          ref={ref => this.onButtonRef(4, ref)}
        />
        <PageButton
          circlePosition={5}
          onClick={this.handleButtonClick}
          ref={ref => this.onButtonRef(5, ref)}
        />
      </Wrapper>
    );
  }
}

const Wrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 0px;
  right: 0px;
  bottom: 0px;
  display: flex;
  background-color: ${theme.bgMainColor};
  flex: 1;
  justify-content: center;
  align-items: center;
  border: 1px solid red;
`;
