# Finch Sandbox

The Finch sandbox is a self-contained testing environment that simulates the live Finch production API. The sandbox provides a shielded space where you can test your API integration with Finch by creating mock payroll and HRIS providers and watching how requests respond differently based on the provider's [data field compatibility](https://developer.tryfinch.com/docs/reference/0517ab806dda4-compatibility), all without touching any live provider accounts.

By using a sandbox providers, you can test and debug your apps without referencing any real employees or live  employers. The sandbox lets you operate your application in a safe environment and provides a way to fine-tune your Finch processes before you move your product into production.

## Supported Features

The Finch sandbox mirrors the features on the Finch production servers. While some Finch features do not apply to the sandbox, such as Finch Connect Flow, data syncing schedule, webhooks, rate limiting, and the Benefits endpoints (in progress), the sandbox has the same Finch API feature set as the live environment. You can test your Finch processes in the sandbox since they will behave the same in the sandbox environment as they do on production servers.

The sandbox currently supports 5 mock providers:

1. Gusto - `gusto`
1. BambooHR - `bamboohr`
1. Justworks - `justworks`
1. Paychex Flex- `paychex_flex`
1. Workday - `workday`

New sandbox providers can be requested by contacting [developers@tryfinch.com](mailto:developers@tryfinch.com)

> Note: As of now, the sandbox only returns the same static employer data for each provider, but changed to represent the various fields each provider supports. In the future, we plan on dynamically generating each employer's data upon sandbox creation to make it seem more realistic.

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

## Getting Started

Test your application by creating a sandbox for each provider you plan on integrating. While testing, use the sandbox providers in place of live providers.

First, create a sandbox provider by calling `/api/create` and specifying a `provider` and `products`. This curl command is going to make an HTTP POST request with a JSON encoded request body.

```bash
curl https://tryfinch.com/api/create \
  -X POST \
  -H "Content-Type: application/json" \
  --data-raw '{
    "provider": "gusto",
    "products": ["company", "directory", "individual", "employment", "payment", "pay_statement"]
}'
```

The response to this request will contain a JSON encoded object containing a `payroll_provider_id`, `company_id`, and an `access_token`. Now that you have a valid access_token (for the sandbox), you will use this access token to send requests to Finch's Sandbox APIs from now on.

Copy the `access_token` and run the following curl command to retrieve the employee directory!

```bash
curl https://tryfinch.com/api/employer/directory \
  -H 'Authorization: Bearer <your_access_token>' \
  -H 'Content-Type: application/json' \
```

## Learn More

To learn more about Finch, take a look at the following resources:

- [Finch Documentation](https://developer.tryfinch.com/) - learn about Finch's features and API.
- [List of integrations](https://tryfinch.com/developers/integrations) - an interactive list of Finch's provider integrations
- [Finch Whitepapers](https://tryfinch.com/resources/whitepapers) - detailed and rigorous employment research to help you make the right decisions
