import Layout from "../../components/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../components/utils.module.css'

//getStaticProps & getStaticPathsはサーバーサイド領域
export async function getStaticProps({ params }) {
    const postData = await getPostData(params.id)
    return {
        props: {
            postData
        }
    }
}

export async function getStaticPaths() {
    const paths = getAllPostIds()
    return {
        //this code in the paths 
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
        paths,
        //指定パス以外なら404を返す
        fallback: false
    }
}

export default function Post({ postData }) {
    console.log(postData)
    return (
        <Layout>
            <Head>
                <title>{postData.title}</title>
            </Head>
            <article>
                <h1 className={utilStyles.headingXl}>{postData.title}</h1>
                <div className={utilStyles.lightText}>
                    <Date dateString={postData.date} />
                </div>
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }}></div>
            </article>
        </Layout>
    )
}