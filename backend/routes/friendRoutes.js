const express = require("express");
const router = express.Router();
const friendControllers = require("../controllers/friend");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator();
const authMiddleware = require("../middleware/auth");


const postFriendInvitationSchema = Joi.object({targetEmail: Joi.string().email().required()});

const inviteDecisionSchema = Joi.object({id: Joi.string().required()})

router.post('/invite', authMiddleware, validator.body(postFriendInvitationSchema), friendControllers.postInvite)

router.post('/accept', authMiddleware, validator.body(inviteDecisionSchema), friendControllers.postAccept)

router.post('/reject', authMiddleware, validator.body(inviteDecisionSchema), friendControllers.postReject)

module.exports = router;
