import mongoose, { Schema, model, models, Document } from 'mongoose';

const MetadataSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    keywords: { type: [String], required: true },
    authors: [
        {
            name: { type: String, required: true },
            url: { type: String, required: true },
        },
    ],
    creator: { type: String, required: true },
    metadataBase: { type: String },

    openGraph: {
        title: String,
        description: String,
        url: String,
        siteName: String,
        images: [
            {
                url: String,
                width: Number,
                height: Number,
                alt: String,
            },
        ],
        locale: String,
        type: String,
    },

    twitter: {
        card: String,
        title: String,
        description: String,
        site: String,
        images: [String],
    },
});

const SiteSchema = new Schema(
    {
        metadata: { type: MetadataSchema, required: true },
        status: {
            type: String,
            enum: ['online', 'offline', 'deploying'],
            required: true,
            default: 'offline',
        },
        repoURL: { type: String, required: true },

        devPort: { type: Number },             // dev port assigned
        devPm2Name: { type: String },          // pm2 process name for dev
        devTunnelUrl: { type: String },        // tunnel URL for dev environment

        prodPort: { type: Number },            // production port assigned
        prodPm2Name: { type: String },         // pm2 process name for production
        prodTunnelUrl: { type: String },       // tunnel URL for production environment

        deployDomain: { type: String },        // domain for deployed production site
    },
    { timestamps: true }
);

export interface ISite extends Document {
    metadata: {
        title: string;
        description: string;
        keywords: string[];
        authors?: { name: string; url: string }[];
        creator: string;
        metadataBase: string;
        openGraph?: {
            title: string;
            description: string;
            url: string;
            siteName: string;
            images: {
                url: string;
                width: number;
                height: number;
                alt: string;
            }[];
            locale: string;
            type: string;
        };
        twitter?: {
            card: string;
            title: string;
            description: string;
            site?: string;
            images: string[];
        };
    };
    status: 'online' | 'offline' | 'deploying';
    repoURL: string;

    devPort?: number;
    devPm2Name?: string;
    devTunnelUrl?: string;

    prodPort?: number;
    prodPm2Name?: string;
    prodTunnelUrl?: string;

    deployDomain?: string;

    createdAt: Date;
    updatedAt: Date;
}

const Site = models.Site || model<ISite>('Site', SiteSchema);
export default Site;
