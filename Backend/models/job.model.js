const mongoose=require("mongoose");

const jobSchema=new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    requirements: [String],
    location: String,
    salary: {
        type:String,
        currency: {type: String, default: 'INR'}
    },
    employmentType: {
        type: String,
        enum: ['full-time', 'part-time', 'contract', 'internship', 'temporary'],
        default: 'full-time'
    },
    companyName: {
        type: String,
        required: true
    },
    appliedBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    savedBy:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    ],
    

})

module.exports=mongoose.model('Job', jobSchema);