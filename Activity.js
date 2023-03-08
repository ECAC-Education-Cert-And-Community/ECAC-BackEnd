const express = require('express');
const app = express();
app.use(express.json());

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

app.listen(8082, () => {
  console.log('Server listening on port 8082');
});

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//TypeError: Do not know how to serialize a BigInt 해결코드
BigInt.prototype.toJSON = function() {       
  return this.toString()
}

// 활동 등록 api
app.post('/activity', /*authenticateAccessToken,*/ async (req, res) => {
    try {
        // 파라미터 받아오기
        const userId = req.body.userId;
        const activityName = req.body.activityName;
        const activityPeriod = req.body.activityPeriod;
        const certification = req.body.certification;

        await prisma.activity.create({
            data: {
                userId: userId,
                activityName: activityName,
                activityPeriod: activityPeriod,
                certification: certification
            },
        })
        res.send({ message: 'Saved Succesfully' })
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
    }
});