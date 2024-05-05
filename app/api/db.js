import mongoose, { Schema } from "mongoose";

mongoose.connect(process.env.MONGODB_URI);
mongoose.Promise = global.Promise;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    status: {
        type: String,
        enum: ["active", "suspended"],
    },
    remark: String,
    events: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
    },
});

const eventSchema = new Schema({
    user: String,
    equipment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Equipment",
    },
    starts: Date,
    ends: Date,
    destination: String,
    status: {
        type: String,
        enum: ["created", "checked-in", "cancelled"],
    },
});

const equipmentSchema = new Schema({
    tail: { type: String, unique: true },
    type: String,
    rate: Number,
    status: {
        type: String,
        enum: ["available", "grounded"],
    },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);
const Event = mongoose.models.Event || mongoose.model("Event", eventSchema);
const Equipment =
    mongoose.models.Equipment || mongoose.model("Equipment", equipmentSchema);

export { User, Event, Equipment };
