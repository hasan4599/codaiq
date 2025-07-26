import mongoose, { Schema, model, models, Document } from 'mongoose';

const SiteSchema = new Schema(
    {
        title: { type: String, required: true },
        status: {
            type: String,
            enum: ['online', 'offline', 'deploying', 'error'],
            required: true,
            default: 'offline',
        },
        Pm2Name: { type: String },
        deployDomain: { type: String },
    },
    { timestamps: true }
);


export interface ISite extends Document {
    title: string;
    status: 'online' | 'offline' | 'deploying';
    Pm2Name?: string;
    deployDomain?: string;
    createdAt: Date;
    updatedAt: Date;
}

const Site = models.Site || model<ISite>('Site', SiteSchema);
export default Site;
