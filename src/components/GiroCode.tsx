import React, {Component} from "react";
import QrCode from "react-qr-code";
import {electronicFormat} from "iban";

const SERVICE_TAG = 'BCD'
const VERSION = '002'
const CHARACTER_SET = 1
const IDENTIFICATION_CODE = 'SCT'

export interface GiroCodeProps {
    bic?: string;
    name: string;
    iban: string;
    currency: string;
    amount?: number;
    purposeCode?: string;
    structuredReference?: string;
    unstructuredReference?: string;
    information?: string;

    bgColor?: string;
    fgColor?: string;
}

export default class GiroCode extends Component<GiroCodeProps> {
    render() {
        const { bgColor, fgColor, ...paymentData } = this.props;

        const amount = typeof paymentData.amount === 'number' ? paymentData.amount.toFixed(2) : '';
        const epcValue = [
       		SERVICE_TAG,
       		VERSION,
       		CHARACTER_SET,
       		IDENTIFICATION_CODE,
            paymentData.bic,
            paymentData.name,
            electronicFormat(paymentData.iban),
            paymentData.currency + amount,
            paymentData.purposeCode || '',
            paymentData.structuredReference || '',
            paymentData.unstructuredReference || '',
            paymentData.information || ''
       	].join('\n');

        return <QrCode value={epcValue} size={128} level="M" {...{bgColor, fgColor}}/>;
    }
}
