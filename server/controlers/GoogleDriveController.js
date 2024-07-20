const Reports = require('../models/GoogleDriveLink'); // Assuming the model file is named GoogleDriveLink.js
const User = require('../models/user.model');
const sendEmail = require('../utils/SendEmail');

 exports.createReports = async (req, res) => {
    try {
        const { userId, reportLink } = req.body;

        if (!userId) {
            return res.status(402).json({
                success: false,
                message: "Please provide User ID"
            });
        }

        const checkUser = await User.findById(userId);

        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Fetch the latest report to determine the next ReportId
        const latestReport = await Reports.findOne().sort({ createdAt: -1 });

        let nextReportId = 'REPORT_01';
        if (latestReport && latestReport.ReportId) {
            const latestIdNumber = parseInt(latestReport.ReportId.split('_')[1], 10);
            const newIdNumber = (latestIdNumber + 1).toString().padStart(2, '0');
            nextReportId = `REPORT_${newIdNumber}`;
        }

        const newReport = new Reports({
            PatientId: userId,
            ReportId: nextReportId,
            ReportLink: reportLink,
            StatusOfLink: 'Active'
        });

        await newReport.save();

        const userMailOptions = {
            email: checkUser.email,
            subject: 'Your Test Report is Ready',
            message: `
            <div style="font-family: Arial, sans-serif; width:600px;margin:0 auto; color: #333;">
                <div style="padding: 20px; background-color: #f4f4f4;">
                    <h2 style="color: #003873; text-align: center;">YUGI Health Provider LLP</h2>
                    <h3 style="color: #003873; text-align: center;">Quality Healthcare for All Citizens</h3>
                    <p>Dear <strong>${checkUser.name}</strong>,</p>
                    <p>We are pleased to inform you that your test report is now ready. You can access it using the following link:</p>
                    <p style="text-align: center;">
                        <a href="${reportLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #00aaa9; text-decoration: none; border-radius: 5px;">View Report</a>
                    </p>
                    <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
                    <p style="color: #003873;"><strong>Thank you for choosing YUGI Health Provider LLP.</strong></p>
                    <p>Best regards,<br>YUGI Health Provider LLP Team</p>
                    <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 10px;">
                        <p style="font-size: 12px; color: #777;">This email was sent by Lab Mantra Team, committed to providing quality healthcare for all citizens.</p>
                    </div>
                </div>
            </div>
            `
        };
        

        await sendEmail(userMailOptions);

        res.status(201).json({
            success: true,
            message: "Report created successfully",
            data: newReport
        });

    } catch (error) {
        console.error('Error in creating report:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
exports.getReportByReportId = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await Reports.findOne({ ReportId: reportId });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        res.status(200).json({
            success: true,
            data: report
        });

    } catch (error) {
        console.error('Error in fetching report:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getReportsByPatientId = async (req, res) => {
    try {
        const { patientId } = req.params;

        const reports = await Reports.find({ PatientId: patientId });

        if (reports.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No reports found for this patient"
            });
        }

        res.status(200).json({
            success: true,
            data: reports
        });

    } catch (error) {
        console.error('Error in fetching reports:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.deleteReportByReportId = async (req, res) => {
    try {
        const { reportId } = req.params;

        const report = await Reports.findOneAndDelete({ ReportId: reportId });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Report deleted successfully"
        });

    } catch (error) {
        console.error('Error in deleting report:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.getAllReports = async (req, res) => {
    try {
        const reports = await Reports.find();

        if (reports.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No reports found"
            });
        }

        res.status(200).json({
            success: true,
            data: reports
        });

    } catch (error) {
        console.error('Error in fetching all reports:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};

exports.resendReportByReportId = async (req, res) => {
    try {
        const { reportId } = req.params;

        // Fetch the report details by ReportId
        const report = await Reports.findOne({ ReportId: reportId });

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        // Fetch the associated user
        const checkUser = await User.findById(report.PatientId);

        if (!checkUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        // Prepare the email options
        const userMailOptions = {
            email: checkUser.email,
            subject: 'Your Test Report is Ready',
            message: `
            <div style="font-family: Arial, sans-serif; width:600px;margin:0 auto; color: #333;">
                <div style="padding: 20px; background-color: #f4f4f4;">
                    <h2 style="color: #003873; text-align: center;">YUGI Health Provider LLP</h2>
                    <h3 style="color: #003873; text-align: center;">Quality Healthcare for All Citizens</h3>
                    <p>Dear <strong>${checkUser.name}</strong>,</p>
                    <p>We are pleased to inform you that your test report is available. You can access it using the following link:</p>
                    <p style="text-align: center;">
                        <a href="${report.ReportLink}" style="display: inline-block; padding: 10px 20px; font-size: 16px; color: #ffffff; background-color: #00aaa9; text-decoration: none; border-radius: 5px;">View Report</a>
                    </p>
                    <p>If you have any questions or need further assistance, please do not hesitate to contact us.</p>
                    <p style="color: #003873;"><strong>Thank you for choosing YUGI Health Provider LLP.</strong></p>
                    <p>Best regards,<br>YUGI Health Provider LLP Team</p>
                    <div style="border-top: 1px solid #ddd; margin-top: 20px; padding-top: 10px;">
                        <p style="font-size: 12px; color: #777;">This email was sent by  Lab Mantra Team,, committed to providing quality healthcare for all citizens.</p>
                    </div>
                </div>
            </div>
            `
        };

        // Send the email
        await sendEmail(userMailOptions);

        res.status(200).json({
            success: true,
            message: "Report resent successfully"
        });

    } catch (error) {
        console.error('Error in resending report:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};
exports.updateReportStatus = async (req, res) => {
    try {
        const { reportId } = req.params;
        const { statusOfLink } = req.body;

        if (!statusOfLink) {
            return res.status(400).json({
                success: false,
                message: "Status is required"
            });
        }

        const report = await Reports.findOneAndUpdate(
            { ReportId: reportId },
            { StatusOfLink: statusOfLink },
            { new: true }
        );

        if (!report) {
            return res.status(404).json({
                success: false,
                message: "Report not found"
            });
        }

        res.status(200).json({
            success: true,
            data: report
        });
    } catch (error) {
        console.error('Error updating report status:', error);
        res.status(500).json({
            success: false,
            message: 'Internal Server Error'
        });
    }
};