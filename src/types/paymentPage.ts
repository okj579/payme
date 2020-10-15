import {IPaymentMethod} from "./paymentMethods";

export interface IPaymentPage {
    title: string,
    slug: string,
    options: {},
    paymentMethods: IPaymentMethod[]
}
