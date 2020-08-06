import Head from 'next/head'

import Meta from '../components/meta'

function ShowTitle({title}) {
    return (
        <Head>
            <title>
                Playpesa | {title}
            </title>
        </Head>
    )
}

export default function Layout({ title, children }) {
  let displayTitle = null;
  if (title) displayTitle = <ShowTitle title={title} />

  return (
    <>
      <Meta />
      {displayTitle}
      <div className="min-h-screen">
        <main>{children}</main>
      </div>
    </>
  )
}