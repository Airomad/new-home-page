import React, { Component } from 'react';
import styled from 'styled-components';
import theme from 'common/theme';

import ButtonsTransferBlock from './ButtonsTransferBlock';
import PageButton from './PageButton';

const INIT_SPLIT_DELAY = 0; // 2400
const INIT_COLLECT_DELAY = 0;
const INIT_DELAY_HIDE = 0;

export default class NavigationButtons extends Component {
  buttons = [];

  // componentDidMount() {

  // }

  openPageContent = (buttonId) => {
    // this.splitButtonsFromCenter();
    setTimeout(() => {
      this.collectButtonsOnCenter();
      // this.focusOnButton();
    }, 1000);
    setTimeout(() => this.transferButtonsToLeft(), 2300);
    setTimeout(() => this.splitButtonsVertical(), 3000);
  }

  splitButtonsFromCenter = (buttonIdExcept) => {
    setTimeout(() => {
      this.buttons.forEach(button => {
        // if (button.id !== buttonIdExcept) {
        button.ref.moveToCircle();
        // }
      });
      if (this.buttonsTransferRef) {
        this.buttonsTransferRef.hide();
      }
    }, INIT_SPLIT_DELAY);
  }

  collectButtonsOnCenter = (buttonIdExcept) => {
    setTimeout(() => {
      this.buttons.forEach(button => {
        console.log(button);
        // if (button.id !== buttonIdExcept) {
        button.ref.moveToCenter();
        // }
      });
      if (this.buttonsTransferRef) {
        this.buttonsTransferRef.show();
      }
    }, INIT_COLLECT_DELAY);
  }

  splitButtonsVertical = (buttonIdExcept) => {
    this.buttons.forEach(button => {
      // if (button.id !== buttonIdExcept) {
      button.ref.moveToVerticalLine();
      // }
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

  focusOnButton = (buttonId) => {
    // const fb = this.buttons.filter(button => button.id === buttonId);
    // if (fb && fb[0]) {
    //   fb[0].ref.focus();
    //   // setTimeout(() => fb[0].ref.hideFocused(), 2800);
    // }
  }

  handleButtonClick = (buttonId) => {
    const { onButtonClick } = this.props;
    onButtonClick(buttonId);
  }

  handleContactClick = () => {
    // this.buttonsRef.forEach(node => node.moveToCenter());
    // setTimeout(
    //   () => {
    //     this.buttonsRef.forEach(node => node.hide());
    //   },
    //   INIT_DELAY_HIDE // 1200
    // );


    //   if (this.greetingBlockRef) {
    //     this.greetingBlockRef.hide();
    //   }

    //   // setTimeout(() => {
    //   //   if (this.buttonsTransferRef) {
    //   //     this.buttonsTransferRef.toggleVisibility();
    //   //   }
    //   // }, 1500);
    //   setTimeout(() => {
    //     if (this.buttonsTransferRef) {
    //       this.buttonsTransferRef.moveLeft();
    //     }
    //   }, INIT_DELAY_HIDE + 1400);

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
    console.log(this.buttons);
  }

  render() {
    return (
      <Wrapper>
        <ButtonsTransferBlock
          ref={ref => {
            this.buttonsTransferRef = ref;
          }}
        />
        <PageButton
          circlePosition={0}
          onClick={this.handleButtonClick}
          ref={ref => this.onButtonRef(0, ref)}
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
