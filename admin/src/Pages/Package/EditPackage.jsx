import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Select from 'react-select';
import 'react-toastify/dist/ReactToastify.css';

const EditPackage = () => {
    const { id } = useParams(); // Fetching id from URL params
    const [formData, setFormData] = useState({
        packageName: '',
        testCategoryName: [],
        testQuantity: '',
        testGroupQuantity: 0,
        actualPrice: '',
        currentPrice: '',
        offPercentage: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [testOptions, setTestOptions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchPackage();
        fetchTestCategories(); // Fetch test categories for Select options
    }, [id]);

    const fetchPackage = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-package/${id}`);
            const packageData = response.data.data;
            
            // Fetch the test category details based on IDs from the package
            const testCategoryResponses = await Promise.all(packageData.testCategoryId.map(id =>
                axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-test-category/${id}`)
            ));
            const selectedTests = testCategoryResponses.map(res => ({
                label: res.data.testCategoryName,
                value: res.data.testCategoryName,
                testNumber: res.data.testNumber
            }));

            setFormData({
                packageName: packageData.packageName,
                testCategoryName: selectedTests,
                testQuantity: packageData.testQuantity.toString(),
                testGroupQuantity: packageData.testGroupQuantity || 0,
                actualPrice: packageData.actualPrice.toString(),
                currentPrice: packageData.currentPrice ? packageData.currentPrice.toString() : '',
                offPercentage: packageData.offPercentage ? packageData.offPercentage.toString() : ''
            });
        } catch (error) {
            console.error('Error fetching package details:', error);
            toast.error('Error fetching package details');
        }
    };

    const fetchTestCategories = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/get-all-test-category`);
            const options = response.data.data.map(test => ({
                value: test.testCategoryName,
                label: test.testCategoryName,
                testNumber: test.testNumber
            }));
            setTestOptions(options);
        } catch (error) {
            console.error('Error fetching test categories:', error);
            toast.error('Error fetching test categories');
        }
    };

    const handleCategoryNameChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleTestChange = (selectedOptions) => {
        const selectedTests = selectedOptions ? selectedOptions.map(option => ({
            label: option.label,
            value: option.value,
            testNumber: option.testNumber
        })) : [];
        
        // Calculate total test group quantity
        const totalTestGroupQuantity = selectedTests.reduce((total, test) => total + test.testNumber, 0);

        setFormData(prevData => ({
            ...prevData,
            testCategoryName: selectedTests,
            testQuantity: selectedTests.length.toString(),
            testGroupQuantity: totalTestGroupQuantity
        }));
    };

    const handleCurrentPriceChange = (event) => {
        const { value } = event.target;
        const currentPrice = parseFloat(value);
        const actualPrice = parseFloat(formData.actualPrice);
        if (!isNaN(currentPrice) && !isNaN(actualPrice)) {
            const offPercentage = ((actualPrice - currentPrice) / actualPrice) * 100;
            setFormData(prevData => ({
                ...prevData,
                currentPrice: value,
                offPercentage: isNaN(offPercentage) ? '' : offPercentage.toFixed()
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                currentPrice: value,
                offPercentage: ''
            }));
        }
    };

    const handleOffPercentageChange = (event) => {
        const { value } = event.target;
        const offPercentage = parseFloat(value);
        const actualPrice = parseFloat(formData.actualPrice);
        if (!isNaN(offPercentage) && !isNaN(actualPrice)) {
            const currentPrice = actualPrice - (actualPrice * (offPercentage / 100));
            setFormData(prevData => ({
                ...prevData,
                offPercentage: value,
                currentPrice: isNaN(currentPrice) ? '' : currentPrice.toFixed()
            }));
        } else {
            setFormData(prevData => ({
                ...prevData,
                offPercentage: value,
                currentPrice: ''
            }));
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            // Transform testCategoryName to an array of strings
            const categoryNames = formData.testCategoryName.map(test => test.label);
    
            // Create a new formData object with the updated testCategoryName
            const updatedFormData = {
                ...formData,
                testCategoryName: categoryNames
            };
    
            const response = await axios.put(`${process.env.REACT_APP_BACKEND_URL}/update-package/${id}`, updatedFormData);
            setIsLoading(false);
            toast.success('Package Updated', {
                onClose: () => {
                    navigate('/all-package');
                }
            });
        } catch (error) {
            setIsLoading(false);
            console.error('Error:', error);
            toast.error(error.response?.data?.message || 'An error occurred');
        }
    };

    return (
        <>
            <ToastContainer />
            <div className="bread">
                <div className="head">
                    <h4>Edit Package</h4>
                </div>
                <div className="links">
                    <Link to="/all-package" className="add-new">Back <i className="fa-regular fa-circle-left"></i></Link>
                </div>
            </div>

            <div className="d-form">
                <form className="row g-3" onSubmit={handleSubmit}>
                    <div className="col-md-8">
                        <label htmlFor="packageName" className="form-label">Package Name</label>
                        <input type="text" onChange={handleCategoryNameChange} name='packageName' value={formData.packageName} className="form-control" id="packageName" />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="testCategoryName" className="form-label">Select Tests</label>
                        <Select
                            isMulti
                            options={testOptions}
                            onChange={handleTestChange}
                            value={formData.testCategoryName}
                        />
                    </div>
                    <div className="col-md-3 col-6">
                        <label htmlFor="testQuantity" className="form-label">Test Quantity</label>
                        <input type="text" readOnly name='testQuantity' value={formData.testQuantity} className="form-control" id="testQuantity" />
                    </div>
                    <div className="col-md-3 col-6">
                        <label htmlFor="testGroupQuantity" className="form-label">Test Group Quantity</label>
                        <input type="text" readOnly name='testGroupQuantity' value={formData.testGroupQuantity} className="form-control" id="testGroupQuantity" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="actualPrice" className="form-label">Actual Price</label>
                        <input type="text" onChange={handleCategoryNameChange} name='actualPrice' value={formData.actualPrice} className="form-control" id="actualPrice" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="currentPrice" className="form-label">Current Price</label>
                        <input type="text" onChange={handleCurrentPriceChange} name='currentPrice' value={formData.currentPrice} className="form-control" id="currentPrice" />
                    </div>
                    <div className="col-md-4">
                        <label htmlFor="offPercentage" className="form-label">Off Percentage</label>
                        <input type="text" onChange={handleOffPercentageChange} name='offPercentage' value={formData.offPercentage} className="form-control" id="offPercentage" />
                    </div>
                    <div className="col-12 text-center">
                        <button type="submit" disabled={isLoading} className={`${isLoading ? 'not-allowed' : 'allowed'}`}>
                            {isLoading ? "Please wait..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditPackage;
