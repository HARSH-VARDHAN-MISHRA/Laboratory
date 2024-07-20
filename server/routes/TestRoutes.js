const express = require('express');
const multer = require('multer');
const { UploadXlsxFileAndExtractTest,UploadXlsxFileAndExtractData,getDownLoadTestOfLabByLabId,singleTestDeleteByTestId,getAllTestsWithLabInfoInBuild,UpdateTestDetails,DeleteAllTestsByLabId,getSingleTestByTestId,getALLTestByLabId ,ByTestNameShowAllLabsWithWhichDoThisTestWithPrices} = require('../controlers/TestUpload');
const router = express.Router();

// Set up multer for file upload
const upload = multer({ dest: 'files/' });

// Route to handle file upload and extraction
router.post('/upload-xlsx', upload.single('file'), UploadXlsxFileAndExtractData);
router.post('/update-test/:id', UpdateTestDetails);
router.delete('/laboratories/:labId/tests', DeleteAllTestsByLabId);
router.delete('/delete-test/:id',singleTestDeleteByTestId)
router.get('/get-all-test/:labId',getALLTestByLabId)
router.get('/get-single-test/:id',getSingleTestByTestId)
router.get('/get-all-Tests',getAllTestsWithLabInfoInBuild)
router.get('/get-all-Tests/:testName',ByTestNameShowAllLabsWithWhichDoThisTestWithPrices)
router.post('/upload-xlsx-test', upload.single('file'),UploadXlsxFileAndExtractTest)
router.get('/download-xlsx-test/:labId',getDownLoadTestOfLabByLabId)

module.exports = router;
