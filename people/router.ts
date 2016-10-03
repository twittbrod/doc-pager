import { Router } from "express";
import { personDetails } from "./module";
import { OK } from "http-status-codes";

const router = Router();

router.route('/:personId').get(async (req, res, next) => {
    try {
        if (!req.params.personId) {
            throw new Error('`personId` expected');
        }
        res.status(OK).send(await personDetails(req.user.auth_spark.access_token, req.params.personId));
    } catch (error) {
        next(error);
    }
});

export = router;
