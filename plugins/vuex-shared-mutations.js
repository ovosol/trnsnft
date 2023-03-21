import shareMutations from 'vuex-shared-mutations'

export default ({ store }) => {
    window.onNuxtReady(nuxt => {
        shareMutations({
            predicate: [
                'CHANGE_SAMARA_VIDEO',
                'CHANGE_TIMELINE_VIDEO',
                'CHANGE_BY_PATH'
            ]
        })(store)
    })
}