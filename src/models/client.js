import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ClientSchema = new Schema ({
	Name:{
		type: String,
		required:true
    },
    Lastname:{
        type: String,
        required: true
    },
    Street:{
        type: String
    },
    Neighborhood:{
        type: String
    },
    City:{
        type: String
    },
    State:{
        type: String
    },
    Zipcode:{
        type: Number 
    },
    Mail:{
        type: String,
        required: true
    },
    Phone:{
        type: String
    },
    Service:[{
		type: Schema.Types.ObjectId,
		ref: 'Service'
    }],
	CreationDate: {
		type: Date,
		default: Date.now()
	}
    
},{
	versionKey: false
});

export default mongoose.model('Client', ClientSchema);