pipeline {
    agent any
    tools {
        nodejs 'Node22' // Node.js 22.14.0
    }
    environment {
        MONGO_URI = 'mongodb://mongo:27017/todoapp' // Match docker-compose.yml
    }
    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', credentialsId: 'github-credentials', url: 'https://github.com/RasikaJade1/todo-app-main.git'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Start MongoDB') {
            steps {
                script {
                    bat '''
                        tasklist | findstr "mongod" || start /B mongod --dbpath C:\\data\\db
                    '''
                }
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npm test -- --config=jest.config.js --coverage'
                junit 'test-results.xml'
            }
        }
        stage('Build Docker Image') {
            steps {
                bat 'docker build -t todo-app:latest .'
            }
        }
        stage('Deploy') {
            steps {
                bat 'docker-compose up -d'
            }
        }
    }
    post {
        always {
            script {
                publishHTML(target: [
                    allowMissing: true,
                    alwaysLinkToLastBuild: true,
                    keepAll: true,
                    reportDir: 'coverage/lcov-report',
                    reportFiles: 'index.html',
                    reportName: 'Jest Coverage Report'
                ])
                archiveArtifacts artifacts: 'coverage/**/*', allowEmptyArchive: true
                bat 'taskkill /IM mongod.exe /F || exit 0'
                bat 'docker-compose down || exit 0'
            }
        }
        success {
            echo 'Pipeline completed successfully!'
        }
        failure {
            echo 'Pipeline failed!'
        }
    }
}