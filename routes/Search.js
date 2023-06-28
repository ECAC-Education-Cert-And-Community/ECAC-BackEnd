const express = require('express');
const router = express();
router.use(express.json());

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

//const { authenticateAccessToken } = require('../middlewares/Auth');


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

// 검색 API
router.get('/', async (req, res) => {
    try {
        const search = req.query.search;
        // 띄어쓰기 무시
        // let searchText = req.params.searchText;
        let searchText = search?.replace(" ", "%");
        console.log(searchText);
        
        const postList = await prisma.posts.findMany({
            where: {
                OR: [
                    {
                        postTitle: {
                            contains: searchText,
                        },
                    },
                    {
                        postContent: {
                            contains: searchText,
                        },
                    },
                ],
            }
        });
        console.log(postList);
        res.send(postList);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error.' });
    }
});
