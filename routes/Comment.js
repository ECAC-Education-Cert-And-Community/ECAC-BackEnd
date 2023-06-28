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


// 댓글 목록 조회 api (시간 순으로 오름차순 정렬하기)
router.get('/', async (req, res) => {
  try {
    const postId = Number(req.params.id);
    
    const commentList = await prisma.comments.findMany({
        orderBy: [
          {
            // commentDate 값이 일치하는 데이터들이 있을 수 있음. -> unique한 값을 갖고 생성순으로 ID값이 증가하는 PK로 정렬
            commentId: 'asc'
          }
        ],
        where: {
          // postId가 일치하면 데이터 조회
          postId: postId
        },
        select: {
          userId: true,
          content: true,
          commentDate: true
        }
    });
    res.send(commentList);
  }
  catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server Error.' });
  }
});


// 댓글 등록 API
router.post('/', /*authenticateAccessToken,*/ async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const userId = req.body.userId;
    //const userId = req.user.userId;
    const content = req.body.content;

    await prisma.comments.create({
      data: {
        postId: postId,
        userId: userId,
        content: content
      }
    })
    res.send({ message: 'Saved Successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server Error.' });
  }
});


// 댓글 수정 API
router.put('/:commentId',  /*authenticateAccessToken,*/ async (req, res) => {
  try {
    const commentId = Number(req.params.commentId);
    const postId = Number(req.params.id);
    const userId = req.body.userId;
    //const userId = req.user.id;
    const content = req.body.content;

    const commentRes = await prisma.comments.findUnique({
      where: {
        commentId: commentId
      }
    });

    if (commentRes.userId == userId) { //댓글 작성자인지 확인
      await prisma.comments.update({
        where: {
          commentId: commentId
        },
        data: {
          content: content
        }
      });
      res.send({ message: 'Updated Successfully.' });
    } else {
      res.status(403).send({ error: 'Authentication fail.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server Error.' });
  }
});


// 댓글 삭제 API
router.delete('/:commentId',  /*authenticateAccessToken,*/ async (req, res) => {
  try {
    const postId = Number(req.params.id);
    const commentId = Number(req.params.commentId);
    const userId = req.body.userId;
    //const userId = req.user.id;

    // commentId가 일치하는 댓글을 commentRes에 정보 저장
    const commentRes = await prisma.comments.findUnique({
      where: {
        commentId: commentId
      }
    })

    // commentRes에 저장된 userId와 현재 로그인 중인 user의 Id가 일치하는지 확인.
    if (commentRes.userId == userId) {
      await prisma.comments.delete({
        where: {
          commentId: commentId
        }
      });
      res.send({ message: 'Deleted Successfully.' });
    }
    else {
      res.status(403).send({ error: 'Authentication fail.' });
    }

  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Server Error.' });
  }
});