pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "healthcare-app"
        DOCKER_TAG = "latest"
        DOCKER_PATH = "./app"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/sshaafiya/healthcare-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh 'docker build -t ${DOCKER_IMAGE}:${DOCKER_TAG} ${DOCKER_PATH}'
            }
        }

        stage('Run Container') {
            steps {
                sh '''
                docker ps -q --filter "name=healthcare-app" | grep -q . && docker stop healthcare-app && docker rm healthcare-app || true
                docker run -d --name healthcare-app -p 5000:5000 ${DOCKER_IMAGE}:${DOCKER_TAG}
                '''
            }
        }

        stage('Deploy with Ansible') {
            steps {
                dir('ansible') {
                    sh 'ansible-playbook playbook.yml'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                dir('k8s') {
                    sh '''
                    kubectl apply -f deployment.yaml
                    kubectl apply -f service.yaml
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment Successful!"
        }
        failure {
            echo "❌ Deployment Failed. Please check logs."
        }
    }
}
