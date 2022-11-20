import axios from "axios";
class BankApi {
    constructor() {
        this.baseUrl = "http://localhost:8000";
    }
    getUser(userId) {
        return axios
            .get(`${this.baseUrl}/users/${userId}`)
            .then((res) => res.data[0]);
    }
    getAllCategories() {
        return axios.get(`${this.baseUrl}/categories`).then((res) => res.data);
    }
    getAllTransactions() {
        return axios
            .get(`${this.baseUrl}/transactions`)
            .then((res) => res.data);
    }
    addTransaction(userId, amount, categoryName, details, vendor) {
        return axios
            .post(`${this.baseUrl}/transaction`, {
                user_id: userId,
                amount: amount,
                category_name: categoryName,
                details: details,
                vendor: vendor,
            })
            .then((res) => res.data);
    }
    deleteTransaction(transactionId) {
        return axios
            .delete(`${this.baseUrl}/transaction/${transactionId}`)
            .then((res) => res.data);
    }
    getUserBreakdown(userId) {
        return axios
            .get(`${this.baseUrl}/users/${userId}/breakdown`)
            .then((res) => res.data);
    }
    updateUserBalance(userId, amount) {
        return axios
            .put(`${this.baseUrl}/users/${userId}`, {
                amount: amount,
            })
            .then((res) => res.data);
    }
}

export default BankApi;
