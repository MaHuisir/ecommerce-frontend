import request from '@/utils/request'

export const createOrderApi = (data) => request.post('/orders', data)
export const getOrderListApi = (params) => request.get('/orders', { params })
export const getOrderDetailApi = (id) => request.get(`/orders/${id}`)
export const cancelOrderApi = (id) => request.put(`/orders/${id}/cancel`)
export const confirmReceiveApi = (id) => request.put(`/orders/${id}/confirm`)
export const deleteOrderApi = (id) => request.delete(`/orders/${id}`)
export const payOrderApi = (id, data) => request.post(`/orders/${id}/pay`, data)
