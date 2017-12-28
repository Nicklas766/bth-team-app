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
    fetchReports: async function (id = "") {
        const reports = await axios.get("/api/report/" + id);
        return reports.data;
    },

    // mongoDB
    fetchPeople: async function () {
        const data = await axios.get("/mongodb/get");
        return data.data;
    },
    postPeople: async function (params) {
        console.log("IM STARTED")
        const data = await axios.post("/mongodb/insert", params)
        return data.data;

    },
    deletePerson: async function (id) {
        const data = await axios.post("/mongodb/delete", {id: id})
        return data.data;

    },
    updatePerson: function (params) {
        axios.post("/mongodb/update", params);
    },

    resetPeople: async function () {
        const data = await axios.get("/mongodb/reset")
        return data.data;
    }
};


// fetchPopularRepos('Java')
//     .then()
