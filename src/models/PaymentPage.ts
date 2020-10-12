import mongoose, { model, Model, Document, Schema } from 'mongoose';

export enum PaymentMethods {
    BANK_EU = 'BankEu',
    PAYPAL = 'Paypal',
    BANK_US = 'BankUs',
}

interface IPaymentMethodBase {
    type: PaymentMethods,
    sort?: number
}
export interface IPaymentMethodPaypal extends IPaymentMethodBase {
    type: PaymentMethods.PAYPAL,
    id: string,
}
export interface IPaymentMethodBankEu extends IPaymentMethodBase {
    type: PaymentMethods.BANK_EU,
    iban: string,
    bic?: string,
    accountHolder?: string,
    bankName?: string
}
export interface IPaymentMethodBankUs extends IPaymentMethodBase {
    type: PaymentMethods.BANK_US,
    account_no: string,
    account_type: 'checking'|'savings'|'loan'|'ledger',
    ach_routing_no?: string,
    wire_routing_no?: string,
    bank_name?: string,
}
export type IPaymentMethod = IPaymentMethodPaypal | IPaymentMethodBankEu | IPaymentMethodBankUs;

export interface IPaymentPage {
    title: string,
    slug: string,
    options: {},
    paymentMethods: IPaymentMethod[]
}

const PaymentMethodSchema = new Schema({
    type: {
        type: String,
        enum: Object.values(PaymentMethods)
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

// export default PaymentPage;
export const PaymentPage: Model<IPaymentPage & Document> = model('PaymentPage', mongoose.models && !mongoose.models.PaymentPage ? PaymentMethodSchema : undefined);
