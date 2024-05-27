import { nanoid } from 'nanoid';

let jobs = [
    { id: nanoid(), company: 'apple', position: 'front-end' },
    { id: nanoid(), company: 'google', position: 'back-end' },
    { id: nanoid(), company: 'facebook', position: 'full-stack' },
    { id: nanoid(), company: 'amazon', position: 'devops' },
    { id: nanoid(), company: 'microsoft', position: 'data scientist' },
];

export const getAllJobs = async (req, res) => {
    res.status(200).json({ jobs });
}

export const createJob = async (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({ msg: 'Please provide company and position'});
    }
    const id = nanoid(10);
    const job = { id, company, position };
    jobs.push(job);
    res.status(201).json({ job });
}

export const getSingleJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find(job => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `Job not found with id: ${id}`});
    }
    res.status(200).json({ job });
}

export const updateJob = async (req, res) => {
    const { company, position } = req.body;
    if (!company || !position) {
        return res.status(400).json({ msg: 'Please provide company and position'});
    }
    const { id } = req.params;
    const job = jobs.find(job => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `Job not found with id: ${id}`});
    }
    job.company = company;
    job.position = position;
    res.status(200).json({ msg: 'Job modified', job });
}

export const deleteJob = async (req, res) => {
    const { id } = req.params;
    const job = jobs.find(job => job.id === id);
    if (!job) {
        return res.status(404).json({ msg: `Job not found with id: ${id}`});
    }
    jobs = jobs.filter(job => job.id !== id);
    res.status(200).json({ msg: 'Job deleted' });
}