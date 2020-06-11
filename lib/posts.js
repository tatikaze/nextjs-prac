import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';
import axios from 'axios';

const apiKey = process.env.API_KEY;
const postsDirectory = path.join(process.cwd(), 'posts')
axios.defaults.baseURL = "https://dev-tatikaze.microcms.io";

export async function getPostsData() {
  const documentNames = await axios.get('/api/v1/blog',  {
      headers: {'X-API-KEY': apiKey,}, 
      params: {fields: "id,title,updatedAt,author.name"},
  })
  const json = documentNames.data
  return json.contents.map(documentName => {
    return {
      id: documentName.id,
      title: documentName.title,
      date: documentName.updatedAt,
      author: documentName.author,
    }
 })
}

export async function getAllPostIds() {
  const documentNames = await axios.get('/api/v1/blog',  {
      headers: {'X-API-KEY': apiKey,}, 
      params: {fields: "id"},
  })
  const json = documentNames.data
  return json.contents.map(documentName => {
    return {
      params: {id: documentName.id,},
    }
 })
}

export async function getPostData(id) {
  const documents = await axios.get('/api/v1/blog/'+id,  {
      headers: {'X-API-KEY': apiKey,}, 
      params: {fields: "title,content,author.name"},
  })
  const json = documents.data
  return {
    id: json.title,
    contentHtml: json.content,
  }
}
