## Evals

Set up `.env` file with the following:

```
BRAINTRUST_API_KEY=...
STRIPE_SECRET_KEY=sk_test_....
OPENAI_BASE_URL=http://0.0.0.0:8000/v1
OPENAI_API_KEY=EMPTY
```

To run:

```
tsx eval.ts
```

We are using [Braintrust](https://www.braintrust.dev/) to run the evals.
