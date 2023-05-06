import Head from "next/head";
import {getPost, getSlugs} from "../../lib/posts";

export async function getStaticPaths() {
    const slugs = await getSlugs(true);
    return {
        paths: slugs.map((slug) => ({params: {slug}})),
        fallback: false,
    }
}
export async function getStaticProps(context) {
    const post = await getPost(context.params.slug, true);
    return {
        props: {post},
    };
}

function FirstPostPage({post}) {
    return (
        <>
            <Head>
                <title>{post.title}</title>
            </Head>
            <main>
                <p>Date: {post.date}</p>
                <h1>{post.title}</h1>
                <article dangerouslySetInnerHTML={{__html: post.body}}/>
            </main>
        </>
    );
}

export default FirstPostPage;
