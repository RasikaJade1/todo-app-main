pipeline {
    agent any
    tools {
        nodejs 'Node22' // Node.js 22.14.0
    }
    environment {
        MONGO_URI = 'mongodb://127.0.0.1:27017/testdb' // For tests on host
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
                        tasklist | findstr "mongod" || (start /B mongod --dbpath C:\\data\\db --logpath C:\\data\\db\\mongod.log 2>&1 & exit 0)
                        timeout /t 5 /nobreak >nul
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
                bat 'docker build --no-cache -t todo-app:latest .'
            }
        }
        stage('Deploy') {
            environment {
                MONGO_URI = 'mongodb://mongo:27017/todoapp' // For Docker deployment
            }
            steps {
                bat 'docker-compose down || exit 0'
                bat 'docker-compose up -d --build'
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
                // Remove docker-compose down to keep containers running
            }
        }
        success {
            echo 'Pipeline completed successfully! App should be accessible at http://localhost:3000'
        }
        failure {
            echo 'Pipeline failed! Cleaning up...'
            bat 'docker-compose down || exit 0' // Only clean up on failure
        }
    }
}