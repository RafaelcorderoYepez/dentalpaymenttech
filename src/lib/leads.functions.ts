import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  formName: z.enum(["Free Savings Analysis", "PracticePay Quote & Demo"]),
  fields: z
    .array(z.object({ label: z.string().max(60), value: z.string().max(1000) }))
    .max(15),
  replyTo: z.string().email().max(255).optional(),
});

export const submitLead = createServerFn({ method: "POST" })
  .inputValidator((data) => schema.parse(data))
  .handler(async ({ data }) => {
    const { sendTemplateEmail } = await import("@/lib/email-templates/send-email");
    await sendTemplateEmail("lead-notification", "contact@dentalpaymenttech.com", {
      templateData: { formName: data.formName, fields: data.fields },
      replyTo: data.replyTo,
    });
    return { ok: true };
  });
