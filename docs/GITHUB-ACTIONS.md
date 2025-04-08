# Huldra GitHub Actions Workflow

## General Information

Currently, the GitHub repository `huldra-internal` has 3 workflows in [GitHub actions](https://docs.github.com/en/actions), a continuous integration and continuous delivery/continuous deployment (CI/CD) platform.

## Workflows

### Lint on Push/PR

- **Defined in:** `.github/workflows/linter.yml`
- **Triggers on:** Push to all branches except `dev` and `main`, PR to `dev` and `main`.
- **Operation:** This workflow lints the codebase and logs the errors or warnings.
  - If there are any errors, the workflow will fail, and a cross mark (❌) will appear on the PR/commit. In case of failure, please resolve the errors and push again.
  - If there are no errors, the workflow will pass, and a check mark (✔️) will appear on the PR/commit.

### Build on Push

- **Defined in:** `.github/workflows/build.yml`
- **Triggers on:** Push to `dev` and `main``.
- **Operation:** This workflow runs `npm run build` and creates a build of the application, in order to ensure that the latest push to `dev`/`main` is working before it can be deployed successfully.

### Build Docker Image

- **Defined in:** `.github/workflows/docker_build.yml`
- **Triggers on:** Successful completion of the [**`Build on Push`**](#build-on-push) workflow.
- **Operation:** This workflow builds a docker image of the application and pushes it to a private repository on [Dockerhub](https://hub.docker.com/), Heroku container registry and deploys the image to Heroku.
- **Requirements:** Make sure you have the listed secrets in the repository. To add github secrets:

  - Go to Repository Settings
  - Select 'Secrets and variables' under Security
  - Select 'Actions'
  - Add the following Secrets and Variables
  - Secrets:
    - DOCKERHUB_PASSWORD
    - DOCKERHUB_REPO
    - DOCKERHUB_USERNAME
    - HEROKU_API_KEY - HEROKU_EMAIL
    - REACT_APP_FIREBASE_API_KEY
    - REACT_APP_FIREBASE_APP_ID
    - REACT_APP_FIREBASE_AUTH_DOMAIN
    - REACT_APP_FIREBASE_MESSAGING_SENDER_ID
    - REACT_APP_FIREBASE_PROJECT_ID
    - REACT_APP_FIREBASE_ROOT_DIRECTORY
    - REACT_APP_FIREBASE_STORAGE_BUCKET
      <br>
  - Variables
    - HEROKU_APP_NAME
