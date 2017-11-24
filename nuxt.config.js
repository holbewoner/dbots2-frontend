module.exports = {
    mode: 'spa', // SPA allows us to debug easier

    build: {
        vendor: ['vuetify', 'axios', 'marked'],
        extractCSS: true
    },

    plugins: [
        '~/plugins/vuetify',
        '~/plugins/numeral',
        { src: '~/plugins/localStorage.js', ssr: false }
    ],

    loading: {
        color: "#2c2f33",
        duration: 5000,
        failedColor: "red",
        height: "5px"
    },
    loadingIndicator: {
        name: "three-bounce",
        color: "#7289da",
        background: "#2c2f33"
    },

    head: {
        titleTemplate: (x) => (x) ? `${x} - Discord Bots` : 'Discord Bots',

        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no, minimal-ui' },
            { hid: 'description', name: 'description', content: 'The biggest, baddest bot list on the planet.' }
        ],

        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'}
        ]
    },

    transition: 'slide-x-reverse-transition',

    css: [
        '~/assets/vuetify.styl',
        '~/assets/main.scss'
    ]
}
