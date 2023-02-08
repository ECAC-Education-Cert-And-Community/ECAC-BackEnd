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

//게시글 작성 api
app.post('/post', /*authenticateAccessToken,*/ async(req, res) => {
    try{
        // 파라미터 받아오기
    const userId = req.body.userId;                  
    const postTitle = req.body.postTitle;
    const postContent = req.body.postContent;
    const imagePath = req.body.imagePath;
    const publishDate = req.body.publishDate;
    const tag = req.body.tag;
    const postViews = req.body.postViews;
    const postLikes = req.body.postLikes;
    //const datas = [name, title, content, passwd]; // 모든 데이터의 배열

    await prisma.posts.create({
        data:{
            userId : userId,
            postTitle : postTitle,
            postContent : postContent,
            imagePath : imagePath,
            publishDate : publishDate,
            tag : tag,
            postViews : postViews,
            postLikes : postLikes
        },
    })
    res.send({message:'Saved Succesfully'})
    }
    catch(error){
        console.error(error);
        res.status(500).send({error: 'Server Error'});
    }
});


//게시글 상세 조회 api
app.get('/post/read/:id', async (req, res) => {
    try{
        const postId = Number(req.params.id)

        const post = await prisma.posts.findUnique({
            where:{
                postId : postId
            },
        });
        res.send(post);
      }
      catch(error){
        console.error(error);
        res.status(500).send({error: 'Server Error.'});
      }
});

