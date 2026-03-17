import request from '@/utils/request'

export const getProductListApi = (params) => request.get('/products', { params })
export const getProductDetailApi = (id) => request.get(`/products/${id}`)
export const getProductsByCategoryApi = (id, params) => request.get(`/category/${id}/products`, { params })
export const searchProductsApi = (params) => request.get('/products/search', { params })
export const getHotProductsApi = () => request.get('/products/hot')
export const getNewProductsApi = () => request.get('/products/new')
export const toggleFavoriteApi = (id) => request.post(`/products/${id}/favorite`)
export const getFavoritesApi = () => request.get('/user/favorites')
