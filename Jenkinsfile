properties([[$class: 'GithubProjectProperty', displayName: '', projectUrlStr: 'https://github.com/halkeye/docker-mineos/']])
def imageName = "halkeye/docker-mineos";
node {
  def app
  def commitHash
  def branchName
  stage('Checkout') {
    /* Checkout the code we are currently running against */
    def scmVars = checkout(scm)
    commitHash = scmVars.GIT_COMMIT.take(6)
    branchName = scmVars.GIT_BRANCH
  }

  stage('Build') {
    ansiColor('xterm') {
      app = docker.build "${imageName}:${commitHash}"
    }
  }

  if (branchName == "master") {
    stage('Publish') {
      /* Push the image to Docker Hub, using credentials we have setup separately on the worker node */
      ansiColor('xterm') {
        withDockerRegistry([credentialsId: 'dockerhub-halkeye']) {
          app.push commitHash
          app.push 'latest'
        }
      }
    }
  }
}
