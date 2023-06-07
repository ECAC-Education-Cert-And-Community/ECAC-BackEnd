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


// 마이페이지 api
app.get('/mypage', async (req, res) => {
    try {
        // 파라미터 받아오기
        const userId = req.body.userId; // 자동으로 받아오는 것으로 수정 필요

        const user = await prisma.users.findUnique({
            where: {
                userId: userId
            },
            select: {
                userName: true,
                department: true,
                userNick: true,
                userEmail: true,
                userPhoneNum: true,
                profileImagePath: true,
                userRole: true,
                pointStatus: true
            }
        })
        res.send(user);
    }
    catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server Error' });
}
});

// 문의사항 api
app.post('/inquiry', /*authenticateAccessToken,*/ async (req, res) => {
    try {
        // 파라미터 받아오기
        const userId = req.body.userId;
        const inquiryTitle = req.body.inquiryTitle;
        const inquiryContent = req.body.inquiryContent;
        const publishDate = req.body.publishDate;

        await prisma.Inquiry.create({
            data: {
                userId: userId,
                inquiryTitle: inquiryTitle,
                inquiryContent: inquiryContent,
                publishDate: publishDate,
            },
        })
        res.send({ message: 'Saved Succesfully' })
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
    }
});