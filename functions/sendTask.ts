import { LRUCache } from "lru-cache";
import * as nodemailer from "nodemailer";
import { Context } from "@netlify/functions";

interface RequestBody {
  skill: number;
  task: string;
}

const rateLimit = new LRUCache({
  max: 100,
  ttl: 60 * 1000,
});

export default async function (request: Request, context: Context) {
  try {
    if (request.method !== "POST") {
      return new Response(
        JSON.stringify({
          message: "Method Not Allowed",
        }),
        { status: 405 },
      );
    }

    const ip = request.headers.get('x-nf-client-connection-ip') || context.ip;

    if (rateLimit.has(ip)) {
      return new Response(
        JSON.stringify({
          message: "Please, try again in 1 minute",
        }),
        { status: 429 },
      );
    }

    rateLimit.set(ip, true, { ttl: 60000 });

    const body = await request.json() as RequestBody;

    if (body && body.skill !== undefined && body.task) {
      console.log(body);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const { skill, task } = body;

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
