const express = require("express");
const router = express.Router();

const projectService = require('../service/project');

router.get('/', (req, res) =>{
    projectService.getAllProjects(res);
});
 
router.get('/:id', (req, res) =>{
    projectService.getProjectById(req.params.id, res);
});

router.post('/', (req, res) => {
    projectService.getProjectById(req.body, res);
})

router.put('/:id', (req, res) => {
    res.send("Hello from project update " + req.params.id);
})

router.delete('/:id', (req, res) => {
    res.send("Hello from project delete " + req.params.id);
})

module.exports = router;