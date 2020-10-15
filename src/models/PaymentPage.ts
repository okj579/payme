import mongoose, { model, Model, Document, Schema } from 'mongoose';
import {IPaymentPage, PaymentMethodTypes} from "../types";

const PaymentMethodSchema = new Schema({
    type: {
        type: String,
        enum: Object.values(PaymentMethodTypes)
    },
    sort: {
        type: Number,
        required: false
    }
});

const PaymentPageSchema = new Schema({
    title: {
        type: String,
        trim: true,
    },
    slug: {
        type: String,
        trim: true,
        minlength: 4,
        match: /^[a-z0-9.-]*$/,
        unique: true,
    },
    options: {
        type: Object
    },
    paymentMethods: [PaymentMethodSchema],
});

export const PaymentPage: Model<IPaymentPage & Document> = model(
    'PaymentPage',
    mongoose.models && !mongoose.models.PaymentPage ? PaymentPageSchema : undefined
);
