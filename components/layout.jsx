import Head from 'next/head'

const Layout = ({ children }) => {
    const setTitle = 'Practice Nextjs'
    return (
        <div>
            <Head>
                <link rel="icon" href="/favicon.ico" />
                <meta />
                <title>{setTitle}</title>
            </Head>
            <section>
                {children}
            </section>
        </div>
    )
}

export default Layout