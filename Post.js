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


//게시글 목록 조회 api
app.get('/post', async (req, res) => {
  try{
    const postList = await prisma.posts.findMany({
      select:{
        postId : true,
        userId : true,
        postTitle : true,
        publishDate : true
      }
    });
    res.send(postList)
  }
  catch(error){
    console.error(error);
    res.status(500).send({error: 'Server Error.'});
  }
});


//게시글 수정 API
app.put('/post/:id', /*authenticateAccessToken,*/ async(req, res) => {
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
    
            if(postRes.userId==userId){ //게시글 작성자인지 확인
                await prisma.posts.update({
                    where: {
                        postId: postId,
                    },
                    data: {
                        postTitle: postTitle,
                        postContent: postContent,
                        imagePath : imagePath
                    }
                });
                res.send({message:'Updated Successfully.'})
            }else{
                res.status(403).send({error:'Authentication fail.'})
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({error:'Server Error.'});
        }
})

//게시글 삭제 API
app.delete('/post/:id', /*authenticateAccessToken,*/ async(req, res) => {
    try {
            const postId = Number(req.params.id)
            const userId = req.body.userId
            const postRes = await prisma.posts.findUnique({
                where:{
                    postId: postId,
                },
            })
            
            if(postRes.userId==userId){ //게시글 작성자인지 확인 
                await prisma.posts.deleteMany({
                    where: {
                        postId: postId,
                    },
                });
                res.send({message:'Deleted Successfully.'})
            }else{
                res.status(403).send({error:'Authentication fail.'})
            }
        } catch (error) {
            console.error(error);
            res.status(500).send({error:'Server Error.'});
        }
})

