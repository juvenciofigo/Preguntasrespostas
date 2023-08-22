/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./public/javascripts/**/*.js", "./views/**/*.ejs"],
    theme: {
        extend: {
            fontFamily: {
                Lucida: ["Lucida", "Helvetica", "Arial", "sans-serif"],
            },
        },
    },
    plugins: [],
};
