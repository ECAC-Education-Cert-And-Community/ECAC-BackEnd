const express = require('express');
const router = express();
router.use(express.json());

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.listen(8082, () => {
    console.log('Server listening on port 8082');
});

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

//TypeError: Do not know how to serialize a BigInt 해결코드
BigInt.prototype.toJSON = function () {
    return this.toString()
}

// 비밀번호 암호화 함수
const bcrypt = require('bcrypt')

// 회원가입 api
router.post('/register', async (req, res) => {
    try {
        // 파라미터 받아오기
        // const userId = req.body.userId;
        const userName = req.body.userName;
        const userEmail = req.body.userEmail;
        const userPW = await bcrypt.hash(req.body.userPW, 10);  // 10은 saltOrRounds 기본 횟수
        const userPhoneNum = req.body.userPhoneNum;
        const userRole = req.body.userRole;
        const activityNum = 0;
        const serviceAgree = req.body.serviceAgree;
        const regDate = req.body.regDate;
        const update = req.body.update;
        const pointStatus = req.body.pointStatus;

        if (!serviceAgree) {
            res.send({ message: 'You cannot sign up unless you agree to the terms and conditions.' })
        } else {
            const userExist = await prisma.users.findUnique({
                where: {
                    userEmail: userEmail
                },
            });

            if (userExist) {
                res.send({ message: 'Email already exists.' })
            } else {
                await prisma.users.create({
                    data: {
                        userName: userName,
                        userEmail: userEmail,
                        userPW: userPW,
                        userPhoneNum: userPhoneNum,
                        userRole: userRole,
                        activityNum: activityNum,
                        serviceAgree: serviceAgree,
                        regDate: regDate,
                        update: update,
                        pointStatus: pointStatus
                    },
                })
                res.send({ message: 'Saved Succesfully' })
            }
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
    }
});

// 로그인 api
router.post('/login', async (req, res) => {
    try {
        const userEmail = req.body.userEmail; // 로그인 아이디가 userEmail 
        const userPW = req.body.userPW;

        const user = await prisma.users.findUnique({
            where: {
                userEmail: userEmail
            },
        });
        if (!user) {
            return res.status(400).send({ error: 'Wrong ID, you need to register.' });
        }
        else {
            const isEqualPw = await bcrypt.compare(userPW, user.userPW);
            if (isEqualPw)
                return res.send({ message: 'Login Suceed.', user });
            else
                return res.status(404).send({ error: 'Wrong Password.' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error.' });
    }
});

// 회원정보 수정 api
router.put('/edit', async (req, res) => {

    try {
        // 파라미터 받아오기
        const userId = req.body.userId; // 자동으로 받아오는 것으로 수정 필요
        const userName = req.body.userName;
        const userPhoneNum = req.body.userPhoneNum;
        const update = req.body.update;
        const user = await prisma.users.update({
            where: {
                userId: userId
            },
            data: {
                userName: userName,
                userPhoneNum: userPhoneNum,
                update: update
            }
        })
        res.send(user);
    }
    catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server Error' });
}
});
