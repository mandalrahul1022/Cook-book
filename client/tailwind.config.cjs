module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary:  '#ff944d',   
        secondary:'#ffde59',   
        accent:   '#38bdf8',   
        base:     '#fffdf7',   
      },
      fontFamily: {
        headline: ['"Poppins"', 'sans-serif'],
        body:     ['"Inter"',   'sans-serif'],
      },
    },
  },
  plugins: [],
};
