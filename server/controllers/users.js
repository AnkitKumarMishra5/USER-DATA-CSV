import express from 'express';
import mongoose from 'mongoose';

import User from '../models/User.js';

const router = express.Router();

export const getUsers = async (req, res) => { 
    try {
        const Users = await User.find();
                
        res.status(200).json(Users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export const createUser = async (req, res) => {
    const userDataInJSON = req.body;
    try {
        User.remove({});
        User.insertMany(userDataInJSON, false, function(error, createdUsers){
            if(error){
                console.log(error);
                if(error.code == 11000){
                    // var duplicateUsersResponse = [];
                    // var duplicateUsers = error.result.result.writeErrors;
                    // duplicateUsers.forEach(duplicateUser => {
                    //     duplicateUsersResponse.push(duplicateUser.err.op)
                    // });
                    res.status(201).json(error.insertedDocs);
                }
            }else{
                console.log(createdUsers);
                res.status(201).json(createdUsers);
            }
        });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

export default router;