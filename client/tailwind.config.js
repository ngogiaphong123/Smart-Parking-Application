/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js"
  ],
  theme: {
    extend: {
      borderWidth:{
        '1': '1px',
      },
      borderColor:{
        'gray': "#ccc"
      },
      backgroundColor:{
        "mainColor":"F3F6FF",
        "tempToggleSwitchColor":"#7A40F2",
        "tempToggleDashboardColor":"#7A40F2",
        'logInBackground':'#F3F6FF',
        'gray': "#f5f5f5",
        'gray-hover': "#e5e5e5",
        "blue-inPage":"#81D0DF",
        "blue-inPage-hover":"#49B8CD"
      },
      backgroundImage: {
        'gradient-sidebarChild':"linear-gradient(90deg, #087592 43.19%, #2393B0 100%, #2393B0 100%)",
        'gradient-sidebar':"linear-gradient(180deg, #FFFFFF 60.42%, rgba(255, 255, 255, 0) 100%)",
        "gradient-chatroom":"linear-gradient(360deg, #FFFFFF 0%, rgba(224, 242, 254, 0.994792) 0.01%, rgba(255, 255, 255, 0) 134.37%, rgba(255, 255, 255, 0.530317) 134.37%)"
      }
      ,
      textColor:{
        'sidebarChild':'#087592',
        "title-inPage":"#087592"
      },
      fontSize:{
        'ant':'10px',
        'super-small' : '12px',
        'big-size': '1.6rem'
      },
      zIndex: {
        "1":1
      },
      screens: {
        'mobile': '440px',
      },
      ringColor:{
        
      },
      flexGrow:{
        2:'2'
      }
    },
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
