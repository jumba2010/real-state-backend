const express = require('express');
const Agent = require('../models/agent');

const router = express.Router();

router.get('/', async (req, res) => {
    const agents = await Agent.findAll();
    res.json(agents);
});

router.get('/:id', async (req, res) => {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
    }
    res.json(agent);
});

router.post('/', async (req, res) => {
    try {
        const agent = await Agent.create(req.body);
        res.status(201).json(agent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
    }
    try {
        await agent.update(req.body);
        res.json(agent);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    const agent = await Agent.findByPk(req.params.id);
    if (!agent) {
        return res.status(404).json({ error: 'Agent not found' });
    }
    await agent.destroy();
    res.json({ message: 'Agent deleted' });
});


module.exports=router;