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
    try {
      await sendTemplateEmail("lead-notification", "contact@dentalpaymenttech.com", {
        templateData: { formName: data.formName, fields: data.fields },
        ...(data.replyTo ? { replyTo: data.replyTo } : {}),
      });
      return { ok: true as const };
    } catch (err) {
      const code = (err as { code?: string })?.code;
      console.error("[submitLead] email send failed:", code ?? err);
      return { ok: false as const, reason: code ?? "send_failed" };
    }
  });
