import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ServiceSchema = new Schema ({
	When:{
        type: Date,
        required: true
    },
    Schedule:{
        type: String
    },
    Client:{
        type: Schema.Types.ObjectId,
		ref: 'Client'
    },
	CreationDate: {
		type: Date,
		default: Date.now()
	}
    
},{
	versionKey: false
});

export default mongoose.model('Service', ServiceSchema);