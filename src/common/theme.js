const colors = {
  dark: {
    bgMainColor: '#3B3B3B',
    greetingBlockShadow: '0px 0px 250px rgba(0, 0, 0, 0.3)',
    pageButtonShadow: '0px 0px 150px rgba(0, 0, 0, 0.3)'
  },
  light: {
    bgMainColor: '#ffffff',
    greetingBlockShadow: '0px 0px 250px rgba(0, 0, 0, 0.14)',
    pageButtonShadow: '0px 0px 150px rgba(0, 0, 0, 0.15)'
  }
};

export default (function getTheme(themeType) {
  return colors[themeType];
})('dark');
