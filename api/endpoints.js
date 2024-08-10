    // 假設我們的 API 基礎 URL 是 https://api.example.com

    // 用戶相關的 endpoints
const userEndpoints = {
    login: '/auth/login',
    register: '/auth/register',
    getProfile: '/users/profile',
    updateProfile: '/users/profile',
};

    // 產品相關的 endpoints
const productEndpoints = {
    getAllProducts: '/products',
    getProductById: (id) => `/products/${id}`,
    createProduct: '/products',
    updateProduct: (id) => `/products/${id}`,
    deleteProduct: (id) => `/products/${id}`,
};

    // 訂單相關的 endpoints
const orderEndpoints = {
    createOrder: '/orders',
    getOrderById: (id) => `/orders/${id}`,
    getUserOrders: '/users/orders',
};

export { userEndpoints, productEndpoints, orderEndpoints };