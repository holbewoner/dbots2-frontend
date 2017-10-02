<template>
    <v-footer fixed>
        <div>
            Built from {{git_rev}}
        </div>
        <v-spacer></v-spacer>
        <div>&copy; {{year}} Discord Bots</div>
    </v-footer>
</template>

<script>
import GitConfig from '~/config/git.json'

function getGitRevision() {
    let author = GitConfig.author ? GitConfig.author : 'Unknown'
    let sha1 = GitConfig.short_hash ? GitConfig.short_hash : GitConfig.hash.substr(0, 7)

    if (GitConfig.tag !== undefined)
        return `${GitConfig.tag}@${sha1} by ${author}`
    else
        return `${sha1} by ${author}`
}

export default {
    name: 'page-footer',

    computed: {
        year: () => new Date().getFullYear(),
        git_rev: getGitRevision
    }
}
</script>