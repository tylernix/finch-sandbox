import type { NextPage } from 'next'
const { marked } = require('marked')

import { useState } from 'react'
import getReadmeMarkdown from '../util/markdownToHtml'


const Home: NextPage = () => {
  const [html, setHTML] = useState('');

  //markdownToHtml(readmeContent).then(response => setHTML(response))
  getReadmeMarkdown().then(response => {
    console.log('html: ' + response)
    setHTML(response)
  })


  return <div dangerouslySetInnerHTML={{ __html: html }} />
}

export default Home
