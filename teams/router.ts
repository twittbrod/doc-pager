import { Router } from "express";
import { OK } from "http-status-codes";
import { list as listTeams, members as listTeamMembers } from "./module";
const router = Router();

router.route(['/','/list']).get(async (req, res, next) => {
    try {
        res.status(OK).send(await listTeams(req.user.auth_spark.access_token));
    } catch (error) {
        next(error);
    }
});

router.route('/:teamId/members').get(async (req, res, next) => {
    try {
        let teamMembers : [any] = await listTeamMembers(req.user.auth_spark.access_token, req.params.teamId);
        res.status(OK).send(teamMembers.filter(member => member.personId != req.user.spark_id));
    } catch (error) {
        next(error);
    }
});

export = router;