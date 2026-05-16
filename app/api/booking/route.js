import nodemailer from "nodemailer";

export async function POST(req) {

    try {

        const body = await req.json();

        const {
            fullName,
            email,
            mobile,
            guestNo,
            adults,
            childrens,
            checkIn,
            checkOut,
            destination,
            room
        } = body;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });
        await transporter.sendMail({
            from: "luneviaBookings@gmail.com",
            to: process.env.EMAIL_USER,

            subject: `New Booking From ${fullName} for ${destination}`,

            html: `
                <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">

                    <h2 style="color: #000;">
                        New booking Received
                    </h2>

                    <p>
                        You have received a new booking through the website booking form for the ${destination} ${room}
                    </p>

                    <table 
                        cellpadding="10" 
                        cellspacing="0" 
                        border="1" 
                        style="border-collapse: collapse; width: 100%; max-width: 600px;"
                    >

                        <tr>
                            <td><strong>Full Name</strong></td>
                            <td>${fullName}</td>
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
                            <td><strong>No. of guests</strong></td>
                            <td>${guestNo}</td>
                        </tr>

                        <tr>
                            <td><strong>No. of Adults</strong></td>
                            <td>${adults}</td>
                        </tr>
                        <tr>
                            <td><strong>No. of Childrens</strong></td>
                            <td>${childrens == "" ? 0 : childrens}</td>
                        </tr>
                        <tr>
                            <td><strong>Booking on </strong></td>
                            <td>${checkIn} - ${checkOut}</td>
                        </tr>
                        <tr>
                            <td><strong>Destination</strong></td>
                            <td>${destination}</td>
                        </tr>
                        <tr>
                            <td><strong>Room</strong></td>
                            <td>${room}</td>
                        </tr>

                    </table>

                    <br />

                    <p>
                        Please respond to this booking at the earliest convenience.
                    </p>

                    <p>
                        Regards,<br />
                        Website Booking System
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