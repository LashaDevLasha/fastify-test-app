import { FastifyPluginAsync } from "fastify";
import axios from "axios";
import {
  transactionSchema,
  webhookResponseSchema,
  createTransactionResponseSchema,
  errorResponseSchema400,
  errorResponseSchema500wbhook,
  errorResponseSchema500create,
  missingIDschema,
} from "./schemas";
import { getAccessToken } from "./accessToken";
import { retry } from "./retry";

let paymentId: string = "";
let token: string = "";

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.post(
    "/create-transaction",
    {
      schema: {
        body: transactionSchema,
        response: {
          200: createTransactionResponseSchema,
          400: errorResponseSchema400,
          500: errorResponseSchema500create,
        },
      },
    },
    async (request, reply) => {
      try {
        const accessToken = await getAccessToken();
        token = accessToken;

        const transactionData = request.body;

        const createTransaction = async () => {
          return await axios.post(
            "https://api.omno.com/transaction/h2h/create",
            transactionData,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
        };

        const response = await retry(createTransaction);
        paymentId = response.data.paymentId;
        console.log("Transaction created:", response.data);
        reply.send(response.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response && error.response.status === 400) {
            reply.code(400).send({
              error: "BadRequest",
              message: error.response.data.message || "Bad Request",
            });
          } else {
            console.error("Error creating transaction:", error);
            reply.code(500).send({ error: "Failed to create transaction" });
          }
        } else {
          console.error("Unexpected error:", error);
          reply.code(500).send({ error: "Failed to create transaction" });
        }
      }
    }
  );

  fastify.post(
    "/webhook",
    {
      schema: {
        response: {
          200: webhookResponseSchema,
          400: missingIDschema,
          500: errorResponseSchema500wbhook,
        },
      },
    },
    async (request, reply) => {
      try {
        if (!paymentId) {
          throw new Error("Payment ID is missing.");
        }

        const getPaymentDetails = async () => {
          return await axios.get(
            `https://api.omno.com/reporting/payments/${paymentId}`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
        };

        const paymentDetailsResponse = await retry(getPaymentDetails);
        console.log("Payment Details:", paymentDetailsResponse.data);
        reply.code(200).send(paymentDetailsResponse.data["3dsRedirectUrl"]);
      } catch (error) {
        if (error instanceof Error) {
          if (error.message === "Payment ID is missing.") {
            reply.code(400).send({
              error: "MissingPaymentID",
              message: "Payment ID is missing.",
            });
          } else {
            console.error("Error processing webhook:", error);
            reply.code(500).send({ error: "Failed to process webhook" });
          }
        } else {
          console.error("Unexpected error:", error);
          reply.code(500).send({ error: "Failed to process webhook" });
        }
      }
    }
  );
};

export default routes;
