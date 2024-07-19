import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AllTest = () => {
    const [tests, setTests] = useState([]);
    const [filteredTests, setFilteredTests] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');

    // --- Pagination ---
    const [currentPage, setCurrentPage] = useState(1);
    const itemPerPage = 20;

    const handleFetch = async () => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-test`);
            const reverseData = res.data.data;
            setTests(reverseData);
            console.log(reverseData);
        } catch (error) {
            console.error('There was an error fetching the tests!', error);
        }
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // --- Pagination ---
    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = filteredTests.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => {
        handleFetch();
    }, []);

    useEffect(() => {
        // Apply search and price range filters
        const filtered = tests.filter((test) =>
            test.testName.toLowerCase().includes(searchQuery.toLowerCase())
        ).filter((test) => {
            if (minPrice && maxPrice) {
                return test.actualPrice >= minPrice && test.actualPrice <= maxPrice;
            } else if (minPrice) {
                return test.actualPrice >= minPrice;
            } else if (maxPrice) {
                return test.actualPrice <= maxPrice;
            }
            return true;
        });
        setFilteredTests(filtered);
    }, [searchQuery, tests, minPrice, maxPrice]);

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
                    const res = await axios.delete(`${process.env.REACT_APP_BACKEND_URL}/delete-test/${id}`);
                    console.log(res.data);
                    toast.success("Test Deleted");
                    handleFetch();

                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    console.error(error);
                    toast.error(error.response.data.message);
                }
            }
        });
    };

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleMinPriceChange = (event) => {
        setMinPrice(event.target.value ? parseFloat(event.target.value) : '');
    };

    const handleMaxPriceChange = (event) => {
        setMaxPrice(event.target.value ? parseFloat(event.target.value) : '');
    };

    // Pagination with Ellipsis
    const totalPages = Math.ceil(filteredTests.length / itemPerPage);
    const pageRange = 2; // Number of pages to show before and after the current page
    const startPage = Math.max(1, currentPage - pageRange);
    const endPage = Math.min(totalPages, currentPage + pageRange);

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>All Tests List </h4>
                </div>
                <div className="links">
                    <Link to="/add-test" className="add-new">
                        Add New <i className="fa-solid fa-plus"></i>
                    </Link>
                </div>
            </div>

            <div className="filteration">
                <div className="search">
                    <label htmlFor="search">Search </label> &nbsp;
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>
                <div className="price-range ">
                    <label htmlFor="minPrice">Min Price &nbsp;</label>
                    <input
                        type="number"
                        name="minPrice"
                        id="minPrice"
                        value={minPrice}
                        onChange={handleMinPriceChange}
                        placeholder="Min"
                    />
                    &nbsp;
                    <label htmlFor="maxPrice ">Max Price &nbsp;</label>
                    <input
                        type="number"
                        name="maxPrice"
                        id="maxPrice"
                        value={maxPrice}
                        onChange={handleMaxPriceChange}
                        placeholder="Max"
                    />
                </div>
            </div>

            <section className="main-table ">
                <table className="table table-bordered table-striped table-hover">
                    <thead>
                        <tr>
                            <th scope="col">Sr.No.</th>
                            <th scope="col">Test Name</th>
                            <th scope="col">Actual Price</th>
                            <th scope="col">Discount Price</th>
                            <th scope="col">Discount Percentage</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((test, index) => (
                            <tr key={test._id}>
                                <th scope="row">{index + 1}</th>
                                <td>{test.testName}</td>
                                <td>{test.actualPrice}</td>
                                <td>{test.discountPrice}</td>
                                <td>
                                    {test.discountPercentage
                                        ? `${test.discountPercentage}%`
                                        : 0}
                                </td>
                                <td>
                                    <Link
                                        to={`/edit-test/${test._id}`}
                                        className="bt edit"
                                    >
                                        Edit{' '}
                                        <i className="fa-solid fa-pen-to-square"></i>
                                    </Link>
                                </td>
                                <td>
                                    <Link
                                        onClick={() => {
                                            handleDelete(test._id);
                                        }}
                                        className="bt delete"
                                    >
                                        Delete{' '}
                                        <i className="fa-solid fa-trash"></i>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <nav>
                    <ul className="pagination justify-content-center">
                        {/* Previous Page Button */}
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage - 1)}
                                disabled={currentPage === 1}
                            >
                                &laquo;
                            </button>
                        </li>

                        {/* Start Ellipsis */}
                        {startPage > 1 && (
                            <>
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(1)}
                                    >
                                        1
                                    </button>
                                </li>
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                            </>
                        )}

                        {/* Page Numbers */}
                        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
                            <li
                                key={page}
                                className={`page-item ${currentPage === page ? 'active' : ''}`}
                            >
                                <button
                                    className="page-link"
                                    onClick={() => handlePageChange(page)}
                                >
                                    {page}
                                </button>
                            </li>
                        ))}

                        {/* End Ellipsis */}
                        {endPage < totalPages && (
                            <>
                                <li className="page-item disabled">
                                    <span className="page-link">...</span>
                                </li>
                                <li className="page-item">
                                    <button
                                        className="page-link"
                                        onClick={() => handlePageChange(totalPages)}
                                    >
                                        {totalPages}
                                    </button>
                                </li>
                            </>
                        )}

                        {/* Next Page Button */}
                        <li className="page-item">
                            <button
                                className="page-link"
                                onClick={() => handlePageChange(currentPage + 1)}
                                disabled={currentPage === totalPages}
                            >
                                &raquo;
                            </button>
                        </li>
                    </ul>
                </nav>
            </section>
        </>
    );
};

export default AllTest;
