export type RawRouteConfig =
  | {
      path: `/${string}`
    }
  | {
      path: '/{lang}/{productId}'
      params: {
        lang: string
        productId: string
      }
    }
  | {
      path: '/{productId}'
      params: {
        productId: string
      }
    }
  | {
      path: '/{lang}/'
      params: {
        lang: string
      }
    }
  | {
      path: '/'
    }
  | {
      path: '/{lang}/categories'
      params: {
        lang: string
      }
    }
  | {
      path: '/categories'
    }
  | {
      path: '/[so-weird]'
    }
  | {
      path: '/sitemap.xml'
    }
  | {
      path: '/login'
    }
  | {
      path: '/'
    }
  | {
      path: '/about'
    }
  | {
      path: '/concerts/{city}'
      params: {
        city: string
      }
    }
  | {
      path: '/concerts/'
    }
  | {
      path: '/concerts/salt-lake-city'
    }
  | {
      path: '/concerts/trending'
    }
  | {
      path: '/concerts'
    }
  | {
      path: '/concerts/mine'
    }
  | {
      path: '/dashboard'
    }
  | {
      path: '/dolla-bills-$'
    }
  | {
      path: `/files/${string}`
    }
  | {
      path: '/sitemap.xml'
    }
  | {
      path: '/weird-url/_index'
    }
  | {
      path: `/some/path/${string}`
    }
  | {
      path: '/some/{path}'
      params: {
        path: string
      }
    }
  | {
      path: '/some/{path}/relative/path'
      params: {
        path: string
      }
    }
export type RouteConfig =
  | {
      path: '/{lang}/{productId}'
      params: {
        lang: string
        productId: string
      }
    }
  | {
      path: '/{productId}'
      params: {
        productId: string
      }
    }
  | {
      path: '/{lang}/'
      params: {
        lang: string
      }
    }
  | {
      path: '/'
    }
  | {
      path: '/{lang}/categories'
      params: {
        lang: string
      }
    }
  | {
      path: '/categories'
    }
  | {
      path: '/[so-weird]'
    }
  | {
      path: '/sitemap.xml'
    }
  | {
      path: '/login'
    }
  | {
      path: '/'
    }
  | {
      path: '/about'
    }
  | {
      path: '/concerts/{city}'
      params: {
        city: string
      }
    }
  | {
      path: '/concerts/'
    }
  | {
      path: '/concerts/salt-lake-city'
    }
  | {
      path: '/concerts/trending'
    }
  | {
      path: '/concerts'
    }
  | {
      path: '/concerts/mine'
    }
  | {
      path: '/dashboard'
    }
  | {
      path: '/dolla-bills-$'
    }
  | {
      path: `/files/${string}`
    }
  | {
      path: '/sitemap.xml'
    }
  | {
      path: '/weird-url/_index'
    }
  | {
      path: `/some/path/${string}`
    }
  | {
      path: '/some/{path}'
      params: {
        path: string
      }
    }
  | {
      path: '/some/{path}/relative/path'
      params: {
        path: string
      }
    }
