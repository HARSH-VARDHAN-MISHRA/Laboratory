const mongoose = require('mongoose');

const BookingInfoSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    phone: { type: String, required: true },
    optionalPhone: { type: String },
    email: { type: String, required: true },
    date: { type: String, required: true },
    age: { type: String, required: true },
    gender: { type: String, required: true },
    pinCode: { type: String, required: true },
    city: { type: String, required: true },
    address: { type: String, required: true },
    labName: { type: String },
    labAddress: { type: String },
    labId: { type: String },
    labEmail: { type: String },
    appointTime: { type: String, required: true },
    bookingType: { type: String, required: true }
});

const TestDetailSchema = new mongoose.Schema({
    testName: { type: String, required: true },

});

const CartItemSchema = new mongoose.Schema({
    packageName: { type: String, required: true },
    testCategoryId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'testCategoryDetail' }],
    testQuantity: { type: Number, required: true },
    testGroupQuantity: { type: Number, required: true },
    actualPrice: { type: Number, required: true },
    currentPrice: { type: Number, required: true },
    offPercentage: { type: Number, required: true },
    testDetails: [TestDetailSchema]
});

const PricesSchema = new mongoose.Schema({
    subtotal: { type: Number, required: true },
    homeCollectionCharges: { type: Number, required: true },
    discount: { type: Number, required: true },
    totalToPay: { type: Number, required: true }
});

const OrderSchema = new mongoose.Schema({
    BookingInfo: { type: BookingInfoSchema, required: true },
    Cart: { type: [CartItemSchema], required: true },
    Prices: { type: PricesSchema, required: true },
    razorpayOrderId: { type: String },
    razorpayPaymentId: { type: String },
    razorpaySignature: { type: String },
    transactionId: {
        type: String,
    },
    PaymentDone: {
        type: Boolean,
        default: false
    },
    PatientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "UserSchemaDetails"
    }
}, { timestamps: true });

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
