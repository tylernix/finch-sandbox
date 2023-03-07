# Finch Sandbox

The Finch sandbox is a self-contained testing environment that simulates the live Finch production API. The sandbox provides a shielded space where you can test your API integration with Finch by creating mock payroll and HRIS providers and watching how requests respond differently based on the provider's [data field compatibility](https://developer.tryfinch.com/docs/reference/0517ab806dda4-compatibility) ([now "codified" in this repository](https://github.com/Finch-API/finch-sandbox/blob/main/util/constants.ts)), all without touching any live provider accounts.

By using a sandbox providers, you can test and debug your apps without referencing any real employees or live  employers. The sandbox lets you operate your application in a safe environment and provides a way to fine-tune your Finch processes before you move your product into production.

## Supported Features

The Finch sandbox mirrors the features on the Finch production servers. While some Finch features do not apply to the sandbox, such as Finch Connect Flow, data syncing schedule, webhooks, rate limiting, and the Benefits endpoints (in progress), the sandbox has the same Finch API feature set as the live environment. You can test your Finch processes in the sandbox since they will behave the same in the sandbox environment as they do on production servers.

The sandbox currently supports 29 mock providers:

1. ADP Run - `adp_run`
1. Bamboo HR - `bamboo_hr`
1. Bamboo HR (API) - `bamboo_hr_api`
1. HiBob - `bob`
1. Gusto - `gusto`
1. Humaans - `humaans`
1. Insperity - `insperity`
1. Justworks - `justworks`
1. Namely - `namely`
1. Paychex Flex - `paychex_flex`
1. Paychex Flex (API) - `paychex_flex_api`
1. Paycom - `paycom`
1. Paycom (API) - `paycom_api`
1. Paylocity - `paylocity`
1. Paylocity (API) - `paylocity_api`
1. Personio - `personio`
1. Quickbooks - `quickbooks`
1. Rippling - `rippling`
1. Sage HR - `sage_hr`
1. Sapling - `sapling`
1. Squoia One - `sequoia_one`
1. Square Payroll - `square_payroll`
1. Trinet - `trinet`
1. Trinet (API) - `trinet_api`
1. Ulti Pro - `ulti_pro`
1. Wave - `wave`
1. Workday - `workday`
1. Zenefits - `zenefits`
1. Zenefits (API) - `zenefits_api`

The sandbox currently supports the following endpoints:

Organization:

- [/employer/company](https://developer.tryfinch.com/docs/reference/33162be1eed72-company)
- [/employer/directory](https://developer.tryfinch.com/docs/reference/12419c085fc0e-directory)
- [/employer/individual](https://developer.tryfinch.com/docs/reference/9d6c83b09e205-individual)
- [/employer/employment](https://developer.tryfinch.com/docs/reference/1ba5cdec4c979-employment)

Payroll:

- [/employer/payment](https://developer.tryfinch.com/docs/reference/b811fdc2542ca-payment)
- [/employer/pay-statement](https://developer.tryfinch.com/docs/reference/d5fd02c41e83a-pay-statement)

Management:

- [/providers](https://developer.tryfinch.com/docs/reference/327c384190aeb-providers)
- [/introspect](https://developer.tryfinch.com/docs/reference/eee6e798b0f93-introspect)
- [/disconnect](https://developer.tryfinch.com/docs/reference/c65ecbd512332-disconnect)

Sandbox:

- `/create` - endpoint to create a new sandbox provider

## 🚀 Getting Started

### Prerequisites

1. REDIS Database - You can create an [Upstash](https://upstash.com/) account pluse a database for free. Use the `Node -> ioredis` connection url

### Basic Setup

Start by cloning the repository to a local project directory - `git clone git@github.com:Finch-API/finch-sandbox.git`

Create a `.env.local` file under your root project directory (or copy our example file by running `cp .env.local.example .env.local` in the terminal).

Define the necessary Finch configuration values as follows:

```
# The redis url to store each sandbox environment details
REDIS_URL=
```

### Start Local Application

1. Start by installing the dependencies of this project: `npm install` or `yarn`.

1. Then, run the development server: `npm run dev` or `yarn dev`.

1. Open [http://localhost:3001](http://localhost:3001) with your browser to see the result.

You can start editing the page by modifying `sandbox/create.ts` or `employer/directory.ts`. The endpoints auto-update as you edit the files.

Finch Data Types can be found in `types/finch.d.ts` and `types/finch-compatibility.d.ts`.

## Call API

Test the sandbox by creating a new sandbox environment. While testing, use the sandbox providers in place of live providers.

First, create a sandbox provider by calling `https://localhost:3001/api/sandbox/create` and specifying a `provider_id` and `products` (`employee_size` is optional with a default of `10`). The following curl command makes an HTTP POST request with a JSON encoded request body.

```bash
curl https://finch-sandbox.vercel.app/api/sandbox/create \
  -X POST \
  -H "Content-Type: application/json" \
  --data-raw '{
    "provider_id": "gusto",
    "products": ["company", "directory", "individual", "employment", "payment", "pay_statement"]
    "employee_size": 15
}'
```

The response to this request will contain a JSON encoded object containing a `payroll_provider_id`, `company_id`, and an `access_token`. Now that you have a valid access_token (for the sandbox), you will use this access token to send requests to Finch's Sandbox APIs from now on.

Copy the `access_token` and paste it inside the request Authorization header. Run the following curl command to retrieve the employee directory!

```bash
curl https://localhost:3001/api/employer/directory \
  -H 'Authorization: Bearer <your_access_token>' \
  -H 'Content-Type: application/json'
```

Continue to call the other Finch API endpoints.

## Testing

Since this repo mocks many payroll creation functions, this [repo contains various tests](https://github.com/Finch-API/finch-sandbox/blob/main/util/mock.test.ts) to ensure data correctness. To run the test suite, run the following command in your terminal:

```bash
jest --silent
```

## Learn More

To learn more about Finch, take a look at the following resources:

- [Finch Documentation](https://developer.tryfinch.com/) - learn about Finch's features and API.
- [List of integrations](https://tryfinch.com/developers/integrations) - an interactive list of Finch's provider integrations
- [Finch Whitepapers](https://tryfinch.com/resources/whitepapers) - detailed and rigorous employment research to help you make the right decisions

## TODO

- filter fields by provider compatibility
- finish creating pay statement for current month
- double check income history effective date is working properly

## Notes

- only creates 1 year of historical pay data
- only creating default deductions and contributions of 401k, medical, vision, and dental. Can add others over time.
- number of employees limited to 1 to 200 employees

## future api scenario generator inputs

[x] number of employees (limited to 1 to 200 employees)
[ ] custom_fields names
[ ] contractor converting to full time employee
[ ] send a company id to generate next payroll
[ ] create new employee
[ ] delete employee (terminate)
[ ] delete company (disconnect access token)
