/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        todoListBackground: '#fff',
        todoListTextColor: '#494C6B',
        todoListCompleted: '#D1D2DA',
        filterOptionsTextColor: '#9495A5',
        darkTodoListBackground: '#25273D',
        darkTodoListTextColor: '#C8CBE7',
        darkTodoListCompleted: '#4D5067',
        darkFilterOptionsTextColor: '#5B5E7E',
      },
    },
  },
  plugins: [],
};
