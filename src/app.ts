// src/app.ts
import { RegisterRoutes } from "../tsoa/routes";
import swaggerUi from "swagger-ui-express";
import { ValidateError } from "tsoa";
import express, {
    Response,
    Request,
    NextFunction,
    urlencoded,
    json,
} from "express";

export const app = express();


// Use body parser to read sent json payloads
app.use(
    urlencoded({
        extended: true,
    })
);
app.use(json());


app.use("/docs", swaggerUi.serve, async (_req: Request, res: Response) => {
    return res.send(
        swaggerUi.generateHTML(await import("../tsoa/swagger.json"))
    );
});

RegisterRoutes(app);

app.use(function errorHandler(
    err: unknown,
    req: Request,
    res: Response,
    next: NextFunction
): Response | void {
    if (err instanceof ValidateError) {
        console.warn(`Caught Validation Error for ${req.path}:`, err.fields);
        return res.status(422).json({
            message: "Validation Failed",
            details: err?.fields,
        });
    }
    if (err instanceof Error) {
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }

    next();
});
