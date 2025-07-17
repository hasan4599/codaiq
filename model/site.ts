import mongoose, { Schema, model, models, Document } from 'mongoose';

const SiteSchema = new Schema(
    {
        title: { type: String, required: true },
        status: {
            type: String,
            enum: ['online', 'offline', 'deploying'],
            required: true,
            default: 'offline',
        },
        repoURL: { type: String, required: true },

        devPort: { type: Number },
        devPm2Name: { type: String },
        devTunnelUrl: { type: String },

        prodPort: { type: Number },
        prodPm2Name: { type: String },
        prodTunnelUrl: { type: String },

        deployDomain: { type: String },

        // NEW: Deploy history tracking
        deployHistory: [
            {
                date: { type: Date, required: true, default: Date.now },
                environment: { type: String, enum: ['dev', 'prod'], required: true },
                status: { type: String, enum: ['success', 'failed'], required: true },
                deployedBy: { type: String, required: true }, // Could be user ID or email
                commitHash: { type: String }, // optional
                notes: { type: String }, // optional
            },
        ],
    },
    { timestamps: true }
);


export interface ISite extends Document {
    title: string;
    status: 'online' | 'offline' | 'deploying';
    repoURL: string;

    port?: number;
    devPm2Name?: string;
    prodPm2Name?: string;
    deployDomain?: string;

    deployHistory?: {
        date: Date;
        environment: 'dev' | 'prod';
        status: 'success' | 'failed';
        deployedBy: string;
        commitHash?: string;
        notes?: string;
    }[];

    createdAt: Date;
    updatedAt: Date;
}

const Site = models.Site || model<ISite>('Site', SiteSchema);
export default Site;
