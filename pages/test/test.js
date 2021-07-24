import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/layout";


export default function Text() {

    return (
        <Layout>
            <Head>
                <title>Test Page</title>
            </Head>
            <Link href="/posts/first-post">
                <a>go to FirstPost</a>
            </Link>
        </Layout>
    )
}