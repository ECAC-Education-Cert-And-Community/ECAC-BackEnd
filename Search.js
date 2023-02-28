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

// 검색 API
app.get('/search', async (req, res) => {
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
