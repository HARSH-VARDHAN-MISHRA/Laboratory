import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom'
const AllOrders = () => {
    const [orders, setOrders] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);
    const [selectedOrder, setSelectedOrder] = useState({});
    const [cart, setCart] = useState([])
    const itemsPerPage = 20;

    const handleFetch = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/all-orders`);
            const reverseData = res.data.data.reverse();
            // console.log(res.data.data);
            const filterData = reverseData.map((item) => item.requestBody.Cart)
            setCart(filterData)
            setOrders(reverseData);

        } catch (error) {
            console.error('There was an error fetching the Orders!', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = orders.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        handleFetch();
    }, []);

    const handleDelete = async (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete-order/${id}`);
                    toast.success("Order Deleted");
                    handleFetch();
                    Swal.fire("Deleted!", "Your order has been deleted.", "success");
                } catch (error) {
                    console.error(error);
                    toast.error("There was an error deleting the order!");
                }
            }
        });
    };

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put(`${process.env.REACT_APP_BACKEND_URL}/update-order-status/${id}`, { status });
            toast.success("Order status updated");
            handleFetch();
        } catch (error) {
            console.error(error);
            toast.error("There was an error updating the order status!");
        }
    };

    const formatDate = (dateString) => {
        const options = { day: '2-digit', month: 'long', year: 'numeric' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const handleShowModal = (order) => {
        setSelectedOrder(order);
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Orders</h4>
                </div>
                <div className="links"></div>
            </div>

            <div className="filteration">
                <div className="selects">
                    <select>
                        <option>Ascending Order</option>
                        <option>Descending Order</option>
                    </select>
                </div>
                <div className="search">
                    <label htmlFor="search">Search</label> &nbsp;
                    <input type="text" name="search" id="search" />
                </div>
            </div>

            <section className="main-table" style={{ display: "block" }}>
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Full Name</th>
                     
                            <th scope="col">Pincode</th>
                            <th scope="col">City</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Email</th>
                            <th scope="col">Date</th>
                            <th scope="col">Age</th>
                            <th scope="col">Gender</th>
                            <th scope="col">Appointment Time</th>
                            <th scope="col">Booking Type</th>
                            <th scope="col">Total to Pay</th>
                            <th scope="col">Payment Status</th>
                            <th scope="col">Upload Test</th>

                            <th scope="col">View Details</th>
                            <th scope="col">Change Status</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((order, index) => (
                            <tr key={order._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{order.requestBody?.BookingInfo.fullName}</td>
                           
                                <td>{order.requestBody?.BookingInfo.pinCode}</td>
                                <td>{order.requestBody?.BookingInfo.city}</td>
                                <td>{order.requestBody?.BookingInfo.phone}</td>
                                <td>{order.requestBody?.BookingInfo.email}</td>
                                <td>{formatDate(order.requestBody?.BookingInfo.date)}</td>
                                <td>{order.requestBody?.BookingInfo.age}</td>
                                <td>{order.requestBody?.BookingInfo.gender}</td>
                                <td>{order.requestBody?.BookingInfo.appointTime}</td>
                                <td>{order.requestBody?.BookingInfo.bookingType}</td>
                                <td>{order.requestBody?.Prices.totalToPay}</td>
                                <td>{order.paymentStatus}</td>
                                <td>
                                    <Link to={`/Upload-test/${order.PatientId}?orderId=${order._id}`} className="bt info" >
                                        Upload
                                    </Link>
                                </td>
                                <td>
                                    <button className="bt info" onClick={() => handleShowModal(order)}>
                                        View Details
                                    </button>
                                </td>
                                <td>
                                    <select
                                        className="form-select px-1 py-0"
                                        value={order.paymentStatus}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Completed">Completed</option>
                                        <option value="Cancelled">Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        className="bt delete"
                                        onClick={() => handleDelete(order._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination justify-content-center">
                        {Array.from({ length: Math.ceil(orders.length / itemsPerPage) }, (_, i) => (
                            <li key={i + 1} className={`page-item ${currentPage === i + 1 ? 'active' : ''}`}>
                                <button className="page-link" onClick={() => handlePageChange(i + 1)}>
                                    {i + 1}
                                </button>
                            </li>
                        ))}
                    </ul>
                </nav>
            </section>

            {showModal && (
                <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Order Details</h5>
                                <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                            </div>
                            <div className="modal-body">
                                <p><strong>Lab Name:</strong> {selectedOrder.requestBody?.Cart[0]?.labName || 'N/A'}</p>
                                <p><strong>Lab Address:</strong> {selectedOrder.requestBody?.Cart[0]?.labLocation || 'N/A'}</p>
                                <p><strong>Pincode:</strong> {selectedOrder.requestBody?.BookingInfo.pinCode}</p>
                                <p><strong>City:</strong> {selectedOrder.requestBody?.BookingInfo.city}</p>
                                <p><strong>Full Name:</strong> {selectedOrder.requestBody?.BookingInfo.fullName}</p>
                                <p><strong>Phone:</strong> {selectedOrder.requestBody?.BookingInfo.phone}</p>
                                <p><strong>Email:</strong> {selectedOrder.requestBody?.BookingInfo.email}</p>
                                <p><strong>Date:</strong> {formatDate(selectedOrder.requestBody?.BookingInfo.date)}</p>
                                <p><strong>Age:</strong> {selectedOrder.requestBody?.BookingInfo.age}</p>
                                <p><strong>Gender:</strong> {selectedOrder.requestBody?.BookingInfo.gender}</p>
                                <p><strong>Appointment Time:</strong> {selectedOrder.requestBody?.BookingInfo.appointTime}</p>
                                <p><strong>Booking Type:</strong> {selectedOrder.requestBody?.BookingInfo.bookingType}</p>
                                <p><strong>Total to Pay:</strong> {selectedOrder.requestBody?.Prices.totalToPay}</p>
                                <p><strong>Payment Status:</strong> {selectedOrder.paymentStatus}</p>

                                {/* Displaying cart items */}
                                <h6>Cart Items:</h6>
                                {selectedOrder.requestBody?.Cart.map((item, index) => (
                                    <div key={index}>
                                        <p><strong>Test Name:</strong> {item.testName || 'N/A'}</p>
                                        <p><strong>Price:</strong> {item.price}</p>
                                        <p><strong>Discounted Price:</strong> {item.discountedPrice}</p>
                                        <p><strong>Discount:</strong> {item.discount}</p>
                                    </div>
                                ))}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AllOrders;
