

export enum PaymentMethodTypes {
    BANK_EU = 'BankEu',
    PAYPAL = 'Paypal',
    PAYPAL_ME = 'PaypalMe',
    BANK_US = 'BankUs',
}

interface IPaymentMethodBase {
    type: PaymentMethodTypes,
    sort?: number,
    label?: string
}

export interface IPaymentMethodPaypal extends IPaymentMethodBase {
    type: PaymentMethodTypes.PAYPAL,
    id: string,
}
export interface IPaymentMethodPaypalMe extends IPaymentMethodBase {
    type: PaymentMethodTypes.PAYPAL_ME,
    id: string,
}
export interface IPaymentMethodBankEu extends IPaymentMethodBase {
    type: PaymentMethodTypes.BANK_EU,
    iban: string,
    bic?: string,
    accountHolder?: string,
    bankName?: string
}
export interface IPaymentMethodBankUs extends IPaymentMethodBase {
    type: PaymentMethodTypes.BANK_US,
    accountNo: string,
    accountType: 'checking'|'savings'|'loan'|'ledger',
    achRoutingNo?: string,
    wireRoutingNo?: string,
    bankName?: string,
    accountHolder?: string,
}

export type IPaymentMethod =
    IPaymentMethodPaypal |
    IPaymentMethodPaypalMe |
    IPaymentMethodBankEu |
    IPaymentMethodBankUs;

export type keyofPaymentMethod =
    keyof IPaymentMethodPaypal |
    keyof IPaymentMethodPaypalMe |
    keyof IPaymentMethodBankEu |
    keyof IPaymentMethodBankUs;
