const mongoose = require('mongoose');
const { Schema } = mongoose;

// Create Schema
const UserSchema = new Schema({
    email: { type: String, required: true, unique: true },
    phoneNumber: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    documentType: { type: String, required: true },
    documentNumber: { type: Number, required: true,  unique: true },
    birthdate: { type: Date, required: true },
    expeditionDate: { type: Date, required: true },
    country: { type: String, default: '' },
    city: { type: String, default: '' },
    address: { type: String, default: '' },
    photoProfile: { type: String, default: '' },
    hobbies: { type: Array, default: [] }
},
    {
        versionKey: false,
        timestamps: {
            createdAt: 'created_at',
            updatedAt: 'updated_at'
        }
    });

module.exports = mongoose.model('User', UserSchema);
