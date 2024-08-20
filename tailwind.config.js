module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mainYellow: '#FBFF2B',
        clickYellow: '#ffe32b',
        bgPrimary:'#0B111F',
        bgSecondary:'#2F384E',
        sideBar:'#131E33',
        //  淺色背景 (dashboard)
        bgPrimaryLight:'#FFFFFF',
        sideBarLight:'#E4E8EE'
      },
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      screens: {
        'xs': '480px',  // 自定義極小設備的斷點
        'sm': '640px',  // 小型設備的斷點
        'md': '768px',  // 中型設備的斷點
        'lg': '1024px', // 大型設備的斷點
        'xl': '1280px', // 超大型設備的斷點
        '2xl': '1536px' // 2倍超大型設備的斷點
      }
    },
  },
  plugins: [],
}