pipeline {
    agent any

    stages {
        stage('Clone Repository') {
            steps {
                git branch: 'main', url: 'https://github.com/<your-username>/<your-repo>.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    docker.build('healthcare-app', './app')
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    docker.image('healthcare-app').run('-d -p 5000:5000')
                }
            }
        }
    }
}
