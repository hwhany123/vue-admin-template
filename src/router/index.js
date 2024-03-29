import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/article/',
    component:Layout,
    children: [{
      path: ':id',
      name: 'ArticleDetail',
      component: () => import('@/views/detail/index'),
    }],
    hidden: true
  },
  {
    path: '/article_xsz/',
    component:Layout,
    children: [{
      path: ':id',
      name: 'ArticleDetail_xsz',
      component: () => import('@/views/detail/index_xsz'),
    }],
    hidden: true
  },
  {
    path: '/article_bxclf/',
    component:Layout,
    children: [{
      path: ':id',
      name: 'ArticleDetail_bxclf',
      component: () => import('@/views/detail/index_bxclf'),
    }],
    hidden: true
  },
  {
    path: '/store/',
    component:Layout,
    children: [{
      path: ':id',
      name: 'StoreDetail',
      component: () => import('@/views/detail/store_index'),
    }],
    hidden: true
  },
  {
    path: '/article/edit/',
    component:Layout,
    children: [{
      path: ":id",
      name: "ArticleEdit",
      component: () => import('@/views/update/index'),
    }],
    hidden: true
  },
  {
    path: '/article_bx/edit/',
    component:Layout,
    children: [{
      path: ":id",
      name: "ArticleEdit_bx",
      component: () => import('@/views/update/index_clbx'),
    }],
    hidden: true
  },
  {
    path: '/store/edit/',
    component:Layout,
    children: [{
      path: ":id",
      name: "StoreEdit",
      component: () => import('@/views/update/store_index'),
    }],
    hidden: true
  },

  {
    path: '/article/create/',
    component:Layout,
    children: [{
      path: "/article/create",
      name: "ArticleCreate",
      component: () => import('@/views/create/index'),
    }],
    hidden: true
  },
  {
    path: '/article_bx/create/',
    component:Layout,
    children: [{
      path: "/article_bx/create",
      name: "Article_bxCreate",
      component: () => import('@/views/create/index_bxclf'),
    }],
    hidden: true
  },
  {
    path: '/store/create/',
    component:Layout,
    children: [{
      path: "/store/create",
      name: "StoreCreate",
      component: () => import('@/views/create/store_index'),
    }],
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '看板', icon: 'dashboard' }
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '博客', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '1号博客文章列表', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/Example2',
    component: Layout,
    redirect: '/example2/store',
    name: 'Example2',
    meta: { title: '商店', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'store',
        name: 'Store',
        component: () => import('@/views/store/index'),
        meta: { title: '采购入库单', icon: 'table' }
      },
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/store/goods_index'),
        meta: { title: '商品', icon: 'table' }
      },
      {
        path: 'cart',
        name: 'Cart',
        component: () => import('@/views/store/cart_index'),
        meta: { title: '购物车', icon: 'table' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/store/user_index'),
        meta: { title: '用户', icon: 'table' }
      },
    ],
  },
  {
    path: '/Example3',
    component: Layout,
    redirect: '/example3/media',
    name: 'Example3',
    meta: { title: '多媒体', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'music',
        name: 'musics',
        component: () => import('@/views/media/index_music'),
        meta: { title: '音乐', icon: 'table' }
      },
      {
        path: 'vidio',
        name: 'Videos',
        component: () => import('@/views/media/index_video'),
        meta: { title: '视频', icon: 'table' }
      },
    ],
  },
  {
    path: '/Example5',
    component: Layout,
    redirect: '/example2/store',
    name: 'Example5',
    meta: { title: '财务系统', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index_xsz'),
        meta: { title: '财务表格', icon: 'table' }
      },
      {
        path: 'pivolt',
        name: 'Pivolt',
        component: () => import('@/views/table/index_xsz_pivolt'),
        meta: { title: '行政费用统计表', icon: 'table' }
      },
      {
        path: 'xzfyyszx',
        name: 'Xzfyyszx',
        component: () => import('@/views/table/index_xsz_xzfyyszx'),
        meta: { title: '行政费用预算执行情况表', icon: 'table' }
      },
      {
        path: 'pivolt_aqfy',
        name: 'Pivolt_aqfy',
        component: () => import('@/views/table/index_xsz_pivolt_aqfy'),
        meta: { title: '安全费用统计表', icon: 'table' }
      },
      {
        path: 'bx_clbx',
        name: 'Bx_clbx',
        component: () => import('@/views/table/index_clbx'),
        meta: { title: '差旅报销', icon: 'table' }
      },
    ],
  },


  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // Parent router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
