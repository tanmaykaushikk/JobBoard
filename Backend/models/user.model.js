const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    name: {
        type: String,
        required: true,
    },

    role: {
        type: String,
        enum: ["jobseeker", "recruiter", "admin"],
        default: "jobseeker",
    },

    profile: {
        bio: String,
        skills: [String],
        experience: Number,
        phone: String,
        location: String,
    },

    createdJobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job"
        }
    ],
    appliedJobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job"
        }
    ],
    savedJobs:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Job"
        }
    ]


},
    {
        timestamps: true
    });

module.exports = mongoose.model("User",userSchema);