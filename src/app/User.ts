import mongoose, { Schema, Document} from "mongoose";

export interface Message extends Document {
    content: string;
    createdAt: Date;
    
}

const MessageSchema: Schema<Message> = new Schema({
    
    content: { 
        type: String, 
        required: true 
    },
    createdAt: { 
        type: Date, 
        required: true 
    },
    
});

export interface User extends Document {
        username: string;
        email: string;
        password: string;
        verifyCode: string;
        verifyCodeExpiry: Date;
        isVerified: boolean;
        isAcceptingMessage: boolean;
        message: Message[]
}

const UserSchema: Schema<User> = new Schema ({
    username: {
        type : String, 
        required: [true, "Username is Required"],
        trim: true,
        unique :true, 
    },
    email: {
        type: String,
        required: [true, "Email is Required"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email address"]
    },
    password: {
        type: String,
        required: [true, "Password is Required"],
        trim: true,
        minlength: [6, "Password must be at least 6 characters"]
    },
    verifyCode: {
        type: String,
        required: [true, "Verification Code is Required"],
        
    },
    
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Verification Code Expiry is Required"]
    },
    isVerified:{
        type:Boolean,
        default: false,
    },
    isAcceptingMessage: {
        type: Boolean,
        default: false
    },
    message: [MessageSchema]
})



const UserModel = (mongoose.models.user as mongoose.Model<User>) || mongoose.model<User>("User", UserSchema)

export default UserModel;