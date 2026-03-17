import request from '@/utils/request'

export const loginApi = (data) => request.post('/user/login', data)
export const registerApi = (data) => request.post('/user/register', data)
export const getUserInfoApi = () => request.get('/user/info')
export const updateUserInfoApi = (data) => request.put('/user/info', data)
export const getAddressListApi = () => request.get('/user/address')
export const addAddressApi = (data) => request.post('/user/address', data)
export const updateAddressApi = (id, data) => request.put(`/user/address/${id}`, data)
export const deleteAddressApi = (id) => request.delete(`/user/address/${id}`)
