const express = require('express');
const multer = require('multer');
const { UploadXlsxFileAndExtractTest, UploadXlsxFileAndExtractData, getDownLoadTestOfLabByLabId, singleTestDeleteByTestId, getAllTestsWithLabInfoInBuild, UpdateTestDetails, DeleteAllTestsByLabId, getSingleTestByTestId, getALLTestByLabId, ByTestNameShowAllLabsWithWhichDoThisTestWithPrices, deleteAllTestForTestModel } = require('../controlers/TestUpload');
const { createReports, getReportByReportId, getReportsByPatientId, getAllReports, deleteReportByReportId, resendReportByReportId, updateReportStatus, getReportsByOrderId } = require('../controlers/GoogleDriveController');
const { isAuthenticatedAdmin } = require('../middlewares/admin');
const router = express.Router();

// Set up multer for file upload
const upload = multer({ dest: 'files/' });

// Route to handle file upload and extraction
router.post('/upload-xlsx', upload.single('file'),UploadXlsxFileAndExtractData);
router.post('/update-test/:id', UpdateTestDetails);
router.delete('/laboratories/:labId/tests', DeleteAllTestsByLabId);
router.delete('/delete-test/:id', singleTestDeleteByTestId)
router.get('/get-all-test/:labId', getALLTestByLabId)
router.get('/get-single-test/:id', getSingleTestByTestId)
router.get('/get-all-Tests', getAllTestsWithLabInfoInBuild)
router.get('/get-all-Tests/:testName', ByTestNameShowAllLabsWithWhichDoThisTestWithPrices)
router.post('/upload-xlsx-test', upload.single('file'), UploadXlsxFileAndExtractTest)
router.delete('/delete-all-test', deleteAllTestForTestModel)

router.get('/download-xlsx-test/:labId', getDownLoadTestOfLabByLabId)


router.post('/upload-test-result', createReports)
router.get('/reports/:reportId', getReportByReportId);
router.get('/reports/patient/:patientId', getReportsByPatientId);
router.get('/reports/order/:orderId', getReportsByOrderId);
router.get('/reports', getAllReports);
router.patch('/reports/:reportId/status', updateReportStatus);
router.delete('/reports/:reportId', deleteReportByReportId)
router.post('/reports/:reportId/resend', resendReportByReportId);
1
module.exports = router;
