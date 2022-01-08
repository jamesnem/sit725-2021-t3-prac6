const dbo = require('../db/connection');

let projectCollection;

setTimeout(() => {
    projectCollection = dbo.getDb().collection("projectData");
}, 2000);

const getAllProjects = (res) => {
    projectCollection.find().toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

const getProjectById = (id, res) => {
    console.log(id);
    projectCollection.find({projectID : id}).toArray((err, result) => {
        if (err) throw err;
        res.send(result);
    })
}

const insertProject = (projects, res) => {
    projectCollection.insertOne(projects, (err, result) => {
        if (err) throw err;
        res.send({result : 204});
    })
}

module.exports = {
    getAllProjects,
    getProjectById,
    insertProject,
}