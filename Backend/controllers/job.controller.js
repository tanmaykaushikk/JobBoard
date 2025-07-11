const Job = require("../models/job.model");
const User = require("../models/user.model");

exports.createJob = async (req, res) => {
    // gather info
    // console.log("hiii")
    const { title, description, requirements, location, salary, employmentType, companyName } = req.body;

    // varify fields are filled
    try {
        if (!title || !description || !requirements || !location || !salary || !employmentType || !companyName) {
            return res.status(400).json({ message: "Every Field is required" });
        }

        // create a job
        const newJob = await Job.create({ title, description, requirements, location, salary, employmentType, companyName });

        // update user model
        // find the user
        const user = await User.findOne({ email: req.user.email });

        // update job in user
        user.createdJobs.push(newJob._id);
        await user.save();
        res.status(201).json({ message: "Job created successfully", job:newJob });
    } catch (error) {
        console.error("Job Creation Error", error);
        res.status(500).json({ message: "Server error during job creation" });
    }
}

exports.getAllJobs = async(_,res) => {
    try{
        const job = await Job.find({});
        res.status(200).json({message:"Fetched All Jobs",job});
    }catch(error){
        console.error("Fetching Job Error", error);
        res.status(500).json({ message: "Server error during job fetching" });
    }

} 

exports.getJobById = async(req,res) => {
    const id = req.params.id;

    try{
        const job = await Job.findById(id);

        const userId = req.user.id;
        const isApplied = job.appliedBy.includes(userId);
        const isSaved = job.savedBy.includes(userId);

        res.status(200).json({message:"Fetched Job Successfully by Id",job,isApplied,isSaved});
    }catch(error){
         console.error("Error getting job by Id", error);
        res.status(500).json({ message: "Server error during job fetching by Id." });
    }
}

exports.applyJob = async (req, res) => {
    // Gather Job ID from Params
    const jobId = req.params.id;

    // Gather User ID from req.user
    const userId = req.user.id;

    try {
        const updatedJob=await Job.findByIdAndUpdate(
            jobId,
            { $addToSet: { appliedBy: userId } },
            { new: true }
        ).populate('appliedBy', 'name email role profile');

        await User.findByIdAndUpdate(
            userId, 
            {$addToSet: {appliedJobs: jobId}},
            {new: true}
        );

        res.status(200).json({message: 'Job Applied Successfully', job: updatedJob});
    }
    catch (error) {
        console.error('Job Applying Error:', error);
        res.status(500).json({ message: 'Server error during applying to job' });
    }
}


exports.saveJob = async (req, res) => {
    // Gather Job ID from Params
    const jobId = req.params.id;

    // Gather User ID from req.user
    const userId = req.user.id;

    try {
        const updatedJob=await Job.findByIdAndUpdate(
            jobId,
            { $addToSet: { savedBy: userId } },
            { new: true }
        ).populate('savedBy', 'name email role profile');

        await User.findByIdAndUpdate(
            userId, 
            {$addToSet: {savedJobs: jobId}},
            {new: true}
        );

        res.status(200).json({message: 'Job Saved Successfully', job: updatedJob});
    }
    catch (error) {
        console.error('Job Saving Error:', error);
        res.status(500).json({ message: 'Server error during saving to job' });
    }
}