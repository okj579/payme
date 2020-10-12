import mongoose, {Document, model, Model} from 'mongoose';
export * from "./PaymentPage";


if (!process.browser) {
    mongoose.connect(process.env.DB_URI)
        .catch(error => {
            console.error(error);
            process.exit(1);
        })
}
