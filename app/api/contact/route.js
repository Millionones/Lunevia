import nodemailer from "nodemailer";

export async function POST(req) {

    try {

        const body = await req.json();

        const {
            firstName,
            lastName,
            email,
            mobile,
            subject,
            comments
        } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        console.log(email)
        await transporter.sendMail({
            from: "luneviaEnquiry@gmail.com",
            to: process.env.EMAIL_USER,

            subject: `New Enquiry From ${firstName} ${lastName}`,

            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

                    <h2 style="color: #000;">
                        New Enquiry Received
                    </h2>

                    <p>
                        You have received a new enquiry through the website contact form.
                    </p>

                    <table 
                        cellpadding="10" 
                        cellspacing="0" 
                        border="1" 
                        style="border-collapse: collapse; width: 100%; max-width: 600px;"
                    >

                        <tr>
                            <td><strong>First Name</strong></td>
                            <td>${firstName}</td>
                        </tr>

                        <tr>
                            <td><strong>Last Name</strong></td>
                            <td>${lastName}</td>
                        </tr>

                        <tr>
                            <td><strong>Email Address</strong></td>
                            <td>${email}</td>
                        </tr>

                        <tr>
                            <td><strong>Mobile Number</strong></td>
                            <td>${mobile}</td>
                        </tr>

                        <tr>
                            <td><strong>Subject</strong></td>
                            <td>${subject}</td>
                        </tr>

                        <tr>
                            <td><strong>Comments / Questions</strong></td>
                            <td>${comments}</td>
                        </tr>

                    </table>

                    <br />

                    <p>
                        Please respond to this enquiry at the earliest convenience.
                    </p>

                    <p>
                        Regards,<br />
                        Website Enquiry System
                    </p>

                </div>
            `,
        });

        return Response.json({
            success: true,
            message: "Email sent successfully",
        });

    } catch (error) {

        console.log(error);

        return Response.json(
            {
                success: false,
                message: "Failed to send email",
            },
            { status: 500 }
        );
    }
}