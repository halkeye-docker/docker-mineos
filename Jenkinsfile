node {
    def app
    stage('Preparation') { // for display purposes
        git 'https://github.com/halkeye/docker-mineos.git'
    }
    stage('Build') {
        wrap([$class: 'AnsiColorBuildWrapper']) {
            app = docker.build("halkeye/docker-mineos:${BUILD_NUMBER}")
            app.tag("latest")
        }
    }
    stage('Upload') {
       withDockerRegistry([credentialsId: 'dockerhub-halkeye']) {
           app.push("${BUILD_NUMBER}")
           app.push('latest')
       }
    }
}
