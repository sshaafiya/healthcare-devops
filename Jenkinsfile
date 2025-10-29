pipeline {
    agent any
    stages {
        stage('Diag: who/how Jenkins runs docker') {
        steps {
        sh '''
        echo "----- whoami"
        whoami || id
        echo "----- environment"
        env | sort
        echo "----- groups for jenkins user (if present)"
        getent group docker || true
        groups || true
        echo "----- docker version"
        docker --version || true
        echo "----- ls socket"
        ls -l /var/run/docker.sock || true
        echo "----- try docker ps"
        docker ps || true
        echo "----- try docker build test (no build context)"
        timeout 10 sh -c "docker -H unix:///var/run/docker.sock info || true"
        '''
        }
    }
    }
}
