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
                    // Stop and remove old container if it exists
                    sh 'docker ps -q --filter "name=healthcare-app" | grep -q . && docker stop healthcare-app && docker rm healthcare-app || true'
                    // Run new container
                    sh 'docker run -d --name healthcare-app -p 5000:5000 $DOCKER_IMAGE'
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
                sh 'kubectl apply -f app/k8s/deployment.yaml'
                sh 'kubectl apply -f app/k8s/service.yaml'
            }
        }

        // ✅ Step 2: Verification Stage
        stage('Verify Setup') {
            steps {
                echo "🔍 Checking GitHub and Kubernetes connectivity..."
                sh 'git ls-remote https://github.com/sshaafiya/healthcare-devops.git > /dev/null && echo "✅ GitHub connection successful!"'
                sh 'kubectl get nodes && echo "✅ Kubernetes cluster reachable!"'
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
