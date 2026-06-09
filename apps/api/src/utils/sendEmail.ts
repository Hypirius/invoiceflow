import { resendClient } from "@/config/resendClient";
import { EmailServiceError } from "@/lib/errors/ErrorClasses";

type sendEmailType = {
  from: string;
  to: string;
  subject: string;
  templateOptions: {
    id: string;
    variables?:
      | {
          [x: string]: string | number;
        }
      | undefined;
  };
};

async function sendEmail({
  from,
  to,
  subject,
  templateOptions,
}: sendEmailType) {
  const { data, error } = await resendClient.emails.send({
    from,
    to: [to],
    subject,
    template: templateOptions,
  });

  if (error || !data) {
    // TODO: Should this be operational or no?
    throw new EmailServiceError();
  }

  return data;
}

export default sendEmail;
