import mongoose from "mongoose";
export interface EventType {
    title: string;
    description: string;
    eventdate: Date;
    eventtime: Date;
    location: string;
    image: string;
    organizer: string;
}
const eventschema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventdate: { type: Date, required: true },
    eventtime: { type: String, required: true },
    location: { type: String, required: true },
    image: { type: String, required: true },
    organizer: { type: String, required: true }
});
export const Event = mongoose.model("Event", eventschema);
export const geteventsbynewest = () => Event.find().sort({ eventdate: -1 });
export const createevent = (values: Record<string, any>) => new Event(values).save().then((event) => event.toObject());