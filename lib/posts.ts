import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remark from "remark"; //マークダウンコンテンツをレンダリングするためのライブラリ
import html from "remark-html";
import fetch from "node-fetch";
const base64 = require("js-base64").Base64;

//path.joinはpathの文字列を結合する
//process.cwd()はカレントディレクトリを示す
const postsDirectory = path.join(process.cwd(), "posts"); //md.fileが格納されているフォルダ

export function getSortedPostsData() {
  //fetchを使う場合
  // const res = await fetch('..')
  // return res.json()

  //db.collection.doc().....

  //Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory); //引数のパス内にあるファイルを列挙する
  const allPostsData = fileNames.map((fileName) => {
    //Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    //Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents); //mdfileのtitle,dateを解析

    //Combine the dta with the id
    return {
      id,
      ...matterResult.data,
    };
  });

  //Sort posts by data
  return allPostsData.sort(({ date: a }, { date: b }) => {
    //日付を降順にソートしている
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export async function getAllPostIds() {
  // const fileNames = fs.readdirSync(postsDirectory);

  const repoUrl =
    "https://api.github.com/repos/shirakashi-jinnai/nextjs-blog/contents/posts";
  const response = await fetch(repoUrl);
  const files = await response.json();
  const fileNames = files.map((file) => file.name);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
        // id: ["rezero", "rem"],
      },
    };
  });
}

export async function getPostData(id) {
  // const fullPath = path.join(postsDirectory, `${id}.md`);
  // const fileContents = fs.readFileSync(fullPath, "utf-8");

  const repoUrl = `https://api.github.com/repos/shirakashi-jinnai/nextjs-blog/contents/posts/${id}.md`;
  const response = await fetch(repoUrl);
  const file = await response.json();
  const fileContents = base64.decode(file.content)

  //Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  //Use remark to convert markdown into HTML string
  const processedContent = await remark() //remarkは非同期なのでawaitをつける
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  //Combine the data with the id
  return {
    id,
    contentHtml,
    ...matterResult.data,
  };
}
