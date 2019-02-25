const colors = {
  dark: {
    textMainColor: '#F2F2F2',
    textHighlightColor: '#81AF65',
    bgMainColor: '#3B3B3B',
    greetingBlockShadow: '0px 0px 250px rgba(0, 0, 0, 0.3)',
    pageButtonShadow: '0px 0px 150px rgba(0, 0, 0, 0.3)',
    pageButtonIconColor: '#F0F0F0',
    pageContentBgColor: '#3B3B3B',
    pageContentHeaderUnderlineColor: '#474747',
    pageContentShadow: '0px 0px 250px rgba(0, 0, 0, 0.3)',
    pageContentTextColor: '#FFFFFF'
  },
  light: {
    textMainColor: '#000',
    textHighlightColor: '#3F9B06',
    bgMainColor: '#ffffff',
    greetingBlockShadow: '0px 0px 250px rgba(0, 0, 0, 0.14)',
    pageButtonShadow: '0px 0px 150px rgba(0, 0, 0, 0.15)',
    pageButtonIconColor: '#666666',
    pageContentBgColor: '#ffffff',
    pageContentHeaderUnderlineColor: '#ECECEC',
    pageContentShadow: '0px 0px 250px rgba(0, 0, 0, 0.14)',
    pageContentTextColor: '#000000',
  }
};

export default (function getTheme(themeType) {
  return colors[themeType];
})('light');
