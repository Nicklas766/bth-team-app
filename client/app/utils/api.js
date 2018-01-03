var axios = require('axios');



module.exports = {
    fetchProfile: async function () {
        const data = await axios.get("/protected/profiledata");

        return {data: data.data, status: data.status};
    },

    fetchUsers: async function () {
        const data = await axios.get("/api/users");

        return data.data;
    },

    // Login, then return 200 or 401 or 404
    login: async function (params) {
        try {
            const response = await axios.post("/account/login", params);

            return response.status;
        } catch (err) {
            return err.response.status;
        }
    },
    // Logouts and returns 200
    logout: async function () {
        try {
            const response = await axios.post("/account/logout");

            return response.status;
        } catch (err) {
            return err.response.status;
        }
    },
    // Creates account, then return 200 or 401 code
    createAccount: async function (params) {
        try {
            const response = await axios.post("/account/insert", params);

            return response.status;
        } catch (err) {
            return err.response.status;
        }
    },

    resetPeople: async function () {
        const data = await axios.get("/api/reset");

        return data.data;
    }
};
