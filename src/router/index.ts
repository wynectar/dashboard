/*************函数***************/
import { createRouter, createWebHashHistory } from 'vue-router'

import Page404 from '@/components/Page404.vue'
import HelloWorld from '@/components/HelloWorld.vue'
/*************动态引入组件***************/
const components = import.meta.glob('@/views/*.vue')
const dynamicPath = []

function convertStyleName(styleName: String) {
    // 先将首字母转为小写，再转换
    const lowerFirst = styleName.charAt(0).toLowerCase() + styleName.slice(1);
    return lowerFirst.replace(/([A-Z])/g, '-$1').toLowerCase()
};

for (const key in components) {
    const fileName = key.split('/').slice(-1)[0].split('.')[0]
    const path = `/${convertStyleName(fileName)}`
    dynamicPath.push({
        path,
        component: components[key]
    })
}

const routes = [
    {
        path: '/',
        children: dynamicPath,
    },
    { path: '/hello-world', component: HelloWorld },
    { path: '/:catchAll(.*)', component: Page404 },
]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})

export default router