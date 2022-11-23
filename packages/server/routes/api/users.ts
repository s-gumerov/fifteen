import { Router } from "express";
import { setNewUser, getUser } from "../models/user";
import { User } from "../../db";

const router = Router();

router.post(setNewUser.route, async (req, res) => {
    const newUser = await User.create({
        login: req.body.login,
        avatar_url: req.body.avatarUrl
    })
    await newUser.save()
    const users = await User.findAll()
    const id = users[users.length - 1].dataValues.id
    const result: setNewUser.Response = {userId: id};
    res.send(result)
})

router.get(getUser.route, async (req, res) => {
    const user = await User.findOne({
        where: {
            id: req.body.id
        }
    })
    let result = {};
    if (user) {
        result = {
            id: user.dataValues.id,
            login: user.dataValues.login,
            avatarUrl: user.dataValues.avatar_url,
        }
    }
    res.send(result);
})

export default router;
