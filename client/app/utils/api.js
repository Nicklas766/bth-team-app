var axios = require('axios');



function handleError(error) {
    console.warn(error);
    return null;
}

module.exports = {
    fetchUsers: async function () {
        const data = await axios.get("/api/users");
        return data.data;
    },

    // Login, then return 200 or 401 or 404
    login: async function (params) {
        try {
            const response = await axios.post("/session/login", params);
            return response.status;
        } catch(err) {
            return err.response.status;
        }
    },
    // Creates account, then return 200 or 401 code
    createAccount: async function (params) {
        try {
            const response = await axios.post("/api/insert", params);
            return response.status;
        } catch(err) {
            return err.response.status;
        }

    },

    resetPeople: async function () {
        const data = await axios.get("/mongodb/reset")
        return data.data;
    }
};


// fetchPopularRepos('Java')
//     .then()
