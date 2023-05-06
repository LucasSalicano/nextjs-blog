import {readdir, readFile} from 'fs/promises';
import {marked} from 'marked';
import matter from "gray-matter";

export async function getPost(slug, isMarkdown = false) {
    const source = await readFile(`content/posts/${slug}.${isMarkdown ? 'md' : 'json'}`, 'utf8');

    if (!isMarkdown) {
        return JSON.parse(source);
    }

    const {data: {date, title}, content} = matter(source);
    const body = marked(content)

    return {slug, date, title, body}
}

export async function getAllPosts(isMarkDown = false) {
    const slugs = await getSlugs(isMarkDown);
    return await Promise.all(slugs.map(slug => getPost(slug, isMarkDown)));
}

export async function getSlugs(isMarkDown = false) {
    const suffix = isMarkDown ? '.md' : '.json';
    const files = await readdir('content/posts');
    return files.filter(file => file.endsWith(suffix))
        .map(file => file.slice(0, -suffix.length));
}