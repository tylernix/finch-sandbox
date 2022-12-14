import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'

const curl1 = `
curl https://finch-sandbox.vercel.app/api/sandbox/create \\
  -X POST \\
  -H "Content-Type: application/json" \\
  --data-raw '{
    "provider": "gusto",
    "products": ["company", "directory", "individual", "employment", "payment", "pay_statement"]
  }'
`
const curl2 = `
curl https://finch-sandbox.vercel.app/api/employer/directory \\
  -H 'Authorization: Bearer <your_access_token>' \\
  -H 'Content-Type: application/json'
`
const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Finch Sandbox</title>
        <meta name="description" content="self-contained testing environment that simulates the live Finch production API" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <div className="relative overflow-hidden bg-white py-16">
          <div className="hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]">
          </div>
          <div className="relative px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-prose text-lg">
              <h1>
                <span className="block text-center text-lg font-semibold text-indigo-600">Finch</span>
                <span className="mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl">
                  Sandbox
                </span>
              </h1>
              <p className="mt-8 text-xl leading-8 text-gray-500">
                The Finch sandbox is a self-contained testing environment that simulates the live Finch production API.
                The sandbox provides a shielded space where you can test your API integration with Finch by creating mock payroll and HRIS providers and watching how requests respond differently based on the provider&apos;s data field compatibility, all without touching any live provider accounts.
              </p>
              <p className='mt-8 text-xl leading-8 text-gray-500'>
                By using a sandbox providers, you can test and debug your apps without referencing any real employees or live  employers. The sandbox lets you operate your application in a safe environment and provides a way to fine-tune your Finch processes before you move your product into production.
              </p>
            </div>
            <div className=" prose prose-lg prose-indigo mx-auto mt-6 text-gray-500">
              <h2>Supported features</h2>
              <p>
                The Finch sandbox mirrors the features on the Finch production servers. While some Finch features do not apply to the sandbox, such as Finch Connect Flow, data syncing schedule, webhooks, rate limiting, and the Benefits endpoints (in progress), the sandbox has the same Finch API feature set as the live environment. You can test your Finch processes in the sandbox since they will behave the same in the sandbox environment as they do on production servers.
              </p>
              <p>
                The sandbox currently supports 5 mock providers:
              </p>
              <ul role="list">
                <li><strong>Gusto</strong> - `gusto`</li>
                <li><strong>BambooHR</strong> - `bamboohr`</li>
                <li><strong>Justworks</strong> - `justworks`</li>
                <li><strong>Paychex Flex</strong>- `paychex_flex`</li>
                <li><strong>Workday</strong> - `workday`</li>
              </ul>
              <p>
                New sandbox providers can be requested by contacting <a href="mailto:developers@tryfinch.com">developers@tryfinch.com</a>.
              </p>
              <blockquote>
                <p>
                  Note: As of now, the sandbox only returns the same static employer data for each provider, but changed to represent the <a href="https://developer.tryfinch.com/docs/reference/0517ab806dda4-compatibility">various fields each provider supports</a>. In the future, we plan on dynamically generating each employer&apos;s data upon sandbox creation to make it seem more realistic.
                </p>
              </blockquote>
              <p>
                The sandbox currently supports the following endpoints:
              </p>
              <h3>Organization:</h3>
              <ul role="list">
                <li><a href="https://developer.tryfinch.com/docs/reference/33162be1eed72-company">/employer/company</a></li>
                <li><a href="https://developer.tryfinch.com/docs/reference/12419c085fc0e-directory">/employer/directory</a></li>
                <li><a href="https://developer.tryfinch.com/docs/reference/9d6c83b09e205-individual">/employer/individual</a></li>
                <li><a href="https://developer.tryfinch.com/docs/reference/1ba5cdec4c979-employment">/employer/employment</a></li>
              </ul>

              <h3>Payroll:</h3>
              <ul role="list">
                <li><a href="https://developer.tryfinch.com/docs/reference/b811fdc2542ca-payment">/employer/payment</a></li>
                <li><a href="https://developer.tryfinch.com/docs/reference/d5fd02c41e83a-pay-statement">/employer/pay-statement</a></li>
              </ul>

              <h3>Management:</h3>
              <ul role="list">
                <li><a href="https://developer.tryfinch.com/docs/reference/327c384190aeb-providers">/providers</a></li>
                <li><a href="https://developer.tryfinch.com/docs/reference/eee6e798b0f93-introspect">/introspect</a></li>
                <li><a href="https://developer.tryfinch.com/docs/reference/c65ecbd512332-disconnect">/disconnect</a></li>
              </ul>

              <h3>Sandbox:</h3>
              <ul role="list">
                <li><a href="">/sandbox/create</a> - sandbox endpoint to create a new sandbox provider</li>
              </ul>

              <h2>Getting started</h2>
              <p>
                Test your application by creating a sandbox for each provider you plan on integrating. While testing, use the sandbox providers in place of live providers.
              </p>
              <p>
                First, create a sandbox provider by calling <strong>https://finch-sandbox.vercel.app/api/sandbox/create</strong> and specifying a <strong>provider</strong> and <strong>products</strong>. This curl command is going to make an HTTP POST request with a JSON encoded request body.
              </p>
              <pre>
                {curl1}
              </pre>

              <p>
                The response to this request will contain a JSON encoded object containing a <strong>payroll_provider_id</strong>, <strong>company_id</strong>, and an <strong>access_token</strong>. Now that you have a valid access_token (for the sandbox), you will use this access token to send requests to Finch&apos;s Sandbox APIs from now on.
              </p>
              <pre>
                {curl2}
              </pre>

              <h2>Learn more</h2>
              <p>
                Learn more about Finch, take a look at the following resources:
              </p>
              <ul role="list">
                <li><a href="https://developer.tryfinch.com/">Finch Documentation</a> - learn about Finch features and API. </li>
                <li><a href="https://tryfinch.com/developers/integrations">List of integrations</a> - an interactive list of Finch provider integrations</li>
                <li><a href="https://tryfinch.com/resources/whitepapers">Finch Whitepapers</a> - detailed and rigorous employment research to help you make the right decisions</li>
              </ul>

            </div>
          </div>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-24 border-t text-xl">
        <p className='pr-2'>Powered by</p>
        <a
          className="flex items-center justify-center"
          href="https://tryfinch.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src="/img/finch-logo.png" alt="Finch Logo" className="h-6" />
        </a>
      </footer>
    </div>
  )
}

export default Home
