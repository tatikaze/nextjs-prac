import Head from 'next/head';
import Link from 'next/link';
import { getPostsData } from '../lib/posts';

import Layout, { siteTitle } from '../components/layout'
import Date from '../components/date';
import utilStyles from '../styles/utils.module.css'

export default function Home({ allPostsData }) {
    return (
          <Layout home>
            <Head>
              <title>{siteTitle}</title>
            </Head>
            <section className={utilStyles.headingMd}>
              <h2 className={utilStyles.headingLg}>Blog</h2>
              <ul className={utilStyles.list}>
                {allPostsData.map(({ id, date, title, author }) => (
                  <li className={utilStyles.listItem} key={id}>
                    <Link href="/posts/[id]" as={`/posts/${id}`}>
                      <a>{title}</a>
                    </Link>
		    <small className={ utilStyles.lightText }>
		      <h5>author: {author}</h5>
		      <Date dateString={date} />
		    </small>
                  </li>
                ))}
              </ul>
            </section>
          </Layout>
    )
}

export async function getStaticProps() {
  const allPostsData = await getPostsData();
  return {
    props: {
      allPostsData,
    }
  }
}
