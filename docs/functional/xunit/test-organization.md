---
sidebar_position: 5
---

# Test Organization and Diagnostics

Well-structured tests make functional assertions easier to maintain and debug.

## Organize by Behavior

Group tests by behavior and expected outcome:

- Success flows
- Validation failures
- Not-found or authorization failures
- Optional-value (`Maybe`) behavior

## Keep Assertions Focused

- Assert one main behavior per test.
- Use fluent chains to keep intent readable.
- Avoid asserting unrelated concerns in the same test.

## Improve Diagnostic Quality

- Prefer typed failures and assert concrete failure types.
- Include meaningful messages in domain failures.
- Use metadata assertions where contextual diagnostics matter.

## See Also

- [Failures and Metadata](../failures-and-metadata.md)
- [Async Assertion Patterns](./async-assertions.md)
