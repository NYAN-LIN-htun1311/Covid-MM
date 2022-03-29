import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes: [{
        path: '/',
        component: () =>
            import ('@/views/dashboard/Index'),
        children: [
            // Dashboard
            {
                name: 'Coronavirus Disease Surveillance Local Myanmar Dashboard',
                path: '',
                component: () =>
                    import ('@/views/dashboard/Dashboard'),
            },
            {
                name: 'World Statistics',
                path: 'world-stats',
                component: () =>
                    import ('@/views/dashboard/World-Stats')
            },
            {
                name: 'Country',
                path: 'country:name',
                component: () =>
                    import ('@/views/dashboard/components/entry/Country')
            },
            {
                name: 'Contacts',
                path: 'emergency',
                component: () =>
                    import ('@/views/dashboard/Emergency')
            },
            {
                name: 'About us',
                path: 'about-us',
                component: () =>
                    import ('@/views/dashboard/AboutUs')
            }
        ],
    }, ],
})