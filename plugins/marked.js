import marked from 'marked'

const renderer = new marked.Renderer()

const levels = [
    'display-3',
    'display-2',
    'display-1',

    'headline',
    'title',
    'subheading',
]

renderer.heading = function(text, level) {
    return `<p class="${levels[level]}">${text}</p>`
}

renderer.blockquote = function(quote) {
    if (quote.startsWith('<p>warn<br>')) {
        return `<div class="card warning amber darken-2 subheading">
        <p class="title">Warning</p>
        ${quote.replace('warn<br>', '')}
        </div>`
    }
    if (quote.startsWith('<p>error<br>')) {
        return `<div class="card warning red subheading">
        <p class="title">Danger</p>
        ${quote.replace('error<br>', '')}
        </div>`
    }

    return `<blockquote>${quote}</blockquote>`
}

marked.setOptions({
    gfm: true,
    tables: true,
    breaks: true,
    sanitize: true,
    smartLists: true,
    smartypants: true,
    renderer: renderer
})

export default marked
