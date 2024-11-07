// src/app.ts
import express, { json, urlencoded, Response as ExResponse, Request as ExRequest } from "express";
import { RegisterRoutes } from "../tsoa/routes";
import swaggerUi from "swagger-ui-express";
import swaggerDocument from '../tsoa/swagger.json';

export const app = express();

app.use("/docs", swaggerUi.serve, async (_req: any, res: any) => {
    return res.send(
        swaggerUi.generateHTML(await import("../tsoa/swagger.json"))
    );
});

// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());


RegisterRoutes(app);


