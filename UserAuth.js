const express = require('express');
const app = express();
app.use(express.json());

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.listen(8082, () => {
    console.log('Server listening on port 8082');
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//TypeError: Do not know how to serialize a BigInt 해결코드
BigInt.prototype.toJSON = function () {
    return this.toString()
}

// 비밀번호 암호화 함수
const bcrypt = require('bcrypt')

// 회원가입 api
app.post('/register', async (req, res) => {
    try {
        // 파라미터 받아오기
        const userId = req.body.userId;
        const userName = req.body.userName;
        const department = req.body.department;
        const userNick = req.body.userNick;
        const userEmail = req.body.userEmail;
        const userPW = await bcrypt.hash(req.body.userPW, 10);  // 10은 saltOrRounds 기본 횟수
        const userPhoneNum = req.body.userPhoneNum;
        const profileImagePath = req.body.profileImagePath;
        const userRole = req.body.userRole;
        const activityNum = req.body.activityNum;
        const serviceAgree = req.body.serviceAgree;
        const regDate = req.body.regDate;
        const update = req.body.update;
        const pointStatus = req.body.pointStatus;


        await prisma.users.create({
            data: {
                userId: userId,
                userName: userName,
                department: department,
                userNick: userNick,
                userEmail: userEmail,
                userPW: userPW,
                userPhoneNum: userPhoneNum,
                profileImagePath: profileImagePath,
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
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
    }
});
