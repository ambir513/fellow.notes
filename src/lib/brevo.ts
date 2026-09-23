import { BrevoClient } from "@getbrevo/brevo";

const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY!,
});

const emailTemplate = (content: string) => `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>FellowNotes</title>
  </head>

  <body style="margin: 0; padding: 0; background-color: #f6f6f6;">
    <div
      style="
        background-color: #f6f6f6;
        font-family: Arial, Helvetica, sans-serif;
      "
    >
      <table
        align="center"
        width="600"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          width: 100%;
          max-width: 600px;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
        "
      >
        <!-- Header -->
        <tr>
          <td
            style="
              background-color: #262626;
              padding: 20px;
              text-align: center;
            "
          >
            <a
              href="https://fellownotes.app/"
              target="_blank"
              style="text-decoration: none;"
            >
              <img
                src="https://pub-b289a32534284964b865f90fc9d138d6.r2.dev/fellownotes/fn.jpeg"
                alt="FellowNotes"
                width="40"
                height="40"
                style="
                  vertical-align: middle;
                  border-radius: 8px;
                "
              />

              <span
                style="
                  color: #ffffff;
                  font-size: 22px;
                  font-weight: bold;
                  vertical-align: middle;
                  margin-left: 6px;
                "
              >
                FellowNotes
              </span>
            </a>
          </td>
        </tr>

        <!-- Email Content -->
        <tr>
          <td
            style="
              padding: 30px 35px;
              color: #333333;
            "
          >
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td
            style="
              background-color: #f0f0f0;
              padding: 20px;
              text-align: center;
            "
          >
            <p
              style="
                margin: 0 0 12px;
                font-size: 12px;
                color: #888888;
              "
            >
              Need help?
              <a
                href="mailto:support@fellownotes.app"
                style="
                  color: #555555;
                  text-decoration: none;
                "
              >
                support@fellownotes.app
              </a>
            </p>

            <!-- Social Links -->
            <div style="margin: 0 0 12px;">
              <!-- Instagram -->
              <a
                href="https://instagram.com/ambir513"
                target="_blank"
                style="
                  text-decoration: none;
                  margin: 0 6px;
                "
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/24/2111/2111463.png"
                  alt="Instagram"
                  width="22"
                  height="22"
                  style="vertical-align: middle;"
                />
              </a>

              <!-- X -->
              <a
                href="https://x.com/ambir513"
                target="_blank"
                style="
                  text-decoration: none;
                  margin: 0 6px;
                "
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/24/5968/5968958.png"
                  alt="X"
                  width="22"
                  height="22"
                  style="vertical-align: middle;"
                />
              </a>

              <!-- LinkedIn -->
              <a
                href="https://linkedin.com/in/ambir513"
                target="_blank"
                style="
                  text-decoration: none;
                  margin: 0 6px;
                "
              >
                <img
                  src="https://cdn-icons-png.flaticon.com/24/174/174857.png"
                  alt="LinkedIn"
                  width="22"
                  height="22"
                  style="vertical-align: middle;"
                />
              </a>
            </div>

            <p
              style="
                margin: 0;
                font-size: 11px;
                color: #999999;
              "
            >
              &copy; ${new Date().getFullYear()} FellowNotes.
              All rights reserved.
            </p>
          </td>
        </tr>
      </table>
    </div>
  </body>
</html>
`;

export async function sendEmail({
    subject,
    htmlContent,
    to,
}: {
    subject: string;
    htmlContent: string;
    to: {
        email: string;
        name: string;
    };
}): Promise<{
    success: boolean;
    messageId: string | null;
}> {
    try {
        const res = await brevo.transactionalEmails.sendTransacEmail({
            subject,
            htmlContent: emailTemplate(htmlContent),

            sender: {
                name: "Fellow Notes",
                email: "otp.providers@gmail.com",
            },

            to: [
                {
                    email: to.email,
                    name: to.name || to.email,
                },
            ],
        });

        return {
            success: true,
            messageId: res.messageId ?? null,
        };
    } catch (err: any) {
        const errorBody = err?.body || err?.response?.body;

        console.error(
            "[Brevo] Email send failed:",
            JSON.stringify(
                errorBody || err?.message || err,
                null,
                2
            )
        );

        return {
            success: false,
            messageId: null,
        };
    }
}