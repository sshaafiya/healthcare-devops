pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "healthcare-app:latest"
    }

    stages {
        stage('Checkout Code') {
            steps {
                git branch: 'main', url: 'https://github.com/sshaafiya/healthcare-devops.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    sh 'docker build -t $DOCKER_IMAGE ./app'
                }
            }
        }

        stage('Run Container') {
            steps {
                script {
                    sh '''
                        if [ "$(docker ps -q --filter name=healthcare-app)" ]; then
                            docker stop healthcare-app && docker rm healthcare-app
                        fi
                        docker run -d --name healthcare-app -p 5000:5000 $DOCKER_IMAGE
                    '''
                }
            }
        }

        stage('Deploy with Ansible') {
            steps {
                script {
                    sh 'ansible-playbook /var/jenkins_home/ansible/playbook.yml'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    sh 'kubectl apply -f k8s/deployment.yaml'
                    sh 'kubectl apply -f k8s/service.yaml'
                }
            }
        }
    }

    post {
        success {
            echo "✅ Deployment successful!"
        }
        failure {
            echo "❌ Deployment failed! Check logs."
        }
    }
}
