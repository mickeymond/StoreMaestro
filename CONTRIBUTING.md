# Contributing to StoreMaestro

First off, thank you for considering contributing to StoreMaestro. It's people like you that make StoreMaestro such a great tool.

Following these guidelines helps to communicate that you respect the time of the developers managing and developing this open source project. In return, they should reciprocate that respect in addressing your issue, assessing changes, and helping you finalize your pull requests.

## Code of Conduct

This project and everyone participating in it is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to mickeymond@gmail.com.

## How Can I Contribute?

### Reporting Bugs

This section guides you through submitting a bug report for StoreMaestro. Following these guidelines helps maintainers and the community understand your report, reproduce the behavior, and find related reports.

**Before Submitting A Bug Report**

*   Perform a cursory search to see if the problem has already been reported. If it has and the issue is still open, add a comment to the existing issue instead of opening a new one.

**How Do I Submit A (Good) Bug Report?**

Bugs are tracked as [GitHub issues](https://github.com/mickeymond/StoreMaestro/issues). Create an issue on that repository and provide the following information.

Explain the problem and include additional details to help maintainers reproduce the problem:

*   **Use a clear and descriptive title** for the issue to identify the problem.
*   **Describe the exact steps which reproduce the problem** in as many details as possible.
*   **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
*   **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
*   **Explain which behavior you expected to see instead and why.**
*   **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem.

### Suggesting Enhancements

This section guides you through submitting an enhancement suggestion for StoreMaestro, including completely new features and minor improvements to existing functionality.

**How Do I Submit A (Good) Enhancement Suggestion?**

Enhancement suggestions are tracked as [GitHub issues](https://github.com/mickeymond/StoreMaestro/issues).

*   **Use a clear and descriptive title** for the issue to identify the suggestion.
*   **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
*   **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
*   **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
*   **Explain why this enhancement would be useful** to most StoreMaestro users.

### Your First Code Contribution

Unsure where to begin contributing to StoreMaestro? You can start by looking through these `good-first-issue` and `help-wanted` issues:

*   [Good first issues](https://github.com/mickeymond/StoreMaestro/labels/good%20first%20issue) - issues which should only require a few lines of code, and a test or two.
*   [Help wanted issues](https://github.com/mickeymond/StoreMaestro/labels/help%20wanted) - issues which should be a bit more involved than `good-first-issue` issues.

### Pull Requests

The process described here has several goals:

- Maintain StoreMaestro's quality
- Fix problems that are important to users
- Engage the community in working toward the best possible StoreMaestro
- Enable a sustainable system for StoreMaestro's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1.  **Follow the styleguides**
2.  **After you submit your pull request**, verify that all status checks are passing.
3.  **If a status check is failing**, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our CI infrastructure.

While the prerequisites for contributing to StoreMaestro are spelled out here, we also recommend that you read this article about [how to make a good pull request](http://blog.jenkton.com/2012/03/how-to-make-good-pull-request.html).

## Styleguides

### Git Commit Messages

*   Use the present tense ("Add feature" not "Added feature")
*   Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
*   Limit the first line to 72 characters or less
*   Reference issues and pull requests liberally after the first line
*   When only changing documentation, include `[ci skip]` in the commit title
*   Consider starting the commit message with an applicable emoji:
    *   :art: `:art:` when improving the format/structure of the code
    *   :racehorse: `:racehorse:` when improving performance
    *   :non-potable_water: `:non-potable_water:` when plugging memory leaks
    *   :memo: `:memo:` when writing docs
    *   :penguin: `:penguin:` when fixing something on Linux
    *   :apple: `:apple:` when fixing something on macOS
    *   :checkered_flag: `:checkered_flag:` when fixing something on Windows
    *   :bug: `:bug:` when fixing a bug
    *   :fire: `:fire:` when removing code or files
    *   :green_heart: `:green_heart:` when fixing the CI build
    *   :white_check_mark: `:white_check_mark:` when adding tests
    *   :lock: `:lock:` when dealing with security
    *   :arrow_up: `:arrow_up:` when upgrading dependencies
    *   :arrow_down: `:arrow_down:` when downgrading dependencies
    *   :shirt: `:shirt:` when removing linter warnings

### TypeScript Styleguide

All TypeScript code must adhere to standard TypeScript styleguides.
