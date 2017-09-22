module.exports = {
    build: {
        vendor: ['vuetify']
    },
    
    plugins: [
        '~/plugins/vuetify'
    ],

    loading: false,

    head: {
        title: 'Discord Bots',
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'The biggest, baddest bot list on the planet.' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            { rel: 'stylesheet', type: 'text/css', href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons'}
        ]
    },

    css: [
        'node_modules/vuetify/dist/vuetify.min.css'
    ]
}