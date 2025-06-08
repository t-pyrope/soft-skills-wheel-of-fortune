import { LRUCache } from "lru-cache";
import * as nodemailer from "nodemailer";
import { Context, HandlerEvent } from "@netlify/functions";

interface RequestBody {
  skill: number;
  task: string;
}

const rateLimit = new LRUCache({
  max: 100,
  ttl: 60 * 1000,
});

export default async function (event: HandlerEvent, context: Context) {
  try {
    console.log(event);
    if (event.httpMethod !== "POST") {
      return new Response(
        JSON.stringify({
          message: "Method Not Allowed",
        }),
        { status: 405 },
      );
    }

    const ip =
      event.headers["x-nf-client-connection-ip"] || context.ip || "unknown-ip";

    if (event.body === null || event.body.trim() === "") {
      return new Response(
        JSON.stringify({
          message: "Request body is missing or empty",
        }),
        { status: 400 },
      );
    }

    if (rateLimit.has(ip)) {
      return new Response(
        JSON.stringify({
          message: "Please, try again in 1 minute",
        }),
        { status: 429 },
      );
    }

    rateLimit.set(ip, true, { ttl: 60000 });

    const requestBody = JSON.parse(event.body) as RequestBody;

    console.log(requestBody);

    if (requestBody && requestBody.skill !== undefined && requestBody.task) {
      console.log(requestBody);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const { skill, task } = requestBody;

      const mockMail = "example@mail.com";
      const message = `Skill: ${skill}, text: ${task}`;

      const mailOptions = {
        from: mockMail,
        to: process.env.EMAIL_TO,
        subject: `New message from ${mockMail}`,
        text: message,
        html: `<p><strong>Email:</strong> ${mockMail}</p>
             <p><strong>Message:</strong> ${message}</p>`,
      };

      await transporter.sendMail(mailOptions);

      return new Response(
        JSON.stringify({
          skill,
          task,
        }),
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({
        message: "Internal error",
      }),
      { status: 400 },
    );
  }
};
