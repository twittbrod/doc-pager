import { Router } from "express";
import { list, members } from "./module";
const router = Router();

router.route(['/', '/list']).get(async (req, res, next) => {
    try {
        res.status(200).send(await list(req.user.auth_spark.access_token));
    } catch (error) {
        next(error);
    }
});

router.route('/:roomId/members').get(async (req, res, next) => {
    try {
        res.status(200).send(await members(req.user.auth_spark.access_token, req.params.roomId));
    } catch (error) {
        next(error);
    }
});

export = router;
