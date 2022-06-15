import axios from "axios";

const alittApi = axios.create({
  baseURL: "https://alitt-app.herokuapp.com/api",
});

export const getArticles = (topic, searchParams, order) => {
  if (searchParams) {
    return alittApi
      .get(`/articles?sort_by=${searchParams}&order=${order}`, { params: { topic } })
      .then(({ data }) => {
        return data.article;
      });
  }
  return alittApi
    .get("/articles", { params: { topic }, sort_by: searchParams })
    .then(({ data }) => {
      return data.article;
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getArticleByID = (article_id) => {
  return alittApi.get(`/articles/${article_id}`).then(({ data }) => {
    return data.article;
  });
};

export const getTopics = () => {
  return alittApi.get("/topics").then(({ data }) => {
    return data.topics;
  });
};

export const updateVotes = (article_id) => {
  return alittApi
    .patch(`/articles/${article_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data.article.votes;
    });
};

export const getComments = (article_id) => {
  return alittApi.get(`/articles/${article_id}/comments`).then(({ data }) => {
    return data.comments;
  });
};

export const postComment = (article_id, commentToPost) => {
  return alittApi
    .post(`/articles/${article_id}/comments`, {
      username: "jessjelly",
      body: commentToPost,
    })
    .then(({ data }) => {
      return data.comment;
    });
};

export const increaseCommentVote = (comment_id) => {
  return alittApi
    .patch(`/comments/${comment_id}`, { inc_votes: 1 })
    .then(({ data }) => {
      return data;
    });
};

export const getSortBy = () => {
  return alittApi.get("/articles", {});
};
