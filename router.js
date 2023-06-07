const express = require('express');
const app = express();

const postRouter = require('./Post.js');
const userAuthRouter = require('./UserAuth.js');
const searchRouter = require('./Search.js');
const activityRouter = require('./Activity.js');
const mypageRouter = require('./MyPage.js');

app.use(express.json());
app.use('/post', postRouter);
app.use('/user', userAuthRouter);
app.use('/search', searchRouter);
app.use('/activity', activityRouter);
app.use('/mypage', mypageRouter);

app.listen(8082, () => {
  console.log('Server listening on port 8082');
});
