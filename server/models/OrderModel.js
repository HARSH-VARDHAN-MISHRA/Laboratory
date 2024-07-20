const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    requestBody: { type: mongoose.Schema.Types.Mixed }, // To store entire req.body
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    transactionId: { type: String },
    PaymentDone: { type: Boolean, default: false },
    paymentStatus:{ type: String},
    PatientId: { type: mongoose.Schema.Types.ObjectId, ref: "UserSchemaDetails" }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;