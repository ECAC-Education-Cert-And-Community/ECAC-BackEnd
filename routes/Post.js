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

//게시글 작성 api
router.post('/', /*authenticateAccessToken,*/ async (req, res) => {
    try {
        // 파라미터 받아오기
        const userId = req.body.userId;
        const postTitle = req.body.postTitle;
        const postContent = req.body.postContent;
        const imagePath = req.body.imagePath;
        const publishDate = req.body.publishDate;
        const tag = req.body.tag;
        const postViews = 0;
        const postLikes = 0;
        //const datas = [name, title, content, passwd]; // 모든 데이터의 배열

        await prisma.posts.create({
            data: {
                userId: userId,
                postTitle: postTitle,
                postContent: postContent,
                imagePath: imagePath,
                publishDate: publishDate,
                tag: tag,
                postViews: postViews,
                postLikes: postLikes
            },
        })
        res.send({ message: 'Saved Succesfully' })
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
    }
});


//게시글 상세 조회 api
router.get('/read/:id', async (req, res) => {
    try {
        const postId = Number(req.params.id)

        const post = await prisma.posts.findUnique({
            where: {
                postId: postId
            },
        });
        res.send(post);
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error.' });
    }
});

//게시글 목록 조회 api
router.get('/', async (req, res) => {
    try {
        const postList = await prisma.posts.findMany({
            select: {
                postId: true,
                userId: true,
                postTitle: true,
                publishDate: true
            }
        });
        res.send(postList)
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error.' });
    }
});


//게시글 수정 API
router.put('/:id', /*authenticateAccessToken,*/ async (req, res) => {
    try {
        const postId = Number(req.params.id)
        const userId = req.body.userId
        const postTitle = req.body.postTitle
        const postContent = req.body.postContent
        const imagePath = req.body.imagePath

        const postRes = await prisma.posts.findUnique({
            where: {
                postId: postId,
            },
        });

        if (postRes.userId == userId) { //게시글 작성자인지 확인
            await prisma.posts.update({
                where: {
                    postId: postId,
                },
                data: {
                    postTitle: postTitle,
                    postContent: postContent,
                    imagePath: imagePath
                }
            });
            res.send({ message: 'Updated Successfully.' })
        } else {
            res.status(403).send({ error: 'Authentication fail.' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error.' });
    }
})

//게시글 삭제 API
router.delete('/:id', /*authenticateAccessToken,*/ async (req, res) => {
    try {
        const postId = Number(req.params.id)
        const userId = req.body.userId
        const postRes = await prisma.posts.findUnique({
            where: {
                postId: postId,
            },
        })

        if (postRes.userId == userId) { //게시글 작성자인지 확인 
            await prisma.posts.deleteMany({
                where: {
                    postId: postId,
                },
            });
            res.send({ message: 'Deleted Successfully.' })
        } else {
            res.status(403).send({ error: 'Authentication fail.' })
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error.' });
    }
})


// 게시글 좋아요 api
router.post('/read/:id/like', async (req, res) => {
    try {
        const postId = Number(req.params.id)
        const postRes = await prisma.posts.findUnique({
            where: {
                postId: postId,
            },
        })
        const postLikes = postRes.postLikes + 1n
        await prisma.posts.update({
            where: {
                postId: postId,
            },
            data: {
                postLikes: postLikes
            }
        });
        res.send({ message: 'Updated Successfully.' })
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error.' });
    }
});

// 스크랩 api
router.post('/read/:id/scrap', async (req, res) => {
    try {
        const postId = Number(req.params.id)
        // const userId = req.user.id;
        const userId = req.body.userId;
        
        const scrapExist = await prisma.postInterest.findFirst({
            where: {
                userId : userId,
                postId : postId
              }
        })

        if (scrapExist != null) {
            res.send({ message: 'Already in Scrap list' })
        } else {
            await prisma.postInterest.create({
                data: {
                    userId: userId,
                    postId: postId
                },
            })
            res.send({ message: 'Scrap Success.' })
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Server Error' });
    }
});

// 스크랩 모아보기 api
router.get('/scrap', async (req, res) => {
    try {
      const userId = req.body.userId;
      
      const postInterest = await prisma.postInterest.findMany({
        where: {
          userId: userId,
        },
        select: {
          postId: true,
        },
      });
    //   res.send(postInterest);
      const postList = await prisma.posts.findMany({
        where: {
          OR: postInterest.map((interest) => ({
            postId: interest.postId,
          })),
        },
        select: {
          postId: true,
          userId: true,
          postTitle: true,
          publishDate: true,
        },
      });
      res.send(postList);
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'Server Error.' });
    }
  });
  