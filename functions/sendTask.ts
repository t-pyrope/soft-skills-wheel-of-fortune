import { HandlerEvent, HandlerContext } from "@netlify/functions";

interface RequestBody {
  skill: number;
  task: string;
}

exports.handler = async function (
  event: HandlerEvent,
  context: HandlerContext,
) {
  if (event.httpMethod !== "POST") {
    return new Response("Method Not Allowed", { status: 405 });
  }

  if (event.body === null) {
    return new Response("Request body is missing or empty", { status: 400 });
  }

  try {
    const requestBody = JSON.parse(event.body) as RequestBody;
    if (requestBody && requestBody.skill !== undefined && requestBody.task) {
      console.log(requestBody);
      return new Response("OK");
    }
  } catch (error) {
    console.error("Error parsing JSON body:", error);
    return new Response("Invalid JSON body.", { status: 400 });
  }

  return new Response("Internal error", { status: 500 });
};
